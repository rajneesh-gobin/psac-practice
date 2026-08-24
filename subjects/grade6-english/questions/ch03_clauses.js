'use strict';
// Grade 6 English — Chapter: Clauses & Sentence Structure
// IDs format: g6eng-cls-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-cls-001', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which part of the sentence is the SUBORDINATE clause?',
    options:[
      '"She smiled" in "She smiled because she was happy."',
      '"because she was happy" in "She smiled because she was happy."',
      'The whole sentence',
      'There is no subordinate clause.'
    ],
    answer:'"because she was happy" in "She smiled because she was happy."',
    hint:'A subordinate clause cannot stand alone — it depends on the main clause.',
    explanation:'"<b>Because she was happy</b>" is the subordinate clause — it cannot stand alone as a complete sentence. "She smiled" is the main clause (it can stand alone). The subordinating conjunction "because" introduces the subordinate clause.' }),

  makeMCQ({ id:'g6eng-cls-002', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which conjunction introduces a CONDITIONAL sentence (Type 1)?',
    options:['although','if','because','since'],
    answer:'if',
    hint:'Type 1 conditional: If + present simple, will + infinitive.',
    explanation:'"<b>If</b>" introduces Type 1 conditionals (real/likely): "If it rains, we will stay inside." Type 2 (unreal present): "If I were rich, I would travel." Type 3 (unreal past): "If I had studied, I would have passed."' }),

  makeMCQ({ id:'g6eng-cls-003', chapterId:'g6eng-clauses', difficulty:2,
    question:'Convert to reported speech: She said, "I am tired."',
    options:[
      'She said that she is tired.',
      'She said that she was tired.',
      'She said that I was tired.',
      'She said, she is tired.'
    ],
    answer:'She said that she was tired.',
    hint:'In reported speech, present tense shifts to past tense (tense backshift).',
    explanation:'"<b>She said that she was tired.</b>" — In reported speech, tenses shift back: "am" (present) → "was" (past). Pronouns also change: "I" → "she". The word "that" can be included or omitted.' }),

  makeMCQ({ id:'g6eng-cls-004', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which is a TYPE 2 conditional (unreal/hypothetical present)?',
    options:[
      'If it rains tomorrow, I will take an umbrella.',
      'If I were a bird, I would fly away.',
      'If she had studied, she would have passed.',
      'If you heat water, it boils.'
    ],
    answer:'If I were a bird, I would fly away.',
    hint:'Type 2: If + past simple (or "were"), would + infinitive — imagining an unreal present situation.',
    explanation:'"<b>If I were a bird, I would fly away.</b>" — Type 2 conditional: If + past simple/were + would + infinitive. It expresses an unreal or imaginary present/future. Note: "were" is used for all subjects in Type 2 (not "was").' }),

  makeTF({ id:'g6eng-cls-005', chapterId:'g6eng-clauses', difficulty:2,
    question:'A main clause can stand alone as a complete sentence.',
    answer:true,
    hint:'That is exactly what makes it a "main" clause.',
    explanation:'<b>True.</b> A <b>main (independent) clause</b> contains a subject and a verb and can stand alone: "The dog barked." A subordinate (dependent) clause cannot stand alone: "because the stranger arrived" — this is incomplete without a main clause.' }),

  makeMCQ({ id:'g6eng-cls-006', chapterId:'g6eng-clauses', difficulty:2,
    question:'Choose the correct relative clause: "That is the museum ___ the Dodo skeleton is kept."',
    options:['who','whose','where','which'],
    answer:'where',
    hint:'"Where" is used as a relative pronoun to refer to a place.',
    explanation:'"That is the museum <b>where</b> the Dodo skeleton is kept." — <b>Where</b> (= in which) refers to a place. Who = person. Which/that = thing. Whose = possession. Where = location.' }),

  makeMCQ({ id:'g6eng-cls-007', chapterId:'g6eng-clauses', difficulty:2,
    question:'Report this question: He asked, "Do you like football?"',
    options:[
      'He asked that do you like football.',
      'He asked if I liked football.',
      'He asked that I like football.',
      'He asked whether do I like football.'
    ],
    answer:'He asked if I liked football.',
    hint:'Yes/no questions use "if" or "whether" in reported speech. Tense shifts back.',
    explanation:'"<b>He asked if I liked football.</b>" — Yes/no questions in reported speech use if/whether. "Do you like" (present) → "if I liked" (past). Pronoun changes: "you" → "I". Word order becomes normal statement order (no inversion).' }),

  makeMCQ({ id:'g6eng-cls-008', chapterId:'g6eng-clauses', difficulty:1,
    question:'Which word is a SUBORDINATING conjunction?',
    options:['and','but','or','although'],
    answer:'although',
    hint:'Subordinating conjunctions introduce subordinate clauses and show a relationship (contrast, time, cause).',
    explanation:'"<b>Although</b>" is a subordinating conjunction — it introduces a subordinate clause: "Although it was raining, we went out." Other subordinating conjunctions: because, when, while, unless, until, since, if. "And/but/or" are coordinating conjunctions (FANBOYS).' }),

  makeTF({ id:'g6eng-cls-009', chapterId:'g6eng-clauses', difficulty:2,
    question:'In the sentence "If I had worked harder, I would have passed the exam", the verb in the if-clause is in the past perfect tense.',
    answer:true,
    hint:'Type 3 conditional: if + past perfect (had + past participle), would have + past participle.',
    explanation:'<b>True.</b> "If I <b>had worked</b>" — had + past participle = past perfect. This is a Type 3 conditional (unreal past): it refers to a situation that did not happen. The result also uses would have + past participle.' }),

  makeMCQ({ id:'g6eng-cls-010', chapterId:'g6eng-clauses', difficulty:2,
    question:'Report: The teacher said, "The exam will be next Monday."',
    options:[
      'The teacher said that the exam will be next Monday.',
      'The teacher said that the exam would be the following Monday.',
      'The teacher said that the exam is next Monday.',
      'The teacher told the exam would be Monday.'
    ],
    answer:'The teacher said that the exam would be the following Monday.',
    hint:'Will → would. Time expressions also change: next Monday → the following Monday.',
    explanation:'"<b>The teacher said that the exam would be the following Monday.</b>" — "will" → "would" in reported speech. Time expressions shift: "next Monday" → "the following Monday", "tomorrow" → "the next day", "yesterday" → "the previous day".' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-cls-011', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which sentence correctly uses a TYPE 3 CONDITIONAL (unreal past)?',
    options:[
      '"If it rains, we will cancel the match."',
      '"If I were taller, I would play basketball."',
      '"If she had studied harder, she would have passed the exam."',
      '"If you heat ice, it melts."'
    ],
    answer:'"If she had studied harder, she would have passed the exam."',
    hint:'Type 3: If + past perfect (had + past participle), would have + past participle. Refers to an unreal past situation.',
    explanation:'"If she <b>had studied</b> harder, she <b>would have passed</b>." — <b>Type 3 conditional</b>: If + past perfect → would have + past participle. It expresses an unreal past situation — she did not study, so she did not pass. This type is used for <b>regret</b> or imagining a different past outcome. The MIE Grade 6 textbook covers all three conditional types for the PSAC exam.' }),

  makeMCQ({ id:'g6eng-cls-012', chapterId:'g6eng-clauses', difficulty:2,
    question:'Report the command: The teacher said to us, "Open your books to page 10."',
    options:[
      'The teacher said that we should open our books to page 10.',
      'The teacher told us to open our books to page 10.',
      'The teacher asked that we open our books to page 10.',
      'The teacher said us to open our books to page 10.'
    ],
    answer:'The teacher told us to open our books to page 10.',
    hint:'Commands in reported speech use: told/asked + object + to + infinitive.',
    explanation:'"The teacher <b>told us to open</b> our books to page 10." — Reported commands use <b>told/ordered/asked + object pronoun + to + infinitive</b>. Negative commands: "Don\'t run" → "She told them <b>not to run</b>." Note: "told us to" (not "said us to" — "say" does not take an indirect object without "that").' }),

  makeMCQ({ id:'g6eng-cls-013', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which sentence uses a PURPOSE CLAUSE correctly?',
    options:[
      '"She studied hard so that she could pass the exam."',
      '"She studied hard because she passed the exam."',
      '"She studied hard although she could pass the exam."',
      '"She studied hard unless she could pass the exam."'
    ],
    answer:'"She studied hard so that she could pass the exam."',
    hint:'"So that" introduces a purpose clause — it explains WHY something is done.',
    explanation:'"She studied hard <b>so that</b> she could pass the exam." — <b>Purpose clauses</b> answer the question "Why?" or "For what purpose?" They are introduced by: <b>so that / in order that</b> (+ subject + modal: so that she could), or <b>in order to / to</b> (+ infinitive: "She studied hard to pass"). "So that" usually appears with modal verbs (can, could, might, would).' }),

  makeTF({ id:'g6eng-cls-014', chapterId:'g6eng-clauses', difficulty:2,
    question:'In the sentence "Although it was raining, we went for a walk", "Although it was raining" is the main clause.',
    answer:false,
    hint:'A main clause can stand alone as a complete sentence. Can "Although it was raining" stand alone?',
    explanation:'<b>False.</b> "Although it was raining" is the <b>subordinate (dependent) clause</b> — it cannot stand alone. "Although" is a subordinating conjunction that introduces a concessive clause. The <b>main clause</b> is "we went for a walk" — this can stand alone. The subordinate clause must be attached to a main clause to make a complete sentence.' }),

  makeMCQ({ id:'g6eng-cls-015', chapterId:'g6eng-clauses', difficulty:2,
    question:'Change to reported speech: He asked, "Where does she live?"',
    options:[
      'He asked where does she live.',
      'He asked where she lived.',
      'He asked where she lives.',
      'He asked where did she live.'
    ],
    answer:'He asked where she lived.',
    hint:'Wh- questions in reported speech: use "where/when/who/what" + normal word order (no inversion) + tense shift.',
    explanation:'"He asked <b>where she lived</b>." — Wh- questions in reported speech: (1) keep the wh- word (where, when, who, what, why, how); (2) use <b>normal word order</b> (no inversion — not "where did she live"); (3) <b>tense shift back</b>: "does live" (present) → "lived" (past). Pronoun changes: "she" stays "she" here (but "I" → "he/she").' }),

  makeMCQ({ id:'g6eng-cls-016', chapterId:'g6eng-clauses', difficulty:2,
    question:'Which conjunction introduces a TIME clause?',
    options:['because','although','when','so that'],
    answer:'when',
    hint:'Time clauses say WHEN something happens in relation to another event.',
    explanation:'"<b>When</b>" introduces a time clause: "When the bell rang, students left the classroom." Time conjunctions from MIE Grade 6: <b>when, while, as, before, after, until, as soon as, since, whenever</b>. A time clause tells us the time relationship between two actions. Compare: because (cause), although (concession), so that (purpose).' }),

  makeMCQ({ id:'g6eng-cls-017', chapterId:'g6eng-clauses', difficulty:3,
    question:'Which sentence correctly uses a DEFINING relative clause (no commas)?',
    options:[
      'The boy, who won the competition, is my brother.',
      'My brother, who is tall, plays football.',
      'The boy who won the competition is my brother.',
      'The competition, that she won, was difficult.'
    ],
    answer:'The boy who won the competition is my brother.',
    hint:'A defining (restrictive) relative clause identifies WHICH specific person/thing we mean — no commas.',
    explanation:'"<b>The boy who won the competition</b> is my brother." — A <b>defining relative clause</b> specifies which particular person/thing is meant — it is essential to the meaning and uses <b>no commas</b>. A <b>non-defining relative clause</b> adds extra information and uses commas: "My brother, who is tall, plays football." Also: "that" can replace "who/which" in defining clauses — NOT in non-defining.' }),

  makeMCQ({ id:'g6eng-cls-018', chapterId:'g6eng-clauses', difficulty:2,
    question:'Complete the reported speech: She said, "I will come to the party tomorrow." → She said that she ___.',
    options:[
      'will come to the party tomorrow',
      'would come to the party the next day',
      'would come to the party tomorrow',
      'came to the party the next day'
    ],
    answer:'would come to the party the next day',
    hint:'Will → would. Time expression: tomorrow → the next day.',
    explanation:'"She said that she <b>would come to the party the next day</b>." — Reported speech changes: (1) <b>will → would</b>; (2) <b>tomorrow → the next day</b>. Full time expression shifts: now→then, today→that day, yesterday→the day before, last week→the week before, here→there. The MIE Grade 6 textbook has a complete table of these time shifts for the PSAC.' }),

  makeMCQ({ id:'g6eng-cls-019', chapterId:'g6eng-clauses', difficulty:3,
    question:'Identify the type of clause underlined: "The novel [that was written by Dickens] is still popular today."',
    options:[
      'A main clause',
      'A time clause',
      'A defining relative clause',
      'A non-defining relative clause'
    ],
    answer:'A defining relative clause',
    hint:'Does the clause identify WHICH novel? Are there commas? "That" is used — what does that tell you?',
    explanation:'"[that was written by Dickens]" is a <b>defining (restrictive) relative clause</b>: (1) it specifies <b>which</b> novel (the one written by Dickens, not any other); (2) there are <b>no commas</b>; (3) it uses "<b>that</b>" — which is only used in defining clauses. Without this clause, "The novel is still popular" loses its specific meaning. Removing a defining clause changes the meaning; removing a non-defining clause only removes extra information.' })

);
