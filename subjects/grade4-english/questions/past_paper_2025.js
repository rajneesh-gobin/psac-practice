'use strict';
// PSAC Grade 4 English 2025 – passage: Reena, Roy and their puppy Bouba.
// Q1A (3 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4eng-pp25-001', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Reena and Roy wanted a ___ as a pet.',
    options:['kitten','puppy','tortoise'],
    answer:'puppy',
    hint:'Find the sentence about what the children wanted as a pet.',
    explanation:'The passage says Reena and Roy wanted a puppy as a pet. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4eng-pp25-002', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Their new pet was in a box in the ___.',
    options:['kitchen','living room','bedroom'],
    answer:'kitchen',
    hint:'Find where the box with the puppy was kept.',
    explanation:'According to the passage, the puppy\'s box was in the kitchen. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4eng-pp25-003', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'The children\'s mother was ___ to see the children with the puppy.',
    options:['tired','scared','happy'],
    answer:'happy',
    hint:'Find how the mother reacted when she saw the children with Bouba.',
    explanation:'The passage tells us the mother was happy to see the children with the puppy. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4eng-pp25-pdf-001', chapterId:'g4eng-comprehension', marks:2, year:2025, grade:4, subject:'English',
    question:'Q1B: (i) Find a word in the passage which means the same as "joyful". (ii) Write the meaning of the word "puppy" as used in the passage.', type:'write' },
  { id:'g4eng-pp25-pdf-002', chapterId:'g4eng-comprehension', marks:4, year:2025, grade:4, subject:'English',
    question:'Q1C: Answer in complete sentences. (i) What did Reena and Roy name their pet? (ii) How did the children take care of Bouba?', type:'write' },
  { id:'g4eng-pp25-pdf-003', chapterId:'g4eng-nouns', marks:3, year:2025, grade:4, subject:'English',
    question:'Q2A: Write a collective noun for each group. (i) a ___ of birds (ii) a ___ of fish (iii) a ___ of wolves', type:'write' },
  { id:'g4eng-pp25-pdf-004', chapterId:'g4eng-verbs', marks:4, year:2025, grade:4, subject:'English',
    question:'Q2B: Fill in the blank with the correct present continuous tense. (i) The dog ___ (bark). (ii) The children ___ (play). (iii) She ___ (read) a book. (iv) I ___ (eat) lunch.', type:'write' },
  { id:'g4eng-pp25-pdf-005', chapterId:'g4eng-sentences', marks:3, year:2025, grade:4, subject:'English',
    question:'Q2C: Add the correct punctuation mark (. ? !). (i) What a lovely puppy (ii) The dog sleeps in the kitchen (iii) Where is Bouba', type:'write' },
  { id:'g4eng-pp25-pdf-006', chapterId:'g4eng-vocabulary', marks:3, year:2025, grade:4, subject:'English',
    question:'Q3A: Add a prefix or suffix to make a new word. (i) happy → ___ (unhappy or happiness) (ii) kind → ___ (unkind or kindness) (iii) play → ___', type:'write' },
  { id:'g4eng-pp25-pdf-007', chapterId:'g4eng-passages', marks:8, year:2025, grade:4, subject:'English',
    question:'Q4: Write a composition of about 8–10 sentences about "My Pet". If you do not have a pet, write about a pet you would like to have.', type:'write' }
);
