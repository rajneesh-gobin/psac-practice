'use strict';
registerSubject({
  id: 'grade5-english', name: 'English', grade: 5, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true,
  chapters: [
    {
      id: 'eng-nouns', name: 'Nouns, Pronouns & Articles', icon: '📝',
      notes: [
        'A **noun** names a person, place, thing or idea. e.g. *teacher, Mauritius, book, happiness*',
        '**Common nouns** are general (dog, city). **Proper nouns** are specific names (Max, Port Louis).',
        '**Pronouns** replace nouns: I, you, he, she, it, we, they, me, him, her, us, them.',
        '**Articles**: *a* (before consonant sound), *an* (before vowel sound), *the* (specific thing).',
        'Tip: If you can put *the* in front of it, it is usually a noun.',
      ],
    },
    {
      id: 'eng-verbs', name: 'Verbs & Tenses', icon: '🏃',
      notes: [
        'A **verb** shows an action or state of being: *run, think, is, was*.',
        '**Present simple**: He *walks* to school every day.',
        '**Past simple**: She *walked* to school yesterday. (Add -ed for regular verbs.)',
        '**Future**: They *will walk* tomorrow. / They *are going to walk* tomorrow.',
        '**Present continuous**: I *am walking* right now. (am/is/are + verb-ing)',
        'Irregular verbs do NOT follow -ed rule: go→went, see→saw, have→had, be→was/were.',
      ],
    },
    {
      id: 'eng-adjectives', name: 'Adjectives & Adverbs', icon: '🎨',
      notes: [
        'An **adjective** describes a noun: the *tall* tree, a *blue* sky.',
        'An **adverb** describes a verb, adjective or another adverb: she runs *quickly*.',
        'Most adverbs are formed by adding **-ly** to an adjective: slow → slowly, happy → happily.',
        '**Comparatives**: tall → taller, big → bigger. Use *more* for long words: beautiful → more beautiful.',
        '**Superlatives**: tall → tallest, big → biggest. / most beautiful.',
      ],
    },
    {
      id: 'eng-sentences', name: 'Sentences & Punctuation', icon: '❓',
      notes: [
        'A **sentence** must have a subject and a verb. "The cat sat." ✓ / "The cat." ✗',
        'Types: **Statement** (.), **Question** (?), **Exclamation** (!), **Command** (.)',
        '**Comma** (,): separates items in a list or joins clauses. "I like cats, dogs and fish."',
        '**Apostrophe** (\'): shows possession (Tom\'s book) or contraction (don\'t = do not).',
        '**Inverted commas** (" "): show direct speech. She said, "Hello!"',
        '**Colon** (:): introduces a list. I need: milk, eggs and bread.',
      ],
    },
    {
      id: 'eng-comprehension', name: 'Reading Comprehension', icon: '🔍',
      notes: [
        'Read the passage **at least twice** before answering.',
        'For "find" questions: use exact words from the text.',
        'For "explain" questions: use your own words and give reasons.',
        'For "what do you think?" questions: give your opinion + evidence from the text.',
        'Underlining key words in questions helps you focus on what to look for.',
        'Always check how many marks a question is worth — give that many points in your answer.',
      ],
    },
    {
      id: 'eng-writing', name: 'Creative Writing', icon: '✏️',
      notes: [
        'Plan before you write: **Beginning** (introduce setting & character), **Middle** (problem/event), **End** (resolution).',
        'Use **AFOREST** techniques: Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triples.',
        'Vary your sentence starters: avoid starting every sentence with "I" or "The".',
        'Use **show don\'t tell**: instead of "He was scared", write "His hands trembled."',
        'Paragraphs: new idea = new paragraph. Leave a line or indent.',
        'Check SPAG at the end: Spelling, Punctuation and Grammar.',
      ],
    },
    {
      id: 'eng-vocabulary', name: 'Vocabulary & Word Study', icon: '🔤',
      notes: [
        'A **synonym** is a word with a similar meaning: happy → joyful, big → enormous.',
        'An **antonym** is a word with the opposite meaning: hot ↔ cold, love ↔ hate.',
        'A **prefix** is added to the start of a word: un-, re-, pre-, mis-, dis-.',
        'A **suffix** is added to the end: -ful, -less, -tion, -ness, -ly, -ing, -ed.',
        'Context clues: use surrounding words to guess the meaning of an unknown word.',
      ],
    },
    {
      id: 'eng-spelling', name: 'Spelling & Dictation', icon: '🔡',
      notes: [
        'Learn the **ie/ei** rule: i before e except after c (believe, receive).',
        'Silent letters: know, wrap, knight, write, gnat, bomb.',
        'Double consonants: running (run+n+ing), sitting, stopped, beginning.',
        'Homophones — sound the same but different spelling/meaning: there/their/they\'re, to/too/two, wear/where/were.',
        'Practice strategy: **Look, Cover, Write, Check**.',
      ],
    },
  ],
});
