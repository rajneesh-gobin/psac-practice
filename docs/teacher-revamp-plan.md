# Teacher experience revamp

Status: Phase 1 started locally; not deployed or verified against a live teacher session.
Updated: 2026-09-04.

## Outcome

A teacher can set suitable homework in minutes, confidently collect work from
other devices, identify who needs help, and prepare the next lesson. Keep the
guest link/PIN route: children must not need an email account to do homework.
Scope: officially available Grades 4–6 and their enabled subjects.

## Starting evidence and constraints

- `engine/teacher.js` creates server assignments but lists assignments, results
  and retries through browser-only storage. The storage key is not account-scoped.
- `guest.js` shows immediate feedback even for timed assignments and renders
  only MCQ buttons or text inputs.
- Server functions already include `guest_my_assignments`, `guest_results`
  and `guest_grant_retry`. Reuse after verifying deployed definitions and access checks.
- `engine/classroom.js` already provides classroom/enrolment operations. Audit
  its callers, schema and permissions before designing additional class tables.
- Database defaults include expiry and capacity limits; the interface must
  disclose actual settings, not assume hard-coded defaults.
- This assessment is from repository code, not a verified live database session.
- Preserve parent, child, admin, guest and existing assignment workflows.
- Database work must be supplied in a separate, additive migration file with
  preflight checks, run instructions and rollback guidance. Do not run destructive
  legacy migrations or deploy without the appropriate authorization.

## Phase 1 — Reliable assignment and result foundation

- [ ] Trace both legacy and guest assignment flows; inventory deployed RPCs,
      tables, permissions and existing class functionality.
- [ ] Add a single teacher data layer using authenticated server records as
      the source of truth for assignment history, submissions and retries.
- [ ] Clear in-memory data on account changes. Any cache must be account-scoped;
      distinguish loading, empty, failed and stale/offline states.
- [ ] Recover existing server assignments automatically. Never import unscoped
      local records into an account without verifying server ownership. Preserve
      unverifiable legacy data for explicit recovery, not automatic attribution.
- [ ] Refresh results on opening, on demand, and at a bounded interval while
      visible. Show last updated time and count practice submissions too.
- [ ] Make retry grants server-backed; retain attempt history and clearly label
      latest, first and best scores instead of silently replacing earlier work.
- [ ] Make creation and submission safe against duplicate requests; handle
      connection loss, retries and interrupted sessions without duplicate marks.
- [ ] Provide Close/Reopen where allowed and Archive as distinct actions.
      Explain whether existing attempts can finish when an assignment closes.
- [ ] Display actual question count, deadline, expiry, pupil capacity and quota.
      Warn when the eligible pool is too small; never silently change the count.
- [ ] Enforce teacher approval, suspension, expiry and assignment ownership on
      every server operation, including exports and retries. Escape user text.

Acceptance: teacher creates on device A; pupil submits on B; teacher sees the
same assignment and score on C. Server retry works. Account switching exposes
no other teacher's records. Refresh and network failures do not lose submitted
work. Closing prevents new entry according to the documented policy.

## Phase 2 — Correct practice and test experiences

- [ ] Persist an explicit mode; migrate old timed assignments conservatively.
- [ ] Practice: immediate feedback, hints and explanations.
- [ ] Test: no answers/hints until the configured release point; navigation,
      unanswered-question review and deliberate final submission.
- [ ] Do not send answer keys to the test browser before release. Grade on the
      server and verify public callers cannot bypass this via database RPCs.
- [ ] Let teachers choose duration. Use a server-based start/deadline across
      refreshes; define late-submission grace and visibly flag late work.
- [ ] Store an immutable question/answer snapshot or equivalent content version
      per assignment so content updates cannot change marking mid-assignment.
- [ ] Inventory all question formats. Reuse supported rendering/marking where
      safe; exclude unsupported formats with an explanation until implemented.
      Cover images, diagrams, multi-select, matching and symmetry as applicable.
- [ ] Distinguish random selection at creation from shuffling order per pupil.
      Preserve a consistent difficulty mix and avoid duplicate questions.

Acceptance: identical answers receive identical marks on client/server where
feedback is enabled; tests reveal no answers early; refresh cannot reset time;
each selectable question format is answerable on a phone.

## Phase 3 — Simple teacher workspace

Navigation: Overview | Classes | Assignments | Results. Account/help remain
secondary. One prominent action: Create homework.

- [ ] First-use guide: create/select a class (optional), prepare homework,
      share it. Explain approval status and link/PIN in everyday language.
- [ ] Overview cards: active homework, submissions received, work to review.
      Show “not submitted” only when an expected roster actually exists.
- [ ] Guided creation: grade/subject → chapters/subsections → question count,
      difficulty and mode → preview → class/deadline → share.
- [ ] Preview every question; replace individual items and see answers in the
      teacher preview. Show eligible pool sizes and missing-content warnings.
- [ ] Sensible defaults; put advanced settings behind an expandable section.
- [ ] Assignment cards: class, grade/subject, actual question count, deadline,
      state, submitted/expected count and clearly labelled average accuracy.
- [ ] Search and filters for class, subject, status and date. Provide Duplicate
      for another class, with explicit reuse-or-new-questions choice.
- [ ] Sharing: WhatsApp, copy link/PIN, QR code and printable joining instructions.
      Show expiry/capacity before publishing. Avoid making email mandatory.
- [ ] Friendly confirmation and error messages, mobile touch targets, keyboard
      support, readable contrast and accessible labels; preserve selected filters
      and screen when refreshing.

Acceptance: a first-time teacher can create, preview and share homework without
technical help; test this on mobile and desktop. No hidden setting changes the
assignment after the teacher confirms its preview.

## Phase 4 — Classes and actionable results

- [ ] Reuse/extend existing class and enrolment storage after Phase 1 audit.
      Support create/edit/archive class and invite/join flows.
- [ ] Assign stable pupil identities within classes; two pupils may have the
      same name. Retain a low-friction guest route without claiming guest names
      prove identity or automatically linking them to registered children.
- [ ] Connect assignments to a class and snapshot its expected roster so later
      membership changes do not rewrite historical completion figures.
- [ ] Results: not started, in progress, submitted and late; score, elapsed time,
      attempt history, answers and retry action, with clear filters.
- [ ] Chapter/subsection and question-level analysis: common wrong answers,
      difficult questions and suggested follow-up practice.
- [ ] Keep coverage, participation and accuracy separate. Small samples must
      say “not enough evidence”; never present accuracy as syllabus completion.
- [ ] Individual progress across assignments and teacher feedback. Guest work
      stays separate from family progress unless deliberately and safely linked.
- [ ] Privacy-aware shareable pupil summaries, restricted to authorized
      recipients; no public class leaderboard or exposed pupil contact details.

Acceptance: a teacher can identify missing work and select targeted revision;
duplicate names remain distinct; no one can access another class's pupil data.

## Phase 5 — Time-saving resources and value

- [ ] Export filtered results as CSV and a readable report; protect CSV cells
      against spreadsheet formula injection and enforce export permissions.
- [ ] Download printable worksheets/test papers with a separate answer sheet,
      worked explanations where available, and reliable diagram pagination.
- [ ] Save reusable assignment templates and duplicate to another class.
- [ ] Build revision homework from observed weak topics with teacher preview;
      disclose insufficient evidence instead of guessing a pupil's ability.
- [ ] Optional weekly class summary and reminder drafts. Start with in-app or
      teacher-triggered sharing; automated email/push requires consent, delivery
      monitoring, rate limits and duplicate-send protection.
- [ ] Explain retention before results expire; provide authorized export and
      archive choices without silently retaining children's data indefinitely.

Potential paid value: more classes, larger assignment capacity, reusable packs,
advanced reports and revision planning. Validate with teachers before pricing.
Reliable saving, correct marking, accessibility and privacy are baseline quality,
not premium upgrades. Show any limits before the teacher starts work.

## Verification and rollout

- Unit tests: eligibility/count, mode, timing, grading, state transitions and
  cache isolation; include all supported answer types.
- Integration tests: teacher A/B ownership, pending/suspended roles, guest
  tokens, retry lifecycle, revoked access, expiry and concurrent submissions.
- End-to-end: new teacher → class → assignment → two pupils on separate
  sessions → teacher results → retry → download → archive.
- Regression: parent/child login and switching, existing classes, legacy links,
  student practice/exams and admin approval.
- Exercise mobile refresh/back navigation, offline interruption, duplicate
  clicks, identical pupil names and full classes.
- Pilot with a small teacher group before broad release. Monitor creation and
  submission failures without logging PINs, tokens or unnecessary pupil data.
- Release phases independently behind a reversible rollout switch where useful;
  keep database changes backward-compatible while old clients remain cached.

Success measures: no unexplained missing submissions in the pilot; reliable
cross-device history; first assignment creation time; teacher weekly reuse;
percentage of completed submissions successfully saved; support requests about
joining or results. Measure a baseline before promising numerical improvements.

## Resume instructions

### Classroom assignment organisation — 2026-09-04

Implemented locally: classroom assignment workspace, creation prefilled from a
classroom, optional classroom grouping for nickname work (including empty
classrooms), standalone main-tab work, active/closed/archived filters,
server-backed archive/restore and private per-assignment PIN-pupil leaderboards.
New migration `supabase-teacher-classroom-assignments.sql` follows the earlier
guest-classroom migration. Neither migration has been live-tested by the agent.
Expanded workspace tests cover class isolation, standalone/archived filtering,
score ties, excluding unsubmitted work and rejecting nickname leaderboards.

### Guest classroom batch — 2026-09-04

Implemented locally: guest class create/rename/archive, guest pupil
add/rename/remove/restore and private 4-digit PIN reveal/reset. Assignment access
options now include classroom pupil PIN, open nickname without PIN and legacy
shared PIN. New assignments snapshot classroom rosters and identify pupils with
stable UUIDs. Results include not-started pupils. Public entry returns no roster
or private PINs. See `teacher-guest-classrooms-release.md` for migration order,
checks, security boundaries and remaining limitations.

Separate migration: `supabase-teacher-guest-classrooms.sql`; NOT applied.
Local JS/static checks pass; SQL/live cross-device acceptance still required.

### Implementation batch 1 — 2026-09-04

- Added `engine/teacher_workspace.js`: server assignment list and results,
  server-backed retry buttons, loading/error/retry states, escaped pupil text,
  explicit refresh and account-change/stale-request guards.
- Connected the dashboard to this module; practice submissions are included.
  New assignments no longer write to the shared legacy localStorage list.
  Legacy local result helpers remain for existing app callers; their data is
  not imported into the new teacher workspace.
- Assignment cards show submitted count, capacity and expiry. Sharing an older
  assignment requires the original PIN because the server stores only its hash.
- Prevented simultaneous create clicks and insufficient-pool silent truncation.
- Relabelled the current test choice as timed practice to match its actual
  feedback behaviour. Full assessment mode is still Phase 2 work.
- Added module to index/service-worker shell, bumped shell to v102.
- Passed `node scripts/test-teacher-workspace.js`, syntax checks and
  `node scripts/check.js`. These are mocked/static checks, not live integration.
- No migrations executed or authored in this batch; existing RPC contracts reused.
  Still required: live ownership/approval RPC audit, full cross-device testing,
  durable attempt history, close/archive controls, request idempotency, automatic
  bounded refresh, PIN recovery policy and other unchecked Phase 1 items.

Next action: Phase 1 audit and server-backed assignment/results/retry integration.
Do not start with cosmetic redesign. Update checkboxes only after verification;
record files changed, tests, remaining migration/deployment steps and findings.
Complete Phases 1–2 before treating the teacher portal as assessment-ready.
# UI checkpoint — 2026-09-04

Implemented locally: descriptive workspace navigation (Set work, Classrooms,
Assignments, Results), light/dark responsive styling, classroom onboarding copy,
and numbered assignment setup sections. Existing controls and operations retained.
Browser layout verified at 390px and 1280px; teacher workspace, grade/subject and
guest-assignment regression checks passed. Deployment is still required.
