'use strict';
// Grade 6 French — Chapter: Les Propositions Subordonnées
// IDs format: g6fr-sub-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sub-001', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complete with the correct relative pronoun: "L\'homme ___ chante est mon père."',
    options:['que','dont','où','qui'],
    answer:'qui',
    hint:'"Qui" = subject of the relative clause (it replaces the subject). "Que" = object.',
    explanation:'"L\'homme <b>qui</b> chante est mon père." — <b>Qui</b> is the subject of the relative clause (qui chante = who sings). Use qui when the relative pronoun is the SUBJECT of the clause. Use que when it is the OBJECT.' }),

  makeMCQ({ id:'g6fr-sub-002', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complete: "Le livre ___ je lis est intéressant."',
    options:['qui','dont','où','que'],
    answer:'que',
    hint:'"Je lis" already has a subject (je). The relative pronoun is the OBJECT of the verb lire.',
    explanation:'"Le livre <b>que</b> je lis est intéressant." — <b>Que</b> is the object of the relative clause (je lis le livre → le livre que je lis). Note: que becomes qu\' before a vowel: "le film qu\'il regarde".' }),

  makeMCQ({ id:'g6fr-sub-003', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complete: "C\'est la ville ___ je suis né."',
    options:['qui','que','dont','où'],
    answer:'où',
    hint:'"Où" replaces a place or a time expression in a relative clause.',
    explanation:'"C\'est la ville <b>où</b> je suis né." — <b>Où</b> = where / in which, replacing a place. It can also replace a time: "le jour où je suis arrivé" (the day when I arrived).' }),

  makeMCQ({ id:'g6fr-sub-004', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complete: "C\'est le professeur ___ j\'ai parlé hier."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Dont" replaces "de + noun/pronoun". "Parler de quelqu\'un" → "dont".',
    explanation:'"C\'est le professeur <b>dont</b> j\'ai parlé hier." — <b>Dont</b> replaces "de + noun": "j\'ai parlé du professeur" → "le professeur dont j\'ai parlé". Dont is also used with: avoir besoin de, avoir peur de, être content de.' }),

  makeTF({ id:'g6fr-sub-005', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'In indirect speech in French, the present tense shifts to the imparfait.',
    answer:true,
    hint:'Think: "Je suis fatigué." → Il a dit qu\'il ___.',
    explanation:'<b>Vrai (True).</b> In indirect speech: présent → imparfait. "Je suis fatigué." → "Il a dit qu\'il <b>était</b> fatigué." Other shifts: passé composé → plus-que-parfait, futur → conditionnel.' }),

  makeMCQ({ id:'g6fr-sub-006', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Report: Il a dit : "Je viendrai demain."',
    options:[
      'Il a dit qu\'il viendra demain.',
      'Il a dit qu\'il venait le lendemain.',
      'Il a dit qu\'il viendrait le lendemain.',
      'Il a dit il viendrait demain.'
    ],
    answer:'Il a dit qu\'il viendrait le lendemain.',
    hint:'Futur → conditionnel in reported speech. "Demain" → "le lendemain".',
    explanation:'"<b>Il a dit qu\'il viendrait le lendemain.</b>" — In indirect speech: futur → <b>conditionnel</b> (viendra → viendrait). Time expressions shift: demain → le lendemain. Note: "que" is required before the reported clause.' }),

  makeMCQ({ id:'g6fr-sub-007', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Which connector expresses CAUSE?',
    options:['cependant','bien que','parce que','donc'],
    answer:'parce que',
    hint:'"Parce que" answers the question "pourquoi ?" (why?).',
    explanation:'"<b>Parce que</b>" expresses cause/reason. Other causal connectors: <b>car, puisque, comme</b>. "Cependant" = however (concession). "Bien que" = although (concession + subjunctive). "Donc" = therefore (consequence).' }),

  makeMCQ({ id:'g6fr-sub-008', chapterId:'g6fr-subordonnees', difficulty:1,
    question:'Complete: "Il a demandé ___ j\'étais prêt."',
    options:['que','si','parce que','comme'],
    answer:'si',
    hint:'This is indirect speech for a yes/no question. Use "si" (if/whether).',
    explanation:'"Il a demandé <b>si</b> j\'étais prêt." — In indirect speech, yes/no questions use <b>si</b> (= whether): "Es-tu prêt?" → "Il a demandé si j\'étais prêt." Tense shift: es (présent) → étais (imparfait).' }),

  makeTF({ id:'g6fr-sub-009', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'"Qui" and "que" can always be used interchangeably in relative clauses.',
    answer:false,
    hint:'One is a subject pronoun, the other is an object pronoun — they serve different grammatical roles.',
    explanation:'<b>Faux (False).</b> <b>Qui</b> = subject of the relative clause. <b>Que</b> = object of the relative clause. They cannot be interchanged: "L\'homme qui parle" (who speaks — subject) vs "L\'homme que je vois" (whom I see — object).' }),

  makeMCQ({ id:'g6fr-sub-010', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complete: "C\'est l\'auteur ___ les romans sont célèbres."',
    options:['que','qui','dont','où'],
    answer:'dont',
    hint:'"Dont" is used here to express possession (les romans de l\'auteur).',
    explanation:'"C\'est l\'auteur <b>dont</b> les romans sont célèbres." — <b>Dont</b> replaces "de + noun" and shows possession: "les romans de l\'auteur" → "l\'auteur dont les romans sont célèbres". This is similar to "whose" in English: "the author whose novels are famous".' })

);
