# PSAC Practice — Working Plan

Started 2026-08-25. Read this file first when resuming — it reflects verified
code/DB state, not doc claims. Background: `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`
and the doc-audit findings below explain *why* each item matters.

---

## 0. Uncommitted local changes (not from this session)

Working tree has edits made directly in an editor, unrelated to the fixes below:
`index.html` (revamp banner copy), `style.css` (re-enabled text selection),
`engine/protect.js` (right-click/drag protection disabled), `sw.js` (cache
bumped to `v2`). Decide what to do with these (commit, discard, keep editing)
before committing the security fixes below, so they don't get mixed into one
commit unintentionally.

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

## 2. BLOCKED ON YOU — is guest homework actually working in prod?

**Problem:** `netlify/functions/assignment-submit.js` calls `guest_submit`
with a `p_token` argument (6-arg signature, from `supabase-guest-submit-token.sql`).
The last known-good schema snapshot (`supabase-schema-snapshot.sql`, generated
2026-08-25 12:25 UTC) still shows the **5-arg** signature with no `p_token`.
If the token migration hasn't been run, every guest submission returns
`server_error` and children's homework marks are silently lost.

Anon-key probing can't distinguish the two signatures (identical `42501`
either way) — this needs SQL console access.

**Action needed — run in Supabase SQL Editor:**
```sql
select pronargs from pg_proc where proname = 'guest_submit';
```
- `5` → migration not run, **live incident**, go to fix steps below.
- `6` → deployed; also check:
  ```sql
  select 1 from pg_tables where tablename = 'guest_assignment_attempts';
  ```
  to confirm `supabase-guest-hardening.sql` (H1–H3) also landed.

**If migration is missing, run in this order** (each file's own header states
its prerequisites):
1. `supabase-guest-assignments.sql` — base guest tables/RPCs (skip if already applied)
2. `supabase-guest-hardening.sql` — per-assignment lockout, seat-leak fix, server-side timer
3. `supabase-guest-submit-token.sql` — impersonation fix (per-attempt token).
   Its header says "safe to run: the guest tables are empty" — **re-verify
   that's still true** before running; real submissions may exist by now.

- [ ] Run the check query, report `pronargs` back.
- [ ] Run missing migrations if needed.
- [ ] Re-verify with a real guest assignment end-to-end (open → answer → submit → check row saved).

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

**Also unrelated, found in passing:** `scripts/check.js`'s inline-handler regex
false-positives on `onXXX="if(...)"` (matches `if(` as if it were a module
method call). Pre-existing on `dev`, harmless (just noisy CI output). Fix the
regex if touching that file for other reasons — not urgent.

---

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

1. §2 (guest submission check) — one query, tells us if there's a live incident
2. §1 cleanup (test + commit the push-subscribe fix, already coded)
3. §3 (session bug) — quick RPC fix
4. §4 (VAPID rotation) — quick once confirmed safe
5. §5 (docs) — no urgency, but do before telling another AI session to
   "read CLAUDE.md first"
