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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-sent-011', chapterId:'g4eng-sentences', difficulty:1,
    question:'Which word is a CONJUNCTION in: "I was tired but I finished my homework."',
    options:['tired','but','finished','homework'],
    answer:'but',
    hint:'A conjunction joins two parts (clauses) of a sentence.',
    explanation:'"<b>But</b>" is a conjunction — it joins two clauses: "I was tired" + "I finished my homework". Common conjunctions: and, but, because, so, or, yet, although. Conjunctions are joining words.' }),

  makeMCQ({ id:'g4eng-sent-012', chapterId:'g4eng-sentences', difficulty:1,
    question:'Which conjunction best completes: "She missed the bus ___ she had to walk to school."',
    options:['but','or','because','so'],
    answer:'so',
    hint:'The second clause shows what happened AS A RESULT of missing the bus.',
    explanation:'"She missed the bus <b>so</b> she had to walk to school." "So" shows a result (therefore). Compare: "She had to walk <b>because</b> she missed the bus" — "because" introduces a reason, not a result. "So" = as a result / therefore.' }),

  makeMCQ({ id:'g4eng-sent-013', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which option joins these two sentences correctly: "Ram was hungry." + "He ate a banana."',
    options:[
      'Ram was hungry, he ate a banana.',
      'Ram was hungry and ate a banana.',
      'Ram was hungry but ate a banana.',
      'Ram was hungry. He ate, a banana.'
    ],
    answer:'Ram was hungry and ate a banana.',
    hint:'Join with a conjunction. "And" connects two related ideas.',
    explanation:'"<b>Ram was hungry and ate a banana</b>" uses "and" to join the two ideas smoothly. A comma alone without a conjunction (option 1) creates a comma splice error. "But" implies contrast, which doesn\'t fit here.' }),

  makeTF({ id:'g4eng-sent-014', chapterId:'g4eng-sentences', difficulty:2,
    question:'The names of months (January, February…) always begin with a capital letter.',
    answer:true,
    hint:'Months are proper nouns — are proper nouns capitalised?',
    explanation:'<b>True.</b> Months (January, February, March…) and days of the week (Monday, Tuesday…) are proper nouns and always begin with a capital letter. Many students forget to capitalise these words.' }),

  makeMCQ({ id:'g4eng-sent-015', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which sentence correctly shows POSSESSION for MULTIPLE dogs?',
    options:[
      "The dog's kennel is dirty.",
      "The dogs' kennel is dirty.",
      "The dogs kennel is dirty.",
      "The dogs is kennel dirty."
    ],
    answer:"The dogs' kennel is dirty.",
    hint:'Multiple dogs = plural noun ending in -s. For plural nouns ending in -s, the apostrophe goes AFTER the s.',
    explanation:'"<b>The dogs\' kennel</b>" — for plural nouns ending in -s, place the apostrophe after the s. Compare: one dog\'s kennel (singular) vs the dogs\' kennel (plural). Irregular plurals (no s): the children\'s toys, the women\'s team.' }),

  makeMCQ({ id:'g4eng-sent-016', chapterId:'g4eng-sentences', difficulty:2,
    question:'Which sentence is a COMPOUND sentence (two simple sentences joined by a conjunction)?',
    options:[
      'The bird sang.',
      'The bird sang a beautiful song.',
      'The bird sang and the flowers bloomed.',
      'The singing bird sat in the tree.'
    ],
    answer:'The bird sang and the flowers bloomed.',
    hint:'A compound sentence has TWO complete clauses joined by a conjunction.',
    explanation:'"<b>The bird sang and the flowers bloomed</b>" is compound — it joins two complete clauses ("The bird sang" + "the flowers bloomed") with "and". Simple sentences have one clause. Compound sentences join two simple sentences with a conjunction.' }),

  makeMCQ({ id:'g4eng-sent-017', chapterId:'g4eng-sentences', difficulty:3,
    question:'Which sentence correctly punctuates DIRECT SPEECH?',
    options:[
      'Priya said that she was happy.',
      'Priya said "I am happy"',
      'Priya said, "I am happy."',
      '"Priya said, I am happy."'
    ],
    answer:'Priya said, "I am happy."',
    hint:'Direct speech rules: comma before the opening speech mark, capital letter for the first spoken word, full stop inside the closing speech mark.',
    explanation:'"<b>Priya said, "I am happy."</b>" — rules: comma after the reporting verb (said,), opening inverted comma, capital letter for the first spoken word (I), and full stop before the closing inverted comma. Option 1 is indirect/reported speech (no inverted commas needed).' }),

  makeMCQ({ id:'g4eng-sent-018', chapterId:'g4eng-sentences', difficulty:3,
    question:'What type of sentence is: "How amazing the view from the mountain is!"',
    options:['Statement','Question','Exclamation','Command'],
    answer:'Exclamation',
    hint:'This sentence begins with "How" and ends with an exclamation mark. It expresses strong feeling.',
    explanation:'"<b>Exclamation</b>" — sentences beginning with "What" or "How" that express strong feeling are exclamatory sentences, ending with "!". Examples: "What a wonderful day!" / "How beautiful the flowers are!" Note: commands can also end in "!" — the key is the "What/How" pattern and strong emotion.' }),

  makeMCQ({ id:'g4eng-sent-019', chapterId:'g4eng-sentences', difficulty:4,
    question:'A student wrote: "on saturday, my friend Aisha and i went to the park. we saw a peacock and took photo\'s." How many punctuation or capitalisation errors are there?',
    options:['3','4','5','6'],
    answer:'5',
    hint:'Check: capital at the start of each sentence, capital for proper nouns (days, names), capital for the pronoun "I", and apostrophe errors.',
    explanation:'5 errors: (1) "on" → <b>On</b> (sentence start). (2) "saturday" → <b>Saturday</b> (day of week). (3) "i" → <b>I</b> (the pronoun I is always capital). (4) "we" → <b>We</b> (start of new sentence). (5) "photo\'s" → <b>photos</b> (plural, no apostrophe). Corrected: "On Saturday, my friend Aisha and I went to the park. We saw a peacock and took photos."' })

);
