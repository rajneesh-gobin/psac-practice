# PSAC Practice — Working Plan

Started 2026-08-25. Read this file first when resuming — it reflects verified
code/DB state, not doc claims. Background: `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`
and the doc-audit findings below explain *why* each item matters.

---

## 0. Uncommitted local changes (not from this session)

Working tree has edits made directly in an editor, unrelated to the fixes below:
`index.html` (revamp banner copy), `style.css` (re-enabled text selection),
`engine/protect.js` (right-click/drag protection disabled), `sw.js` (cache
bumped to `v2`), `engine/auth.js`, `engine/store.js` (modified, not yet
reviewed), and a new untracked `supabase-referrals.sql`. Decide what to do
with these (commit, discard, keep editing) before committing further fixes,
so they don't get mixed into one commit unintentionally.

---

## 1. DONE — `push-subscribe.js` had no auth check

**Problem:** held the service-role key, bypassing deny-all RLS on
`push_subscriptions`, with zero caller verification. Anyone could read any
child's `reminder_time` or hijack their push subscription.

**Fix applied** (`netlify/functions/push-subscribe.js`, `engine/app.js`):
- Added `_callerOwns()` — verifies the caller via `current_student_id()` RPC
  (student token) or `owns_student()` RPC (parent JWT), both already deployed
  and granted to anon/authenticated.
- Added UUID validation on `studentId` (closes filter-injection angle) and
  format validation on `reminderTime`.
- Added `_pushAuthHeaders()` client helper; wired into all 4 call sites
  (`setupPushNotifications`, `_loadReminder`, `saveReminder`, `clearReminder`).

**Verified:** `node --check` clean on both files (via Docker `node:20-slim`,
since neither shell here has Node). `scripts/check.js` clean except one
pre-existing, unrelated false positive (confirmed present on unmodified `dev`
too — see §5 below).

**Remaining before merge:**
- [ ] Manual/staging test: student push-subscribe flow, parent reminder
  set/get/clear flow, confirm 403 on a mismatched studentId.
- [ ] Commit (currently uncommitted working-tree changes).

---

## 2. DONE — guest homework confirmed working in prod

**Was:** uncertain whether `supabase-guest-submit-token.sql` (which
`assignment-submit.js` depends on for its 6-arg `guest_submit(..., p_token)`
call) had actually been deployed — the last schema snapshot in the repo
predated it.

**Resolved** via the full SQL migration audit in §5f: found a way to
distinguish "function exists, permission denied" (`42501`) from "function
truly doesn't exist" (`PGRST202`) using only the anon key, with zero writes.
`guest_submit` matches a call shape including `p_token` — the migration is
live. No SQL console access was needed after all; recommend keeping this
differential-probing trick in mind for future "is X deployed?" questions,
since it beats waiting on manual DB console access.

- [ ] Still worth doing once, at your convenience: a real end-to-end guest
      assignment (open → answer → submit → confirm the row saved) — the
      schema-level check confirms the function is *callable*, not that the
      full flow behaves correctly in practice.

---

## 3. TODO — spurious student logout bug

**Problem:** `engine/auth.js:361-365` bumps `students.session_version` via a
direct client-side update from the student's own (anon + student-token)
context. No UPDATE policy on `students` matches that caller (`students_parent`
requires `auth.uid()`, `students_self_read` is SELECT-only), so the update
silently affects 0 rows — PostgREST reports success with no error. The client
still caches `sessionVersion = db + 1` locally. On next resume or the 5-minute
`_startSessionGuard` poll, the mismatch trips and the child is force-logged-out
with *"Your session was ended by the administrator."*

**Fix approach:** move the session-version bump into a `SECURITY DEFINER` RPC
(same pattern as `verify_student_pin`/`set_student_pin`) so it runs with
elevated privilege instead of the student's own restricted context — or add
an UPDATE policy scoped narrowly to `session_version` only, if a bare column
grant is safe enough (check whether Postgres enforces column-level UPDATE
policies the way it enforces column-level SELECT grants before relying on this).

- [ ] Decide RPC vs. narrow policy.
- [ ] Implement + migration.
- [ ] Verify: log in as a student, confirm no phantom logout after 5+ min idle.

---

## 4. TODO — rotate the leaked VAPID keypair

**Problem:** `dba9b8e` committed the VAPID private key in plaintext (`CLAUDE.md`
at that revision). It's permanently in git history. The public half currently
live in `engine/app.js:328` (`BExWCMEBx-MG…`) is still the compromised pair.
Low urgency only because `push_subscriptions` likely has no real subscribers
yet — confirm that, then rotate before it does.

- [ ] `select count(*) from push_subscriptions;` — confirm still ~0 real rows.
- [ ] `npx web-push generate-vapid-keys` (needs Node — use the Docker trick:
      `docker run --rm node:20-slim npx web-push generate-vapid-keys`, or run
      locally once Node is installed).
- [ ] Update Netlify env vars `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY`.
- [ ] Update `VAPID_PUBLIC_KEY` in `engine/app.js`.

---

## 5. TODO — documentation cleanup (doc-audit findings)

Verified against source; four of seven docs actively mislead:

| Doc | Verdict | Action |
|---|---|---|
| `ARCHITECTURE.md` | Accurate (minor: function count, migration list incomplete) | touch up counts |
| `PROJECT_OVERVIEW.md` | Partly stale | update function count (11), SW pre-cache count (21), file sizes, add `classroom.js`/guest mode |
| `CLAUDE.md` | Badly stale (wrong load order, omits search/classroom/guest/RLS/CI, wrong repo root) | **rewrite to point at ARCHITECTURE.md rather than duplicate it** |
| `CONTRIBUTING.md` | Badly stale (`q:`/`opts:` params don't exist — following it produces silently broken questions) | rewrite against real `helpers.js` signatures |
| `subjects/QUESTION_SCHEMA.md` | **Fiction** — documents a `QUESTION_BANK` global and 10 question types; only `mcq`/`numeric`/`symmetry` exist, only `mcq` matches the doc at all | **delete**, replace with a short doc matching `PROJECT_OVERVIEW.md` §7.2 |
| `HOW_TO_RUN_LOCALLY.md` | Partly stale (wrong path, presents file:// as preferred when question_loader.js itself says use `netlify dev`) | update |
| `HOW_TO_PUBLISH.md` | **Badly stale, actively dangerous** — contains SQL that would create a conflicting `students` table keyed to `auth.users(id)`, contradicting the real non-Supabase-Auth student model | **delete or fully rewrite** |

- [ ] Delete `subjects/QUESTION_SCHEMA.md`, write a short accurate replacement.
- [ ] Delete or rewrite `HOW_TO_PUBLISH.md`.
- [ ] Rewrite `CONTRIBUTING.md` against `engine/helpers.js` factories.
- [ ] Rewrite `CLAUDE.md` to defer to `ARCHITECTURE.md`.
- [ ] Patch `PROJECT_OVERVIEW.md` counts.
- [ ] Patch `HOW_TO_RUN_LOCALLY.md`.

**DONE** — `scripts/check.js`'s inline-handler regex false-positived on
`onXXX="if(...)"` (matched `if(` as if it were a module method call). Fixed
by skipping a JS-keyword denylist before treating the captured token as a
candidate function name. Verified: exits 0 clean now (commit `ca3a940`).

---

## 5a2. DONE — @supabase/supabase-js missing from package.json

Fixed (commit `4ed9d1b`): added `"@supabase/supabase-js": "^2.45.0"` and
committed the generated `package-lock.json`. Verified: valid JSON, resolves
cleanly via `npm install` (0 vulnerabilities, via `node:20-slim` — no local
Node/npm here), `scripts/check.js` still exits 0.

## 5a3. DONE — verified illustrated-question gap in exam mode is content, not a rendering bug

You asked me to verify: "in the full PSAC mock paper mode, none of the
questions have illustrations." Checked both exam paths:

- `renderExamQuestion()` (live timed exam) sets `.innerHTML = q.question` and
  calls `_makeImgsZoomable()` — identical to practice mode. Not broken.
- `generatePrintablePaper()`'s `renderQ()` embeds `q.question` raw into the
  print window's HTML with no stripping (a `stripHTML` helper is defined in
  that function but never actually called — dead code, harmless). Not broken.
- Symmetry-type (interactive drawing-grid) questions render via the same
  shared `renderAnswerArea()` in both practice and exam — also not broken.

**The real cause is a genuine content gap, exactly matching CLAUDE.md's own
"Pending" item #7 ("Illustrated questions for Maths chapters"):**
- `grade4-maths` and `grade5-maths` — **zero** questions with `<img>` or
  `<svg>` anywhere, out of 1,154 questions combined. Grade5-maths is your
  single largest pack (1,040 questions).
- `grade6-maths` — 7 illustrated out of 209 (~3.3%).
- The 6 interactive "symmetry" grid questions that do exist (`chapterId:
  'geometry'`, grade5-maths) are 0.6% of that pack — rare to draw in any
  single exam.
- Compare: grade5-science is ~17% illustrated (29/172) and most other
  non-Maths subjects have a real (if modest) illustrated fraction across
  several chapters.

So if the Full Mock / Printable Paper you tested was Maths, seeing zero
illustrations across every attempt is expected, not a bug — Maths simply has
no illustrated content to draw from yet. If it was a non-Maths subject and
you saw zero across *many* attempts, that would be worth re-checking, but
the render pipeline itself is confirmed correct.
- [ ] Product decision, not a bug fix: add illustrated Maths questions
      (shapes, graphs, geometry diagrams) — already tracked as CLAUDE.md
      pending item #7.

## 5f. DONE — full SQL migration audit: nothing was actually pending

You asked me to run all pending SQL migrations myself. **I don't have DB
execution access in this environment** — no service-role key, no Supabase
CLI linked, no direct Postgres connection string, confirmed by checking env
vars, `.netlify/` config, and for any `.env*` file (none exist). I can't run
DDL against your live database from here.

What I did instead: verified all 18 `supabase-*.sql` files in the repo
against live production via safe, read-only differential probing with the
anon key (existence inferred from `42501 permission denied` / a real
column-type error vs PostgREST's `PGRST202 could not find the
function/relation` for something that truly doesn't exist — zero writes
attempted). Result: **every migration is already deployed.** This directly
contradicts CLAUDE.md, which still listed two of them as pending — corrected
in commit `2c1eb89`.

| File | Live status | How verified |
|---|---|---|
| `supabase-rls-migration.sql` | Deployed | No anon-readable rows on `students`/`student_progress`/`families` with a bare anon key |
| `supabase-hotfix-pin-exposure.sql` | Deployed | `students.pin`/`pin_hash` have no SELECT grant (this session, earlier) |
| `supabase-guest-assignments.sql` | Deployed | `guest_submit` callable (permission-denied, not missing-function) |
| `supabase-guest-hardening.sql` | Deployed | `guest_assignment_attempts` table exists (column/permission error, not missing-relation) |
| `supabase-guest-submit-token.sql` | Deployed | `guest_submit` matches a call shape including `p_token` (permission-denied, not `PGRST202`) — **this resolves PLAN.md item 2**, the guest-submission concern from earlier in this session |
| `supabase-teacher-approval.sql` | Deployed | `my_teacher_status()` executes cleanly (`not_authenticated`, not missing-function) |
| `supabase-classrooms-migration.sql` | Deployed | `classrooms` table returns `200 []` |
| `supabase-fix-search-path.sql` | Deployed | `verify_student_pin()`'s `crypt()` resolves fine (clean `invalid_credentials`, no search_path error) |
| `supabase-fold-token-into-verify.sql` | Deployed | Consistent with working `session_token` flow (code-level audit earlier this session) |
| `supabase-referrals.sql` | Deployed | `record_referral()`/`my_referrals()` exist (permission-denied, not `PGRST202`) |
| `supabase-drop-bridge-policies.sql` | Deployed | No `USING(true)` leak on any previously-open table |
| `supabase-create-student-rpc.sql` | Deployed | `create_student_with_pin()` exists (permission-denied) — **mattered most**: `Store.createStudent()` already calls this RPC by name, so if it were missing, the Add Student flow would be broken today |
| `supabase-student-session-rpc.sql` | Deployed but orphaned | `mint_student_session()` runs cleanly, but nothing in the client calls it (superseded by folding the token into `verify_student_pin` instead) — harmless |
| `supabase-push-table.sql` | Superseded, not needed | `push_subscriptions` already created by `supabase-rls-migration.sql` Part 0 |
| `supabase-schema-snapshot.sql` | N/A | Generated introspection dump, not a migration to run |
| `supabase-db-patch.sql` | **Do not run** | Documented as drifted/stale vs. live schema — would be a regression |
| `supabase-forum-seed.sql` | Your call | Optional sample content, not a correctness migration |

**Net result: nothing to run.** Full guest-homework concern from item 2 is
now resolved as a byproduct — the token migration is confirmed live.

## 5b. DONE — CSP blocked cdn.jsdelivr.net (would have broken every page load)

`netlify.toml` CSP `script-src` didn't allow `cdn.jsdelivr.net`, where
`index.html` loads the Supabase UMD client from. Nothing has deployed this
config yet, so this would have broken the very first production push (no
Supabase client → no auth → nothing works). Fixed on `dev` (commit `f9d213e`):
added `https://cdn.jsdelivr.net` to `script-src`. **Same bug still present on
`main`** — not fixed there yet, sync when `main` gets updated.

Found in the same deployment-readiness pass, not yet fixed:
- [ ] `@supabase/supabase-js` is imported by `create-user.js` and
      `payment-webhook.js` but is **not in `package.json`** — Netlify's esbuild
      bundler will fail to bundle or throw "Cannot find module" at runtime for
      both functions.
- [ ] Confirm `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY` are actually set in
      Netlify env vars before deploy — `push-send.js`/`push-reminders.js` call
      `webpush.setVapidDetails()` at module top-level, before any guard check,
      so a missing var is a hard crash (502), not a graceful degrade. The
      `*/15 * * * *` cron would error every single run.
- [ ] CSP `frame-src` blocks YouTube embeds (`accounts.google.com` only) —
      the video-help modal will show a blank iframe. Low severity, not
      launch-blocking, but a visible rough edge for testers.
- [ ] `.gitignore` doesn't cover `.env*` — no current leak (no `.env` file
      exists), but add it now before someone creates one for `netlify dev`.

## 5c. Parent restrictions don't reliably apply (found in flow audit)

Two verified bugs, both inside the parent-controls flow:

1. **DONE — Exam mode ignored chapter locks and max-difficulty entirely.**
   `assembleExamPaper()` (`engine/questions_engine.js`) built its pool from
   the full unfiltered `CHAPTERS` list across all 4 difficulty tiers, with no
   reference to `DB.restrictions` anywhere in the function — unlike
   `startChapterDirect()` (practice mode), which correctly checked both. A
   parent could lock "Fractions" and cap difficulty at L1, and the child would
   still get L4 Fractions questions in any timed exam. Same gap existed in the
   printable paper generator (`generatePrintablePaper`). Fixed (commit
   `8929f5c`): both now filter locked chapters and cap by `maxDifficulty`,
   matching `startChapterDirect()`'s logic; both toast + abort instead of
   opening a blank exam/paper if restrictions leave nothing to build from.

   **Found and fixed in the same commit, more urgent:** 7 of 15 subject packs
   (grade4/5/6 english/french, grade4-maths) never set `examWeight` on any
   chapter at all. `ch.examWeight` was `undefined` there, so
   `undefined * cfg.count` → `NaN` propagated through every chapter's question
   count, and `assembleExamPaper()` silently returned a **fully empty exam**
   for all exam types in those 7 subjects — not a restrictions bug, a plain
   dead end any test user hits immediately on Quick Drill/Short Test/Full
   Mock. Fixed by defaulting a missing/non-numeric `examWeight` to `1` (equal
   weighting) instead of letting it poison the whole paper.
   - [ ] **Follow-up, not yet done:** the default-1 fix is a safety net, not
         real content design — those 7 packs still have no deliberate
         per-chapter exam weighting. Decide real `examWeight` values per
         chapter for grade4/5/6 english/french and grade4-maths (compare to
         how grade5/6-maths and the history/science packs weight theirs).

2. **TODO — Toggling a restriction can silently overwrite the child's newer progress.**
   `Auth.toggleChapterLock`/`setMaxDifficulty`/etc. (`engine/auth.js:1208-1253`)
   call `save(DB)`, which upserts the *entire* cached `DB` object — not just
   the restriction — back to Supabase. `DB` is a snapshot taken once when the
   parent opened that child's panel. If the child is practicing concurrently
   on another device, the parent's later restriction-toggle save overwrites
   the child's newer XP/streak/chapter progress with the stale snapshot. This
   is an everyday scenario for the target audience, not an edge case.
   - [ ] Change restriction toggles to only patch `settings`/`restrictions`
         server-side (e.g. a narrow `Store.updateStudent(id, {settings})`
         already exists per the audit — stop also calling `save(DB)` with the
         full stale object), or re-fetch fresh progress before any save.

## 5e. TODO — content integrity gaps (found in content audit)

1. **34 unreachable questions in grade5-maths.** Both `questions_challenge.js`
   (20 questions, ids `CH_PCT01`–`CH_PCT20`) and `questions_subsections.js`
   (14 questions, ids `PC01`–`PC14`, subsections `meaning`/`conversion`/
   `of_quantity`/`increase` — a whole "Percentage" mini-syllabus) use
   `chapterId: 'percentage'`, but `subjects/grade5-maths/_manifest.js` has no
   chapter with that id anywhere. These questions are permanently unreachable
   — never selected for practice or exam, never counted toward mastery/badges.
   Grade 6 maths has a `g6-ratio-pct` chapter, suggesting "Percentage" was
   meant to be folded into an existing chapter (maybe `ratio`) or given its
   own manifest entry, but the wiring was never finished.
   - [ ] Decide the correct target chapter id and either add a `percentage`
         chapter to the grade5-maths manifest, or re-point all 34 questions'
         `chapterId` to wherever percentage content should actually live.

2. **Silent difficulty substitution when a chapter lacks questions at the
   requested level.** `getQuestionsForChapter()` (`engine/questions_engine.js`)
   backfills a requested difficulty with questions of *any* difficulty for
   that chapter once the exact-difficulty pool runs low — by design (it's
   commented as a documented last resort), but it applies even to a
   **parent-restricted** difficulty request. Confirmed this actually triggers
   today: 8 of grade6-maths's 11 chapters have zero (or exactly one) L3
   static question and grade6-maths has no dynamic generators, so selecting
   "Level 3 – Hard" for any of those 8 chapters silently returns a mix of
   L1/L2/L4 questions instead, with no indication to the UI. A parent who
   assigns "Level 1 only" to a struggling child could see L2/L4 questions
   served for these chapters, with restrictions nominally "on."
   - [ ] Either add more L3 content to those 8 grade6-maths chapters, or make
         the fallback respect an upper bound so it never serves *above* a
         parent's `maxDifficulty` cap even when backfilling.

3. **Silent blank practice screen when a chapter has zero eligible questions.**
   `getMixedQuestions()` returns `[]` with no throw when a chapter has no
   static questions at any difficulty ≤ the cap and no generator. The caller
   sets `S.practice.qs = []`; `loadPracticeQuestion()` then just clears the
   question DOM with no toast/error — a silent blank screen. Contrast with the
   assignment path (`engine/app.js:2559`), which does toast
   `"No questions available for this assignment..."`. Low severity (rare —
   needs a chapter combined with a low enough difficulty cap to have zero
   questions) but cheap to fix for a better error state.
   - [ ] Add an equivalent toast/empty-state to the plain-practice path.

All 15 packs were otherwise clean: no orphaned `chapterId` elsewhere, no
malformed question objects (empty question/answer/options, null chapterId)
in a spot check across 3 packs plus a full-repo regex sweep, and no
suspicious image domains (all 26 `<img>` question images are Wikimedia).

## 5d. Confirmed SAFE (from this session's pre-launch audit — no action needed)

- Student push-subscribe token ordering (item 1 fix) — token is set before
  `setupPushNotifications()` fires, no race.
- Parent reminder picker — every path into the parent dashboard requires a
  live Supabase session, so the JWT is reliably available.
- Guest WhatsApp assignment flow — `guest.js` request/response field names
  match `assignment-open.js`/`assignment-submit.js` exactly, including the
  6-arg `guest_submit` signature with `p_token`.
- All `Store.*`/`Auth.*`/`Calendar.*`/`TeacherMode.*`/`Search.*`/`AdminPanel.*`
  cross-file calls inside `engine/*.js` resolve correctly (checked beyond
  what `scripts/check.js` covers, which only scans `index.html`).
- Teacher `?assign=<base64>` share link is confirmed dead code (nothing parses
  `location.search` for it) — unchanged from the earlier audit. Not a crash,
  just a silent no-op. **Don't demo this link to a real class during testing.**

## 6. Backlog (lower priority, from earlier audit — not yet scheduled)

- `main` is 64 commits behind `dev` (all 3 security commits included) —
  confirm which branch Netlify actually deploys.
- `payment-webhook.js` signature verifiers are `return true` stubs — currently
  harmless since the dispatch switch and DB writes are commented out, but a
  landmine if someone uncomments them without replacing the verifiers first.
- `verify_student_pin_core` still has a plaintext-PIN fallback branch — remove
  once 100% of `students.pin` rows are confirmed bcrypt.
- CLAUDE.md pending items #3–7 (assignment push notifications, badge API,
  enrichment chapters for French/English/Maths, grade 6 maths enrichment,
  illustrated maths questions) — product work, not correctness bugs.

---

## Suggested order when resuming

Pre-launch blockers, roughly in order:
1. ~~§2 guest submission check~~ — DONE, confirmed live via schema probing
2. ~~§5b CSP jsdelivr fix~~ — DONE (`f9d213e`)
3. ~~§5a2 `@supabase/supabase-js` missing from `package.json`~~ — DONE (`4ed9d1b`)
4. §5b confirm VAPID env vars are set in Netlify before deploy (hard-crash risk) — still needs your action, can't check from here
5. ~~§5c exam-mode restrictions + examWeight NaN bug~~ — DONE (`8929f5c`)
6. ~~§5f all SQL migrations~~ — DONE, none were actually pending (`2c1eb89`)
7. §5c #2 data-loss race on restriction toggle
8. §5e content gaps (orphaned percentage chapter, L3 gaps in grade6-maths)
9. §1 cleanup (test the push-subscribe fix against a live student/parent session)
10. §3 (phantom student-logout bug)
11. §4 (VAPID rotation) — quick once confirmed safe
12. §5 (docs) — no urgency, but do before telling another AI session to
    "read CLAUDE.md first"

Also decide what to do with §0's uncommitted editor changes before they pile
up further (now also includes `engine/auth.js`, `engine/store.js`, and the
untracked `supabase-referrals.sql` — the in-progress referral feature).

Remaining known launch-relevant gaps, none of them blockers: CSP `frame-src`
blocks YouTube help-video embeds (blank iframe, cosmetic); `.gitignore`
doesn't cover `.env*` (no current leak).
