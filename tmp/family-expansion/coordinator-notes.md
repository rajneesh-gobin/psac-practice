## Coordinator: what was resolved, and one defect class found

Written by the coordinating session after all six authoring agents finished. An
agent is scoped to one pack and forbidden from editing anything outside its own
two files, so none of this was visible from inside a batch.

### Resolved — `examWeight: 0` now means no slots

The `grade9-english` entry above records `test-exam-paper-shape.js` as unfixable
from inside the batch. That diagnosis was right and the fix has since landed, in
`engine/questions_engine.js`:

> An **explicit** `examWeight: 0` now buys no exam slot. A **missing** weight
> still defaults to 1, because seven packs never set one and equal weighting is
> the right reading of silence.

`g9eng-listening` and `g9eng-speaking` are weighted 0 and hold two poolable items
each, so a 40-question paper was assembled from 42 slots and the reconciliation
loop took both back off the *first* chapter with `n > 1` — `g9eng-reading`, the
pack's highest-weighted chapter — dropping it from 10 to 8. No amount of new
content could have fixed that; it was arithmetic, not supply.

⚠ **Blast radius, measured before changing it**: across all 42 live packs only 8
chapters carry an explicit `0`, and 6 of those are the French *Textes à Trous* /
*Chasse aux Erreurs* chapters that `canFill()` already drops for holding nothing
poolable. So this changed `grade9-english` and nothing else.

`test-exam-paper-shape.js` carries its own model of the assembler and correctly
reported that the two had drifted; the model was updated in the same pass. The
pack now passes, and the suite went 2 failures to 1 (the survivor is
`grade7-maths`, a `comingSoon` pack whose weights sum to 56).

### Found — the answer that is not one of the options

`g9s-c5-v011` above was recorded by the chemistry agent as one bad question with a
mechanical root cause. It is a **class**, and a repo-wide scan found **12 items
across 8 packs**.

`makeMCQ` is:

```js
const others    = shuffle([...new Set(options.filter(o => o !== answer))]);
const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
```

When `answer` is not byte-identical to one of the four options, the filter removes
nothing, `.slice(0, 3)` **silently discards one of the author's four distractors**,
and the answer is appended in its place.

⚠ **Nothing downstream can see this.** The built question is always a well-formed
four-option MCQ whose answer is present — by construction — so `test-option-parity`,
`isValidMCQ()` and every runtime check pass. Only the source shows it.

⚠ **And which distractor is discarded is `Math.random()` at build time**, so the
same source produces different papers on different builds. Measured at the time of
the scan, `g9s-p3-v092` was shipping two defensibly-correct options —

| | |
|---|---|
| option | "Hydroelectric requires a specific geography (large river, suitable valley); solar can be installed…" |
| **key** | "Hydroelectric requires a specific geography; solar can be installed…" |

— while `g9s-p2-v046` had got lucky and had its near-duplicate thrown away. A
rebuild could swap which of the two was broken.

`scripts/test-mcq-answer-in-options.js` detects the whole class by **instrumenting
the real factory** from `netlify/lib/questions-sandbox.js` rather than parsing
source, so it cannot drift from what the build actually does. It scans 528 files
across 48 packs and 23,098 `makeMCQ()` calls.

**All 12 are now fixed.** `test-mcq-answer-in-options.js` passes across 528 files,
48 packs and 23,098 `makeMCQ()` calls, and each item was re-checked in its dealt
form: four options, all distinct, the key present.

Ten were the same shape — the key was a paraphrase of an option — and were fixed
by making the two byte-identical. Four needed a judgement beyond string alignment:

| Item | Pack | What was actually wrong | Fix |
|---|---|---|---|
| `CH_AVG04` | grade5-maths | 522/4 = 130.5 is right, but `130.5 cm` was not in the option list at all | put the key in, displacing `128 cm` (one of the four given heights, the weakest distractor); `130`/`131` stay, they catch rounding either way |
| `CH_MON08` | grade5-maths | 180×4 − 500 = Rs 220 profit is right and absent from the list | put the key in, displacing `Rs 120 profit`; `Rs 100 loss` stays so profit-or-loss is still a real choice |
| `g7eng-gr-sentence-005` | grade7-english | the distractor *"The man, who is tall, lives next door."* is **also correct English** — a non-defining relative clause — so the item had two right answers whenever the shuffle kept it | replaced that option with the intended sentence, leaving three genuinely ungrammatical distractors |
| `g8s-mixtures-005` | grade8-science | the stem asks which **sequence** gives pure water, but the keyed option was phrased as a critique of a different method (*"… is wrong — she should use …"*), which is not a sequence and did not parallel the other three | both option and key become `Filtration then distillation`, which is what the explanation already describes |

⚠ **A second pass was needed, and it matters.** Making the key identical to the
option fixed the duplicate, but in five items the option was the LONGER wording,
so the key became visibly the longest thing on screen — measured, a material
length leak by `test-option-parity.js`'s own rule, which is the tell that harness
exists to catch. Trading a duplicate-answer defect for a length tell is not a fix.

For three of the five (`g9s-p3-v090`, `g9s-p3-v092`, `g9sms-pi030`) the **short**
wording was applied to both the option and the key instead, and the leak
disappears: 100→78 against a longest distractor of 70, 114→83 against 73, 63→54
against 49. Nothing is lost — the detail that goes is repeated verbatim in each
explanation.

Two leak at **either** wording, and are left:

| Item | Key | Longest distractor |
|---|---:|---:|
| `g8eng-listening-003` | 83 (71 short) | 51 |
| `g9fr-egv-074` | 89 (84 short) | 36 |

⚠ That is a **pre-existing design problem the duplicate option had been masking**:
their distractors are far shorter than any correct answer could be, so the key was
always going to be the longest once the near-duplicate stopped providing cover.
Fixing it means lengthening distractors — authoring, not alignment — so it needs
an author. Both packs already fail `test-option-parity` on much larger backlogs
(grade8-english 40 flagged items, grade9-french 223).

Net on the packs touched: chemistry 119 → 118 flagged items, physics and
social-modern-studies unchanged, and twelve items a child could meet are correct.

### Not ours — `test-paper-variety.js`

That harness fails `grade9-biology` (6 repeats against a baseline of 1),
`grade9-chemistry` (8 against 2) and `grade9-physics` (9 against 4). Its baseline
table exists precisely so a content batch cannot make variety worse while adding
items, so this batch was A/B tested against it: the six `family_expansion.js` files
were held out and the harness re-run.

**The counts are identical with and without this batch** — 6 / 8 / 13 / 4 / 9 in
both runs. The batch also contributes **zero** memorable stimulus keys, measured
directly. The regression against the 2026-09-08 baselines came from other content
landing in this worktree today, and re-baselining it is that author's call, not
this batch's.
