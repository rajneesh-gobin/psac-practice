'use strict';
// NCE 2024 English (N500) — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  /* ── Q1 Grammar (items 1–9 MCQ) ── */

  makeMCQ({ id:'g9eng-pp24-001', chapterId:'g9eng-gr-adjectives', difficulty:1,
    question:'Sahil is the _____ boy in his class.',
    options:['stronger','strongest','as strong','so strong'], answer:'strongest',
    hint:'He is compared against all the boys in his class.',
    explanation:'When comparing one person against an entire group, use the superlative. <b>Strongest</b> = the most strong.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-002', chapterId:'g9eng-gr-determiners', difficulty:1,
    question:'There is not _____ milk left.',
    options:['many','plenty','lots','much'], answer:'much',
    hint:'"Milk" is uncountable.',
    explanation:'"<b>Much</b>" is used with uncountable nouns. "Many" goes with countable nouns.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-003', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:1,
    question:'We went _____ the park for a picnic.',
    options:['at','to','for','under'], answer:'to',
    hint:'Movement in the direction of a place uses this preposition.',
    explanation:'"Go <b>to</b>" indicates movement towards a destination. "At" shows location, not movement.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-004', chapterId:'g9eng-gr-pronouns', difficulty:1,
    question:'My brother has hurt his leg. They are taking _____ to the hospital.',
    options:['him','her','them','you'], answer:'him',
    hint:'"Brother" is masculine singular.',
    explanation:'"Brother" is a masculine singular noun → the object pronoun is <b>him</b>.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-005', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:1,
    question:'Devika _____ to visit me tomorrow.',
    options:['was coming','had come','has come','will come'], answer:'will come',
    hint:'"Tomorrow" signals the future.',
    explanation:'"Tomorrow" indicates a future event. Simple future → <b>will come</b>.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-006', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:1,
    question:'Sarah and her friend cleaned their room _____.',
    options:['herself','himself','ourselves','themselves'], answer:'themselves',
    hint:'"Sarah and her friend" is plural — they did it on their own.',
    explanation:'"Sarah and her friend" is plural → <b>themselves</b>. "Herself" and "himself" are singular.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-007', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:2,
    question:'The train will arrive _____ ten minutes.',
    options:['in','on','at','to'], answer:'in',
    hint:'This preposition means "after a period of time has passed".',
    explanation:'"<b>In</b> ten minutes" means after ten minutes have elapsed. "At" is for a specific clock time.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-008', chapterId:'g9eng-gr-sentence', subsection:'direct_speech', difficulty:2,
    question:'_____ is the capital of France?',
    options:['Who','Why','What','When'], answer:'What',
    hint:'This question asks about a thing (a place), not a person.',
    explanation:'"<b>What</b>" is used to ask about things. "Paris" is a place → "What is the capital of France?"',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-009', chapterId:'g9eng-gr-sentence', subsection:'perfect_conditional', difficulty:2,
    question:'If I study hard, I _____ pass the exam.',
    options:['was','am','will','would'], answer:'will',
    hint:'This is a first conditional — a real possibility in the present/future.',
    explanation:'First conditional: If + present simple → <b>will</b> + bare infinitive. "If I study… I <b>will</b> pass."',
    learnMore:'📄 NCE 2024 English exam.' }),

  /* ── Q2 Vocabulary (items 1–5 MCQ) ── */

  makeMCQ({ id:'g9eng-pp24-010', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'It is very _____ today. Make sure you wear warm clothes.',
    options:['cold','sunny','dry','wet'], answer:'cold',
    hint:'"Wear warm clothes" is the context clue.',
    explanation:'Warm clothes are worn when the weather is <b>cold</b>. The instruction to wear warm clothes is the clue.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-011', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:2,
    question:'The students _____ that the school was dirty.',
    options:['contributed','complained','congratulated','consoled'], answer:'complained',
    hint:'This word means to express dissatisfaction.',
    explanation:'"<b>Complained</b>" means to express that something is wrong or unsatisfactory — matching the students\' reaction to the dirty school.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-012', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:"I'm _____ I will do well in my test. I have revised well.",
    options:['doubtful','unsure','surprised','confident'], answer:'confident',
    hint:'"I have revised well" explains why the speaker feels this way.',
    explanation:'Having revised well gives certainty about success. The feeling is <b>confident</b> — sure of a positive outcome.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-013', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'The 24th of May is a Friday. I have checked the _____.',
    options:['dictionary','calendar','recipe','notebook'], answer:'calendar',
    hint:'This item shows the days and dates of the year.',
    explanation:'A <b>calendar</b> shows days and dates. Checking a calendar is how you confirm that a date falls on a certain day.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-014', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'The _____ in this orchestra are all very young.',
    options:['officers','barbers','musicians','drivers'], answer:'musicians',
    hint:'An orchestra is a group of people who play musical instruments.',
    explanation:'An orchestra performs music, so its members are <b>musicians</b>.',
    learnMore:'📄 NCE 2024 English exam.' }),

  /* ── Q10 Option A — Poetry: Hope by Emily Dickinson ── */

  makeMCQ({ id:'g9eng-pp24-015', chapterId:'g9eng-literature', subsection:'narrative_voice', difficulty:1,
    question:'Which <b>narrative voice</b> is the poet using in <i>Hope</i> by Emily Dickinson?',
    options:['First-person','Second-person','Third-person','Fourth-person'], answer:'First-person',
    hint:'Look for the pronoun the poet uses about themselves.',
    explanation:'"<b>I\'ve</b> heard it in the chillest land, / And on the strangest sea." The poet uses "I" — <b>first-person</b> narration.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-016', chapterId:'g9eng-literature', subsection:'rhyme', difficulty:1,
    question:'Which one of the following is a pair of <b>rhyming words</b> from the poem <i>Hope</i>?',
    options:['feathers, words','heard, bird','storm, warm','land, extremity'], answer:'storm, warm',
    hint:'Say each pair aloud — which pair ends with the same sound?',
    explanation:'"And sore must be the <b>storm</b> / That could abash the little bird / That kept so many <b>warm</b>." Storm and warm share the "-orm" rhyme sound.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-017', chapterId:'g9eng-literature', subsection:'figurative_devices', difficulty:2,
    question:'Which one of the following lines from <i>Hope</i> is a <b>metaphor</b>?',
    options:['Hope is the thing with feathers','And sweetest in the gale is heard','I\'ve heard it in the chillest land','And never stops at all'], answer:'Hope is the thing with feathers',
    hint:'A metaphor directly equates one thing with another — no "like" or "as".',
    explanation:'"Hope <b>is</b> the thing with feathers" — hope is directly described as a bird. This is a metaphor; no "like" or "as" is used.',
    learnMore:'📄 NCE 2024 English exam.' }),

  /* ── Q10 Option B — Prose: The Machine Stops by E.M. Forster ── */

  makeMCQ({ id:'g9eng-pp24-018', chapterId:'g9eng-literature', subsection:'narrative_voice', difficulty:1,
    question:'Which <b>narrative voice</b> is the narrator using in the extract from <i>The Machine Stops</i>?',
    options:['First-person','Second-person','Third-person','Fourth-person'], answer:'Third-person',
    hint:'Does the narrator describe characters from inside or from outside?',
    explanation:'"Seated in an armchair… is Vashti, a small woman…" The narrator describes characters from outside, using their names. This is <b>third-person</b>.',
    learnMore:'📄 NCE 2024 English exam.' }),

  makeMCQ({ id:'g9eng-pp24-019', chapterId:'g9eng-literature', subsection:'figurative_devices', difficulty:2,
    question:'Which one of the following is a <b>simile</b> in the extract from <i>The Machine Stops</i>?',
    options:['… with a face as white as a fungus','… so that no one else could speak to her','I want to see you not through the Machine','… so that we can meet face to face'], answer:'… with a face as white as a fungus',
    hint:'A simile uses "as" or "like" for comparison.',
    explanation:'"… with a face <b>as</b> white <b>as</b> a fungus" uses "as … as" to compare Vashti\'s pale face to a fungus — a simile.',
    learnMore:'📄 NCE 2024 English exam.' }),

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g9eng-pp24-pdf-001', chapterId:'g9eng-gr-sentence', marks:6, year:2024, grade:9, subject:'English', type:'written',
    question:'Q1 items 10–15: Grammar rewrites — (10) underline capital letters in "anne went out with her friends on thursday."; (11) rewrite starting "Yesterday" ("The bus is late."); (12) rewrite in interrogative form ("James has forgotten his bag."); (13) link with "although" ("She had not finished her homework. She went to sleep."); (14) rewrite in negative ("Peter buys a book."); (15) rewrite in indirect speech ("Did you see the accident?" the policeman asked him).',
    markScheme:'One mark per correct rewrite.' },

  { id:'g9eng-pp24-pdf-002', chapterId:'g9eng-reading', marks:10, year:2024, grade:9, subject:'English', type:'written',
    question:'Q3 Basic Reading (10 marks): Mauritius Animal Savers Pet Adoption Day — poster comprehension. Answer questions about adoption procedures, animal types available, requirements, and event details.',
    markScheme:'One mark per accurate answer. Accept paraphrase from the poster.' },

  { id:'g9eng-pp24-pdf-003', chapterId:'g9eng-word-formation', marks:5, year:2024, grade:9, subject:'English', type:'written',
    question:'Q4 Word Formation (5 marks): Complete the passage about the Earth spinning. Use: real→ (adverb form), amaze→ (adjective form), [to make], dark→ (noun form), rotate→ (noun form). First answer "children" is given as a model.',
    markScheme:'One mark per correctly formed word.' },

  { id:'g9eng-pp24-pdf-004', chapterId:'g9eng-reading', marks:5, year:2024, grade:9, subject:'English', type:'written',
    question:'Q5 Error Hunt (5 marks): Correct underlined errors in the passage about the Blue Penny stamp: (a) "this" → "these"; (b) "eror" → "error"; (c) "were" → "was"; (d) "hold" → "holds". The first correction (fruits → fruit) is shown.',
    markScheme:'One mark per correct correction.' },

  { id:'g9eng-pp24-pdf-005', chapterId:'g9eng-reading', marks:5, year:2024, grade:9, subject:'English', type:'written',
    question:'Q6 Cloze (5 marks): Complete the text about the benefits of exercising. Write one suitable word per blank (e.g. better/well, strengthens, hour/session, swimming/jogging, motivate/help). The first answer "floor" is shown.',
    markScheme:'One mark per contextually appropriate word.' },

  { id:'g9eng-pp24-pdf-006', chapterId:'g9eng-writing', marks:10, year:2024, grade:9, subject:'English', type:'written',
    question:'Q7 Functional Writing (10 marks): You are class captain. Write a short note to your friends to organise a class party (50–75 words). Include: when, start/end time, activities, what each person should bring, how teachers will help.',
    markScheme:'Content (all bullet points addressed), language accuracy, appropriate register.' },

  { id:'g9eng-pp24-pdf-007', chapterId:'g9eng-reading', marks:20, year:2024, grade:9, subject:'English', type:'written',
    question:'Q8 Extended Reading (20 marks): Maya and her brother Leo alone at home during a storm when a dog enters. Questions 1–15 cover retrieval, inference, character analysis, and vocabulary in context. Q15 includes MCQ vocabulary meanings: (i) unexpectedly = without warning; (ii) crept = moved slowly; (iii) subsided = went away.',
    markScheme:'1–2 marks per question. Q15 vocabulary: 1 mark each.' },

  { id:'g9eng-pp24-pdf-008', chapterId:'g9eng-writing', marks:15, year:2024, grade:9, subject:'English', type:'written',
    question:'Q9 Extended Writing (15 marks): Write an essay of 200–250 words on one of: (i) Describe the scene in your neighbourhood on the day of a major festival or cultural event; (ii) "Students should be encouraged to have a part-time job during their school holidays." Do you agree?; (iii) Story starting: "I was very happy that I had made this decision."',
    markScheme:'Marks for content and ideas, organisation and coherence, language accuracy, and vocabulary range.' },

  { id:'g9eng-pp24-pdf-009', chapterId:'g9eng-literature', marks:4, year:2024, grade:9, subject:'English', type:'written',
    question:'Q10A Poetry — <i>Hope</i> by Emily Dickinson. Written questions: (1b) give evidence for narrative voice; (3b) what is the effect of the metaphor?; (4a) explain "And sore must be the storm / That could abash the little bird…"; (4b) explain "Yet, never, in extremity, / It asked a crumb of me."; (5) what is this poem about? Support with close reference [3 marks].',
    markScheme:'Evidence from poem required. Explanation: 1 mark each. Supported response: up to 3 marks.' },

  { id:'g9eng-pp24-pdf-010', chapterId:'g9eng-literature', marks:4, year:2024, grade:9, subject:'English', type:'written',
    question:'Q10B Prose — <i>The Machine Stops</i> by E.M. Forster (1909). Written questions: (1b) give evidence for narrative voice; (2b) what is the effect of the simile?; (3) what do you understand by the lines given?; (4) based on the extract, what does Kuno want and why does Vashti resist? Support with close reference [3 marks].',
    markScheme:'Evidence from extract required. Explanation: 1 mark each. Supported response: up to 3 marks.' },

);
