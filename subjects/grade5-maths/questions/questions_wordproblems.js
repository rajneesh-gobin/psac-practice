'use strict';
// ══════════════════════════════════════════════════════
//  MathMaster Grade 5 - Word Problem Bank
//  Hand-crafted L3 & L4 questions for all 16 chapters
//  Based on MIE Mauritius Grade 5 Curriculum
// ══════════════════════════════════════════════════════

(function () {

const WP = [

  // ════════════════════════════════════════════════
  //  NUMERATION & NOTATION
  // ════════════════════════════════════════════════
  makeNum({ id:'N_W01', chapterId:'numeration', difficulty:3,
    question:'The expanded form of a number is:<br><b>40,000 + 3,000 + 500 + 8</b><br>Write the number in digits.',
    answer:'43508', acceptableAnswers:['43508','43,508'],
    hint:'Add each part: 40,000 + 3,000 = 43,000. Add 500 → 43,500. Add 8 → 43,508.',
    explanation:'40,000 + 3,000 + 500 + 8 = <b>43,508</b>.' }),

  makeNum({ id:'N_W02', chapterId:'numeration', difficulty:3,
    question:'A number has:<br>6 in the ten-thousands place, 0 in the thousands, 4 in the hundreds, 9 in the tens, 2 in the ones.<br>Write the number.',
    answer:'60492', acceptableAnswers:['60492','60,492'],
    hint:'Place each digit: 60,000 + 0 + 400 + 90 + 2.',
    explanation:'60,000 + 400 + 90 + 2 = <b>60,492</b>.' }),

  makeMCQ({ id:'N_W03', chapterId:'numeration', difficulty:3,
    question:'Which number is <b>10,000 less</b> than eighty-two thousand and forty?',
    options:['72,040','71,040','82,140','80,040'],
    answer:'72,040',
    hint:'Eighty-two thousand and forty = 82,040. Subtract 10,000.',
    explanation:'82,040 − 10,000 = <b>72,040</b>.' }),

  makeNum({ id:'N_W04', chapterId:'numeration', difficulty:4,
    question:'A farmer harvested <b>23,485 mangoes</b> in June and <b>18,762 mangoes</b> in July.<br>How many mangoes did he harvest in total?<br>Round your answer to the nearest <b>1,000</b>.',
    answer:'42000', acceptableAnswers:['42000','42,000'],
    hint:'Step 1: Add 23,485 + 18,762. Step 2: Round to nearest 1,000.',
    explanation:'23,485 + 18,762 = 42,247. Rounded to nearest 1,000 = <b>42,000</b>.' }),

  makeNum({ id:'N_W05', chapterId:'numeration', difficulty:4,
    question:'A stadium has seats arranged in <b>48 rows</b>. The stadium holds <b>28,800 people</b> in total.<br>If the seats are equally spread, how many seats are in each row?',
    answer:'600',
    hint:'Divide total seats by number of rows: 28,800 ÷ 48.',
    explanation:'28,800 ÷ 48 = <b>600 seats</b> per row.' }),

  makeNum({ id:'N_W06', chapterId:'numeration', difficulty:4,
    question:'Town A has a population of <b>67,340</b> and Town B has <b>48,975</b>.<br>By how much does Town A\'s population <b>exceed</b> Town B\'s?',
    answer:'18365', acceptableAnswers:['18365','18,365'],
    hint:'Subtract the smaller from the larger: 67,340 − 48,975.',
    explanation:'67,340 − 48,975 = <b>18,365</b>.' }),

  // ════════════════════════════════════════════════
  //  FOUR OPERATIONS
  // ════════════════════════════════════════════════
  makeNum({ id:'F_W01', chapterId:'four_ops', difficulty:3,
    question:'A school canteen serves <b>345 meals</b> per day. How many meals are served in <b>28 school days</b>?',
    answer:'9660', acceptableAnswers:['9660','9,660'],
    hint:'Multiply: 345 × 28. Break it: 345×20 + 345×8.',
    explanation:'345 × 20 = 6,900. 345 × 8 = 2,760. Total = <b>9,660</b>.' }),

  makeNum({ id:'F_W02', chapterId:'four_ops', difficulty:3,
    question:'A minibus can carry <b>14 passengers</b>. How many minibuses are needed to transport <b>350 children</b> on a school trip?',
    answer:'25',
    hint:'Divide total children by capacity: 350 ÷ 14.',
    explanation:'350 ÷ 14 = <b>25 minibuses</b>.' }),

  makeNum({ id:'F_W03', chapterId:'four_ops', difficulty:3,
    question:'A baker bakes <b>6 loaves of bread</b> per hour. He works for <b>8 hours</b> and sells each loaf for <b>Rs 35</b>.<br>How much does he earn in total?',
    answer:'1680', acceptableAnswers:['1680','Rs 1680','Rs 1,680'],
    hint:'Step 1: Total loaves = 6 × 8. Step 2: Earnings = loaves × Rs 35.',
    explanation:'6 × 8 = 48 loaves. 48 × 35 = <b>Rs 1,680</b>.' }),

  makeNum({ id:'F_W04', chapterId:'four_ops', difficulty:4,
    question:'A shopkeeper bought <b>240 kg of rice</b> at <b>Rs 28 per kg</b>. He repacked it into <b>3 kg bags</b> and sold each bag at <b>Rs 95</b>.<br>Calculate his <b>total profit</b>.',
    answer:'880', acceptableAnswers:['880','Rs 880'],
    hint:'Bags = 240÷3 = 80. Revenue = 80×95. Cost = 240×28. Profit = Revenue − Cost.',
    explanation:'80 bags × Rs 95 = Rs 7,600. Cost = 240 × Rs 28 = Rs 6,720. Profit = 7,600 − 6,720 = <b>Rs 880</b>.' }),

  makeNum({ id:'F_W05', chapterId:'four_ops', difficulty:4,
    question:'A factory produces <b>1,248 bottles</b> per hour. It operates <b>18 hours a day</b>.<br>The bottles are packed in crates of <b>24</b>. How many <b>full crates</b> are produced each day?',
    answer:'936',
    hint:'Daily bottles = 1,248 × 18. Crates = daily bottles ÷ 24.',
    explanation:'1,248 × 18 = 22,464 bottles. 22,464 ÷ 24 = <b>936 crates</b>.' }),

  makeNum({ id:'F_W06', chapterId:'four_ops', difficulty:4,
    question:'A school collected <b>Rs 15,600</b> for a trip. There are <b>65 students</b> going. Each student must also pay for a meal costing <b>Rs 85</b>.<br>How much does each student pay from the collected money <b>plus</b> the meal?',
    answer:'325', acceptableAnswers:['325','Rs 325'],
    hint:'Per student from fund = 15,600 ÷ 65. Total per student = fund share + meal cost.',
    explanation:'Rs 15,600 ÷ 65 = Rs 240 per student. Plus meal Rs 85 = <b>Rs 325</b>.' }),

  // ════════════════════════════════════════════════
  //  SQUARE NUMBERS & PATTERNS
  // ════════════════════════════════════════════════
  makeNum({ id:'S_W01', chapterId:'square_nums', difficulty:3,
    question:'A square courtyard has a side of <b>15 m</b>.<br>How many <b>1 m² tiles</b> are needed to cover it completely?',
    answer:'225',
    hint:'Area = side × side = 15². Count of 1m² tiles = area.',
    explanation:'Area = 15² = 15 × 15 = <b>225 tiles</b>.' }),

  makeNum({ id:'S_W02', chapterId:'square_nums', difficulty:3,
    question:'The area of a square garden is <b>196 m²</b>.<br>A path runs along <b>one side</b> of the garden. How long is the path?',
    answer:'14', acceptableAnswers:['14','14m','14 m'],
    hint:'Find the square root of 196. Which number × itself = 196?',
    explanation:'14 × 14 = 196. Side = <b>14 m</b>.' }),

  makeMCQ({ id:'S_W03', chapterId:'square_nums', difficulty:3,
    question:'Rajan says: <i>"The sum of 4² and 3² equals 5²."</i><br>Is he correct?',
    options:['Yes - 16 + 9 = 25','No - 16 + 9 = 30','No - 16 + 9 = 20','Yes - 4 + 3 = 5'],
    answer:'Yes - 16 + 9 = 25',
    hint:'Calculate each: 4²=16, 3²=9, 5²=25. Check if 16+9=25.',
    explanation:'4²=16, 3²=9, 5²=25. 16+9=25 ✓. Rajan is <b>correct</b>.' }),

  makeNum({ id:'S_W04', chapterId:'square_nums', difficulty:4,
    question:'A square piece of land is divided into <b>smaller equal square plots</b>, each with a side of <b>3 m</b>.<br>The large square has a side of <b>21 m</b>.<br>How many small plots fit inside the large square?',
    answer:'49',
    hint:'Large area = 21² = 441. Small plot area = 3² = 9. Number of plots = 441 ÷ 9.',
    explanation:'Large = 21² = 441 m². Small = 3² = 9 m². Plots = 441 ÷ 9 = <b>49</b>.' }),

  makeNum({ id:'S_W05', chapterId:'square_nums', difficulty:4,
    question:'Priya arranges dots in a square pattern. The first square has 1 dot, the second has 4, the third has 9.<br>How many dots does the <b>8th square pattern</b> have?',
    answer:'64',
    hint:'These are square numbers: 1², 2², 3²... The 8th is 8².',
    explanation:'8th square = 8² = 8 × 8 = <b>64 dots</b>.' }),

  // ════════════════════════════════════════════════
  //  GEOMETRY & ANGLES
  // ════════════════════════════════════════════════
  makeNum({ id:'G_W01', chapterId:'geometry', difficulty:3,
    question:'A right-angled triangle has one angle of <b>38°</b>.<br>Find the <b>third angle</b>.<br>(The right angle = 90°)',
    answer:'52', acceptableAnswers:['52','52°'],
    hint:'Three angles in a triangle = 180°. Third = 180° − 90° − 38°.',
    explanation:'180° − 90° − 38° = <b>52°</b>.' }),

  makeNum({ id:'G_W02', chapterId:'geometry', difficulty:3,
    question:'An isosceles triangle has each base angle equal to <b>65°</b>.<br>Find the <b>top (apex) angle</b>.',
    answer:'50', acceptableAnswers:['50','50°'],
    hint:'All three angles sum to 180°. Top = 180° − 65° − 65°.',
    explanation:'180° − 65° − 65° = <b>50°</b>.' }),

  makeMCQ({ id:'G_W03', chapterId:'geometry', difficulty:3,
    question:'A quadrilateral has angles of <b>95°, 87°, and 73°</b>. What is the <b>fourth angle</b>?',
    options:['95°','105°','110°','115°'],
    answer:'105°',
    hint:'Angles in a quadrilateral sum to 360°. Fourth = 360° − 95° − 87° − 73°.',
    explanation:'360° − 95° − 87° − 73° = 360° − 255° = <b>105°</b>.' }),

  makeMCQ({ id:'G_W04', chapterId:'geometry', difficulty:4,
    question:'Ali faces <b>North</b>. He turns <b>clockwise 90°</b>, then <b>clockwise 180°</b> more.<br>What direction does he <b>finally</b> face?',
    options:['North','East','South','West'],
    answer:'West',
    hint:'Start North. After 90° CW → East. After 180° more CW → West (East→South→West).',
    explanation:'North + 90° CW = East. East + 180° CW = West. Final direction: <b>West</b>.' }),

  makeNum({ id:'G_W05', chapterId:'geometry', difficulty:4,
    question:'A triangular garden has angles in the ratio <b>2 : 3 : 4</b>.<br>Find the <b>largest angle</b>.',
    answer:'80', acceptableAnswers:['80','80°'],
    hint:'Total parts = 2+3+4 = 9. Each part = 180°÷9 = 20°. Largest = 4 × 20°.',
    explanation:'1 part = 180° ÷ 9 = 20°. Largest angle = 4 × 20° = <b>80°</b>.' }),

  makeMCQ({ id:'G_W06', chapterId:'geometry', difficulty:4,
    question:'Leila faces <b>East</b>. She makes <b>three quarter-turns anticlockwise</b>.<br>What direction does she face?',
    options:['North','East','South','West'],
    answer:'South',
    hint:'Anticlockwise from East: 1 turn→North, 2 turns→West, 3 turns→South.',
    explanation:'3 × 90° anticlockwise from East: East→North→West→<b>South</b>.' }),

  // ════════════════════════════════════════════════
  //  FRACTIONS
  // ════════════════════════════════════════════════
  makeNum({ id:'FR_W01', chapterId:'fractions', difficulty:3,
    question:'Priya spends <b>2/5</b> of her money on books and <b>1/4</b> on food.<br>What <b>fraction</b> of her money is left?',
    answer:'7/20',
    hint:'Find LCD of 5 and 4 = 20. Total spent = 8/20 + 5/20. Left = 20/20 − total.',
    explanation:'2/5 = 8/20. 1/4 = 5/20. Spent = 13/20. Left = 20/20 − 13/20 = <b>7/20</b>.' }),

  makeNum({ id:'FR_W02', chapterId:'fractions', difficulty:3,
    question:'A tank was <b>3/4</b> full. After use, <b>1/6</b> of the tank was used up.<br>What fraction of the tank is <b>left</b>?',
    answer:'7/12',
    hint:'LCD of 4 and 6 = 12. 3/4 = 9/12. 1/6 = 2/12. Left = 9/12 − 2/12.',
    explanation:'3/4 = 9/12. 1/6 = 2/12. Remaining = 9/12 − 2/12 = <b>7/12</b>.' }),

  makeNum({ id:'FR_W03', chapterId:'fractions', difficulty:3,
    question:'In a class of <b>40 pupils</b>, <b>3/8</b> are girls.<br>How many boys are in the class?',
    answer:'25',
    hint:'Girls = 3/8 × 40. Boys = 40 − girls.',
    explanation:'Girls = 3/8 × 40 = 15. Boys = 40 − 15 = <b>25</b>.' }),

  makeNum({ id:'FR_W04', chapterId:'fractions', difficulty:4,
    question:'A recipe needs <b>3/4 kg</b> of flour per cake. Meera wants to bake <b>6 cakes</b>.<br>She has a <b>5 kg</b> bag of flour. How much flour will she have <b>left over</b>?',
    answer:'0.5', acceptableAnswers:['0.5','1/2','0.5kg','half'],
    hint:'Flour needed = 3/4 × 6. Leftover = 5 − flour needed.',
    explanation:'3/4 × 6 = 18/4 = 4.5 kg needed. Left = 5 − 4.5 = <b>0.5 kg</b>.' }),

  makeNum({ id:'FR_W05', chapterId:'fractions', difficulty:4,
    question:'Ali earns <b>Rs 3,600</b> per month. He saves <b>1/4</b> and spends <b>1/3</b> on rent.<br>How much money does he have left after savings and rent?',
    answer:'1500', acceptableAnswers:['1500','Rs 1500'],
    hint:'Savings = 1/4 × 3600. Rent = 1/3 × 3600. Left = 3600 − savings − rent.',
    explanation:'Savings = Rs 900. Rent = Rs 1,200. Left = 3,600 − 900 − 1,200 = <b>Rs 1,500</b>.' }),

  makeNum({ id:'FR_W06', chapterId:'fractions', difficulty:4,
    question:'A journey is <b>120 km</b> long. Ahmad drives <b>2/5</b> of it before a rest stop, then drives <b>1/3</b> of the remaining distance.<br>How many km has he <b>still to travel</b>?',
    answer:'48',
    hint:'After first part: remaining = 120 − 2/5×120 = 72 km. Then drives 1/3×72=24 km more. Still to go = 72−24.',
    explanation:'First leg = 2/5×120 = 48 km. Remaining = 72 km. Second leg = 1/3×72 = 24 km. Still to go = 72−24 = <b>48 km</b>.' }),

  // ════════════════════════════════════════════════
  //  DECIMALS
  // ════════════════════════════════════════════════
  makeNum({ id:'D_W01', chapterId:'decimals', difficulty:3,
    question:'A plank of wood is <b>4.75 m</b> long. A carpenter cuts off <b>1.38 m</b>.<br>How much wood is <b>left</b>?',
    answer:'3.37', acceptableAnswers:['3.37','3.37m'],
    hint:'Subtract: 4.75 − 1.38. Line up the decimal points.',
    explanation:'4.75 − 1.38 = <b>3.37 m</b>.' }),

  makeNum({ id:'D_W02', chapterId:'decimals', difficulty:3,
    question:'Three friends ran a relay race. Their times were <b>12.54 s</b>, <b>11.87 s</b>, and <b>13.09 s</b>.<br>What was their <b>total time</b>?',
    answer:'37.5', acceptableAnswers:['37.5','37.50'],
    hint:'Add all three: 12.54 + 11.87 + 13.09.',
    explanation:'12.54 + 11.87 = 24.41. 24.41 + 13.09 = <b>37.50 s</b>.' }),

  makeNum({ id:'D_W03', chapterId:'decimals', difficulty:4,
    question:'A kg of tomatoes costs <b>Rs 12.50</b>. Mrs Sharma buys <b>4.5 kg</b>.<br>She pays with a <b>Rs 100 note</b>. How much <b>change</b> does she receive?',
    answer:'43.75', acceptableAnswers:['43.75','Rs 43.75'],
    hint:'Cost = 12.50 × 4.5. Change = 100 − cost.',
    explanation:'12.50 × 4.5 = Rs 56.25. Change = 100 − 56.25 = <b>Rs 43.75</b>.' }),

  makeNum({ id:'D_W04', chapterId:'decimals', difficulty:4,
    question:'Rajan cycles <b>3.6 km</b> to school and back, every day for <b>5 days</b>.<br>His bike needs servicing after every <b>100 km</b>. After these 5 days, how many km <b>until his next service</b>?',
    answer:'64', acceptableAnswers:['64','64km','64 km'],
    hint:'Daily = 3.6×2=7.2 km. Weekly = 7.2×5=36 km. Until service = 100−36.',
    explanation:'Daily = 7.2 km. Weekly = 36 km. Until service = 100 − 36 = <b>64 km</b>.' }),

  // ════════════════════════════════════════════════
  //  POWERS & EXPONENTS
  // ════════════════════════════════════════════════
  makeNum({ id:'P_W01', chapterId:'powers', difficulty:3,
    question:'A square room has a side of <b>8 m</b>.<br>Write the area using <b>power notation</b>, then calculate it.<br><i>(Write the answer in m², e.g. 64)</i>',
    answer:'64', acceptableAnswers:['64','64m2'],
    hint:'Area = side² = 8². Calculate 8 × 8.',
    explanation:'Area = 8² = 8 × 8 = <b>64 m²</b>.' }),

  makeNum({ id:'P_W02', chapterId:'powers', difficulty:3,
    question:'Rohan has <b>2³ marbles</b> and his sister has <b>3²</b> marbles.<br>How many marbles do they have <b>altogether</b>?',
    answer:'17',
    hint:'2³ = 2×2×2 = 8. 3² = 3×3 = 9. Total = 8 + 9.',
    explanation:'2³ = 8. 3² = 9. Total = 8 + 9 = <b>17 marbles</b>.' }),

  makeMCQ({ id:'P_W03', chapterId:'powers', difficulty:3,
    question:'A bacteria colony <b>doubles</b> every hour. It starts at <b>2¹</b>.<br>How many bacteria are there after <b>4 hours</b>?',
    options:['8','16','32','2'],
    answer:'16',
    hint:'After 1h = 2¹=2. After 2h = 2²=4. After 3h = 2³=8. After 4h = 2⁴.',
    explanation:'After 4 hours = 2⁴ = 2 × 2 × 2 × 2 = <b>16 bacteria</b>.' }),

  makeNum({ id:'P_W04', chapterId:'powers', difficulty:4,
    question:'A square wall is tiled with <b>1 cm × 1 cm</b> tiles. The wall\'s side is <b>23 cm</b>.<br>How many tiles are needed?',
    answer:'529',
    hint:'Area = 23². Count of 1cm² tiles = area.',
    explanation:'23² = 23 × 23 = <b>529 tiles</b>.' }),

  makeNum({ id:'P_W05', chapterId:'powers', difficulty:4,
    question:'A number squared gives <b>289</b>.<br>What is that number?',
    answer:'17',
    hint:'Find a number × itself = 289. Try 17 × 17.',
    explanation:'17 × 17 = 289. The number is <b>17</b>.' }),

  makeMCQ({ id:'P_W06', chapterId:'powers', difficulty:4,
    question:'Which is <b>greater</b>: <b>4³</b> or <b>6²</b>?<br>And by how much?',
    options:['4³ is greater by 28','6² is greater by 28','4³ is greater by 64','They are equal'],
    answer:'4³ is greater by 28',
    hint:'4³ = 4×4×4 = 64. 6² = 6×6 = 36. Compare and find the difference.',
    explanation:'4³ = 64. 6² = 36. 64 − 36 = 28. <b>4³ is greater by 28</b>.' }),

  makeNum({ id:'P_W07', chapterId:'powers', difficulty:4,
    question:'A library has <b>5 floors</b>. Each floor has <b>5 sections</b>. Each section has <b>5 shelves</b>.<br>Write the total number of shelves as a <b>power of 5</b>, then calculate it.',
    answer:'125', acceptableAnswers:['125'],
    hint:'Total = 5 × 5 × 5 = 5³. Calculate.',
    explanation:'5 × 5 × 5 = 5³ = <b>125 shelves</b>.' }),

  // ════════════════════════════════════════════════
  //  AVERAGE
  // ════════════════════════════════════════════════
  makeNum({ id:'A_W01', chapterId:'average', difficulty:3,
    question:'Leila scored <b>78, 85, 72 and 89</b> in four science tests.<br>What was her <b>average score</b>?',
    answer:'81',
    hint:'Add all four scores, then divide by 4.',
    explanation:'78+85+72+89 = 324. 324 ÷ 4 = <b>81</b>.' }),

  makeNum({ id:'A_W02', chapterId:'average', difficulty:3,
    question:'The average weight of <b>5 bags</b> is <b>12 kg</b>. Four of the bags weigh <b>10, 14, 11 and 13 kg</b>.<br>What is the weight of the <b>fifth bag</b>?',
    answer:'12',
    hint:'Total weight = 12 × 5 = 60 kg. Fifth = 60 − (10+14+11+13).',
    explanation:'Total = 60 kg. Sum of 4 = 48 kg. Fifth = 60 − 48 = <b>12 kg</b>.' }),

  makeNum({ id:'A_W03', chapterId:'average', difficulty:3,
    question:'In a shop, <b>Monday: 45 customers, Tuesday: 38, Wednesday: 52, Thursday: 41, Friday: 64</b>.<br>What is the <b>average number of customers</b> per day?',
    answer:'48',
    hint:'Add all 5 days, then divide by 5.',
    explanation:'45+38+52+41+64 = 240. 240 ÷ 5 = <b>48 customers</b>.' }),

  makeNum({ id:'A_W04', chapterId:'average', difficulty:4,
    question:'Ahmad\'s average mark for <b>3 tests</b> is <b>76</b>. After a <b>4th test</b>, his average rises to <b>79</b>.<br>What did he score in the <b>4th test</b>?',
    answer:'88',
    hint:'Total after 4 tests = 79 × 4 = 316. Total after 3 tests = 76 × 3 = 228. 4th = 316 − 228.',
    explanation:'Target total = 79 × 4 = 316. Previous total = 76 × 3 = 228. 4th test = 316 − 228 = <b>88</b>.' }),

  makeNum({ id:'A_W05', chapterId:'average', difficulty:4,
    question:'The average age of a family of <b>4 members</b> is <b>27 years</b>. When a baby is born, the new average age is <b>22 years</b>.<br>How old is the <b>baby</b>?',
    answer:'2', acceptableAnswers:['2','2 years','2 yrs'],
    hint:'Total age of 4 = 27×4=108. New total of 5 = 22×5=110. Baby age = 110−108.',
    explanation:'Old total = 108. New total = 110. Baby = 110 − 108 = <b>2 years old</b>.' }),

  makeNum({ id:'A_W06', chapterId:'average', difficulty:4,
    question:'Class A (30 students) has an average mark of <b>72</b>. Class B (20 students) has an average of <b>68</b>.<br>Find the <b>combined average</b> of both classes.',
    answer:'70.4',
    hint:'Total marks = (30×72) + (20×68). Combined average = total ÷ 50.',
    explanation:'Class A total = 2,160. Class B total = 1,360. Grand total = 3,520. Average = 3,520 ÷ 50 = <b>70.4</b>.' }),

  // ════════════════════════════════════════════════
  //  RATIO & PROPORTION
  // ════════════════════════════════════════════════
  makeNum({ id:'R_W01', chapterId:'ratio', difficulty:3,
    question:'To make orange paint, red and yellow are mixed in the ratio <b>3:2</b>.<br>How many ml of <b>red paint</b> is needed for <b>250 ml</b> of orange paint?',
    answer:'150', acceptableAnswers:['150','150ml','150 ml'],
    hint:'Total parts = 3+2=5. Red = 3/5 × 250.',
    explanation:'1 part = 250÷5 = 50 ml. Red = 3×50 = <b>150 ml</b>.' }),

  makeNum({ id:'R_W02', chapterId:'ratio', difficulty:3,
    question:'A map has a scale of <b>1:50,000</b>. Two towns are <b>6 cm apart</b> on the map.<br>What is the <b>actual distance</b> in km?',
    answer:'3', acceptableAnswers:['3','3km','3 km'],
    hint:'Actual = 6 × 50,000 = 300,000 cm. Convert: ÷ 100 for metres, ÷ 1000 for km.',
    explanation:'6 × 50,000 = 300,000 cm = 3,000 m = <b>3 km</b>.' }),

  makeNum({ id:'R_W03', chapterId:'ratio', difficulty:3,
    question:'A recipe for 4 people needs <b>300 g of flour</b> and <b>180 g of butter</b>.<br>How much <b>flour</b> is needed for <b>10 people</b>?',
    answer:'750', acceptableAnswers:['750','750g','750 g'],
    hint:'Flour for 1 person = 300÷4 = 75 g. For 10 = 75×10.',
    explanation:'75 g per person × 10 = <b>750 g</b>.' }),

  makeNum({ id:'R_W04', chapterId:'ratio', difficulty:4,
    question:'Ali, Ben and Cara share a prize in the ratio <b>4:3:2</b>. The prize is <b>Rs 4,500</b>.<br>How much does <b>Ben</b> receive?',
    answer:'1500', acceptableAnswers:['1500','Rs 1500'],
    hint:'Total parts = 4+3+2=9. Ben = 3/9 × 4,500.',
    explanation:'1 part = 4,500÷9 = 500. Ben = 3×500 = <b>Rs 1,500</b>.' }),

  makeNum({ id:'R_W05', chapterId:'ratio', difficulty:4,
    question:'A car travels <b>240 km</b> using <b>20 litres</b> of petrol.<br>How far will it travel on <b>35 litres</b>?',
    answer:'420', acceptableAnswers:['420','420km','420 km'],
    hint:'Distance per litre = 240÷20 = 12 km/L. For 35L = 12×35.',
    explanation:'12 km per litre × 35 = <b>420 km</b>.' }),

  makeNum({ id:'R_W06', chapterId:'ratio', difficulty:4,
    question:'The ratio of boys to girls in a school is <b>5:4</b>. There are <b>360 students</b> in total.<br>How many more <b>boys</b> than girls are there?',
    answer:'40',
    hint:'Boys = 5/9×360. Girls = 4/9×360. Difference = boys−girls.',
    explanation:'Boys = 200. Girls = 160. Difference = 200−160 = <b>40</b>.' }),

  // ════════════════════════════════════════════════
  //  LENGTH & PERIMETER
  // ════════════════════════════════════════════════
  makeNum({ id:'L_W01', chapterId:'length', difficulty:3,
    question:'A rectangular playground is <b>45 m long</b> and <b>28 m wide</b>.<br>Priya runs <b>twice around</b> the playground. How far does she run?',
    answer:'292', acceptableAnswers:['292','292m','292 m'],
    hint:'Perimeter = 2(45+28). Twice = 2 × perimeter.',
    explanation:'P = 2 × 73 = 146 m. Twice = 146 × 2 = <b>292 m</b>.' }),

  makeNum({ id:'L_W02', chapterId:'length', difficulty:3,
    question:'A square field has a perimeter of <b>196 m</b>.<br>What is the length of <b>one side</b>?',
    answer:'49', acceptableAnswers:['49','49m'],
    hint:'Perimeter of square = 4 × side. Side = 196 ÷ 4.',
    explanation:'196 ÷ 4 = <b>49 m</b>.' }),

  makeNum({ id:'L_W03', chapterId:'length', difficulty:3,
    question:'A rectangle has a perimeter of <b>84 cm</b> and a width of <b>18 cm</b>.<br>What is its <b>length</b>?',
    answer:'24', acceptableAnswers:['24','24cm'],
    hint:'P = 2(l+w). l+w = 84÷2 = 42. Length = 42−18.',
    explanation:'l+w = 42. l = 42−18 = <b>24 cm</b>.' }),

  makeNum({ id:'L_W04', chapterId:'length', difficulty:4,
    question:'A farmer fences a rectangular field <b>65 m × 40 m</b>. Fencing costs <b>Rs 85 per metre</b>.<br>What is the <b>total cost</b>?',
    answer:'17425', acceptableAnswers:['17425','Rs 17425','Rs 17,425'],
    hint:'P = 2(65+40) = 210 m. Cost = 210 × 85.',
    explanation:'P = 210 m. Cost = 210 × 85 = <b>Rs 17,425</b>.' }),

  makeNum({ id:'L_W05', chapterId:'length', difficulty:4,
    question:'A rectangular swimming pool is <b>25 m long</b> and <b>10 m wide</b>.<br>Rohan swims <b>20 lengths</b> each day for <b>5 days</b>. How many <b>km</b> does he swim in total?',
    answer:'2.5', acceptableAnswers:['2.5','2.5km'],
    hint:'One length = 25 m. 20 lengths = 500 m/day. 5 days = 2,500 m. Convert to km.',
    explanation:'500 m/day × 5 days = 2,500 m = <b>2.5 km</b>.' }),

  // ════════════════════════════════════════════════
  //  AREA
  // ════════════════════════════════════════════════
  makeNum({ id:'AR_W01', chapterId:'area', difficulty:3,
    question:'A rectangular hall is <b>18 m long</b> and <b>12 m wide</b>.<br>Tiles of <b>2 m × 2 m</b> are used to cover the floor. How many tiles are needed?',
    answer:'54',
    hint:'Hall area = 18×12 = 216 m². Tile area = 2×2 = 4 m². Tiles = 216÷4.',
    explanation:'Hall = 216 m². Tile = 4 m². Tiles = 216÷4 = <b>54 tiles</b>.' }),

  makeNum({ id:'AR_W02', chapterId:'area', difficulty:3,
    question:'A square garden has an area of <b>225 m²</b>. A path of <b>1 m width</b> runs along the inside of all four edges.<br>What is the area of the <b>path</b>?',
    answer:'56',
    hint:'Side = √225 = 15 m. Inner square side = 15−2 = 13 m. Path area = 225−(13×13).',
    explanation:'Inner area = 13² = 169 m². Path = 225−169 = <b>56 m²</b>.' }),

  makeNum({ id:'AR_W03', chapterId:'area', difficulty:4,
    question:'A rectangular room measures <b>9 m × 6 m</b>. Carpet costs <b>Rs 250 per m²</b>, but a <b>2 m × 3 m</b> area near the door will be left uncarpeted.<br>Find the <b>cost of carpeting</b>.',
    answer:'12000', acceptableAnswers:['12000','Rs 12000','Rs 12,000'],
    hint:'Carpet area = total room area − uncarpeted area. Cost = carpet area × 250.',
    explanation:'Room = 54 m². Uncarpeted = 6 m². Carpet = 48 m². Cost = 48×250 = <b>Rs 12,000</b>.' }),

  makeNum({ id:'AR_W04', chapterId:'area', difficulty:4,
    question:'A farm is shaped like an L. It is a <b>20 m × 15 m</b> rectangle with a <b>5 m × 8 m</b> piece cut from one corner.<br>Find the area of the farm.',
    answer:'260', acceptableAnswers:['260','260m2','260 m²'],
    hint:'Full rectangle area − cut-out area = farm area.',
    explanation:'Full = 20×15 = 300 m². Cut = 5×8 = 40 m². Farm = 300−40 = <b>260 m²</b>.' }),

  // ════════════════════════════════════════════════
  //  CAPACITY
  // ════════════════════════════════════════════════
  makeNum({ id:'C_W01', chapterId:'capacity', difficulty:3,
    question:'A tank holds <b>250 litres</b>. A pump fills it at <b>25 litres per minute</b>.<br>How many minutes does it take to fill the tank from <b>empty</b>?',
    answer:'10', acceptableAnswers:['10','10 minutes','10min'],
    hint:'Time = total capacity ÷ rate. 250 ÷ 25.',
    explanation:'250 ÷ 25 = <b>10 minutes</b>.' }),

  makeNum({ id:'C_W02', chapterId:'capacity', difficulty:3,
    question:'A bottle holds <b>1 L 250 mL</b> of juice. A family of 5 each drink <b>150 mL</b>.<br>How much juice is <b>left</b> after they all drink?',
    answer:'500', acceptableAnswers:['500','500mL','500 mL'],
    hint:'Total drunk = 5 × 150 mL. Left = 1,250 mL − total drunk.',
    explanation:'Total drunk = 5 × 150 = 750 mL. Left = 1,250 − 750 = <b>500 mL</b>.' }),

  makeNum({ id:'C_W03', chapterId:'capacity', difficulty:4,
    question:'A water tank holds <b>8,000 litres</b>. A household uses <b>650 litres per day</b>.<br>After <b>7 days</b>, how much water is <b>left</b> in the tank?',
    answer:'3450', acceptableAnswers:['3450','3450L','3,450'],
    hint:'Used = 650 × 7. Left = 8,000 − used.',
    explanation:'Used = 4,550 L. Left = 8,000 − 4,550 = <b>3,450 L</b>.' }),

  makeNum({ id:'C_W04', chapterId:'capacity', difficulty:4,
    question:'Lemonade is made by mixing <b>3 parts water</b> to <b>1 part lemon juice</b>.<br>To make <b>2 litres</b> of lemonade, how many <b>ml of lemon juice</b> are needed?',
    answer:'500', acceptableAnswers:['500','500mL','500 ml'],
    hint:'Total parts = 4. Juice = 1/4 × 2,000 mL.',
    explanation:'2,000 ÷ 4 = 500 mL. Juice = 1 × 500 = <b>500 mL</b>.' }),

  // ════════════════════════════════════════════════
  //  MASS
  // ════════════════════════════════════════════════
  makeNum({ id:'M_W01', chapterId:'mass', difficulty:3,
    question:'A lorry can carry a maximum of <b>5,000 kg</b>. It is loaded with <b>28 boxes</b>, each weighing <b>85 kg</b>.<br>How much more weight <b>can the lorry still carry</b>?',
    answer:'2620', acceptableAnswers:['2620','2620kg','2,620'],
    hint:'Total boxes = 28 × 85. Remaining = 5,000 − total.',
    explanation:'28 × 85 = 2,380 kg. Remaining = 5,000 − 2,380 = <b>2,620 kg</b>.' }),

  makeNum({ id:'M_W02', chapterId:'mass', difficulty:3,
    question:'A box of cereal contains <b>1 kg 250 g</b>. Ahmad eats <b>45 g</b> each morning.<br>How many <b>full servings</b> can he have from the box?',
    answer:'27',
    hint:'Total = 1,250 g. Servings = 1,250 ÷ 45 (take the whole number only).',
    explanation:'1,250 ÷ 45 = 27.7… → <b>27 full servings</b>.' }),

  makeNum({ id:'M_W03', chapterId:'mass', difficulty:4,
    question:'A butcher has <b>6 kg 500 g</b> of meat. He packs it into portions of <b>250 g</b> each.<br>How many portions does he get, and how much meat is <b>left over</b>?<br><i>Give just the leftover in grams.</i>',
    answer:'0', acceptableAnswers:['0','0g'],
    hint:'Total = 6,500 g. Portions = 6,500 ÷ 250 = 26. Remainder = 6,500 − 26×250.',
    explanation:'6,500 ÷ 250 = 26 exactly. <b>0 g leftover</b> (26 full portions).' }),

  makeNum({ id:'M_W04', chapterId:'mass', difficulty:4,
    question:'Three children weigh <b>32 kg 400 g</b>, <b>28 kg 750 g</b> and <b>35 kg 200 g</b>.<br>What is their <b>total weight</b>?',
    answer:'96kg350g', acceptableAnswers:['96kg350g','96 kg 350 g','96350g'],
    hint:'Add kg and g separately. g: 400+750+200=1350=1kg350g. kg: 32+28+35+1=96.',
    explanation:'g: 400+750+200=1350g=1kg 350g. kg: 32+28+35+1=96. Total = <b>96 kg 350 g</b>.' }),

  // ════════════════════════════════════════════════
  //  MONEY & PROFIT / LOSS
  // ════════════════════════════════════════════════
  makeNum({ id:'MO_W01', chapterId:'money', difficulty:3,
    question:'A trader buys <b>50 shirts</b> for <b>Rs 3,500</b> in total. He sells each shirt at <b>Rs 85</b>.<br>Find his <b>total profit</b>.',
    answer:'750', acceptableAnswers:['750','Rs 750'],
    hint:'Total selling = 50 × 85. Profit = selling − buying.',
    explanation:'Selling = Rs 4,250. Profit = 4,250 − 3,500 = <b>Rs 750</b>.' }),

  makeNum({ id:'MO_W02', chapterId:'money', difficulty:3,
    question:'Meera sold a bag for <b>Rs 480</b>, making a <b>loss of Rs 75</b>.<br>What was her <b>buying price</b>?',
    answer:'555', acceptableAnswers:['555','Rs 555'],
    hint:'When there is a loss: Buying Price = Selling Price + Loss.',
    explanation:'BP = 480 + 75 = <b>Rs 555</b>.' }),

  makeNum({ id:'MO_W03', chapterId:'money', difficulty:4,
    question:'A shopkeeper buys <b>12 dozen eggs</b> at <b>Rs 8 per egg</b>. He sells them at <b>Rs 11 per egg</b> but <b>18 eggs break</b> and cannot be sold.<br>Find his <b>total profit</b>.',
    answer:'270', acceptableAnswers:['270','Rs 270'],
    hint:'Total eggs = 12×12=144. Cost = 144×8. Sold = 144−18=126. Revenue = 126×11. Profit = revenue−cost.',
    explanation:'Cost = 144×8 = Rs 1,152. Sold = 126 eggs × Rs 11 = Rs 1,386. Profit = 1,386−1,152 = <b>Rs 270</b>.' }),

  makeNum({ id:'MO_W04', chapterId:'money', difficulty:4,
    question:'Mr Ali earned <b>Rs 22,500</b> last month. He spent <b>Rs 8,400</b> on rent, <b>Rs 5,200</b> on food and saved the rest.<br>What <b>percentage</b> of his earnings did he <b>save</b>?<br><i>(Write a whole number %)</i>',
    answer:'40', acceptableAnswers:['40','40%'],
    hint:'Saved = 22,500 − 8,400 − 5,200. Percentage = saved ÷ total × 100.',
    explanation:'Saved = Rs 8,900. Wait: 22,500−8,400=14,100−5,200=8,900. Hmm let me recalculate for clean answer: 22,500−8,400−5,200=8,900. 8,900/22,500 ≈ 39.5%. Let me fix: Rs 18,000 − Rs 6,300 − Rs 2,700 = Rs 9,000. 9,000/18,000 = 50%. Better. Saved = 22,500−8,400−5,100=9,000. 9,000/22,500=40%. Saved = Rs 9,000. 9,000÷22,500 × 100 = <b>40%</b>.' }),

  makeNum({ id:'MO_W05', chapterId:'money', difficulty:4,
    question:'A school tuck shop bought <b>30 boxes of biscuits</b> at <b>Rs 120 per box</b>. Each box contains <b>12 packets</b> sold at <b>Rs 15 each</b>.<br>Find the <b>profit</b> on all 30 boxes.',
    answer:'1800', acceptableAnswers:['1800','Rs 1800'],
    hint:'Cost = 30×120. Revenue = 30×12×15. Profit = revenue−cost.',
    explanation:'Cost = Rs 3,600. Revenue = 360×15 = Rs 5,400. Profit = 5,400−3,600 = <b>Rs 1,800</b>.' }),

  // ════════════════════════════════════════════════
  //  TIME
  // ════════════════════════════════════════════════
  makeNum({ id:'T_W01', chapterId:'time', difficulty:3,
    question:'A film starts at <b>18:45</b> and ends at <b>21:10</b>.<br>How long is the film?<br><i>(e.g. 2h25min)</i>',
    answer:'2h25min', acceptableAnswers:['2h25min','2 h 25 min','2h 25min'],
    hint:'21:10 − 18:45. Minutes: 10−45, borrow 1h → 70−45=25. Hours: 21−1−18=2.',
    explanation:'21:10 − 18:45 = <b>2 h 25 min</b>.' }),

  makeNum({ id:'T_W02', chapterId:'time', difficulty:3,
    question:'A train departs at <b>07:50</b> and arrives at <b>11:25</b>.<br>How long is the journey?<br><i>(e.g. 3h35min)</i>',
    answer:'3h35min', acceptableAnswers:['3h35min','3 h 35 min'],
    hint:'11:25 − 07:50. Min: 25−50, borrow → 85−50=35. Hours: 11−1−7=3.',
    explanation:'11:25 − 07:50 = <b>3 h 35 min</b>.' }),

  makeNum({ id:'T_W03', chapterId:'time', difficulty:3,
    question:'A baker puts bread in the oven at <b>9:40 am</b>. The bread takes <b>1 h 35 min</b> to bake.<br>At what time is the bread ready?',
    answer:'11:15am', acceptableAnswers:['11:15am','11:15 am','11:15'],
    hint:'9:40 + 1h = 10:40. 10:40 + 35 min: 40+35=75 min = 1h15min, so 11:15.',
    explanation:'9:40 + 1h = 10:40. 10:40 + 35 min = <b>11:15 am</b>.' }),

  makeNum({ id:'T_W04', chapterId:'time', difficulty:4,
    question:'A bus leaves Town A every <b>45 minutes</b>, starting at <b>06:00</b>.<br>What time does the <b>5th bus</b> leave?',
    answer:'09:00', acceptableAnswers:['09:00','9:00','9:00am'],
    hint:'4 gaps of 45 min = 180 min = 3 h. 06:00 + 3h = 09:00.',
    explanation:'5th bus = 4 intervals after 06:00. 4×45 = 180 min = 3 h. 06:00 + 3h = <b>09:00</b>.' }),

  makeNum({ id:'T_W05', chapterId:'time', difficulty:4,
    question:'Priya works from <b>08:30</b> to <b>16:00</b>, Monday to Friday.<br>She earns <b>Rs 120 per hour</b>. How much does she earn in <b>one week</b>?',
    answer:'4500', acceptableAnswers:['4500','Rs 4500'],
    hint:'Hours per day = 16:00−08:30 = 7h30min = 7.5h. Weekly = 7.5×5 days. Pay = hours × 120.',
    explanation:'7.5 h/day × 5 days = 37.5 h. 37.5 × 120 = <b>Rs 4,500</b>.' }),

  makeNum({ id:'T_W06', chapterId:'time', difficulty:4,
    question:'A school day starts at <b>08:45</b>. There are <b>6 periods</b> of <b>45 minutes</b> each and <b>2 breaks</b> of <b>15 minutes</b> each.<br>At what time does school end?',
    answer:'14:45', acceptableAnswers:['14:45','2:45pm','14h45'],
    hint:'6 periods × 45 min = 270 min. 2 breaks × 15 min = 30 min. Total = 300 min = 5 h. Add 5 h to 08:45.',
    explanation:'6×45=270 min + 2×15=30 min = 300 min = 5 h. 08:45 + 5h = <b>13:45</b>.' }),

  // ════════════════════════════════════════════════
  //  GRAPHS & DATA
  // ════════════════════════════════════════════════
  makeMCQ({ id:'GR_W01', chapterId:'graphs', difficulty:3,
    question:'A bar chart shows fruit sales for a week:<br>Apple=240, Banana=180, Mango=320, Orange=120, Pineapple=200.<br>Which fruit sold <b>twice as many</b> as Orange?',
    options:['Apple','Banana','Mango','Pineapple'],
    answer:'Apple',
    hint:'Twice Orange = 2 × 120 = 240. Which fruit bar equals 240?',
    explanation:'2 × Orange = 2 × 120 = 240 = Apple. <b>Apple</b> sold twice as many as Orange.' }),

  makeNum({ id:'GR_W02', chapterId:'graphs', difficulty:3,
    question:`A pictogram shows books read by 4 students:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Student</th><th>Symbols</th></tr>
  <tr><td>Amy</td><td><span class="picto-sym">🔷🔷🔷</span></td></tr>
  <tr><td>Ben</td><td><span class="picto-sym">🔷🔷</span></td></tr>
  <tr><td>Carl</td><td><span class="picto-sym">🔷🔷🔷🔷🔷</span></td></tr>
  <tr><td>Dina</td><td><span class="picto-sym">🔷🔷🔷🔷</span></td></tr>
</table>
<span class="picto-key">🔑 Key: 🔷 = 4 books</span>
</div>
How many books did <b>Carl and Dina together</b> read?`,
    answer:'36',
    hint:'Carl = 5×4=20. Dina = 4×4=16. Together = 20+16.',
    explanation:'Carl = 20 books. Dina = 16 books. Together = <b>36 books</b>.' }),

  makeNum({ id:'GR_W03', chapterId:'graphs', difficulty:3,
    question:'A bar chart shows the number of visitors to a park:<br>Mon=120, Tue=95, Wed=140, Thu=85, Fri=160.<br>What is the <b>average</b> number of visitors per day?',
    answer:'120',
    hint:'Add all 5 days, then divide by 5.',
    explanation:'120+95+140+85+160=600. 600÷5=<b>120 visitors</b>.' }),

  makeMCQ({ id:'GR_W04', chapterId:'graphs', difficulty:4,
    question:'A pie chart shows how a student spends 24 hours:<br>Sleep: 8h, School: 7h, Play: 3h, Homework: 2h, Other: 4h.<br>What fraction of the day is spent on <b>School and Homework combined</b>?',
    options:['3/8','3/4','5/8','1/4'],
    answer:'3/8',
    hint:'School+Homework = 7+2 = 9 hours. Fraction = 9/24. Simplify.',
    explanation:'9 h out of 24 h = 9/24 = <b>3/8</b> of the day.' }),

  makeNum({ id:'GR_W05', chapterId:'graphs', difficulty:4,
    question:`A pictogram shows monthly rainfall:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Month</th><th>Symbols</th></tr>
  <tr><td>January</td><td><span class="picto-sym">☂☂☂☂</span></td></tr>
  <tr><td>February</td><td><span class="picto-sym">☂☂</span></td></tr>
  <tr><td>March</td><td><span class="picto-sym">☂☂☂☂☂</span></td></tr>
  <tr><td>April</td><td><span class="picto-sym">☂☂☂</span></td></tr>
</table>
<span class="picto-key">🔑 Key: ☂ = 30 mm</span>
</div>
What is the <b>average monthly rainfall</b> over these 4 months?`,
    answer:'105', acceptableAnswers:['105','105mm'],
    hint:'Jan=120,Feb=60,Mar=150,Apr=90. Total=420. Average=420÷4.',
    explanation:'Total = 120+60+150+90 = 420 mm. Average = 420÷4 = <b>105 mm</b>.' }),

];

// Fix the T_W06 time question answer (answer is 13:45 per calculation; original had wrong value)
const tw06 = WP.find(q => q.id === 'T_W06');
if (tw06) {
  tw06.answer = '13:45';
  tw06.acceptableAnswers = ['13:45','1:45pm','13h45'];
  tw06.explanation = '6 periods × 45 min = 270 min. 2 breaks × 15 min = 30 min. Total = 300 min = 5 h. 08:45 + 5 h = <b>13:45</b>.';
}

// Fix MO_W04 explanation (recalculate to ensure clean answer)
const mow04 = WP.find(q => q.id === 'MO_W04');
if (mow04) {
  mow04.explanation = 'Saved = 22,500 − 8,400 − 5,100 = Rs 9,000. 9,000 ÷ 22,500 × 100 = <b>40%</b>.';
  mow04.question = 'Mr Ali earned <b>Rs 22,500</b> last month. He spent <b>Rs 8,400</b> on rent, <b>Rs 5,100</b> on food and saved the rest.<br>What <b>percentage</b> of his earnings did he <b>save</b>?<br><i>(Write a whole number %)</i>';
}

// Push all word problems into the main pool
WP.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });

console.log(`✅ Word problem bank loaded. Added ${WP.filter(Boolean).length} hand-crafted word problems.`);

})();
