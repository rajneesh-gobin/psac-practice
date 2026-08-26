'use strict';
// PSAC Grade 6 English March 2021 — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (MES PSAC March 2021, Subject code P110).

STATIC_QUESTIONS.push(

  // --- Question 2: Grammar MCQs (10 marks) ---

  makeMCQ({ id:'g6eng-pp21-001', chapterId:'g6eng-verbs', subsection:'cloze', difficulty:1,
    question:'Last week, my uncle __________ me a new bag.',
    options:['gave','given','gives','give'], answer:'gave',
    hint:'"Last week" signals the tense you need.',
    explanation:'"Gave" is the simple past form of "give". "Given" is the past participle (needs "has/had").' }),

  makeMCQ({ id:'g6eng-pp21-002', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'Please switch __________ the lights. It\'s getting dark.',
    options:['up','at','on','to'], answer:'on',
    hint:'Which phrasal verb means to turn the lights on?',
    explanation:'"Switch on" means to start a device by operating a switch. "Switch up" is not standard.' }),

  makeMCQ({ id:'g6eng-pp21-003', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:1,
    question:'The gardener hurt __________ while cleaning the yard.',
    options:['itself','myself','yourself','himself'], answer:'himself',
    hint:'"The gardener" is male and singular. Match the reflexive pronoun.',
    explanation:'"Himself" is the reflexive pronoun for a male singular subject (he/the gardener).' }),

  makeMCQ({ id:'g6eng-pp21-004', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:1,
    question:'How __________ time will you take to reach Port Louis?',
    options:['some','much','many','lot'], answer:'much',
    hint:'"Time" is uncountable. Which quantifier is used with uncountable nouns in questions?',
    explanation:'"How much" is used with uncountable nouns. "How many" is used with countable nouns.' }),

  makeMCQ({ id:'g6eng-pp21-005', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'My friends and I eat snacks __________ recess.',
    options:['while','during','between','then'], answer:'during',
    hint:'Which preposition means "in the course of" a period of time?',
    explanation:'"During" is a preposition used before a noun: "during recess". "While" needs a subject + verb.' }),

  makeMCQ({ id:'g6eng-pp21-006', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:1,
    question:'The __________ boy in the school won the race.',
    options:['as fast','so fast','fastest','faster'], answer:'fastest',
    hint:'You are describing one person compared to everyone. Which adjective form do you need?',
    explanation:'Superlative form ("fastest") is used when comparing one thing against all others in a group.' }),

  makeMCQ({ id:'g6eng-pp21-007', chapterId:'g6eng-verbs', subsection:'cloze', difficulty:2,
    question:'When Sara reached home, her father __________ the vegetables.',
    options:['will cut','was cutting','has cut','is cutting'], answer:'was cutting',
    hint:'The main clause is in simple past ("reached"). The father\'s action was in progress at that moment.',
    explanation:'Past continuous "was cutting" shows an action in progress at a specific past moment.' }),

  makeMCQ({ id:'g6eng-pp21-008', chapterId:'g6eng-clauses', subsection:'cloze', difficulty:2,
    question:'The car __________ was here belongs to Sheena.',
    options:['who','which','where','whom'], answer:'which',
    hint:'The relative pronoun refers to "the car" — a thing, not a person.',
    explanation:'"Which" introduces a relative clause about a thing. "Who/whom" refer to people.' }),

  makeMCQ({ id:'g6eng-pp21-009', chapterId:'g6eng-verbs', subsection:'cloze', difficulty:1,
    question:'Did you __________ your book?',
    options:['enjoys','enjoyed','enjoying','enjoy'], answer:'enjoy',
    hint:'After the auxiliary "did", what form of the main verb is needed?',
    explanation:'After "did", always use the base form of the verb — "enjoy", not "enjoyed".' }),

  makeMCQ({ id:'g6eng-pp21-010', chapterId:'g6eng-clauses', subsection:'cloze', difficulty:2,
    question:'__________ the rain, they played football.',
    options:['Despite','Although','However','As'], answer:'Despite',
    hint:'The blank is followed by a noun ("the rain"), not a subject + verb.',
    explanation:'"Despite + noun/gerund" shows contrast. "Although" needs a full clause: "Although it rained...".' }),

  // --- Question 3B: Vocabulary MCQs (5 marks) ---

  makeMCQ({ id:'g6eng-pp21-011', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'Mike\'s teeth are hurting. He needs to go to a __________.',
    options:['fireman','florist','mechanic','dentist'], answer:'dentist',
    hint:'Which professional deals with teeth?',
    explanation:'A dentist is a doctor who treats teeth. A florist sells flowers; a mechanic repairs machines.' }),

  makeMCQ({ id:'g6eng-pp21-012', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'I __________ my purse at home. I don\'t have any money on me.',
    options:['broke','forgot','gave','bought'], answer:'forgot',
    hint:'If the purse is still at home, what happened before leaving?',
    explanation:'"Forgot" means failed to take it along. "Broke" means damaged it; "gave" means transferred it.' }),

  makeMCQ({ id:'g6eng-pp21-013', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'My aunt always helps other people. She is very __________.',
    options:['shy','quiet','kind','tall'], answer:'kind',
    hint:'What quality describes someone who always helps others?',
    explanation:'"Kind" means caring and generous to others — the word fits perfectly with "always helps people".' }),

  makeMCQ({ id:'g6eng-pp21-014', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'The thief ran very __________. Nobody could catch him.',
    options:['quickly','softly','politely','lazily'], answer:'quickly',
    hint:'Which adverb explains why nobody could catch him?',
    explanation:'"Quickly" means at high speed — that is why nobody caught the thief.' }),

  makeMCQ({ id:'g6eng-pp21-015', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'The stadium was so __________ that the players could not hear their coach.',
    options:['peaceful','dark','beautiful','noisy'], answer:'noisy',
    hint:'What quality of a stadium would prevent players from hearing?',
    explanation:'"Noisy" means full of noise. A very noisy crowd would drown out the coach\'s voice.' }),

  // --- Question 4B: Comprehension MCQs — "The Selfish Giant" (adapted, Oscar Wilde) ---

  makeMCQ({ id:'g6eng-pp21-016', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In "The Selfish Giant" (adapted, Oscar Wilde): The giant went to visit his friend because __________.',
    options:['it had snowed heavily in winter','the children were too noisy','he did not want to be alone','there were too many birds in his garden'], answer:'he did not want to be alone',
    hint:'What feeling drove the giant to leave his castle?',
    explanation:'"He often felt lonely… he got tired of being alone" — loneliness made him visit his friend.' }),

  makeMCQ({ id:'g6eng-pp21-017', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In "The Selfish Giant": "While the giant was away, <b>something unusual</b> happened." This refers to __________.',
    options:['children entering the giant\'s garden','birds not chirping happily','the giant visiting his friend in the city','children making noise on the streets'], answer:'children entering the giant\'s garden',
    hint:'What unexpected event happened at the castle during the giant\'s absence?',
    explanation:'"Some children… noticed that the gate to the giant\'s castle was open. Curious, they went inside." — children entered his garden.' }),

  makeMCQ({ id:'g6eng-pp21-018', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In "The Selfish Giant": "The children were so <b>terrified</b> on seeing the huge man shouting at them that they ran away." This means the children were very __________.',
    options:['sad','angry','scared','worried'], answer:'scared',
    hint:'"Terrified" is a strong synonym. Which option is closest in meaning?',
    explanation:'"Terrified" means extremely frightened — "scared" is the correct synonym.' }),

  makeMCQ({ id:'g6eng-pp21-019', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In "The Selfish Giant": The giant built a wall around his garden because __________.',
    options:['the streets were dusty','he had to go to his friend\'s place','it was summer in the village','he did not want children to enter it'], answer:'he did not want children to enter it',
    hint:'What did the giant say right before deciding to build the wall?',
    explanation:'"This garden belongs to me only. I cannot let anybody play in it," the giant grumbled — he wanted to keep children out.' }),

  makeMCQ({ id:'g6eng-pp21-020', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In "The Selfish Giant": During winter, the children felt miserable because __________.',
    options:['flowers did not blossom','they had to stay at home','their friend lived far away','they got hurt while playing'], answer:'they had to stay at home',
    hint:'In the passage, what does "That winter, it snowed heavily. The children stayed indoors" tell you?',
    explanation:'"The children stayed indoors and they felt miserable" — being confined at home in winter made them miserable.' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6eng-pp21-pdf-001', chapterId:'g6eng-writing', marks:5, year:2021, grade:6, subject:'English',
    question:'Question 1 (Matching): Match each sentence on the left with the corresponding sentence on the right. (6 sentences, 1 extra)', type:'matching' },
  { id:'g6eng-pp21-pdf-002', chapterId:'g6eng-vocabulary', marks:5, year:2021, grade:6, subject:'English',
    question:'Question 3A: Find a word from description and first letter. (i) M______ place where vegetables/fruits sold (ii) B__ you throw waste in (iii) L_____ meal you eat at mid-day (iv) L________ place to borrow books (v) T______ someone who makes clothes', type:'word-definition' },
  { id:'g6eng-pp21-pdf-003', chapterId:'g6eng-comprehension', marks:10, year:2021, grade:6, subject:'English',
    question:'Question 4A (Reading: Jaguars): Short-answer items — species, continents, weight, lifespan, speed, diet, similarity/difference with leopards.', type:'short-answer' },
  { id:'g6eng-pp21-pdf-004', chapterId:'g6eng-comprehension', marks:3, year:2021, grade:6, subject:'English',
    question:'Question 4B True/False (The Selfish Giant): (i) The giant\'s castle was in the city. (ii) The giant lived alone in his castle. (iii) The children liked playing in the streets.', type:'true-false' }
);
