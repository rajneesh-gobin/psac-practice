# Claude Code prompt — chapter practice journey and durable question progress

Copy the prompt below into Claude Code while it is opened at the repository root.

---

You are working in the `psac-practice` repository. Read `CLAUDE.md`, `ARCHITECTURE.md`, and the relevant implementation before editing anything. The worktree is heavily modified by ongoing work: preserve all unrelated changes, do not restore deleted files, and do not reset or reformat unrelated code. The user intends to provide a Supabase credential and explicitly authorises you to apply **only the migration created for this feature**, after the safeguards in the Supabase section below have passed.

## Goal

Redesign chapter practice so that a child can begin with one click, understands that a 20-question round is only a practice set rather than the whole chapter, can deliberately find new or troublesome questions, and has durable question-level progress across devices.

This must remain simple for a Grade 4–6 child and transparent to a non-technical parent. Do not add a compulsory choice popup every time a chapter is opened. Use progressive disclosure: one obvious primary action and optional controls for children who want them.

## Existing behaviour to verify, not assume

Trace the current code and confirm these details before deciding on the implementation:

- `engine/app.js` currently records chapter aggregates and an `answeredIds` array through `recordAnswer(...)` and the normal store save path.
- Supabase currently persists the app state in `public.student_progress.data` as JSONB, protected by existing student/parent/admin policies.
- `getMixedQuestions(...)` and related chapter entry points currently choose up to 20 shuffled eligible questions, without prioritising unseen questions.
- the completion dialog currently calls a 20-question batch a “Round Complete” and can immediately select another random batch containing repeats.
- `_chapterProgress(...)` can calculate unique question coverage from `answeredIds`, but the stored data does not reliably describe per-question wrong/recovered/secure states.
- assignment attempts intentionally behave differently from ordinary chapter practice. Preserve that boundary unless a documented product requirement says otherwise.

Also identify every chapter-entry path (chapter card, subsection, search/result links, revision, parent assignment, and any mini-game reuse) so this change does not accidentally alter unrelated question pools.

Before coding, write a short implementation note in your response explaining whether the existing JSONB model can safely support the required state. If it can, extend it carefully. If it cannot, use the normalized Supabase design below. Do not create two competing sources of truth.

## Child-facing interaction

### One-click default

The chapter card must keep one large, obvious context-aware button. Clicking it starts or resumes practice immediately—no mandatory modal.

Use child-friendly labels such as:

- new chapter: `Start Smart Practice`
- unfinished saved set: `Resume · Question 7 of 20`
- some bank questions remain unseen: `Continue Smart Practice`
- all stable questions have been explored: `Start Revision`

Keep the existing `Continue →` styling conventions where appropriate, but make the label truthful. A 20-question set must never imply that the whole chapter has been completed.

Add a smaller `Practice options` control on the chapter card or immediately adjacent to the primary button. On mobile, open an accessible bottom sheet; on desktop, use a compact dialog/popover. It must contain:

1. **Smart Practice** — recommended; a balanced 20-question set.
2. **New Questions** — unseen questions only, up to 20.
3. **Fix My Mistakes** — questions that currently need practice.
4. **Question Map** — inspect progress across the chapter.
5. **Full Chapter Journey** — work through all remaining unseen questions in saved chunks of 20, never as one exhausting 100+ question session.

If an option has no matching questions, do not leave a dead button. Show a friendly explanation and a one-click alternative. For example: “Great work—there are no mistakes waiting. Try some new questions.”

A subtle first-use explanation may appear once, but it must be dismissible and must not return after dismissal for that student.

### Smart selection policy

Implement the selector as a small testable module or pure functions instead of burying more conditions inside rendering code. It must:

1. resume the exact saved question IDs and position when a set is unfinished;
2. prevent duplicate IDs within one set;
3. prefer eligible unseen questions;
4. then use questions needing practice;
5. then use improved/due-review questions;
6. finally use secure questions, least-recently-seen first;
7. respect the selected chapter/subchapter, difficulty cap, chapter locks, published-grade restrictions, plan restrictions, and any other existing eligibility rule;
8. degrade gracefully when a category contains fewer questions than requested;
9. avoid repeatedly placing the same question near the beginning of successive sets;
10. be deterministic under a seeded random source so it can be tested.

A reasonable default mix when enough questions exist is approximately 60% unseen, 25% needing practice, and 15% due review. Treat this as a starting policy, not a reason to violate eligibility or fill a set with duplicates.

`New Questions` must never silently include already-seen questions. If only 7 unseen questions remain, say so and create a 7-question set. `Fix My Mistakes` should prioritise the least recently retried mistakes. `Full Chapter Journey` should continue unseen-first in chunks and remember the current chunk and position across refreshes/devices.

### Practice-set completion

Replace ambiguous completion language with `Practice Set Complete` and show:

- score for this set;
- new questions explored in this set;
- `X of Y chapter questions explored`;
- number still needing practice;
- short, encouraging text without implying mastery from a tiny sample.

Offer context-aware actions, preferably no more than three:

- `Continue with new questions` when unseen items remain;
- `Fix my mistakes` when mistakes remain;
- `Take a break` / `Back to chapter`.

Only say that all chapter questions were explored when every currently eligible stable question ID has been seen. Even then, use language such as “You have explored all available questions—revision still helps,” not “You have mastered the chapter.”

## Question Map

The Question Map is an optional detail view, not a gate before practice. Display the stable eligible question bank in manifest/subchapter/source order, not in random order. Each cell should show its display number plus an icon/state:

- neutral grey + open circle: **Not tried**;
- orange + `!`: **Needs practice**;
- blue + upward arrow: **Improved**;
- green + check: **Secure**.

Never communicate state through colour alone. Include a visible legend, accessible labels, adequate contrast in light and dark themes, keyboard focus, and screen-reader text. Any interactive cell must have a mobile touch target of at least 44×44 CSS pixels. For large banks, group by subchapter and render/virtualise efficiently rather than creating a sluggish wall of hundreds of controls.

Use these deterministic state transitions unless the existing learning model provides a stronger documented rule:

- a first wrong answer becomes `needs_practice`;
- a correct answer after a wrong answer becomes `improved`;
- an improved question becomes `secure` after a second subsequent correct attempt (do not treat one lucky answer as secure);
- another wrong answer at any time returns it to `needs_practice`;
- a first correct answer may be `secure`, but retain its attempt counts and recency so spaced review still works;
- viewing or skipping a question is not a correct attempt and must not turn it green.

The map’s numbers are display positions, not durable identities. Persist stable question IDs. Adding new question files later must increase the total without erasing or misassigning old progress.

Do not put dynamically generated questions in this map unless they have a genuinely deterministic, durable ID representing the exact question and answer. Audit generator-based questions and either define safe stable identities or exclude them from coverage totals with a short UI explanation. Never use question text as the database key.

## Supabase persistence and migration

First assess whether a bounded, backwards-compatible extension of `student_progress.data` is sufficient. Account for multi-device use, concurrent writes, offline retry, bank growth, and the size of chapters with hundreds of questions. If JSONB would lead to lost updates or an ever-growing monolithic payload, implement normalized question progress.

The preferred normalized shape is conceptually:

```sql
student_question_progress (
  student_id,
  question_id text,
  subject_pack_id text,
  chapter_id text,
  first_seen_at timestamptz,
  last_seen_at timestamptz,
  attempts integer,
  correct_attempts integer,
  wrong_attempts integer,
  consecutive_correct integer,
  last_result text,
  ever_wrong boolean,
  recovered_at timestamptz,
  updated_at timestamptz,
  primary key (student_id, question_id)
)
```

Adapt types and foreign keys to the repository’s actual schema; do not blindly paste this sketch. Add only useful indexes, likely starting with `(student_id, chapter_id)`.

Writes must be atomic and retry-safe. Prefer a narrowly scoped RPC that derives the active student from the authenticated session or otherwise verifies ownership; clients must not be able to submit progress for an arbitrary student. If network retries could increment attempts twice, add a durable idempotency/event key design rather than hoping retries do not happen. Fix the `search_path` on any `SECURITY DEFINER` function and grant execution only to intended roles.

RLS requirements:

- a student can read and record only their own progress;
- an owning parent can read their child’s progress under the same ownership rules already used by the app;
- administrators may read it where the existing admin model permits;
- one family/student cannot read another’s records;
- anonymous classroom/guest assignment work must not leak into or impersonate family-student progress;
- direct table writes should be denied if the RPC is the intended write path.

Keep chapter aggregate statistics compatible during rollout. Define one authoritative source for each displayed number. Avoid updating both JSON and a new table independently from the browser without an explicit reconciliation strategy.

Existing `answeredIds` can be backfilled only as “seen with outcome unknown.” Do not invent per-question correctness from chapter-wide totals. During migration, old users must retain their current aggregate history; unknown legacy items should have a neutral legacy state until they answer them again. Document the dual-read or compatibility period and a rollback approach.

Create the database change in a **new, separate migration file**, preferably:

`migrations/20260908_chapter_question_progress.sql`

The worktree currently contains intentionally deleted/changed migration files. Do not restore, rename, or modify those unrelated files. If repository conventions clearly require a different migrations location, follow the convention but still keep this change separate. Also update the canonical `supabase-schema.sql` so a fresh installation has the same final schema. Make the migration safe to rerun where practical.

### Authorised remote application and credential safety

The user will supply a Supabase access token or other required credential. Treat every credential as secret:

- prefer a short-lived credential supplied through an environment variable or the Supabase CLI login mechanism;
- never ask the user to put a token in a repository file;
- never write it into source code, SQL, `.env` committed to Git, shell history, test snapshots, logs, screenshots, or your final report;
- never print the credential or run a diagnostic command that exposes its value;
- if the user pastes it directly into chat, use it only for the authorised operation, do not repeat it, and recommend revoking/rotating it afterward;
- do not use or expose the browser application's Supabase anon key as if it were an administrative credential, and do not request the service-role key when a narrower Supabase access token is sufficient.

Before touching the remote database:

1. determine the exact intended Supabase project reference from existing configuration or ask the user if it is ambiguous;
2. state the project reference and environment (for example, production) without revealing secrets;
3. validate the SQL locally, review the generated schema diff, and run the relevant SQL/RLS tests;
4. inspect Supabase migration status and the complete set of statements the chosen command would apply;
5. stop and ask the user if the command would apply any migration other than this feature's migration, or if destructive/unrelated schema changes appear;
6. take or confirm an appropriate schema/backup recovery point using the project's established process;
7. apply only this reviewed migration using an official supported Supabase mechanism;
8. verify the new table/functions/policies and perform a small authenticated smoke test without reading or changing unrelated user data.

Authorisation is deliberately narrow: it covers the new chapter-question-progress migration only. It does **not** authorise applying other pending migrations, overwriting production data, resetting the database, disabling RLS, deploying the website, pushing Git changes, or changing Supabase project settings. A broad command such as `supabase db push` is acceptable only if its preview proves it will apply exactly this one migration. Otherwise use a safe official method that targets the reviewed SQL precisely, or stop and explain the blocker.

## Saved set/session state

Persist enough state to resume an unfinished practice set on another device:

- student, subject pack, chapter/subchapter and mode;
- ordered stable question IDs;
- current position;
- answers already recorded (without exposing protected correct answers);
- timestamps and a schema/version marker.

Keep this state bounded. Completing or abandoning a set should archive/delete the active resume record according to a clear rule. A refreshed page must return to the correct chapter and unfinished position, without flashing the wrong student page.

## Parent-facing truthfulness

Where chapter progress appears in the child or parent UI, separate these concepts:

- **coverage:** unique stable questions explored / currently available;
- **practice:** attempts or practice sets completed;
- **understanding:** accuracy with a sample-size warning and number needing practice.

Do not label a chapter mastered from one or two correct answers. Do not use `6/6 started` as a completion percentage. Bonus chapters must be included or explicitly separated in the denominator so the label is unambiguous.

## Reliability, performance, and compatibility

- Preserve all current question formats and ordinary chapter functionality.
- Do not load the entire global question bank just to draw one chapter map.
- Preserve stable IDs and protect correct-answer data from unauthorised endpoints.
- Handle newly added, removed, or renamed question IDs gracefully and log/report orphaned progress without crashing.
- Merge concurrent progress safely; an older device write must not overwrite newer per-question state.
- Queue/retry failed writes without falsely confirming a save. Show a quiet offline/sync state when needed.
- Keep UI usable at 360px width and in both light and dark themes.
- If shell assets change, bump the service-worker cache version following the repository’s existing convention so users do not keep stale JavaScript/CSS.

## Tests and verification

Add focused automated tests using existing repository patterns. At minimum cover:

1. a 20-item Smart set has no duplicate IDs;
2. unseen questions are selected before repeated secure questions;
3. exact unfinished sets resume at the saved position;
4. New Questions returns fewer than 20 rather than padding with repeats;
5. wrong → correct → correct follows needs-practice → improved → secure;
6. a later wrong returns a secure/improved item to needs-practice;
7. adding bank questions increases the denominator without corrupting old IDs;
8. unstable/generated questions are handled according to the documented policy;
9. difficulty caps, locks, subchapters and published-grade restrictions remain enforced;
10. assignment/guest activity does not contaminate ordinary chapter progress;
11. retrying the same Supabase write is idempotent;
12. concurrent device writes cannot lose attempts or regress recency/state;
13. RLS tests prove cross-family reads/writes fail and owning-parent reads succeed;
14. map controls have labels, keyboard operation, non-colour state cues, and acceptable mobile targets;
15. completion copy never calls one 20-question set a completed chapter.

Run the relevant existing checks plus the new focused tests. If the whole suite has unrelated pre-existing failures, identify them precisely rather than changing unrelated code to make the report green. Perform a manual smoke test for one Grade 5 Maths chapter with more than 20 questions, on narrow mobile and desktop widths, in light and dark themes.

## Deliverables

Implement the feature end to end and finish with a concise report containing:

- the UX behaviour now visible to a child;
- the exact selection/state rules implemented;
- database design decision and why;
- all changed files;
- the separate SQL migration path, target project reference, exact application mechanism, and remote migration result;
- compatibility/backfill behaviour for existing `answeredIds`;
- tests run and their results;
- anything deliberately deferred.

Do not deploy the website, push, or commit. You are explicitly authorised to run only this feature's reviewed Supabase migration under the credential and safety rules above. If the required credential or unambiguous project reference is not available, stop before the remote step and request it.

---
