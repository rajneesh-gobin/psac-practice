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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-noun-011', chapterId:'g6eng-nouns', difficulty:1,
    question:'Identify the ABSTRACT NOUN in the sentence: "Her kindness inspired everyone around her."',
    options:['Her','kindness','inspired','everyone'],
    answer:'kindness',
    hint:'Abstract nouns name qualities, emotions or ideas — things you cannot touch.',
    explanation:'"<b>Kindness</b>" is an abstract noun — it names a quality that cannot be physically seen or touched. The MIE Grade 6 English textbook teaches that abstract nouns often end in suffixes like <b>-ness</b> (kindness, darkness), <b>-ity</b> (equality, honesty), <b>-tion</b> (education, imagination), <b>-ment</b> (excitement, achievement), <b>-ance/-ence</b> (elegance, patience). Other examples: courage, freedom, sadness, wisdom, justice.' }),

  makeMCQ({ id:'g6eng-noun-012', chapterId:'g6eng-nouns', difficulty:1,
    question:'What is the collective noun for a group of FISH swimming together?',
    options:['a flock of fish','a pack of fish','a school of fish','a gaggle of fish'],
    answer:'a school of fish',
    hint:'Fish move together in a large, organised group — what is the specific collective noun?',
    explanation:'"<b>A school of fish</b>" (also acceptable: a shoal of fish). The MIE Grade 6 English textbook requires students to know these collective nouns: a <b>pride</b> of lions, a <b>flock</b> of birds/sheep, a <b>swarm</b> of bees, a <b>pack</b> of wolves, a <b>school/shoal</b> of fish, a <b>herd</b> of cattle, a <b>troop</b> of monkeys, a <b>gaggle</b> of geese, a <b>litter</b> of kittens, a <b>fleet</b> of ships, a <b>crew</b> of sailors.' }),

  makeMCQ({ id:'g6eng-noun-013', chapterId:'g6eng-nouns', difficulty:2,
    question:'Which sentence correctly uses a POSSESSIVE RELATIVE PRONOUN?',
    options:[
      'The dog which tail was wagging ran towards us.',
      'The dog that tail was wagging ran towards us.',
      'The dog whose tail was wagging ran towards us.',
      'The dog who tail was wagging ran towards us.'
    ],
    answer:'The dog whose tail was wagging ran towards us.',
    hint:'"Whose" shows possession — it can refer to people, animals OR things.',
    explanation:'"The dog <b>whose</b> tail was wagging ran towards us." — <b>Whose</b> is the possessive relative pronoun. Unlike "who" (only people), <b>whose</b> can refer to people, animals or things. It replaces a possessive structure: "the dog whose tail" = "the tail of the dog." MIE Grade 6 examples: "the student <b>whose</b> essay won", "the house <b>whose</b> roof is damaged."' }),

  makeTF({ id:'g6eng-noun-014', chapterId:'g6eng-nouns', difficulty:1,
    question:'Proper nouns are always written with a capital letter.',
    answer:true,
    hint:'Think of names of specific people, places, months and organisations.',
    explanation:'<b>True.</b> <b>Proper nouns</b> name specific, one-of-a-kind people, places, organisations, days, months or titles — they always begin with a capital letter: <b>Mauritius, Port Louis, Monday, January, Aapravasi Ghat, Indian Ocean</b>. Common nouns (island, city, river) are only capitalised at the start of a sentence. The MIE Grade 6 textbook includes Mauritian place names as examples of proper nouns.' }),

  makeMCQ({ id:'g6eng-noun-015', chapterId:'g6eng-nouns', difficulty:2,
    question:'Which sentence uses QUANTIFIERS correctly with countable and uncountable nouns?',
    options:[
      '"Much students attended the event."',
      '"Few water was left in the bottle."',
      '"Many students attended the event."',
      '"A few informations were given."'
    ],
    answer:'"Many students attended the event."',
    hint:'Many/few = countable nouns. Much/little = uncountable nouns.',
    explanation:'"<b>Many students</b> attended the event." — Quantifier rules from MIE Grade 6: <b>many / (a) few / several</b> go with <b>countable</b> nouns (students, books, chairs). <b>much / (a) little</b> go with <b>uncountable</b> nouns (water, information, advice, furniture). "Information" has no plural in English — say "a piece of information", never "informations".' }),

  makeMCQ({ id:'g6eng-noun-016', chapterId:'g6eng-nouns', difficulty:2,
    question:'"The committee has made its decision." — what type of noun is "committee"?',
    options:['abstract noun','collective noun','proper noun','compound noun'],
    answer:'collective noun',
    hint:'A collective noun names a group of people or things treated as a single unit.',
    explanation:'"<b>Committee</b>" is a collective noun — it names a group treated as one unit. The MIE Grade 6 textbook lists common collective nouns for groups of people: committee, jury, team, crew, staff, army, audience, crowd, cabinet, parliament. In British English, collective nouns can take a singular verb (group acts as one) or plural verb (members act individually): "The team <b>is</b> winning." / "The team <b>are</b> arguing."' }),

  makeMCQ({ id:'g6eng-noun-017', chapterId:'g6eng-nouns', difficulty:2,
    question:'Complete with the correct relative pronoun: "The book, ___ was first published in 1847, is extremely rare."',
    options:['that','which','who','whose'],
    answer:'which',
    hint:'The commas signal a non-defining clause. "That" is NEVER used in non-defining relative clauses.',
    explanation:'"The book, <b>which</b> was first published in 1847, is extremely rare." — The commas show this is a <b>non-defining (non-restrictive) relative clause</b>: it adds extra information that could be removed without changing the core meaning. Key rule: <b>never use "that" in a non-defining clause</b>. Use <b>which</b> for things and <b>who</b> for people in non-defining clauses.' }),

  makeMCQ({ id:'g6eng-noun-018', chapterId:'g6eng-nouns', difficulty:2,
    question:'Which of these is a COMPOUND NOUN?',
    options:['quickly','run','sunflower','beautiful'],
    answer:'sunflower',
    hint:'A compound noun is formed by joining two or more words together to create a new meaning.',
    explanation:'"<b>Sunflower</b>" is a compound noun (sun + flower). Compound nouns appear in three forms: (1) <b>one word</b>: sunflower, toothpaste, football, seashore; (2) <b>hyphenated</b>: mother-in-law, well-being; (3) <b>two words</b>: post office, swimming pool, ice cream, bus stop. The MIE Grade 6 textbook practises recognising compound nouns in reading passages.' }),

  makeMCQ({ id:'g6eng-noun-019', chapterId:'g6eng-nouns', difficulty:3,
    question:'"Neither the students nor the teacher ___ prepared for the surprise." — which verb form is correct?',
    options:['were','was','are','have been'],
    answer:'was',
    hint:'With "neither...nor", the verb agrees with the NEAREST subject (the one closest to the verb).',
    explanation:'"Neither the students nor the teacher <b>was</b> prepared." — The <b>proximity rule</b>: with <b>neither...nor</b> and <b>either...or</b>, the verb agrees with the nearest subject. Here "the teacher" (singular) is nearest → singular verb "was". If reversed: "Neither the teacher nor the students <b>were</b> prepared" — nearest subject "students" is plural → plural verb.' })

);
