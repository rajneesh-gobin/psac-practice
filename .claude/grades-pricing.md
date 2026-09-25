# Grades, Pricing and comingSoon

- **Registered: grades 1–9.** ⚠ **Live: all of 1–9** since 2026-09-16 (re-measure;
  the rest of this bullet is the 2026-09-08 state). Was: **4, 5, 6** plus five Grade 9 packs
  (**grade9-maths, grade9-ict, grade9-biology, grade9-chemistry,
  grade9-physics**). Every other pack is a `comingSoon: true` placeholder
  (one manifest + one sample question).
  ⚠ **There is no `grade9-science` pack.** It existed for one day and was split
    on 2026-09-08, because the NCE sets Biology, Chemistry and Physics as three
    independent 45-minute / 50-mark papers. Chapter and question ids keep the
    `g9s-` prefix on purpose — the importer keys on them and renaming would
    orphan 585 rows. Inquiry and STS were split by subject affinity, not
    duplicated, so each pack holds only part of them for now.
- **Grades 1–2 are free forever; 3–9 are paid.** Permanent, and stated separately
  from the fact that **everything is free right now** while the app is built.
  ⚠ That second promise carries **no end date anywhere** (`FREE_UNTIL_LABEL`, the
  `data-free-until` spans and `_applyFreeUntilLabel()` were all removed). Do not
  reintroduce a deadline without changing every surface at once.
- **Grades 1–6 = PSAC; 7–9 = NCE.** `_gradeStage()` / `_PSAC_MAX_GRADE = 6` is the
  single definition. The 7–9 subject list is confirmed against the MIE NCF/TLS
  ([pending.md](docs/claude/pending.md) item 10) — but confirm which packs have real
  content before writing there.
- ⚠ **Coverage copy is "PSAC Grades 1–6 · NCE Grade 9"** — re-measured
  **2026-09-16**: **46 live packs, 457 chapters, 34,392 practisable questions,
  926 past-paper items (2016–2024)**, from the built bundles. Only **three**
  packs are still `comingSoon` (`grade1/2/3-ict`), so **every grade 1–9 now has
  real content**. ⚠ **This line said "Grades 4–6" until 2026-09-16 and was
  wrong** — grades 1-3 and 7-8 went live in between and nothing updated it.
  It is the single most quoted line in this file; re-measure it, do not quote it.
- ⚠ **The share banner states the coverage IN THE ARTWORK**, so the picture and
  the sentence beside it are one promise. `assets/og-banner.jpg` now reads
  "PSAC Grades 1–6 · NCE Grades 7–9", matching every copy surface — all nine
  live grades are named. It has caught this project out **twice**: first the
  text said "Grades 4–6" while the artwork said 1–6, then the artwork was
  redrawn to 7–9 while `og:description` still said "Grade 9". **Change the
  picture and the sentence in the same commit.**
  ⚠ The banner is **EDITED, never regenerated** — ask Gemini again and you get
  different artwork, not the same artwork with one line changed.
  `scripts/rebuild-og-banner.ps1 -Line "…"` redraws just the coverage line in
  Arial 46px over a reconstructed gradient (verified byte-reproducible, and it
  refuses a line that would run into the illustration). It needs the **original
  1424×752** file — the shipped 1200×630 jpg is already a downscale.
  `scripts/test-share-copy-parity.js` prints a REVIEW line naming any live grade
  the copy does not mention.
- ⚠ **Judge by CONTENT, not by the `comingSoon` flag.** Three Grade 9 packs were
  flipped to `comingSoon: false` on 2026-09-08 while still holding **one sample
  question each**, and only `test-exam-paper-shape` noticed — with the message
  *"a full exam dealt 1 of 40 questions"*, which reads as a bug in the exam
  assembler rather than "this pack should not be live yet". Checked again
  2026-09-16 and the depth is now real: the thinnest live pack is
  grade9-social-modern-studies at **25.9 questions per chapter**, and every live
  pack clears 40 — one exam. ⚠ **"Science" is still wrong as a subject name** —
  a parent reading it looks for one subject and finds three cards.
  The landing page, `_appShareText()` (app.js) and `_inviteText()` (auth.js) name
  the live Grade 9 subjects, each with a comment saying why, and have been
  changed **all three together** three times — "and ICT", "and Science", then
  the three sciences by name — because a
  share message and an invite that disagree with the landing page is how a parent
  arrives expecting something that is not there. ⚠ A WhatsApp message cannot be corrected
  once forwarded.
- ⚠ **Count what PROJECTS, not what is stored.** 833 of the practisable total
  comes from 667 grade9-maths `task` items via `Assessment.projectToItems()`; a
  raw task is in `_POOL_TYPES_EXCLUDED` and has no `question` field at all, so
  counting bundle rows advertises questions no child can ever be dealt. (Verified
  before publishing: all 19 chapters project to something; only 2 tasks —
  drawing/construction — yield nothing online, by design.)

---

### The `comingSoon` rule
> Anything that builds a list a **parent or child** sees filters `!p.comingSoon`.
> Anything an **admin authors with** does not. The two grade pickers show them on
> purpose, disabled, badged "Coming Soon".

Filtering: `Shop.sellableChapters/sellableSubjects`, `admin _allChapters/_allSubjects`
(⚠ these feed **Publish catalogue**, which is what `purchase_subject()` validates
against server-side), the plan chapter picker, `calendar _subjectsForGrade`,
`search _fillSubjectFilter`, `app _subjectChips`.
Not filtering, and must not start: `renderGradeSelect` / `renderSubjectSelect`,
the admin Content kill switch, the admin question-manager cascades.

⚠⚠ **A placeholder becomes a live defect the moment the flag flips.** Nine live
packs (grades 1–3 × maths/english/french) each shipped
*"Placeholder - this pack has no real questions yet."* to children, on a chapter
their manifest no longer declared, so it could be dealt into mixed practice or an
exam. The file's own comment said *"the pack is comingSoon: true, so nothing here
is ever served"* — true when written, false the day the pack went live. Deleted
2026-09-09; `test-live-pack-content.js` went 75/9 to **84/0**. ⚠ Going live means
deleting `ch01_sample.js` **and** its `LOCAL_FILES` entry — the file alone is
enough, because production auto-discovers the directory.

⚠ **`comingSoon: false` is one character and used to be checked by nothing.**
`scripts/test-live-pack-content.js` now fails if a live pack has a declared
chapter with **no questions at all**, if it holds fewer than 40 questions (an
exam is 40), or if any question is tagged to a chapter the pack does not
declare. It reads **source, not the built bundles** — the question is whether
the content has been written, and that answer must not depend on whether
someone remembered to rebuild. A third pass **reviews without failing**, naming
live packs averaging under 20 questions per chapter.
⚠ Written 2026-09-08 after three Grade 9 packs were flipped live holding **one
sample question each** against 17, 11 and 17 declared chapters. The only thing
that noticed was `test-exam-paper-shape.js`, whose message — *"a full exam dealt
1 of 40 questions"* — reads as a bug in the exam assembler rather than as "this
pack should not be live yet".

---

### Grade dropdowns
`_populateGradeSelects()` fills anything with `data-grade-select`: `"live"` =
grades with a non-`comingSoon` pack (**parent-facing**: family setup, add child) ·
`"all"` = every registered grade (**authoring**: admin filters). ⚠ It runs twice —
the script tags sit mid-`<body>`, so `#modal-qm-form` is not parsed at first run;
`DOMContentLoaded` catches the rest.
