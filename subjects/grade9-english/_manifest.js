'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - English   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g9eng-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G9ENG_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G9ENG_SYLLABUS = {};

registerSubject({
  id: 'grade9-english', name: 'English', grade: 9, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9ENG_SYLLABUS,
  chapters: [
    { id: 'g9eng-listening',            name: 'Listening & Comprehension',                       icon: '👂', examWeight: 3,
      syllabus: 'Listen critically to extended spoken and audio-visual texts. Identify bias, purpose and implied meaning. Follow and evaluate an argument. Take notes from what is heard.' },
    { id: 'g9eng-speaking',             name: 'Speaking & Oral Interaction',                     icon: '🗣️', examWeight: 3,
      syllabus: 'Speak fluently and accurately for a range of purposes. Lead and sustain a discussion. Defend a point of view with evidence. Use register and tone deliberately.' },
    { id: 'g9eng-reading',              name: 'Reading & Comprehension',                         icon: '📖', examWeight: 4,
      syllabus: 'Read and interpret complex and literary texts. Analyse how writers achieve their effects. Compare viewpoints across texts. Justify a response with evidence from the text.' },
    { id: 'g9eng-writing',              name: 'Writing',                                         icon: '✍️', examWeight: 4,
      syllabus: 'Write sustained texts in a range of genres. Craft introductions and conclusions. Use cohesive devices across paragraphs. Proofread for grammar, spelling and punctuation.' },
    { id: 'g9eng-gr-nouns',             name: 'Grammar · Nouns',                                 icon: '🔤', examWeight: 2,
      syllabus: 'Use nouns and noun phrases in apposition.' },
    { id: 'g9eng-gr-pronouns',          name: 'Grammar · Pronouns',                              icon: '🔤', examWeight: 2,
      syllabus: 'Use pronouns accurately in complex sentences and in reported speech.' },
    { id: 'g9eng-gr-adjectives',        name: 'Grammar · Adjectives',                            icon: '🔤', examWeight: 2,
      syllabus: 'Use adjectives that function like nouns.' },
    { id: 'g9eng-gr-verbs',             name: 'Grammar · Verbs & Tenses',                        icon: '🔤', examWeight: 3,
      syllabus: 'Use a wide range of tenses accurately. Maintain consistent tense across a whole text. Use the passive voice appropriately.' },
    { id: 'g9eng-gr-determiners',       name: 'Grammar · Determiners, Articles & Quantifiers',   icon: '🔤', examWeight: 2,
      syllabus: 'Consolidate the use of articles and quantifiers in extended writing.' },
    { id: 'g9eng-gr-adverbs',           name: 'Grammar · Adverbs',                               icon: '🔤', examWeight: 2,
      syllabus: 'Use adverbs that indicate the attitude of the speaker or writer.' },
    { id: 'g9eng-gr-modals',            name: 'Grammar · Modals',                                icon: '🔤', examWeight: 2,
      syllabus: 'Use modal verbs to express degrees of certainty and hypothetical meaning.' },
    { id: 'g9eng-gr-prepositions',      name: 'Grammar · Prepositions',                          icon: '🔤', examWeight: 2,
      syllabus: 'Use prepositional phrases accurately in extended writing.' },
    { id: 'g9eng-gr-sentence',          name: 'Grammar · Sentence Structure',                    icon: '🔤', examWeight: 3,
      syllabus: 'Transform sentences from active to passive voice and back. Construct sentences in the perfect conditional. Consolidate the construction and use of direct speech and the passive voice.' },
    { id: 'g9eng-gr-punctuation',       name: 'Grammar · Punctuation',                           icon: '🔤', examWeight: 2,
      syllabus: 'Use the comma before and after non-defining clauses. Use single quotation marks for titles and double quotation marks for exact words. Use the dash to add extra information or an additional idea.' },
  ],
});
