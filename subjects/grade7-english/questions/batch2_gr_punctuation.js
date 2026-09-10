'use strict';
// Grade 7 English — Grammar · Punctuation, batch 2 (011–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-gr-punctuation-011', chapterId:'g7eng-gr-punctuation', difficulty:1,
    subsection:'full_stop_comma',
    question:'Which sentence uses CAPITAL LETTERS correctly?',
    options:['On Monday we visited Curepipe.','On monday we visited curepipe.','on Monday we visited Curepipe.','On Monday We Visited Curepipe.'],
    answer:'On Monday we visited Curepipe.',
    hint:'Days and place names are proper nouns; ordinary words in the middle are not.',
    explanation:'A capital is needed to open the sentence and on the proper nouns "Monday" and "Curepipe". Lower-casing those two, dropping the opening capital, or capitalising every word are all wrong.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-012', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'full_stop_comma',
    question:'Which sentence is punctuated CORRECTLY?',
    options:['When the bell rang, we lined up.','When the bell rang we lined up.','When, the bell rang we lined up.','When the bell, rang we lined up.'],
    answer:'When the bell rang, we lined up.',
    hint:'A clause placed before the main clause is followed by one mark.',
    explanation:'An introductory subordinate clause is separated from the main clause by a comma. Leaving it out runs the two together, and the other two commas cut the clause in the wrong place — one after "When", one between the subject and its verb.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-013', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'full_stop_comma',
    question:'Which sentence should end with an EXCLAMATION MARK?',
    options:['What a fantastic goal that was','What time does the match start','The match starts at four o\'clock','Ask him what time it starts'],
    answer:'What a fantastic goal that was',
    hint:'One of these shows strong feeling rather than asking or telling.',
    explanation:'An exclamation mark ends a sentence showing strong feeling or surprise. The second is a question and needs a question mark, and the last two are a statement and an instruction, which both take a full stop.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-014', chapterId:'g7eng-gr-punctuation', difficulty:3,
    subsection:'full_stop_comma',
    question:'Which sentence punctuates the NAME of the person spoken to correctly?',
    options:['Could you close the door, Anil?','Could you close the door Anil?','Could you, close the door Anil?','Could you close, the door Anil?'],
    answer:'Could you close the door, Anil?',
    hint:'The person being spoken TO is separated from the rest of the sentence.',
    explanation:'A comma separates a name used in direct address: "…the door, Anil?" Without it the sentence reads as though the door itself were called Anil, and the other two commas cut the sentence in places where nothing needs separating.' }),

  makeText({ id:'g7eng-gr-punctuation-015', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'full_stop_comma',
    question:'Which punctuation mark is missing after "However" in <i>"However the ferry was cancelled."</i>?<br>Write its NAME in ONE word.',
    answer:'comma',
    alsoAccept:['a comma','the comma','comma mark'],
    hint:'A linking word at the start of a sentence is followed by a mark, not just a space.',
    explanation:'A linking word such as "However", "Moreover" or "Therefore" takes a <b>comma</b> after it when it opens a sentence. A full stop would cut "However" off as a sentence of its own, and a colon would promise a list or an explanation that never comes.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-016', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'colon_direct_speech',
    question:'Which sentence uses QUOTATION MARKS correctly?',
    options:['She said, "I will be late."','She said that, "she was late."','She said, that she was late.','"She said" that she was late.'],
    answer:'She said, "I will be late."',
    hint:'Quotation marks go round the speaker\'s exact words and nothing else.',
    explanation:'Only the first puts the speaker\'s exact words inside the marks, introduced by a comma. The second and fourth enclose reported words or the wrong part of the sentence, and the third adds a comma to reported speech, which needs none.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-017', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'colon_direct_speech',
    question:'Which sentence uses a COLON to introduce direct speech correctly?',
    options:['The rector announced: "The fair is on."','The rector announced "The fair is on."','The rector: announced "The fair is on."','The rector announced "The fair: is on."'],
    answer:'The rector announced: "The fair is on."',
    hint:'The colon comes after the reporting verb and before the opening quotation mark.',
    explanation:'The colon closes the introduction and opens the quoted words. The second has no mark at all before the speech, while the other two drop the colon inside the introduction or inside the quotation, where it separates words that belong together.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-018', chapterId:'g7eng-gr-punctuation', difficulty:3,
    subsection:'colon_direct_speech',
    question:'Which sentence is punctuated CORRECTLY?',
    options:['Mum said, "Wash your hands."','Mum said, "wash your hands."','Mum said, "Wash your hands".','Mum said "Wash your hands".'],
    answer:'Mum said, "Wash your hands."',
    hint:'Two things matter here: the first letter of the speech, and where the full stop sits.',
    explanation:'Direct speech opens with a capital letter, and the closing full stop goes INSIDE the quotation marks after the introducing comma. The others lower-case the first spoken word, put the stop outside the marks, or drop the comma as well.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-019', chapterId:'g7eng-gr-punctuation', difficulty:2,
    subsection:'colon_direct_speech',
    question:'Which sentence is CORRECT as reported speech?',
    options:['She told us she was tired.','She told us "she was tired."','She told us, "she was tired".','She told us: she was tired.'],
    answer:'She told us she was tired.',
    hint:'Reported speech gives the meaning, not the exact words.',
    explanation:'Reported speech needs no quotation marks, no comma and no colon. The other three punctuate it as though the speaker\'s exact words were being quoted, which they are not.' }),

  makeMCQ({ id:'g7eng-gr-punctuation-020', chapterId:'g7eng-gr-punctuation', difficulty:3,
    subsection:'colon_direct_speech',
    question:'Which sentence uses a COLON correctly before an explanation?',
    options:['She had one aim: to win the cup.','She had one aim, to: win the cup.','She had: one aim to win the cup.','She had one: aim to win the cup.'],
    answer:'She had one aim: to win the cup.',
    hint:'A colon comes after a complete statement and before whatever explains it.',
    explanation:'The colon follows the complete statement "She had one aim" and introduces the explanation that follows. In the other three it is dropped inside the statement, where it splits words that belong together.' })

);
