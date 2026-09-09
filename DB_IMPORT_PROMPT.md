# Prompt to paste into Claude on the import machine

Copy everything between the lines below and paste it as your first message to Claude.

---
node scripts/preflight.js    # runs all five below, in order, stopping at the first failure

#   1 node scripts/build-subject-index.js      regenerate _index.js cleanly
#   2 node scripts/test-subsection-invariant.js
#   3 node netlify/build-questions.js
#   4 node scripts/test-live-pack-content.js
#   5 node scripts/check.js


Continue the PSAC project — read `CLAUDE.md` first, then `DB_IMPORT_GUIDE.md`.

I need to run the question import on this machine.

- Repo: https://github.com/rajneesh-gobin/psac-practice (clone or pull `dev`)
- Questions live as JS files under `subjects/`. The importer loads them through
  `netlify/lib/questions-sandbox.js` and upserts them into the Supabase
  `questions` table.

## What to do

1. `node --version` — must be 18 or higher.
2. Clone or pull the latest `dev`.
3. Create `.env` in the project root:
   ```
   SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<I will provide this>
   ```
4. **Run the local check first — it needs no credential and writes nothing:**
   ```
   node netlify/import-questions.js --check
   ```
   Do not go further until this exits 0. If it fails it names every file and
   question at fault; fix those first.
5. See what would change, without writing:
   ```
   node netlify/import-questions.js --dry-run
   ```
6. Import:
   ```
   node netlify/import-questions.js
   ```
7. Read the final summary block. The run is only good if it ends
   `SUCCESS — all changes verified` or `NO CHANGES NEEDED` **and** exits 0.

## How to read the result

- **"Loaded" is not "written."** Unchanged rows are deliberately not rewritten;
  that is not a failure.
- **"Protected" is not an error** unless it says *conflicts* — that means the
  database version differs from local source, the database version was kept, and
  a human has to reconcile it. The report is written to `.import-conflicts/`,
  which is gitignored because it contains correct answers.
- A **`Database verification`** block must say every intended write was read
  back.
- ⚠ **A clean re-run is "0 new, ~560 updated", not zero writes.** `makeMCQ`
  keeps a random 3 of the distractors, so 580 questions authored with more than
  4 options change shape on every load. That is churn, not drift.

## Important

- `.env` must never be committed (it is in `.gitignore`), and must be **moved
  out of the tree before any CLI deploy** — a CLI deploy uploads from local disk,
  gitignored files included.
- The `service_role` key is Supabase → Settings → API → `service_role`
  (~170+ chars, starts `eyJ`). The `anon` key has no write access.
- The importer is **additive and update-only**. It never deletes a row, so
  removing a question from `subjects/` does not remove it from the database.
- No migration is needed for any question format: `questions.data` is `jsonb`
  with no type column and no CHECK constraint.
