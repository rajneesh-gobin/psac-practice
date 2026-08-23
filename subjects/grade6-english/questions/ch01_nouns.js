'use strict';
// Grade 6 English — Chapter: Nouns, Pronouns & Determiners
// IDs format: g6eng-noun-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-noun-001', chapterId:'g6eng-nouns', difficulty:1,
    question:'Which of these is a COLLECTIVE noun?',
    options:['happiness','pride','quickly','enormous'],
    answer:'pride',
    hint:'A collective noun names a group. "A pride of ___".',
    explanation:'"<b>Pride</b>" is a collective noun — a pride of lions. Other collective nouns: a flock of birds, a swarm of bees, a class of students, a pack of wolves, a fleet of ships.' }),

  makeMCQ({ id:'g6eng-noun-002', chapterId:'g6eng-nouns', difficulty:2,
    question:'Choose the correct RELATIVE PRONOUN: "The girl ___ won the prize is my sister."',
    options:['which','whose','who','that thing'],
    answer:'who',
    hint:'"Who" is used for people. "Which" is used for things.',
    explanation:'"The girl <b>who</b> won the prize is my sister." — Use <b>who</b> for people and <b>which</b> for things. "That" can replace either. "Whose" shows possession: "The girl whose drawing won..." ' }),

  makeMCQ({ id:'g6eng-noun-003', chapterId:'g6eng-nouns', difficulty:2,
    question:'Which sentence is correct? (Indefinite pronoun — singular verb)',
    options:[
      'Everyone are invited to the party.',
      'Nobody were present.',
      'Someone has left their bag.',
      'All of them is coming.'
    ],
    answer:'Someone has left their bag.',
    hint:'Indefinite pronouns (everyone, nobody, someone) always take a SINGULAR verb.',
    explanation:'"<b>Someone has</b> left their bag" — indefinite pronouns (everyone, nobody, someone, something, anywhere) are always treated as singular: "Everyone <b>is</b> invited." "Nobody <b>was</b> present."' }),

  makeMCQ({ id:'g6eng-noun-004', chapterId:'g6eng-nouns', difficulty:2,
    question:'"I met the man ___ car had broken down." — which relative pronoun is correct?',
    options:['who','which','whose','whom'],
    answer:'whose',
    hint:'"Whose" shows possession — the car belonged to the man.',
    explanation:'"I met the man <b>whose</b> car had broken down." — <b>Whose</b> is the possessive relative pronoun, showing that the car belongs to the man. It can refer to people or things: "the book whose cover is torn."' }),

  makeTF({ id:'g6eng-noun-005', chapterId:'g6eng-nouns', difficulty:1,
    question:'"This", "that", "these" and "those" are examples of demonstrative determiners.',
    answer:true,
    hint:'Determiners come before nouns to introduce them — demonstratives point to specific things.',
    explanation:'<b>True.</b> Demonstrative determiners point to specific nouns: <b>this</b> book (near, singular), <b>that</b> book (far, singular), <b>these</b> books (near, plural), <b>those</b> books (far, plural). They are also called demonstrative adjectives.' }),

  makeMCQ({ id:'g6eng-noun-006', chapterId:'g6eng-nouns', difficulty:2,
    question:'What type of noun is "justice"?',
    options:['proper noun','collective noun','concrete noun','abstract noun'],
    answer:'abstract noun',
    hint:'Can you touch, see or hear justice directly?',
    explanation:'"<b>Justice</b>" is an abstract noun — it names a concept or idea that has no physical form. Abstract nouns: courage, happiness, freedom, beauty, honesty, knowledge.' }),

  makeMCQ({ id:'g6eng-noun-007', chapterId:'g6eng-nouns', difficulty:2,
    question:'Which sentence uses the correct determiner?',
    options:[
      'I need a advice from you.',
      'She gave me an useful tip.',
      'He showed great enthusiasm.',
      'We saw a amazing show.'
    ],
    answer:'He showed great enthusiasm.',
    hint:'Determiners must match the noun: "a" before consonant sounds, "an" before vowel sounds. Some nouns (uncountable) don\'t use a/an.',
    explanation:'"<b>He showed great enthusiasm</b>" — "enthusiasm" is uncountable, so no a/an. Errors: "a advice" → "some advice" (uncountable). "an useful" → "a useful" (u makes a "y" sound = consonant). "a amazing" → "an amazing".' }),

  makeMCQ({ id:'g6eng-noun-008', chapterId:'g6eng-nouns', difficulty:2,
    question:'"The book ___ I borrowed from the library was fascinating." — correct relative pronoun?',
    options:['who','whose','whom','which'],
    answer:'which',
    hint:'"Which" (or "that") is used for things — a book is a thing.',
    explanation:'"The book <b>which</b> I borrowed..." — use <b>which</b> or <b>that</b> for things (non-people). "Who/whom/whose" are used for people. In this sentence, "that" could also replace "which".' }),

  makeTF({ id:'g6eng-noun-009', chapterId:'g6eng-nouns', difficulty:2,
    question:'In the sentence "Every student must bring their own pen", the use of "their" is acceptable even though "every student" is singular.',
    answer:true,
    hint:'Modern English accepts "singular they" as a gender-neutral pronoun.',
    explanation:'<b>True.</b> Using the plural pronoun "their" with a singular indefinite subject (every student, each person, anyone) is widely accepted in modern English to avoid assuming gender. This is called the "singular they".' }),

  makeMCQ({ id:'g6eng-noun-010', chapterId:'g6eng-nouns', difficulty:1,
    question:'Which is a correct example of a collective noun for BEES?',
    options:['a gang of bees','a colony of bees','a pack of bees','a troop of bees'],
    answer:'a colony of bees',
    hint:'Bees live together in a large organised group — what is the specific collective noun?',
    explanation:'"<b>A colony of bees</b>" (also: a swarm of bees). Other collective nouns: a gang of thieves, a pack of wolves, a troop of monkeys, a flock of birds, a school of fish, a pride of lions.' })

);
