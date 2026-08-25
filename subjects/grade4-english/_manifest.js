'use strict';
registerSubject({
  id: 'grade4-english', name: 'English', grade: 4, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  chapters: [
    {
      id: 'g4eng-nouns', name: 'Nouns, Pronouns & Articles', icon: '📝',
      notes: [
        'A **noun** names a person, place, thing or idea. e.g. *teacher, Mauritius, book, happiness*',
        '**Common nouns** are general (dog, city). **Proper nouns** are specific names (Priya, Port Louis) - always start with a capital letter.',
        '**Collective nouns** name groups: a flock of birds, a school of fish, a herd of cows, a pack of wolves.',
        '**Abstract nouns** name feelings or ideas: love, happiness, courage, freedom.',
        '**Articles**: *a* (before consonant sound), *an* (before vowel sound), *the* (specific/unique thing).',
        '**Pronouns** replace nouns: I, you, he, she, it, we, they, me, him, her, us, them.',
        'Irregular plurals must be memorised: child→children, man→men, woman→women, tooth→teeth, foot→feet, mouse→mice.',
      ],
    },
    {
      id: 'g4eng-verbs', name: 'Verbs & Tenses', icon: '🏃',
      notes: [
        'A **verb** shows an action or state of being: *run, eat, is, was*.',
        '**Present simple**: He *walks* to school every day. (he/she/it → add -s or -es)',
        '**Past simple**: She *walked* yesterday. (regular verbs → add -ed)',
        '**Irregular past tenses** must be memorised: go→went, see→saw, eat→ate, run→ran, come→came, have→had.',
        '**Present continuous**: I *am reading* right now. (am/is/are + verb-ing)',
        '**Verb "to be"**: I am, you are, he/she/it is, we are, they are. Past: was/were.',
      ],
    },
    {
      id: 'g4eng-adjectives', name: 'Adjectives & Adverbs', icon: '🎨',
      notes: [
        'An **adjective** describes a noun: the *tall* tree, a *red* dress, *three* books.',
        'An **adverb** describes a verb: she runs *quickly*. Most adverbs end in -ly.',
        '**Comparative** (comparing two): short adjectives → add -er (tall→taller, big→bigger). Long adjectives → more + adjective (more beautiful).',
        '**Superlative** (comparing three or more): short adjectives → add -est (tall→tallest). Long adjectives → most + adjective (most beautiful).',
        'Irregular forms: good→better→best. bad→worse→worst.',
        'Never double the comparison: write "the tallest" NOT "the most tallest".',
      ],
    },
    {
      id: 'g4eng-sentences', name: 'Sentences & Punctuation', icon: '❓',
      notes: [
        'A **sentence** must have a subject and a verb. It starts with a capital letter.',
        'Types: **Statement** (.) - gives information. **Question** (?) - asks something. **Exclamation** (!) - shows strong feeling. **Command** (.) - gives an order.',
        '**Comma** (,): separates items in a list: I bought milk, bread and eggs.',
        '**Apostrophe** (\'): contraction (don\'t = do not) or possession (Tom\'s book).',
        '**Inverted commas** (" "): show direct speech - She said, "Come here!"',
        'Every new sentence starts with a capital letter. Proper nouns always use capitals.',
      ],
    },
    {
      id: 'g4eng-comprehension', name: 'Reading Comprehension', icon: '🔍',
      notes: [
        'Read the passage **at least twice** before answering questions.',
        'For "find" questions: use the exact words from the passage.',
        'For "explain" questions: use your own words and give a reason.',
        'Underline key words in each question before you look for the answer.',
        'Check the number of marks - give that many points in your answer.',
        'Vocabulary questions: use surrounding sentences to work out word meanings.',
      ],
    },
    {
      id: 'g4eng-vocabulary', name: 'Vocabulary & Word Study', icon: '🔤',
      notes: [
        'A **synonym** is a word with a similar meaning: happy → joyful, big → large.',
        'An **antonym** is a word with the opposite meaning: hot ↔ cold, happy ↔ sad.',
        'A **prefix** is added to the start: un- (unhappy), re- (redo), dis- (disagree).',
        'A **suffix** is added to the end: -ful (joyful), -less (careless), -ness (kindness), -ly (quickly).',
        '**Homophones** sound the same but have different spellings/meanings: there/their/they\'re, to/too/two, hear/here.',
        'Use **context clues** - surrounding words - to work out the meaning of unknown words.',
      ],
    },
    {
      id: 'g4eng-passages', name: 'Passages & Text Types', icon: '📄',
      notes: [
        'A **text type** is the kind of writing you are reading. Each type looks different on the page.',
        '**Story (narrative)**: has characters, a setting, a problem and an ending. Told in order.',
        '**Poster / notice**: must answer WHAT, WHEN, WHERE and HOW MUCH. Big bold words, short lines.',
        '**Postcard**: a very short message on the left, the address on the right. Only the best bits fit.',
        '**Instructions (recipe, how-to)**: a list of what you need, then **numbered steps** in the right order.',
        'Words in **brackets** and **small print** usually hide the exceptions - always read them.',
        'Before you answer, ask yourself: *what kind of text is this?* The type tells you where to look.',
      ],
    },
  ],
});
