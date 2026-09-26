'use strict';
// PSAC Grade 5 Mathematics 2024 – past-paper questions adapted to MCQ format.
// Section A Q19–28 (10 MCQs) → makeMCQ.
// Section A Q1–18 (short-answer) and Section B Q29–40 (word problems) → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5m-pp24-001', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'What is the name of the shape that has two pairs of equal sides and two pairs of equal angles, but is <strong>not</strong> a rectangle?',
    options:['Rhombus','Trapezium','Parallelogram','Kite'],
    answer:'Parallelogram',
    hint:'This shape has opposite sides that are equal and parallel, but its angles are not 90°.',
    explanation:'A parallelogram has two pairs of equal, parallel sides and two pairs of equal angles, but its angles are not right angles (unlike a rectangle). 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-002', chapterId:'geometry', subsection:'symmetry', difficulty:1,
    question:'How many <strong>lines of symmetry</strong> does a square have?',
    options:['one','two','three','four'],
    answer:'four',
    hint:'Draw a square and find every way you can fold it so both halves match exactly.',
    explanation:'A square has 4 lines of symmetry: 2 through opposite corners (diagonals) and 2 through midpoints of opposite sides. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-003', chapterId:'powers', subsection:'calculate', difficulty:1,
    question:'What is the value of <strong>2³ + 1</strong>?',
    options:['7','8','9','10'],
    answer:'9',
    hint:'First find 2³ (2 × 2 × 2), then add 1.',
    explanation:'2³ = 2 × 2 × 2 = 8. Then 8 + 1 = 9. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-004', chapterId:'fractions', subsection:'proper_improper', difficulty:2,
    question:'Write <strong>15/4</strong> as a mixed number.',
    options:['3¾','3½','4¼','3¼'],
    answer:'3¾',
    hint:'Divide 15 by 4. The quotient is the whole number and the remainder is the new numerator.',
    explanation:'15 ÷ 4 = 3 remainder 3. So 15/4 = 3 and 3/4 = 3¾. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-005', chapterId:'average', subsection:'mean', difficulty:1,
    question:'What is the <strong>average</strong> (mean) of 3, 6, 4 and 7?',
    options:['4','4.5','5','6'],
    answer:'5',
    hint:'Add all the numbers and divide by how many there are.',
    explanation:'3 + 6 + 4 + 7 = 20. 20 ÷ 4 = 5. The average is 5. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-006', chapterId:'money', subsection:'operations', difficulty:1,
    question:'What is the total of <strong>Rs 500 + Rs 50 + Rs 10 + Rs 5</strong>?',
    options:['Rs 505','Rs 555','Rs 565','Rs 570'],
    answer:'Rs 565',
    hint:'Add the notes and coins carefully: 500 + 50 = 550, then + 10 = 560, then + 5 = ?',
    explanation:'500 + 50 + 10 + 5 = 565. The total is Rs 565. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-007', chapterId:'decimals', subsection:'place_value', difficulty:1,
    question:'In the number <strong>87.21</strong>, what is the value of the digit <strong>7</strong>?',
    options:['7 units','7 tenths','7 hundredths','70 units'],
    answer:'7 units',
    hint:'Write out the place-value columns: tens · units · . · tenths · hundredths.',
    explanation:'In 87.21: 8 is in the tens place, 7 is in the units place, 2 is tenths, 1 is hundredths. The value of 7 is 7 units. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-008', chapterId:'time', subsection:'reading', difficulty:1,
    question:'The <strong>short hand</strong> of the clock points to the 8, and the <strong>long hand</strong> points to the 4. What time does the clock show?',
    options:['04:08','08:20','08:04','20:08'],
    answer:'08:20',
    hint:'Short hand = hours. Long hand = minutes (each number = 5 minutes).',
    explanation:'Short hand at 8 → 8 o\'clock. Long hand at 4 → 4 × 5 = 20 minutes. Time = 08:20. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-009', chapterId:'geometry', subsection:'angles', difficulty:1,
    question:'Which of the following diagrams shows an angle that is <strong>smaller than a right angle</strong>? <em>(Choose the acute angle from diagrams A, B, C, D.)</em>',
    options:['Diagram A','Diagram B','Diagram C','Diagram D'],
    answer:'Diagram A',
    hint:'An angle smaller than a right angle is an acute angle (less than 90°).',
    explanation:'Diagram A shows an acute angle (less than 90°). The other diagrams show angles that are 90° or more. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5m-pp24-010', chapterId:'fractions', subsection:'equivalent', difficulty:1,
    question:'Write <strong>12/20</strong> in its lowest terms.',
    options:['6/10','3/5','4/7','2/4'],
    answer:'3/5',
    hint:'Find the HCF of 12 and 20, then divide both by it.',
    explanation:'HCF of 12 and 20 is 4. 12 ÷ 4 = 3, 20 ÷ 4 = 5. Lowest terms: 3/5. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5m-pp24-pdf-001', chapterId:'four_ops', marks:18, year:2024, grade:5, subject:'Maths',
    question:'Section A Q1–18 – Short-answer questions on numeration, four operations, fractions, decimals, geometry and measurement. (No options given; write the answer only.)', type:'write' },
  { id:'g5m-pp24-pdf-002', chapterId:'length', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q33 – Ali\'s height is 180 cm. Sheena is half as tall as Ali. Elisa is 8 cm shorter than Sheena. What is Elisa\'s height?', type:'write' },
  { id:'g5m-pp24-pdf-003', chapterId:'time', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q34 – (a) A film starts at 3:45 p.m. and finishes at 6:00 p.m. How long is the film? (b) A shop gets 3 sacks and 4 sacks of footballs; each sack has 12 balls. How many balls in total?', type:'write' },
  { id:'g5m-pp24-pdf-004', chapterId:'length', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q35 – A tailor needs 2 m 40 cm of cloth for each shirt. How much cloth does he need for 4 shirts? Give your answer in centimetres.', type:'write' },
  { id:'g5m-pp24-pdf-005', chapterId:'graphs', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q36 – The bar chart shows how 46 children travel to school (Van=16, Bus=12, Car=8, Foot=10). Answer questions about the bar chart.', type:'write' },
  { id:'g5m-pp24-pdf-006', chapterId:'fractions', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q37 – A bag has 840 beads. Ashi gets 5/8, Billy gets 1/4, and Dan gets the rest. How many beads does each person get?', type:'write' },
  { id:'g5m-pp24-pdf-007', chapterId:'money', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q38 – A stepladder costs Rs 1 200 and a paintbrush costs Rs 161. How many paint pails costing Rs 250 each can be bought with Rs 2 000 after buying the stepladder and 2 brushes?', type:'write' },
  { id:'g5m-pp24-pdf-008', chapterId:'mass', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q39 – A recipe for 24 cupcakes needs 200 g of sugar and 230 g of flour. Mia has 500 g of flour. How many grams of flour will be left after making 24 cupcakes?', type:'write' },
  { id:'g5m-pp24-pdf-009', chapterId:'money', marks:5, year:2024, grade:5, subject:'Maths',
    question:'Section B Q40 – A shopkeeper receives 255 apples and 130 oranges costing Rs 2 536 altogether. He sells 205 apples at Rs 12 each and 90 oranges at Rs 15 each. Find his profit or loss.', type:'write' }
);
