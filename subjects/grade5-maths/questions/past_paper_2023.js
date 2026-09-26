'use strict';
// PSAC Grade 5 Mathematics 2023 – past-paper questions adapted to MCQ format.
// Section A Q21–30 (10 MCQs) → makeMCQ.
// Section A Q1–20 (short-answer) and Section B Q31–40 (word problems) → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5m-pp23-001', chapterId:'square_nums', subsection:'square_nums', difficulty:1,
    question:'Which of the following is a <strong>square number</strong>?',
    options:['54','60','64','70'],
    answer:'64',
    hint:'A square number is the result of multiplying a whole number by itself. Which of these equals n × n?',
    explanation:'64 = 8 × 8, so it is a square number. 54, 60 and 70 are not perfect squares. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-002', chapterId:'numeration', subsection:'place_value', difficulty:1,
    question:'In the number <strong>6 325</strong>, the digit 6 has the <strong>greatest value</strong>. What is that value?',
    options:['6','60','600','6 000'],
    answer:'6 000',
    hint:'Think about the place of the digit 6 in 6 325.',
    explanation:'In 6 325, the digit 6 is in the thousands place, so its value is 6 000. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-003', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'Which of the following best describes <strong>parallel lines</strong>?',
    options:['Lines that meet at a right angle','Lines that cross each other','Lines that are always the same distance apart and never meet','Lines that curve away from each other'],
    answer:'Lines that are always the same distance apart and never meet',
    hint:'Think of railway tracks – they never cross.',
    explanation:'Parallel lines are always the same distance apart and never meet, no matter how far they are extended. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-004', chapterId:'ratio', subsection:'writing', difficulty:1,
    question:'Write the ratio <strong>25 : 15</strong> in its simplest form.',
    options:['25 : 15','10 : 5','5 : 3','3 : 5'],
    answer:'5 : 3',
    hint:'Find the HCF of 25 and 15, then divide both numbers by it.',
    explanation:'HCF of 25 and 15 is 5. 25 ÷ 5 = 5, 15 ÷ 5 = 3. Simplest form: 5 : 3. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-005', chapterId:'geometry', subsection:'symmetry', difficulty:2,
    question:'Which shape has <strong>exactly one line of symmetry</strong>?',
    options:['A rectangle','An isosceles triangle','A square','An equilateral triangle'],
    answer:'An isosceles triangle',
    hint:'A rectangle has 2, a square has 4, an equilateral triangle has 3. Which has only 1?',
    explanation:'An isosceles triangle has exactly one line of symmetry – the vertical line through the apex down the middle. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-006', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'How many triangles are there in the figure below? <em>(A large triangle divided into 5 smaller triangles.)</em>',
    options:['3','4','5','6'],
    answer:'5',
    hint:'Count every triangle you can find, including those made of more than one small triangle.',
    explanation:'Count all triangles: 3 small ones + 1 medium + 1 large = 5 triangles in total. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-007', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'In a kite, which two angles are <strong>equal</strong>?',
    options:['a and b','a and c','b and d','c and d'],
    answer:'a and c',
    hint:'A kite has one pair of equal angles. They are the angles between the non-equal pairs of sides.',
    explanation:'In a kite the two angles between the non-equal sides are equal. These are the angles at the two "wing tips", labelled a and c. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-008', chapterId:'geometry', subsection:'directions', difficulty:2,
    question:'Jamie is facing <strong>East</strong>. He turns <strong>¼ turn anti-clockwise</strong>. Which direction is he now facing?',
    options:['North','South','West','South-East'],
    answer:'North',
    hint:'Draw a compass. East is to the right. A quarter turn anti-clockwise from East is…',
    explanation:'A ¼ turn anti-clockwise from East brings you to North (East → North-East → North using 45° steps, or directly: East is 90°, −90° = 0° = North). 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-009', chapterId:'geometry', subsection:'angles', difficulty:2,
    question:'Which angle in the diagram is <strong>larger than a right angle</strong>? <em>(Diagram shows angles p, q, r, s.)</em>',
    options:['p','q','r','s'],
    answer:'q',
    hint:'A right angle is exactly 90°. An angle larger than 90° is obtuse.',
    explanation:'Angle q is the obtuse angle in the figure – it is clearly larger than 90° while the others are acute or right angles. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5m-pp23-010', chapterId:'fractions', subsection:'comparing', difficulty:1,
    question:'Which fraction is the <strong>largest</strong>?',
    options:['3/4','1/2','2/3','1/4'],
    answer:'3/4',
    hint:'Convert each fraction to a common denominator (12) and compare.',
    explanation:'Converting to twelfths: 3/4 = 9/12, 2/3 = 8/12, 1/2 = 6/12, 1/4 = 3/12. So 3/4 is the largest. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5m-pp23-pdf-001', chapterId:'four_ops', marks:20, year:2023, grade:5, subject:'Maths',
    question:'Section A Q1–20 – Short-answer questions on numeration, four operations, fractions, decimals, geometry and measurement. (No options given; write the answer only.)', type:'write' },
  { id:'g5m-pp23-pdf-002', chapterId:'four_ops', marks:5, year:2023, grade:5, subject:'Maths',
    question:'Section B Q31 – (a) Work out 3/5 ÷ 8. (b) Rita has 36 sweets. She gives 1/3 of them to Reaz. How many sweets does Reaz get?', type:'write' },
  { id:'g5m-pp23-pdf-003', chapterId:'money', marks:5, year:2023, grade:5, subject:'Maths',
    question:'Section B Q32 – A school organises an outing to an aquarium. Transport costs Rs 120 per pupil and entry costs Rs 250 per pupil. There are 18 pupils. What is the total cost of the outing?', type:'write' },
  { id:'g5m-pp23-pdf-004', chapterId:'capacity', marks:5, year:2023, grade:5, subject:'Maths',
    question:'Section B Q33 – Riya mixes 250 mL of apple juice with 1 050 mL of orange juice. She pours the mixture equally into 6 glasses of 200 mL each. How much juice is left over?', type:'write' },
  { id:'g5m-pp23-pdf-005', chapterId:'four_ops', marks:5, year:2023, grade:5, subject:'Maths',
    question:'Section B Q34 – Imran is 5 years old. Alan is 6 times as old as Imran. How old will Alan be when Imran is 20 years old?', type:'write' },
  { id:'g5m-pp23-pdf-006', chapterId:'graphs', marks:5, year:2023, grade:5, subject:'Maths',
    question:'Section B Q35–40 – Further Section B word problems covering length, area, mass, time, money and data. (Read the full paper for complete question text.)', type:'write' }
);
