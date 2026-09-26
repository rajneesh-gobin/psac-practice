'use strict';
// PSAC Grade 5 English 2025 – past-paper questions adapted to MCQ format.
// Q1 comprehension (Dinah & doll Tiara) items 1-5 → makeMCQ.
// Q2 open-comprehension, Q3 fill-in-blank, Q4 verb forms, Q5 cloze, Q6 picture
// writing → window.PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5eng-pp25-001', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'How old was Dinah at the start of the story?',
    options:['seven','eight','nine','ten'],
    answer:'nine',
    hint:'The passage gives Dinah\'s exact age in the first paragraph.',
    explanation:'The passage states Dinah was nine years old at the beginning of the story. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5eng-pp25-002', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Dinah\'s only toy was a ________.',
    options:['doll','teddy bear','bicycle','ball'],
    answer:'doll',
    hint:'This toy had a special name, Tiara.',
    explanation:'The passage tells us that Dinah\'s only and most treasured toy was her doll, named Tiara. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5eng-pp25-003', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Whenever Dinah returned home from school, she ________.',
    options:['did her homework first','played with her doll','had a meal','watched television'],
    answer:'played with her doll',
    hint:'What was Dinah\'s daily routine after school?',
    explanation:'According to the passage, Dinah always played with her doll Tiara as soon as she came home from school. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5eng-pp25-004', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Dinah promised Tiara she would buy her pretty dresses when she would ________.',
    options:['start working','win a prize','go on holiday','become a teacher'],
    answer:'start working',
    hint:'What was Dinah\'s reason for not buying the dresses straight away?',
    explanation:'Dinah told Tiara that she would buy her pretty dresses once she grew up and started working and earning money. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5eng-pp25-005', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'What did Dinah find in the small box her father brought?',
    options:['sweets','five dresses','a toy car','coloured pencils'],
    answer:'five dresses',
    hint:'The surprise in the box was exactly what Dinah had promised Tiara.',
    explanation:'Dinah\'s father brought a small box containing five pretty dresses that fit Tiara perfectly, fulfilling the promise Dinah had made. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5eng-pp25-pdf-001', chapterId:'eng-comprehension', marks:10, year:2025, grade:5, subject:'English',
    question:'Q2 – Open comprehension (5 questions) on the Dinah & Tiara passage. e.g. "Why was Tiara so important to Dinah?", "What did Dinah apologise to Tiara about?", "What does the story tell us about the relationship between Dinah and her father?", "What is the main message of this story?"', type:'write' },
  { id:'g5eng-pp25-pdf-002', chapterId:'eng-sentences', marks:10, year:2025, grade:5, subject:'English',
    question:'Q3 – Fill in each blank with ONE suitable word. (10 items testing prepositions, conjunctions, pronouns, adjectives and verbs in context.)', type:'write' },
  { id:'g5eng-pp25-pdf-003', chapterId:'eng-verbs', marks:8, year:2025, grade:5, subject:'English',
    question:'Q4 – Write the verb in brackets in its correct form. (8 items testing a mix of tenses: present simple, past simple, present continuous, future, present perfect and imperative.)', type:'write' },
  { id:'g5eng-pp25-pdf-004', chapterId:'g5eng-cloze', marks:10, year:2025, grade:5, subject:'English',
    question:'Q5 – Cloze passage. Complete the passage using the words given in the box. (10 blanks, 11 words provided – one is extra.)', type:'cloze' },
  { id:'g5eng-pp25-pdf-005', chapterId:'eng-writing', marks:12, year:2025, grade:5, subject:'English',
    question:'Q6 – Picture composition. Write a story of about 10 lines based on the pictures given. (Suggested words provided.)', type:'write' }
);
