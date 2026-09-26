'use strict';
// PSAC Grade 5 Mathematics 2025 – past-paper questions adapted to MCQ format.
// Section A Q19–28 (10 MCQs) → makeMCQ.
// Section A Q1–18 (short-answer) and Section B Q29–40 (word problems) → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5m-pp25-001', chapterId:'numeration', subsection:'expanded', difficulty:1,
    question:'What is the value of <strong>20 + 6 000 + 700 + 8</strong>?',
    options:['6 280','6 728','6 720','7 208'],
    answer:'6 728',
    hint:'Add the thousands, hundreds, tens and ones carefully.',
    explanation:'6 000 + 700 + 20 + 8 = 6 728. (Re-order: thousands first.) 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-002', chapterId:'time', subsection:'conversion', difficulty:2,
    question:'How many <strong>minutes</strong> are there in <strong>1¼ hours</strong>?',
    options:['60','75','90','100'],
    answer:'75',
    hint:'1 hour = 60 minutes. Then convert ¼ hour to minutes.',
    explanation:'1 hour = 60 min. ¼ hour = 60 ÷ 4 = 15 min. Total: 60 + 15 = 75 minutes. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-003', chapterId:'numeration', subsection:'place_value', difficulty:1,
    question:'In the number <strong>5 873</strong>, what is the value of the digit <strong>7</strong>?',
    options:['7 ones','7 tens','7 hundreds','7 thousands'],
    answer:'7 tens',
    hint:'Write out the place-value columns for 5 873.',
    explanation:'5 873: 5 = thousands, 8 = hundreds, 7 = tens, 3 = ones. The value of 7 is 7 tens (= 70). 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-004', chapterId:'area', subsection:'rectangle', difficulty:2,
    question:'A square has an area of <strong>36 cm²</strong>. What is the length of one side?',
    options:['4 cm','5 cm','6 cm','9 cm'],
    answer:'6 cm',
    hint:'Area of a square = side × side. What number multiplied by itself gives 36?',
    explanation:'Side × side = 36. √36 = 6. Each side is 6 cm long. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-005', chapterId:'money', subsection:'operations', difficulty:1,
    question:'Sam has Rs 50. He uses a Rs 25 coin and a Rs 20 coin. Which <strong>other coin</strong> does he need to make exactly Rs 50?',
    options:['Rs 1 coin','Rs 2 coin','Rs 5 coin','Rs 10 coin'],
    answer:'Rs 5 coin',
    hint:'Rs 25 + Rs 20 = Rs 45. What is Rs 50 − Rs 45?',
    explanation:'25 + 20 = 45. 50 − 45 = 5. Sam needs one Rs 5 coin. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-006', chapterId:'length', subsection:'perimeter', difficulty:2,
    question:'A rectangular field is <strong>12 m long</strong> and <strong>10 m wide</strong>. What is its <strong>perimeter</strong>?',
    options:['44 m','46 m','120 m','22 m'],
    answer:'44 m',
    hint:'Perimeter of a rectangle = 2 × (length + width).',
    explanation:'P = 2 × (12 + 10) = 2 × 22 = 44 m. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-007', chapterId:'geometry', subsection:'angles', difficulty:1,
    question:'Which of the following diagrams shows an angle that is <strong>smaller than a right angle</strong>? <em>(Choose from diagrams A, B, C, D.)</em>',
    options:['Diagram A','Diagram B','Diagram C','Diagram D'],
    answer:'Diagram B',
    hint:'An angle smaller than a right angle is acute (less than 90°). Look for the sharpest angle.',
    explanation:'Diagram B shows an acute angle (less than 90°). The other diagrams show obtuse angles or right angles. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-008', chapterId:'powers', subsection:'calculate', difficulty:1,
    question:'What is the value of <strong>4³</strong>?',
    options:['12','16','32','64'],
    answer:'64',
    hint:'4³ means 4 × 4 × 4.',
    explanation:'4 × 4 = 16. 16 × 4 = 64. So 4³ = 64. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-009', chapterId:'decimals', subsection:'place_value', difficulty:1,
    question:'Which decimal is equal to <strong>6 hundredths</strong>?',
    options:['0.6','0.06','0.006','6.0'],
    answer:'0.06',
    hint:'Hundredths are two places to the right of the decimal point.',
    explanation:'6 hundredths = 6/100 = 0.06. The digit 6 sits in the hundredths column. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5m-pp25-010', chapterId:'geometry', subsection:'symmetry', difficulty:1,
    question:'How many <strong>lines of symmetry</strong> does an equilateral triangle have?',
    options:['one','two','three','four'],
    answer:'three',
    hint:'An equilateral triangle has all sides equal. How many ways can you fold it to get two matching halves?',
    explanation:'An equilateral triangle has 3 lines of symmetry – one from each vertex to the midpoint of the opposite side. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5m-pp25-pdf-001', chapterId:'four_ops', marks:18, year:2025, grade:5, subject:'Maths',
    question:'Section A Q1–18 – Short-answer questions on numeration, four operations, fractions, decimals, geometry and measurement. (No options given; write the answer only.)', type:'write' },
  { id:'g5m-pp25-pdf-002', chapterId:'average', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section A Q33 (end) – Kian scores 9, Ziya scores 4, and Amira scores 11 in a quiz. What is their average score?', type:'write' },
  { id:'g5m-pp25-pdf-003', chapterId:'area', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q34 – (a) Complete the line of symmetry of the given figure (drawing task). (b) In the figure, ABDE is a rectangle 10 cm × 7 cm. Triangle BCD shares base BC. Find the area of ABDE not covered by triangle BCD.', type:'write' },
  { id:'g5m-pp25-pdf-004', chapterId:'money', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q35 – A woman buys ¾ kg of cabbage at Rs 60/kg, 2 kg of carrots at Rs 141 and ½ kg of peas. She pays with Rs 500 and gets Rs 301 change. Find the cost of the peas per kg.', type:'write' },
  { id:'g5m-pp25-pdf-005', chapterId:'fractions', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q36 – (a) 2/5 of the children in a class are boys. There are 324 boys. How many children are there altogether? (b) A worker earns Rs 535 for 4 hours. How much does he earn in 12 hours?', type:'write' },
  { id:'g5m-pp25-pdf-006', chapterId:'graphs', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q37 – Pictogram showing loaves baked each day (Mon=700, Tue=500, Wed=800, Thu=900, Fri=700, Sat=900; Sunday = Wednesday − 200). Answer questions about the pictogram.', type:'write' },
  { id:'g5m-pp25-pdf-007', chapterId:'time', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q38 – Eshan leaves home at 07:30 and takes 1 hour 45 minutes to reach school. What time does he arrive? Reza takes 50 minutes less than Eshan. How long does Reza take?', type:'write' },
  { id:'g5m-pp25-pdf-008', chapterId:'money', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q39 – A vendor sells 125 pineapples at Rs 60 each and 75 pineapples at Rs 55 each. He paid Rs 10 000 for all the pineapples. Find his profit or loss.', type:'write' },
  { id:'g5m-pp25-pdf-009', chapterId:'area', marks:5, year:2025, grade:5, subject:'Maths',
    question:'Section B Q40 – A compound figure is made of a rectangle and 4 equilateral triangles (side 2 cm each) placed on each side of the rectangle. Calculate the perimeter of the compound shape.', type:'write' }
);
