'use strict';
// Grade 4 Maths - Chapter: Data Handling (pictograms, bar charts)
// IDs format: g4m-data-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-data-001', chapterId:'g4-data', difficulty:1,
    question:'In a PICTOGRAM, each symbol represents 5 students. A row shows 4 symbols. How many students does this row represent?',
    options:['4','5','20','25'],
    answer:'20',
    hint:'Multiply the number of symbols by the value of each symbol.',
    explanation:'4 symbols x 5 = <b>20 students</b>. Always check the KEY of a pictogram to find out what each symbol is worth before reading the data.' }),

  makeMCQ({ id:'g4m-data-002', chapterId:'g4-data', difficulty:1,
    question:'A BAR CHART is most useful for:',
    options:['Showing changes over time','Comparing different categories','Showing parts of a whole','Tracking temperature'],
    answer:'Comparing different categories',
    hint:'Think about what the bars in a bar chart show side by side.',
    explanation:'A <b>bar chart</b> is best for comparing quantities in different categories (e.g. favourite colours, number of pets). Line graphs show changes over time; pie charts show parts of a whole.' }),

  makeMCQ({ id:'g4m-data-003', chapterId:'g4-data', difficulty:2,
    question:'A bar chart shows favourite sports. The bars show: Football = 30, Cricket = 25, Swimming = 20, Badminton = 15. Which sport is LEAST popular?',
    options:['Football','Cricket','Swimming','Badminton'],
    answer:'Badminton',
    hint:'The LEAST popular has the SHORTEST bar.',
    explanation:'<b>Badminton</b> has the shortest bar (15 students). The shortest bar always represents the smallest value in a bar chart.' }),

  makeNum({ id:'g4m-data-004', chapterId:'g4-data', difficulty:2,
    question:'Using the same bar chart (Football=30, Cricket=25, Swimming=20, Badminton=15): How many MORE students prefer Football than Badminton?',
    answer:'15', acceptableAnswers:['15'],
    hint:'Subtract: Football value - Badminton value.',
    explanation:'Football = 30. Badminton = 15. Difference = 30 - 15 = <b>15 more students</b> prefer Football.' }),

  makeNum({ id:'g4m-data-005', chapterId:'g4-data', difficulty:2,
    question:'In a pictogram, each symbol = 4 students. A row shows 3 and a HALF symbols. How many students are represented?',
    answer:'14', acceptableAnswers:['14'],
    hint:'3 full symbols = 3 x 4 = 12. Half a symbol = 2. Add them.',
    explanation:'3 full symbols = 3 x 4 = 12. Half symbol = 4 / 2 = 2. Total = 12 + 2 = <b>14 students</b>. In pictograms, half a symbol represents half the value of a full symbol.' }),

  makeTF({ id:'g4m-data-006', chapterId:'g4-data', difficulty:1,
    question:'A bar chart MUST have a TITLE to be correctly drawn.',
    answer:true,
    hint:'Think of all the things needed to make a chart clear and complete.',
    explanation:'<b>True.</b> A complete bar chart must have: a title, labels on both axes (x and y), a scale on the y-axis, and bars of equal width with equal spacing. Without a title, the reader does not know what the chart is about.' }),

  makeNum({ id:'g4m-data-007', chapterId:'g4-data', difficulty:2,
    question:'Using the bar chart (Football=30, Cricket=25, Swimming=20, Badminton=15): How many students were surveyed in TOTAL?',
    answer:'90', acceptableAnswers:['90'],
    hint:'Add all the bar values together.',
    explanation:'30 + 25 + 20 + 15 = <b>90 students</b> were surveyed in total. Finding totals from bar charts is a key MIE Grade 4 data handling skill.' }),

  makeMCQ({ id:'g4m-data-008', chapterId:'g4-data', difficulty:2,
    question:'On a bar chart, the scale goes up in steps of 5 (0, 5, 10, 15, 20...). A bar reaches EXACTLY the 20 mark. What value does this bar represent?',
    options:['15','20','25','between 15 and 20'],
    answer:'20',
    hint:'Read the value at the TOP of the bar, where it meets the scale line.',
    explanation:'The bar reaches exactly the 20 mark on the scale, so it represents <b>20</b>. Always read the value at the very top of the bar. If it is between two scale lines, estimate (e.g. halfway between 20 and 25 = about 22 or 23).' }),

  makeMCQ({ id:'g4m-data-009', chapterId:'g4-data', difficulty:1,
    question:'In a PICTOGRAM, what does the KEY (legend) tell you?',
    options:['The title of the chart','What each symbol represents','The total number of items','The year the data was collected'],
    answer:'What each symbol represents',
    hint:'The KEY shows the value of one picture/symbol.',
    explanation:'The <b>KEY</b> in a pictogram tells you the value of each symbol. For example "Each heart symbol = 10 students". Always read the key before interpreting a pictogram.' }),

  makeNum({ id:'g4m-data-010', chapterId:'g4-data', difficulty:3,
    question:'A teacher surveys 40 students about their favourite sport: Football=16, Cricket=12, Swimming=8, Badminton=4. How many students chose EITHER Football OR Cricket?',
    answer:'28', acceptableAnswers:['28'],
    hint:'Add the Football total and the Cricket total.',
    explanation:'Football = 16. Cricket = 12. Football or Cricket = 16 + 12 = <b>28 students</b>. This is a two-step reading and addition problem from a bar chart.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-data-011', chapterId:'g4-data', difficulty:1,
    question:'What is the MODE of this set of numbers: 3, 5, 7, 5, 9, 5, 3?',
    options:['3','5','7','9'],
    answer:'5',
    hint:'The mode is the value that appears MOST OFTEN.',
    explanation:'Count each value: 3 appears twice, 5 appears <b>three</b> times, 7 once, 9 once. The mode is <b>5</b>. A data set can have more than one mode if two values tie.' }),

  makeNum({ id:'g4m-data-012', chapterId:'g4-data', difficulty:2,
    question:'What is the RANGE of this data: 12, 5, 18, 7, 15?',
    answer:'13', acceptableAnswers:['13'],
    hint:'Range = highest value − lowest value.',
    explanation:'Highest = 18. Lowest = 5. Range = 18 − 5 = <b>13</b>. The range shows how spread out the data is.' }),

  makeNum({ id:'g4m-data-013', chapterId:'g4-data', difficulty:2,
    question:'Five children scored: 8, 6, 9, 7, 5 marks in a quiz. What is the MEDIAN score?',
    answer:'7', acceptableAnswers:['7'],
    hint:'Arrange the scores from smallest to largest. The median is the MIDDLE value.',
    explanation:'Arrange in order: 5, 6, <b>7</b>, 8, 9. The middle value (3rd of 5) is <b>7</b>. The median is found by ordering data and taking the middle value.' }),

  makeNum({ id:'g4m-data-014', chapterId:'g4-data', difficulty:2,
    question:'A frequency table shows favourite colours: Red=8, Blue=5, Green=12, Yellow=3. How many students were surveyed in TOTAL?',
    answer:'28', acceptableAnswers:['28'],
    hint:'Add all the frequencies: 8 + 5 + 12 + 3.',
    explanation:'8 + 5 + 12 + 3 = <b>28 students</b>. Adding all frequencies gives the total number of items in the data set.' }),

  makeNum({ id:'g4m-data-015', chapterId:'g4-data', difficulty:2,
    question:'A pictogram shows books read per month. Each full book symbol = 6 books. In March there are 3½ symbols. How many books were read in March?',
    answer:'21', acceptableAnswers:['21'],
    hint:'3 full symbols = 3×6. Half a symbol = 6÷2. Add both.',
    explanation:'3 × 6 = 18. Half symbol = 6 ÷ 2 = 3. Total = 18 + 3 = <b>21 books</b>. Half a symbol always equals half the key value.' }),

  makeTF({ id:'g4m-data-016', chapterId:'g4-data', difficulty:2,
    question:'On a bar chart, all bars must be the SAME WIDTH.',
    answer:true,
    hint:'Think about what makes a bar chart easy to read and compare.',
    explanation:'<b>True.</b> Bars on a bar chart must all be the same width and equally spaced. Comparison between categories depends on HEIGHT only. Unequal bar widths would be misleading.' }),

  makeNum({ id:'g4m-data-017', chapterId:'g4-data', difficulty:3,
    question:'A bar chart shows monthly rainfall (mm): Jan=80, Feb=60, Mar=100, Apr=40. What is the MEAN (average) rainfall per month?',
    answer:'70', acceptableAnswers:['70','70 mm'],
    hint:'Mean = total ÷ number of months. Add all values, then divide by 4.',
    explanation:'Total = 80 + 60 + 100 + 40 = 280 mm. Mean = 280 ÷ 4 = <b>70 mm</b>. The mean: (sum of all values) ÷ (number of values). MIE Grade 4: finding the mean/average.' }),

  makeMCQ({ id:'g4m-data-018', chapterId:'g4-data', difficulty:3,
    question:'On a bar chart, the scale goes up in steps of 4 (0, 4, 8, 12…). A bar for Science falls exactly halfway between 8 and 12. What score does this represent?',
    options:['8','10','11','12'],
    answer:'10',
    hint:'Halfway between 8 and 12 = (8 + 12) ÷ 2.',
    explanation:'Halfway between 8 and 12 = (8+12) ÷ 2 = 20 ÷ 2 = <b>10</b>. When a bar falls exactly halfway between two scale marks, its value is the midpoint of those two marks.' }),

  makeMCQ({ id:'g4m-data-019', chapterId:'g4-data', difficulty:4,
    question:'A class survey found: Blue=12, Red=9, Green=6, Yellow=3 (30 students total). Priya says "More than half the class chose Blue or Red." Is Priya correct?',
    options:[
      'Yes - 21 students chose Blue or Red, which is more than half of 30',
      'No - 21 is not more than half of 30',
      'No - half of 30 is 15 and only 12 chose Blue',
      'Cannot tell without a bar chart'
    ],
    answer:'Yes - 21 students chose Blue or Red, which is more than half of 30',
    hint:'Blue + Red = 12 + 9 = ? Compare with half of 30 (= 15).',
    explanation:'Blue + Red = 12 + 9 = 21. Half of 30 = 15. Since 21 > 15, more than half chose Blue or Red. <b>Priya is correct.</b> Evaluating statements about data is a key Grade 4 data skill.' })

);
