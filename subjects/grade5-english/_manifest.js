'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Adding a subsection means tagging questions for it.
// Trailing comments are the question count at the time of generation.
const G5ENG_SYLLABUS = {
  'eng-nouns': { subsections: [
    { id:'articles',        name:'Articles: a, an, the' },  // 2
    { id:'plurals',         name:'Plurals' },  // 1
    { id:'collective',      name:'Collective Nouns' },  // 6
    { id:'abstract',        name:'Abstract Nouns' },  // 4
    { id:'pronouns',        name:'Pronouns' },  // 5
    { id:'determiners',     name:'Determiners & Quantifiers' },  // 1
    { id:'common_proper',   name:'Common & Proper Nouns' },  // 12
  ]},
  'eng-verbs': { subsections: [
    { id:'voice',           name:'Active & Passive Voice' },  // 4
    { id:'agreement',       name:'Subject-Verb Agreement' },  // 1
    { id:'auxiliary',       name:'Auxiliary & Modal Verbs' },  // 4
    { id:'past_tense',      name:'Past Tense' },  // 3
    { id:'future_tense',    name:'Future Tense' },  // 2
    { id:'continuous',      name:'Continuous Tense' },  // 1
    { id:'perfect',         name:'Perfect Tense' },  // 5
    { id:'present_tense',   name:'Present Tense' },  // 10
    { id:'in_context',      name:'Finding Them in a Sentence' },  // 1
  ]},
  'eng-adjectives': { subsections: [
    { id:'comparatives',    name:'Comparatives & Superlatives' },  // 9
    { id:'adverbs',         name:'Adverbs' },  // 5
    { id:'order',           name:'Order of Adjectives' },  // 3
    { id:'in_context',      name:'Finding Them in a Sentence' },  // 2
    { id:'adjectives',      name:'Adjectives' },  // 12
  ]},
  'eng-sentences': { subsections: [
    { id:'punctuation',     name:'Punctuation' },  // 21
    { id:'types',           name:'Types of Sentence' },  // 3
    { id:'direct_speech',   name:'Direct & Reported Speech' },  // 4
    { id:'in_context',      name:'Finding Them in a Sentence' },  // 3
  ]},
  'eng-comprehension': { subsections: [
    { id:'vocabulary',      name:'Word Meaning in Context' },  // 6
    { id:'main_idea',       name:'Main Idea & Title' },  // 2
    { id:'authors_view',    name:'The Writer\'s Purpose & Tone' },  // 2
    { id:'inference',       name:'Reading Between the Lines' },  // 4
    { id:'retrieval',       name:'Finding the Answer in the Text' },  // 17
  ]},
  'eng-writing': { subsections: [
    { id:'planning',        name:'Planning & Structure' },  // 18
    { id:'formal_letter',   name:'Formal Letters' },  // 4
    { id:'informal',        name:'Informal Writing' },  // 1
    { id:'descriptive',     name:'Descriptive Writing' },  // 3
    { id:'figurative',      name:'Figurative Language' },  // 5
  ]},
  'eng-vocabulary': { subsections: [
    { id:'picture_words',   name:'Words from Pictures' },  // 6
    { id:'synonyms',        name:'Synonyms' },  // 2
    { id:'antonyms',        name:'Antonyms' },  // 3
    { id:'prefix_suffix',   name:'Prefixes & Suffixes' },  // 6
    { id:'meaning',         name:'Word Meanings' },  // 13
    { id:'context_clues',   name:'Using Context Clues' },  // 1
  ]},
  'eng-spelling': { subsections: [
    { id:'rules',           name:'Spelling Rules' },  // 1
    { id:'plurals',         name:'Plurals' },  // 2
    { id:'common_errors',   name:'Commonly Misspelt Words' },  // 28
  ]},
  'eng-passages': { subsections: [
    { id:'letter',          name:'Letters' },  // 10
    { id:'story',           name:'Stories & Legends' },  // 8
    { id:'recount',         name:'Recounts, Diaries & Postcards' },  // 1
    { id:'poem',            name:'Poems' },  // 2
  ]},
};


// ── Subject-specific badges ────────────────────
// Awarded ON TOP of engine/registry.js GENERIC_BADGES. Only list badges that
// are genuinely about this subject's chapters - anything a Science or Maths
// student could also earn belongs in GENERIC_BADGES instead.
// pct() is from engine/helpers.js and is null-safe on untouched chapters.
// ⚠ Badge ids are permanent: they are stored in DB.badges. Never reuse or
//   rename one, or previously-earned badges vanish from a student's profile.
const G5E_BADGES = [
  { id:'g5e_grammar_guru', name:'Grammar Guru', icon:'✍️',
    desc:'Score 80%+ in Nouns and in Verbs',
    cond: (s,c) => pct(c['eng-nouns']) >= 80 && pct(c['eng-verbs']) >= 80 },
  { id:'g5e_comp_king',    name:'Comprehension King', icon:'👑',
    desc:'Score 80%+ in Comprehension',
    cond: (s,c) => pct(c['eng-comprehension']) >= 80 },
  { id:'g5e_word_smith',   name:'Word Smith', icon:'📚',
    desc:'Master Vocabulary and Spelling',
    cond: (s,c) => pct(c['eng-vocabulary']) >= 80 && pct(c['eng-spelling']) >= 80 },
];

registerSubject({
  id: 'grade5-english', name: 'English', grade: 5, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  badges: G5E_BADGES,
  syllabus: G5ENG_SYLLABUS,
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
        'Always check how many marks a question is worth - give that many points in your answer.',
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
        'Homophones - sound the same but different spelling/meaning: there/their/they\'re, to/too/two, wear/where/were.',
        'Practice strategy: **Look, Cover, Write, Check**.',
      ],
    },
    {
      id: 'eng-passages', name: 'Passages & Text Types', icon: '📄',
      notes: [
        '**Email**: From / To / Cc / Subject. The **Subject** line states the purpose in a few words. **Cc** = people who get a copy.',
        '**Informal letter**: writer\'s address top right, "Dear …", personal news, ends "With love". Formal letters end "Yours sincerely/faithfully".',
        '**Personal recount (narrative)**: told with *I*, starts at one particular moment, uses similes and feelings.',
        '**Advertisement / announcement**: bold key facts, a deadline, and **conditions in brackets** that change the price.',
        '**Poem**: look for **simile** (like / as), **metaphor** (X *is* Y) and **personification** (an object given human actions).',
        'When a question asks *how do we know*, point to the **evidence** - a number, a date, a quoted phrase.',
        'Match every number in a text to the noun it belongs to. Papers set traps with two similar figures.',
      ],
    },
  ],
});
