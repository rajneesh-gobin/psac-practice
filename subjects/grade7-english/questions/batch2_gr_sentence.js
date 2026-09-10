'use strict';
// Grade 7 English — Grammar · Sentence Structure, batch 2 (011–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-gr-sentence-011', chapterId:'g7eng-gr-sentence', difficulty:1,
    subsection:'simple_compound',
    question:'Which group of words is NOT a complete sentence?',
    options:['Because the bus was late.','The bus was late today.','We waited at the stop.','Rain fell all morning.'],
    answer:'Because the bus was late.',
    hint:'Read each one aloud. Which leaves you waiting for the rest?',
    explanation:'"Because the bus was late" is a subordinate clause: it has a subject and a verb, but "because" leaves the idea unfinished, so it is a fragment. Each of the other three stands alone as a complete thought.' }),

  makeMCQ({ id:'g7eng-gr-sentence-012', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'simple_compound',
    question:'Choose the conjunction that offers a CHOICE: "We can take the bus ___ we can walk."',
    options:['or','so','but','for'],
    answer:'or',
    hint:'Two possibilities are being offered, and only one of them will happen.',
    explanation:'<b>Or</b> joins two alternatives. "So" gives a result, "but" shows a contrast, and "for" gives a reason — none of them offers a choice.' }),

  makeMCQ({ id:'g7eng-gr-sentence-013', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'simple_compound',
    question:'Which sentence is a RUN-ON (two sentences joined wrongly)?',
    options:['It was raining, we stayed inside.','It was raining, so we stayed inside.','It was raining. We stayed inside.','Because it was raining, we stayed in.'],
    answer:'It was raining, we stayed inside.',
    hint:'A comma on its own is not strong enough to join two complete sentences.',
    explanation:'The first joins two complete sentences with nothing but a comma, which is a run-on (a comma splice). The others fix it properly — with the conjunction "so", with a full stop, or by making one clause subordinate with "because".' }),

  makeMCQ({ id:'g7eng-gr-sentence-014', chapterId:'g7eng-gr-sentence', difficulty:3,
    subsection:'simple_compound',
    question:'Which sentence is SIMPLE, even though two people are named in it?',
    options:['Ravi and Sara play football.','Ravi plays and Sara watches.','Ravi plays, but Sara watches.','Ravi plays while Sara watches.'],
    answer:'Ravi and Sara play football.',
    hint:'Count the verbs, and ask how many complete ideas there are.',
    explanation:'"Ravi and Sara play football" has one verb and one clause — a compound SUBJECT does not make a compound sentence. Each of the other three contains two clauses, joined by "and", "but" or "while".' }),

  makeText({ id:'g7eng-gr-sentence-015', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'simple_compound',
    question:'Complete with ONE word so that the compound sentence shows a RESULT: "The pipe burst, ___ the road was flooded."',
    answer:'so',
    hint:'The flooding is the consequence of the burst pipe.',
    explanation:'<b>So</b> is the coordinating conjunction that shows a result. "And" would merely add the second fact, "but" would suggest a contrast, and "because" would put the cause after the effect instead of before it.' }),

  makeMCQ({ id:'g7eng-gr-sentence-016', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'complex_sentences',
    question:'"When the rain stopped, the pupils went outside." Which part is the SUBORDINATE clause?',
    options:['When the rain stopped','the pupils went outside','the rain stopped','the pupils went'],
    answer:'When the rain stopped',
    hint:'The subordinate clause cannot stand alone as a sentence.',
    explanation:'<b>When the rain stopped</b> cannot stand alone: "when" makes it depend on the rest of the sentence. "The pupils went outside" is the main clause and is a complete sentence on its own, while the other two are only parts of clauses.' }),

  makeMCQ({ id:'g7eng-gr-sentence-017', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'complex_sentences',
    question:'Choose the correct subordinating conjunction: "___ he had studied hard, he failed the test."',
    options:['Although','Because','So','And'],
    answer:'Although',
    hint:'The two halves of the sentence surprise you. Which word signals that?',
    explanation:'<b>Although</b> introduces a contrast, and studying hard usually leads to passing. "Because" would give a reason, which makes no sense here, and "so" and "and" are coordinating conjunctions that cannot open a subordinate clause.' }),

  makeMCQ({ id:'g7eng-gr-sentence-018', chapterId:'g7eng-gr-sentence', difficulty:3,
    subsection:'complex_sentences',
    question:'Choose the correct word: "The teacher to ___ I wrote replied the same day."',
    options:['whom','who','which','whose'],
    answer:'whom',
    hint:'After a preposition, the relative pronoun for a person changes form.',
    explanation:'After a preposition such as "to", English requires the object form <b>whom</b>. "Who" is the subject form, "which" is used for things, and "whose" shows possession and needs a noun after it.' }),

  makeMCQ({ id:'g7eng-gr-sentence-019', chapterId:'g7eng-gr-sentence', difficulty:3,
    subsection:'complex_sentences',
    question:'Combine "The film was long." and "We enjoyed it." Which COMPLEX sentence is correct?',
    options:['Though the film was long, we enjoyed it.','The film was long, and we enjoyed it.','The film was long, so we enjoyed it.','The film was long; we enjoyed it.'],
    answer:'Though the film was long, we enjoyed it.',
    hint:'A complex sentence needs a subordinating conjunction, not a coordinating one.',
    explanation:'<b>Though</b> makes the first clause subordinate, which is what makes a sentence complex, and it shows the contrast between the length and the enjoyment. "And" and "so" are coordinating conjunctions, so those versions are compound, and a semicolon joins two independent clauses with no conjunction at all.' }),

  makeText({ id:'g7eng-gr-sentence-020', chapterId:'g7eng-gr-sentence', difficulty:2,
    subsection:'complex_sentences',
    question:'Complete with ONE word: "The market ___ my mother buys her vegetables is in Quatre Bornes."',
    answer:'where',
    hint:'The missing word stands for "in which" and points to a place.',
    explanation:'<b>Where</b> introduces a relative clause about a place and replaces "in which". "Which" on its own would need "at" or "in" in front of it, and "who" is used only for people.' })

);
