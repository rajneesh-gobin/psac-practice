'use strict';
// Grade 6 Maths — extended reasoning bank
// Original PSAC-style multi-step problems, kept in the Grade 6 chapter and
// subsection vocabulary so they work in chapter and targeted practice.

STATIC_QUESTIONS.push(
  makeNum({ id:'g6r-num-01', chapterId:'g6-numeration', subsection:'word_probs', difficulty:4,
    question:'A charity needs <b>500,000</b> bottles for recycling. It has collected <b>186,745</b> in Term 1 and <b>147,892</b> in Term 2. How many more bottles are needed to reach the target?',
    answer:'165363', acceptableAnswers:['165363','165,363'], hint:'Add the two collections first, then subtract from 500,000.', explanation:'Collected = 186,745 + 147,892 = 334,637. Needed = 500,000 − 334,637 = <b>165,363 bottles</b>.' }),
  makeNum({ id:'g6r-num-02', chapterId:'g6-numeration', subsection:'sequences', difficulty:4,
    question:'Seats in an auditorium are numbered in rows. The first row has <b>125</b> seats, and each new row has <b>25</b> more seats than the row before. How many seats are in the <b>9th</b> row?',
    answer:'325', acceptableAnswers:['325'], hint:'From row 1 to row 9 there are eight increases of 25.', explanation:'125 + (8 × 25) = 125 + 200 = <b>325 seats</b>.' }),

  makeNum({ id:'g6r-ops-01', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'A printing company makes <b>1,248</b> revision sheets each hour for <b>18</b> hours. It packs them equally into boxes of <b>36</b>. How many full boxes are packed?',
    answer:'624', acceptableAnswers:['624'], hint:'Find total sheets, then divide by 36.', explanation:'1,248 × 18 = 22,464 sheets. 22,464 ÷ 36 = <b>624 boxes</b>.' }),
  makeNum({ id:'g6r-ops-02', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'A school orders <b>48</b> packets of exercise books. Each packet contains <b>144</b> books. It gives <b>18</b> books to each of <b>350</b> pupils. How many books are left?',
    answer:'612', acceptableAnswers:['612'], hint:'Find books ordered and books given out, then subtract.', explanation:'Ordered = 48 × 144 = 6,912. Given out = 350 × 18 = 6,300. Left = <b>612 books</b>.' }),

  makeNum({ id:'g6r-frac-01', chapterId:'g6-fractions', subsection:'word_probs', difficulty:4,
    question:'A farmer uses <b>3/8</b> of a field for tomatoes and <b>1/4</b> for beans. He divides the rest equally between flowers and paths. What fraction of the whole field is used for flowers?',
    answer:'3/16', acceptableAnswers:['3/16'], hint:'Find the fraction left after tomatoes and beans, then divide it by 2.', explanation:'Used = 3/8 + 1/4 = 3/8 + 2/8 = 5/8. Left = 3/8. Flowers get half of 3/8 = <b>3/16</b>.' }),
  makeNum({ id:'g6r-frac-02', chapterId:'g6-fractions', subsection:'word_probs', difficulty:4,
    question:'A recipe needs <b>2 1/4 cups</b> of flour. A baker makes <b>4</b> batches and has <b>10 cups</b> of flour. How many cups of flour remain?',
    answer:'1', acceptableAnswers:['1','1 cup'], hint:'Convert 2 1/4 to an improper fraction or decimal, then multiply by 4.', explanation:'2¼ × 4 = 9 cups. 10 − 9 = <b>1 cup</b> remains.' }),

  makeNum({ id:'g6r-dec-01', chapterId:'g6-decimals', subsection:'word_probs', difficulty:4,
    question:'A taxi travels <b>18.6 km</b> on Monday, <b>24.75 km</b> on Tuesday and <b>19.85 km</b> on Wednesday. Fuel costs <b>Rs 3.20</b> per kilometre. What is the fuel cost for the three days?',
    answer:'202.24', acceptableAnswers:['202.24','Rs 202.24'], hint:'Add the distances first, then multiply by Rs 3.20.', explanation:'Total distance = 18.60 + 24.75 + 19.85 = 63.20 km. Cost = 63.20 × 3.20 = <b>Rs 202.24</b>.' }),
  makeNum({ id:'g6r-dec-02', chapterId:'g6-decimals', subsection:'word_probs', difficulty:4,
    question:'A 2.5 L bottle of juice is poured equally into <b>8</b> cups. How many millilitres are in each cup?',
    answer:'312.5', acceptableAnswers:['312.5','312.50'], hint:'Convert litres to millilitres before dividing.', explanation:'2.5 L = 2,500 mL. 2,500 ÷ 8 = <b>312.5 mL</b> per cup.' }),

  makeNum({ id:'g6r-factor-01', chapterId:'g6-factors-hcf', subsection:'word_probs', difficulty:4,
    question:'A teacher has <b>84 red</b> and <b>126 blue</b> counters. She wants to make the greatest possible number of identical packs, with no counters left. How many packs can she make?',
    answer:'42', acceptableAnswers:['42'], hint:'Find the HCF of 84 and 126.', explanation:'The HCF of 84 and 126 is <b>42</b>. She can make 42 identical packs (2 red and 3 blue in each).' }),
  makeNum({ id:'g6r-factor-02', chapterId:'g6-factors-hcf', subsection:'word_probs', difficulty:4,
    question:'One bell rings every <b>18 minutes</b> and another rings every <b>24 minutes</b>. They ring together at 09:00. At what time will they next ring together?',
    answer:'1012', acceptableAnswers:['1012','10:12','10h12'], hint:'Find the LCM of 18 and 24 minutes.', explanation:'LCM(18, 24) = 72 minutes. 09:00 + 72 minutes = <b>10:12</b>.' }),

  makeNum({ id:'g6r-ratio-01', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:4,
    question:'At a club, the ratio of girls to boys is <b>5 : 4</b>. There are <b>72</b> children altogether. Later, <b>8 boys</b> join. What percentage of the club are girls then?',
    answer:'50', acceptableAnswers:['50','50%'], hint:'First find the number of girls. The number of girls does not change when the boys join.', explanation:'Each part = 72 ÷ 9 = 8. Girls = 5 × 8 = 40. New total = 80. 40/80 = <b>50%</b>.' }),
  makeNum({ id:'g6r-ratio-02', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:4,
    question:'A shop buys a bicycle for <b>Rs 8,000</b> and makes a <b>15%</b> profit. It then gives a <b>10%</b> discount on its marked selling price. What price does the customer pay?',
    answer:'8280', acceptableAnswers:['8280','Rs 8280','Rs 8,280'], hint:'Add 15% profit first. Then calculate 10% of that marked price and subtract it.', explanation:'Marked price = 8,000 + 15% of 8,000 = 8,000 + 1,200 = Rs 9,200. Discount = Rs 920. Customer pays <b>Rs 8,280</b>.' }),

  makeNum({ id:'g6r-geo-01', chapterId:'g6-geometry', subsection:'angles', difficulty:4,
    question:'A quadrilateral has angles of <b>85°</b>, <b>110°</b>, <b>72°</b> and one unknown angle. What is the unknown angle?',
    answer:'93', acceptableAnswers:['93','93°'], hint:'The angles inside a quadrilateral total 360°.', explanation:'Unknown = 360 − (85 + 110 + 72) = 360 − 267 = <b>93°</b>.' }),
  makeNum({ id:'g6r-geo-02', chapterId:'g6-geometry', subsection:'perimeter', difficulty:4,
    question:'A regular hexagonal garden has sides of <b>7.5 m</b>. A gate <b>1.5 m</b> wide replaces part of one side, so it is not fenced. How much fencing is needed?',
    answer:'43.5', acceptableAnswers:['43.5','43.50','43.5m','43.5 m'], hint:'Find the perimeter of the regular hexagon, then subtract the gate width.', explanation:'Perimeter = 6 × 7.5 = 45 m. Fencing needed = 45 − 1.5 = <b>43.5 m</b>.' }),

  makeNum({ id:'g6r-measure-01', chapterId:'g6-measure', subsection:'word_probs', difficulty:4,
    question:'A truck carries <b>1.75 tonnes</b> of sand in the morning and <b>850 kg</b> in the afternoon. Its maximum load for the day is <b>3 tonnes</b>. How many kilograms of capacity are still unused?',
    answer:'400', acceptableAnswers:['400'], hint:'Convert every mass to kilograms.', explanation:'1.75 tonnes = 1,750 kg. Total carried = 1,750 + 850 = 2,600 kg. Maximum = 3,000 kg. Unused capacity = <b>400 kg</b>.' }),
  makeNum({ id:'g6r-measure-02', chapterId:'g6-measure', subsection:'word_probs', difficulty:4,
    question:'A tourist changes <b>Rs 9,600</b> into euros at a rate of <b>Rs 48</b> for €1. She spends €<b>135</b>. How many euros does she have left?',
    answer:'65', acceptableAnswers:['65','€65'], hint:'First find the number of euros received, then subtract €135.', explanation:'9,600 ÷ 48 = €200. €200 − €135 = <b>€65</b> left.' }),

  makeNum({ id:'g6r-area-01', chapterId:'g6-area-vol', subsection:'word_probs', difficulty:4,
    question:'A cuboid fish tank is <b>80 cm</b> long, <b>35 cm</b> wide and <b>50 cm</b> high. It is filled to <b>3/4</b> of its volume. How many litres of water are in it?',
    answer:'105', acceptableAnswers:['105','105L','105 L'], hint:'Find the volume in cm³, take 3/4, then use 1,000 cm³ = 1 L.', explanation:'Full volume = 80 × 35 × 50 = 140,000 cm³. Three quarters = 105,000 cm³ = <b>105 L</b>.' }),
  makeNum({ id:'g6r-area-02', chapterId:'g6-area-vol', subsection:'word_probs', difficulty:4,
    question:'A rectangular wall is <b>8 m</b> by <b>3 m</b>. It has a door measuring <b>2 m</b> by <b>1 m</b>. Paint covers <b>5 m²</b> per litre. How many whole litres of paint are needed for the wall, excluding the door?',
    answer:'5', acceptableAnswers:['5'], hint:'Subtract the door area from the wall area, then divide by 5 m².', explanation:'Wall = 8 × 3 = 24 m². Door = 2 m². Area to paint = 22 m². 22 ÷ 5 = 4.4, so <b>5 whole litres</b> are needed.' }),

  makeNum({ id:'g6r-time-01', chapterId:'g6-time-speed', subsection:'word_probs', difficulty:4,
    question:'A bus leaves Port Louis at <b>07:45</b> and travels <b>126 km</b> at an average speed of <b>42 km/h</b>. It stops for <b>20 minutes</b> after arriving. At what time is it ready to leave again?',
    answer:'1105', acceptableAnswers:['1105','11:05','11h05'], hint:'Time travelling = distance ÷ speed. Then add it and the stop to 07:45.', explanation:'126 ÷ 42 = 3 hours. Arrival = 10:45. After 20 minutes, it is ready at <b>11:05</b>.' }),
  makeNum({ id:'g6r-time-02', chapterId:'g6-time-speed', subsection:'word_probs', difficulty:4,
    question:'When it is <b>14:30</b> in Mauritius (GMT+4), what time is it in a city at <b>GMT−3</b>?',
    answer:'0730', acceptableAnswers:['0730','07:30','7:30','07h30'], hint:'The time difference between GMT+4 and GMT−3 is 7 hours.', explanation:'The GMT−3 city is 7 hours behind Mauritius. 14:30 − 7 hours = <b>07:30</b>.' }),

  makeNum({ id:'g6r-graph-01', chapterId:'g6-graphs', subsection:'averages', difficulty:4,
    question:'The daily temperatures over five days were <b>26°C, 28°C, 30°C, 27°C</b> and one missing value. The mean temperature was <b>28°C</b>. What was the missing temperature?',
    answer:'29', acceptableAnswers:['29','29°C'], hint:'A mean of 28 over 5 days means a total of 140°C.', explanation:'Total needed = 5 × 28 = 140. Known total = 26 + 28 + 30 + 27 = 111. Missing temperature = <b>29°C</b>.' }),
  makeNum({ id:'g6r-graph-02', chapterId:'g6-graphs', subsection:'pie_chart', difficulty:4,
    question:'In a class survey of <b>120</b> pupils, a pie-chart sector for cycling has an angle of <b>90°</b>. How many pupils chose cycling?',
    answer:'30', acceptableAnswers:['30'], hint:'A full pie chart is 360°. Find what fraction 90° is of 360°, then apply it to 120.', explanation:'90/360 = 1/4. One quarter of 120 = <b>30 pupils</b>.' })
);
