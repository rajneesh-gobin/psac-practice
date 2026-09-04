# Guest classrooms release

## Deployment order

1. Back up the database and test on staging first.
2. Run `supabase-teacher-guest-classrooms.sql` in the Supabase SQL editor as the
   database administrator. The transaction checks for the existing guest
   infrastructure and rolls back if a statement fails. It does not import or
   modify registered-child classroom membership.
   Then run `supabase-teacher-classroom-assignments.sql`. This follow-up permits
   nickname assignments in empty classrooms and adds assignment archiving.
   If the first migration is already applied, run only the follow-up; do not
   reapply the first migration after the follow-up (it has older function bodies).
3. Deploy the frontend and Netlify functions together. The updated guest page,
   assignment-open endpoint and teacher workspace require the new RPCs. The
   existing service-role environment variable is required; never put it in JS.
4. Exercise the checklist below using two approved teacher accounts and separate
   pupil browser sessions before announcing availability.

Do not run the generated schema dump or legacy destructive migration sections.
This migration has not been executed by the coding agent. No local PostgreSQL
executable was available; Node/static tests do not validate PostgreSQL execution.

## Features and boundaries

- Classes: create, rename, archive/restore. Separate from classes for registered
  family accounts; these pupils are guests and do not receive login accounts.
- Pupils: add, rename, reveal PIN, reset PIN, remove/restore. Remove is reversible
  deactivation, not permanent deletion; historical scores remain.
- Random four-digit PINs, including leading zeros, are unique within each class.
  PIN ciphertext and keyed lookup are hidden behind RLS and owner-checked RPCs.
  Encryption keys are stored in the protected class records: this protects API
  access, not against a database administrator or a full database compromise.
- Reveals happen only on an explicit owner action; PINs never appear in public
  links, the pupil list response, browser storage or assignment share text.
- Classroom homework snapshots the currently active roster. New pupils join
  future assignments; removing a pupil revokes entry to old assignments too.
  Resetting a PIN invalidates their outstanding attempt tokens.
- Each assignment has one shared link. Classroom mode requires only the pupil
  PIN. Open mode asks only for a nickname. The old shared-PIN mode is retained.
- Classroom placement is independent of nickname entry. Teachers may select a
  classroom with no pupils, or choose standalone. PIN entry still requires a
  populated classroom. The main Assignments tab shows all work, including
  standalone assignments, with filters; each classroom shows only its own work.
- Active, closed/expired and archived views are distinct. Archive closes entry
  and submissions but retains results. Restore uses the previous status and
  never extends expiry. Applies to legacy assignments too.
- Per-assignment classroom leaderboards are private to the teacher and only
  use PIN-identified submitted work. Latest attempt only, ties share rank,
  no speed-based ranking and no zero scores for unsubmitted work. Nickname
  assignments still have results but are not eligible for the leaderboard.
- Nicknames are unverified and scoped to one assignment. A name already in use
  cannot replace an unfinished attempt. After an interruption, another nickname
  can be used but becomes a separate result; durable guest resume is future work.
- Classroom identity uses UUIDs internally, not names, so duplicate names are
  supported. Nickname mode does not claim verified identity or class attendance.
- Classroom capacity covers the selected roster (up to 200 pupils per class).
  Existing daily creation quotas remain. Open assignments retain existing tier
  capacity limits. Assignment expiry remains 48 hours.
- Per-assignment/IP wrong-PIN limit: ten failures per ten minutes. Success does
  not reset failed attempts. Open joins are limited to 100 per ten minutes per IP.
  A 4-digit PIN is convenient, not strong identity proof; anyone who knows it can
  impersonate the pupil. Teachers must share PINs privately.
- Existing retention of submitted results applies. Removed pupils and archived
  classes are retained for historical linkage; permanent erasure/retention UI
  and printable PIN slips are not part of this batch.

## Release checks

- Teacher A creates two classes; Teacher B cannot list, edit, reveal or reset A's
  pupils using guessed IDs. An anonymous client cannot execute management/open
  service RPCs directly. Pending, expired and suspended teachers are refused.
- Add two pupils with the same name. Verify four-digit distinct PINs, including
  a leading-zero PIN. Rename one; its UUID/result identity stays unchanged.
- Reveal/reset/remove/restore; verify the old PIN fails after reset and removed
  pupils cannot open or submit. Archive/restore the class and repeat.
- Create homework for a 40-pupil roster. Share one link; a pupil opens with only
  their own PIN and the teacher sees their name and score, plus not-started pupils.
- Ten wrong PINs from one source are limited; successful classroom entries from
  40 pupils on the same school IP are not counted as failures.
- Create an open assignment. Metadata asks only for nickname, not PIN. Two
  different nicknames have separate results; duplicates cannot overwrite work.
- Complete work, grant retry, reopen and submit again. Verify scoring occurs
  through the service endpoint, not a client-supplied score.
- Confirm old assignment links still request name/shared PIN and submit normally.
- Refresh/switch teacher accounts while roster or PIN requests are pending:
  no late pupil/PIN response may appear in the other account.
- Test on mobile: class management, assignment selection and both entry modes.
- Create nickname homework in a classroom with zero pupils; confirm it appears
  in that classroom and in the main tab. Create standalone homework and confirm
  it does not appear inside any classroom. Test foreign classroom IDs are denied.
- Archive/restore active, expired and already closed assignments; repeat the
  operation and verify it is idempotent. New entry/submission must fail while
  archived, including through the legacy route. Results must remain accessible.
- Verify tied leaderboard scores, no ranking of unfinished work, and no
  cross-class or nickname leaderboard access. Confirm roster-only pupils show
  as not started, not as zero-score entries.

## Local checks run

- `node scripts/test-guest-assignment-access.js`
- `node scripts/test-teacher-workspace.js`
- `node scripts/check.js`
- JS syntax checks and `git diff --check`

## Rollback

Prefer fixing forward after new classroom assignments exist. Reverting the
frontend/functions makes these new links unusable; legacy links remain intact.
To pause new usage, archive affected classrooms as the owning teacher. Retain new
tables and records; do not drop them or the submission guard to roll back the UI.
Restore a backup only with an explicit data-loss/recovery decision. The guard
trigger intentionally protects new-mode submissions while leaving legacy rows
unchanged.
