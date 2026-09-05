'use strict';
// Grade 5 English - Chapter: Sentences & Punctuation
// IDs format: g5eng-sent-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-sent-001', chapterId:'eng-sentences', subsection:'punctuation', difficulty:1,
    question:'Which of the following is a COMPLETE sentence?',
    options:[
      'Running through the park.',
      'The big, friendly dog.',
      'The children laughed loudly.',
      'Because it was raining.'
    ],
    answer:'The children laughed loudly.',
    hint:'A complete sentence must have both a SUBJECT (who/what) and a VERB (action/state).',
    explanation:'"<b>The children laughed loudly</b>" is a complete sentence - it has a subject (The children) and a verb (laughed). The other options are fragments: they are missing either a subject, a verb, or both.' }),

  makeMCQ({ id:'g5eng-sent-002', chapterId:'eng-sentences', subsection:'punctuation', difficulty:1,
    question:'What punctuation mark ends an EXCLAMATORY sentence?',
    options:['Full stop (.)','Question mark (?)','Exclamation mark (!)','Comma (,)'],
    answer:'Exclamation mark (!)',
    hint:'Exclamatory sentences express strong feelings or surprise.',
    explanation:'An <b>exclamation mark (!)</b> ends an exclamatory sentence - one that expresses strong emotion, excitement or surprise. Example: "What a wonderful day!" Statements end with a full stop; questions end with a question mark.' }),

  makeMCQ({ id:'g5eng-sent-003', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'Which sentence uses an APOSTROPHE correctly?',
    options:[
      "The dog\'s are barking.",
      "Tom\'s bicycle is new.",
      "The girl\'s are playing.",
      "Its' a beautiful day."
    ],
    answer:"Tom\'s bicycle is new.",
    hint:"Apostrophe + s ('s) shows possession. It is NOT used to make plurals.",
    explanation:'"<b>Tom\'s bicycle is new</b>" - the apostrophe shows possession (the bicycle belongs to Tom). We do NOT use apostrophes to make plurals (dogs not dog\'s). "Its\'" is never correct; "it\'s" = it is, while "its" = belonging to it.' }),

  makeMCQ({ id:'g5eng-sent-004', chapterId:'eng-sentences', subsection:'types', difficulty:1,
    question:'Which sentence is a QUESTION?',
    options:[
      'Close the window please.',
      'What a beautiful sunset!',
      'Have you finished your homework?',
      'The sun sets in the west.'
    ],
    answer:'Have you finished your homework?',
    hint:'A question asks for information and ends with a question mark.',
    explanation:'"<b>Have you finished your homework?</b>" is a question - it asks for information and ends with a question mark (?). "Close the window" is a command. "What a beautiful sunset!" is exclamatory. The last option is a statement.' }),

  makeTF({ id:'g5eng-sent-005', chapterId:'eng-sentences', subsection:'punctuation', difficulty:1,
    question:'A comma should be used to separate items in a list.',
    answer:true,
    hint:'Think of how you list items: "apples, oranges and bananas."',
    explanation:'<b>True.</b> Commas separate items in a list. Example: "I bought milk, bread, eggs and butter." Note: in Mauritius/UK English, there is usually no comma before the final "and" (no Oxford comma). Also: commas separate clauses in compound sentences.' }),

  makeMCQ({ id:'g5eng-sent-006', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'Which sentence uses INVERTED COMMAS (speech marks) correctly?',
    options:[
      '"She said that she was tired."',
      'She said, "I am very tired."',
      'She said I am very tired.',
      '"She said," I am very tired.'
    ],
    answer:'She said, "I am very tired."',
    hint:'Inverted commas go around the EXACT words spoken, not reported speech.',
    explanation:'"<b>She said, "I am very tired."</b>" is correct. Inverted commas (" ") enclose the exact words spoken (direct speech). The comma comes before the opening speech mark. The first option incorrectly uses speech marks around reported speech.' }),

  makeMCQ({ id:'g5eng-sent-007', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'Which word correctly joins these two sentences? "It was raining. We stayed indoors."',
    options:['but','so','or','yet'],
    answer:'so',
    hint:'"So" shows result or consequence - the rain caused us to stay indoors.',
    explanation:'"<b>So</b>" shows cause and effect: "It was raining, <b>so</b> we stayed indoors." - the rain is the reason we stayed in. "But/yet" show contrast. "Or" shows alternatives. FANBOYS (For, And, Nor, But, Or, Yet, So) are coordinating conjunctions.' }),

  makeMCQ({ id:'g5eng-sent-008', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'Where should the apostrophe go in: "the boys shoes"? (shoes belonging to one boy)',
    options:["boy\'s shoes","boys' shoes","boys shoes'","boys\'s shoes"],
    answer:"boy\'s shoes",
    hint:"One boy owns the shoes. Singular possession: noun + 's",
    explanation:'"<b>Boy\'s shoes</b>" - for singular possession, add apostrophe + s: boy\'s. If it were several boys: "the boys\' shoes" (apostrophe after the s for plural nouns ending in s).' }),

  makeTF({ id:'g5eng-sent-009', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'A colon (:) is used to introduce a list.',
    answer:true,
    hint:'Think: "I need three things: a pen, a ruler and an eraser."',
    explanation:'<b>True.</b> A <b>colon</b> introduces a list, explanation or quotation. Examples: "You will need the following: a pencil, a ruler and a rubber." / "There is one problem: no one arrived on time." A semicolon (;) links two related independent clauses.' }),

  makeMCQ({ id:'g5eng-sent-010', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'"Don\'t" is a contraction of which two words?',
    options:["do not","done that","did not","does not"],
    answer:'do not',
    hint:'An apostrophe in a contraction shows where letters have been removed.',
    explanation:'"<b>Don\'t</b>" = <b>do not</b>. The apostrophe replaces the missing letter "o". Other contractions: can\'t = cannot, won\'t = will not, it\'s = it is, they\'re = they are, I\'ve = I have.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-sent-011', chapterId:'eng-sentences', subsection:'types', difficulty:2,
    question:'Complete the TAG QUESTION: "They are going to the park, ___ they?"',
    options:["aren\'t","isn\'t","weren\'t","don\'t"],
    answer:"aren\'t",
    hint:'Positive "are" → negative tag "aren\'t". Match the auxiliary.',
    explanation:'"<b>Aren\'t</b> they?" - the statement uses "are" (positive) so the tag is "aren\'t" (negative) + subject pronoun "they". Rule: positive statement → negative tag; use the same auxiliary verb.' }),

  makeMCQ({ id:'g5eng-sent-012', chapterId:'eng-sentences', subsection:'types', difficulty:2,
    question:'Complete the TAG QUESTION: "You don\'t like spicy food, ___ you?"',
    options:['do','don\'t','are','aren\'t'],
    answer:'do',
    hint:'Negative statement → positive tag.',
    explanation:'"<b>Do</b> you?" - the statement is negative ("don\'t") so the tag must be positive ("do"). Negative statement → positive tag: "You don\'t like... <b>do</b> you?" / "He isn\'t ready... <b>is</b> he?" / "She won\'t come... <b>will</b> she?"' }),

  makeMCQ({ id:'g5eng-sent-013', chapterId:'eng-sentences', subsection:'punctuation', difficulty:1,
    question:'Which is the correct PREPOSITION: "She is waiting ___ the bus."',
    options:['at','for','on','to'],
    answer:'for',
    hint:'"Wait for" is a fixed phrasal verb - you wait for something/someone.',
    explanation:'"<b>Wait for</b>" is the correct fixed expression. Other common preposition collocations: listen <b>to</b>, arrive <b>at</b>, take care <b>of</b>, look <b>at</b>, talk <b>about</b>, good <b>at</b>. These must be learned as set phrases.' }),

  makeMCQ({ id:'g5eng-sent-014', chapterId:'eng-sentences', subsection:'punctuation', difficulty:2,
    question:'Join these sentences with the best conjunction: "It was late. She continued working."',
    options:['so','but','because','or'],
    answer:'but',
    hint:'The second sentence is surprising given the first - it shows contrast.',
    explanation:'"<b>But</b>" shows contrast - it was late (you might expect her to stop) BUT she continued (surprise, opposite of expectation). "So" shows result, "because" shows reason, "or" shows alternatives. "It was late, <b>but</b> she continued working."' }),

  makeMCQ({ id:'g5eng-sent-015', chapterId:'eng-sentences', subsection:'direct_speech', difficulty:2,
    question:'Change to REPORTED SPEECH: He said, "I am very tired."',
    options:[
      'He said that he is very tired.',
      'He said that he was very tired.',
      'He said that I am very tired.',
      'He said that "he is very tired."'
    ],
    answer:'He said that he was very tired.',
    hint:'In reported speech, the tense moves back one step: "am" (present) → "was" (past). Also change "I" to "he".',
    explanation:'"<b>He said that he was very tired</b>" - reported speech changes: (1) Pronoun: I → he; (2) Tense shifts back: am → was; (3) Inverted commas are removed. Direct: "I <b>am</b> tired" → Reported: he <b>was</b> tired.' }),

  makeMCQ({ id:'g5eng-sent-016', chapterId:'eng-sentences', subsection:'in_context', difficulty:2,
    question:'Which sentence uses "because" correctly?',
    options:[
      'She was tired, because went to bed.',
      'He stayed home because he was ill.',
      'They played because, it was fun.',
      'Because lovely day, we had a picnic.'
    ],
    answer:'He stayed home because he was ill.',
    hint:'"Because" introduces a reason - it must be followed by a complete clause (subject + verb).',
    explanation:'"<b>He stayed home because he was ill</b>" - "because" introduces a subordinate clause with a subject (he) and verb (was). "Because" must always be followed by a complete clause: "because + subject + verb". It should not have a comma before it in most cases.' }),

  makeMCQ({ id:'g5eng-sent-017', chapterId:'eng-sentences', subsection:'punctuation', difficulty:3,
    question:'Which passage of DIRECT SPEECH is punctuated correctly?',
    options:[
      '"Come here," she said.',
      '"Come here" she said.',
      '"Come here", she said.',
      'She said "come here".'
    ],
    answer:'"Come here," she said.',
    hint:'The comma (or full stop) always goes INSIDE the closing speech mark.',
    explanation:'"<b>"Come here," she said</b>" - rules for direct speech: (1) Opening speech mark before the spoken words; (2) Comma/full stop INSIDE the closing speech mark; (3) Reporting clause (she said) follows with a lower-case letter. With the reporting clause first, write: She said, "Come here."' }),

  makeMCQ({ id:'g5eng-sent-018', chapterId:'eng-sentences', subsection:'punctuation', difficulty:3,
    question:'Combine into ONE sentence using "although": "It was raining." "They played outside."',
    options:[
      'Although they played outside, it was raining.',
      'Although it was raining, they played outside.',
      'It was raining although, they played outside.',
      'They played outside, although. It was raining.'
    ],
    answer:'Although it was raining, they played outside.',
    hint:'"Although" introduces the SURPRISING or contrasting condition. No comma after "although" - a comma separates the two clauses.',
    explanation:'"<b>Although it was raining, they played outside</b>" - "although" introduces the subordinate clause (the condition/contrast). A comma separates the two clauses. The main clause ("they played outside") comes after. "Although it was raining" sets up a surprise: despite the rain, they played.' }),

  makeMCQ({ id:'g5eng-sent-019', chapterId:'eng-sentences', subsection:'punctuation', difficulty:4,
    question:'Find ALL errors in: "Yesterday, the children has gone to the zoo and they sees many animal."',
    options:[
      'No errors',
      '"has gone" → "went" (past simple); "sees" → "saw" (past simple); "animal" → "animals" (plural)',
      '"has gone" is correct; only "sees" → "saw" is wrong',
      '"Yesterday" → "Today"; everything else is fine'
    ],
    answer:'"has gone" → "went" (past simple); "sees" → "saw" (past simple); "animal" → "animals" (plural)',
    hint:'Check tense (yesterday = past simple) and number (more than one animal).',
    explanation:'Three errors: (1) "<b>has gone</b>" → "<b>went</b>" - "yesterday" signals past simple, not present perfect; (2) "<b>sees</b>" → "<b>saw</b>" - past simple of "see"; (3) "<b>animal</b>" → "<b>animals</b>" - "many" needs a plural noun. Correct: "Yesterday, the children <b>went</b> to the zoo and they <b>saw</b> many <b>animals</b>."' })

);
