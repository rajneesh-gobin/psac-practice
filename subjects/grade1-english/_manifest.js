'use strict';

const G1ENG_SYLLABUS = {
  'g1eng-listening': { subsections: [
    { id:'sound_recognition', name:'Recognising Sounds' },
    { id:'rhymes_songs',      name:'Rhymes & Songs' },
    { id:'listening_comp',    name:'Listening & Understanding' },
  ]},
  'g1eng-speaking': { subsections: [
    { id:'greetings_phrases', name:'Greetings & Phrases' },
    { id:'naming_things',     name:'Naming Things' },
    { id:'short_talk',        name:'Talking in Sentences' },
  ]},
  'g1eng-reading': { subsections: [
    { id:'print_awareness',   name:'Print Awareness' },
    { id:'letter_recognition',name:'Letters & Sounds' },
    { id:'sight_words',       name:'Common Words' },
  ]},
  'g1eng-writing': { subsections: [
    { id:'letter_formation',  name:'Writing Letters' },
    { id:'copying_words',     name:'Copying Words' },
    { id:'basic_sentences',   name:'Simple Sentences' },
  ]},
  'g1eng-grammar': { subsections: [
    { id:'common_nouns',      name:'Naming Words' },
    { id:'articles_a_an',     name:'a and an' },
    { id:'basic_sentences',   name:'Putting a Sentence Together' },
  ]},
  'g1eng-phonics': { subsections: [
    { id:'initial_sounds',    name:'Starting Sounds' },
    { id:'rhyming_words',     name:'Rhyming Words' },
    { id:'syllables',         name:'Word Syllables' },
  ]},
};

registerSubject({
  id:         'grade1-english',
  name:       'English',
  grade:      1,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  notesBased: true,
  noDifficulty: true,
  syllabus:   G1ENG_SYLLABUS,
  chapters: [
    {
      id: 'g1eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      notes: [
        'We use our **ears** to listen to sounds around us.',
        'English has special sounds — listen carefully to how each letter sounds.',
        '**Rhymes** are words that end with the same sound, like cat and hat.',
        'When you listen to a story, think: *Who? What? Where?*',
      ],
    },
    {
      id: 'g1eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      notes: [
        'Say **hello** and **good morning** when you greet someone.',
        'Use **please** and **thank you** when you speak.',
        'To describe something, tell its colour, size and shape.',
        'A **sentence** starts with a capital letter and ends with a full stop.',
      ],
    },
    {
      id: 'g1eng-reading', name: 'Reading Readiness', icon: '📚', examWeight: 1,
      notes: [
        'We read from **left to right** in English.',
        'The **alphabet** has 26 letters — 5 vowels (a, e, i, o, u) and 21 consonants.',
        'A **word** is a group of letters that means something.',
        'Look at pictures for clues about what a story is about.',
      ],
    },
    {
      id: 'g1eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      notes: [
        'Sit up straight and hold your pencil the right way.',
        'Write letters starting from the top.',
        'Capital letters are **big**, small letters are **little**.',
        'Leave a space between each word when you write.',
      ],
    },
    {
      id: 'g1eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      notes: [
        'A **noun** is a naming word — it names a person, place or thing. e.g. *dog, school, girl*.',
        'Use **a** before words that start with a consonant sound: *a cat, a ball*.',
        'Use **an** before words that start with a vowel sound: *an apple, an egg*.',
        'A simple sentence has a subject and a verb: *The dog runs.*',
      ],
    },
    {
      id: 'g1eng-phonics', name: 'Phonics', icon: '🔤', examWeight: 1,
      notes: [
        'Every letter has a **sound**. "S" says /s/ like in *sun*.',
        'Words that **rhyme** have the same ending sound: *hat, cat, bat*.',
        'You can break long words into parts called **syllables**: ba-na-na (3 parts).',
        'The letters a, e, i, o, u are called **vowels**.',
      ],
    },
  ],
});
