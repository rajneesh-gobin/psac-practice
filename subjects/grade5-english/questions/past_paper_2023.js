'use strict';
// PSAC Grade 5 English 2023 – past-paper questions adapted to MCQ format.
// Q1 comprehension (Nico & Tony fishing) items 1-5 → makeMCQ.
// Q2 open-comprehension, Q3 fill-in-blank, Q4 verb forms, Q5 cloze, Q6 picture
// writing → window.PSAC_PDF_QUESTIONS (not gradeable online).
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5eng-pp23-001', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Nico and Tony decided to go fishing one Saturday ________.',
    options:['at lunchtime','in the morning','in the afternoon','at dinnertime'],
    answer:'in the morning',
    hint:'Think about what time of day the story begins.',
    explanation:'The passage says it was "One Saturday morning". 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5eng-pp23-002', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Nico and Tony went to a pond because they wanted to ________.',
    options:['bring a bucket','help each other','catch fish','see beautiful fish'],
    answer:'catch fish',
    hint:'Re-read why the friends went to the pond.',
    explanation:'They went fishing at the pond specifically to catch fish for lunch and dinner. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5eng-pp23-003', chapterId:'eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:'"He was <strong>overjoyed</strong>." This means that Nico was very ________.',
    options:['silent','polite','calm','happy'],
    answer:'happy',
    hint:'Over- as a prefix means extremely. What feeling goes with catching a fish?',
    explanation:'"Overjoyed" means extremely happy or delighted. Nico was thrilled to have caught a fish. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5eng-pp23-004', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'Nico saw that Tony\'s bucket ________.',
    options:['was full of fish','had bait','had nothing in it','was filled with ingredients'],
    answer:'had nothing in it',
    hint:'Read the paragraph that says Tony\'s bucket was empty.',
    explanation:'The passage states clearly: "Tony\'s bucket was empty." 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5eng-pp23-005', chapterId:'eng-comprehension', subsection:'inference', difficulty:2,
    question:'When Tony threw the large fish into the pond <strong>the first time</strong>, Nico was ________.',
    options:['surprised','annoyed','patient','excited'],
    answer:'surprised',
    hint:'The passage says "Nico remained silent" the first time. What does that suggest?',
    explanation:'The first time Tony threw back a fish, Nico was silent and watching in surprise. He only became annoyed later after seeing it happen many more times. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5eng-pp23-pdf-001', chapterId:'eng-comprehension', marks:10, year:2023, grade:5, subject:'English',
    question:'Q2 – Open comprehension (5 questions) on the Nico & Tony fishing passage. e.g. "Why did Nico and Tony pack utensils and ingredients?", "Why did Nico offer to help Tony?", "Why did Tony keep throwing back the fish?", "What did Nico advise Tony to do?"', type:'write' },
  { id:'g5eng-pp23-pdf-002', chapterId:'eng-sentences', marks:10, year:2023, grade:5, subject:'English',
    question:'Q3 – Fill in each blank with ONE suitable word. (10 items on a short narrative about Rina and Tom sharing sweets, using prepositions, pronouns, connectors and vocabulary in context.)', type:'write' },
  { id:'g5eng-pp23-pdf-003', chapterId:'eng-verbs', marks:8, year:2023, grade:5, subject:'English',
    question:'Q4 – Write the verb in brackets in its correct form. (8 items testing present continuous, future simple, imperative, past simple, present participle and infinitive – e.g. "En ce moment, tu ___ au ballon. (jouer)" → joues)', type:'write' },
  { id:'g5eng-pp23-pdf-004', chapterId:'g5eng-cloze', marks:10, year:2023, grade:5, subject:'English',
    question:'Q5 – Cloze passage about the Himalayas. Complete the passage using the words given in the box. (10 blanks, 11 words provided – one is extra.)', type:'cloze' },
  { id:'g5eng-pp23-pdf-005', chapterId:'eng-writing', marks:12, year:2023, grade:5, subject:'English',
    question:'Q6 – Picture composition. Write a story of about 10 lines based on the pictures given. (Suggested words provided.)', type:'write' }
);
