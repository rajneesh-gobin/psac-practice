# Adding / Changing Questions — Checklist

1. Write the file under `subjects/[pack]/questions/`.
2. Add it to `LOCAL_FILES[pack]` in `question_loader.js` (**`file://` dev only**;
   prod auto-discovers).
3. ⚠ **Bump `_CACHE_VERSION`** in the same file, or a child keeps the old set for
   up to a week with nothing in the UI explaining why. Bumping purges old keys.
4. If you touched a **question factory**, apply it to all four copies (below).
5. If chapters changed, keep the SYLLABUS subsection map in step.
6. ⚠ If you added/removed/renamed/reordered a **chapter** — or added a pack —
   re-run `node scripts/build-subject-index.js`. `scripts/check.js` fails on
   drift, so this cannot ship stale, but it will stop the build until you do.
   ⚠ And any change to the question COUNT re-runs
   `node scripts/build-subject-counts.js`. It is the denominator of every
   subject certificate, `check.js` fails on drift too, and a stale table does
   not throw — it awards Subject Master while the questions you just added sit
   unanswered. `preflight.js` does it as step 2.
7. **`node scripts/preflight.js`** runs the local steps that must pass after any
   content or chapter change — rebuild the index, rebuild the counts, rebuild
   the bundles, subsection invariant, live-pack content, **syllabus facts**,
   option synonyms, certificates, `check.js` — in the one order that works.
   ⚠ Read the step list from `--list`, not from here: it was "the six local
   steps" long after it had nine.
   ⚠ It writes NOTHING to the database. Add `--import-dry-run` to see
   what would change, `--import` to actually upsert; the import step is opt-in
   and is skipped if any earlier step failed, `--keep-going` included.
   ⚠ **Step 5 is the only one that knows what the syllabus TEACHES** — the others
   count what happens to be there. It needs a ledger per pack
   (`scripts/fact-ledgers/<pack>.json`); 48 of 49 live packs still have none, and
   it says so on every run. See [content-authoring.md](docs/claude/content-authoring.md).
   After a large content addition also run `node scripts/test-question-cache-budget.js`.
