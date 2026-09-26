'use strict';
// PSAC Grade 4 English 2024 – passage: Lara and Tommy during a cyclone.
// Q1A (3 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4eng-pp24-001', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Tommy is the ___ of Lara.',
    options:['cousin','sister','brother'],
    answer:'brother',
    hint:'Look at how Lara and Tommy are related in the passage.',
    explanation:'The passage states that Tommy is Lara\'s brother. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4eng-pp24-002', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'After school, they like to watch ___ on TV.',
    options:['films','shows','cartoons'],
    answer:'cartoons',
    hint:'Find the sentence about what Lara and Tommy watch after school.',
    explanation:'According to the passage, Lara and Tommy like to watch cartoons on TV after school. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4eng-pp24-003', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Their mother prepares tea and ___ for them.',
    options:['snacks','bread','pasta'],
    answer:'snacks',
    hint:'Find the sentence about what their mother prepares.',
    explanation:'The passage says their mother prepares tea and snacks for them. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4eng-pp24-pdf-001', chapterId:'g4eng-comprehension', marks:2, year:2024, grade:4, subject:'English',
    question:'Q1B: (i) Find a word in the passage which means the same as "afraid". (ii) Write the meaning of the word "cyclone" as used in the passage.', type:'write' },
  { id:'g4eng-pp24-pdf-002', chapterId:'g4eng-comprehension', marks:4, year:2024, grade:4, subject:'English',
    question:'Q1C: Answer in complete sentences. (i) What did Lara and Tommy do when the cyclone warning was announced? (ii) Why did their mother tell them to stay indoors?', type:'write' },
  { id:'g4eng-pp24-pdf-003', chapterId:'g4eng-adjectives', marks:3, year:2024, grade:4, subject:'English',
    question:'Q2A: Write the comparative and superlative forms. (i) big (ii) happy (iii) good', type:'write' },
  { id:'g4eng-pp24-pdf-004', chapterId:'g4eng-verbs', marks:4, year:2024, grade:4, subject:'English',
    question:'Q2B: Fill in with the correct form of the verb "to be". (i) I ___ a student. (ii) They ___ at school yesterday. (iii) She ___ playing outside now. (iv) We ___ happy last week.', type:'write' },
  { id:'g4eng-pp24-pdf-005', chapterId:'g4eng-sentences', marks:3, year:2024, grade:4, subject:'English',
    question:'Q2C: Change these sentences to questions. (i) Lara is reading a book. (ii) They ate their snacks. (iii) The wind is blowing hard.', type:'write' },
  { id:'g4eng-pp24-pdf-006', chapterId:'g4eng-vocabulary', marks:3, year:2024, grade:4, subject:'English',
    question:'Q3A: Write the opposite (antonym) of each word. (i) noisy (ii) dangerous (iii) outside', type:'write' },
  { id:'g4eng-pp24-pdf-007', chapterId:'g4eng-passages', marks:8, year:2024, grade:4, subject:'English',
    question:'Q4: Write a composition of about 8–10 sentences about "A Rainy Day". Describe what you see, hear and do.', type:'write' }
);
