# Pre-Deploy Checklist — PSAC Practice

This file is the single source of truth for deploying this app. Follow every
section that applies to your change. Skip nothing silently — each ⚠ exists
because something went wrong once.

> **Rule zero: measure, do not infer.** Read version numbers from the files.
> Probe the live site after deploy. Never trust a `.md` summary over the code.

---

## 0. Prerequisites

| Tool | Purpose | Check |
|---|---|---|
| Node.js (≥ 18) | Run all scripts | `node --version` |
| Netlify CLI | Deploy | `netlify --version` |
| Chrome for Testing | Lab browser tests | path in `docs/labs/LAB_SPEC.md` §5 |
| Supabase access | DB import | service role key in `.env` |
| `.env` at project root | All secrets | must NOT be inside deploy dir |

> ⚠ `.env` must stay at the repo root and out of `.deploy/`. The staging
> script (`prepare-deploy.js`) enforces this — if it is missing the script
> fails loudly.

---

## 1. Version bumps — do these FIRST

Read the current numbers from the files (never trust a doc):

```powershell
Select-String "SHELL_VERSION" sw.js
Select-String "_CACHE_VERSION" engine/question_loader.js
```

### When to bump `SHELL_VERSION` (`sw.js`)
Bump when ANY of these files changed:
- `engine/app.js`, `engine/auth.js`, `engine/store.js`, `engine/registry.js`
- `engine/question_loader.js`, `engine/helpers.js`, `engine/questions_engine.js`
- `engine/labs/lab_core.js`, `engine/labs/labs.css`
- `index.html`, `style.css`, `sw.js` itself
- Any file listed in `SHELL_FILES` inside `sw.js`

> ⚠ **Batch deploys.** Every bump re-downloads ~632 KB for every returning user.
> Do not bump once per file changed — do one bump per deploy.

```js
// sw.js line 11 — increment the number only
const SHELL_VERSION = 'shell-v308';  // → shell-v309, shell-v310, …
```

### When to bump `_CACHE_VERSION` (`question_loader.js`)
Bump when ANY question content changed (new questions, edited explanations,
corrected answers, changed `chapterId`, added/removed questions). Without this,
returning students keep the old set for up to 7 days with no UI warning.

```js
// engine/question_loader.js ~line 905
const _CACHE_VERSION = 133;  // → 134, 135, …
```

> ⚠ Do NOT bump `_CACHE_VERSION` for lab file changes — labs are fetched
> on demand and are not part of the question cache.

---

## 2. Question content changes (if you added / edited questions)

### 2a. Write the question file
- File goes under `subjects/[pack]/questions/[name].js`
- ID format: `[grade][subject]-[chapter]-[NNN]`  e.g. `g8s-acids-012`
- Difficulty: 1 Basic · 2 Medium · 3 Hard · 4 Word problem (maths) / applied scenario
- All four options must be grammatically parallel and the same length range
- `answer:` must match one of the `options:` exactly (case-sensitive)
- Alt text must NEVER reveal the answer
- ⚠ `makeMCQ()` shuffles options — do not rely on position

### 2b. Register the file for local dev
```js
// engine/question_loader.js — LOCAL_FILES object
// Add only for file:// dev; production auto-discovers
'grade8-science': ['ch01_core.js', 'ch02_expanded.js', 'your_new_file.js'],
```

### 2c. If you added or renamed a CHAPTER
```powershell
node scripts/build-subject-index.js
```
> ⚠ `subjects/_index.js` is GENERATED — never hand-edit it. `check.js` fails
> on drift between the index and the actual manifests.

### 2d. If you added a subsection
Declare it in the chapter's `syllabus.subsections` in `_manifest.js`.
The subsection id in the declaration must exactly match the `subsection:` tag
on every question. `scripts/test-subsection-invariant.js` fails on any mismatch.

### 2e. Run preflight
```powershell
node scripts/preflight.js
```
This runs (in order): rebuild subject index → subsection invariant →
rebuild question bundles → live-pack content check → `check.js`.
**All five must pass before continuing.**

Add `--import-dry-run` to preview what the Supabase import would change:
```powershell
node scripts/preflight.js --import-dry-run
```

---

## 3. Labs changes (if you added / changed a lab)

### 3a. For EVERY new or changed lab — run data test
```powershell
node scripts/test-labs-<id>-data.js
```
Must pass **0 failures**. This checks: formulas, discovery recipes, quiz
question shape (4 distinct options, `why` field), hazard card completeness.

### 3b. For EVERY new or changed lab — run browser test (one at a time)
```powershell
# Serve from file://. Never run two Chrome instances at once — low memory.
node scripts/test-labs-<id>.js
```
Chrome for Testing path: see `docs/labs/LAB_SPEC.md` §5.
If the path no longer exists, reinstall Chrome for Testing to the scratchpad.

### 3c. Run the grades consistency test
```powershell
node scripts/test-labs-grades.js
```
This derives expectations from `Labs.LABS` in `lab_core.js` and fails if
`_LAB_GRADES` in `app.js` disagrees. Fails loudly — do not skip it.

### 3d. Flip a new lab to ready
Only flip after **both** the data test and browser test pass.
In `engine/labs/lab_core.js`, change the lab's `L(...)` line:
```js
// Before:
L('magnets', '🧲', 'Magnets', 'Science', 'LabMagnets', { … }, [4, 8], false),
// After:
L('magnets', '🧲', 'Magnets', 'Science', 'LabMagnets', { … }, [4, 8], true),
```

### 3e. New labs waiting for test sign-off (2026-09-12)
These labs are built but `ready: false` — tests must pass before flipping:

| Lab | Data test | Browser test | Notes |
|---|---|---|---|
| `magnets` (G4+G8) | ⚠ pending | ⚠ pending | Port 9424 |
| `forces` (G8) | ⚠ pending | ⚠ pending | Port 9425 |
| `sunmoon` (G6+G7) | ⚠ pending | ⚠ pending | Port 9426 |
| `heat` (G6) | ⚠ pending | ⚠ pending | Port 9427 |

Air & Burning facts confirmed:
- Mauritius fire service number **115** ✓ (confirmed by owner 2026-09-12)
- "1 litre of air weighs about 1.2 g" ✓ (standard value at sea level ≈ 1.2 kg/m³)

---

## 4. Run the full test suite

Run **sequentially** (one Chrome at a time — limited memory on this machine):

```powershell
# 1. Data tests (Node only, fast)
node scripts/test-labs-mixing-data.js    # aka test-labs-chem-data.js
node scripts/test-labs-separation-data.js
node scripts/test-labs-circuit-data.js
node scripts/test-labs-light-data.js
node scripts/test-labs-measure-data.js
node scripts/test-labs-microscope-data.js
# … and any new labs

# 2. Browser tests (one Chrome at a time)
node scripts/test-labs-mixing.js
node scripts/test-labs-separation.js
# … remaining labs

# 3. Infrastructure tests
node scripts/test-labs-grades.js
node scripts/test-role-modules.js
node scripts/check.js
```

> ⚠ `scripts/test-pending-report-clarity.js` fails on HEAD — this is a
> pre-existing issue unrelated to labs. Do not block deploy on it.

---

## 5. Import questions to Supabase

> Only needed if question content changed (new files, edited explanations,
> corrected answers). Skip this section if only lab files changed.

### Dry run first — see what would change
```powershell
node scripts/preflight.js --import-dry-run
```
A clean re-import reads approximately "0 new, ~560 updated" — not zero writes.
If it shows unexpected deletes, stop and investigate.

> ⚠ The importer **never deletes** rows. Old IDs stay in the database
> harmlessly. Only rename an ID if you are certain it is not in production
> (grep `student_answers` for it first).

### Run the actual import
```powershell
node scripts/preflight.js --import
```
Watch for warnings about `makeCloze is not defined` or skipped files —
these mean content did not import. Fix the error, re-run.

### Verify the import
After import, check the row count in Supabase:
```sql
select count(*), type from questions group by type order by type;
```
Compare to the previous count. `text` and `cloze` rows going to 0 is the
classic sign of a sandbox context missing a factory.

---

## 6. Build the deploy directory

```powershell
node scripts/prepare-deploy.js
```

This stages a clean allowlist of files into `.deploy/`. It will fail if:
- `.env` is missing from the project root
- Required files are not present in the allowlist
- The subject index is stale (`check.js` is embedded)

> ⚠ `.deploy/` is an allowlist, not a denylist. A new sensitive file at the
> repo root will NOT be staged — but it also will not be blocked. Add an
> explicit `netlify.toml` 404 rule for any new sensitive root file.

After staging, verify the directory looks right:
```powershell
(Get-ChildItem .deploy -Recurse | Measure-Object).Count
# Should be ~682 files, ~29 MB
```

---

## 7. Deploy to Netlify

```powershell
netlify deploy --prod --dir=.deploy --functions=netlify/functions
```

> ⚠ This uploads from local disk, not from git. Everything in `.deploy/` ships.
> ⚠ `--functions` reads the repo directly — `netlify/` is NOT inside `.deploy/`.
> ⚠ NEVER use `netlify deploy` without `--dir=.deploy` — it would upload the
> full 491 MB repo including past papers and `.env`.

---

## 8. Post-deploy verification (do all of these)

### 8a. Shell version
```powershell
(Invoke-WebRequest "https://psac-practice.netlify.app/sw.js").Content | Select-String "SHELL_VERSION"
# Must show the new version you deployed
```

### 8b. Function endpoint
```powershell
Invoke-WebRequest "https://psac-practice.netlify.app/.netlify/functions/questions" -Method POST
# Must return 401 (deployed + auth gate working)
# 404 means function not deployed — check --functions path
```

### 8c. Question bundles blocked
```powershell
Invoke-WebRequest "https://psac-practice.netlify.app/netlify/question-bundles/grade9-biology.json"
# Must return 404 (blocked by netlify.toml rule)
# 200 means the bundles are publicly accessible — a security issue
```

### 8d. Open the app in an incognito window
- Check the grade the changed content belongs to
- Hard-reload (Ctrl+Shift+R) to bypass old SW cache
- Open a chapter and confirm questions load
- For lab changes: open the Labs screen, open the changed lab

### 8e. For question content changes — check a student
Open the app as a Grade 8 student (or whatever grade was changed) and verify
the corrected/new questions appear in practice mode.

---

## 9. Known issues (do not block deploy on these)

| Issue | File | Status |
|---|---|---|
| `test-pending-report-clarity.js` fails | `scripts/` | Pre-existing, unrelated to labs |
| `run-schema-tests.sh` exits non-zero | `scripts/sql-tests/` | The co-parent RLS finding (pending.md item 0) — deliberate |
| Air & Burning: fire number 115 | `lab_air_data.js` | Confirmed correct (Mauritius fire service) |
| Separation G7 distillation quiz `why` fields still quote NCE papers | `lab_separation_data.js` | Lower priority — quiz is grade-gated, G7 guides don't include distillation mission |

---

## 10. Emergency rollback

Netlify keeps the previous deploy. To roll back immediately:
1. Go to **Netlify dashboard → Deploys**
2. Click the previous successful deploy
3. Click **Publish deploy**

This reverts the CDN instantly. The Supabase database is NOT rolled back
automatically — if the import added bad rows, fix them manually in the
Supabase table editor or by re-importing corrected files.

---

## 11. Current version baseline (2026-09-12)

| Item | Value | File |
|---|---|---|
| `SHELL_VERSION` | `shell-v308` | `sw.js:11` |
| `_CACHE_VERSION` | `133` | `engine/question_loader.js:905` |
| Labs registered | 18 total (14 ready, 4 pending tests) | `engine/labs/lab_core.js` |
| `_LAB_GRADES` | `[4, 5, 6, 7, 8, 9]` | `engine/app.js:9835` |
| Questions in DB (last import) | 14,893 rows | Supabase `questions` table |
| Live packs | Grades 4–6 + NCE Grade 9 (Maths, ICT, Biology, Chemistry, Physics) | — |

> ⚠ These numbers go stale immediately after the next deploy.
> Always read from the files and the live database — never from this table.
