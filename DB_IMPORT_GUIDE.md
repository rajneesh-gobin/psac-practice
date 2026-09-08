# Importing questions into Supabase

## What this does
Loads every question under `subjects/` and upserts it into the Supabase
`questions` table, which is what the auth-gated `netlify/functions/questions.js`
serves. The importer is **additive and update-only** — it never deletes a row.

⚠ **Do not trust a total written in this file.** Every fixed count that used to
live here was stale within weeks. Run `node netlify/import-questions.js --check`
and read the number it prints.

---

## The three commands

| Command | Credential | Network | Writes |
|---|---|---|---|
| `node netlify/import-questions.js --check` | none | none | none |
| `node netlify/import-questions.js --dry-run` | service role | reads only | none |
| `node netlify/import-questions.js` | service role | reads + writes | upserts |

Add `--report <path>` to any of them for a redacted JSON report, or `--json` to
print it. `--help` prints usage.

⚠ **An unknown or misspelled flag exits 2 with usage** rather than falling
through to a live import. `--dry_run` is not `--dry-run`.

### `--check` first, always
It runs the entire local preflight with no credential and no network:

```
node netlify/import-questions.js --check
```

It loads every source file through **`netlify/lib/questions-sandbox.js`** — the
same module the deployed question service and the assignment re-grading path
use — then validates every question and prints a per-grade, per-subject and
per-type summary. Exit code is 0 only if everything passed.

---

## Fail-closed: why a broken file means zero writes

The import is two phases, and Supabase is not contacted at all until the first
one has passed:

1. **Preflight** — discover packs, evaluate every source file, build every row,
   validate structure per type, prove every id is a non-empty string and unique
   across practice *and* past papers.
2. **Database** — read the existing rows, classify, upsert, then read every
   written row back.

A source file that throws is **fatal**. It used to be a warning in the closing
summary — printed after the groups that did load had already been uploaded, so a
broken file near the end left the database holding a corpus nobody had validated.

⚠ **This is not hypothetical.** Until 2026-09-08 the importer carried its own
private copy of the sandbox holding only `makeMCQ`, `makeNum`, `makeTF`,
`makeMatch` and `makeSymmetry`. Six French files threw `makeCloze is not
defined` / `makeText is not defined`, were skipped with a warning, and the
importer uploaded 14,361 of the 14,726 questions the app loads — **every cloze
text and every typed-text correction item missing, in production, with the
command reporting success.** The importer now owns no loader of its own, and
`scripts/test-question-import-parity.js` fails if it ever grows one again.

---

## Supported question formats

Everything is stored whole in `questions.data` (jsonb). Nothing is projected to
MCQ and no format-specific field is dropped.

| type | what must survive |
|---|---|
| `mcq` | options, answer, acceptableAnswers, inline SVG/`<img>` markup |
| `numeric` | acceptableAnswers, unit, tolerance, responseKind |
| `text` | acceptableAnswers (`alsoAccept`), confusables, strictAccents |
| `cloze` | title, text, bank, gaps/gapsA/gapsB, gapAlts, twoPart, notes |
| `multi` | every option and the complete answer **array** |
| `symmetry` | rows, cols, axis, axisPos, given, answer coordinates |
| `task` | stimulus, parts, per-part response.kind, marks, rubrics |

⚠ **An unknown `type` fails preflight**, naming the id and the reason. It is
never silently coerced to MCQ. To add a format, add it to `TYPE_RULES` in
`netlify/lib/question-import.js` with a validator.

⚠ **External assets are REFERENCED, not uploaded.** An `<img src="assets/…">`
travels as markup inside `data`; the importer does not put anything into
Supabase Storage. The file must reach the site by deploy, as it always has.

---

## Protected rows

A row with `protected = true` in the database always wins: the local version is
**never** written over it. The only question is whether the local `.js` can be
rewritten to match the database.

- Only `mcq`, `numeric` and `text` have a lossless source form.
- Even then, losslessness is **proved, not assumed**: the candidate file is
  executed alongside its siblings through the real loader, and the rewrite is
  accepted only if the pack still loads, the target question now equals the
  database version exactly, and no neighbouring question moved.
- Everything else — cloze, multi-select, symmetry, task, an item generated
  inside a loop — leaves the source untouched and is reported as a conflict.

⚠ The old code emitted `makeMCQ` for every type except numeric and symmetry, so
a protected cloze or typed-text item would have been **rewritten as an MCQ**,
destroying the source.

Backups and the conflict report go to **`.import-conflicts/`**, never beside the
source file. That directory is gitignored *and* has a `netlify.toml` 404 rule,
because a CLI deploy uploads from local disk rather than from git and the
conflict report contains correct answers. `--check` and `--dry-run` create
nothing there.

---

## Reading the final summary

```
Database result       Count
New                   2,377     rows that did not exist
Updated               3,904     rows whose content changed
Unchanged             8,609     deliberately not rewritten — not a failure
Protected unchanged       0     database wins, and agrees with local source
Protected conflicts       0     database wins, and DISAGREES — needs a human
Failed / unverified       0     refused, or blocked before writing
```

These totals are checked against each other and the command fails if they do not
balance:

```
corpus total       = practice + past papers
candidates         = new + updated + unchanged + protected(2) + failed
writes attempted   = new + updated + failed
writes verified    + failed = attempted
```

Precise words, because they are not synonyms:
**loaded** ≠ **written**; a **write response** ≠ **verified**; **protected** is
not an error unless it *conflicts*.

The run ends with one of `SUCCESS — all changes verified`,
`NO CHANGES NEEDED`, `CHECK PASSED / FAILED — nothing was written`,
`DRY RUN COMPLETE`, or `IMPORT INCOMPLETE — review required`, plus the safest
next action when it is not a success. **Exit code is 0 only for a fully
successful run.**

### `Database verification`
A live import re-reads every row it wrote, in a fresh request, and compares the
canonical content. ⚠ It is deliberately **not** a table row count: the table
legitimately holds protected and historical rows outside the current corpus, so
a global count proves nothing.

---

## ⚠ A clean re-run is "0 new, ~560 updated", not zero writes

`makeMCQ` keeps the answer plus a **random 3** of the remaining options. For a
question authored with more than 4 usable options — **580 of them, measured
2026-09-08, mostly grade4-history (277), grade4-french (154) and
grade5-history (114)** — the stored option set is drawn fresh on every load, so
the importer honestly reports it as changed every time.

Measured immediately after a successful import: **0 new, 560 updated, 14,330
unchanged.** That is the expected steady state. It is churn, not drift, and it
is the one place the import is not idempotent.

---

## Step by step

1. **Node 18+** — `node --version`.
2. **The table** already exists in production. For a fresh project, apply
   `supabase-schema.sql`.
3. **`.env`** in the project root:
   ```
   SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role key>
   ```
   ⚠ Never commit it. ⚠ **Move it out of the tree before a CLI deploy** — a CLI
   deploy uploads from local disk, gitignored files included.
   The `service_role` key is Settings → API, ~170+ chars, starts `eyJ`. The
   `anon` key has no write access.
4. `node netlify/import-questions.js --check`
5. `node netlify/import-questions.js --dry-run`
6. `node netlify/import-questions.js`

Steps 4–6 take roughly 5 s, 90 s and 150 s against the current corpus.

---

## Adding new questions

1. Write the file under `subjects/<pack>/questions/`.
2. Add it to `LOCAL_FILES[pack]` in `engine/question_loader.js` (`file://` dev
   only) and **bump `_CACHE_VERSION`**.
3. `node netlify/import-questions.js --check` — this is what catches a file that
   does not load, a duplicate id or a malformed question.
4. `node netlify/import-questions.js`.

---

## Deleting a question

The importer never deletes. Remove the row in Supabase → Table Editor →
`questions`, filtered by `id`.

⚠ Deleting a question from `subjects/` does **not** remove it from the database.
Measured 2026-09-08: three rows (`g7h-samp-001`, `g8h-samp-001`,
`g9h-samp-001`) survive from the retired `grade{7,8,9}-history` placeholder
packs, which were replaced by `-social-modern-studies`.

---

## Schema — no migration is needed for any of these formats

`public.questions.data` is `jsonb NOT NULL` with **no question-type column and
no CHECK constraint**, and `id` is the primary key (which is what lets the
upsert merge duplicates). Verified against the live database on 2026-09-08:
it already held `multi` and `symmetry` rows, so JSONB demonstrably accepts
non-MCQ shapes.

Do not add a table per question type, and do not replace the JSONB with a fixed
schema. The format belongs in the object unless a real query or security
requirement needs a normalised column.

---

## Tests

```
node netlify/import-questions.js --check
node scripts/test-question-import.js           # database accounting, mock PostgREST
node scripts/test-question-import-parity.js    # loader parity, types, round trip
node scripts/test-question-writeback.js        # protected-source safety
node scripts/test-cloze-texts.js
node scripts/test-french-text-answers.js
node scripts/test-assessment-schema.js
node scripts/check.js
```

---

## Troubleshooting

| Message | Meaning |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY is not set` | Only `--check` runs without it |
| `Unknown option "…"` (exit 2) | A misspelled flag never falls through to a live import |
| `CHECK FAILED — nothing was written` | A source file or question is invalid; the list names the file and reason |
| `makeCloze is not defined` in a skipped file | A loader has lost a factory — see the parity test |
| `IMPORT INCOMPLETE — review required` | Some writes failed, verification failed, or a protected row conflicts |
| `BLOCKED — … No rows written for this group` | The pre-write lookup could not be trusted; nothing was written |
| `Upsert failed: 42501` | Wrong key — use `service_role`, not `anon` |
| Questions not appearing in the app | Function cache TTL (5 min), then the browser's 7-day question cache — bump `_CACHE_VERSION` |
