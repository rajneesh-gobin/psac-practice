# Claude Code prompt — make every question type import safely

Copy everything below the divider into Claude Code while it is opened at the repository root.

---

You are working in the `psac-practice` repository. Read `CLAUDE.md`, `ARCHITECTURE.md`, `ENGINEERING-NOTES.md`, `DB_IMPORT_GUIDE.md`, and the relevant code before editing. The worktree contains substantial intentional changes from other work. Preserve them, do not restore deleted files, do not reset the worktree, and do not broadly reformat unrelated code.

## Objective

Confirm and fix a suspected drift between the production/build question loaders and `netlify/import-questions.js`. After the fix, the importer must discover, validate, count, and upload every supported question object that the deployed application can load—including newer typed-text, cloze, multi-select, symmetry, and future structured-task formats—without partially importing a broken corpus.

The user expects to provide a Supabase credential and authorises you to import/upsert the validated question corpus. Make a database migration only if live schema inspection proves one is necessary. Do not invent a migration merely because new formats exist inside the JSON payload.

## Findings to reproduce before changing code

A read-only audit on 2026-09-08 found that the current production-equivalent loader in `netlify/lib/questions-sandbox.js` loaded:

```text
mcq       12,319
numeric    2,024
cloze         60
text         305
multi         12
symmetry       6
----------------
practice  14,726
```

The sandbox copied inside `netlify/import-questions.js` loaded only **14,361** practice questions and **164** past-paper items. It skipped exactly these six files:

```text
subjects/grade4-french/questions/ch12_g4_textes_trous.js  makeCloze is not defined
subjects/grade4-french/questions/ch13_g4_correction.js    makeText is not defined
subjects/grade5-french/questions/ch14_textes_trous.js     makeCloze is not defined
subjects/grade5-french/questions/ch15_correction.js       makeText is not defined
subjects/grade6-french/questions/ch12_g6_textes_trous.js  makeCloze is not defined
subjects/grade6-french/questions/ch13_g6_correction.js    makeText is not defined
```

The difference is exactly **365 questions**: 60 cloze plus 305 text.

Root cause appears to be that `netlify/import-questions.js` has an old private `_buildContext()` containing only `makeMCQ`, `makeNum`, `makeTF`, `makeMatch`, and `makeSymmetry`. The newer loaders expose `makeText`, `makeCloze`, and `makeTask`, together with the correct factory behaviour. Confirm this independently; do not take the numbers on faith.

Also confirm these additional concerns:

- the importer uploads arbitrary fields in `data` once a question has successfully loaded, so JSONB itself probably already supports all formats;
- it scans only `subjects/grade*/questions/*.js`; files elsewhere are not automatically question sources;
- `_generateBlock()` currently treats nearly every non-numeric/non-symmetry protected record as an MCQ, which can corrupt local source when the protected database version is a text, cloze, multi-select, task, or another newer type;
- source-file failures are currently noticed in the final summary, but valid groups can already have been uploaded before a later failure is discovered;
- `scripts/test-question-import.js` tests database upsert accounting with a mock database, but does not prove loader parity;
- the text/cloze tests verify the application/build/server copies, but currently omit the importer;
- image URLs, inline SVG, diagram metadata and other JSON fields should survive in `data`, but this script does not upload separate asset files to Supabase Storage.

Record the reproduced counts and errors before editing, then repeat the same audit afterward.

## Required design

### 1. One authoritative Node-side source loader

Remove the stale importer-only factory/sandbox implementation. Reuse or carefully extract a shared Node-side loader that is also used by the deployed question service/re-grading path. `netlify/lib/questions-sandbox.js` is the likely starting point.

Do not solve this by copying `makeText`, `makeCloze`, and `makeTask` into a fifth location. The next format would drift again. Expose a small supported API from the shared module, for example a strict subject/corpus loader that returns practice questions, past-paper questions, source files, and structured load errors. Adapt the design to the existing architecture and avoid circular dependencies.

The loader used for import must provide every global a real source file receives in the deployed/build environment, including:

- the real flattening `STATIC_QUESTIONS` array;
- `window.PSAC_PDF_QUESTIONS` capture;
- all supported factories and helpers;
- `makeTask` from the single assessment implementation;
- the same answer normalization and validation rules used by the runtime.

The importer and application/build should agree on the set of loaded IDs. If full consolidation with the browser-side factory copy is impossible, enforce parity with tests rather than leaving the copies able to drift silently.

### 2. Two-phase, fail-closed import

Refactor the command into two distinct phases.

**Preflight phase—no database writes:**

1. discover all subject packs using the same grade/pack rules as production;
2. evaluate every question source and collect all practice and past-paper objects;
3. treat any source evaluation error as fatal;
4. validate required row fields and supported type-specific structure;
5. ensure every ID is a non-empty string and globally unique across practice and past-paper rows;
6. verify subject, chapter, grade, difficulty and past-paper classification;
7. compare the importer ID set and per-type counts with the production/build loader output;
8. produce a readable per-grade, per-subject, per-type and grand-total summary.

Only after the entire corpus passes may the importer contact Supabase and write rows. A broken file near the end must result in **zero writes**, not a partial update.

Add a credential-free command such as:

```powershell
node netlify/import-questions.js --check
```

It must run the full local preflight, print the summary, and exit non-zero on any loader/schema/parity problem without requiring `SUPABASE_SERVICE_ROLE_KEY`.

Add a database preview mode if practical:

```powershell
node netlify/import-questions.js --dry-run
```

This may read existing Supabase rows to classify new/updated/unchanged/protected records, but must perform no writes. Keep the existing plain command compatible:

```powershell
node netlify/import-questions.js
```

It should preflight first and then apply the verified upserts. Unknown flags must fail with usage help. Do not let an absent/misspelled flag accidentally trigger a live import.

### 2a. Make the command summary genuinely useful

Improve the importer's terminal output so a non-technical operator can immediately tell what happened. Avoid thousands of noisy per-question success lines. Show short progress lines while working and always finish with one clearly separated summary, including on failure or interruption.

The final summary must state:

- mode: `CHECK ONLY`, `DRY RUN`, or `LIVE IMPORT`;
- target Supabase project hostname/reference for database modes, without credentials;
- whether local preflight passed;
- number of subject packs and source files examined;
- source files loaded successfully and source files skipped/failed;
- practice and past-paper totals;
- counts by grade, subject and question type, in readable aligned tables;
- database classification: new, updated, unchanged, protected unchanged, protected conflicts, failed/unverified;
- actual writes attempted and actual writes verified;
- local protected-source files patched, patch warnings, and backup/conflict artifact locations when applicable;
- elapsed time;
- a prominent final outcome such as `SUCCESS — all changes verified`, `NO CHANGES NEEDED`, `CHECK FAILED — nothing was written`, or `IMPORT INCOMPLETE — review required`;
- the safest next action when the outcome is not successful.

Use precise language. “Scanned” is not the same as “uploaded”; “write request returned” is not the same as “verified”; “protected” is not an error unless local and database content conflict. Explain these distinctions briefly under the table.

Enforce accounting invariants and fail if they do not balance. For example:

```text
corpus total = practice + past papers
database candidates = new + updated + unchanged + protected unchanged + protected conflicts
writes attempted = new + updated
writes verified + writes failed/unverified = writes attempted
```

Adapt the equations if batching/retries require more precise names, but never print mutually inconsistent totals.

For a live import, perform a read-after-write verification and add a separate `Database verification` block. It should confirm that every intended row exists with matching canonical content, not merely compare the table's global row count (the table may legitimately contain protected or historical rows outside the current corpus).

When there are errors, list a bounded, actionable sample with source file or question ID and reason, then show the total count and a path to a full local report if there are more. Never print correct answers or secret data. Exit code must be `0` only for a fully successful check/dry-run/import; any skipped file, failed/unverified write, parity mismatch, invalid question, or unresolved protected conflict must return non-zero.

Optionally add a machine-readable mode such as `--json` or `--report <path>` for CI, but keep the default output easy for a person to read. The machine-readable report must have a versioned schema, contain no credentials or correct-answer payloads, and be written only when explicitly requested.

Add snapshot-free tests for the summary formatter so totals and outcome wording are verified without making tests fragile about spacing or elapsed time. Extend `netlify/lib/question-import.js` rather than scattering accounting logic through the command entry point where practical.

An acceptable shape is:

```text
============================================================
QUESTION IMPORT — LIVE IMPORT
Target: <project reference>
============================================================
Preflight: PASSED
18 subject packs · 312 source files · 0 skipped

Question corpus        Practice   Past papers    Total
Questions loaded          14,726           164   14,890

Type                 Count
Multiple choice      12,319
Numeric               2,024
Typed text              305
Cloze                    60
Multi-select              12
Symmetry                   6

Database result       Count
New                     ...
Updated                 ...
Unchanged               ...
Protected unchanged     ...
Protected conflicts     ...
Failed / unverified       0

Verification: PASSED — every intended write was read back
Elapsed: 34s
SUCCESS — all changes verified
============================================================
```

Do not hard-code the illustrative pack/file counts or the per-type values into the formatter. Derive them from the actual preflight result.

### 3. Preserve every supported question format

For each loaded question, persist the complete object in `questions.data` without projecting it to MCQ or dropping format-specific fields. At minimum verify round-trip preservation for:

- `mcq`: options, answer and acceptable answers;
- `numeric`: accepted variants, unit, tolerance and response kind;
- `text`: `alsoAccept`/acceptable answers, confusables and strict accent handling;
- `cloze`: title, text, word bank, gap counts, alternate answers, two-part data and notes;
- `multi`: all options and the complete answer array;
- `symmetry`: grid, axis, given cells and answer coordinates;
- `task`: stimulus, parts, response kinds, marks, rubrics and print-only/manual-marking details;
- inline image/SVG/diagram metadata and asset path fields;
- past-paper metadata.

Do not require a `task` record to be projected into legacy single questions for storage. Preserve the original structured task in JSONB. If the current deployed read endpoint intentionally projects only auto-markable parts for a particular UI, keep that concern separate and document it.

Add explicit type validation. An unknown `type` must either be supported through a documented generic schema or make preflight fail with the ID and source filename. Never silently coerce it to MCQ.

### 4. Protected database questions

The database protection rule must remain: a protected database row cannot be overwritten by a local import.

Fix `_generateBlock()` / `_writeBackToJs()` so they can never rewrite a newer type as `makeMCQ`. Prefer a fail-safe exhaustive type switch. If faithful source reconstruction is not possible—for example, an item was generated inside a loop, is a structured task, or carries complex SVG—leave the source unchanged and emit a clear conflict report requiring manual review.

It is acceptable to retain automatic write-back only for formats that can be proven lossless with tests. For everything else, database-wins should mean “skip the database write and report the conflict,” not “damage the JS source.” Never put protected correct answers in a committed report. Any local conflict artifact containing answers must be gitignored, access-limited, and called out clearly.

Do not create `.bak` files during `--check` or `--dry-run`. Ensure temporary/backup files cannot accidentally become question sources on the next import.

### 5. Database schema and migration decision

Inspect both `supabase-schema.sql` and the actual target Supabase schema. The current canonical schema appears to store:

```sql
public.questions.data jsonb not null
```

with no top-level question-type column or type constraint. If the live table matches, the new formats need **no migration**: JSONB can store the complete typed objects. State this explicitly in the final report and do not create empty or ceremonial SQL.

Create a migration only if live inspection finds a real incompatibility—for example, a restrictive constraint, missing required column, unsuitable type, or RPC that strips fields. If needed:

- create a new, separate migration file named consistently with current repository conventions;
- update the canonical `supabase-schema.sql` to the same final state;
- make it idempotent where practical;
- preserve all existing rows and protected flags;
- do not replace JSONB with a lossy fixed schema;
- preview and test the exact SQL before applying it;
- apply only this migration, never unrelated pending/deleted migrations.

Do not add a separate table per question type. The question format belongs in the JSON object unless a demonstrated query/security requirement needs a normalized field.

### 6. Credential and live-operation safety

The user will provide the necessary Supabase credential. Treat it as secret:

- prefer a short-lived credential supplied through an environment variable;
- never print, echo, log, screenshot, save, or commit it;
- never include it in the final response or test fixtures;
- if pasted directly into chat, do not repeat it and recommend rotation afterward;
- confirm the target project reference before any live change.

The user authorises these live operations only after local checks pass:

1. read the `questions` schema and existing question rows needed for a dry-run comparison;
2. apply a question-schema migration only if the evidence above proves it necessary;
3. upsert the fully validated question corpus while respecting protected rows;
4. verify counts, representative round trips, and protected-row behaviour.

This does not authorise deleting question rows, resetting the database, disabling RLS, applying unrelated migrations, deploying the website, committing, or pushing. The importer is additive/update-only unless the user separately approves deletions.

## Tests

Extend existing test patterns rather than relying only on a manual import. At minimum add tests that prove:

1. `--check` needs no Supabase key and performs zero network writes;
2. importer and production/build loaders return exactly the same practice and past-paper ID sets;
3. the current corpus preflight count is 14,726 practice questions and 164 past-paper items, or clearly explains any legitimate concurrent content change rather than hard-coding a stale number forever;
4. current per-type counts include all 60 cloze, 305 text, 12 multi and 6 symmetry questions;
5. a fixture for every supported type survives load → row JSON → JSON parse without field loss;
6. a `makeTask` fixture retains its full task/parts/rubric structure;
7. one source-file exception causes zero database writes;
8. duplicate IDs across different subjects or between practice/past-paper groups cause zero writes;
9. unknown types fail preflight clearly;
10. protected MCQ/numeric handling remains correct;
11. protected text/cloze/multi/symmetry/task records can never be rewritten as MCQ or overwrite the database;
12. dry-run accurately reports new, updated, unchanged and protected totals without writing;
13. an HTTP failure or unverifiable response leaves a non-zero exit status and a truthful summary;
14. image/SVG/diagram and accented French data round-trip unchanged;
15. option-order-only differences remain cosmetic while answer arrays, coordinate order, gap order and task-part order remain significant.
16. human-readable summary categories balance mathematically in check, dry-run, successful-import and failed-import scenarios;
17. the summary clearly distinguishes protected unchanged from protected conflict;
18. read-after-write verification affects the outcome and exit code;
19. bounded error output points to the full report without leaking answers or credentials;
20. `--json`/`--report`, if implemented, has a versioned redacted structure.

Run at least:

```powershell
node netlify/import-questions.js --check
node scripts/test-question-import.js
node scripts/test-cloze-texts.js
node scripts/test-french-text-answers.js
node scripts/test-assessment-schema.js
node scripts/check.js
```

Run the new parity/type tests as well. Do not run the live import until all relevant local tests pass.

After importing, query the live database and report:

- total practice and past-paper rows represented by this corpus;
- counts by type from `data->>'type'`;
- new, updated, unchanged, protected and failed/unverified counts;
- the six formerly skipped files now contributing all expected records;
- representative field-level verification for text, cloze, multi, symmetry and task data;
- whether a migration was required and, if so, its exact file and application result.

Do not expose correct answers in the report.

## Documentation

Update `DB_IMPORT_GUIDE.md`, `DB_IMPORT_PROMPT.md`, and relevant engineering documentation so they no longer contain stale fixed totals or imply that every source file is safe merely because the command completed. Document `--check`, `--dry-run`, the fail-closed preflight, supported formats, protected-row behaviour, the fact that external assets are referenced rather than uploaded, and how to interpret the final summary.

## Final deliverable

Finish with a concise evidence-based report containing:

- reproduced before/after counts;
- root cause;
- design and files changed;
- tests and exact results;
- Supabase project reference without secrets;
- migration decision and justification;
- dry-run and live-import summaries;
- protected conflicts requiring manual attention;
- any unsupported source locations or deferred formats.

Do not deploy, commit, push, delete database questions, or modify unrelated work.

---
