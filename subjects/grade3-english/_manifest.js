'use strict';

const G3ENG_SYLLABUS = {
  'g3eng-listening': { subsections: [
    { id:'main_idea',       name:'Main Idea & Topic' },
    { id:'sequence_events', name:'Order of Events' },
    { id:'purpose_message', name:'Purpose of a Message' },
  ]},
  'g3eng-speaking': { subsections: [
    { id:'oral_vocabulary',      name:'Using New Words' },
    { id:'describing_retelling', name:'Describing & Retelling' },
    { id:'asking_answering',     name:'Questions & Answers' },
  ]},
  'g3eng-reading': { subsections: [
    { id:'reading_comprehension', name:'Reading Comprehension' },
    { id:'vocabulary_context',    name:'Word Meanings in Context' },
    { id:'text_features',         name:'Text Features' },
  ]},
  'g3eng-writing': { subsections: [
    { id:'creative_writing', name:'Creative Writing' },
    { id:'sentence_types',   name:'Types of Sentences' },
    { id:'punctuation',      name:'Punctuation' },
  ]},
  'g3eng-grammar': { subsections: [
    { id:'parts_of_speech',     name:'Parts of Speech' },
    { id:'verb_tenses',         name:'Verb Tenses' },
    { id:'punctuation_grammar', name:'Punctuation in Grammar' },
  ]},
  'g3eng-phonics': { subsections: [
    { id:'syllabication',  name:'Breaking Words into Syllables' },
    { id:'word_patterns',  name:'Word Patterns & Spelling' },
    { id:'spelling_rules', name:'Spelling Rules' },
  ]},
};

registerSubject({
  id:         'grade3-english',
  name:       'English',
  grade:      3,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  notesBased: true,
  noDifficulty: true,
  syllabus:   G3ENG_SYLLABUS,
  chapters: [
    {
      id: 'g3eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      notes: [
        'Find the **main idea** — what is the whole text mostly about?',
        'Listen for the **order** — what happened first, next, last?',
        'Notice **why** something was said: to inform, to entertain, to persuade, or to ask.',
        'Words like *first, then, after, finally* signal the order of events.',
      ],
    },
    {
      id: 'g3eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      notes: [
        'Use **new and interesting words** — instead of "nice" try "wonderful" or "exciting".',
        'When retelling, use: *First... Then... After that... Finally...*',
        'A good **description** names the thing, its colour, its size and what it does.',
        'Ask questions starting with: *Who? What? Where? When? Why? How?*',
      ],
    },
    {
      id: 'g3eng-reading', name: 'Reading', icon: '📚', examWeight: 1,
      notes: [
        'Read the whole passage, then read each question carefully.',
        'For "find" questions, use the **exact words from the passage**.',
        'Work out unknown words from the **context** — other words around them.',
        '**Text features** help you: titles, headings, pictures, captions, bold words.',
      ],
    },
    {
      id: 'g3eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      notes: [
        'Plan before you write: *Who? Where? What happened? How did it end?*',
        'Statement (.): gives information. Question (?): asks something. Exclamation (!): shows strong feeling.',
        'Use **commas** in a list: I bought apples, oranges, bananas and grapes.',
        'Make your writing interesting — add describing words and connectives.',
      ],
    },
    {
      id: 'g3eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      notes: [
        'Parts of speech: **noun** (naming), **verb** (action), **adjective** (describing), **adverb** (how/when/where).',
        '**Present tense**: I walk. **Past tense**: I walked. **Future tense**: I will walk.',
        'Irregular past tenses: go→went, see→saw, eat→ate, run→ran, have→had, come→came.',
        'A **full stop** ends a statement. A **question mark** ends a question. A **comma** separates list items.',
      ],
    },
    {
      id: 'g3eng-phonics', name: 'Phonics & Spelling', icon: '🔤', examWeight: 1,
      notes: [
        'Split words into syllables to spell them: *to-mor-row (3), won-der-ful (3)*.',
        'Common patterns: *-tion (nation), -ing (running), -ed (walked), -er (teacher)*.',
        'Double the consonant before adding -ing/-ed if the vowel is short: *run→running*.',
        'Silent letters: kn- (knee), wr- (write), -mb (lamb). Say the whole word, then spell it.',
      ],
    },
  ],
});
