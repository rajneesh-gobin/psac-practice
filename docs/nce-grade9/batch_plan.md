# NCE Grade 9 — remaining batch plan

**Purpose.** `docs/implenent.md` is the brief; `progress.md` is the record of what
has been done. This file is the queue of what is left, sized into batches, so a
session can pick one up without re-deriving the plan.

**Read before touching anything:** `CLAUDE.md`, then the area file it routes you
to (`docs/claude/content-authoring.md` for everything in this plan), then
`docs/implenent.md`, then the relevant `blueprint-*.md` / `syllabus-*.md` in this
directory. Grep `ENGINEERING-NOTES.md` before re-investigating any surprise.

---

## 0. ⚠ Re-measure before you start. These numbers were true at one moment only.

Two things move this tree underneath you:

1. **A second Claude session works in this same worktree**, writing Grades 4–6
   content and the Grade 9 English/French/SMS packs. Eight Grades 4–6 packs grew
   on 2026-09-08 with nobody in this plan touching them.
2. Batches from this plan may be **in flight** (see §2).

So a failing test is not proof you broke something, and a count in this file is
not a number to add to. Check mtimes against the clock
(`ls -la --time-style=+%H:%M:%S`) and grep the failure for the pack id.

```bash
# The one command that regenerates every number in §3.
node -e "
const {loadSubject}=require('./netlify/lib/questions-sandbox.js');
const fs=require('fs'),vm=require('vm');
const packs=[];{const c={registerSubject:p=>packs.push(p),console:{log(){}},window:{}};
vm.createContext(c);vm.runInContext(fs.readFileSync('subjects/_index.js','utf8'),c);}
for(const p of packs.filter(x=>x.grade===9).sort((a,b)=>a.id<b.id?-1:1)){
  let qs=[];try{qs=loadSubject(p.id)}catch(e){}
  const per=new Map();
  for(const q of qs){if(!q.subsection)continue;
    if(!per.has(q.chapterId))per.set(q.chapterId,new Map());
    const m=per.get(q.chapterId);m.set(q.subsection,(m.get(q.subsection)||0)+1);}
  let need=0;const rows=[];
  for(const c of p.chapters){const m=per.get(c.id)||new Map();let u=0;
    for(const [,v] of m)if(v<20)u+=20-v;need+=u;
    rows.push('   '+c.id.padEnd(28)+' w'+String(c.examWeight||0).padStart(3)+
      '  subs '+String(m.size).padStart(3)+'  items '+
      String([...m.values()].reduce((a,b)=>a+b,0)).padStart(4)+'  need '+String(u).padStart(4));}
  console.log('== '+p.id+'   items '+qs.length+'   need '+need);rows.forEach(r=>console.log(r));
}"
```

---

## 1. The bar a batch is measured against

From `docs/implenent.md`, "Coverage target before enabling a subject":

- **Every declared assessable subsection has at least 20 valid original items.**
- High-weight outcomes have a deeper pool **proportionate to their paper weight**
  — 20 is a floor, not a target, for a chapter carrying `examWeight: 9`.
- The pool can generate **at least five blueprint-compliant full papers without
  repeating the same memorable passage, dataset or visual stimulus.**
- The mix of objective / short-answer / structured / extended / visual questions
  is close to the multi-year sample-paper distribution.

> ⚠ **"Do not treat reaching a numeric floor as proof of quality."** The counts in
> §3 tell you how much is missing. They do not tell you when a subject is good.

---

## 2. ✅ ALL FOUR IN-FLIGHT BATCHES LANDED (see progress.md Batch 27)

Biology +130, Chemistry +170, Physics +153 (every target subsection at 20), and
ICT +35 authored tasks taking its paper from 79/100 to 100/100. `LOCAL_FILES` is
synced, bundles rebuilt, `_CACHE_VERSION` 96, `SHELL_VERSION` v279.
⚠ **§5 item counts below are now STALE for those four packs — re-run §0.**
⚠ **§6a outranks §5.** Read it before planning another volume batch.

<details><summary>the original in-flight note</summary>

## 2a. In flight as of 2026-09-08 23:10

Four batches were dispatched in parallel and had not reported back when this file
was written. **Check whether they landed before starting these:**

| # | scope | files |
|---|---|---|
| A | grade9-biology `g9s-inquiry` + `g9s-sts` to 20/subsection (adds `lab_safety`, `reporting_findings`) | `subjects/grade9-biology/**` |
| B | grade9-chemistry `g9s-inquiry` + `g9s-sts` (adds `hypothesis_testing`, `recording_data`, `interpreting_results`) | `subjects/grade9-chemistry/**` |
| C | grade9-physics `g9s-inquiry` + `g9s-sts` (adds five inquiry subsections and two new STS ones) | `subjects/grade9-physics/**` |
| D | grade9-ict generated paper reaching 100 of 100 marks (was 79) | `engine/nce_paper.js` ICT blueprint, `subjects/grade9-ict/**` |

Each was told **not** to edit `engine/question_loader.js`. **Any new question file
they created still needs adding to `LOCAL_FILES[pack]`** there (`file://` dev
only; production auto-discovers) — check for question files absent from that map
before assuming it is done.

</details>

---

## 3. Measured state — re-measured 2026-09-09 after Batch 27

`grade9-maths` is still the only Grade 9 subject that meets the coverage floor:
**1,720 items, 23 subsections, none under 20.** Leave it alone.

| subject | items | subsections | under 20 | items to write |
|---|---|---|---|---|
| grade9-maths | 1,720 | 23 | 0 | **0 — done** |
| grade9-biology | 319 | 31 | 23 | 301 |
| grade9-chemistry | 388 | 35 | 25 | 312 |
| grade9-physics | 346 | 38 | 29 | 414 |
| grade9-ict | 701 | 73 | 66 | 765 |
| grade9-english | 62 | 49 | 49 | 926 |
| grade9-french | 69 | 64 | 64 | 1,211 |
| grade9-social-modern-studies | 67 | 67 | 67 | 1,273 |

**~5,200 items outstanding against the 20-per-subsection floor.**

⚠ **French and SMS are no longer "not countable" — the other session declared
their subsection maps, and that is why their outstanding count JUMPED** from
unmeasurable to 1,211 and 1,273. Declaring a map does not add work; it reveals
work that was always there. Expect the same when English is completed.

⚠ `scripts/test-live-pack-content.js` now PASSES for all three: every declared
chapter has at least one question. That is the floor for being live, not for
being finished — its review pass still names them as thin per chapter.

---

## 4. ⚠⚠ THE GATE — three subjects cannot be finished without a product decision

**English, French and Social & Modern Studies each hang on how extended written
responses are handled**: 25 marks of English, 25 of French, and the whole of SMS
Section B. The options are the ordinary ones — print-and-self-mark against a
rubric, an online typed answer with a model answer and indicative content, or
splitting the marks into objectively markable structured parts — and the brief is
explicit that a format which cannot be marked automatically must be **labelled
honestly and included in printable exam mode with a rubric, never replaced with
an easier MCQ**.

⚠ **This decision has NOT been made.** An agent notification in an earlier batch
claimed the user had chosen "Option B". No such decision exists and nothing has
been built on it. **Ask; do not infer.**

Everything in §5 marked **[GATED]** should not start until it is answered.

---

## 5. The volume queue — re-measured 2026-09-09 00:00

⚠ **§6a outranks everything in this section.** These batches close the
20-per-subsection floor. They do **not** make a generated paper resemble the real
one, and for the four science/ICT packs that is now the binding constraint.

Batch sizes are ~100–180 items, matching what this project has actually shipped.
Each row names the files that batch owns; **two batches may run in parallel only
if their file sets do not intersect** (§7).

⚠ The sciences' `g9s-inquiry` and `g9s-sts` chapters are **finished** — every
declared subsection reads exactly 20 after Batch 27. Nothing below touches them.

### Biology — 301 items · `subjects/grade9-biology/**`

| # | chapters | items |
|---|---|---|
| BIO-1 | `g9s-b1-circulatory` (91) + `g9s-b2-reproductive` (81) | 172 |
| BIO-2 | `g9s-b3-biodiversity` (66) + `g9s-b4-plant-nutrition` (63) | 129 |

All four carry `examWeight: 9` — the whole of Biology's non-cross-cutting weight
is spread evenly, so no chapter here is more urgent than another.

### Chemistry — 312 items · `subjects/grade9-chemistry/**`

| # | chapters | items |
|---|---|---|
| CHEM-1 | `g9s-c1-atmosphere` (80) + `g9s-c2-mixtures` (67) + `g9s-c3-language` (35) | 182 |
| CHEM-2 | `g9s-c4-metals` (85) + `g9s-c5-salts` (45) | 130 |

### Physics — 414 items · `subjects/grade9-physics/**`

| # | chapters | items |
|---|---|---|
| PHY-1 | `g9s-p1-measurements` (47) + `g9s-p2-light` (91) | 138 |
| PHY-2 | `g9s-p3-energy` (93) + `g9s-p4-motion` (85) | 178 |
| PHY-3 | `g9s-p5-electricity` (98) | 98 |

⚠ Physics is where **numeric option-length parity** breaks first: four options
like "2 m/s", "4 m/s", "10 m/s", "0.5 m/s" have wildly different lengths. Keep
magnitudes and units the same shape.

### ICT — 765 items · `subjects/grade9-ict/**`

| # | chapters | items |
|---|---|---|
| ICT-1 | `g9ict-presentation` (173) | 173 |
| ICT-2 | `g9ict-ethics-security` (121) | 121 |
| ICT-3 | `g9ict-word-processing` (106) | 106 |
| ICT-4 | `g9ict-networks` (61) + `g9ict-internet` (59) | 120 |
| ICT-5 | `g9ict-databases` (55) + `g9ict-health-safety` (64) | 119 |
| ICT-6 | `g9ict-spreadsheets` (40) + `g9ict-algorithms` (39) + `g9ict-software-os` (25) + `g9ict-computer-systems` (13) + `g9ict-troubleshooting` (9) | 126 |

⚠ **Question the map before writing ICT-1 and ICT-2.** `g9ict-presentation`
carries `examWeight: 1` and declares **11 subsections**; `g9ict-ethics-security`
carries 3 and declares 9. Between them that is 294 of ICT's 765 outstanding items
for 4 of its 40 exam marks. Check both against `blueprint-ict.md` first —
**deleting an over-declared subsection is a legitimate outcome** and is cheaper
than writing 173 items nobody is examined on.

### English — 926 items · **[GATED]** on `g9eng-reading` and `g9eng-writing`

⚠ **The other session owns this pack.** Coordinate before starting.

Gated (321 items, 18 of the pack's 40 marks): `g9eng-reading` (150, w10),
`g9eng-writing` (171, w8).

Ungated (605 items): `g9eng-literature` (114), `g9eng-word-formation` (95),
`g9eng-gr-punctuation` (76), `g9eng-vocabulary` (57), `g9eng-gr-pronouns` (57),
`g9eng-gr-verbs` (57), `g9eng-gr-sentence` (57), `g9eng-gr-prepositions` (38),
`g9eng-gr-nouns` (18), `g9eng-gr-adjectives` (18), `g9eng-gr-adverbs` (18).
Roughly **4 batches**.

⚠ `g9eng-listening` and `g9eng-speaking` carry `examWeight: 0` and declare no
subsections. Confirm against `blueprint-english.md` whether the NCE assesses them
at all before writing a single item for either.

### French — 1,211 items · **[GATED]** on `g9fr-comprehension` and `g9fr-redaction`

⚠ **The other session owns this pack**, and its subsection map now exists — which
is why this went from "not countable" to the largest single gap after SMS.
**Declaring a map does not add work; it reveals work that was always there.**

Gated (166 items): `g9fr-comprehension` (112, w8), `g9fr-redaction` (54, w6).

Ungated (1,045 items), heaviest first: `g9fr-transformation` (190),
`g9fr-grammaire` (133), `g9fr-vocabulaire` (114), `g9fr-formation-mots` (114),
`g9fr-textes-trous` (114), `g9fr-doc-authentique` (95), `g9fr-correction` (95),
`g9fr-ecrit-guide` (95), `g9fr-oeuvres` (95). Roughly **7 batches**.

⚠ **Three of these chapters have live PSAC equivalents whose machinery already
exists and must be reused, not re-invented**: `g9fr-textes-trous` is the `cloze`
type (`engine/cloze.js`, `makeCloze`), `g9fr-correction` is `errorhunt`
(`engine/errorhunt.js`, `makeErrorHunt`), and `g9fr-formation-mots` mirrors the
Formation des Mots chapters in the Grade 4/5/6 French packs. That is 323 of the
1,045 ungated items. Read those implementations first.
⚠ `isPoolQuestion()` excludes `cloze` and `errorhunt` from every pool — dealt into
practice they draw a number pad under a French passage.

### Social & Modern Studies — 1,273 items · **[GATED]** on Section B

⚠ **The other session owns this pack.** Its map now exists too. **This is the
largest single gap in the project**, and it is unusually flat: 17 chapters each
owing 57–95 items, none dominant.

Heaviest: `g9sms-map-data-skills` (95), `g9sms-population` (95),
`g9sms-government-welfare` (95), `g9sms-links` (95), then eleven chapters at
57–76. Roughly **8 batches**.

⚠ `g9sms-map-data-skills` is a **visual** chapter — maps, tables and graphs. The
brief forbids a text-only substitute for an outcome that explicitly tests reading
a diagram, graph or map. Budget SVG time for it.

⚠ **There is still no `syllabus-social-modern-studies.md`** — every other subject
with content has one. Write it from the NCF Grades 7–9 PDF before the content
batches, not from the blueprint alone: the blueprint says what the *papers* ask,
the syllabus says what the *curriculum* requires, and a map derived only from past
papers inherits whatever those years happened to omit.

---

## 6. Non-content batches

| # | scope | status |
|---|---|---|
| V-1 | Five-paper stimulus-repeat check | ✅ **DONE** — `scripts/test-paper-variety.js` + `scripts/lib/memorable.js`, with an attributed BASELINE table. What it found is §6a. |
| V-2 | **Visual QA** — render every new SVG question to A4 PNG and *look at it* | **Outstanding, and now larger**: Batch 27 added figures to all four packs. Programmatic existence checks are not visual QA and the brief says so. Every defect found this way so far (clipped labels, missing arrowheads, a label overlapping a flask neck, a climate-graph axis with no title, and a rate curve that contradicted its own answer) was invisible to assertions. Update `visual-assets.md`. |
| V-3 | Option-length debt, Grades 4–6 — 8 packs, `grade4-french` next at 74 flagged | The other session is working these. Coordinate. |
| V-4 | `LOCAL_FILES` sweep | ✅ **DONE and automated** — `node scripts/sync-local-files.js [--write]`. Append-only, because a name in the map with no file on disk is a deleted question file and that is a person's decision. `scripts/check.js` already fails on a missing entry, so it cannot ship stale. |
| V-5 | **Decide which visual-share number the paper should print** | New, from §6a. Two numbers disagree for the same paper and one is printed on the cover. |
| V-6 | **`audit-content-coverage.js` does not look at Grade 9 at all** | Found by the Chemistry batch: nothing would have reported these subsections as thin. It is the tool that calls a declared subsection under 20 "a permanent gap", and it is blind to eight live packs. |

---

## 6a. ⚠⚠ READ THIS BEFORE PLANNING ANOTHER CONTENT BATCH

`scripts/test-paper-variety.js` was written to assert the brief's five-paper rule.
The rule itself turned out to be the least interesting thing it measured.

### Measured 2026-09-09, after Batch 27

| pack | visual target | actual (mean of 5) | marks | distinct memorable | repeats |
|---|---|---|---|---|---|
| grade9-maths | 26% | **24%** | 100/100 | 52 | 7 |
| grade9-ict | 30% | **20%** (was 1%) | 100/100 | 30 | 17 |
| grade9-physics | 100% | **12%** | 50/50 | 9 | 4 |
| grade9-chemistry | 92% | **7%** (was 2%) | 50/50 | 6 | 2 |
| grade9-biology | 93% | **2%** | 50/50 | 4 | 1 |

**`grade9-maths` is the only pack whose generated paper resembles the real one.**
It is also the only pack whose bank was authored as real multi-part `task` rows
rather than adapted one-mark questions. That is not a coincidence, and ICT proved
it: 35 authored tasks moved it from 79→100 marks and 1%→20% visual in one batch.

⚠ **A generated science paper is ~41 one-mark text questions where the real paper
is 5–6 multi-part structured questions built on diagrams.** Writing the 301 items
Biology still owes at 20-per-subsection moves the coverage counter and **does not
move a single number in the table above**. The volume queue in §5 is necessary; it
is not sufficient, and for these four packs it is no longer the binding
constraint.

### The SHAPE batches — do these before, or alongside, §5

| # | scope | evidence of the target |
|---|---|---|
| SHAPE-1 | **Biology** — authored multi-part tasks built on figures. 6 questions, 93% visual, ≥1 drawing task. | `blueprint-science.md` |
| SHAPE-2 | **Chemistry** — 5 questions, 92% visual. Apparatus, tables of results, reaction schemes. | " |
| SHAPE-3 | **Physics** — 6 questions, 100% visual. Circuits, ray diagrams, speed–time graphs, instruments. | " |
| SHAPE-4 | **ICT** — ~25–30 more authored tasks (~170 marks). 5 papers × ~11 memorable slots needs ~55 distinct memorable items; **30 exist**. Sized by the batch that built the first 35. | `blueprint-ict.md` |
| SHAPE-5 | **Drawing / construction tasks** — every real science year has **at least one** and all three science banks have **zero**. | Printable-and-rubric-marked by design; the brief requires exactly that rather than an easier MCQ substitute. |

⚠ Follow ICT's method: author with `makeTask()` so items carry **real mark
values**. The adapter does not invent marks — a plain question can only ever
become a 1-mark part, which is why 500 more MCQs cannot fix a mark total.

### ⚠ Counting illustrated questions is not counting pictures

| pack | figure-bearing questions | distinct pictures |
|---|---|---|
| grade9-biology | 21 | 11 |
| grade9-chemistry | 33 | 10 |
| grade9-physics | 39 | 11 |

Adding a question that reuses an existing figure raises how often a memorable
stimulus is **drawn** without raising how many **exist**. That is why Chemistry's
variety got *worse* (0 → 2 repeats) during a batch that was otherwise clearly
good. **The unit is the distinct picture.**
`node scripts/nce-pool-depth.js <pack> 5` names the chapter that forces a repeat.

### ⚠ A metric can improve because the content got worse

ICT's repeat count was **1** when its paper was worst. Those 64 items filling the
non-MCQ role were 1-mark, figure-less and short, so `memorableKey()` returned null
for every one: the paper scored well by being **unmemorable**, not by being
varied. After the fix it reads 17 repeats — and 30 distinct memorable stimuli
against the old 3. Never re-baseline a number in that table without writing the
reason beside it.

### ⚠ An engine inconsistency, found and NOT fixed

The same paper reports two different visual shares:

```
grade9-physics, seed 1, one paper
  assemblePaper()'s warning    15%   counts paperTasks BEFORE grouping
  compliance() / paper footer  33%   counts paper.tasks AFTER grouping
```

`groupSingleMarkTasks()` bundles 8–10 unrelated one-mark items under one number,
and `hasVisual()` is true for the bundle if **any** part carries a figure — so one
diagram makes eight text questions read as "a visual question". **The footer
printed on the paper is the flattering number.** The "Paper has N questions"
warning has the same pre-grouping problem. `test-paper-variety.js` counts source
rows instead, which is the honest denominator. Queued as V-5.

### ✅ Fixed in Batch 27: three live subjects could not generate a paper at all

Recorded here because the class of defect will recur. `engine/nce_paper_admin.js`
built its bank with `.filter(q => q.type === 'task')`, and **only grade9-maths
authors its bank that way** — so for Biology, Chemistry, Physics and (then) ICT
the list came back empty and the screen said *"No multi-part tasks reached the
browser"*. Every mark total reported for those subjects came from a harness
calling `tasksFromBank()`; the app itself could not produce their paper.

⚠ **"Authored if any, else wrapped" is equally wrong** — ICT became a genuinely
mixed pack (35 authored tasks beside 524 adaptable rows) and the either/or
discarded all 524. `tasksFromBank()` passes an authored task through untouched and
adapts the rest, which is the case `nce_paper.js` already promises. Both
`nce_paper_admin.js` and `test-paper-variety.js` had the bug; both now wrap the
whole bank.

---

## 7. Running batches in parallel

Safe, because their file sets are disjoint: **one batch per pack, at most one
batch touching `engine/`**. Four ran concurrently on 2026-09-08 with no conflict.

⚠ **Rules for a parallel batch — give these to every agent:**

- **Do not run `node netlify/build-questions.js` or
  `node scripts/build-subject-index.js`.** Both write shared output; whoever
  dispatched the batches runs them centrally afterwards.
- **Do not edit `engine/question_loader.js`, `subjects/_index.js`, `sw.js`,
  `CLAUDE.md`, `scripts/**` or `docs/**`** — report filenames instead.
- **Do not run `scripts/test-option-parity.js`** — it reads the built bundles,
  which are stale mid-batch. Probe parity against `loadSubject(pack)` instead.
- **Tell each agent to take a NON-COLLIDING ID BLOCK, and say why.** The science
  split left `g9s-inq-NNN` / `g9s-sts-NNN` as ONE id space shared by three packs,
  so three parallel batches continuing the numbering would have collided
  **silently** — and the importer keys on ids. All three chose distinct blocks
  (`g9s-inqb-`, `g9s-inq-c`, `301+`) without being told; do not rely on that twice.
- Warn them which tests **currently fail for reasons that are not theirs.** As of
  2026-09-09 that is `test-exam-paper-shape` on **grade9-english** only
  (*"weights sum to 40, so reconciliation guts g9eng-reading — weight 10 wants 10
  questions, gets 8"*). Re-check before dispatching; this line goes stale fastest
  of anything in the file. An agent that cannot tell its own failure from someone
  else's will either chase a ghost or ignore a real one.
- **Tell them the preflight is fail-closed.** One malformed item blocks the import
  of the ENTIRE corpus, not just their pack — Batch 27's ICT agent shipped three
  `slots` blanks with bare-string answers and blocked all 20 live packs until it
  was fixed. `node scripts/test-question-import-parity.js` catches it.
- **Ask for the filenames back.** They cannot edit `engine/question_loader.js`, so
  the dispatcher finishes with `node scripts/sync-local-files.js --write`.

---

## 8. The rules that will bite you

Full versions in `CLAUDE.md` and `docs/claude/content-authoring.md`. These are the
ones that have actually cost this project time in Grade 9 work:

- ⚠ **`makeMCQ()` shuffles its own options** and keeps a **random 3** distractors
  if you author more than 3 — so option content is not stable between builds, and
  any per-pack metric wobbles. Authoring answer-first is still useful
  (`options[0]` is then the answer, checkable at a glance) but positions nothing.
- ⚠ **Option-length parity** (`scripts/test-option-parity.js`): answer visibly the
  longest **< 42%**, mean within-question spread **< 12 chars**, **zero** leaks.
  **Lengthen a distractor, never trim the answer** — trimming is how *"Why is it
  important to have clean drinking water?"* ended up with an answer that had lost
  its own subject, past every automated check.
- ⚠ **A pack's `examWeight` values must sum to exactly 40.** A sum over 40 is not
  cosmetic: `assembleExamPaper()` sheds the surplus with a loop that always
  decrements the **first** chapter in list order, so one chapter is starved while
  the paper still totals 40 and every test passes. Measured on grade9-maths at a
  sum of 52: its heaviest chapter was dealt **one** question instead of eight.
- ⚠ **Declared subsection ids and tagged subsection ids must be identical per
  chapter.** A declared id with no questions opens an empty screen; a tagged id
  that is not declared hides those questions from the Practise screen entirely.
- ⚠ **Wrap every new question file in `(function () { … })();`.** Several
  harnesses execute the whole corpus in ONE shared context, so a bare top-level
  `const` collides across packs — `const _g9sc24` in three packs at once had to be
  fixed after the science split, and `SYLLABUS` before it.
- ⚠ **Never change a question id.** The importer keys on id and compares
  `subject_id`, so moving a question between packs updates its row in place — but
  renaming orphans it, and **the importer never deletes**.
- ⚠ **`<i>` is an HTML breakout tag — inside `<svg>` it terminates the element.**
  Italic inside SVG is `<tspan font-style="italic">`.
- ⚠ **Alt text and hints must never reveal the answer.**
- ⚠ **Line endings differ per file.** Measure with Node, normalise in memory,
  restore the file's own convention on write. A multi-line `\n` pattern matches
  nothing in a CRLF file and reports "anchor not found" as though the code had
  changed.
- ⚠ **Bash heredocs mangle backslashes** — use the Write tool for scripts, or
  `String.fromCharCode(92)`. **Backticks inside a JS template literal terminate
  it**, including inside a comment.

---

## 9. After every batch

```bash
node scripts/build-subject-index.js     # only if chapters or packs changed
node netlify/build-questions.js
for t in check test-subsection-invariant test-live-pack-content \
         test-exam-paper-shape test-question-cache-budget \
         test-question-import-parity test-task-projection test-nce-paper \
         test-svg-figures test-boot-smoke test-option-parity \
         test-paper-variety test-netlify-redirects; do
  printf '%-34s ' "$t"; node scripts/$t.js >/dev/null 2>&1 && echo PASS || echo FAIL
done
```

- ⚠ **Bump `_CACHE_VERSION`** in `engine/question_loader.js` for any content
  change, and **`SHELL_VERSION`** in `sw.js` for any shell-cached engine file.
  Read both from the files; never quote a number from a `.md`.
- ⚠ Re-run `test-question-cache-budget` after any large addition. The byte budget
  had ~0.11 MB of headroom at last measure, and the symptom of exceeding it is a
  child silently losing a subject offline.
- **Write the batch up in `progress.md`** — what was measured, what surprised you,
  what you did not do and why. That file is the reason this plan could be written.

---

## 10. Definition of done, per subject

1. Every declared subsection ≥ 20 items, and high-weight chapters proportionately
   deeper than the floor.
2. `test-live-pack-content.js` green, including the "thin per chapter" review pass
   reporting nothing for that pack.
3. Five generated papers, different seeds, blueprint-compliant, **no repeated
   memorable stimulus** — measured, not assumed.
4. A generated paper reaches its blueprint's full mark total, with a mark scheme.
5. Every visual question **rendered and looked at**, at mobile size and in print.
6. `visual-assets.md` records every asset as original or with its licence.
7. Option-parity, subsection-invariant, exam-paper-shape, live-pack-content,
   paper-variety and svg-figures green for the pack.
8. ⚠ **The generated paper matches the blueprint's SHAPE, not just its mark
   total** — visual share within reach of the target, question count near the
   target rather than ~41 one-mark items, and at least one drawing/construction
   task in each science. §6a is the measurement; today only `grade9-maths`
   satisfies this, and no amount of §5 volume work changes it.
9. ⚠ **The paper can be generated IN THE APP**, not only in a harness. Open
   Admin → NCE paper for the subject and produce one. Four live subjects failed
   this until 2026-09-09 while every harness reported them healthy.

---

## 11. ⚠ The last step is one action, and it is not yours to take alone

**585 science rows still carry `subject_id = 'grade9-science'` in the live
database**, and that is currently correct: production serves the *deployed*
subject index, which knows only `grade9-science`. Importing without deploying
moves every row onto three subject ids no deployed pack asks for, and the live
Grade 9 Science subject answers with **nothing**.

**The import and the deploy are one action, in this order:**

```bash
node netlify/import-questions.js --dry-run     # confirm the update count
node netlify/import-questions.js               # upsert
node scripts/prepare-deploy.js                 # stage the publish dir
netlify deploy --prod --dir=.deploy --functions=netlify/functions
```

⚠ `docs/implenent.md` says **do not deploy or import into production**. Both are
therefore a decision for the repository owner, not a step in a batch. Leave them.

⚠ Two things to verify against **production** immediately after any deploy, which
no local check can prove: `/netlify/question-bundles/grade5-maths.json` must
answer **404**, and `/.netlify/functions/questions` must still answer **401**.
