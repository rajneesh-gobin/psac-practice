'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Adding a subsection means tagging questions for it.
// Trailing comments are the question count at the time of generation.
const G6ENG_SYLLABUS = {
  'g6eng-nouns': { subsections: [
    { id:'cloze',           name:'Gap-fill (Past Paper Style)' },  // 15
    { id:'plurals',         name:'Plurals' },  // 2
    { id:'collective',      name:'Collective Nouns' },  // 3
    { id:'abstract',        name:'Abstract Nouns' },  // 1
    { id:'pronouns',        name:'Pronouns' },  // 5
    { id:'determiners',     name:'Determiners & Quantifiers' },  // 3
    { id:'common_proper',   name:'Common & Proper Nouns' },  // 8
  ]},
  'g6eng-verbs': { subsections: [
    { id:'cloze',           name:'Gap-fill (Past Paper Style)' },  // 11
    { id:'voice',           name:'Active & Passive Voice' },  // 6
    { id:'auxiliary',       name:'Auxiliary & Modal Verbs' },  // 3
    { id:'past_tense',      name:'Past Tense' },  // 2
    { id:'future_tense',    name:'Future Tense' },  // 1
    { id:'continuous',      name:'Continuous Tense' },  // 2
    { id:'perfect',         name:'Perfect Tense' },  // 3
    { id:'present_tense',   name:'Present Tense' },  // 5
  ]},
  'g6eng-clauses': { subsections: [
    { id:'cloze',           name:'Gap-fill (Past Paper Style)' },  // 9
    { id:'clause_types',    name:'Main & Subordinate Clauses' },  // 18
    { id:'conjunctions',    name:'Conjunctions' },  // 3
    { id:'punctuation',     name:'Punctuation' },  // 1
  ]},
  'g6eng-comprehension': { subsections: [
    { id:'evidence',        name:'Using Evidence (PEE)' },  // 2
    { id:'language',        name:'Language & Literary Devices' },  // 4
    { id:'vocabulary',      name:'Word Meaning in Context' },  // 5
    { id:'authors_view',    name:'The Writer\'s Purpose & Tone' },  // 3
    { id:'inference',       name:'Reading Between the Lines' },  // 4
    { id:'retrieval',       name:'Finding the Answer in the Text' },  // 26
  ]},
  'g6eng-writing': { subsections: [
    { id:'planning',        name:'Planning & Structure' },  // 15
    { id:'formal_letter',   name:'Formal Letters' },  // 3
    { id:'descriptive',     name:'Descriptive Writing' },  // 1
    { id:'essay',           name:'Essays & Argument' },  // 5
  ]},
  'g6eng-vocabulary': { subsections: [
    { id:'cloze',           name:'Gap-fill (Past Paper Style)' },  // 25
    { id:'picture_words',   name:'Words from Pictures' },  // 7
    { id:'word_roots',      name:'Latin & Greek Roots' },  // 7
    { id:'confusables',     name:'Easily Confused Words' },  // 4
    { id:'antonyms',        name:'Antonyms' },  // 1
    { id:'prefix_suffix',   name:'Prefixes & Suffixes' },  // 2
    { id:'homophones',      name:'Homophones' },  // 3
    { id:'meaning',         name:'Word Meanings' },  // 10
  ]},
  'g6eng-passages': { subsections: [
    { id:'letter',          name:'Letters' },  // 8
    { id:'advert',          name:'Adverts, Posters & Notices' },  // 4
    { id:'report',          name:'Newspaper Reports' },  // 14
    { id:'story',           name:'Stories & Legends' },  // 5
  ]},
};


// ── Subject-specific badges ────────────────────
// Added to engine/registry.js GENERIC_BADGES for this pack only.
// pct() is from engine/helpers.js. Badge ids are permanent - see registry.js.
const G6E_BADGES = [
  { id:'g6e_clause_master', name:'Clause Master', icon:'🔗',
    desc:'Score 80%+ in Clauses',
    cond: (s,c) => pct(c['g6eng-clauses']) >= 80 },
  { id:'g6e_comp_king',     name:'Comprehension King', icon:'👑',
    desc:'Score 80%+ in Comprehension',
    cond: (s,c) => pct(c['g6eng-comprehension']) >= 80 },
  { id:'g6e_storyteller',   name:'Storyteller', icon:'🖋️',
    desc:'Score 80%+ in Writing',
    cond: (s,c) => pct(c['g6eng-writing']) >= 80 },
];

registerSubject({
  id: 'grade6-english', name: 'English', grade: 6, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  badges: G6E_BADGES,
  syllabus: G6ENG_SYLLABUS,
  chapters: [
    {
      id: 'g6eng-nouns', name: 'Nouns, Pronouns & Determiners', icon: '📝',
      notes: [
        '**Abstract nouns** name ideas/feelings: courage, justice, beauty.',
        '**Collective nouns**: a flock of birds, a pride of lions, a swarm of bees.',
        '**Relative pronouns**: who (person), which (thing), that (person or thing), whose (possession).',
        '**Determiners**: articles (a, an, the), demonstratives (this, that, these, those), possessives (my, your, his, her).',
        '**Indefinite pronouns**: everyone, nobody, something, anywhere - always singular verb.',
      ],
    },
    {
      id: 'g6eng-verbs', name: 'Verbs, Tenses & Voice', icon: '🏃',
      notes: [
        '**Present perfect**: have/has + past participle. "She has visited Paris." (past with present relevance)',
        '**Past perfect**: had + past participle. "They had already left when I arrived."',
        '**Future perfect**: will have + past participle. "By June, I will have finished."',
        '**Active voice**: The dog bit the boy. **Passive voice**: The boy was bitten by the dog.',
        'To convert: Object → Subject | verb → be + past participle | Subject → by + agent.',
        '**Modal verbs**: can, could, may, might, shall, should, will, would, must, ought to.',
      ],
    },
    {
      id: 'g6eng-clauses', name: 'Clauses & Sentence Structure', icon: '🔗',
      notes: [
        'A **main clause** can stand alone. A **subordinate clause** cannot.',
        '**Conjunctions** join clauses: *because, although, while, unless, until, since, when, if*.',
        '**Relative clauses**: "The boy who won the race is my brother." (who, which, that, whose)',
        '**Conditional sentences**: If + present, will (Type 1). If + past, would (Type 2). If + past perfect, would have (Type 3).',
        '**Reported speech**: "I am happy" → She said (that) she was happy. Tense shifts back.',
      ],
    },
    {
      id: 'g6eng-comprehension', name: 'Reading & Critical Thinking', icon: '🔍',
      notes: [
        '**Inference** questions: The answer is not directly stated - deduce from clues.',
        '**Author\'s purpose**: to inform, to persuade, to entertain, to describe.',
        '**Tone**: formal, informal, serious, humorous, ironic, sympathetic.',
        '**Literary devices**: simile (like/as), metaphor (is), personification, onomatopoeia, alliteration.',
        'For language questions: quote the technique → name it → explain its effect.',
        'PEE structure: **Point** → **Evidence** (quote) → **Explain**.',
      ],
    },
    {
      id: 'g6eng-writing', name: 'Essay & Formal Writing', icon: '✏️',
      notes: [
        '**Essay structure**: Introduction (hook + thesis) → Body paragraphs (point + evidence + explanation) → Conclusion (summary + final thought).',
        '**Formal letter**: Date | Address | Dear Sir/Madam | Body | Yours faithfully/sincerely | Name.',
        '**Argumentative writing**: state your position, give 3+ reasons, address counterarguments, conclude strongly.',
        '**Descriptive writing**: engage all 5 senses, use vivid adjectives, vary sentence length for effect.',
        'Transition words: *Furthermore, In addition, However, On the other hand, In conclusion, Therefore*.',
      ],
    },
    {
      id: 'g6eng-vocabulary', name: 'Advanced Vocabulary', icon: '🔤',
      notes: [
        '**Homonyms** - same spelling/sound, different meaning: bear (animal / to carry), bank (river bank / financial bank).',
        '**Homophones**: affect/effect, principle/principal, stationary/stationery, complement/compliment.',
        '**Etymology**: knowing roots helps - *port* (carry): transport, import, export, portable.',
        'Greek roots: *tele* (far), *bio* (life), *geo* (earth), *photo* (light), *micro* (small).',
        'Latin roots: *aud* (hear), *vis* (see), *scrib* (write), *dict* (say), *rupt* (break).',
      ],
    },
    {
      id: 'g6eng-passages', name: 'Passages & Text Types', icon: '📄',
      notes: [
        '**Formal letter**: the RE: line states the request. *Dear Sir/Madam* → *Yours faithfully*; *Dear Mr Smith* → *Yours sincerely*.',
        '**Newspaper report**: written as an **inverted pyramid** - the first paragraph carries who, what, where and when.',
        'A fair report gives **balance** (more than one view). An **unnamed source** cannot be checked, so weigh it less.',
        '**Advertisement**: an asterisk (*) always leads to small print. Work out the **real total cost**, not the headline price.',
        'Judge a statistic by the **sample** it came from: 40 people at a launch event do not represent everyone.',
        '**Legend / folktale**: phrases like *so the old people say* mark oral tradition. Legends end with a **moral**.',
        '**Report with a table**: check a claim against **every row**, and use the text to interpret the figures.',
        'Watch the verbs: *is considering* is not *has decided*. Whole marks turn on one word.',
      ],
    },
  ],
});
