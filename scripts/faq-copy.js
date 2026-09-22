'use strict';
// Prose for the static /faq page, and nothing else. Same contract as
// scripts/subject-page-copy.js: this file holds words a person wrote; every
// number, chapter name and URL on the page is measured by the generator.
//
// ⚠ THE SIX CORE ANSWERS ARE NOT HERE. They are read out of the FAQPage JSON-LD
//   in index.html by scripts/build-subject-pages.js, because they are also the
//   visible FAQ on the landing page. Retyping them here would make a third copy
//   of six answers that must stay identical — the exact shape of drift that
//   test-share-copy-parity.js exists to catch. Edit them in index.html (both the
//   section and the schema, which test-landing-no-js.js compares character for
//   character) and this page follows.
//
// ⚠ WHAT MAY GO IN `extra`: questions that earn /faq its own URL — the longer,
//   more specific things a parent types that the landing page has no room for.
//   ⚠ NOT a rephrasing of a core answer. Two near-identical answers on one page
//     is the doorway pattern in miniature, and an answer engine asked one
//     question then has two candidate quotes that differ slightly.
//
// ⚠ NO PRICE, NO DEADLINE FOR "FREE", NO "FREE FOREVER" — the same three rules
//   the subject pages have, checked by scripts/test-subject-pages.js against the
//   rendered page. Pricing is hidden rather than deleted, and a cached page is
//   the worst place to have to correct a promise.

module.exports = {
  // ⚠ <= 160 chars — this is the <meta name="description">, i.e. the search result.
  lede: 'Answers about Nou Klass — free PSAC and NCE practice for Mauritian pupils in Grades 1 to 9, aligned with the MIE curriculum.',

  heading: 'Nou Klass — Frequently Asked Questions',

  intro: [
    'Nou Klass is a free online practice platform for pupils in Mauritius, built around the syllabus they are already taught in class. These are the questions parents, pupils and teachers ask most often about how it works, what it covers and who it is for.',
    'Everything below is about the platform itself. For what a particular subject contains — its chapters, its topics and how many questions sit behind each one — every live subject has a page of its own, linked at the bottom of this one.',
  ],

  // ⚠ Answers are written to be QUOTED WHOLE. Each opens with a sentence that
  //   stands on its own without the question, because that is the unit an answer
  //   engine lifts, and a lifted fragment beginning "It does, provided…" is
  //   attached to nothing by the time a parent reads it.
  extra: [
    {
      q: 'Can parents follow their child’s progress on Nou Klass?',
      a: 'Yes. Every parent account on Nou Klass has a dashboard showing which chapters each child has mastered, which ones they are still getting wrong, how long they practised and how many days in a row they have kept going. Progress is recorded per question rather than per session, so a weak sub-topic is visible by name instead of as an overall score. Parents can also set a daily goal, cap the difficulty level and receive a weekly summary by email.',
    },
    {
      q: 'Does Nou Klass include real past exam papers?',
      a: 'Yes. Nou Klass includes questions taken from real PSAC past papers between 2016 and 2024, kept as their own set and marked as past-paper practice. Alongside them, the platform assembles timed mock papers of the same shape as the real examination, so a pupil rehearses the length, the section order and the clock rather than only the content.',
    },
    {
      q: 'What is the NCE, and how is Grade 9 practice different from PSAC?',
      a: 'The NCE (National Certificate of Education) is the Mauritian examination taken at the end of Grade 9, three years after the PSAC at the end of Grade 6. On Nou Klass the difference is structural, not just harder questions: Grade 9 Science is split into Biology, Chemistry and Physics as three separate subjects with separate papers, and subjects such as ICT and Social & Modern Studies appear that have no PSAC equivalent.',
    },
    {
      q: 'Can teachers and private tutors set homework through Nou Klass?',
      a: 'Yes. Nou Klass has a teacher mode that lets a teacher or private tutor create a classroom, choose the chapters to practise and send the work out as a single link — pupils open it on a phone and their scores come back automatically. Nothing needs to be installed and parents do not have to create accounts for an open homework link. For a permanent class, each pupil gets their own PIN so results are tied to a real name rather than a typed one.',
    },
    {
      q: 'Is Nou Klass available in French?',
      a: 'French is a full subject on Nou Klass at every grade from 1 to 9, with its own chapters, reading passages, cloze exercises and error-hunting exercises, and questions are read aloud in French with a French voice where the device has one. The platform’s own menus and parent dashboard are in English. Grades 7 to 9 follow the Français syllabus set for the NCE.',
    },
    {
      q: 'Is Nou Klass safe for young children to use on their own?',
      a: 'Nou Klass is built for children to use unsupervised. A child signs in with a username and a PIN chosen by their parent and never needs an email address of their own, the community forum is open to parents and teachers only, there is no advertising anywhere in the app, and anything a child shares from a game or a score carries a score and a challenge but never their name or a link back to their account. A separate parent PIN gates the settings a child should not be able to change. The full privacy policy is linked at the bottom of this page.',
    },
  ],
};
