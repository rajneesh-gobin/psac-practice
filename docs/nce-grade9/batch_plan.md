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

## 2. ⚠ In flight as of 2026-09-08 23:10 — do not duplicate

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

---

## 3. Measured state — 2026-09-08 23:10

`grade9-maths` is the only Grade 9 subject that meets the coverage floor:
**1,720 items, 23 subsections, none under 20.** Leave it alone.

| subject | items | subsections | under 20 | items to write |
|---|---|---|---|---|
| grade9-maths | 1,720 | 23 | 0 | **0 — done** |
| grade9-biology | 189 | 29 | 29 | 391 |
| grade9-chemistry | 218 | 32 | 32 | 422 |
| grade9-physics | 178 | 31 | 31 | 442 |
| grade9-ict | 524 | 73 | 73 | 936 |
| grade9-english | 62 | 49 | 49 | 926 |
| grade9-french | 1 | **0 declared** | — | not yet countable |
| grade9-social-modern-studies | 1 | **0 declared** | — | not yet countable |

⚠ **French and SMS read as "0 needed" because they declare no subsection map at
all.** That is *nothing measured*, not *nothing to do* — they are 11 and 17
chapters with one sample question between them. Their first batch is to derive
the subsection maps (§5).

⚠ **grade9-english, grade9-french and grade9-social-modern-studies are
`comingSoon: false` while this thin.** `scripts/test-live-pack-content.js` fails
on them today, by design. A child opening French or SMS gets a chapter grid where
every chapter is empty.

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

## 5. The queue

Batch sizes are ~100–180 items, matching what this project has actually shipped
per batch. Each row names the files that batch owns; **two batches may run in
parallel only if their file sets do not intersect** (see §7).

### Biology — 301 items after batch A lands

| # | chapters | items | files owned |
|---|---|---|---|
| BIO-1 | `g9s-b1-circulatory` (91) + `g9s-b2-reproductive` (81) | 172 | `subjects/grade9-biology/**` |
| BIO-2 | `g9s-b3-biodiversity` (66) + `g9s-b4-plant-nutrition` (63) | 129 | `subjects/grade9-biology/**` |

### Chemistry — 312 items after batch B lands

| # | chapters | items | files owned |
|---|---|---|---|
| CHEM-1 | `g9s-c1-atmosphere` (80) + `g9s-c2-mixtures` (67) + `g9s-c3-language` (35) | 182 | `subjects/grade9-chemistry/**` |
| CHEM-2 | `g9s-c4-metals` (85) + `g9s-c5-salts` (45) | 130 | `subjects/grade9-chemistry/**` |

### Physics — 414 items after batch C lands

| # | chapters | items | files owned |
|---|---|---|---|
| PHY-1 | `g9s-p1-measurements` (47) + `g9s-p2-light` (91) | 138 | `subjects/grade9-physics/**` |
| PHY-2 | `g9s-p3-energy` (93) + `g9s-p4-motion` (85) | 178 | `subjects/grade9-physics/**` |
| PHY-3 | `g9s-p5-electricity` (98) | 98 | `subjects/grade9-physics/**` |

⚠ Physics is the pack where **numeric option-length parity** breaks first: four
options like "2 m/s", "4 m/s", "10 m/s", "0.5 m/s" have wildly different lengths.
Keep magnitudes and units the same shape.

### ICT — 936 items

⚠ **ICT was enabled at 524 items across 73 subsections.** It passes every existing
test and sits well under the brief's coverage bar. This is the largest single gap.

| # | chapters | items | files owned |
|---|---|---|---|
| ICT-1 | `g9ict-presentation` (180) | 180 | `subjects/grade9-ict/**` |
| ICT-2 | `g9ict-ethics-security` (137) | 137 | `subjects/grade9-ict/**` |
| ICT-3 | `g9ict-word-processing` (126) | 126 | `subjects/grade9-ict/**` |
| ICT-4 | `g9ict-networks` (74) + `g9ict-internet` (75) | 149 | `subjects/grade9-ict/**` |
| ICT-5 | `g9ict-spreadsheets` (61) + `g9ict-algorithms` (61) | 122 | `subjects/grade9-ict/**` |
| ICT-6 | `g9ict-databases` (67) + `g9ict-computer-systems` (37) + `g9ict-software-os` (32) + `g9ict-health-safety` (71) + `g9ict-troubleshooting` (15) | 222 → split if needed | `subjects/grade9-ict/**` |

⚠ `g9ict-presentation` carries `examWeight: 1` but declares **11 subsections** —
180 of the 936. Before writing them, check against `blueprint-ict.md` whether all
eleven are genuinely assessable, or whether the map over-declared. **Deleting an
over-declared subsection is a legitimate outcome of that check** and is cheaper
than writing 180 items nobody is examined on. The same question applies to
`g9ict-ethics-security` (9 subsections at `examWeight: 3`).

### English — 926 items · **[GATED]** for `g9eng-reading` and `g9eng-writing`

The other session is writing this pack. Coordinate before starting; do not both
write into it. Ungated work is the eleven grammar chapters (`g9eng-gr-*`, 15
marks between them) plus `g9eng-vocabulary`, `g9eng-word-formation` and
`g9eng-literature`. `g9eng-listening` and `g9eng-speaking` carry `examWeight: 0`
— confirm against `blueprint-english.md` whether the NCE assesses them at all
before writing a single item for either.

Estimate: **~6 batches**, of which the two heaviest (`g9eng-reading` at
`examWeight: 10`, `g9eng-writing` at 8) are gated.

### French — **[GATED]** · not yet countable

| # | scope |
|---|---|
| FR-0 | **Derive the subsection map for all 11 chapters** from `syllabus-french.md` and `blueprint-french.md`, declare it, and re-run the §0 measurement. Nothing else can be sized until this exists. |
| FR-1…n | Content, ~6 batches. `g9fr-comprehension` (w8) and `g9fr-redaction` (w6) are gated. |

⚠ Three of these chapters have live PSAC equivalents whose machinery already
exists and **must be reused, not re-invented**: `g9fr-textes-trous` is the
`cloze` type (`engine/cloze.js`, `makeCloze`), `g9fr-correction` is `errorhunt`
(`engine/errorhunt.js`, `makeErrorHunt`), and `g9fr-formation-mots` mirrors the
Formation des Mots chapters in the Grade 4/5/6 French packs. Read those before
writing anything. ⚠ `isPoolQuestion()` excludes `cloze` and `errorhunt` from
every pool — dealt into practice they draw a number pad under a French passage.

### Social & Modern Studies — **[GATED]** · not yet countable

| # | scope |
|---|---|
| SMS-0 | **Derive the subsection map for all 17 chapters** from `blueprint-social-modern-studies.md` and the NCF, declare it, re-measure. ⚠ **There is no `syllabus-social-modern-studies.md`** — every other subject with content has one (`syllabus-english`, `-french`, `-ict`, `-science`). Writing it is part of this batch, from the NCF Grades 7–9 PDF, not from the blueprint alone: the blueprint says what the *papers* ask, the syllabus doc says what the *curriculum* requires, and a subsection map derived only from past papers inherits whatever those years happened to omit. |
| SMS-1…n | Content, ~7 batches. All of Section B is gated. |

⚠ `g9sms-map-data-skills` is a **visual** chapter — maps, tables and graphs. The
brief forbids a text-only substitute for an outcome that explicitly tests reading
a diagram, graph or map. Budget SVG time for it.

---

## 6. Non-content batches

| # | scope | notes |
|---|---|---|
| V-1 | ✅ **DONE 2026-09-08** — `scripts/test-paper-variety.js` + `scripts/lib/memorable.js` | Asserts the brief's five-paper rule for every pack with a blueprint, with a BASELINE debt table. **What it found is in §6a and it changes the priority order of this whole plan.** |
| V-2 | **Visual QA** — render every new SVG question to A4 PNG and *look at it* | Programmatic existence checks are not visual QA, and the brief says so. Every defect found this way so far (clipped labels, missing arrowheads, a label overlapping a flask neck, a climate-graph axis with no title) was invisible to assertions. Update `visual-assets.md`. |
| V-3 | Option-length debt, Grades 4–6 — **8 packs**, `grade4-french` next at 74 flagged items | The other session is working these. Coordinate. |
| V-4 | `LOCAL_FILES` sweep in `engine/question_loader.js` | Every question file added by every batch above. `file://` dev only, but it is how a dev session silently loads a stale pack. ✅ **`scripts/check.js` already fails on this** — *"LOCAL_FILES[...] is missing inquiry_depth.js (invisible under file://)"* — so it cannot ship forgotten. It is listed here only because a parallel batch is told not to edit that shared file, so someone has to sweep it afterwards. |

---

## 6a. ⚠⚠ READ THIS BEFORE PLANNING ANOTHER CONTENT BATCH

`scripts/test-paper-variety.js` was written on 2026-09-08 to assert the brief's
five-paper rule. The rule itself turned out to be the least interesting thing it
measured. **Every generated science and ICT paper is warning on four counts**, and
none of them is fixed by reaching 20 items per subsection.

Measured, seed 1, one paper per pack, every warning the assembler raised:

| pack | visual target | actual | questions / target | drawing tasks | marks |
|---|---|---|---|---|---|
| grade9-biology | 93% | **2%** | 41 / 6 | 0 | 50/50 |
| grade9-chemistry | 92% | **2%** | 41 / 5 | 0 | 50/50 |
| grade9-physics | 100% | **12%** | 41 / 6 | 0 | 50/50 |
| grade9-ict | 30% | **1%** | 65 / 11 | — | 79/100 |
| grade9-maths | 26% | 23% | — | ok | 100/100 |

**`grade9-maths` is the only pack whose generated paper resembles the real one.**
It is also the only pack whose bank was authored as real multi-part `task` rows
rather than adapted one-mark questions. That is not a coincidence and it is the
whole finding.

### What this means for the queue in §5

⚠ **A generated science paper is currently a list of ~41 one-mark text questions
where the real paper is 5–6 multi-part structured questions built on diagrams.**
Writing the 391 items Biology still owes at 20-per-subsection moves the coverage
counter and leaves the paper at 2% visual with 41 questions instead of 6. The
volume in §5 is necessary; it is not sufficient, and on its own it does not move
any number in the table above.

**So each pack needs a second kind of batch, and it is the one that decides
whether the subject is finished:**

| # | scope |
|---|---|
| SHAPE-1 | **Biology** — author real multi-part tasks built on figures, as grade9-maths does. Target the blueprint's 6 questions and 93% visual. |
| SHAPE-2 | **Chemistry** — same, 5 questions, 92% visual. Apparatus, tables of results, reaction schemes. |
| SHAPE-3 | **Physics** — same, 6 questions, 100% visual. Circuits, ray diagrams, speed–time graphs, measuring instruments. |
| SHAPE-4 | **ICT** — 11 questions, 30% visual. Screenshots, flowcharts, network diagrams, spreadsheet extracts. |
| SHAPE-5 | **Drawing / construction tasks** — every real science year has **at least one** and the banks have **zero**, in all three sciences. These are printable-and-rubric-marked by design; the brief explicitly requires that rather than an easier MCQ substitute. |

### ⚠ Counting illustrated questions is not counting pictures

`grade9-physics` has **39 figure-bearing questions but only 7 distinct pictures**
behind them — many share one alt text. Four of those seven appear in **all five**
papers. Biology has 21 figure-bearing questions and 4 distinct pictures reachable
over five papers; Chemistry 25 and 3; ICT 12 and 3.

So a SHAPE batch that adds fifty questions all using the same circuit diagram
improves nothing a child would notice. **The unit is the distinct picture.**
`node scripts/nce-pool-depth.js <pack> 5` names the chapter that forces a repeat.

### ⚠ An engine inconsistency found on the way, not yet fixed

The same paper reports two different visual shares, and they disagree:

```
grade9-physics, seed 1, one paper
  assemblePaper()'s warning    15%   counts paperTasks BEFORE grouping
  compliance() / paper footer  33%   counts paper.tasks AFTER grouping
```

`groupSingleMarkTasks()` bundles 8–10 unrelated one-mark items under one number,
and `hasVisual()` is true for the bundle if **any** part carries a figure — so one
diagram makes eight text questions read as "a visual question". The footer
printed on the paper is the flattering number. `test-paper-variety.js` counts the
source rows instead, which is the honest denominator, and reports the range across
the five papers.

**Not fixed here**, because `engine/nce_paper.js` was owned by another batch at the
time. Someone should decide which number the footer ought to print.

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
- Warn them which tests **currently fail for reasons that are not theirs** (today:
  `test-subsection-invariant`, `test-exam-paper-shape` and
  `test-live-pack-content` on grade9-french and grade9-social-modern-studies).
  An agent that cannot tell its own failure from someone else's will either chase
  a ghost or ignore a real one.

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
7. Option-parity, subsection-invariant, exam-paper-shape and svg-figures green for
   the pack.

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
