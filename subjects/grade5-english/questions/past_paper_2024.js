'use strict';
// PSAC Grade 5 English 2024 – past-paper questions adapted to MCQ format.
// Q1 comprehension (Fifi & teddy bear Jim) items 1-5 → makeMCQ.
// Q2 open-comprehension, Q3 fill-in-blank, Q4 verb forms, Q5 cloze, Q6 picture
// writing → window.PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5eng-pp24-001', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Fifi and Jim were ________.',
    options:['neighbours','sisters','classmates','best of friends'],
    answer:'best of friends',
    hint:'The very first line of the story tells you who Jim is to Fifi.',
    explanation:'The passage opens: "Fifi and Jim were best of friends." Jim is Fifi\'s favourite teddy bear. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5eng-pp24-002', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Where did Fifi first look for Jim?',
    options:['In the backyard','Under her bed','In the kitchen','On her bookshelf'],
    answer:'Under her bed',
    hint:'Think of where a child would first check for a lost toy.',
    explanation:'The passage says Fifi looked under her bed first when she couldn\'t find Jim. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5eng-pp24-003', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Who searched the backyard for Jim?',
    options:['Fifi\'s dad','Fifi\'s brother','Fifi herself','Fifi\'s mother'],
    answer:'Fifi\'s brother',
    hint:'Read the paragraph that describes the backyard search.',
    explanation:'The passage states "her elder brother searched the backyard" while other family members looked elsewhere. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5eng-pp24-004', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Who suggested looking in Fifi\'s room again?',
    options:['Fifi\'s grandmother','Fifi\'s brother','Fifi\'s dad','Fifi\'s mother'],
    answer:'Fifi\'s mother',
    hint:'After the whole family searched, one person had a fresh idea.',
    explanation:'Fifi\'s mother suggested going back to look carefully in Fifi\'s room again, which led to finding Jim. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5eng-pp24-005', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'Jim was finally found ________.',
    options:['in the garden','in the kitchen cabinet','under a pile of clothes','on Fifi\'s bed, under the blanket'],
    answer:'on Fifi\'s bed, under the blanket',
    hint:'Where exactly was Jim hiding? It was somewhere in Fifi\'s room.',
    explanation:'Jim was found on Fifi\'s bed, tucked under the blanket — exactly where Fifi had left him without realising it. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5eng-pp24-pdf-001', chapterId:'eng-comprehension', marks:10, year:2024, grade:5, subject:'English',
    question:'Q2 – Open comprehension (5 questions) on the Fifi & Jim passage. e.g. "Why was Jim so special to Fifi?", "Why did the family help Fifi search?", "How did Fifi feel when Jim was not found at first?", "What lesson can we learn from this story?"', type:'write' },
  { id:'g5eng-pp24-pdf-002', chapterId:'eng-sentences', marks:10, year:2024, grade:5, subject:'English',
    question:'Q3 – Fill in each blank with ONE suitable word. (10 items in a passage about a school trip, testing prepositions, pronouns, adjectives, connectors and verbs in context.)', type:'write' },
  { id:'g5eng-pp24-pdf-003', chapterId:'eng-verbs', marks:8, year:2024, grade:5, subject:'English',
    question:'Q4 – Write the verb in brackets in its correct form. (8 items testing present simple, past simple, future with will/going to, present continuous, imperative and infinitive.)', type:'write' },
  { id:'g5eng-pp24-pdf-004', chapterId:'g5eng-cloze', marks:10, year:2024, grade:5, subject:'English',
    question:'Q5 – Cloze passage about dolphins. Complete the passage using the words given in the box. (10 blanks, 11 words provided – one is extra.)', type:'cloze' },
  { id:'g5eng-pp24-pdf-005', chapterId:'eng-writing', marks:12, year:2024, grade:5, subject:'English',
    question:'Q6 – Picture composition. Write a story of about 10 lines based on the four pictures given. (Suggested words provided.)', type:'write' }
);
