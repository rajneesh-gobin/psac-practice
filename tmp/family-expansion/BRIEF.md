# Question-family expansion — shared brief

You are authoring ONE batch of new NCE Grade 9 questions for ONE pack. Several
agents run at once on different packs. Everything below is what keeps them from
colliding and what keeps the batch shippable.

## Read first, in this order
1. `CLAUDE.md` (repo root) — the whole "Content model" and "Adding or changing
   questions" sections.
2. `docs/claude/content-authoring.md` — the real rules for this area.
3. `prompt.md` (repo root) — the specification this batch exists to satisfy.
4. `docs/nce-difficulty-audit/report.md` + `evidence.md` — the audit that found
   the gaps you are filling. Your pack's findings are your seeds.
5. `docs/nce-grade9/blueprint-*.md` / `syllabus-*.md` for your subject, if one
   exists for it.

## Hard isolation rules — breaking one of these breaks another agent's work
- **Write exactly ONE new file**: `subjects/<your-pack>/questions/family_expansion.js`
  plus ONE ledger: `tmp/family-expansion/<your-pack>-ledger.json`.
- **Never edit any existing file.** Not a manifest, not another question file,
  not `question_loader.js`, not `_index.js`, not a test, not a doc. Another
  session is writing into this same worktree right now and committed 47 minutes
  ago. If your batch needs a change outside your two files, write it in your
  ledger under `"needs"` and leave it to the coordinator.
- **Never run `git commit`, `git push`, any deploy, or anything that writes to
  the live database.**
- **Do not run `node scripts/build-subject-index.js`** or bump any version
  constant. The coordinator does that once, at the end.

## ID namespace — yours alone
`<pack-prefix>-fam-NNN-<variant>` where NNN is 001+ and `<variant>` is `a`,`b`,
`c`,`d`,`e`. Example: `g9sms-fam-007-c`.
- The pack prefix is whatever the existing questions in your pack already use
  (`g9sms-`, `g9eng-`, `g9ict-`, `g9s-` for the three sciences…). **Check, do
  not guess** — the sciences all share `g9s-` on purpose and renaming would
  orphan rows.
- ⚠ **The family id is the question id minus its `-<variant>` suffix.** That is
  deliberate and load-bearing: it means the engine can tell that two questions
  are near-relatives *without a new question field*. Do NOT invent a `family:`
  or `familyId:` property — the factories take a fixed field list and anything
  else is silently dropped from the built bundle. This has cost this project
  months of missing content three separate times.
- No `-fam-` id exists anywhere yet, so you cannot collide with existing content.
  Stay strictly inside your own numbering.

## What to write
For each family: **one context, 3–5 variants that require different thinking.**

- Seed families from (a) your pack's rows in `evidence.md`, and (b) the shape
  gaps in `tmp/family-expansion/pack-map.json` for your pack — chapters carrying
  a high `examWeight` with few items, and levels that barely exist.
- ⚠ **Varying the numbers is not varying the question.** Change what is given
  and what must be found; reverse it; add a constraint; hand the pupil a
  plausible wrong answer to diagnose; ask always/sometimes/never; make them
  identify what information is missing; require a prediction then its
  justification. Use these **selectively** — do not stack three into one item.
- Each variant carries **one fair misconception check**, and the `explanation`
  must name the misconception and show how to avoid it. Fair means a taught
  concept — never ambiguous wording, an obscure exception, or a hidden
  assumption.
- **Every question must stand alone.** A pupil meeting variant `c` first must
  have everything they need. And no variant may disclose another's answer.

## Format — close the gap the audit found
- Your pack's MCQ share is in `pack-map.json`. If it is 100%, that IS the
  finding: selecting an explanation is easier than producing one.
- **`makeText` is supported end to end** — it exists in `engine/helpers.js` and
  in all three server copies and all three export lists (verified today). Use it
  for short constructed responses, with `alsoAccept` for genuine equivalents.
- `makeNum` for calculated answers, `makeMCQ` for genuine discrimination between
  close options, `makeTF` sparingly.
- Aim for roughly **half of your new items to be non-MCQ** in a pack that is
  currently 100% MCQ; keep the existing balance where the pack is already mixed.

## Non-negotiables from CLAUDE.md
- `'use strict';` then `STATIC_QUESTIONS.push(...)`. Plain script, no exports, no
  generator functions (in production these files are fetched as JSON and never
  executed — a generator only works inside a `_manifest.js`).
- **Only use `chapterId` values and `subsection` ids that your pack ALREADY
  declares** — they are listed per chapter in `pack-map.json`. A subsection id
  that is tagged but not declared hides those questions from the screen, and
  `scripts/test-subsection-invariant.js` fails the build. Never invent one.
- **`makeMCQ()` shuffles its own options** — authoring answer-first is fine but
  positions nothing. Keep all four options the same grammatical shape and
  similar length (`scripts/test-option-parity.js` catches length leaks).
- **Distractors must be defensible.** The audit's `weak-distractors` finding is
  that an option nobody would pick makes an L4 item an L2 item. Every wrong
  option should be what a pupil who holds a specific misconception would choose.
- **Every division must come out exact** unless the question is about rounding.
- Prefer **inline SVG** to an image file: it cannot 404 and works offline.
- ⚠ **Alt text must NEVER reveal the answer** ("a diagram", "an object").
- **Difficulty means something different per pack.** L4 in maths is multi-step
  word problems; in English it is extended passage/essay analysis; in French
  multi-verb production; in science and SMS an applied scenario. Label what the
  item actually demands — the audit's single biggest finding is L3/L4 labels on
  plain retrieval. **An L4 that is one lookup is a bug.**
- No comments in the question file unless the WHY is non-obvious.

## Verify before you finish — this is not optional
Run these and make them pass for YOUR file:
```
node --check subjects/<pack>/questions/family_expansion.js
node -e "const {loadSubject}=require('./netlify/lib/questions-sandbox.js');
  const qs=loadSubject('<pack>'); const f=qs.filter(q=>/-fam-/.test(q.id));
  console.log('loaded',f.length,'ids unique',new Set(f.map(q=>q.id)).size);
  const bad=f.filter(q=>!q.question||!q.chapterId||!q.subsection);
  console.log('missing fields',bad.length); if(bad.length) console.log(bad.slice(0,3));"
node scripts/test-subsection-invariant.js
node scripts/test-option-parity.js
node scripts/test-live-pack-content.js
```
If a test was already failing before you started, say so in your report rather
than trying to fix someone else's pack.

⚠ **Independently verify every answer.** Re-derive it from the stem, do not
trust the one you wrote a moment ago. A wrong answer key in a bank a child
practises against teaches the wrong thing and nothing in the app will catch it.

## Your ledger — `tmp/family-expansion/<pack>-ledger.json`
```json
{
  "pack": "grade9-...",
  "families": [
    { "familyId": "g9sms-fam-007",
      "chapterId": "g9sms-population",
      "subsection": "birth_death_rates",
      "outcome": "Interpret crude birth and death rates to explain natural change",
      "context": "One district's vital-statistics table across three years",
      "variants": [
        { "id": "g9sms-fam-007-a", "difficulty": 2, "type": "mcq",
          "variation": "read a value from the table",
          "misconception": "reads the death rate row as the birth rate" }
      ] }
  ],
  "needs": [],
  "notes": "anything the coordinator must know"
}
```
`variation` says what NEW thinking the variant requires. `misconception` says
what the wrong answers catch. Both are prose, one line, specific.

## Report back
Counts of families and variants **by difficulty and by type**, the chapters you
strengthened and why those, three or four example families showing how the
thinking changes across the variants, the misconceptions you covered, the test
output you got, and anything you found wrong in the existing bank that you did
NOT change (record it — do not fix it).
