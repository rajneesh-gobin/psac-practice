'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 - English   ·   SYLLABUS ONLY, NO QUESTIONS YET
//
//  Chapters below are the real MIE lower-secondary syllabus, taken from the
//  National Curriculum Framework / Teaching and Learning Syllabus, Grades 7 to 9
//  (Nine-Year Continuous Basic Education, MIE). The exam at the end of Grade 9
//  is the NCE, not the PSAC.
//
//  ⚠ comingSoon STAYS true until real questions land. It makes
//    activateSubjectPack() refuse the pack, keeps it out of QuestionLoader's
//    per-grade fetch and out of assembleExamPaper(), and renders the grade card
//    as "Coming Soon" and disabled. Real chapters are NOT on their own a reason
//    to flip it - a child opening a chapter with no questions is worse than a
//    card that says the pack is not ready.
//
//  TO FILL THIS IN
//    1. Write questions/ch01_*.js files, using subjects/grade4-maths as the
//       model. IDs: g7eng-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G7ENG_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G7ENG_SYLLABUS = {
  'g7eng-listening': { subsections: [
    { id: 'identifying_message',  name: 'Identifying the Message' },
    { id: 'vocabulary_context',   name: 'Vocabulary in Context' },
  ]},
  'g7eng-speaking': { subsections: [
    { id: 'oral_interaction',     name: 'Oral Interaction' },
    { id: 'intonation_register',  name: 'Intonation & Register' },
  ]},
  'g7eng-reading': { subsections: [
    { id: 'main_idea_details',    name: 'Main Idea & Details' },
    { id: 'inferring_vocabulary', name: 'Inferring Vocabulary' },
  ]},
  'g7eng-writing': { subsections: [
    { id: 'organising_ideas',     name: 'Organising Ideas' },
    { id: 'vocabulary_register',  name: 'Vocabulary & Register' },
  ]},
  'g7eng-gr-nouns': { subsections: [
    { id: 'countable_uncountable',  name: 'Countable & Uncountable Nouns' },
    { id: 'subject_verb_agreement', name: 'Subject-Verb Agreement' },
  ]},
  'g7eng-gr-pronouns': { subsections: [
    { id: 'personal_possessive',  name: 'Personal & Possessive Pronouns' },
    { id: 'relative_pronouns',    name: 'Relative Pronouns' },
  ]},
  'g7eng-gr-adjectives': { subsections: [
    { id: 'types_adjectives',     name: 'Types of Adjectives' },
    { id: 'adjective_placement',  name: 'Adjective Placement & Order' },
  ]},
  'g7eng-gr-verbs': { subsections: [
    { id: 'verb_tenses',          name: 'Verb Tenses' },
    { id: 'verb_formation',       name: 'Verb Formation' },
  ]},
  'g7eng-gr-determiners': { subsections: [
    { id: 'definite_article',     name: 'Definite Article & No Article' },
    { id: 'quantifiers',          name: 'Quantifiers' },
  ]},
  'g7eng-gr-adverbs': { subsections: [
    { id: 'types_adverbs',        name: 'Types of Adverbs' },
    { id: 'adverb_position',      name: 'Adverb Position' },
  ]},
  'g7eng-gr-modals': { subsections: [
    { id: 'ability_permission',   name: 'Ability & Permission' },
    { id: 'obligation',           name: 'Obligation & Advice' },
  ]},
  'g7eng-gr-prepositions': { subsections: [
    { id: 'place_time',           name: 'Place & Time' },
    { id: 'direction',            name: 'Direction & Movement' },
  ]},
  'g7eng-gr-sentence': { subsections: [
    { id: 'simple_compound',      name: 'Simple & Compound Sentences' },
    { id: 'complex_sentences',    name: 'Complex Sentences' },
  ]},
  'g7eng-gr-punctuation': { subsections: [
    { id: 'full_stop_comma',      name: 'Full Stop, Comma & Capital Letters' },
    { id: 'colon_direct_speech',  name: 'Colon & Direct Speech' },
  ]},
};

registerSubject({
  id: 'grade7-english', name: 'English', grade: 7, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G7ENG_SYLLABUS,
  chapters: [
    { id: 'g7eng-listening',            name: 'Listening & Comprehension',                       icon: '👂', examWeight: 3,
      syllabus: 'Listen attentively to a range of spoken and audio-visual texts. Identify the speaker, the audience and the message. Understand vocabulary specific to a text. Respond to what is heard.' },
    { id: 'g7eng-speaking',             name: 'Speaking & Oral Interaction',                     icon: '🗣️', examWeight: 3,
      syllabus: 'Speak clearly and confidently about familiar topics. Take part in conversations and simple discussions. Present information and personal opinions. Use appropriate intonation and register.' },
    { id: 'g7eng-reading',              name: 'Reading & Comprehension',                         icon: '📖', examWeight: 4,
      syllabus: 'Read a range of text types with understanding. Identify the main idea and supporting details. Infer meaning of unfamiliar words from context. Respond personally to what is read.' },
    { id: 'g7eng-writing',              name: 'Writing',                                         icon: '✍️', examWeight: 4,
      syllabus: 'Write for a range of purposes and audiences. Organise ideas into clear paragraphs. Use appropriate vocabulary and register. Draft, revise and proofread written work.' },
    { id: 'g7eng-gr-nouns',             name: 'Grammar · Nouns',                                 icon: '🔤', examWeight: 2,
      syllabus: 'Reinforce agreement between countable and uncountable nouns and verb forms. Use correct subject-verb agreement with singular, plural and collective nouns.' },
    { id: 'g7eng-gr-pronouns',          name: 'Grammar · Pronouns',                              icon: '🔤', examWeight: 2,
      syllabus: 'Use personal, possessive and reflexive pronouns correctly. Use relative pronouns including whose. Keep pronoun reference clear.' },
    { id: 'g7eng-gr-adjectives',        name: 'Grammar · Adjectives',                            icon: '🔤', examWeight: 2,
      syllabus: 'Use a variety of adjectives of opinion, size, age, temperature, shape, colour, texture, origin and material. Place adjectives correctly before nouns, after verbs and after a noun or pronoun. Form adjectives from verbs and nouns using suffixes.' },
    { id: 'g7eng-gr-verbs',             name: 'Grammar · Verbs & Tenses',                        icon: '🔤', examWeight: 3,
      syllabus: 'Use the main tenses accurately in context. Maintain subject-verb agreement. Form verbs from nouns and adjectives using prefixes and suffixes.' },
    { id: 'g7eng-gr-determiners',       name: 'Grammar · Determiners, Articles & Quantifiers',   icon: '🔤', examWeight: 2,
      syllabus: 'Reinforce the use of the definite article for unique objects, referents, clusters of islands and superlatives. Use words that take no article. Match quantifiers with the correct verb forms.' },
    { id: 'g7eng-gr-adverbs',           name: 'Grammar · Adverbs',                               icon: '🔤', examWeight: 2,
      syllabus: 'Consolidate adverbs of manner, place, time, degree and frequency. Pay attention to the position of adverbs in a sentence.' },
    { id: 'g7eng-gr-modals',            name: 'Grammar · Modals',                                icon: '🔤', examWeight: 2,
      syllabus: 'Use common modal verbs to express ability, permission and obligation.' },
    { id: 'g7eng-gr-prepositions',      name: 'Grammar · Prepositions',                          icon: '🔤', examWeight: 2,
      syllabus: 'Consolidate the use of prepositions of place, time and direction.' },
    { id: 'g7eng-gr-sentence',          name: 'Grammar · Sentence Structure',                    icon: '🔤', examWeight: 3,
      syllabus: 'Consolidate the construction of simple sentences. Extend the construction of compound sentences using coordinating conjunctions. Build complex sentences using who, that, which, where, whose and whom.' },
    { id: 'g7eng-gr-punctuation',       name: 'Grammar · Punctuation',                           icon: '🔤', examWeight: 2,
      syllabus: 'Reinforce the full stop, comma, capital letters, colon, exclamation mark and question mark. Use the comma after linking words and for nouns in apposition. Use the colon to introduce direct speech and to list items.' },
  ],
});
