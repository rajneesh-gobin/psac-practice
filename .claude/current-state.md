# Current State

### Content, measured 2026-09-16
**46 live packs, 457 chapters, 34,392 practisable questions**, plus 926
past-paper items (2016–2024) and 871 raw grade9-maths `task` rows that project
to more. Three `comingSoon` packs remain: `grade1-ict`, `grade2-ict`,
`grade3-ict`. ⚠ The per-pack table below is from **2026-09-08** and covers only
the 20 packs live then — it is kept for the shape of the thing, not the numbers.
⚠ **Measured by executing the
manifests and counting distinct ids in the BUILT bundles**
(`node netlify/build-questions.js`) — not by adding up numbers written here.
Re-measure rather than carrying these forward, and count what **projects**.

Per-pack (grades 4–6, measured the same way):
| pack | q | pack | q | pack | q |
|---|---|---|---|---|---|
| grade4-maths | 662 | grade5-maths | 1,419 | grade6-maths | 705 |
| grade4-english | 873 | grade5-english | 645 | grade6-english | 890 |
| grade4-french | 2,121 | grade5-french | 2,295 | grade6-french | 2,234 |
| grade4-history | 558 | grade5-history | 532 | grade6-history | 460 |
| grade4-science | 344 | grade5-science | 424 | grade6-science | 463 |

Grade 9, all `comingSoon: false`: **grade9-maths 1,711 practisable** (1,545 rows,
of which 667 `task`s project to 833 items via `Assessment.projectToItems()`),
**grade9-ict 524**, **grade9-chemistry 218**, **grade9-biology 189**,
**grade9-physics 178**.
⚠ The Grades 4-6 table above is STALE — another session is writing content in
this same working tree and eight of those fifteen packs grew on 2026-09-08
(grade5-english 645 -> 705, grade4-french 2,121 -> 2,141 among them). Re-count
from the built bundles; do not add to these numbers.

The live `questions` table holds **35,529 rows** as of the 2026-09-17 import
(35,335 practice + 194 past papers): `mcq 29,140 · numeric 3,729 · text 1,021 ·
task 871 · expr 236 · cloze 129 · slots 107 · errorhunt 60 · symmetry-line 24 ·
multi 12 · symmetry 6`, 0 protected conflicts, 0 failed — every one of the 616
writes read back and verified. That run was **69 new** (the English and French
cloze passages) and **547 updated**.
⚠ **A clean re-import is "0 new, ~550 updated", NOT zero writes** — rows are
re-serialised each pass, so a few hundred "updated" is the floor, not churn to
chase.
⚠ **THE DATABASE NOW MATCHES THE CORPUS EXACTLY — 35,529 both sides, zero
orphans**, and that is new. It used to hold rows the corpus did not, because
**the importer never deletes**: this file recorded 3 such rows for months while
the real number had grown to **9** (`g{1,2,3}{h,s}-samp-001` and
`g{7,8,9}h-samp-001`, the sample questions of retired placeholder packs). They
were deleted 2026-09-17 after checking they were referenced by nothing —
`student_question_progress` and `question_reports` both returned 0 — and the
delete was verified by return=representation plus a read-back.
⚠ **So a difference between the two counts is now MEANINGFUL and was not
before.** If they diverge again, something was removed from source without
being removed from the database; do not assume it is the old known orphans.
⚠ **No migration was needed and none was made**:
`questions.data` is `jsonb NOT NULL` with no type column and no CHECK constraint
(live schema read, not taken from the dump).

Also live: **Formation des Mots** (one ordinary chapter per French pack, 100
questions in five subsections of 20 — PSAC French **Q7**, 10 marks on every paper,
which the bank previously covered with three one-off items; ⚠ deliberately **not**
enrichment, because a gold BONUS card would tell a child a numbered exam question
is optional). Every live grade has enrichment chapters (History, Science), a Map
Skills SVG, Passages & Text Types and Description d'Images.
- Read-aloud in **practice** speaks the question **and then each MCQ option**,
  lettered ("A. cinq"), highlighting the option being spoken (`.tts-reading`) —
  a Grade 1 child cannot yet read the choices, so audio + highlight together are
  the feature. ⚠ **The exam still speaks the question only**, deliberately: a
  timed paper must not hand a child what the paper does not.
  ⚠ **Every utterance is queued synchronously inside the tap** — chaining from
  `onend` puts the second `speak()` outside the gesture, which iOS drops
  silently, so the question reads and the options never do.
  ⚠ **`_ttsStop()` on every screen and question change** — speech outlives the
  DOM that started it. French packs speak `fr-FR` with a matching voice, options
  included; voices are warmed at load because `getVoices()` is empty on the first
  tap, and with no French voice installed the child is told once why it sounds
  English.
  ⚠ **Blanks are collapsed before speaking** (`_ttsBlanks`): a run of `___`,
  `....` or `……` becomes one hum — `hum` in French, `hmm` in English — because
  fr-FR reads `___` as *"tiret bas tiret bas tiret bas"*. Measured: 3,188
  underscore runs and ~600 dot runs. ⚠ Only a RUN counts — a single `…` is prose
  trailing off (1,419 of those). ⚠ **Never `trou`**, the exercises' own word
  ("Textes à Trous"): it carries a vulgar reading in Mauritius. ⚠ Never a
  content word either (`blanc`) — a child hearing "Le chat est, blanc, la
  table" writes *blanc*. A hum can be neither.
  ⚠ **Latency has three controllable causes** and all three are handled:
  `_pickVoice` prefers `localService` **within** each match tier (Chrome's
  "Google …" voices synthesise over the network — measured, `fr-FR` was picking
  remote "Google français"), region still outranks locality; `cancel()` runs
  only when something is actually speaking (cancel-then-speak is a Chrome
  stall); and the question is split into sentence utterances (`_ttsSentences`)
  so the first is short and playback starts before the rest is prepared.
  ⚠ **The 🔊 button lives in the always-visible `.pr-tools` row, not the help
  tray** — progressive disclosure assumes the child can read the disclosure, and
  this is the one tool for children who cannot.
  `scripts/test-read-aloud.js` (30 checks, real browser).
