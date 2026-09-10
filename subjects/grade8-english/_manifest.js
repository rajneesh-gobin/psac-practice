'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - English   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g8eng-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G8ENG_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G8ENG_SYLLABUS = {
  'g8eng-listening': { subsections: [
    { id: 'fact_opinion',             name: 'Fact vs Opinion' },
    { id: 'summarising',              name: 'Summarising a Text' },
  ]},
  'g8eng-speaking': { subsections: [
    { id: 'structured_discussion',    name: 'Structured Discussion & Debate' },
    { id: 'register_adaptation',      name: 'Register Adaptation' },
  ]},
  'g8eng-reading': { subsections: [
    { id: 'purpose_audience',         name: 'Purpose, Audience & Tone' },
    { id: 'explicit_implicit',        name: 'Explicit & Implicit Meaning' },
  ]},
  'g8eng-writing': { subsections: [
    { id: 'extended_writing',         name: 'Extended Writing & Argument' },
    { id: 'editing_accuracy',         name: 'Editing for Accuracy' },
  ]},
  'g8eng-gr-nouns': { subsections: [
    { id: 'noun_phrases',             name: 'Noun Phrases' },
    { id: 'gerunds',                  name: 'Gerunds' },
  ]},
  'g8eng-gr-pronouns': { subsections: [
    { id: 'reference_tracking',       name: 'Reference Tracking' },
    { id: 'ambiguous_reference',      name: 'Ambiguous Pronoun Reference' },
  ]},
  'g8eng-gr-adjectives': { subsections: [
    { id: 'adjective_order',          name: 'Adjective Order' },
    { id: 'participial_adjectives',   name: 'Participial Adjectives (-ing/-ed)' },
  ]},
  'g8eng-gr-verbs': { subsections: [
    { id: 'present_perfect',          name: 'Present Perfect' },
    { id: 'future_continuous',        name: 'Future Continuous' },
  ]},
  'g8eng-gr-determiners': { subsections: [
    { id: 'article_use',              name: 'Article Use' },
    { id: 'no_article',              name: 'No Article' },
  ]},
  'g8eng-gr-adverbs': { subsections: [
    { id: 'adjective_to_adverb',      name: 'Adjective to Adverb' },
    { id: 'reason_purpose',           name: 'Adverbs of Reason & Purpose' },
  ]},
  'g8eng-gr-modals': { subsections: [
    { id: 'possibility_probability',  name: 'Possibility & Probability' },
    { id: 'advice',                   name: 'Advice & Recommendation' },
  ]},
  'g8eng-gr-prepositions': { subsections: [
    { id: 'prepositional_phrases',    name: 'Prepositional Phrases' },
    { id: 'verbs_prepositions',       name: 'Verbs + Prepositions' },
  ]},
  'g8eng-gr-sentence': { subsections: [
    { id: 'complex_sentences',        name: 'Complex Sentences & Conditionals' },
    { id: 'direct_indirect_speech',   name: 'Direct & Indirect Speech' },
  ]},
  'g8eng-gr-punctuation': { subsections: [
    { id: 'ellipsis',                 name: 'Ellipsis (…)' },
    { id: 'punctuation_review',       name: 'Punctuation Review' },
  ]},
};

registerSubject({
  id: 'grade8-english', name: 'English', grade: 8, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
    // ⚠ WAS 'Word Problems' — the MATHS label on an English pack. L4 is
  // maths-shaped and does not travel; level4Label says what it means HERE:
  // extended analysis — hold a passage or two competing readings in mind and
  // justify a choice. Matches grade7-english so one wording carries up.
  practiceble: true, notesBased: false, level4Label: 'Extended Analysis',
  syllabus: G8ENG_SYLLABUS,
  chapters: [
    { id: 'g8eng-listening',            name: 'Listening & Comprehension',                       icon: '👂', examWeight: 3,
      syllabus: 'Listen to longer spoken and audio-visual texts. Distinguish fact from opinion in what is heard. Follow discussions between several speakers. Summarise the main points of a spoken text.' },
    { id: 'g8eng-speaking',             name: 'Speaking & Oral Interaction',                     icon: '🗣️', examWeight: 3,
      syllabus: 'Speak fluently on a widening range of topics. Take part in structured discussions and debates. Support an opinion with reasons. Adapt register to the audience.' },
    { id: 'g8eng-reading',              name: 'Reading & Comprehension',                         icon: '📖', examWeight: 4,
      syllabus: 'Read and compare a range of text types. Identify purpose, audience and tone. Distinguish explicit from implicit meaning. Evaluate what is read.' },
    { id: 'g8eng-writing',              name: 'Writing',                                         icon: '✍️', examWeight: 4,
      syllabus: 'Write extended texts in a range of forms. Structure an argument with supporting detail. Vary sentence structure for effect. Edit for accuracy and clarity.' },
    { id: 'g8eng-gr-nouns',             name: 'Grammar · Nouns',                                 icon: '🔤', examWeight: 2,
      syllabus: 'Expand nouns into noun phrases. Use gerunds, which are nouns formed from verbs.' },
    { id: 'g8eng-gr-pronouns',          name: 'Grammar · Pronouns',                              icon: '🔤', examWeight: 2,
      syllabus: 'Use pronouns to maintain reference across sentences. Avoid ambiguous pronoun reference.' },
    { id: 'g8eng-gr-adjectives',        name: 'Grammar · Adjectives',                            icon: '🔤', examWeight: 2,
      syllabus: 'Order several adjectives correctly when they follow each other. Distinguish between adjectives formed with an -ing participle and those formed with an -ed or -en participle. Reinforce the transformation of verbs and nouns into adjectives.' },
    { id: 'g8eng-gr-verbs',             name: 'Grammar · Verbs & Tenses',                        icon: '🔤', examWeight: 3,
      syllabus: 'Use the present perfect and the future continuous. Extend the range of tenses used in writing. Maintain consistent tense across a paragraph.' },
    { id: 'g8eng-gr-determiners',       name: 'Grammar · Determiners, Articles & Quantifiers',   icon: '🔤', examWeight: 2,
      syllabus: 'Differentiate between words taking and not taking articles in specific situations.' },
    { id: 'g8eng-gr-adverbs',           name: 'Grammar · Adverbs',                               icon: '🔤', examWeight: 2,
      syllabus: 'Convert adjectives into adverbs for use in a variety of sentences. Use adverbs of reason and purpose.' },
    { id: 'g8eng-gr-modals',            name: 'Grammar · Modals',                                icon: '🔤', examWeight: 2,
      syllabus: 'Use modal verbs to express possibility, probability and advice.' },
    { id: 'g8eng-gr-prepositions',      name: 'Grammar · Prepositions',                          icon: '🔤', examWeight: 2,
      syllabus: 'Extend the use of prepositions in phrases and after particular verbs.' },
    { id: 'g8eng-gr-sentence',          name: 'Grammar · Sentence Structure',                    icon: '🔤', examWeight: 3,
      syllabus: 'Extend the construction and use of complex sentences. Construct and use sentences in the past conditional. Construct and use sentences in direct and indirect speech.' },
    { id: 'g8eng-gr-punctuation',       name: 'Grammar · Punctuation',                           icon: '🔤', examWeight: 2,
      syllabus: 'Use ellipsis points to indicate an incomplete sentence or unfinished speech.' },
  ],
});
