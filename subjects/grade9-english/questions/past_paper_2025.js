'use strict';
// NCE 2025 English (N500) — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  /* ── Q1 Grammar (items 1–6 fill-in-blank MCQ) ── */

  makeMCQ({ id:'g9eng-pp25-001', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:1,
    question:'They went _____ the beach during the weekend.',
    options:['with','to','for','into'], answer:'to',
    hint:'Movement towards a destination uses this preposition.',
    explanation:'"Go <b>to</b> the beach" — "to" indicates movement towards a place.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-002', chapterId:'g9eng-gr-determiners', difficulty:1,
    question:'The chair is old. _____ legs are shaky.',
    options:['Her','His','Its','Their'], answer:'Its',
    hint:'The chair is an object — use the possessive for things.',
    explanation:'The possessive determiner for an inanimate object is <b>Its</b>. "Her/His" are for people; "Their" is for plural.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-003', chapterId:'g9eng-gr-adverbs', subsection:'attitude_adverbs', difficulty:1,
    question:'I love mangoes. I _____ eat them as dessert.',
    options:['often','never','rarely','hardly'], answer:'often',
    hint:'"I love mangoes" tells you how frequently you eat them.',
    explanation:'Someone who loves mangoes eats them frequently. <b>Often</b> = many times; "never", "rarely", "hardly" all suggest infrequency.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-004', chapterId:'g9eng-gr-adjectives', difficulty:1,
    question:'Jeremy is _____ than Mary.',
    options:['as kind','so kind','kinder','kindest'], answer:'kinder',
    hint:'Two people are being compared — use the comparative.',
    explanation:'When comparing two people, use the comparative. <b>Kinder</b> = more kind. "Kindest" is for comparing against a whole group.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-005', chapterId:'g9eng-gr-determiners', difficulty:1,
    question:'_____ day, I brush my teeth twice.',
    options:['Some','All','Any','Every'], answer:'Every',
    hint:'This word means "each single day without exception".',
    explanation:'"<b>Every</b> day" means each day individually. "All day" means the whole of one day; "some" and "any" suggest uncertainty.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-006', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:1,
    question:'When he was born, his eyes _____ light brown.',
    options:['is','were','was','are'], answer:'were',
    hint:'"When he was born" sets the time — which tense and number?',
    explanation:'"Eyes" is plural → use plural verb. The clause is past ("was born") → past tense. Plural past = <b>were</b>.',
    learnMore:'📄 NCE 2025 English exam.' }),

  /* ── Q1 Grammar (items 7–9 choose-correct-sentence MCQ) ── */

  makeMCQ({ id:'g9eng-pp25-007', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:2,
    question:'Choose the sentence that is grammatically correct.',
    options:['While mum prepares dinner, Mary was reading her book.','While mum prepared dinner, Mary reads her book.','While mum is preparing dinner, Mary had read her book.','While mum was preparing dinner, Mary was reading her book.'], answer:'While mum was preparing dinner, Mary was reading her book.',
    hint:'Both actions were happening at the same time in the past — which tense shows that?',
    explanation:'Two simultaneous past actions use past continuous for both: <b>was preparing… was reading</b>. All other options mix tenses incorrectly.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-008', chapterId:'g9eng-gr-sentence', subsection:'perfect_conditional', difficulty:2,
    question:'Choose the sentence that is grammatically correct.',
    options:['If you wake up early, you will have time to revise.','If you woke up early, you will have time to revise.','If you had woken up early, you will have time to revise.','If you have woken up early, you will have time to revise.'], answer:'If you wake up early, you will have time to revise.',
    hint:'First conditional = If + present simple → will + base verb.',
    explanation:'First conditional for a real future possibility: <b>If you wake up</b> (present simple) → <b>you will have</b> (will + infinitive).',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-009', chapterId:'g9eng-gr-adverbs', subsection:'attitude_adverbs', difficulty:2,
    question:'Choose the sentence that is grammatically correct.',
    options:['How does this road lead to?','Which does this road lead to?','Where does this road lead to?','Why does this road lead to?'], answer:'Where does this road lead to?',
    hint:'This question asks about a destination or direction.',
    explanation:'"<b>Where</b> does this road lead to?" asks about a place or direction. "How" asks manner; "Which" needs alternatives; "Why" asks reason.',
    learnMore:'📄 NCE 2025 English exam.' }),

  /* ── Q2 Vocabulary (items 1–5 MCQ) ── */

  makeMCQ({ id:'g9eng-pp25-010', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'John is very _____. He never changes his mind about anything.',
    options:['intelligent','stubborn','lazy','dishonest'], answer:'stubborn',
    hint:'"Never changes his mind" describes this quality.',
    explanation:'Someone who never changes their mind is <b>stubborn</b> — fixed in their opinions and not open to persuasion.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-011', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:2,
    question:'The headmaster _____ the bell for recess.',
    options:['shouted','beat','banged','rang'], answer:'rang',
    hint:'"Ring" is the specific verb for a bell.',
    explanation:'"<b>Rang</b>" is the past tense of "ring" — the correct collocate for a bell. "Beat" and "bang" are for drums; "shout" is for the voice.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-012', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'The _____ announced that the plane was about to land.',
    options:['pilot','driver','passenger','player'], answer:'pilot',
    hint:'Who is in charge of flying a plane?',
    explanation:'The <b>pilot</b> is the person who flies the plane and communicates with passengers. A "driver" drives a vehicle on the ground.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-013', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:2,
    question:'The students _____ about the class captain to the class teacher.',
    options:['reported','complained','cried','told'], answer:'complained',
    hint:'This word means to express dissatisfaction about someone or something.',
    explanation:'"<b>Complained</b> about" means to say that something is wrong or unfair. "Reported" and "told" use different grammatical patterns.',
    learnMore:'📄 NCE 2025 English exam.' }),

  makeMCQ({ id:'g9eng-pp25-014', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'All of our reservoirs are full because of the _____.',
    options:['gusts','winds','floods','droughts'], answer:'floods',
    hint:'What fills reservoirs with water?',
    explanation:'Reservoirs fill up when there is too much rainfall — causing <b>floods</b>. "Droughts" cause them to empty; "gusts/winds" affect neither.',
    learnMore:'📄 NCE 2025 English exam.' }),

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g9eng-pp25-pdf-001', chapterId:'g9eng-gr-sentence', marks:6, year:2025, grade:9, subject:'English', type:'written',
    question:'Q1 items 10–15: Grammar rewrites — (10) underline words needing capital letters in "john is going to spain next month."; (11) rewrite "My neighbour\'s cat is very pretty." using \'neighbour\' in the plural; (12) rewrite "Pam watered the plants last Sunday." in its negative form; (13) link "Paul will go running. It rains." with "unless"; (14) rewrite "The shopkeeper told Jim, \'Throw the box away.\'" using indirect speech; (15) rewrite "A new car was bought by Salim." using active voice.',
    markScheme:'One mark per correct rewrite.' },

  { id:'g9eng-pp25-pdf-002', chapterId:'g9eng-reading', marks:10, year:2025, grade:9, subject:'English', type:'written',
    question:'Q3 Basic Reading (10 marks): Key events in the life of Alfred Nobel — informational text (biography card + two passages about the dynamite and the Nobel Prizes). Questions 1–9(ii) cover retrieval: year born, professions, testament amount, what kieselguhr is, year dynamite invented, benefit of dynamite in construction, years in San Remo, aim of Nobel Prizes, who won Peace Prize in 2014 and why.',
    markScheme:'One mark each. Accept paraphrase from the text.' },

  { id:'g9eng-pp25-pdf-003', chapterId:'g9eng-word-formation', marks:5, year:2025, grade:9, subject:'English', type:'written',
    question:'Q4 Word Formation (5 marks): Passage about <i>Anne of Green Gables</i>. Use: child (given as "children"), tell→ (correct form), mischief→ (adjective), imagine→ (noun), adopt→ (past participle), gradual→ (adverb).',
    markScheme:'One mark per correctly formed word.' },

  { id:'g9eng-pp25-pdf-004', chapterId:'g9eng-reading', marks:5, year:2025, grade:9, subject:'English', type:'written',
    question:'Q5 Error Hunt (5 marks): Correct underlined errors in the passage about breadfruit: (a) "fruits" → "fruit"; (b) "area" → "areas" (OR check exact correction — tropical areas); (c) "Its" → "It\'s"; (d) "their" → "there"; (e) "boiled" → "boil". First correction is given.',
    markScheme:'One mark per correct correction.' },

  { id:'g9eng-pp25-pdf-005', chapterId:'g9eng-reading', marks:5, year:2025, grade:9, subject:'English', type:'written',
    question:'Q6 Cloze (5 marks): Complete the text about household chores and their benefits for children. Write one suitable word per blank (e.g. many, teach/help, manage/control, also/regularly, in). First word "floor" is given.',
    markScheme:'One mark per contextually appropriate word.' },

  { id:'g9eng-pp25-pdf-006', chapterId:'g9eng-writing', marks:10, year:2025, grade:9, subject:'English', type:'written',
    question:'Q7 Functional Writing (10 marks): Write a letter or short text (50–75 words) about a planned event or activity. Include the five bullet-point prompts given on the question paper.',
    markScheme:'Content (all bullet points addressed), language accuracy, and appropriate register.' },

  { id:'g9eng-pp25-pdf-007', chapterId:'g9eng-reading', marks:20, year:2025, grade:9, subject:'English', type:'written',
    question:'Q8 Extended Reading (20 marks): Read the passage provided and answer the comprehension questions. Questions cover retrieval, inference, vocabulary in context, and character or theme analysis.',
    markScheme:'1–2 marks per question. Inference questions require evidence from the text.' },

  { id:'g9eng-pp25-pdf-008', chapterId:'g9eng-writing', marks:15, year:2025, grade:9, subject:'English', type:'written',
    question:'Q9 Extended Writing (15 marks): Write an essay of about 200–250 words on one of the three topics given (descriptive, argumentative, or narrative).',
    markScheme:'Marks for content and ideas, organisation, language accuracy, and vocabulary range.' },

  { id:'g9eng-pp25-pdf-009', chapterId:'g9eng-literature', marks:10, year:2025, grade:9, subject:'English', type:'written',
    question:'Q10 Literary Appreciation (10 marks): Answer either Option A (Poetry) or Option B (Prose). Questions include: narrative voice identification with evidence; identification of a figurative device (MCQ); effect of the device; line explication; and a supported response (3 marks) on what the text is about.',
    markScheme:'MCQ items: 1 mark each. Written items: 1 mark each for explanation with evidence; supported response up to 3 marks.' },

);
