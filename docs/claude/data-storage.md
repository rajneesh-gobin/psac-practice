# Data & storage — the progress blob, saving, the question cache

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read this before touching `store.js`, `question_loader.js` or `DB`.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## Data & storage

### The progress blob (`DB` → `student_progress.data`)
`stats` · `chapters[id].{attempted,correct,last}` · `examHistory` · `daily` ·
`mistakes` · `assignments` · `restrictions` · `dailyGoal` · `games` · `cloze` · `hunt`.
New keys go in `Store._defaultStudent()` so the key-merge in
`loadStudentProgress()` backfills every existing child for free — and so there is
**no new column-level GRANT to forget**.

| Key | Shape | Cap |
|---|---|---|
| `daily` | `{'YYYY-MM-DD': {a, c, e, s, g, ch:{id:[att,corr]}, asg:{…}}}` | `_DAILY_KEEP` 120 days, `_DAY_CH_KEEP` 12 chapters/day |
| `mistakes` | newest-first | `_MISTAKE_KEEP` 60 |
| `games.sourceGrades` | `[6]` — grades the CHILD added to their games | own grade is implicit and never stored |

- ⚠ **`games.sourceGrades` is in the blob because the CHILD writes it.** A child
  session has SELECT only on `students`, so anything a child chooses for
  themselves cannot live in `restrictions`. It is validated on every read against
  what the parent granted (`GradeAccess.gameGrades`), so a revoked grade stops
  counting without anyone writing to the blob. See **Grade access** in
  [features.md](features.md).

- ⚠ **Day keys are Mauritius days (`_muDayKey`), never the device clock** — a child
  changing timezone would rewrite their own history. `YYYY-MM-DD` is chosen so a
  lexicographic sort *is* chronological; the prune relies on it. **One deliberate
  exception**: calendar squares are keyed on the *local* date.
- **Attribution**: exam and assignment answers do **not** write `daily[].ch` (each
  already has a dated row of its own). Day totals `a`/`c` count every answer
  whatever the source, and chapter mastery still counts exam answers.
- **Skips are not mistakes.** Mistake text goes through `_plainText()` capped at
  160 chars — question text is `innerHTML` and can carry a whole inline SVG.
- `s` = **time on task, measured as the gap between consecutive answers capped at
  3 minutes** — never a wall-clock timer, which would report an hour of "study"
  for a tab left open. It under-reports on purpose; renders as "—", never "0m".
- `_recordDaily()` and `_checkDailyGoal()` run **before** the `ASSIGNMENT_MODE`
  early return in `recordAnswer()`, and that branch must `save()`.
- ⚠ `examHistory` rows carry **`iso`** as well as the legacy display `date` —
  `toLocaleDateString()` read back through `new Date()` is **Invalid Date** on
  every `en-GB` browser, i.e. exactly the devices this app targets. Legacy rows
  are shown as-is, never round-tripped, and get no calendar square.

### Saving
> ⚠ **`xp` and `level` in the blob are now a CACHE, not the score.** The total
> lives in `student_points` and is minted by `_award_points()`; `gainPoints()`
> predicts an award so the header moves at once, and `applyServerPoints()`
> overwrites it from the RPC response on the next flush (~4s) and at login.
> Writing to `DB.xp` expecting it to stick is therefore wrong — see
> **Points, levels and the leaderboard** in [features.md](features.md).

⚠ `Store.saveStudentProgress()` is a **throttle, not a debounce**
(`_pendingSince` + `_SAVE_MAX_WAIT_MS`). It used to reschedule on every answer, so
steady practice produced **zero** server writes and only exam submit ever got through.
- `clearStudentSession()` / `saveStudentSession()` **flush before** touching the
  stored session; `endStudentSession()` **awaits** the flush before the RPC (after
  it, `current_student_id()` is null and RLS refuses every write).
- `visibilitychange → hidden` and `pagehide` flush. Not `beforeunload` — it does
  not fire reliably on mobile.
- `loadStudentProgress()` **keeps the local cache when its `stats.totalAttempted`
  is higher than the server's** — total answers only ever go up, so a lower server
  row is a strict ancestor. `assignments` stay special-cased (parent-written).
- `_cancelPendingFlush()` genuinely means *discard*; nothing in the session path
  calls it.

### Question cache (`mm_qc_v<N>_<owner>|<subject>`, 7 days)
⚠ **The key carries the OWNER, and the owner is whoever authorised the fetch** — a
child's session id, or `adult`. It was the subject alone, on a device a whole
family shares, so the first child to open Maths cached the set the server had
filtered for *them* and the next child read it straight back.
- ⚠ **A handover must call `QuestionLoader.useStudent(id)`.** `STATIC_QUESTIONS`
  and `_done` are module state and **switching child never reloads the page**
  (`openStudentSwitch` and `pdSwitchStudent` are both in-page), so without it the
  next child inherits the pool outright and `_done` reports every subject already
  loaded. `reset()` truncates to the count captured at module load, so whatever
  the manifests pushed survives.
- ⚠ **The child's token beats the parent's JWT in `_buildAuthHeaders()`** — on a
  shared phone a parent JWT always exists, by design, and `_resolveOwner()` gives
  a JWT no `studentExpiresAt`, so that child's own expiry was never applied. A
  stored session belonging to a *different* child is ignored (the
  `pdSwitchStudent` preview case).
- ⚠ The purge tests `mm_qc_v`, **not** `mm_qc_` — `mm_qc_lru` shares the shorter
  prefix and was deleted on every page load, leaving eviction order arbitrary.
- ⚠ **BUDGETED IN BYTES, NOT SLOTS** (`_BYTE_BUDGET` ≈ 3.4 M characters, with
  `_LRU_MAX = 6` as a cheaper second guard — and six counts **slots, not
  subjects**, so two children on one device compete for the same six). Counting
  slots stopped being fine the moment one subject was five times another. Sized so
  **a child's own grade always fits whole**. ⚠ **Re-measured 2026-09-08: Grade 4
  2.78 MB, Grade 5 3.26 MB, Grade 6 3.29 MB against 3.40 MB** — 0.11 MB of
  headroom, down from 0.36. **The next content addition of this size pushes a
  grade out of its own cache**, and the symptom is a child losing a subject offline
  with nothing explaining it. Raising the budget trades against the 5 MB origin
  quota (Grade 6 already puts the origin at 4.19 MB). ⚠ There is nothing to strip:
  74% of a French bundle is question + explanation + hint + options — the teaching
  content. The fix had to be eviction, not compression.
- ⚠ **The payload IS compressed now** (lz-string `compress`, 2026-09-09), and it
  changes every number above: re-measured, **Grade 4 0.43 MB, Grade 5 0.55 MB,
  Grade 6 0.51 MB, Grade 9 0.98 MB** against the same 3.70 MB budget. The
  headroom crisis is over; the byte budget remains the real guard.
- ⚠⚠ **Compression silently made `test-question-cache-budget.js` VACUOUS.** Its
  filler was one question padded with `'y'.repeat(size)` — the right byte count,
  and a fair proxy until the cache started compressing, at which point a run of
  one character compressed to nothing and **every grade measured 0.00 MB and
  passed**. It now writes the **real bundles**. A proxy for size stops being a
  proxy the moment anything transforms the payload.
- ⚠ **That test only measured grades 4–6** (`/^grade[456]-/` against a hard-coded
  15) so grades 1–3 and 7–9 were never checked after they went live. Now derived
  from the live packs — and it immediately found the next one:
- ⚠ **`_LRU_MAX` was 6 and Grade 9 has EIGHT live packs**, so a Grade 9 child
  opening their seventh subject evicted two of their own — measured, Biology and
  Chemistry dropped. "Six covers one full grade with room to spare" was written
  when a grade meant five subjects. Now **9** = largest live grade + 1.
  ⚠ Re-measure before raising it again; do not reason about it.
- ⚠ **A size the index does not know is MEASURED, never assumed zero.** The
  recency index stores `{u, b}` (use counter, size) and reads an older bare number
  as `{u:n, b:0}`, filling `b` in from storage the first time a total is needed.
  Treating an unmeasured 1.4 MB entry as free space is how a budget stays in the
  code and stops doing anything.
- ⚠ **Recency is a monotonic counter, not `Date.now()`** — a grade's five subjects
  are written in the same millisecond and tie.
- ⚠ **`[]` is never written or read back as a hit.** An empty payload is a real
  answer (fully gated account); caching it handed a child an empty subject for a
  week with no recovery.
- On `QuotaExceededError` (incl. Safari's `NS_ERROR_DOM_QUOTA_REACHED`, codes
  22/1014): evict and retry ×3. A non-quota failure evicts nothing. Eviction only
  ever touches this cache's own `mm_qc_` keys — never the session (a silently
  failed write that lost a token read as *"it keeps logging me out"*).
- ⚠ **This is the ONLY offline copy of the questions** — the SW deliberately does
  not cache `/functions/questions` (that response varies per caller).
- Tests: `test-question-pool-isolation.js` (eviction order, legacy index, session
  token), `test-question-cache-budget.js` (drives the real `_writeCache` with the
  real built bundle sizes through a storage stub that enforces a 5 MB quota —
  rebuild the bundles first).

### `QuestionLoader.loadSubject()`
⚠ `_done` is rolled back when a load **failed**; only "the server says you get
nothing" stays `true`. Marking a failed load as done left a subject permanently
empty for the session. `startChapterDirect()` retries **once** then shows a real
message — an unbounded retry through resolved promises pegged the CPU at 20,000
iterations/second and killed the tab.
