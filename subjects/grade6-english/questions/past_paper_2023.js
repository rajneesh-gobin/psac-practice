'use strict';
// PSAC Grade 6 English 2023 — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (MES PSAC 2023, Subject code P110).

STATIC_QUESTIONS.push(

  // --- Question 2: Grammar MCQs (10 marks) ---

  makeMCQ({ id:'g6eng-pp23-001', chapterId:'g6eng-verbs', subsection:'cloze', difficulty:1,
    question:'Last week, the students __________ their class.',
    options:['miss','will miss','missed','are missing'], answer:'missed',
    hint:'The time clue "last week" tells you the tense.',
    explanation:'"Last week" requires simple past tense — "missed".' }),

  makeMCQ({ id:'g6eng-pp23-002', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'My house is found __________ Port Louis.',
    options:['from','in','with','by'], answer:'in',
    hint:'Which preposition shows location inside a city?',
    explanation:'"In" is the correct preposition for location within a place.' }),

  makeMCQ({ id:'g6eng-pp23-003', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:1,
    question:'Jay and Aaron are always together. __________ are best friends.',
    options:['You','He','We','They'], answer:'They',
    hint:'The subject refers to two people (Jay and Aaron).',
    explanation:'"They" replaces a plural noun phrase — Jay and Aaron are two people.' }),

  makeMCQ({ id:'g6eng-pp23-004', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:1,
    question:'Were there __________ people at the show?',
    options:['a little','least','many','much'], answer:'many',
    hint:'"People" is a countable plural noun.',
    explanation:'"Many" is used with countable nouns. "Much" is for uncountable nouns.' }),

  makeMCQ({ id:'g6eng-pp23-005', chapterId:'g6eng-clauses', subsection:'cloze', difficulty:2,
    question:'The song __________ we sang at the party was wonderful.',
    options:['which','whom','who','whose'], answer:'which',
    hint:'The relative pronoun refers to a thing (the song).',
    explanation:'"Which" introduces a relative clause about a thing; "who" is for people.' }),

  makeMCQ({ id:'g6eng-pp23-006', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:2,
    question:'Our cat is white but __________ is grey.',
    options:['you','your','yours','yourself'], answer:'yours',
    hint:'You need a possessive pronoun that stands alone (no noun after it).',
    explanation:'"Yours" is a possessive pronoun — it replaces "your cat" without repeating "cat".' }),

  makeMCQ({ id:'g6eng-pp23-007', chapterId:'g6eng-nouns', subsection:'cloze', difficulty:2,
    question:'Don\'t do __________ which will make you sad.',
    options:['nothing','anything','everything','none'], answer:'anything',
    hint:'After a negative verb (Don\'t), use this indefinite pronoun.',
    explanation:'In negative sentences, we use "anything" (not "nothing", which creates a double negative).' }),

  makeMCQ({ id:'g6eng-pp23-008', chapterId:'g6eng-clauses', subsection:'cloze', difficulty:2,
    question:'If I wake up early, I __________ breakfast at home.',
    options:['will have','had','have had','having'], answer:'will have',
    hint:'This is a Type 1 conditional — if + present, then ___.',
    explanation:'First conditional: "If + present simple, will + base verb" — "will have".' }),

  makeMCQ({ id:'g6eng-pp23-009', chapterId:'g6eng-verbs', subsection:'cloze', difficulty:2,
    question:'You have watched this film, __________?',
    options:['haven\'t you','didn\'t you','aren\'t you','weren\'t you'], answer:'haven\'t you',
    hint:'The main clause uses "have watched" (present perfect). The tag must match.',
    explanation:'Present perfect auxiliary "have" → negative tag is "haven\'t you".' }),

  makeMCQ({ id:'g6eng-pp23-010', chapterId:'g6eng-clauses', subsection:'cloze', difficulty:2,
    question:'__________ he tried his best, he could not complete the race.',
    options:['Yet','Unless','Despite','Although'], answer:'Although',
    hint:'You need a conjunction that shows contrast and is followed by a subject + verb.',
    explanation:'"Although + subject + verb" shows contrast. "Despite" is followed by a noun/gerund.' }),

  // --- Question 3B: Vocabulary MCQs (5 marks) ---

  makeMCQ({ id:'g6eng-pp23-011', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'David lives near a __________ which produces electric bulbs.',
    options:['school','factory','garage','hospital'], answer:'factory',
    hint:'Which place is known for manufacturing / making products?',
    explanation:'A factory is a place where goods (like electric bulbs) are produced in large quantities.' }),

  makeMCQ({ id:'g6eng-pp23-012', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'We need to call the __________ to repair the broken chair.',
    options:['policeman','lawyer','carpenter','fireman'], answer:'carpenter',
    hint:'Which worker specialises in fixing wooden furniture?',
    explanation:'A carpenter works with wood — fixing chairs, tables and other wooden items.' }),

  makeMCQ({ id:'g6eng-pp23-013', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'Wow! Your drawings are very __________. Everybody loves them.',
    options:['beautiful','dirty','poor','small'], answer:'beautiful',
    hint:'If everybody loves them, what kind of drawings are they?',
    explanation:'"Beautiful" fits — people love things that are attractive. "Poor" would be the opposite.' }),

  makeMCQ({ id:'g6eng-pp23-014', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'I forgot my purse at home. I could not __________ the bus fare.',
    options:['pay','ask','sell','tell'], answer:'pay',
    hint:'What do you do with a bus fare when you have money?',
    explanation:'You "pay" a fare. Without money, you cannot pay.' }),

  makeMCQ({ id:'g6eng-pp23-015', chapterId:'g6eng-vocabulary', subsection:'cloze', difficulty:1,
    question:'Tia\'s mother always tells her not to __________ time.',
    options:['finish','throw','destroy','waste'], answer:'waste',
    hint:'Which verb collocates with "time" to mean using it carelessly?',
    explanation:'"Waste time" is a fixed collocation meaning to use time carelessly or without purpose.' }),

  // --- Question 4B: Comprehension MCQs — story "Ancy and the Magic Fruit" ---

  makeMCQ({ id:'g6eng-pp23-016', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In the story "Ancy and the Magic Fruit": The King needed the magic fruit that __________.',
    options:['was easily available','was eaten by the parrots','would cure his son','would be found by Ancy\'s brothers'], answer:'would cure his son',
    hint:'Why was the magic fruit so important to the King?',
    explanation:'The text says "Only the juice of a magic fruit could cure his illness" — the King needed it to cure his sick son.' }),

  makeMCQ({ id:'g6eng-pp23-017', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In the story "Ancy and the Magic Fruit": If anyone brought the magic fruit, the King would __________ that person.',
    options:['give a reward to','shout at','imprison','be friends with'], answer:'give a reward to',
    hint:'What did the King announce to everyone in the kingdom?',
    explanation:'"Whoever brings this magic fruit will be rewarded," announced the King — a reward is a gift or prize.' }),

  makeMCQ({ id:'g6eng-pp23-018', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In the story "Ancy and the Magic Fruit": The brothers insisted on going to the forest because they wanted to __________.',
    options:['earn some money','see the parrots','rest under a tree','share their food'], answer:'earn some money',
    hint:'The family was poor. What did the brothers hope the King\'s reward would bring them?',
    explanation:'"The King\'s reward would help the family to earn some money" — earning money was their reason.' }),

  makeMCQ({ id:'g6eng-pp23-019', chapterId:'g6eng-comprehension', subsection:'language', difficulty:2,
    question:'In the story "Ancy and the Magic Fruit": "They were <b>exhausted</b>." This means that Ancy\'s brothers were very __________.',
    options:['angry','scared','hungry','tired'], answer:'tired',
    hint:'"Exhausted" is a synonym for extreme tiredness after effort.',
    explanation:'"Exhausted" means extremely tired — they had "travelled for months" trying to find the fruit.' }),

  makeMCQ({ id:'g6eng-pp23-020', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'In the story "Ancy and the Magic Fruit": Ancy fed the parrots because __________.',
    options:['she needed their help','they were hungry','she was sitting under the tree','they enjoyed eating nuts'], answer:'they were hungry',
    hint:'Read the moment before she feeds them — what does the text say about the parrots?',
    explanation:'"The parrots were very hungry and could not find anything to eat" — that is why Ancy shared her food.' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6eng-pp23-pdf-001', chapterId:'g6eng-writing', marks:5, year:2023, grade:6, subject:'English',
    question:'Question 1 (Matching): Match each sentence on the left with the corresponding sentence on the right. (6 sentences, 1 extra on right)', type:'matching' },
  { id:'g6eng-pp23-pdf-002', chapterId:'g6eng-vocabulary', marks:5, year:2023, grade:6, subject:'English',
    question:'Question 3A: Read the descriptions and find a word to match each (first letter given). (i) Dogs make this sound B___  (ii) This person grows vegetables F_____  (iii) You use it to sweep the floor B____  (iv) You use this appliance to bake cakes O___  (v) You put your head on this when you sleep P_____', type:'word-definition' },
  { id:'g6eng-pp23-pdf-003', chapterId:'g6eng-comprehension', marks:10, year:2023, grade:6, subject:'English',
    question:'Question 4A (Reading: Dolphins): Complete 9 short-answer items about the Dolphins passage — characteristics, lifespan, diet, hunting tricks.', type:'short-answer' },
  { id:'g6eng-pp23-pdf-004', chapterId:'g6eng-comprehension', marks:3, year:2023, grade:6, subject:'English',
    question:'Question 4B True/False: (i) Ancy had two brothers. (ii) The King\'s son was not well. (iii) The King was happy with Ancy\'s brothers.', type:'true-false' },
  { id:'g6eng-pp23-pdf-005', chapterId:'g6eng-writing', marks:2, year:2023, grade:6, subject:'English',
    question:'Question 4B Q7-8 (Open-ended): Why did Ancy decide to look for the magic fruit? / At the end, why did Ancy\'s family not lack anything?', type:'short-answer' }
);
