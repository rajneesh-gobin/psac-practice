'use strict';
// NCE 2023 English (N500) — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  /* ── Q1 Grammar (items 1–9 MCQ) ── */

  makeMCQ({ id:'g9eng-pp23-001', chapterId:'g9eng-gr-adjectives', difficulty:1,
    question:'Jane is the _____ girl at school.',
    options:['taller','tallest','as tall','so tall'], answer:'tallest',
    hint:'Jane is compared against all the girls — use the superlative.',
    explanation:'When one item is compared against all others in a group, use the superlative. <b>Tallest</b> = the most tall.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-002', chapterId:'g9eng-gr-determiners', difficulty:1,
    question:'My sister had a smile on _____ face after winning the race.',
    options:['his','their','her','my'], answer:'her',
    hint:'"Sister" is feminine singular.',
    explanation:'The possessive determiner must agree with the noun it refers to. "Sister" → <b>her</b>.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-003', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:1,
    question:'We stayed _____ my uncle\'s place.',
    options:['in','by','for','at'], answer:'at',
    hint:'"Stay at someone\'s place" is a fixed English collocation.',
    explanation:'"Stay <b>at</b>" is the correct preposition for a location where you are based. "Stay in" is used for larger areas (a city, country).',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-004', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:1,
    question:'Yesterday, my cousins _____ to visit me.',
    options:['are coming','have come','come','came'], answer:'came',
    hint:'"Yesterday" signals which tense to use.',
    explanation:'"Yesterday" signals the past. Simple past → <b>came</b>.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-005', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:2,
    question:'The film will start _____ half an hour.',
    options:['in','on','at','by'], answer:'in',
    hint:'This preposition means "after a period of time has passed".',
    explanation:'"<b>In</b> half an hour" means after thirty minutes have elapsed. "At" is for a specific clock time.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-006', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:1,
    question:'Kevin and his brother make their bed _____.',
    options:['herself','himself','ourselves','themselves'], answer:'themselves',
    hint:'The subject is "Kevin and his brother" — plural, masculine.',
    explanation:'"Kevin and his brother" is plural → <b>themselves</b>. "Himself" is singular; "herself" is feminine; "ourselves" is first person.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-007', chapterId:'g9eng-gr-adverbs', subsection:'attitude_adverbs', difficulty:1,
    question:'_____ does this road go?',
    options:['How','Why','What','Where'], answer:'Where',
    hint:'This question asks about a destination or direction.',
    explanation:'"<b>Where</b> does this road go?" asks about destination. "How" asks manner; "Why" asks reason; "What" asks about a thing.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-008', chapterId:'g9eng-gr-sentence', subsection:'perfect_conditional', difficulty:2,
    question:'If I eat fruits and vegetables, I _____ healthy.',
    options:['was','were','will be','was being'], answer:'will be',
    hint:'This is a first conditional — a real possibility in the future.',
    explanation:'First conditional: If + present simple → <b>will</b> + infinitive. "If I eat… I <b>will be</b> healthy."',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-009', chapterId:'g9eng-gr-determiners', difficulty:1,
    question:'There is too _____ sugar in my tea.',
    options:['many','plenty','lots','much'], answer:'much',
    hint:'"Sugar" is an uncountable noun.',
    explanation:'"<b>Much</b>" is used with uncountable nouns like sugar, water, and time. "Many" is for countable nouns.',
    learnMore:'📄 NCE 2023 English exam.' }),

  /* ── Q2 Vocabulary (items 1–5 MCQ) ── */

  makeMCQ({ id:'g9eng-pp23-010', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'His bag is too _____. He cannot carry it alone.',
    options:['difficult','hot','heavy','expensive'], answer:'heavy',
    hint:'"Cannot carry it alone" points to weight.',
    explanation:'"<b>Heavy</b>" means having great weight. "Cannot carry it alone" is the context clue about weight, not difficulty or cost.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-011', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:1,
    question:"There's a wedding in my family. I need to buy some _____ clothes.",
    options:['torn','new','dirty','ugly'], answer:'new',
    hint:'What kind of clothes do you buy for a special occasion like a wedding?',
    explanation:'For a wedding you would wear <b>new</b> clothes. The other options describe undesirable clothing.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-012', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:1,
    question:'I am very _____. My father is ill.',
    options:['hungry','excited','worried','shy'], answer:'worried',
    hint:'How do you feel when someone close to you is sick?',
    explanation:'"My father is ill" causes anxiety. The correct word is <b>worried</b> — feeling anxious about a bad situation.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-013', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:2,
    question:'My phone is broken. I cannot _____ calls.',
    options:['run','eat','make','work'], answer:'make',
    hint:'"Make" is the verb that collocates with "calls".',
    explanation:'"<b>Make</b> a call" is a fixed English collocation. You cannot "do", "run", or "work" a call.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-014', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:2,
    question:'James has been _____ permission to go home early.',
    options:['given','sold','put','said'], answer:'given',
    hint:'This verb means to receive or be granted something.',
    explanation:'"Been <b>given</b> permission" = passive of "give". You cannot be "sold" or "said" permission.',
    learnMore:'📄 NCE 2023 English exam.' }),

  /* ── Q10 Option A — Poetry: A Poison Tree by William Blake ── */

  makeMCQ({ id:'g9eng-pp23-015', chapterId:'g9eng-literature', subsection:'rhyme', difficulty:1,
    question:'Which one of the following is a pair of <b>rhyming words</b> from the poem <i>A Poison Tree</i>?',
    options:['friend, foe','night, bright','sunned, smiles','apple, stole'], answer:'night, bright',
    hint:'Say each pair aloud — which pair ends with identical sounds?',
    explanation:'"And it grew both day and <b>night</b>, / Till it bore an apple <b>bright</b>." Night and bright share the "-ight" rhyme sound.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-016', chapterId:'g9eng-literature', subsection:'narrative_voice', difficulty:1,
    question:'Which <b>narrative voice</b> is the poet using in <i>A Poison Tree</i>?',
    options:['First-person','Second-person','Third-person','Fourth-person'], answer:'First-person',
    hint:'Look at the first line of the poem for the clue.',
    explanation:'"<b>I</b> was angry with my friend" — the poet speaks as "I". This is <b>first-person</b> narrative.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-017', chapterId:'g9eng-literature', subsection:'figurative_devices', difficulty:2,
    question:'Which one of the following lines from <i>A Poison Tree</i> is a <b>metaphor</b>?',
    options:['I was angry with my friend','And I watered it in fears','And he knew that it was mine','In the morning glad I see'], answer:'And I watered it in fears',
    hint:'A metaphor describes one thing as if it were another — look for hidden comparisons.',
    explanation:'"And I <b>watered</b> it in fears" — the anger is metaphorically a plant being nourished with tears/fears. No "like" or "as" is used.',
    learnMore:'📄 NCE 2023 English exam.' }),

  /* ── Q10 Option B — Prose: To Kill a Mockingbird by Harper Lee ── */

  makeMCQ({ id:'g9eng-pp23-018', chapterId:'g9eng-literature', subsection:'narrative_voice', difficulty:1,
    question:'Which <b>narrative voice</b> is the narrator using in the extract from <i>To Kill a Mockingbird</i>?',
    options:['First-person','Second-person','Third-person','Fourth-person'], answer:'First-person',
    hint:'Does the narrator use "I" or does the narrator describe everything from outside?',
    explanation:'"Early one morning as <b>we</b> were beginning our day\'s play… <b>I</b> said." The narrator participates and uses "I" — <b>first-person</b>.',
    learnMore:'📄 NCE 2023 English exam.' }),

  makeMCQ({ id:'g9eng-pp23-019', chapterId:'g9eng-literature', subsection:'figurative_devices', difficulty:2,
    question:'Which one of the following is a <b>metaphor</b> in the extract?',
    options:['We went to the wire fence to see if there was a puppy…','I just thought you\'d like to know I can read.','Jem brushed his hair back to get a better look.','Dill reduced Dracula to dust…'], answer:'Dill reduced Dracula to dust…',
    hint:'A metaphor replaces a literal description with a figurative one.',
    explanation:'"Dill <b>reduced Dracula to dust</b>" is a metaphor — it means Dill completely demolished the story of Dracula in his retelling, comparing it to reducing something to nothing.',
    learnMore:'📄 NCE 2023 English exam.' }),

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g9eng-pp23-pdf-001', chapterId:'g9eng-gr-sentence', marks:6, year:2023, grade:9, subject:'English', type:'written',
    question:'Q1 items 10–15: Grammar rewrites — (10) underline words needing capital letters in "mary has gone to england."; (11) add commas to "Tim bought three apples two oranges and one kiwi."; (12) rewrite in negative ("The match will be organised."); (13) link with "as soon as" ("His father comes home. He will prepare dinner."); (14) rewrite in past tense ("John walks to school."); (15) rewrite using direct speech from "The teacher asked us if we were hungry."',
    markScheme:'One mark per correct rewrite.' },

  { id:'g9eng-pp23-pdf-002', chapterId:'g9eng-reading', marks:10, year:2023, grade:9, subject:'English', type:'written',
    question:'Q3 Basic Reading (10 marks): Summerhill Secondary School Annual Food & Fun Day — poster comprehension. Answer 10 questions about the event details, instructions and requirements.',
    markScheme:'One mark per accurate answer. Accept answers paraphrased from the poster.' },

  { id:'g9eng-pp23-pdf-003', chapterId:'g9eng-word-formation', marks:5, year:2023, grade:9, subject:'English', type:'written',
    question:'Q4 Word Formation (5 marks): Complete the passage about Mauritian sega music. Use: perform→ (noun or verb form), popular→ (correct form), tradition→ (correct form), colour→ (correct form), bring→ (correct form).',
    markScheme:'One mark per correctly formed word.' },

  { id:'g9eng-pp23-pdf-004', chapterId:'g9eng-reading', marks:5, year:2023, grade:9, subject:'English', type:'written',
    question:'Q5 Error Hunt (5 marks): Correct underlined errors in the passage about artist Vaco Baissac: (a) "a island" → "an island"; (b) "she" → "he"; (c) "showed" → "shown" or "has shown"; (d) "on" → "in".',
    markScheme:'One mark per correct correction.' },

  { id:'g9eng-pp23-pdf-005', chapterId:'g9eng-reading', marks:5, year:2023, grade:9, subject:'English', type:'written',
    question:'Q6 Cloze (5 marks): Complete the text about babies sleeping outside in Nordic countries. Write one suitable word for each blank (e.g. "they", "sleep", "wear", "covered", "hear").',
    markScheme:'One mark per appropriate word. Accept contextually correct alternatives.' },

  { id:'g9eng-pp23-pdf-006', chapterId:'g9eng-writing', marks:10, year:2023, grade:9, subject:'English', type:'written',
    question:'Q7 Functional Writing (10 marks): You are moving to a new school. Write a goodbye card to your favourite teacher (50–75 words). Include: why you are moving, why this teacher is your favourite, your feelings, how your friends feel, a promise to write regularly.',
    markScheme:'Content (addresses all bullet points), language accuracy, appropriate informal-yet-respectful register.' },

  { id:'g9eng-pp23-pdf-007', chapterId:'g9eng-reading', marks:20, year:2023, grade:9, subject:'English', type:'written',
    question:'Q8 Extended Reading (20 marks): First-person narrative about a family visit to a fancy fair. Questions 1–14 cover retrieval, inference, word meaning ("glanced", "chubby", "speechless"), and character analysis.',
    markScheme:'1–2 marks per question. Inference requires evidence. Word meanings: 1 mark each.' },

  { id:'g9eng-pp23-pdf-008', chapterId:'g9eng-writing', marks:15, year:2023, grade:9, subject:'English', type:'written',
    question:'Q9 Extended Writing (15 marks): Write an essay of 200–250 words on one of: (i) Describe the scene in your house on the day of an important event; (ii) It is important for children to learn to do house chores. Do you agree?; (iii) Write a story starting: "I had never been so disappointed …."',
    markScheme:'Marks for content, organisation, language accuracy, and vocabulary range.' },

  { id:'g9eng-pp23-pdf-009', chapterId:'g9eng-literature', marks:4, year:2023, grade:9, subject:'English', type:'written',
    question:'Q10A Poetry — <i>A Poison Tree</i> by William Blake. Written questions: (2b) give evidence from the poem for your narrative voice answer; (3b) give another example of a metaphor from the poem; (4i) explain "I told it not, my wrath did grow"; (4ii) explain "My foe outstretched beneath the tree"; (5) what is this poem about? Support with close reference [3 marks].',
    markScheme:'Evidence must be quoted. Explanation: 1 mark. Supported "about" response: up to 3 marks.' },

  { id:'g9eng-pp23-pdf-010', chapterId:'g9eng-literature', marks:4, year:2023, grade:9, subject:'English', type:'written',
    question:'Q10B Prose — <i>To Kill a Mockingbird</i> by Harper Lee. Written questions: (1b) give evidence for narrative voice; (2b) give another metaphor from lines 20–25; (3i) explain "Scout has been reading ever since she was born"; (3ii) explain "and from the very first seemed to have kindled a new fire in the younger boy"; (3iii) explain "He wanted Nwoye to grow into a tough young man… when he was dead"; (4) what can you say about Jem based on the extract? [3 marks].',
    markScheme:'Evidence from text required. Explanation: 1 mark each. Supported inference: up to 3 marks.' },

);
