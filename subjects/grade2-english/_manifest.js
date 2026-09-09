'use strict';

const G2ENG_SYLLABUS = {
  'g2eng-listening': { subsections: [
    { id:'sound_discrimination', name:'Telling Sounds Apart' },
    { id:'story_listening',      name:'Listening to Stories' },
    { id:'instruction_following',name:'Following Instructions' },
  ]},
  'g2eng-speaking': { subsections: [
    { id:'retelling',            name:'Retelling a Story' },
    { id:'describing_pictures',  name:'Describing Pictures' },
    { id:'conversation',         name:'Having a Conversation' },
  ]},
  'g2eng-reading': { subsections: [
    { id:'phonics_decoding',     name:'Sounding Out Words' },
    { id:'sight_words',          name:'Common Words' },
    { id:'reading_comprehension',name:'Understanding What You Read' },
  ]},
  'g2eng-writing': { subsections: [
    { id:'sentence_writing',     name:'Writing Sentences' },
    { id:'punctuation',          name:'Using Punctuation' },
    { id:'word_choice',          name:'Choosing the Right Word' },
  ]},
  'g2eng-grammar': { subsections: [
    { id:'nouns_pronouns',       name:'Nouns & Pronouns' },
    { id:'verbs_action',         name:'Action Words (Verbs)' },
    { id:'adjectives_describing',name:'Describing Words (Adjectives)' },
  ]},
  'g2eng-phonics': { subsections: [
    { id:'blends_digraphs',      name:'Blends & Digraphs' },
    { id:'word_families',        name:'Word Families' },
    { id:'vowel_sounds',         name:'Vowel Sounds' },
  ]},
};

registerSubject({
  id:         'grade2-english',
  name:       'English',
  grade:      2,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  notesBased: true,
  noDifficulty: true,
  syllabus:   G2ENG_SYLLABUS,
  chapters: [
    {
      id: 'g2eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      notes: [
        'Listen carefully to **hear the difference** between similar sounds, e.g. /b/ and /p/.',
        'When you listen to a story, remember: *Who is in it? What happened? How did it end?*',
        'Follow instructions in order — do the **first** thing first!',
        'Listening well means being **quiet** and looking at the speaker.',
      ],
    },
    {
      id: 'g2eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      notes: [
        'When you retell a story, say what happened **first, next, then and last**.',
        'Describe a picture by naming what you **see, hear, smell or feel**.',
        'In a conversation, **take turns** — listen, then speak.',
        'Use full sentences: "I can see a big red bus" instead of just "bus".',
      ],
    },
    {
      id: 'g2eng-reading', name: 'Reading', icon: '📚', examWeight: 1,
      notes: [
        'Blend letter sounds together to read new words: /c/ /a/ /t/ → cat.',
        'Common words to know by sight: *said, have, like, some, come, were, there, their, they, out, this*.',
        'After reading, ask yourself: *What was the story about? Who were the characters?*',
        'Use pictures and other words in the sentence to work out an unknown word.',
      ],
    },
    {
      id: 'g2eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      notes: [
        'Every sentence starts with a **capital letter** and ends with a **full stop**, **question mark** or **exclamation mark**.',
        'Leave a **space** between words.',
        'Choose words that tell exactly what you mean — "sprinted" is better than "went fast".',
        'A sentence must make sense on its own.',
      ],
    },
    {
      id: 'g2eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      notes: [
        'A **noun** names a person, place or thing. A **pronoun** replaces a noun: he, she, it, they.',
        'A **verb** shows what someone does: *run, eat, sleep, jump*.',
        'An **adjective** describes a noun: the *big* red *shiny* apple.',
        'Use **he/she** for one person; **they** for more than one.',
      ],
    },
    {
      id: 'g2eng-phonics', name: 'Phonics', icon: '🔤', examWeight: 1,
      notes: [
        '**Blends** are two consonants together: *bl, cl, tr, st, sp* (you hear both sounds).',
        '**Digraphs** are two letters that make one sound: *ch, sh, th, wh, ph*.',
        'Word families share the same ending: *-at (cat, bat, hat), -an (can, man, fan)*.',
        '**Long vowel** sounds say the letter name: c**a**ke, r**o**pe, h**e**, k**i**te, r**u**le.',
      ],
    },
  ],
});
