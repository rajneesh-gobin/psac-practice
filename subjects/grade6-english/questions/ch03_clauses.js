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
