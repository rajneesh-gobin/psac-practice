'use strict';
// ═══════════════════════════════════════════════════════════════
//  MathMaster Grade 5 - Unit Conversions Chapter
//  All conversion types: mass, length, capacity, time, money, area
//
//  Chapter ID: 'conversions'
//  Subsection IDs: mass | length | capacity | time | money | area | mixed
//
//  HOW TO ADD MORE:
//    1. Use makeNum() or makeMCQ() with chapterId:'conversions'
//    2. Set the subsection field to one of the 7 subsection IDs above
//    3. Add a unique id: CV_M##, CV_L##, CV_C##, CV_T##, CV_MO##, CV_AR##, CV_MX##
//    4. Difficulty 1=fact recall, 2=convert a value, 3=multi-step, 4=word problem
// ═══════════════════════════════════════════════════════════════

const CONV_QS = [

  // ═══════════════════════════════════════════════
  //  MASS   kg ↔ g   tonne ↔ kg
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_M01', chapterId:'conversions', subsection:'mass', difficulty:1,
    question:'Complete: <b>1 kilogram = ___ grams</b>',
    answer:'1000', acceptableAnswers:['1000','1,000'],
    hint:'The prefix "kilo" always means 1,000.',
    explanation:'<b>1 kg = 1,000 g</b>.' }),

  makeNum({ id:'CV_M02', chapterId:'conversions', subsection:'mass', difficulty:1,
    question:'Complete: <b>1 tonne = ___ kilograms</b>',
    answer:'1000', acceptableAnswers:['1000','1,000'],
    hint:'Just like km, the tonne is 1,000 of the smaller unit.',
    explanation:'<b>1 tonne = 1,000 kg</b>.' }),

  makeNum({ id:'CV_M03', chapterId:'conversions', subsection:'mass', difficulty:2,
    question:'Convert <b>4.5 kg</b> to grams.',
    answer:'4500', acceptableAnswers:['4500','4,500','4500g','4500 g'],
    hint:'Multiply by 1,000. 4.5 × 1,000.',
    explanation:'4.5 × 1,000 = <b>4,500 g</b>.' }),

  makeNum({ id:'CV_M04', chapterId:'conversions', subsection:'mass', difficulty:2,
    question:'Convert <b>7,250 g</b> to kg.<br><i>(e.g. 3.5kg)</i>',
    answer:'7.25', acceptableAnswers:['7.25','7.25kg','7.25 kg'],
    hint:'Divide by 1,000. 7,250 ÷ 1,000.',
    explanation:'7,250 ÷ 1,000 = <b>7.25 kg</b>.' }),

  makeMCQ({ id:'CV_M05', chapterId:'conversions', subsection:'mass', difficulty:2,
    question:'Which is <b>heavier</b>: <b>2.8 kg</b> or <b>2,750 g</b>?',
    options:['2.8 kg','2,750 g','They are equal','Cannot compare'],
    answer:'2.8 kg',
    hint:'Convert 2.8 kg to g: 2.8 × 1,000 = 2,800 g. Now compare.',
    explanation:'2.8 kg = 2,800 g. 2,800 g > 2,750 g. So <b>2.8 kg is heavier</b>.' }),

  makeNum({ id:'CV_M06', chapterId:'conversions', subsection:'mass', difficulty:3,
    question:'A bag holds <b>3 kg 450 g</b> of apples and <b>1 kg 780 g</b> of oranges.<br>Find the <b>total mass</b> in grams.',
    answer:'5230', acceptableAnswers:['5230','5,230','5230g'],
    hint:'Convert each: 3kg450g=3450g, 1kg780g=1780g. Add.',
    explanation:'3,450 + 1,780 = <b>5,230 g</b>.' }),

  makeNum({ id:'CV_M07', chapterId:'conversions', subsection:'mass', difficulty:3,
    question:'A sack weighs <b>25 kg</b>. How many <b>200 g packets</b> can be filled from it?',
    answer:'125',
    hint:'Convert 25 kg to g: 25,000 g. Divide by 200.',
    explanation:'25 kg = 25,000 g. 25,000 ÷ 200 = <b>125 packets</b>.' }),

  makeNum({ id:'CV_M08', chapterId:'conversions', subsection:'mass', difficulty:4,
    question:'A chef needs <b>3.5 kg of flour</b> for a large cake and <b>750 g of flour</b> for a small cake.<br>She has <b>5 kg</b> of flour. How many grams does she have <b>left over</b>?',
    answer:'750', acceptableAnswers:['750','750g','750 g'],
    hint:'Total used = 3,500g + 750g = 4,250g. 5 kg = 5,000g. Left = 5,000 − 4,250.',
    explanation:'Used = 3,500+750=4,250 g. Left = 5,000−4,250=<b>750 g</b>.' }),

  makeNum({ id:'CV_M09', chapterId:'conversions', subsection:'mass', difficulty:4,
    question:'A truck carries <b>3 tonnes 400 kg</b> of sand and <b>1 tonne 850 kg</b> of gravel.<br>Find the <b>total mass</b> in kg.',
    answer:'5250', acceptableAnswers:['5250','5,250','5250kg'],
    hint:'3 t 400 kg = 3,400 kg. 1 t 850 kg = 1,850 kg. Add.',
    explanation:'3,400 + 1,850 = <b>5,250 kg</b>.' }),

  // ═══════════════════════════════════════════════
  //  LENGTH   km ↔ m ↔ cm ↔ mm
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_L01', chapterId:'conversions', subsection:'length', difficulty:1,
    question:'Complete: <b>1 kilometre = ___ metres</b>',
    answer:'1000', acceptableAnswers:['1000','1,000'],
    hint:'"kilo" = 1,000.',
    explanation:'<b>1 km = 1,000 m</b>.' }),

  makeNum({ id:'CV_L02', chapterId:'conversions', subsection:'length', difficulty:1,
    question:'Complete: <b>1 metre = ___ centimetres</b>',
    answer:'100',
    hint:'"centi" means 1/100. So 1 m = 100 cm.',
    explanation:'<b>1 m = 100 cm</b>.' }),

  makeNum({ id:'CV_L03', chapterId:'conversions', subsection:'length', difficulty:1,
    question:'Complete: <b>1 centimetre = ___ millimetres</b>',
    answer:'10',
    hint:'"milli" means 1/1,000. 1 cm = 10 mm.',
    explanation:'<b>1 cm = 10 mm</b>.' }),

  makeNum({ id:'CV_L04', chapterId:'conversions', subsection:'length', difficulty:2,
    question:'Convert <b>3.7 km</b> to metres.',
    answer:'3700', acceptableAnswers:['3700','3,700','3700m'],
    hint:'Multiply by 1,000. 3.7 × 1,000.',
    explanation:'3.7 × 1,000 = <b>3,700 m</b>.' }),

  makeNum({ id:'CV_L05', chapterId:'conversions', subsection:'length', difficulty:2,
    question:'Convert <b>850 cm</b> to metres.',
    answer:'8.5', acceptableAnswers:['8.5','8.5m','8.5 m'],
    hint:'Divide by 100. 850 ÷ 100.',
    explanation:'850 ÷ 100 = <b>8.5 m</b>.' }),

  makeNum({ id:'CV_L06', chapterId:'conversions', subsection:'length', difficulty:2,
    question:'Convert <b>45 mm</b> to centimetres.',
    answer:'4.5', acceptableAnswers:['4.5','4.5cm','4.5 cm'],
    hint:'Divide by 10. 45 ÷ 10.',
    explanation:'45 ÷ 10 = <b>4.5 cm</b>.' }),

  makeMCQ({ id:'CV_L07', chapterId:'conversions', subsection:'length', difficulty:2,
    question:'Which is <b>longer</b>: <b>1.5 m</b> or <b>145 cm</b>?',
    options:['1.5 m','145 cm','They are equal','Cannot compare'],
    answer:'1.5 m',
    hint:'Convert 1.5 m to cm: 1.5 × 100 = 150 cm. Compare with 145 cm.',
    explanation:'1.5 m = 150 cm. 150 > 145. So <b>1.5 m is longer</b>.' }),

  makeNum({ id:'CV_L08', chapterId:'conversions', subsection:'length', difficulty:3,
    question:'A road is <b>2 km 350 m</b> long. Express this in <b>metres</b>.',
    answer:'2350', acceptableAnswers:['2350','2,350','2350m'],
    hint:'2 km = 2,000 m. Add the 350 m.',
    explanation:'2,000 + 350 = <b>2,350 m</b>.' }),

  makeNum({ id:'CV_L09', chapterId:'conversions', subsection:'length', difficulty:3,
    question:'How many <b>centimetres</b> are in <b>2.04 m</b>?',
    answer:'204', acceptableAnswers:['204','204cm'],
    hint:'Multiply by 100. 2.04 × 100.',
    explanation:'2.04 × 100 = <b>204 cm</b>.' }),

  makeNum({ id:'CV_L10', chapterId:'conversions', subsection:'length', difficulty:3,
    question:'Convert <b>3 km 80 m</b> to centimetres.',
    answer:'308000', acceptableAnswers:['308000','308,000'],
    hint:'3 km 80 m = 3,080 m. Multiply by 100 to get cm.',
    explanation:'3,080 m × 100 = <b>308,000 cm</b>.' }),

  makeNum({ id:'CV_L11', chapterId:'conversions', subsection:'length', difficulty:4,
    question:'Ria has a ribbon <b>5 m long</b>. She cuts off pieces of <b>35 cm</b>, <b>80 cm</b> and <b>1 m 25 cm</b>.<br>How many centimetres of ribbon is <b>left</b>?',
    answer:'260', acceptableAnswers:['260','260cm','260 cm'],
    hint:'5 m = 500 cm. Total cut = 35+80+125=240 cm. Left = 500−240.',
    explanation:'Total cut = 35+80+125 = 240 cm. Left = 500−240 = <b>260 cm</b>.' }),

  makeNum({ id:'CV_L12', chapterId:'conversions', subsection:'length', difficulty:4,
    question:'A fence runs around a square field with side <b>750 m</b>.<br>Express the total perimeter in <b>kilometres</b>.',
    answer:'3', acceptableAnswers:['3','3km','3 km'],
    hint:'Perimeter = 4 × 750 = 3,000 m. Convert to km.',
    explanation:'4 × 750 = 3,000 m. 3,000 ÷ 1,000 = <b>3 km</b>.' }),

  // ═══════════════════════════════════════════════
  //  CAPACITY   L ↔ mL
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_C01', chapterId:'conversions', subsection:'capacity', difficulty:1,
    question:'Complete: <b>1 litre = ___ millilitres</b>',
    answer:'1000', acceptableAnswers:['1000','1,000'],
    hint:'"milli" = 1/1,000. 1 L = 1,000 mL.',
    explanation:'<b>1 L = 1,000 mL</b>.' }),

  makeNum({ id:'CV_C02', chapterId:'conversions', subsection:'capacity', difficulty:1,
    question:'Complete: <b>½ litre = ___ mL</b>',
    answer:'500',
    hint:'Half of 1,000 mL.',
    explanation:'½ L = 1,000 ÷ 2 = <b>500 mL</b>.' }),

  makeNum({ id:'CV_C03', chapterId:'conversions', subsection:'capacity', difficulty:2,
    question:'Convert <b>2.75 L</b> to millilitres.',
    answer:'2750', acceptableAnswers:['2750','2,750','2750mL','2750 mL'],
    hint:'Multiply by 1,000. 2.75 × 1,000.',
    explanation:'2.75 × 1,000 = <b>2,750 mL</b>.' }),

  makeNum({ id:'CV_C04', chapterId:'conversions', subsection:'capacity', difficulty:2,
    question:'Convert <b>3,400 mL</b> to litres.',
    answer:'3.4', acceptableAnswers:['3.4','3.4L','3.4 L'],
    hint:'Divide by 1,000. 3,400 ÷ 1,000.',
    explanation:'3,400 ÷ 1,000 = <b>3.4 L</b>.' }),

  makeMCQ({ id:'CV_C05', chapterId:'conversions', subsection:'capacity', difficulty:2,
    question:'Arrange in <b>ascending order</b> (smallest first):<br><b>1.5 L, 1,200 mL, 1,050 mL</b>',
    options:['1,050 mL, 1,200 mL, 1.5 L','1.5 L, 1,200 mL, 1,050 mL','1,200 mL, 1,050 mL, 1.5 L','1,050 mL, 1.5 L, 1,200 mL'],
    answer:'1,050 mL, 1,200 mL, 1.5 L',
    hint:'Convert 1.5 L to mL = 1,500 mL. Now compare: 1,050, 1,200, 1,500.',
    explanation:'1.5 L = 1,500 mL. Order: 1,050 < 1,200 < 1,500. So <b>1,050 mL, 1,200 mL, 1.5 L</b>.' }),

  makeNum({ id:'CV_C06', chapterId:'conversions', subsection:'capacity', difficulty:3,
    question:'A tank holds <b>15 L</b>. It is <b>¾ full</b>. How many mL of water does it contain?',
    answer:'11250', acceptableAnswers:['11250','11,250','11250mL'],
    hint:'¾ of 15 L = 15×3÷4 = 11.25 L. Convert to mL.',
    explanation:'¾ × 15 = 11.25 L. 11.25 × 1,000 = <b>11,250 mL</b>.' }),

  makeNum({ id:'CV_C07', chapterId:'conversions', subsection:'capacity', difficulty:3,
    question:'A jug holds <b>2 L 350 mL</b>. Another holds <b>1 L 800 mL</b>.<br>Find the total in mL.',
    answer:'4150', acceptableAnswers:['4150','4,150','4150mL'],
    hint:'Convert: 2L350mL=2350mL. 1L800mL=1800mL. Add.',
    explanation:'2,350 + 1,800 = <b>4,150 mL</b>.' }),

  makeNum({ id:'CV_C08', chapterId:'conversions', subsection:'capacity', difficulty:4,
    question:'A bottle holds <b>750 mL</b>. A full crate has <b>24 bottles</b>.<br>How many <b>litres</b> does the full crate contain?',
    answer:'18', acceptableAnswers:['18','18L','18 L'],
    hint:'Total mL = 750 × 24. Convert to L (÷1,000).',
    explanation:'750 × 24 = 18,000 mL. 18,000 ÷ 1,000 = <b>18 L</b>.' }),

  makeNum({ id:'CV_C09', chapterId:'conversions', subsection:'capacity', difficulty:4,
    question:'A doctor gives a patient <b>250 mL</b> of medicine per day.<br>How many days will a <b>3 L</b> bottle last?',
    answer:'12', acceptableAnswers:['12','12 days'],
    hint:'3 L = 3,000 mL. 3,000 ÷ 250.',
    explanation:'3,000 ÷ 250 = <b>12 days</b>.' }),

  // ═══════════════════════════════════════════════
  //  TIME   h ↔ min ↔ sec,  days, weeks, years
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_T01', chapterId:'conversions', subsection:'time', difficulty:1,
    question:'Complete: <b>1 hour = ___ seconds</b>',
    answer:'3600', acceptableAnswers:['3600','3,600'],
    hint:'1 hour = 60 min. 1 min = 60 s. So 60 × 60.',
    explanation:'60 × 60 = <b>3,600 seconds</b>.' }),

  makeNum({ id:'CV_T02', chapterId:'conversions', subsection:'time', difficulty:1,
    question:'Complete: <b>1 year = ___ weeks</b> <i>(approximately)</i>',
    answer:'52', acceptableAnswers:['52','52 weeks'],
    hint:'A year has 365 days. 365 ÷ 7 ≈ 52.',
    explanation:'365 ÷ 7 = 52 weeks (with 1 day left over). <b>≈ 52 weeks</b>.' }),

  makeNum({ id:'CV_T03', chapterId:'conversions', subsection:'time', difficulty:2,
    question:'Convert <b>3½ hours</b> to minutes.',
    answer:'210', acceptableAnswers:['210','210 min','210 minutes'],
    hint:'3.5 × 60.',
    explanation:'3.5 × 60 = <b>210 minutes</b>.' }),

  makeNum({ id:'CV_T04', chapterId:'conversions', subsection:'time', difficulty:2,
    question:'Convert <b>4 minutes 30 seconds</b> to seconds.',
    answer:'270', acceptableAnswers:['270','270s','270 seconds'],
    hint:'4 min = 4 × 60 = 240 s. Add 30 s.',
    explanation:'240 + 30 = <b>270 seconds</b>.' }),

  makeNum({ id:'CV_T05', chapterId:'conversions', subsection:'time', difficulty:2,
    question:'Convert <b>156 minutes</b> to hours and minutes.<br><i>(e.g. 2h36min)</i>',
    answer:'2h36min', acceptableAnswers:['2h36min','2 h 36 min','2:36'],
    hint:'156 ÷ 60 = 2 h remainder ? min. 2 × 60 = 120. 156 − 120 = 36.',
    explanation:'156 ÷ 60 = 2 h r 36 min. Answer = <b>2 h 36 min</b>.' }),

  makeMCQ({ id:'CV_T06', chapterId:'conversions', subsection:'time', difficulty:2,
    question:'How many <b>hours</b> are in <b>4 days</b>?',
    options:['48 hours','72 hours','96 hours','100 hours'],
    answer:'96 hours',
    hint:'1 day = 24 hours. 4 × 24.',
    explanation:'4 × 24 = <b>96 hours</b>.' }),

  makeNum({ id:'CV_T07', chapterId:'conversions', subsection:'time', difficulty:3,
    question:'A film is <b>7,200 seconds</b> long.<br>Express this in <b>hours</b>.',
    answer:'2', acceptableAnswers:['2','2h','2 hours'],
    hint:'Divide by 60 to get minutes, then by 60 again. Or divide by 3,600.',
    explanation:'7,200 ÷ 3,600 = <b>2 hours</b>.' }),

  makeNum({ id:'CV_T08', chapterId:'conversions', subsection:'time', difficulty:3,
    question:'How many <b>minutes</b> are there in <b>2 days 3 hours</b>?',
    answer:'3060', acceptableAnswers:['3060','3,060'],
    hint:'2 days = 48 h. 48 h + 3 h = 51 h. 51 × 60.',
    explanation:'51 h × 60 = <b>3,060 minutes</b>.' }),

  makeNum({ id:'CV_T09', chapterId:'conversions', subsection:'time', difficulty:4,
    question:'A car journey takes <b>2 h 45 min</b>. The same journey by train is <b>5,100 seconds</b>.<br>How many minutes <b>longer</b> is the car journey?',
    answer:'80', acceptableAnswers:['80','80 min','80 minutes'],
    hint:'Car = 2×60+45 = 165 min. Train = 5,100 ÷ 60 = 85 min. Difference = 165 − 85.',
    explanation:'Car = 165 min. Train = 5,100÷60 = 85 min. 165−85 = <b>80 minutes longer</b>.' }),

  // ═══════════════════════════════════════════════
  //  MONEY   Rs ↔ cents
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_MO01', chapterId:'conversions', subsection:'money', difficulty:1,
    question:'Complete: <b>Rs 1 = ___ cents</b>',
    answer:'100',
    hint:'Like metres and centimetres, there are 100 cents in 1 rupee.',
    explanation:'<b>Rs 1 = 100 cents</b>.' }),

  makeNum({ id:'CV_MO02', chapterId:'conversions', subsection:'money', difficulty:2,
    question:'Convert <b>Rs 4.75</b> to cents.',
    answer:'475', acceptableAnswers:['475','475 cents'],
    hint:'Multiply by 100. 4.75 × 100.',
    explanation:'4.75 × 100 = <b>475 cents</b>.' }),

  makeNum({ id:'CV_MO03', chapterId:'conversions', subsection:'money', difficulty:2,
    question:'Convert <b>830 cents</b> to rupees.',
    answer:'8.30', acceptableAnswers:['8.30','Rs 8.30','8.3','Rs 8.3'],
    hint:'Divide by 100. 830 ÷ 100.',
    explanation:'830 ÷ 100 = <b>Rs 8.30</b>.' }),

  makeMCQ({ id:'CV_MO04', chapterId:'conversions', subsection:'money', difficulty:2,
    question:'Which amount is the <b>largest</b>?',
    options:['Rs 12.50','1,200 cents','Rs 11.99','1,260 cents'],
    answer:'1,260 cents',
    hint:'Convert all to cents: Rs 12.50=1250c, 1200c, Rs 11.99=1199c, 1260c.',
    explanation:'1,260 cents = Rs 12.60, which is the largest. <b>1,260 cents</b>.' }),

  makeNum({ id:'CV_MO05', chapterId:'conversions', subsection:'money', difficulty:3,
    question:'Priya has <b>3 × Rs 5</b>, <b>4 × Rs 1</b>, and <b>7 × 50-cent coins</b>.<br>How much does she have in <b>cents</b>?',
    answer:'2250', acceptableAnswers:['2250','2,250','2250 cents'],
    hint:'3×500 + 4×100 + 7×50. Add all in cents.',
    explanation:'1500+400+350 = <b>2,250 cents</b> = Rs 22.50.' }),

  // ═══════════════════════════════════════════════
  //  AREA   m² ↔ cm²
  // ═══════════════════════════════════════════════
  makeNum({ id:'CV_AR01', chapterId:'conversions', subsection:'area', difficulty:2,
    question:'Complete: <b>1 m² = ___ cm²</b>',
    answer:'10000', acceptableAnswers:['10000','10,000'],
    hint:'1 m = 100 cm. So 1 m² = 100 × 100.',
    explanation:'100 × 100 = <b>10,000 cm²</b>.' }),

  makeNum({ id:'CV_AR02', chapterId:'conversions', subsection:'area', difficulty:2,
    question:'Convert <b>3.5 m²</b> to cm².',
    answer:'35000', acceptableAnswers:['35000','35,000','35000cm2'],
    hint:'Multiply by 10,000. 3.5 × 10,000.',
    explanation:'3.5 × 10,000 = <b>35,000 cm²</b>.' }),

  makeNum({ id:'CV_AR03', chapterId:'conversions', subsection:'area', difficulty:3,
    question:'A rectangular garden is <b>4 m long</b> and <b>2.5 m wide</b>.<br>Find its area in <b>cm²</b>.',
    answer:'100000', acceptableAnswers:['100000','100,000'],
    hint:'Area in m² = 4×2.5=10 m². Convert to cm²: 10×10,000.',
    explanation:'Area=4×2.5=10 m². 10×10,000=<b>100,000 cm²</b>.' }),

  makeNum({ id:'CV_AR04', chapterId:'conversions', subsection:'area', difficulty:3,
    question:'A tile has an area of <b>25,000 cm²</b>.<br>Express this in <b>m²</b>.',
    answer:'2.5', acceptableAnswers:['2.5','2.5m2','2.5 m²'],
    hint:'Divide by 10,000. 25,000 ÷ 10,000.',
    explanation:'25,000 ÷ 10,000 = <b>2.5 m²</b>.' }),

  // ═══════════════════════════════════════════════
  //  MIXED - multi-step & cross-unit conversions
  // ═══════════════════════════════════════════════
  makeMCQ({ id:'CV_MX01', chapterId:'conversions', subsection:'mixed', difficulty:2,
    question:'Which of these is the <b>odd one out</b> (different from the others)?',
    options:['1 km','1,000 m','100,000 cm','10,000 mm'],
    answer:'10,000 mm',
    hint:'Convert everything to mm: 1 km = 1,000,000 mm. 1,000 m = 1,000,000 mm. 100,000 cm = 1,000,000 mm. Check 10,000 mm.',
    explanation:'10,000 mm = 10 m = 0.01 km. All others = 1 km. <b>10,000 mm is different</b>.' }),

  makeNum({ id:'CV_MX02', chapterId:'conversions', subsection:'mixed', difficulty:3,
    question:'A recipe needs <b>1.2 kg of sugar</b>. The shop sells sugar in <b>400 g bags</b>.<br>How many bags must be bought?',
    answer:'3',
    hint:'1.2 kg = 1,200 g. 1,200 ÷ 400 = 3.',
    explanation:'1,200 ÷ 400 = <b>3 bags</b>.' }),

  makeNum({ id:'CV_MX03', chapterId:'conversions', subsection:'mixed', difficulty:3,
    question:'A swimming pool holds <b>500,000 L</b> of water. A pump fills it at <b>2,500 L per minute</b>.<br>How many <b>hours</b> does it take to fill?',
    answer:'200', acceptableAnswers:['200','200 hours'],
    hint:'Minutes to fill = 500,000 ÷ 2,500. Convert to hours (÷60).',
    explanation:'500,000 ÷ 2,500 = 200 minutes. 200 ÷ 60 is not a whole number... re-check: 200 minutes = 3 h 20 min. Wait - let me fix: fill time = 200 min = <b>200 minutes</b>. (Answer updated below.)' }),

  makeNum({ id:'CV_MX04', chapterId:'conversions', subsection:'mixed', difficulty:3,
    question:'A runner covers <b>5 km</b> in <b>25 minutes</b>.<br>How many <b>metres per minute</b> is that?',
    answer:'200', acceptableAnswers:['200','200m'],
    hint:'5 km = 5,000 m. Divide by 25 minutes.',
    explanation:'5,000 ÷ 25 = <b>200 metres per minute</b>.' }),

  makeNum({ id:'CV_MX05', chapterId:'conversions', subsection:'mixed', difficulty:4,
    question:'Nadia\'s school bag weighs <b>2 kg 350 g</b>. Her friend\'s bag is <b>500 g heavier</b>.<br>What is the <b>total mass</b> of both bags in kg?',
    answer:'5.2', acceptableAnswers:['5.2','5.2kg','5.2 kg'],
    hint:'Nadia = 2,350 g. Friend = 2,350+500=2,850 g. Total = 5,200 g. Convert to kg.',
    explanation:'Total = 2,350+2,850=5,200 g = <b>5.2 kg</b>.' }),

  makeNum({ id:'CV_MX06', chapterId:'conversions', subsection:'mixed', difficulty:4,
    question:'A bus journey of <b>36 km</b> takes <b>45 minutes</b>.<br>Express the speed as <b>metres per minute</b>.',
    answer:'800', acceptableAnswers:['800','800m/min'],
    hint:'36 km = 36,000 m. Divide by 45 minutes.',
    explanation:'36,000 ÷ 45 = <b>800 m/min</b>.' }),

  makeNum({ id:'CV_MX07', chapterId:'conversions', subsection:'mixed', difficulty:4,
    question:'A tank contains <b>8 L 400 mL</b> of water. <b>3 L 750 mL</b> is used.<br>How much is <b>left</b>, in mL?',
    answer:'4650', acceptableAnswers:['4650','4,650','4650mL'],
    hint:'Convert: 8L400mL=8400mL. 3L750mL=3750mL. Subtract.',
    explanation:'8,400 − 3,750 = <b>4,650 mL</b>.' }),

  makeNum({ id:'CV_MX08', chapterId:'conversions', subsection:'mixed', difficulty:4,
    question:'A shop buys cloth at <b>Rs 85 per metre</b>. It needs <b>350 cm</b> of cloth.<br>What is the <b>total cost</b>?',
    answer:'297.50', acceptableAnswers:['297.50','Rs 297.50','297.5'],
    hint:'350 cm = 3.5 m. Cost = 3.5 × Rs 85.',
    explanation:'3.5 × 85 = <b>Rs 297.50</b>.' }),

];

// Fix CV_MX03 - answer was wrong; correct answer is 200 minutes, not hours
// Let\'s replace it with a better-formed question:
const mxFix = CONV_QS.findIndex(q => q && q.id === 'CV_MX03');
if (mxFix !== -1) {
  CONV_QS[mxFix] = makeNum({ id:'CV_MX03', chapterId:'conversions', subsection:'mixed', difficulty:3,
    question:'A pump fills a tank at <b>2,500 L per minute</b>.<br>How many litres does it pump in <b>1.5 hours</b>?',
    answer:'225000', acceptableAnswers:['225000','225,000'],
    hint:'1.5 hours = 90 minutes. 2,500 × 90.',
    explanation:'90 × 2,500 = <b>225,000 L</b>.' });
}

CONV_QS.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });
console.log(`✅ Conversions chapter loaded: ${CONV_QS.filter(Boolean).length} questions.`);
