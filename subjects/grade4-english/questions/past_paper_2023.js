'use strict';
// PSAC Grade 4 English 2023 – passage: Peter's secret garden.
// Q1A (3 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4eng-pp23-001', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Peter is in ___ this year.',
    options:['Grade 6','Grade 5','Grade 4'],
    answer:'Grade 4',
    hint:'Look at the first paragraph of the passage.',
    explanation:'The passage says Peter is in Grade 4 this year. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4eng-pp23-002', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'___ knows Peter\'s secret.',
    options:['Tom','Miss Sarah','Sam'],
    answer:'Miss Sarah',
    hint:'Re-read the part where Peter talks about who knows his secret.',
    explanation:'Only Miss Sarah knows Peter\'s secret, as stated in the passage. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4eng-pp23-003', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'When his friends play football, Peter ___.',
    options:['plays with them','eats his bread','watches them'],
    answer:'watches them',
    hint:'Find the sentence about what Peter does when his friends play.',
    explanation:'According to the passage, Peter watches his friends play football. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4eng-pp23-pdf-001', chapterId:'g4eng-comprehension', marks:2, year:2023, grade:4, subject:'English',
    question:'Q1B: (i) Find a word in the passage which means the same as "happy". (ii) Write the meaning of the word "secret" as used in the passage.', type:'write' },
  { id:'g4eng-pp23-pdf-002', chapterId:'g4eng-comprehension', marks:4, year:2023, grade:4, subject:'English',
    question:'Q1C: Answer in complete sentences. (i) Why does Peter go to the garden every day? (ii) How does Miss Sarah help Peter?', type:'write' },
  { id:'g4eng-pp23-pdf-003', chapterId:'g4eng-nouns', marks:3, year:2023, grade:4, subject:'English',
    question:'Q2A: Write the plural of each word. (i) child (ii) woman (iii) tooth', type:'write' },
  { id:'g4eng-pp23-pdf-004', chapterId:'g4eng-verbs', marks:4, year:2023, grade:4, subject:'English',
    question:'Q2B: Fill in the blank with the correct past tense of the verb in brackets. (i) She ___ (go) to school. (ii) They ___ (eat) lunch. (iii) He ___ (run) fast. (iv) We ___ (see) a bird.', type:'write' },
  { id:'g4eng-pp23-pdf-005', chapterId:'g4eng-sentences', marks:3, year:2023, grade:4, subject:'English',
    question:'Q2C: Punctuate the following sentences correctly. (i) peter loves his garden (ii) what a beautiful flower (iii) she said i am happy', type:'write' },
  { id:'g4eng-pp23-pdf-006', chapterId:'g4eng-vocabulary', marks:3, year:2023, grade:4, subject:'English',
    question:'Q3A: Write ONE word for each meaning. (i) a person who teaches (ii) the opposite of "noisy" (iii) very big', type:'write' },
  { id:'g4eng-pp23-pdf-007', chapterId:'g4eng-passages', marks:8, year:2023, grade:4, subject:'English',
    question:'Q4: Write a composition of about 8–10 sentences about "My Favourite Place". Use the guide words: where, what, who, why.', type:'write' }
);
