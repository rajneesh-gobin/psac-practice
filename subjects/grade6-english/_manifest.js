'use strict';
registerSubject({
  id: 'grade6-english', name: 'English', grade: 6, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true,
  chapters: [
    {
      id: 'g6eng-nouns', name: 'Nouns, Pronouns & Determiners', icon: '📝',
      notes: [
        '**Abstract nouns** name ideas/feelings: courage, justice, beauty.',
        '**Collective nouns**: a flock of birds, a pride of lions, a swarm of bees.',
        '**Relative pronouns**: who (person), which (thing), that (person or thing), whose (possession).',
        '**Determiners**: articles (a, an, the), demonstratives (this, that, these, those), possessives (my, your, his, her).',
        '**Indefinite pronouns**: everyone, nobody, something, anywhere — always singular verb.',
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
        '**Inference** questions: The answer is not directly stated — deduce from clues.',
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
        '**Homonyms** — same spelling/sound, different meaning: bear (animal / to carry), bank (river bank / financial bank).',
        '**Homophones**: affect/effect, principle/principal, stationary/stationery, complement/compliment.',
        '**Etymology**: knowing roots helps — *port* (carry): transport, import, export, portable.',
        'Greek roots: *tele* (far), *bio* (life), *geo* (earth), *photo* (light), *micro* (small).',
        'Latin roots: *aud* (hear), *vis* (see), *scrib* (write), *dict* (say), *rupt* (break).',
      ],
    },
  ],
});
