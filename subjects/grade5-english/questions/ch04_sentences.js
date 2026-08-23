'use strict';
// Grade 5 English — Chapter: Sentences & Punctuation
// IDs format: g5eng-sent-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-sent-001', chapterId:'eng-sentences', difficulty:1,
    question:'Which of the following is a COMPLETE sentence?',
    options:[
      'Running through the park.',
      'The big, friendly dog.',
      'The children laughed loudly.',
      'Because it was raining.'
    ],
    answer:'The children laughed loudly.',
    hint:'A complete sentence must have both a SUBJECT (who/what) and a VERB (action/state).',
    explanation:'"<b>The children laughed loudly</b>" is a complete sentence — it has a subject (The children) and a verb (laughed). The other options are fragments: they are missing either a subject, a verb, or both.' }),

  makeMCQ({ id:'g5eng-sent-002', chapterId:'eng-sentences', difficulty:1,
    question:'What punctuation mark ends an EXCLAMATORY sentence?',
    options:['Full stop (.)','Question mark (?)','Exclamation mark (!)','Comma (,)'],
    answer:'Exclamation mark (!)',
    hint:'Exclamatory sentences express strong feelings or surprise.',
    explanation:'An <b>exclamation mark (!)</b> ends an exclamatory sentence — one that expresses strong emotion, excitement or surprise. Example: "What a wonderful day!" Statements end with a full stop; questions end with a question mark.' }),

  makeMCQ({ id:'g5eng-sent-003', chapterId:'eng-sentences', difficulty:2,
    question:'Which sentence uses an APOSTROPHE correctly?',
    options:[
      "The dog's are barking.",
      "Tom's bicycle is new.",
      "The girl's are playing.",
      "Its' a beautiful day."
    ],
    answer:"Tom's bicycle is new.",
    hint:"Apostrophe + s ('s) shows possession. It is NOT used to make plurals.",
    explanation:'"<b>Tom\'s bicycle is new</b>" — the apostrophe shows possession (the bicycle belongs to Tom). We do NOT use apostrophes to make plurals (dogs not dog\'s). "Its\'" is never correct; "it\'s" = it is, while "its" = belonging to it.' }),

  makeMCQ({ id:'g5eng-sent-004', chapterId:'eng-sentences', difficulty:1,
    question:'Which sentence is a QUESTION?',
    options:[
      'Close the window please.',
      'What a beautiful sunset!',
      'Have you finished your homework?',
      'The sun sets in the west.'
    ],
    answer:'Have you finished your homework?',
    hint:'A question asks for information and ends with a question mark.',
    explanation:'"<b>Have you finished your homework?</b>" is a question — it asks for information and ends with a question mark (?). "Close the window" is a command. "What a beautiful sunset!" is exclamatory. The last option is a statement.' }),

  makeTF({ id:'g5eng-sent-005', chapterId:'eng-sentences', difficulty:1,
    question:'A comma should be used to separate items in a list.',
    answer:true,
    hint:'Think of how you list items: "apples, oranges and bananas."',
    explanation:'<b>True.</b> Commas separate items in a list. Example: "I bought milk, bread, eggs and butter." Note: in Mauritius/UK English, there is usually no comma before the final "and" (no Oxford comma). Also: commas separate clauses in compound sentences.' }),

  makeMCQ({ id:'g5eng-sent-006', chapterId:'eng-sentences', difficulty:2,
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

  makeMCQ({ id:'g5eng-sent-007', chapterId:'eng-sentences', difficulty:2,
    question:'Which word correctly joins these two sentences? "It was raining. We stayed indoors."',
    options:['but','so','or','yet'],
    answer:'so',
    hint:'"So" shows result or consequence — the rain caused us to stay indoors.',
    explanation:'"<b>So</b>" shows cause and effect: "It was raining, <b>so</b> we stayed indoors." — the rain is the reason we stayed in. "But/yet" show contrast. "Or" shows alternatives. FANBOYS (For, And, Nor, But, Or, Yet, So) are coordinating conjunctions.' }),

  makeMCQ({ id:'g5eng-sent-008', chapterId:'eng-sentences', difficulty:2,
    question:'Where should the apostrophe go in: "the boys shoes"? (shoes belonging to one boy)',
    options:["boy's shoes","boys' shoes","boys shoes'","boys's shoes"],
    answer:"boy's shoes",
    hint:"One boy owns the shoes. Singular possession: noun + 's",
    explanation:'"<b>Boy\'s shoes</b>" — for singular possession, add apostrophe + s: boy\'s. If it were several boys: "the boys\' shoes" (apostrophe after the s for plural nouns ending in s).' }),

  makeTF({ id:'g5eng-sent-009', chapterId:'eng-sentences', difficulty:2,
    question:'A colon (:) is used to introduce a list.',
    answer:true,
    hint:'Think: "I need three things: a pen, a ruler and an eraser."',
    explanation:'<b>True.</b> A <b>colon</b> introduces a list, explanation or quotation. Examples: "You will need the following: a pencil, a ruler and a rubber." / "There is one problem: no one arrived on time." A semicolon (;) links two related independent clauses.' }),

  makeMCQ({ id:'g5eng-sent-010', chapterId:'eng-sentences', difficulty:2,
    question:'"Don\'t" is a contraction of which two words?',
    options:["do not","done that","did not","does not"],
    answer:'do not',
    hint:'An apostrophe in a contraction shows where letters have been removed.',
    explanation:'"<b>Don\'t</b>" = <b>do not</b>. The apostrophe replaces the missing letter "o". Other contractions: can\'t = cannot, won\'t = will not, it\'s = it is, they\'re = they are, I\'ve = I have.' })

);
