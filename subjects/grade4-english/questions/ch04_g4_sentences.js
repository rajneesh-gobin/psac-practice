'use strict';
// Grade 4 English — Chapter: Sentences & Punctuation
// IDs format: g4eng-sent-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-sent-001', chapterId:'g4eng-sentences', difficulty:1,
    question:'What type of sentence is: "Where do you live?"',
    options:['Statement','Question','Exclamation','Command'],
    answer:'Question',
    hint:'Look at the punctuation mark at the end of the sentence.',
    explanation:'"<b>Question</b>" — this sentence asks something and ends with a question mark (?). Statement: gives information (ends with .). Question: asks something (?). Exclamation: shows strong feeling (!). Command: gives an order (ends with .).' }),

  makeMCQ({ id:'g4eng-sent-002', chapterId:'g4eng-sentences', difficulty:1,
    question:'Which punctuation mark should end: "What a beautiful sunset"',
    options:['Full stop (.)','Question mark (?)','Exclamation mark (!)','Comma (,)'],
    answer:'Exclamation mark (!)',
    hint:'The sentence expresses strong feeling or surprise.',
    explanation:'"What a beautiful sunset<b>!</b>" — This sentence expresses admiration and strong feeling, so it ends with an exclamation mark. Exclamatory sentences often begin with "What a..." or "How..." Examples: "How wonderful!" "What a surprise!"' }),

  makeTF({ id:'g4eng-sent-003', chapterId:'g4eng-sentences', difficulty:1,
    question:'Every sentence must begin with a capital letter.',
    answer:true,
    hint:'This is one of the basic rules of writing sentences in English.',
    explanation:'<b>True.</b> Every sentence must begin with a capital letter. Proper nouns (names of people, places, days, months) also always use a capital letter. A sentence also ends with a punctuation mark: . ? or !' }),

  makeMCQ({ id:'g4eng-sent-004', chapterId:'g4eng-sentences', difficulty:1,
    question:'What type of sentence is: "Please sit down."',
    options:['Statement','Question','Exclamation','Command'],
    answer:'Command',
    hint:'A command gives an instruction or order. The verb often comes first.',
    explanation:'"Please sit down" is a <b>command</b> — it gives an instruction or order. Commands often begin with a verb: "Sit down.", "Open your book.", "Come here." They can end with a full stop or exclamation mark.' }),

  makeMCQ({ id:'g4eng-sent-005', chapterId:'g4eng-sentences', difficulty:2,
    question:'What does the apostrophe in "don\'t" represent?',
    options:['Possession','A missing letter','A new sentence','A list'],
    answer:'A missing letter',
    hint:'Don\'t = do not. Where is the letter missing?',
    explanation:'"Don\'t" = "do not" — the apostrophe replaces the missing letter <b>o</b> in "not". This is a contraction. Other contractions: can\'t (cannot), I\'m (I am), she\'s (she is), they\'re (they are), won\'t (will not).' }),

  makeMCQ({ id:'g4eng-sent-006', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which sentence uses COMMAS correctly?',
    options:[
      'I bought, milk bread, and eggs.',
      'I bought milk, bread, and eggs.',
      'I bought milk bread and, eggs.',
      'I, bought milk bread and eggs.'
    ],
    answer:'I bought milk, bread, and eggs.',
    hint:'Commas separate items in a list. They go between each item.',
    explanation:'"<b>I bought milk, bread, and eggs.</b>" — Commas go between items in a list: item1, item2, and item3. The comma before "and" is optional but acceptable. Never put a comma right after the verb or before the first item.' }),

  makeMCQ({ id:'g4eng-sent-007', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which sentence uses the APOSTROPHE for POSSESSION correctly?',
    options:[
      "The dog's bowl is empty.",
      "The dogs bowl is empty.",
      "The dogs' bowl is empty.",
      "The dog is bowl is empty."
    ],
    answer:"The dog's bowl is empty.",
    hint:'There is one dog. To show that the bowl belongs to the dog, add apostrophe + s.',
    explanation:'"<b>The dog\'s bowl</b>" — for a singular noun, add apostrophe + s to show possession (belonging). If plural: the dogs\' bowls (apostrophe after the s). Possession apostrophe: Tom\'s book, the cat\'s tail, the teacher\'s pen.' }),

  makeMCQ({ id:'g4eng-sent-008', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which sentence uses INVERTED COMMAS (speech marks) correctly?',
    options:[
      'She said "Come here",',
      'She said, "Come here!"',
      'She said, Come here!',
      '"She said, Come here!"'
    ],
    answer:'She said, "Come here!"',
    hint:'Inverted commas go around the exact words spoken. A comma comes before the opening speech mark.',
    explanation:'"<b>She said, "Come here!"</b>" is correct. Inverted commas go around the actual words spoken. A comma (or colon) comes before the opening inverted comma. The exclamation mark/full stop goes inside the closing inverted comma.' }),

  makeMCQ({ id:'g4eng-sent-009', chapterId:'g4eng-sentences', difficulty:3,
    question:'Which sentence has NO punctuation errors?',
    options:[
      'my friend priya lives in port louis.',
      'My friend Priya lives in Port Louis.',
      'my friend priya lives in Port louis.',
      'My Friend Priya lives in port louis.'
    ],
    answer:'My friend Priya lives in Port Louis.',
    hint:'Check: capital letter at the start, capital letters for proper nouns (names of people and places), full stop at the end.',
    explanation:'"<b>My friend Priya lives in Port Louis.</b>" is correct. Rules applied: capital letter at the start of the sentence, "Priya" (person\'s name) has a capital, "Port Louis" (place name) has capitals, and the sentence ends with a full stop.' }),

  makeMCQ({ id:'g4eng-sent-010', chapterId:'g4eng-sentences', difficulty:4,
    question:'A student wrote: "yesterday i went to the market with my mother we bought fish vegetables and fruit it was a fun day." How many punctuation marks are MISSING from this passage?',
    options:['2','3','4','5'],
    answer:'4',
    hint:'Count: capital letters at the start of sentences, full stops to separate sentences, and any commas needed.',
    explanation:'4 corrections needed: (1) Capital "Y" for "Yesterday". (2) Full stop after "mother" (new sentence). (3) Capital "W" for "We". (4) Comma after "fish" and after "vegetables" in the list — or at minimum one comma. The corrected version: "Yesterday I went to the market with my mother. We bought fish, vegetables and fruit. It was a fun day."' })

);
