'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 English (NCE) - STARTER BANK.
//
//  ⚠ THIS IS A FLOOR, NOT A FULL BANK. The house standard is ~20 questions per
//    declared subsection (audit-content-coverage.js reports anything under 20
//    as a permanent gap). This file deliberately aims at the smallest bank that
//    makes the pack USABLE rather than complete:
//      · every declared subsection gets at least one question, so nothing on
//        the Practise screen opens blank;
//      · every chapter holds at least its examWeight, so assembleExamPaper()
//        can deal a whole 40-question paper.
//    More to be added later - that was the explicit plan when it was written.
//
//  ⚠ Four chapters declare NO subsections (listening, speaking, gr-determiners,
//    gr-modals). Their questions carry no `subsection` field on purpose: the
//    invariant is "declared ids == tagged ids", so tagging one that is not
//    declared would hide those questions from the Practise screen.
//
//  ⚠ L4 in ENGLISH is extended passage/essay analysis, not "harder recall" -
//    the maths meaning of level 4 does not apply in this pack.
//
//  ⚠ makeMCQ() shuffles its options. Authoring answer-first only makes an item
//    checkable at a glance; it positions nothing. What matters is keeping the
//    four options the same grammatical shape and a similar length, or the
//    answer can be picked by sight (test-option-parity.js measures this).
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ── Reading & Comprehension (w10) ───────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-001', chapterId:'g9eng-reading', subsection:'retrieval', difficulty:1,
    question:'Read the extract:<br><i>"The bus left Curepipe at six o\'clock. By the time it reached Port Louis, the market had already opened and the pavements were crowded."</i><br>At what time did the bus leave Curepipe?',
    options:['Six o\'clock','Seven o\'clock','Five o\'clock','Eight o\'clock'], answer:'Six o\'clock',
    hint:'The answer is stated directly in the first sentence.',
    explanation:'This is a <b>retrieval</b> question: the text says "left Curepipe at six o\'clock", so the answer is lifted straight from the passage without any working out.' }),

  makeMCQ({ id:'g9eng-sb-002', chapterId:'g9eng-reading', subsection:'inference', difficulty:2,
    question:'Read the extract:<br><i>"Rajiv checked his watch again, tapped his foot, and looked down the empty road for the fourth time."</i><br>What can you infer about Rajiv?',
    options:['He is impatient','He is delighted','He is exhausted','He is frightened'], answer:'He is impatient',
    hint:'The text never names the feeling. What do the three actions have in common?',
    explanation:'Checking a watch, tapping a foot and looking down the road repeatedly all suggest <b>impatience</b>. An inference is a conclusion the reader draws from evidence, not something the writer states.' }),

  makeMCQ({ id:'g9eng-sb-003', chapterId:'g9eng-reading', subsection:'authors_view', difficulty:3,
    question:'Read the extract:<br><i>"Yet another shopping centre has been approved, while the last stretch of woodland near the village quietly disappears."</i><br>What is the author\'s attitude?',
    options:['Critical of the development','Enthusiastic about the development','Neutral about the development','Amused by the development'],
    answer:'Critical of the development',
    hint:'Look at "Yet another" and "quietly disappears" - what feeling do those word choices carry?',
    explanation:'"Yet another" signals weariness and "quietly disappears" suggests something valuable is being lost unnoticed, so the author is <b>critical</b>. Identifying an author\'s view means reading the loaded words, not just the facts.' }),

  makeMCQ({ id:'g9eng-sb-004', chapterId:'g9eng-reading', subsection:'vocabulary', difficulty:2,
    question:'Read the extract:<br><i>"The old fisherman was renowned along the whole coast for his knowledge of the reef."</i><br>What does <b>renowned</b> mean here?',
    options:['Famous','Ancient','Curious','Cautious'], answer:'Famous',
    hint:'Read the whole sentence: he is known "along the whole coast" for something.',
    explanation:'<b>Renowned</b> means widely known and admired, so "famous" fits. Working out a word from the sentence around it is the skill being tested.' }),

  makeMCQ({ id:'g9eng-sb-005', chapterId:'g9eng-reading', subsection:'language', difficulty:3,
    question:'Read the extract:<br><i>"The waves hammered the rocks all night."</i><br>Why has the writer chosen the verb <b>hammered</b>?',
    options:['To suggest force and repetition','To suggest gentleness and calm','To suggest silence and stillness','To suggest warmth and comfort'],
    answer:'To suggest force and repetition',
    hint:'Picture what a hammer does, and how often.',
    explanation:'A hammer strikes hard and again and again, so <b>hammered</b> makes the sea sound violent and relentless. A question about "language" asks what a word choice does, not what it means.' }),

  makeMCQ({ id:'g9eng-sb-006', chapterId:'g9eng-reading', subsection:'evidence', difficulty:3,
    question:'A student writes: <i>"The narrator is nervous."</i> Which quotation best <b>supports</b> that statement?',
    options:['"My hands would not keep still"','"The room was painted pale blue"','"It was a Tuesday in April"','"She had lived there for years"'],
    answer:'"My hands would not keep still"',
    hint:'Which quotation shows a physical sign of the feeling being claimed?',
    explanation:'Hands that will not keep still are a physical sign of nerves, so that quotation is <b>evidence</b> for the claim. The others give setting or background and support nothing about the narrator\'s feelings.' }),

  makeMCQ({ id:'g9eng-sb-007', chapterId:'g9eng-reading', subsection:'across_texts', difficulty:4,
    question:'Text A calls the new bypass "a long-overdue relief for drivers". Text B calls it "a scar across good farmland". What is the main <b>difference</b> between the two texts?',
    options:['They judge the same road differently','They describe two different roads','They were written in different centuries','They are both written for children'],
    answer:'They judge the same road differently',
    hint:'Both texts are about one road. Compare the attitude, not the subject.',
    explanation:'Both describe the same bypass, but A frames it as a benefit and B as damage - the difference is one of <b>viewpoint</b>. Comparing across texts means comparing attitudes, not just content.' }),

  makeMCQ({ id:'g9eng-sb-008', chapterId:'g9eng-reading', subsection:'text_features', difficulty:2,
    question:'A magazine article uses <b>subheadings</b> throughout. What is their main purpose?',
    options:['To help the reader find information quickly','To make each section of the article longer','To show the writer’s personal opinion','To replace the conclusion of the article'],
    answer:'To help the reader find information quickly',
    hint:'Think about how you use them when you are looking for one particular fact.',
    explanation:'Subheadings break the text into labelled sections so a reader can <b>navigate</b> to what they need. They are a presentational feature, not an argument.' }),

  makeMCQ({ id:'g9eng-sb-009', chapterId:'g9eng-reading', subsection:'retrieval', difficulty:2,
    question:'Read the extract:<br><i>"Entry is free for children under twelve. Adults pay Rs 150, and students with a card pay Rs 80."</i><br>How much does a student with a card pay?',
    options:['Rs 80','Rs 150','Rs 120','Nothing'], answer:'Rs 80',
    hint:'Match the category in the question to the category in the text.',
    explanation:'The text states students with a card pay <b>Rs 80</b>. Retrieval questions are lost by reading the wrong row, not by misunderstanding the words.' }),

  makeMCQ({ id:'g9eng-sb-010', chapterId:'g9eng-reading', subsection:'inference', difficulty:3,
    question:'Read the extract:<br><i>"She put the letter back in its envelope without finishing it and pushed it to the far side of the table."</i><br>What does this suggest?',
    options:['She does not want to read it','She has already replied to it','She is pleased by the news','She wrote the letter herself'],
    answer:'She does not want to read it',
    hint:'She stops reading and moves it away. What does that pair of actions imply?',
    explanation:'Stopping partway and pushing it away suggests she is <b>avoiding</b> the letter. The writer shows the reaction rather than naming the feeling, which is what makes it an inference.' }),

  // ── Writing (w8) ────────────────────────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-011', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
    question:'What should you do <b>first</b> when planning a composition?',
    options:['Note down and order your main ideas','Write the opening sentence in full','Count the words you have written','Choose the title page decoration'],
    answer:'Note down and order your main ideas',
    hint:'Planning happens before any sentences are written.',
    explanation:'A plan is a list of the main ideas in the order they will appear, so the essay has a shape before the writing starts. Writing the first sentence is already drafting, not planning.' }),

  makeMCQ({ id:'g9eng-sb-012', chapterId:'g9eng-writing', subsection:'essay', difficulty:3,
    question:'In an argumentative essay, what should each <b>body paragraph</b> begin with?',
    options:['A topic sentence stating its main point','A quotation from a famous person','A question addressed to the reader','A summary of the whole essay'],
    answer:'A topic sentence stating its main point',
    hint:'The reader should know what the paragraph is about from its first line.',
    explanation:'A <b>topic sentence</b> announces the paragraph\'s single main point; the rest of the paragraph explains and supports it. Summarising the whole essay belongs in the conclusion.' }),

  makeMCQ({ id:'g9eng-sb-013', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:3,
    question:'Which sentence is the most effective <b>descriptive</b> writing?',
    options:['Salt air stung my lips as the wind flattened the grass','The beach was very nice and I liked it a lot','It was a beach with sand and also some water','We went to the beach and then we came home'],
    answer:'Salt air stung my lips as the wind flattened the grass',
    hint:'Which one makes you sense something rather than telling you an opinion?',
    explanation:'Good description appeals to the <b>senses</b> - taste, touch, sight - instead of stating that a place was nice. "Stung" and "flattened" let the reader feel the scene.' }),

  makeMCQ({ id:'g9eng-sb-014', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
    question:'A formal letter begins <i>Dear Sir or Madam</i>. How should it <b>end</b>?',
    options:['Yours faithfully','Yours sincerely','Best wishes','See you soon'], answer:'Yours faithfully',
    hint:'The ending depends on whether you named the person you are writing to.',
    explanation:'When the recipient is <b>not named</b> (Dear Sir or Madam) the letter ends "Yours faithfully". "Yours sincerely" goes with a named recipient such as "Dear Mrs Ramful".' }),

  makeMCQ({ id:'g9eng-sb-015', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
    question:'Which opening is most likely to make a reader want to continue a <b>narrative</b>?',
    options:['The gate was already open, and it should not have been','This story is about something that happened to me','I am going to tell you about my holiday last year','Hello, my name is Anil and I live in Vacoas'],
    answer:'The gate was already open, and it should not have been',
    hint:'Which one raises a question in the reader\'s mind?',
    explanation:'A strong narrative opening drops the reader into a situation and creates a <b>question</b> - why should it not have been open? Announcing that a story is coming delays the story itself.' }),

  makeMCQ({ id:'g9eng-sb-016', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
    question:'Choose the best linking word: <i>"The road was flooded. .......... , we took the long way round."</i>',
    options:['Therefore','However','Meanwhile','Similarly'], answer:'Therefore',
    hint:'Is the second sentence a result of the first, or a contrast with it?',
    explanation:'Taking the long way is the <b>result</b> of the flooding, so "Therefore" is the correct connective. "However" would signal a contrast that is not there.' }),

  makeMCQ({ id:'g9eng-sb-017', chapterId:'g9eng-writing', subsection:'register', difficulty:3,
    question:'Which sentence has the right <b>register</b> for a letter to a head teacher?',
    options:['I would be grateful if you could consider my request','Hey, can you sort this out for me please','I really really need you to do this thing','Just letting you know what I want done'],
    answer:'I would be grateful if you could consider my request',
    hint:'Register means how formal the language is, matched to the reader.',
    explanation:'A head teacher requires a <b>formal register</b>: full forms, polite phrasing, no slang. "Hey" and "sort this out" belong in a message to a friend.' }),

  makeMCQ({ id:'g9eng-sb-018', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
    question:'Which word is spelt <b>correctly</b>?',
    options:['Necessary','Neccessary','Necesary','Neccesary'], answer:'Necessary',
    hint:'One c, two s.',
    explanation:'<b>Necessary</b> has one c and a double s. A useful reminder: one Collar and two Sleeves.' }),

  makeMCQ({ id:'g9eng-sb-019', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
    question:'Which sentence is punctuated <b>correctly</b>?',
    options:['After the storm, we swept the yard.','After the storm we, swept the yard.','After, the storm we swept the yard.','After the storm we swept, the yard.'],
    answer:'After the storm, we swept the yard.',
    hint:'The comma marks the end of the introductory phrase.',
    explanation:'A comma follows an introductory phrase - "After the storm" - and separates it from the main clause. The other placements cut the sentence at points that carry no meaning.' }),

  // ── Vocabulary & Word Choice (w3) ───────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-020', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:2,
    question:'Which word usually goes with <b>make</b>? "to .......... a decision"',
    options:['make','do','take','give'], answer:'make',
    hint:'Some verbs and nouns simply pair together by habit in English.',
    explanation:'English says "<b>make</b> a decision", not "do a decision". Pairings like this are <b>collocations</b> - fixed by usage rather than by rule.' }),

  makeMCQ({ id:'g9eng-sb-021', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:3,
    question:'Which word best completes the sentence? <i>"The lawyer gave a .......... explanation of the contract."</i>',
    options:['detailed','detailing','detail','details'], answer:'detailed',
    hint:'The gap sits before a noun, so it needs a describing word.',
    explanation:'An adjective is needed before "explanation", and the adjective form is <b>detailed</b>. "Detail" and "details" are nouns; "detailing" is a verb form.' }),

  makeMCQ({ id:'g9eng-sb-022', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:3,
    question:'<i>"The manager will address the staff at noon."</i> What does <b>address</b> mean here?',
    options:['Speak to','Write to','Move to','Point to'], answer:'Speak to',
    hint:'The same word can be a house number, an envelope, or something a person does aloud.',
    explanation:'In this sentence <b>address</b> means to speak formally to a group. The context - a manager, staff, a set time - rules out the postal meaning.' }),

  // ── Word Formation (w2) ─────────────────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-023', chapterId:'g9eng-word-formation', subsection:'noun_formation', difficulty:2,
    question:'Form a <b>noun</b> from the verb <i>decide</i>: "It was a difficult .......... ."',
    options:['decision','decisive','decidedly','deciding'], answer:'decision',
    hint:'The gap follows "a difficult", so a naming word is needed.',
    explanation:'The noun formed from <i>decide</i> is <b>decision</b>. "Decisive" is an adjective and "decidedly" an adverb.' }),

  makeMCQ({ id:'g9eng-sb-024', chapterId:'g9eng-word-formation', subsection:'adjective_formation', difficulty:2,
    question:'Form an <b>adjective</b> from the noun <i>danger</i>: "The path was very .......... ."',
    options:['dangerous','dangerously','endanger','dangers'], answer:'dangerous',
    hint:'After "very" the word must describe the path.',
    explanation:'The adjective from <i>danger</i> is <b>dangerous</b>. "Dangerously" is the adverb and "endanger" the verb.' }),

  makeMCQ({ id:'g9eng-sb-025', chapterId:'g9eng-word-formation', subsection:'adverb_formation', difficulty:2,
    question:'Form an <b>adverb</b> from the adjective <i>careful</i>: "She drove .......... ."',
    options:['carefully','careful','carefulness','caring'], answer:'carefully',
    hint:'The word describes HOW she drove.',
    explanation:'Adding <b>-ly</b> to the adjective gives the adverb <b>carefully</b>, which modifies the verb "drove".' }),

  makeMCQ({ id:'g9eng-sb-026', chapterId:'g9eng-word-formation', subsection:'verb_formation', difficulty:3,
    question:'Form a <b>verb</b> from the noun <i>strength</i>: "Exercise will .......... your muscles."',
    options:['strengthen','strongly','stronger','strongest'], answer:'strengthen',
    hint:'After "will" the sentence needs an action word.',
    explanation:'The verb formed from <i>strength</i> is <b>strengthen</b>, using the suffix <b>-en</b>. The others are adverb and adjective forms.' }),

  makeMCQ({ id:'g9eng-sb-027', chapterId:'g9eng-word-formation', subsection:'root_and_affix', difficulty:3,
    question:'In the word <b>unbelievable</b>, what is the <b>root</b>?',
    options:['believe','un','able','unbelief'], answer:'believe',
    hint:'Take off the beginning and the ending and see what is left.',
    explanation:'Removing the prefix <i>un-</i> and the suffix <i>-able</i> leaves the root <b>believe</b>. The root carries the core meaning; affixes change or qualify it.' }),

  // ── Literary Appreciation (w3) ──────────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-028', chapterId:'g9eng-literature', subsection:'narrative_voice', difficulty:2,
    question:'A story begins: <i>"I had never seen the sea before that morning."</i> What <b>narrative voice</b> is used?',
    options:['First person','Third person','Second person','Omniscient'], answer:'First person',
    hint:'Look at the pronoun the narrator uses for themselves.',
    explanation:'The narrator says "I", so the story is told in the <b>first person</b>. Third person would use "he" or "she".' }),

  makeMCQ({ id:'g9eng-sb-029', chapterId:'g9eng-literature', subsection:'rhyme', difficulty:2,
    question:'A poem\'s lines end: <i>night / bright / sea / free</i>. What is the <b>rhyme scheme</b>?',
    options:['AABB','ABAB','ABBA','ABCD'], answer:'AABB',
    hint:'Give each new rhyme sound a new letter, and repeat the letter when the sound returns.',
    explanation:'"Night" and "bright" rhyme (A A), then "sea" and "free" rhyme (B B), giving <b>AABB</b> - rhyming couplets.' }),

  makeMCQ({ id:'g9eng-sb-030', chapterId:'g9eng-literature', subsection:'figurative_devices', difficulty:2,
    question:'Which device is used in <i>"The wind whispered through the cane"</i>?',
    options:['Personification','Simile','Hyperbole','Onomatopoeia'], answer:'Personification',
    hint:'Whispering is something only a person can really do.',
    explanation:'Giving a human action - whispering - to the wind is <b>personification</b>. A simile would need "like" or "as".' }),

  makeMCQ({ id:'g9eng-sb-031', chapterId:'g9eng-literature', subsection:'effect_of_device', difficulty:3,
    question:'A poet describes a city as <i>"a hive that never sleeps"</i>. What is the <b>effect</b> of this metaphor?',
    options:['It suggests constant, busy activity','It suggests emptiness and silence','It suggests danger and violence','It suggests age and decay'],
    answer:'It suggests constant, busy activity',
    hint:'Think about what a hive is like, and what "never sleeps" adds.',
    explanation:'A hive is crowded and endlessly busy, and "never sleeps" removes any pause - together they suggest <b>ceaseless activity</b>. Naming a device earns little; explaining its effect is what is marked.' }),

  makeMCQ({ id:'g9eng-sb-032', chapterId:'g9eng-literature', subsection:'line_explication', difficulty:4,
    question:'Explain the line: <i>"He carried his father\'s silence like a stone."</i> What does it most likely mean?',
    options:['He was burdened by what his father never said','He often carried stones for his father','He and his father worked with stone','He was physically stronger than his father'],
    answer:'He was burdened by what his father never said',
    hint:'A stone is heavy and hard to put down. What is being compared to it?',
    explanation:'The simile compares the father\'s <b>silence</b> to a stone, so the son carries something heavy that cannot easily be set down - an unspoken burden. A literal reading misses the comparison entirely.' }),

  makeMCQ({ id:'g9eng-sb-033', chapterId:'g9eng-literature', subsection:'supported_response', difficulty:4,
    question:'Which is the strongest <b>supported response</b> about a character?',
    options:['She is lonely: she “ate alone every evening”','She is lonely because the story is sad in places','She is lonely, as many people sometimes feel','She is lonely and that is the story’s main idea'],
    answer:'She is lonely: she “ate alone every evening”',
    hint:'A supported response makes a point AND quotes the text.',
    explanation:'The strongest answer states the point and backs it with <b>quotations</b> from the text. The others assert the same idea with nothing from the story to support it.' }),

  // ── Grammar chapters ────────────────────────────────────────────────────

  makeMCQ({ id:'g9eng-sb-034', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which sentence uses an <b>appositive</b> correctly?',
    options:['My uncle, a fisherman, mends his nets daily','My uncle a fisherman mends his nets daily','My uncle a, fisherman, mends his nets daily','My uncle, a fisherman mends his nets, daily'],
    answer:'My uncle, a fisherman, mends his nets daily',
    hint:'An appositive renames the noun beside it and is fenced off by a pair of commas.',
    explanation:'"a fisherman" renames "my uncle", so it is an <b>appositive</b> and needs a comma on each side. Remove it and the sentence still works.' }),

  makeMCQ({ id:'g9eng-sb-035', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:2,
    question:'Identify the <b>appositive</b>: <i>"Port Louis, the capital, lies on the north-west coast."</i>',
    options:['the capital','Port Louis','lies on','the north-west coast'], answer:'the capital',
    hint:'Which part renames the subject?',
    explanation:'"<b>the capital</b>" renames Port Louis and sits between commas. The rest of the sentence gives the location, not another name.' }),

  makeMCQ({ id:'g9eng-sb-036', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:2,
    question:'Complete with a <b>reflexive pronoun</b>: <i>"She taught .......... to play the guitar."</i>',
    options:['herself','her','hers','she'], answer:'herself',
    hint:'The subject and the object are the same person.',
    explanation:'When the action returns to the subject, a <b>reflexive pronoun</b> is used: <i>herself</i>. "Her" would refer to a different person.' }),

  makeMCQ({ id:'g9eng-sb-037', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:3,
    question:'Which sentence uses an <b>emphasising pronoun</b>?',
    options:['The Prime Minister himself opened the school','The Prime Minister hurt himself at the school','The Prime Minister spoke to himself quietly','The Prime Minister blamed himself for the delay'],
    answer:'The Prime Minister himself opened the school',
    hint:'In one of these the pronoun could be deleted and the sentence would still make sense.',
    explanation:'An <b>emphasising</b> pronoun stresses the noun and can be removed without breaking the sentence. In the other three, "himself" is the object and removing it leaves the sentence incomplete.' }),

  makeMCQ({ id:'g9eng-sb-038', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:2,
    question:'Choose the correct <b>relative pronoun</b>: <i>"The teacher .......... taught us French has retired."</i>',
    options:['who','which','whose','where'], answer:'who',
    hint:'The relative pronoun refers to a person and is the subject of the clause.',
    explanation:'<b>Who</b> is used for people acting as the subject of the relative clause. "Which" is for things and "whose" shows possession.' }),

  makeMCQ({ id:'g9eng-sb-039', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'In <i>"The government must protect the vulnerable"</i>, the word <b>vulnerable</b> is used as:',
    options:['a noun','an adverb','a verb','a preposition'], answer:'a noun',
    hint:'Ask what "the vulnerable" refers to. Is it a quality, or a group of people?',
    explanation:'"The + adjective" can name a whole group, so <b>the vulnerable</b> means vulnerable people and works as a <b>noun</b>. The same happens with "the poor" and "the elderly".' }),

  makeMCQ({ id:'g9eng-sb-040', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:2,
    question:'Which phrase uses an adjective as a <b>noun</b>?',
    options:['the young','a young man','younger sisters','very young'], answer:'the young',
    hint:'Which one stands alone as the thing being talked about?',
    explanation:'"<b>The young</b>" names a group of people, so the adjective is doing a noun\'s job. In the others, "young" still describes a separate noun.' }),

  makeMCQ({ id:'g9eng-sb-041', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:3,
    question:'Choose the <b>future perfect</b>: <i>"By next June, she .......... her studies."</i>',
    options:['will have finished','will finish','has finished','was finishing'], answer:'will have finished',
    hint:'The action is completed BEFORE a stated point in the future.',
    explanation:'The <b>future perfect</b> (will have + past participle) describes something finished before a future moment - here, before next June.' }),

  makeMCQ({ id:'g9eng-sb-042', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
    question:'Choose the <b>future perfect continuous</b>: <i>"By December, he .......... here for ten years."</i>',
    options:['will have been working','will have worked','will be working','has been working'],
    answer:'will have been working',
    hint:'The sentence stresses how LONG the action will have been going on.',
    explanation:'The <b>future perfect continuous</b> (will have been + -ing) emphasises the duration of an action continuing up to a future point. "Will have worked" would state completion, not duration.' }),

  makeMCQ({ id:'g9eng-sb-043', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:3,
    question:'Which sentence keeps its <b>tenses consistent</b>?',
    options:['She opened the door and walked inside','She opened the door and walks inside','She opens the door and walked inside','She will open the door and walked inside'],
    answer:'She opened the door and walked inside',
    hint:'Both actions happen at the same time, so both verbs should match.',
    explanation:'Both verbs are in the past - "opened" and "walked" - so the tenses are <b>consistent</b>. Mixing past and present in one sequence confuses the reader about when events occurred.' }),

  makeMCQ({ id:'g9eng-sb-044', chapterId:'g9eng-gr-determiners', difficulty:2,
    question:'Choose the correct <b>quantifier</b>: <i>"There is .......... water left in the tank."</i>',
    options:['little','few','many','several'], answer:'little',
    hint:'Is water something you count, or something you measure?',
    explanation:'Water is <b>uncountable</b>, so it takes "little". "Few", "many" and "several" are used with countable nouns such as bottles.' }),

  makeMCQ({ id:'g9eng-sb-045', chapterId:'g9eng-gr-determiners', difficulty:2,
    question:'Choose the correct <b>article</b>: <i>"She is .......... honest woman."</i>',
    options:['an','a','the','no'], answer:'an',
    hint:'Listen to the first SOUND of the next word, not its first letter.',
    explanation:'"Honest" begins with a silent h, so it starts with a vowel <b>sound</b> and takes <b>an</b>. The article follows sound, not spelling.' }),

  makeMCQ({ id:'g9eng-sb-046', chapterId:'g9eng-gr-adverbs', subsection:'attitude_adverbs', difficulty:3,
    question:'Which sentence contains an <b>attitude adverb</b>?',
    options:['Fortunately, the rain stopped before the match','She ran quickly towards the gate','They arrived early on Sunday morning','He spoke softly to the frightened child'],
    answer:'Fortunately, the rain stopped before the match',
    hint:'One adverb comments on the whole situation instead of describing an action.',
    explanation:'<b>Fortunately</b> expresses the speaker\'s attitude to the whole sentence rather than describing how something was done. "Quickly" and "softly" describe manner.' }),

  makeMCQ({ id:'g9eng-sb-047', chapterId:'g9eng-gr-adverbs', subsection:'attitude_adverbs', difficulty:3,
    question:'What does <b>Surprisingly</b> add in <i>"Surprisingly, he agreed at once"</i>?',
    options:['The speaker did not expect it','The agreement happened slowly','The agreement was unwilling','The speaker disagreed with him'],
    answer:'The speaker did not expect it',
    hint:'The adverb tells you about the speaker, not about the agreeing.',
    explanation:'An attitude adverb comments on the event, so <b>Surprisingly</b> tells us the speaker <b>did not expect</b> this. It says nothing about how the agreement was given.' }),

  makeMCQ({ id:'g9eng-sb-048', chapterId:'g9eng-gr-modals', difficulty:2,
    question:'Choose the correct <b>modal</b>: <i>"You .......... wear a helmet when riding a motorcycle - it is the law."</i>',
    options:['must','might','could','may'], answer:'must',
    hint:'The second half of the sentence tells you how strong the obligation is.',
    explanation:'"It is the law" signals a strong obligation, which is expressed by <b>must</b>. "Might", "could" and "may" all express possibility or permission instead.' }),

  makeMCQ({ id:'g9eng-sb-049', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'What does the modal express? <i>"She might come to the meeting."</i>',
    options:['Possibility','Obligation','Prohibition','Ability'], answer:'Possibility',
    hint:'Is she certain to come, required to come, or simply perhaps coming?',
    explanation:'<b>Might</b> expresses <b>possibility</b> - she may or may not come. "Must" would be obligation and "can" ability.' }),

  makeMCQ({ id:'g9eng-sb-050', chapterId:'g9eng-gr-prepositions', subsection:'prepositions', difficulty:2,
    question:'Choose the correct <b>preposition</b>: <i>"The meeting has been postponed .......... Friday."</i>',
    options:['until','since','during','between'], answer:'until',
    hint:'The delay runs forward to a point in time.',
    explanation:'<b>Until</b> marks the point in time up to which the delay lasts. "Since" looks backwards and "during" covers a period rather than an end point.' }),

  makeMCQ({ id:'g9eng-sb-051', chapterId:'g9eng-gr-prepositions', subsection:'phrasal_verbs', difficulty:3,
    question:'What does the <b>phrasal verb</b> mean? <i>"The match was called off because of rain."</i>',
    options:['Cancelled','Delayed','Restarted','Shortened'], answer:'Cancelled',
    hint:'The whole phrase has a meaning its separate words do not.',
    explanation:'"Call off" means to <b>cancel</b>. A phrasal verb\'s meaning cannot be worked out from "call" plus "off" separately, which is what makes it worth learning as one item.' }),

  makeMCQ({ id:'g9eng-sb-052', chapterId:'g9eng-gr-sentence', subsection:'voice', difficulty:3,
    question:'Rewrite in the <b>passive voice</b>: <i>"The council repaired the road."</i>',
    options:['The road was repaired by the council','The road repaired the council','The council was repaired by the road','The council has repairing the road'],
    answer:'The road was repaired by the council',
    hint:'The thing acted upon becomes the subject.',
    explanation:'In the passive the object - the road - becomes the subject, the verb becomes <b>was repaired</b>, and the doer follows "by". Swapping the nouns without changing the verb reverses the meaning instead.' }),

  makeMCQ({ id:'g9eng-sb-053', chapterId:'g9eng-gr-sentence', subsection:'perfect_conditional', difficulty:4,
    question:'Complete the <b>third conditional</b>: <i>"If she had studied harder, she .......... the exam."</i>',
    options:['would have passed','would pass','will pass','had passed'], answer:'would have passed',
    hint:'The situation is in the past and did not happen.',
    explanation:'The third conditional describes an unreal past: <i>if + had + past participle</i>, then <b>would have + past participle</b>. It is used for outcomes that never occurred.' }),

  makeMCQ({ id:'g9eng-sb-054', chapterId:'g9eng-gr-sentence', subsection:'direct_speech', difficulty:3,
    question:'Change to <b>reported speech</b>: <i>He said, "I am tired."</i>',
    options:['He said that he was tired','He said that I am tired','He said that he is tired','He said that he were tired'],
    answer:'He said that he was tired',
    hint:'The pronoun and the tense both shift back.',
    explanation:'In reported speech the pronoun changes from "I" to <b>he</b> and the present "am" shifts back to <b>was</b>. Both changes are needed.' }),

  makeMCQ({ id:'g9eng-sb-055', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:3,
    question:'Which sentence uses commas correctly around a <b>non-defining clause</b>?',
    options:['My brother, who lives in Rodrigues, is a teacher','My brother who lives in Rodrigues, is a teacher','My brother, who lives in Rodrigues is a teacher','My brother who, lives in Rodrigues, is a teacher'],
    answer:'My brother, who lives in Rodrigues, is a teacher',
    hint:'A non-defining clause adds extra information and needs a comma at BOTH ends.',
    explanation:'The clause adds information that could be removed, so it is fenced by a comma on each side. Using only one comma leaves the sentence unbalanced.' }),

  makeMCQ({ id:'g9eng-sb-056', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:2,
    question:'Which sentence uses <b>quotation marks</b> correctly?',
    options:['"Wait for me," she called from the gate.','"Wait for me" she called from the gate.','Wait for me, "she called from the gate."','"Wait for me,", she called from the gate.'],
    answer:'"Wait for me," she called from the gate.',
    hint:'The comma belongs inside the closing quotation mark.',
    explanation:'The spoken words sit inside the marks and the comma goes <b>inside</b> the closing mark, before the reporting clause.' }),

  makeMCQ({ id:'g9eng-sb-057', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:3,
    question:'What is the effect of the <b>dash</b> in <i>"He opened the box - it was empty."</i>?',
    options:['It creates a pause before a surprise','It joins two unrelated lists','It shows that words are missing','It marks the end of a quotation'],
    answer:'It creates a pause before a surprise',
    hint:'Read it aloud and notice where you stop.',
    explanation:'A dash creates a dramatic <b>pause</b> that sets up what follows. It is more abrupt than a comma, which is why writers use it for surprise.' }),

  makeMCQ({ id:'g9eng-sb-058', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
    question:'Which sentence uses a <b>semicolon</b> correctly?',
    options:['The rain stopped; the match resumed at once','The rain stopped; and the match resumed','The rain stopped; because the match resumed','The rain stopped; a wet afternoon in April'],
    answer:'The rain stopped; the match resumed at once',
    hint:'A semicolon joins two statements that could each stand alone as a sentence.',
    explanation:'Both halves are complete sentences closely related in meaning, which is exactly what a <b>semicolon</b> joins. It is not used before a conjunction, and not before a fragment.' }),

  // ── Listening and Speaking (examWeight 0, no declared subsections) ───────

  makeMCQ({ id:'g9eng-sb-059', chapterId:'g9eng-listening', difficulty:2,
    question:'While listening to a talk, what is the most useful thing to <b>note down</b>?',
    options:['Key words and main points','Every word the speaker says','Only the speaker\'s name','The length of the talk'],
    answer:'Key words and main points',
    hint:'You cannot write as fast as someone speaks.',
    explanation:'Effective listening notes capture <b>key words and main points</b>, because writing every word means missing what comes next.' }),

  makeMCQ({ id:'g9eng-sb-060', chapterId:'g9eng-listening', difficulty:3,
    question:'A speaker says: <i>"Well, the results were... interesting."</i> The pause and the tone most likely suggest:',
    options:['The results were disappointing','The results were excellent','The results were expected','The results were unavailable'],
    answer:'The results were disappointing',
    hint:'Why would a speaker hesitate before choosing that particular word?',
    explanation:'The hesitation and the guarded word choice suggest the speaker is avoiding saying something negative outright, so the results were <b>disappointing</b>. Tone often carries meaning the words avoid.' }),

  makeMCQ({ id:'g9eng-sb-061', chapterId:'g9eng-speaking', difficulty:2,
    question:'In a group discussion, what is the best way to <b>disagree</b> politely?',
    options:['I see your point, but have you considered','You are completely wrong about that','That is a silly thing to say','Nobody could possibly agree with you'],
    answer:'I see your point, but have you considered',
    hint:'Acknowledge the other speaker before offering your own view.',
    explanation:'Polite disagreement <b>acknowledges</b> the other view before offering an alternative, which keeps a discussion going. Flat contradiction closes it down.' }),

  makeMCQ({ id:'g9eng-sb-062', chapterId:'g9eng-speaking', difficulty:2,
    question:'When giving a short talk, why should you make <b>eye contact</b> with the audience?',
    options:['It keeps the audience engaged','It makes the talk shorter','It hides your nervousness entirely','It replaces the need to prepare'],
    answer:'It keeps the audience engaged',
    hint:'Think about how it feels to be spoken to rather than spoken at.',
    explanation:'Eye contact keeps listeners <b>engaged</b> and lets the speaker see whether they are being followed. It supports preparation rather than replacing it.' })
);
