'use strict';
// PSAC Grade 6 English 2022 — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (MES PSAC 2021-2022, Subject code P110).

STATIC_QUESTIONS.push(

  // --- Question 2: Grammar MCQs (10 marks) ---

  makeMCQ({ id:'g6eng-pp22-001', chapterId:'g6eng-verbs', difficulty:1,
    question:'Yesterday, Grandma __________ some cakes for us.',
    options:['will make','made','makes','has made'], answer:'made',
    hint:'"Yesterday" is the time clue. What tense does it signal?',
    explanation:'"Yesterday" signals simple past tense — "made" is the past form of "make".' }),

  makeMCQ({ id:'g6eng-pp22-002', chapterId:'g6eng-vocabulary', difficulty:1,
    question:'Preety\'s birthday is __________ the 29th of May.',
    options:['on','for','with','at'], answer:'on',
    hint:'Which preposition is used with specific dates?',
    explanation:'"On" is used with specific days and dates — "on the 29th of May".' }),

  makeMCQ({ id:'g6eng-pp22-003', chapterId:'g6eng-nouns', difficulty:1,
    question:'My uncle is proud of __________ daughter.',
    options:['him','his','himself','he'], answer:'his',
    hint:'You need a possessive adjective before the noun "daughter".',
    explanation:'"His" is a possessive adjective. "Him" and "he" are subject/object pronouns; "himself" is reflexive.' }),

  makeMCQ({ id:'g6eng-pp22-004', chapterId:'g6eng-nouns', difficulty:2,
    question:'There has been __________ rain this month. It is dry everywhere.',
    options:['many','few','any','little'], answer:'little',
    hint:'"Rain" is uncountable. Which quantifier fits an uncountable noun meaning "not much"?',
    explanation:'"Little" is used with uncountable nouns to mean a small amount. "Few" is for countable nouns.' }),

  makeMCQ({ id:'g6eng-pp22-005', chapterId:'g6eng-nouns', difficulty:2,
    question:'We are going to hurt __________ if we are not careful.',
    options:['myself','themselves','ourselves','himself'], answer:'ourselves',
    hint:'The subject is "We". The reflexive pronoun must match.',
    explanation:'"We" → "ourselves" (reflexive). "Myself" = I; "themselves" = they; "himself" = he.' }),

  makeMCQ({ id:'g6eng-pp22-006', chapterId:'g6eng-nouns', difficulty:1,
    question:'Pascal\'s car is __________ than Sam\'s car.',
    options:['as big','so big','bigger','biggest'], answer:'bigger',
    hint:'You are comparing two cars. Which form of the adjective do you need?',
    explanation:'Comparative form (one syllable + -er) is used when comparing two things: "bigger than".' }),

  makeMCQ({ id:'g6eng-pp22-007', chapterId:'g6eng-verbs', difficulty:2,
    question:'When I opened my eyes, I __________ someone smiling at me.',
    options:['am seeing','see','saw','will see'], answer:'saw',
    hint:'"When I opened" is past simple — what tense fits an action at that same past moment?',
    explanation:'"Saw" is simple past — it describes what the speaker perceived at a specific moment in the past.' }),

  makeMCQ({ id:'g6eng-pp22-008', chapterId:'g6eng-verbs', difficulty:1,
    question:'Did your brother __________ football last week?',
    options:['play','played','playing','plays'], answer:'play',
    hint:'After the auxiliary "did", what form of the main verb do you use?',
    explanation:'After "did", the main verb must be in the base (infinitive) form — "play".' }),

  makeMCQ({ id:'g6eng-pp22-009', chapterId:'g6eng-clauses', difficulty:2,
    question:'This is the place __________ we stayed last time.',
    options:['what','who','when','where'], answer:'where',
    hint:'The antecedent is "place" (a location). Which relative adverb introduces a place?',
    explanation:'"Where" introduces a relative clause about a place. "Who" = people; "when" = time.' }),

  makeMCQ({ id:'g6eng-pp22-010', chapterId:'g6eng-clauses', difficulty:2,
    question:'You will only succeed __________ you work hard.',
    options:['if','despite','unless','however'], answer:'if',
    hint:'You need a conjunction that introduces a positive condition for success.',
    explanation:'"If" introduces a conditional clause: success depends on the condition of working hard.' }),

  // --- Question 3B: Vocabulary MCQs (5 marks) ---

  makeMCQ({ id:'g6eng-pp22-011', chapterId:'g6eng-vocabulary', difficulty:1,
    question:'Can you please turn down the radio? It is too __________.',
    options:['expensive','loud','new','broken'], answer:'loud',
    hint:'Why would someone ask you to turn down the volume?',
    explanation:'"Loud" means producing a lot of noise — you turn down a radio that is too loud.' }),

  makeMCQ({ id:'g6eng-pp22-012', chapterId:'g6eng-vocabulary', difficulty:1,
    question:'We could not get a seat because the cinema was __________.',
    options:['full','large','wide','beautiful'], answer:'full',
    hint:'If there are no seats, what does that say about the cinema?',
    explanation:'A cinema with no seats available is "full" — all seats have been taken.' }),

  makeMCQ({ id:'g6eng-pp22-013', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'"Can you please lend me your pen?" I __________ Mary.',
    options:['told','spoke','said','asked'], answer:'asked',
    hint:'You are reporting a request (a question asking for something). Which reporting verb fits?',
    explanation:'"Asked" reports a question or request. "Told" + object reports a statement; "said" has no direct object.' }),

  makeMCQ({ id:'g6eng-pp22-014', chapterId:'g6eng-vocabulary', difficulty:1,
    question:'The sea is very dangerous here. People who go swimming might __________.',
    options:['fall','drown','jump','run'], answer:'drown',
    hint:'What is the specific danger of swimming in a dangerous sea?',
    explanation:'"Drown" means to die from sinking under water — the logical risk of swimming in a dangerous sea.' }),

  makeMCQ({ id:'g6eng-pp22-015', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'Mother did not want us to eat a lot of chocolates. She __________ them in the cupboard.',
    options:['bought','collected','hid','cooked'], answer:'hid',
    hint:'If she didn\'t want you to find them, what would she do with them?',
    explanation:'"Hid" means put out of sight — she hid the chocolates so the children could not find and eat them.' }),

  // --- Question 4B: Comprehension MCQs — story "Swami and Mr Samuel" ---

  makeMCQ({ id:'g6eng-pp22-016', chapterId:'g6eng-comprehension', difficulty:1,
    question:'In the story "Swami and Mr Samuel" (adapted from Malgudi Days): At the time of the school assembly, Swami was in __________.',
    options:['Mr Samuel\'s class','the head teacher\'s office','his mother\'s room','the kitchen'], answer:'his mother\'s room',
    hint:'At 09:10, when school assembly was happening, where was Swami?',
    explanation:'"At 09 10, when he should have been in the school assembly, Swami was lying in his mother\'s room."' }),

  makeMCQ({ id:'g6eng-pp22-017', chapterId:'g6eng-comprehension', difficulty:2,
    question:'In the story "Swami and Mr Samuel": According to Swami, Mr Samuel severely punished children who were __________.',
    options:['late','absent','inattentive','talkative'], answer:'late',
    hint:'Think about what Swami claimed would happen to him because of the time he arrived.',
    explanation:'"He punishes children who come in late very severely" — that was Swami\'s excuse.' }),

  makeMCQ({ id:'g6eng-pp22-018', chapterId:'g6eng-comprehension', difficulty:2,
    question:'In the story "Swami and Mr Samuel": Swami changed his excuses because __________.',
    options:['the head teacher was cruel','his father was strict','his mother was kind','Mr Samuel was gentle'], answer:'his father was strict',
    hint:'Why did Swami stop using the headache excuse and try a different story?',
    explanation:'"Swami knew how strict his father could be. So, he changed his excuses." — his father\'s strictness made Swami try harder.' }),

  makeMCQ({ id:'g6eng-pp22-019', chapterId:'g6eng-comprehension', difficulty:2,
    question:'In the story "Swami and Mr Samuel": When Swami said he had not done his homework, Mr Samuel was __________.',
    options:['disappointed with him','kind to him','angry with him','proud of him'], answer:'kind to him',
    hint:'What did Mr Samuel say when Swami admitted he hadn\'t done his homework?',
    explanation:'"No problem. You can submit the work tomorrow," Mr Samuel said gently — he was kind.' }),

  makeMCQ({ id:'g6eng-pp22-020', chapterId:'g6eng-comprehension', difficulty:2,
    question:'In the story "Swami and Mr Samuel": Swami went to the head teacher\'s office at __________.',
    options:['09 00','09 10','09 30','15 30'], answer:'15 30',
    hint:'At what time did the bell ring before Swami ran to deliver the letter?',
    explanation:'"When the bell rang at 15 30, Swami ran to the head teacher\'s office to deliver the letter."' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6eng-pp22-pdf-001', chapterId:'g6eng-writing', marks:5, year:2022, grade:6, subject:'English',
    question:'Question 1 (Matching): Match each sentence on the left with the corresponding sentence on the right. (6 sentences + 1 extra)', type:'matching' },
  { id:'g6eng-pp22-pdf-002', chapterId:'g6eng-vocabulary', marks:5, year:2022, grade:6, subject:'English',
    question:'Question 3A: Find a word from the description and first letter. (i) Z__ you visit to see animals (ii) R____ instrument to draw straight lines (iii) B___ place where people keep money (iv) K______ baby of a cat (v) P_______ person who repairs taps', type:'word-definition' },
  { id:'g6eng-pp22-pdf-003', chapterId:'g6eng-comprehension', marks:10, year:2022, grade:6, subject:'English',
    question:'Question 4A (Reading: Spiders): Complete 10 short-answer items — types, body parts, legs, diet, silk webs, lifespan, Black Widow, garden protection.', type:'short-answer' },
  { id:'g6eng-pp22-pdf-004', chapterId:'g6eng-comprehension', marks:3, year:2022, grade:6, subject:'English',
    question:'Question 4B True/False: (i) Swami liked going to school. (ii) Swami had a headache. (iii) Swami said the head teacher was scared of Mr Samuel.', type:'true-false' },
  { id:'g6eng-pp22-pdf-005', chapterId:'g6eng-writing', marks:6, year:2022, grade:6, subject:'English',
    question:'Question 4B open tasks: (7) Explain why "Swami went to school feeling that he was the worst boy on earth." (8) Circle two adjectives to describe Swami from: lazy / generous / careful / dishonest / shy. (9) Put 5 events in correct order.', type:'short-answer' }
);
