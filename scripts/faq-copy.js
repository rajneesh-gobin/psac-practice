'use strict';
// Prose for the static /faq page, and nothing else. Same contract as
// scripts/subject-page-copy.js: this file holds words a person wrote; every
// number, chapter name and URL on the page is measured by the generator.
//
// ⚠ THE SIX CORE ANSWERS ARE NOW HERE TOO, in `core` below. Until 2026-09-24
//   they lived in index.html — the visible landing FAQ and the FAQPage schema
//   mirroring it — and this generator read them back out of that schema. The
//   landing page now shows a teaser and a link to /faq, so there is no visible
//   copy left there to be the source, and index.html carries no FAQPage block
//   at all. One copy, here, rendered once, on /faq.
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
  lede: 'Answers about Nou Klass - free PSAC and NCE practice for Mauritian pupils in Grades 1 to 9, aligned with the MIE curriculum.',

  heading: 'Nou Klass - Frequently Asked Questions',

  intro: [
    'Nou Klass is a free online practice platform for pupils in Mauritius, built around the syllabus they are already taught in class. These are the questions parents, pupils and teachers ask most often about how it works, what it covers and who it is for.',
    'Everything below is about the platform itself. For what a particular subject contains - its chapters, its topics and how many questions sit behind each one - every live subject has a page of its own, linked at the bottom of this one.',
  ],

  // ⚠ THE SIX CORE ANSWERS — THIS IS NOW THE ONLY COPY. They used to live in
  //   index.html, as the visible landing FAQ and the FAQPage schema mirroring it,
  //   and this file read them back out of there. The landing page now carries a
  //   one-line teaser and a link to /faq instead, so nothing displays them there
  //   any more — and a schema block describing answers a visitor cannot see is
  //   the one thing Google explicitly asks you not to publish.
  //   ⚠ They are the FIRST six on /faq and are ordered deliberately: what it is,
  //     is it the real syllabus, what it covers, how it works, what it costs,
  //     what it takes to start. A parent reads them in that order or not at all.
  //   ⚠ Same rules as `extra` below — no price, no deadline for "free", no
  //     "free forever", and every one written to be QUOTED WHOLE.
  core: [
    {
      q: 'What is Nou Klass?',
      a: 'Nou Klass is a free online practice and revision platform for pupils in Mauritius, covering Grades 1–6 (PSAC) and Grades 7–9 (NCE). It provides over 34,000 bite-sized practice questions with instant feedback and diagnostic progress tracking, aligned with the Mauritius Institute of Education (MIE) curriculum. It runs in any web browser at nouklass.com, with nothing to install.',
    },
    {
      q: 'Is Nou Klass aligned with the MIE curriculum used in Mauritian schools?',
      a: 'Yes. Every question on Nou Klass is written against the Mauritius Institute of Education (MIE) curriculum and organised by the same chapters and topics pupils follow in class - more than 450 chapters, each split into named sub-topics. Grades 1–6 follow the PSAC syllabus and Grades 7–9 follow the NCE syllabus, and practice includes questions from real past examination papers. Nou Klass is an independent platform and is not affiliated with the MIE or the Ministry of Education.',
    },
    {
      q: 'Which grades and subjects does Nou Klass cover?',
      a: 'Nou Klass covers Grades 1–6 (PSAC) and Grades 7–9 (NCE) in Mauritius. Grades 1–3 offer Mathematics, English, French and Health Education; Grades 4–6 offer Mathematics, English, French, Science and History & Geography; Grades 7–9 offer Mathematics, English, Français, Science and Social & Modern Studies, with Grade 9 adding Biology, Chemistry, Physics and ICT as separate subjects.',
    },
    {
      q: 'How can my child practise for the PSAC exam online?',
      a: 'On Nou Klass, a pupil picks their grade and subject, then practises chapter by chapter in short sets graded from basic recall to full word problems. Every answer is marked instantly with a hint and a worked explanation, wrong answers come back automatically in a spaced Fix My Mistakes drill, and timed mock papers rehearse the real PSAC or NCE exam format from start to finish.',
    },
    {
      q: 'Is Nou Klass free to use?',
      a: 'Yes. Nou Klass is completely free for every account while the platform is being built - every grade, every subject and every practice question, with no card required, no trial and nothing to cancel. It is kept going by voluntary donations from families who can spare something, and parents will be notified well in advance before anything about access changes.',
    },
    {
      q: 'Do parents need to install an app, and does it work offline?',
      a: 'No installation is required. Nou Klass runs in any mobile or desktop browser at nouklass.com and can be added to a phone’s home screen as an app. Practice questions are cached on the device, so a pupil can keep revising without a data connection and their progress syncs once they are back online. Parents follow mastery, streaks and weak chapters from their own dashboard.',
    },
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
      a: 'Yes. Nou Klass has a teacher mode that lets a teacher or private tutor create a classroom, choose the chapters to practise and send the work out as a single link - pupils open it on a phone and their scores come back automatically. Nothing needs to be installed and parents do not have to create accounts for an open homework link. For a permanent class, each pupil gets their own PIN so results are tied to a real name rather than a typed one.',
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
