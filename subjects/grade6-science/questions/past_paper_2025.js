'use strict';
// PSAC 2025 Grade 6 Science — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  // ── Q1: MCQ (5 marks, 1 mark each) ──────────────────────────────────────

  makeMCQ({ id:'g6sc-pp25-001', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which of the following animals is a <b>herbivore</b>?',
    options:['Bird','Cow','Crocodile','Lion'],
    answer:'Cow',
    hint:'A herbivore eats only plants.',
    explanation:'A cow eats only grass and plants, making it a herbivore. Birds eat insects or seeds (omnivores/other); crocodiles and lions eat meat (carnivores).',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6sc-pp25-002', chapterId:'g6-solar-system', subsection:'day_night', difficulty:1,
    question:'How long does it take for the Earth to complete <b>one full orbit</b> around the Sun?',
    options:['One day','One week','One month','One year'],
    answer:'One year',
    hint:'This is the time that gives us our calendar year.',
    explanation:'The Earth takes approximately 365¼ days — one year — to complete one full orbit around the Sun.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6sc-pp25-003', chapterId:'g6-animals', subsection:'diet', difficulty:2,
    question:'Which meal below is <b>balanced AND suitable for a vegetarian</b>?',
    options:['Carrot, lettuce and rice','Chicken, carrot and bread','Lentil, lettuce and rice','Lentil, carrot and fish'],
    answer:'Lentil, lettuce and rice',
    hint:'A balanced meal needs protein, vegetables and carbohydrates. Vegetarians eat no meat or fish.',
    explanation:'Lentil (protein), lettuce (vegetable), rice (carbohydrate) = balanced AND vegetarian. Chicken and fish are not vegetarian; carrot+lettuce+rice lacks a protein source.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6sc-pp25-004', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which animal has <b>3 pairs of legs</b> (6 legs)?',
    options:['Dog','Mosquito','Spider','Tortoise'],
    answer:'Mosquito',
    hint:'Insects have 6 legs. Arachnids have 8.',
    explanation:'Insects have 6 legs (3 pairs). A mosquito is an insect. Dogs have 4 legs; spiders have 8 legs (arachnid); tortoises have 4 legs.',
    learnMore:'📄 PSAC 2025 exam.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g6sc-pp25-pdf-q1e', chapterId:'g6-materials', marks:1, year:2025, grade:6, subject:'Science',
    question:'Four test tubes (P, Q, R, S) each contain a nail in different conditions. Identify the TWO test tubes in which the nail will rust. (Diagram needed: P=dry air only, Q=water open to air, R=water sealed with oil, S=boiled water sealed.)',
    type:'diagram' },

  { id:'g6sc-pp25-pdf-q2', chapterId:'g6-plants', marks:7, year:2025, grade:6, subject:'Science',
    question:'Study the diagram of a plant. (a) Name Gas A entering the leaf (carbon dioxide). (b) Name Gas B leaving the leaf (oxygen). (c) Name TWO conditions needed for photosynthesis. (d) Why is photosynthesis important? (e) Name another process the plant carries out that uses oxygen. (f) What part of the fish allows it to breathe underwater?',
    type:'short' },

  { id:'g6sc-pp25-pdf-q3', chapterId:'g6-materials', marks:12, year:2025, grade:6, subject:'Science',
    question:'(a) Match each material (Aluminium, Leather, Wood) to where it comes from (Earth/rock, Animal, Plant). (b) Give ONE use of gold. Name ONE property that makes gold suitable for this use. (c) Gold is mixed with another metal to form an alloy. What is this called? (d) A car windscreen is made of glass. Name ONE property of glass that makes it suitable. (e) A car tyre is made of rubber. Name ONE property of rubber that makes it suitable. (f) Aluminium is used to make aeroplanes. Give TWO reasons why.',
    type:'short' },

  { id:'g6sc-pp25-pdf-q4', chapterId:'g6-conservation', marks:10, year:2025, grade:6, subject:'Science',
    question:'(a) A factory discharges waste into a river. What type of pollution does this cause? (b) A ship burns fuel. What type of pollution does this cause? (c) What is global warming? Give ONE effect of global warming. (d) Name ONE way to reduce pollution from tin cans. (e) Cow dung is used to make manure. How does this help the environment? (f) Where should used batteries be disposed of? Why?',
    type:'short' },

  { id:'g6sc-pp25-pdf-q5', chapterId:'g6-energy', marks:9, year:2025, grade:6, subject:'Science',
    question:'(a) A car engine converts chemical energy into other forms. Name TWO forms of energy produced. (b) Give ONE advantage and ONE disadvantage of solar panels. (c) Is a thermal power station a source of renewable or non-renewable energy? Explain. (d) List the steps in producing electricity at a thermal power station.',
    type:'short' },

  { id:'g6sc-pp25-pdf-q6', chapterId:'g6-air', marks:7, year:2025, grade:6, subject:'Science',
    question:'Three candles A, B, C are placed in jars of different sizes and lit at the same time. (a) What factor is being tested (changed) in this experiment? (b) Name the gas produced when a candle burns. (c) Candle C is in the largest jar and lasts 6 seconds. Predict how long candle C will last compared to A and B. Give a reason. (d) Why do all candles eventually go out? (e) Why must all other conditions (candle size, etc.) be kept the same? (f) Name ONE method used to put out a fire (other than water).',
    type:'short' }

);
