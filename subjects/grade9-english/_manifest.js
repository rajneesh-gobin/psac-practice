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

// Sub-topics for the Syllabus screen.
//
// ⚠ TAGGING TARGETS, declared ahead of the questions on purpose. Every id is
//   transcribed from "Part 3 — Proposed subsection ids" in
//   docs/nce-grade9/syllabus-english.md, which reads them off the NCF Grades
//   7-9 competency tables and marks those reused from grade5/grade6-english.
//   Invisible to everyone while comingSoon keeps the pack out of
//   activateSubjectPack(), the per-grade fetch and assembleExamPaper().
//
// ⚠ THIS PACK MUST NOT GO LIVE UNTIL EVERY ID BELOW HAS QUESTIONS.
//   scripts/test-subsection-invariant.js checks live packs and starts failing
//   the moment comingSoon flips; it also reports orphaned tags in hidden packs,
//   so a tag written against a name not declared here shows up immediately.
//   ⚠ Where a written question already carries a tag, THE TAG WINS — rename the
//   declaration, never the questions. That is how grade9-ict went wrong: the
//   manifest declared `formulae_basics` while the author tagged `formulas`.
//
// ⚠⚠ REWEIGHTED AND EXTENDED 2026-09-08 from blueprint-english.md §8, which
//   assigned all 100 marks question by question across the five NCE papers.
//   Three chapters were ADDED for what §8.2 calls "the most important finding
//   in this section" — 16 marks a year of real, recurring, mark-bearing tasks
//   with no chapter at all: g9eng-vocabulary (Q2 + the Q8 vocabulary item, 8
//   marks), g9eng-word-formation (Q4, 5 marks), g9eng-literature (Q10, 10
//   marks). 14 chapters became 17.
//
// ⚠⚠ §8.4'S OWN TABLE IS WRONG, AND THE WEIGHTS HERE ARE NOT ITS NUMBERS.
//   §8.4 prints "total 40" and says "Sums to 40", but its seventeen rows add to
//   46 — verified by summing the table itself, not by trusting the footer.
//   The cause is structural, not a typo: reading and writing alone take 22, and
//   EIGHT grammar chapters sit at the weight floor of 1 while their measured
//   shares are all BELOW 1 (nouns 1.0%, adverbs 1.0%, modals 0.2% → ×0.4 gives
//   0.4, 0.4, 0.08). `Math.max(1, …)` cannot express a share smaller than one
//   question, so the floor inflates the total by ~6 and no arrangement of the
//   doc's own figures can reach 40.
//   RESOLVED 2026-09-08 by taking the surplus off the SEVEN chapters that are
//   above the floor, in proportion, and leaving the eight floored ones alone:
//   reading 12→10, writing 10→8, literature 4→3, sentence 4→3. The floor
//   chapters cannot go lower, so they are the fixed part of the sum.
//   ⚠ WHY IT MATTERS, measured on grade9-maths the same day: an over-weight pack
//   is reconciled by `findIndex(w => w.n > 1)`, which always decrements the
//   FIRST chapter in list order. At 46 this pack would have shed six questions
//   off the top of its own list — and g9eng-reading, the largest chapter at 30%
//   of the real paper, sits near the top. The paper would still have totalled
//   40, so test-exam-paper-shape.js would have passed while reading was gutted.
//
// ⚠ g9eng-listening AND g9eng-speaking ARE NOW examWeight: 0. Zero marks in
//   five papers: the N500 is written, with no audio component. Their syllabus
//   text describes a classroom activity, not an examined skill. They keep their
//   chapters because that content is real and belongs on the Syllabus screen.
//   ⚠ 0 does NOT by itself keep a chapter out of an exam — assembleExamPaper()
//   clamps with Math.max(1, …). What actually excludes them is having no
//   poolable question, so do not write questions into them and then rely on the 0.
//
// ⚠ TWO CHAPTERS HAVE NO SUBSECTIONS, deliberately: g9eng-gr-determiners and
//   g9eng-gr-modals. The doc records that NO Grade 9 syllabus content exists
//   for either — modals measured 0.2 marks a year across five papers, once.
//
// ⚠ The doc also proposes a NEW chapter, g9eng-gr-conjunctions, for the reused
//   `conjunctions` id. NOT added: it is a syllabus proposal with no measured
//   marks behind it, unlike the three above.
//
// ⚠ §8.5, worth reading before writing any Writing questions: Q7 and Q9 are 25%
//   of the real paper and are free extended writing with no correct answer. At
//   weight 8 g9eng-writing is still the second-largest chapter in the pack, and the one this
//   engine cannot mark unless the tasks are recast as something objective.
const G9ENG_SYLLABUS = {
  'g9eng-gr-nouns': { subsections: [
    { id: 'apposition', name: 'Apposition' },
  ] },
  'g9eng-gr-pronouns': { subsections: [
    { id: 'reflexive',    name: 'Reflexive pronouns' },
    { id: 'emphasising',  name: 'Emphasising pronouns' },
    { id: 'relative',     name: 'Relative pronouns' },
  ] },
  'g9eng-gr-adjectives': { subsections: [
    { id: 'adjectives_as_nouns', name: 'Adjectives used as nouns' },
  ] },
  'g9eng-gr-verbs': { subsections: [
    { id: 'future_perfect',            name: 'The future perfect' },
    { id: 'future_perfect_continuous', name: 'The future perfect continuous' },
    { id: 'tense_consistency',         name: 'Keeping tense consistent' },
  ] },
  'g9eng-gr-adverbs': { subsections: [
    { id: 'attitude_adverbs', name: 'Adverbs of attitude' },
  ] },
  'g9eng-gr-prepositions': { subsections: [
    { id: 'prepositions',  name: 'Prepositions' },
    { id: 'phrasal_verbs', name: 'Phrasal verbs' },
  ] },
  'g9eng-gr-sentence': { subsections: [
    { id: 'voice',               name: 'Active and passive voice' },
    { id: 'perfect_conditional', name: 'The perfect conditional' },
    { id: 'direct_speech',       name: 'Direct and reported speech' },
  ] },
  'g9eng-gr-punctuation': { subsections: [
    { id: 'non_defining_comma', name: 'Commas around a non-defining clause' },
    { id: 'quotation_marks',    name: 'Quotation marks' },
    { id: 'dash',               name: 'The dash' },
    { id: 'semicolon',          name: 'The semicolon' },
  ] },
  'g9eng-reading': { subsections: [
    { id: 'retrieval',     name: 'Retrieving information from the text' },
    { id: 'inference',     name: 'Inference' },
    { id: 'authors_view',  name: "The author's purpose and point of view" },
    { id: 'vocabulary',    name: 'Vocabulary in context' },
    { id: 'language',      name: 'Language and literary devices' },
    { id: 'evidence',      name: 'Supporting an answer with evidence' },
    // ⚠ The one Grade-9-ONLY Reading competency: "analyse patterns,
    //   connections, contradictions and points of view within the text and/or
    //   ACROSS TEXTS" is level 1 at G9 and blank at G7 and G8. It has no
    //   sibling id in grade5/grade6-english, which is why it is new here.
    { id: 'across_texts',  name: 'Patterns, connections and contradictions across texts' },
    { id: 'text_features', name: 'Text features and how a text is organised' },
  ] },
  'g9eng-writing': { subsections: [
    { id: 'planning',      name: 'Planning a piece of writing' },
    { id: 'essay',         name: 'Essay writing' },
    { id: 'descriptive',   name: 'Descriptive writing' },
    { id: 'formal_letter', name: 'Formal letters' },
    { id: 'narrative',     name: 'Narrative writing' },
    { id: 'cohesion',      name: 'Sequencing and cohesive devices' },
    { id: 'register',      name: 'Purpose, format, style and register' },
    // ⚠ Spelling and punctuation are the ONLY level-6 competencies in Writing.
    { id: 'spelling',      name: 'Spelling' },
    { id: 'punctuation',   name: 'Punctuation in writing' },
  ] },

  // ── The three chapters added from blueprint-english.md §8.2 ───────────────
  // ⚠ These ids come from the FORMAT CENSUS (§3), not the syllabus competency
  //   tables — the syllabus never names these tasks, but every paper asks them.
  'g9eng-vocabulary': { subsections: [
    { id: 'collocation',           name: 'Choosing the word that fits the sentence' },
    { id: 'word_choice',           name: 'Precise word choice' },
    { id: 'vocabulary_in_context', name: 'Working out a word from its context' },
  ] },
  'g9eng-word-formation': { subsections: [
    { id: 'noun_formation',      name: 'Forming a noun from the root' },
    { id: 'adjective_formation', name: 'Forming an adjective from the root' },
    { id: 'adverb_formation',    name: 'Forming an adverb from the root' },
    { id: 'verb_formation',      name: 'Forming a verb from the root' },
    { id: 'root_and_affix',      name: 'Roots, prefixes and suffixes' },
  ] },
  'g9eng-literature': { subsections: [
    { id: 'narrative_voice',    name: 'Narrative voice, and the evidence for it' },
    { id: 'rhyme',              name: 'Rhyme and rhyming pairs' },
    { id: 'figurative_devices', name: 'Simile, metaphor and personification' },
    { id: 'effect_of_device',   name: 'The effect of a device in its place' },
    { id: 'line_explication',   name: 'Explaining given lines' },
    { id: 'supported_response', name: 'A supported judgement about the whole text' },
  ] },
};

registerSubject({
  id: 'grade9-english', name: 'English', grade: 9, icon: '📖', subject: 'English',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9ENG_SYLLABUS,
  chapters: [
    { id: 'g9eng-listening',            name: 'Listening & Comprehension',                       icon: '👂', examWeight: 0,
      syllabus: 'Listen critically to extended spoken and audio-visual texts. Identify bias, purpose and implied meaning. Follow and evaluate an argument. Take notes from what is heard.' },
    { id: 'g9eng-speaking',             name: 'Speaking & Oral Interaction',                     icon: '🗣️', examWeight: 0,
      syllabus: 'Speak fluently and accurately for a range of purposes. Lead and sustain a discussion. Defend a point of view with evidence. Use register and tone deliberately.' },
    { id: 'g9eng-reading',              name: 'Reading & Comprehension',                         icon: '📖', examWeight: 10,
      syllabus: 'Read and interpret complex and literary texts. Analyse how writers achieve their effects. Compare viewpoints across texts. Justify a response with evidence from the text.' },
    { id: 'g9eng-writing',              name: 'Writing',                                         icon: '✍️', examWeight: 8,
      syllabus: 'Write sustained texts in a range of genres. Craft introductions and conclusions. Use cohesive devices across paragraphs. Proofread for grammar, spelling and punctuation.' },
    // ── Added 2026-09-08 from blueprint-english.md §8.2 ──────────
    // ⚠ These three are "the most important finding in that section": real,
    //   recurring, mark-bearing tasks that NO existing chapter covered 
    //   16 marks a year, every year, with nowhere to live.
    { id: 'g9eng-vocabulary',         name: 'Vocabulary & Word Choice',                        icon: '📖', examWeight: 3,
      syllabus: 'Choose the precise word for a sentence, and work out what a word means from its context. Q2 in full (5 marks) plus the vocabulary-in-context item that closes Q8 (3 marks): 8 marks a year, in all five papers.' },
    { id: 'g9eng-word-formation',     name: 'Word Formation',                                  icon: '🔡', examWeight: 2,
      syllabus: 'Form the right word from a root supplied in brackets  noun, adjective, adverb or verb. Q4 in full: 5 marks a year, in all five papers.' },
    { id: 'g9eng-literature',         name: 'Literary Appreciation',                           icon: '📚', examWeight: 3,
      syllabus: 'Read a poem or a prose extract and answer on narrative voice, rhyme, figurative devices and their effect, explain given lines, and give a supported judgement. Q10: 10 marks a year. The two options are isomorphic  both are eight parts, 1+1+1+1+1+1+1+3  so one shape prepares a child for either.' },
    { id: 'g9eng-gr-nouns',             name: 'Grammar · Nouns',                                 icon: '🔤', examWeight: 1,
      syllabus: 'Use nouns and noun phrases in apposition.' },
    { id: 'g9eng-gr-pronouns',          name: 'Grammar · Pronouns',                              icon: '🔤', examWeight: 1,
      syllabus: 'Use pronouns accurately in complex sentences and in reported speech.' },
    { id: 'g9eng-gr-adjectives',        name: 'Grammar · Adjectives',                            icon: '🔤', examWeight: 1,
      syllabus: 'Use adjectives that function like nouns.' },
    { id: 'g9eng-gr-verbs',             name: 'Grammar · Verbs & Tenses',                        icon: '🔤', examWeight: 3,
      syllabus: 'Use a wide range of tenses accurately. Maintain consistent tense across a whole text. Use the passive voice appropriately.' },
    { id: 'g9eng-gr-determiners',       name: 'Grammar · Determiners, Articles & Quantifiers',   icon: '🔤', examWeight: 1,
      syllabus: 'Consolidate the use of articles and quantifiers in extended writing.' },
    { id: 'g9eng-gr-adverbs',           name: 'Grammar · Adverbs',                               icon: '🔤', examWeight: 1,
      syllabus: 'Use adverbs that indicate the attitude of the speaker or writer.' },
    { id: 'g9eng-gr-modals',            name: 'Grammar · Modals',                                icon: '🔤', examWeight: 1,
      syllabus: 'Use modal verbs to express degrees of certainty and hypothetical meaning.' },
    { id: 'g9eng-gr-prepositions',      name: 'Grammar · Prepositions',                          icon: '🔤', examWeight: 1,
      syllabus: 'Use prepositional phrases accurately in extended writing.' },
    { id: 'g9eng-gr-sentence',          name: 'Grammar · Sentence Structure',                    icon: '🔤', examWeight: 3,
      syllabus: 'Transform sentences from active to passive voice and back. Construct sentences in the perfect conditional. Consolidate the construction and use of direct speech and the passive voice.' },
    { id: 'g9eng-gr-punctuation',       name: 'Grammar · Punctuation',                           icon: '🔤', examWeight: 1,
      syllabus: 'Use the comma before and after non-defining clauses. Use single quotation marks for titles and double quotation marks for exact words. Use the dash to add extra information or an additional idea.' },
  ],
});
