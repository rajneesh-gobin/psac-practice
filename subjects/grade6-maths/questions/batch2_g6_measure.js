'use strict';

(function () {

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g6m-meas-020', chapterId: 'g6-measure', subsection: 'length', difficulty: 1,
    question: 'Convert 250 cm to metres.',
    answer: 2.5, acceptableAnswers: ['2.5', '2.5 m'],
    hint: '100 cm = 1 m. Divide by 100.',
    explanation: '250 ÷ 100 = <b>2.5 m</b>. To convert centimetres to metres, always divide by 100.'
  }),

  makeNum({
    id: 'g6m-meas-021', chapterId: 'g6-measure', subsection: 'length', difficulty: 1,
    question: 'Convert 3 m 45 cm to centimetres.',
    answer: 345, acceptableAnswers: ['345', '345 cm'],
    hint: '1 m = 100 cm. So 3 m = 300 cm. Add 45.',
    explanation: '3 m = 300 cm. 300 + 45 = <b>345 cm</b>.'
  }),

  makeNum({
    id: 'g6m-meas-022', chapterId: 'g6-measure', subsection: 'length', difficulty: 1,
    question: 'Convert 56 mm to centimetres.',
    answer: 5.6, acceptableAnswers: ['5.6', '5.6 cm'],
    hint: '10 mm = 1 cm. Divide by 10.',
    explanation: '56 ÷ 10 = <b>5.6 cm</b>. Key length facts: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km.'
  }),

  makeMCQ({
    id: 'g6m-meas-023', chapterId: 'g6-measure', subsection: 'length', difficulty: 2,
    question: 'A door is 2 m 15 cm tall. A wardrobe is 198 cm tall. Which is taller, and by how many centimetres?',
    options: ['The door, by 17 cm', 'The wardrobe, by 17 cm', 'The door, by 27 cm', 'They are the same height'],
    answer: 'The door, by 17 cm',
    hint: 'Convert the door height to cm first: 2 m 15 cm = 215 cm. Then subtract 198.',
    explanation: '2 m 15 cm = 215 cm. 215 − 198 = 17 cm. The <b>door is taller by 17 cm</b>. Always convert to the same unit before comparing.'
  }),

  makeNum({
    id: 'g6m-meas-024', chapterId: 'g6-measure', subsection: 'length', difficulty: 2,
    question: 'Three planks have lengths of 1 m 20 cm, 85 cm and 1 m 05 cm. What is their TOTAL length in metres and centimetres? (Write your answer in cm, e.g. 310)',
    answer: 310, acceptableAnswers: ['310', '310 cm', '3 m 10 cm', '3.1 m'],
    hint: 'Convert each length to cm: 120 cm, 85 cm, 105 cm. Then add all three.',
    explanation: '1 m 20 cm = 120 cm; 85 cm = 85 cm; 1 m 05 cm = 105 cm. Total = 120 + 85 + 105 = <b>310 cm = 3 m 10 cm</b>.'
  }),

  makeNum({
    id: 'g6m-meas-025', chapterId: 'g6-measure', subsection: 'mass', difficulty: 1,
    question: 'Convert 3250 g to kilograms.',
    answer: 3.25, acceptableAnswers: ['3.25', '3.25 kg'],
    hint: '1 kg = 1000 g. Divide by 1000.',
    explanation: '3250 ÷ 1000 = <b>3.25 kg</b>.'
  }),

  makeNum({
    id: 'g6m-meas-026', chapterId: 'g6-measure', subsection: 'mass', difficulty: 1,
    question: 'Convert 0.75 kg to grams.',
    answer: 750, acceptableAnswers: ['750', '750 g'],
    hint: '1 kg = 1000 g. Multiply by 1000.',
    explanation: '0.75 × 1000 = <b>750 g</b>. To convert from kg to g, multiply by 1000.'
  }),

  makeNum({
    id: 'g6m-meas-027', chapterId: 'g6-measure', subsection: 'mass', difficulty: 2,
    question: 'A bag of rice weighs 2 kg 400 g. Another bag weighs 1 kg 750 g. What is the TOTAL mass in kg and g? (Write your answer in grams, e.g. 4150)',
    answer: 4150, acceptableAnswers: ['4150', '4150 g', '4 kg 150 g', '4.15 kg'],
    hint: 'Convert each to grams: 2400 g + 1750 g. Then convert back if needed.',
    explanation: '2 kg 400 g = 2400 g. 1 kg 750 g = 1750 g. Total = 2400 + 1750 = 4150 g = <b>4 kg 150 g</b>.'
  }),

  makeNum({
    id: 'g6m-meas-028', chapterId: 'g6-measure', subsection: 'mass', difficulty: 2,
    question: '5 identical books each weigh 340 g. What is their TOTAL mass in kilograms?',
    answer: 1.7, acceptableAnswers: ['1.7', '1.7 kg'],
    hint: 'Total in grams = 5 × 340. Then convert to kg by dividing by 1000.',
    explanation: '5 × 340 = 1700 g. 1700 ÷ 1000 = <b>1.7 kg</b>.'
  }),

  makeNum({
    id: 'g6m-meas-029', chapterId: 'g6-measure', subsection: 'mass', difficulty: 3,
    question: 'A box of 12 oranges has a total mass of 2 kg 160 g. What is the mass of ONE orange in grams?',
    answer: 180, acceptableAnswers: ['180', '180 g'],
    hint: 'Convert 2 kg 160 g to grams first, then divide by 12.',
    explanation: '2 kg 160 g = 2160 g. 2160 ÷ 12 = <b>180 g</b> per orange.'
  }),

  makeNum({
    id: 'g6m-meas-030', chapterId: 'g6-measure', subsection: 'capacity', difficulty: 1,
    question: 'Convert 3500 mL to litres.',
    answer: 3.5, acceptableAnswers: ['3.5', '3.5 L', '3.5 litres'],
    hint: '1 L = 1000 mL. Divide by 1000.',
    explanation: '3500 ÷ 1000 = <b>3.5 L</b>.'
  }),

  makeNum({
    id: 'g6m-meas-031', chapterId: 'g6-measure', subsection: 'capacity', difficulty: 1,
    question: 'A bottle holds 1.25 litres. How many millilitres is this?',
    answer: 1250, acceptableAnswers: ['1250', '1250 mL'],
    hint: '1 L = 1000 mL. Multiply by 1000.',
    explanation: '1.25 × 1000 = <b>1250 mL</b>.'
  }),

  makeNum({
    id: 'g6m-meas-032', chapterId: 'g6-measure', subsection: 'capacity', difficulty: 2,
    question: '4 cups each hold 250 mL of water. What is the TOTAL amount of water in litres?',
    answer: 1, acceptableAnswers: ['1', '1 L', '1 litre'],
    hint: 'Total mL = 4 × 250. Then convert to litres by dividing by 1000.',
    explanation: '4 × 250 = 1000 mL. 1000 mL = <b>1 litre</b>.'
  }),

  makeNum({
    id: 'g6m-meas-033', chapterId: 'g6-measure', subsection: 'capacity', difficulty: 2,
    question: 'A tank holds 20 litres when full. It is three-quarters (3/4) full. How many litres does it contain?',
    answer: 15, acceptableAnswers: ['15', '15 L', '15 litres'],
    hint: 'Find 3/4 of 20. Divide by 4, then multiply by 3.',
    explanation: '3/4 of 20 = (20 ÷ 4) × 3 = 5 × 3 = <b>15 litres</b>.'
  }),

  makeNum({
    id: 'g6m-meas-034', chapterId: 'g6-measure', subsection: 'perimeter', difficulty: 2,
    question: 'A triangle has sides of 8 cm, 11 cm and 14 cm. What is its perimeter?',
    answer: 33, acceptableAnswers: ['33', '33 cm'],
    hint: 'Perimeter of a triangle = sum of all three sides.',
    explanation: '8 + 11 + 14 = <b>33 cm</b>. Unlike rectangles, triangles have no shortcut formula — add all three sides.'
  }),

  makeNum({
    id: 'g6m-meas-035', chapterId: 'g6-measure', subsection: 'perimeter', difficulty: 3,
    question: 'An L-shaped room has the following six sides (going around the outside): 8 m, 3 m, 5 m, 4 m, 3 m and 7 m. What is the perimeter of the room?',
    answer: 30, acceptableAnswers: ['30', '30 m'],
    hint: 'For an L-shaped (irregular) polygon, add all the sides together.',
    explanation: '8 + 3 + 5 + 4 + 3 + 7 = <b>30 m</b>. For any polygon, perimeter = sum of all sides, no matter the shape.'
  }),

  makeNum({
    id: 'g6m-meas-036', chapterId: 'g6-measure', subsection: 'perimeter', difficulty: 2,
    question: 'A regular hexagon has a side length of 7 cm. What is its perimeter?',
    answer: 42, acceptableAnswers: ['42', '42 cm'],
    hint: 'A regular hexagon has 6 equal sides. Multiply the side length by 6.',
    explanation: '6 × 7 = <b>42 cm</b>. A regular hexagon has 6 equal sides and 6 equal angles of 120° each.'
  }),

  makeNum({
    id: 'g6m-meas-037', chapterId: 'g6-measure', subsection: 'word_probs', difficulty: 3,
    question: 'A piece of ribbon is 3 m long. It is cut into 8 equal pieces. How long is EACH piece in centimetres?',
    answer: 37.5, acceptableAnswers: ['37.5', '37.5 cm'],
    hint: 'Convert 3 m to cm first (300 cm), then divide by 8.',
    explanation: '3 m = 300 cm. 300 ÷ 8 = <b>37.5 cm</b> per piece.'
  }),

  makeNum({
    id: 'g6m-meas-038', chapterId: 'g6-measure', subsection: 'word_probs', difficulty: 3,
    question: 'A family uses 45 litres of water per day. How many litres do they use in 2 weeks?',
    answer: 630, acceptableAnswers: ['630', '630 L', '630 litres'],
    hint: '2 weeks = 14 days. Multiply 45 by 14.',
    explanation: '2 weeks = 14 days. 45 × 14 = <b>630 litres</b>. (45 × 10 = 450, 45 × 4 = 180, 450 + 180 = 630)'
  }),

  makeNum({
    id: 'g6m-meas-039', chapterId: 'g6-measure', subsection: 'word_probs', difficulty: 3,
    question: 'A garden fence requires 15 m of wire. The wire costs Rs 8.50 per metre. What is the TOTAL cost of the wire?',
    answer: 127.5, acceptableAnswers: ['127.5', 'Rs 127.50', 'Rs 127.5', '127.50'],
    hint: 'Total cost = length × cost per metre. 15 × 8.50.',
    explanation: '15 × 8.50 = 15 × 8 + 15 × 0.50 = 120 + 7.50 = <b>Rs 127.50</b>.'
  })

);

})();
