# Question importer summary

Run the existing command when ready to write to the database:

```sh
node netlify/import-questions.js
```

The importer now prints per-group results and a final table with separate practice,
past-paper and combined totals:

- **New questions added**: absent at lookup time, with verified returned content.
- **Existing updated**: changed stored content or metadata, with verified returned content.
- **Unchanged**: identical content; no write and no imported-at timestamp change.
- **Protected**: skipped regardless of whether local content matches.
- **Failed / unverified**: lookup blocked, write failed or response did not confirm the content.

Options are compared without their shuffled order; changed choices, case, answers,
acceptable answers, hints, explanations and diagram fields still count as changes.

The summary also counts skipped source files, protected questions synced back into
local JS, local-sync warnings and elapsed seconds. Local sync retains the existing
behaviour of creating `.bak` files; review those source changes before committing.

Protection lookups fail closed for both practice and past-paper questions. Missing
permissions, missing protection metadata or incomplete lookup results block the
affected group. Errors and warnings produce a nonzero process exit code. An aborted
run explicitly labels its totals as partial.

New versus updated is based on a pre-write snapshot, not a database transaction.
Avoid simultaneous imports or admin edits. Unverified writes may already have been
committed by the server; resolve the reported problem and rerun to reconcile. The
import does not delete questions missing from local files.

Offline regression test (no credentials or database connection):

```sh
node scripts/test-question-import.js
```
