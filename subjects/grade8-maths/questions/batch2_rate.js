'use strict';
// Grade 8 Mathematics - Rate & Proportion, batch 2 (011-020).
// The existing ten items all run forwards from a given rate. These add the
// tasks that are missing: comparing two buys, recovering the quantity from a
// total, converting a rate into different units, scaling a recipe backwards,
// a two-part charge, and a worker-hours problem with two quantities changing.

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-rate-011', chapterId: 'g8m-rate', difficulty: 2,
    subsection: 'unit_rates',
    question: 'At a shop in Quatre Bornes, rice is sold in two packs:<br><b>500 g for Rs 45</b> &nbsp;or&nbsp; <b>2 kg for Rs 168</b>.<br>Which pack is better value?',
    options: ['2 kg pack, Rs 84 per kg', '500 g pack, Rs 84 per kg', '2 kg pack, Rs 90 per kg', '500 g pack, Rs 90 per kg'],
    answer: '2 kg pack, Rs 84 per kg',
    hint: 'Put both packs into the same unit &mdash; rupees per kilogram &mdash; before comparing.',
    explanation: '500 g for Rs 45 is Rs 90 per kg, while 2 kg for Rs 168 is 168 &divide; 2 = Rs 84 per kg, so the big pack is cheaper per kg. Rs 45 looks like the smaller price, but it buys only a quarter as much rice.'
  }),

  makeNum({
    id: 'g8m-rate-012', chapterId: 'g8m-rate', difficulty: 2,
    subsection: 'unit_rates',
    question: 'A taxi charges <b>Rs 22 per km</b>. A trip cost <b>Rs 396</b>. How many <b>km</b> was the trip?',
    answer: 18,
    hint: 'You know the rate and the total. Which operation undoes multiplying by the rate?',
    explanation: '396 &divide; 22 = 18 km. Multiplying 396 by 22 would give the cost of a very long journey, and 396 &minus; 22 = 374 mixes rupees with kilometres.'
  }),

  makeMCQ({
    id: 'g8m-rate-013', chapterId: 'g8m-rate', difficulty: 3,
    subsection: 'unit_rates',
    question: 'A machine fills <b>300 bottles in 12 minutes</b>. Working at the same rate, how long does it take to fill <b>750 bottles</b>?',
    options: ['30 minutes', '25 minutes', '36 minutes', '45 minutes'],
    answer: '30 minutes',
    hint: 'Find how many bottles the machine fills in ONE minute first.',
    explanation: '300 &divide; 12 = 25 bottles per minute, so 750 &divide; 25 = 30 minutes. 25 minutes is the bottles-per-minute figure used as an answer, and 45 comes from 750 &divide; 12 &times; 0.72, which no method gives.'
  }),

  makeMCQ({
    id: 'g8m-rate-014', chapterId: 'g8m-rate', difficulty: 2,
    subsection: 'direct_proportion',
    question: '<b>8</b> identical exercise books weigh <b>2.4 kg</b> altogether. What do <b>5</b> of the same books weigh?',
    options: ['1.5 kg', '1.2 kg', '1.8 kg', '2.0 kg'],
    answer: '1.5 kg',
    hint: 'Work out the weight of one book before scaling up to five.',
    explanation: '2.4 &divide; 8 = 0.3 kg per book, so 5 books weigh 5 &times; 0.3 = 1.5 kg. 1.2 kg is half of 2.4, which would be 4 books, and 1.8 kg would be 6 books.'
  }),

  makeNum({
    id: 'g8m-rate-015', chapterId: 'g8m-rate', difficulty: 3,
    subsection: 'direct_proportion',
    question: 'A recipe for <b>6 people</b> uses <b>450 g</b> of flour. Sarah has <b>750 g</b> of flour and nothing else is short. For how many <b>people</b> can she cook?',
    answer: 10,
    hint: 'How much flour does one person need? Then see how many times that fits into 750 g.',
    explanation: '450 &divide; 6 = 75 g per person, and 750 &divide; 75 = 10 people. Adding the difference (750 &minus; 450 = 300) to 6 gives 306, which mixes grams with people.'
  }),

  makeNum({
    id: 'g8m-rate-016', chapterId: 'g8m-rate', difficulty: 4,
    subsection: 'direct_proportion',
    question: '<b>5</b> workers pack <b>400</b> boxes in <b>2 hours</b>. How many boxes will <b>8</b> workers pack in <b>3 hours</b>, all working at the same rate?',
    answer: 960,
    hint: 'Find how many boxes ONE worker packs in ONE hour, then scale up twice.',
    explanation: '400 &divide; (5 &times; 2) = 40 boxes per worker per hour, so 8 workers for 3 hours pack 8 &times; 3 &times; 40 = 960 boxes. Scaling only the workers gives 640, and scaling only the hours gives 600 &mdash; both quantities changed.'
  }),

  makeMCQ({
    id: 'g8m-rate-017', chapterId: 'g8m-rate', difficulty: 2,
    subsection: 'rate_problems',
    question: 'A cyclist rides steadily at <b>18 km/h</b>. How long does she take to ride <b>45 km</b>?',
    options: ['2 h 30 min', '2 h 15 min', '2 h 45 min', '3 h 00 min'],
    answer: '2 h 30 min',
    hint: 'Time = distance &divide; speed. Then turn the decimal part of an hour into minutes.',
    explanation: '45 &divide; 18 = 2.5 hours, and 0.5 of an hour is 30 minutes, so 2 h 30 min. 2 h 15 min would be 2.25 hours (a distance of 40.5 km) and 2 h 45 min would be 49.5 km.'
  }),

  makeNum({
    id: 'g8m-rate-018', chapterId: 'g8m-rate', difficulty: 3,
    subsection: 'rate_problems',
    question: 'Water leaks from a cracked tank at <b>400 ml per minute</b>. How many <b>litres</b> leak out in <b>1&frac12; hours</b>?',
    answer: 36,
    hint: 'Change the time to minutes first, and remember 1 litre is 1,000 ml.',
    explanation: '1&frac12; hours is 90 minutes, so 400 &times; 90 = 36,000 ml, which is 36,000 &divide; 1000 = 36 litres. Using 1.5 minutes instead of 90 gives 600 ml, and forgetting to convert leaves the answer in millilitres.'
  }),

  makeMCQ({
    id: 'g8m-rate-019', chapterId: 'g8m-rate', difficulty: 3,
    subsection: 'rate_problems',
    question: 'A plumber charges a <b>call-out fee of Rs 350</b> plus <b>Rs 250 for every hour</b> he works. What does a <b>4-hour</b> job cost?',
    options: ['Rs 1,350', 'Rs 1,000', 'Rs 2,400', 'Rs 1,600'],
    answer: 'Rs 1,350',
    hint: 'The call-out fee is paid once, however long the job takes.',
    explanation: '4 &times; 250 = Rs 1,000 for the hours, plus the Rs 350 fee once, giving Rs 1,350. Rs 1,000 leaves the fee out, and Rs 2,400 charges the fee for each of the four hours.'
  }),

  makeNum({
    id: 'g8m-rate-020', chapterId: 'g8m-rate', difficulty: 4,
    subsection: 'rate_problems',
    question: 'A car uses <b>7 litres</b> of petrol per <b>100 km</b>. Petrol costs <b>Rs 65 per litre</b>. What is the fuel cost of a <b>400 km</b> drive round the island, in rupees?',
    answer: 1820,
    hint: 'Work out the litres for 400 km before you touch the price.',
    explanation: '400 km is 4 lots of 100 km, so the car uses 4 &times; 7 = 28 litres, costing 28 &times; 65 = Rs 1,820. Multiplying 7 &times; 65 = 455 gives the cost of only 100 km.'
  })

);
