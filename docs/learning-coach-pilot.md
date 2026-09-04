# Weekly learning coach — Grade 5 Mathematics pilot

Implemented locally 2026-09-04. Deploy before testing on the live site.

## Where to find it

- Grade 5 child: the coach card on the subject picker and subject dashboard.
- Parent: open the Grade 5 child, then Progress → weekly learning coach.
- Teacher: clearer workspace navigation and three numbered assignment sections;
  existing classrooms, PIN/nickname modes, sharing, results and archive actions remain.

## Learning loop

1. Six distinct starting questions from one subsection at one difficulty.
2. Below 5/6: eight different targeted practice questions on a later day, with
   hints and explanations. A six-question follow-up becomes due three days later.
3. At least 5/6: skip remedial practice and schedule a retention check seven days
   later. This does not mark the topic mastered.
4. Follow-ups use six reserved question IDs from the same subsection/difficulty,
   different from the coach's starting check and practice. They may have been seen
   in ordinary chapter practice; these are not formal controlled assessments.
5. Due checks take priority, then practice for lower starting scores, then an
   unchecked topic/difficulty. At most one completed coach mission per Mauritius day.

The current local bank has **17 eligible subsection/difficulty groups** with at
least 20 distinct question prompts. This is not coverage of every maths topic.
Unsupported/unchecked topics are not classified as weaknesses. Existing grades,
chapter practice, schedules and assignments remain available.

## Persistence and restrictions

- `DB.learningCoach` travels in the existing per-child progress JSON; no SQL migration.
- First answers and skipped questions (incorrect) are saved through `save(DB, true)`.
  Network/offline sync has the same guarantees and limitations as normal progress.
- Leaving or refreshing resumes via the coach card, using remaining questions.
  Coach sessions do not overwrite the ordinary practice-resume slot.
- Existing chapter locks, chapter entitlements, difficulty cap and daily question
  cap remain in effect. A locked/missing pending question produces a clear message.
- Parent preview cannot launch a mission. Switching children during loading aborts
  the launch. Ordinary practice clears the coach-session marker.
- History is capped to the latest 90 missions; per-topic check summaries are retained.
- The pilot introduces no billing, new paid entitlement, scheduled background job,
  push notification or automatic weekly email.

## Parent-facing interpretation

Shows completed mission days in the last seven days, starting scores, targeted
practice and next check dates, and follow-up scores with actual denominators.
Six questions are a small sample; scores are not mastery or predicted exam grades.
Same difficulty does not guarantee psychometrically equivalent question sets.

## Verification

- `node scripts/test-learning-coach.js`: lifecycle, reserve separation, duplicate
  prompt exclusion, difficulty separation, waiting periods, strong-score routing,
  real-bank eligibility and duplicate completion protection.
- `node scripts/test-coach-teacher-layout.js`: fresh-profile Chrome, no login;
  teacher controls and coach card at 390/1280px, light/dark.
- Teacher workspace, grade-selector and guest-access regression tests.
- `node scripts/check.js` and syntax checks.

Before expanding: trial with real consenting families, review the selected
questions for comparable challenge, measure completion/retention, then decide on
paid packaging. Cross-device concurrent answers inherit the existing whole-blob
progress storage's conflict limitations. Server-graded diagnostics, topic-specific
worked examples, notifications and additional grades are future work.
