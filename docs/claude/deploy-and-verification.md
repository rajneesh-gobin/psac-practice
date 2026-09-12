# Caching, deploy and verification

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read this before bumping a version, deploying, or writing a headless-Chrome harness.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## Caching & deploy

### Version bumps
- **`SHELL_VERSION` (`sw.js`)** — bump on any change to a shell-cached engine file,
  or returning users never receive it. ⚠ Individual pack manifests are deliberately
  NOT precached; `PackLoader` fetches only what a child opens.
- **`_CACHE_VERSION` (`question_loader.js`)** — bump when question content or the
  cache envelope changes.
- ⚠ **Read both numbers from the files; never quote a number from this file.**
- ⚠ The SW shell list is all-or-nothing (`cache.addAll` rejects wholesale on one
  404). **Re-check `<script src="engine/…">` tags against `SHELL_FILES` on every
  deploy that touches them.**
- ⚠ **`SHELL_VERSION` churn is the multiplier on everything below**, and it is a
  process problem: v232 → v249 in one working session, each bump re-downloading
  the whole shell for every returning user. **Batch deploys.**

### What is and is not precached
The shell was **56 files / 2.87 MB** over the wire; it is now **37 files / 632 KB**.
Three rules, not a one-off tidy-up:
- ⚠ **Static assets (`/assets/**`, `/fonts/**`) are NOT in `SHELL_FILES`** — they
  live in `ASSET_CACHE`, which is **deliberately UNVERSIONED and kept by
  `activate`**. Bundling the question images made them same-origin, which would
  otherwise drop them into `SHELL_CACHE` and re-download every picture a child had
  already seen on every `SHELL_VERSION` bump, on a metered connection. 7.4 MB of
  all-or-nothing pre-cache is also not a first load.
- ⚠ **Size every bundled image against the CSS box it displays in.** Two precached
  photographs were 1.1 MB between them — `mahe-de-labourdonnais.jpg` alone was
  **928 KB**, a third of the whole shell, at 721×1056 for a `max-height:220px`
  slot (re-encoded to 28 KB). ⚠ `market.jpg` was tried and **reverted**: 180 →
  146 KB is not worth degrading a picture a child is asked to describe.
- ⚠ **`admin.js`, the five teacher files and `forum.js` load on demand** — see
  Role modules above.
- ⚠ Netlify's default is `public,max-age=0,must-revalidate` on **everything**
  (measured against production). `netlify.toml` gives `/assets/questions/*` and
  `/fonts/*` a 30-day max-age — deliberately **not** the engine or `index.html`,
  and deliberately not `immutable`.

### Question images are BUNDLED (138 files, 11.9 MB, `assets/questions/`)
The bank used to hotlink from Wikimedia Commons. ⚠ **Hotlinking had already failed
silently**: 24 of the 139 Commons files had been DELETED and were 404ing in
production, in 27 live questions. And ⚠ **the SW never caches cross-origin
requests** (deliberately), so every picture question was a broken icon offline.
- ⚠ **Commons now refuses direct ORIGINAL fetches** (`429 … use thumbnail images`,
  `retry-after: 600`) and refuses arbitrary thumb widths — only certain ones are
  served, and asking for a width above the original hands back the original url,
  which is refused. ⚠ **Commons also rounds a requested width UP**: asked for 1024
  it served 1280. Measure the file, never trust `iiurlwidth`.
- ⚠ **ONE credits record: `assets/questions/provenance.json`**, and
  `image-credits.html` is **generated from it**
  (`node scripts/build-image-credits.js`), linked from the landing footer.
  Bundling is redistribution; CC BY / BY-SA require the author, the licence and a
  link on every copy. Do not hand-edit the page, and **do not give it a
  `netlify.toml` 404** — an attribution nobody can reach discharges nothing.
  ⚠ There were briefly TWO credits files, written the same day by two sessions in
  the same working tree; if a second reappears, **merge rather than pick**.
- ⚠ **Provenance is captured FORWARD, from the API response that produced the
  file. Never reconstruct it from a filename** — the local names are lossy slugs,
  and that reverse lookup reported ~106 of 115 as "no such file", which reads as
  "provenance unknown" for images whose licence was fully recorded. ⚠ Commons
  filenames contain parentheses, so a markdown-link regex of `\(([^)]+)\)`
  truncates the URL at the first `)`.
- ⚠ A PNG only stays a PNG if its alpha is **measured in use** — 8 of 12 were fully
  opaque and became JPEGs (751 KB → 21 KB for Mars); the 4 that really use alpha
  would get a white box behind them in dark mode.
- ⚠ **`/.netlify/functions/questions` must never be cached by the SW** — that
  response is `private` precisely because it varies per caller, and a URL-keyed
  cache hands one child's entitled set to another. `activate` also **evicts**
  entries earlier versions wrote (`DATA_CACHE` survives a version bump).
- Tests: `test-question-images.js` (does a picture reach a child's screen: served
  as an image, decodes, fits 360px, alt text does not leak the answer) and
  `test-question-image-offline.js` (is it there without the network, is its licence
  recorded). ⚠ Harness traps: `Emulation`/`Network` overrides on the page target do
  **not** reach the service worker (shut the origin server down instead); a lazy
  `<img>` in an off-screen iframe never loads, so `decode()` never settles; and
  injecting question HTML into the live app fires `_Dialogs`' MutationObserver once
  per question — measure in an isolated same-origin iframe that loads `style.css`.

### CLI deploy
✅ **Stage the publish directory first — `node scripts/prepare-deploy.js`**, then
`netlify deploy --prod --dir=.deploy --functions=netlify/functions`.
The build runs **locally**, so no Netlify build minutes; there is no `dist/`
(`publish = "."`).
- ⚠ **It uploads from local disk, not git.** Everything gitignored but present
  ships. The repo tree is **491 MB / 8,900 files**; the site is **29 MB / 682**.
  What used to ship with every deploy: `past-papers/` (147 MB of copyrighted
  MES/MIE PDFs), `.netlify/` (60 MB), `netlify/` (21 MB — including the question
  bundles that answered **200 with real questions and their answers**, bypassing
  every entitlement check), `exam_papers/`, and **`.env` with the service role
  key**. That last one is why the staging dir exists: "move `.env` out of the tree
  first" was a manual step in a document, one forgotten command from publishing it.
  - ⚠ It is an **ALLOWLIST**. A denylist ships every new scratch file at the repo
    root by default; the allowlist inverts the failure so something NEEDED goes
    missing and the script's own checks fail loudly.
  - ⚠ `assets/past-papers/` is **kept** — the cropped artwork questions display, a
    different thing that merely shares a name; an unanchored `/past-papers/` rule
    matched it and blocked the first run.
  - ⚠ `netlify/` is **not published**: functions ship via `--functions`, which
    reads the repo. **Verify `/.netlify/functions/questions` answers 401 (not 404)
    right after the first staged deploy** — the one thing no local check can prove.
- ⚠ `publish = "."` serves the repo root, so `netlify.toml` carries explicit 404
  redirects — explicit because Netlify wildcards match only a *trailing* splat
  (`/*.md` matches nothing). Add one for any new sensitive root file;
  `scripts/test-netlify-redirects.js` walks the tree and fails on anything neither
  allowlisted nor blocked (verified in both directions, including that a rule
  matching `/.netlify/*` would 404 every function in the app).
  ⚠ **A 404 from this site has two meanings**: ~398 KB is one of our rules firing,
  ~4.2 KB is Netlify saying the file was not deployed. Never read the second as a block.
- ⚠ **The CDN keys on URL alone** — it does not vary on `Authorization` or
  `X-Student-Token`. Every error path in `questions.js` uses an `errHeaders` object
  with `no-store`; one cached 401 poisoned a subject for 24 hours for every child.
- ⚠ **Draft deploys cannot verify this** (Netlify preview auth answers 401 to
  everything). Verify against **production** immediately after promoting, with a
  cache-busting query string.
- ⚠ **Production builds from `main`.** If a fix is reported as still broken, check
  which branch is deployed before concluding the fix is wrong.
- ⚠ **Probe deployed state, never infer it** — `curl -s <site>/sw.js | grep
  SHELL_VERSION`, and POST to an `/api/` route (**401 means deployed, 404 means
  missing**). Stale numbers recorded here once sent a whole debugging session the
  wrong way. ⚠ **An undeployed `/api/` route returns the SPA fallback: HTML with
  status 404**, so `response.json()` throws and code that treats that as `{}`
  reports the server's own refusal for a request the server never saw.
  `AdminPanel._adminApi()` checks the content type first and says "not available
  (HTTP 404)". The same is true on a plain local static server, where no function
  runs at all — every `/api/` call fails there.

### Netlify env vars (dashboard only, never in the repo)
`SUPABASE_SERVICE_ROLE_KEY` (⚠ its absence used to fail *open*), `SUPABASE_ANON_KEY`,
`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`,
`VAPID_EMAIL`.

---

## Verifying work — traps in the harnesses
This project's fixes are **measured, not eyeballed**.
- ⚠ **The service worker serves a stale shell.** A CDP run must
  `Page.setBypassServiceWorker` **and** `Page.reload {ignoreCache:true}`, or you
  measure the previous `style.css` and report a fix that never landed.
- ⚠ **Stop an overflow detector's ancestor walk at `body`** — `overflow-x: clip`
  above it makes every page look clean. `scripts/audit-mobile-screens.js [width]`
  reveals every `.screen` at 360px and 320px, judges per-element rects (a
  scrollWidth check is blinded by that same `clip`), skips children of
  clipping/scrolling ancestors and pure-emoji decorations, and covers **static
  markup only** — dynamic content needs its own probe.
- ⚠ **Give every CDP call its own timeout.** An infinite loop in page JS blocks the
  renderer's message loop so CDP never answers; without a timeout you cannot tell
  "page wedged" from "harness bug".
- ⚠ **`checkVisibility()` answers false for everything in headless Chrome 152** — a
  probe built on it measures nothing and passes. Assert collapse by geometry, and
  filter closed `<details>` by ancestry.
- ⚠ **A contrast probe must composite translucent layers over the real ground.** A
  chalkboard gradient is a background *image*, so its computed `backgroundColor` is
  transparent and a naive walk measures chalk on white at 1:1; taking the first
  background with any alpha reads a .07 tint as solid near-black and fails
  perfectly legible text at 1.2:1. Use a KNOWN-surface table where one exists.
- ⚠ **Do not point a login probe at a real family** — four digits against a real
  username increments `pin_attempts` and can trip `pin_locked_until`.
- ⚠ **Never build a regex through a shell heredoc into a JS template literal.**
  `\s` arrived as `s` and silently deleted the letter *s* from every recorded
  mistake — plausible-looking output, caught only by asserting the exact string.
- Any tooling that loads questions outside the browser must reproduce what each
  factory actually returns (`makeMatch` has **no `question` field** — it builds the
  text from `leftItem`).
- **`scripts/sql-tests/run-schema-tests.sh`** builds the schema from nothing on
  `postgres:17-alpine`, re-applies it for idempotency, then runs 47 RLS assertions
  **as `authenticated`, never the superuser** (RLS does not apply to a superuser,
  which once made every "can see the row" check pass for a total stranger). ⚠ It
  exits **non-zero today** on the co-parent finding in [pending.md](pending.md) item 0 — that is the
  finding, not a broken test.
- SQL changes are applied against production **inside a transaction and rolled
  back**, or against a local Postgres with the live constraints.
- The write step is not self-verifying: always reconcile "rows written" against a
  fresh count. A quote-style mismatch once skipped 119 questions *while reporting
  success*.

---

## Pre-deploy status — updated 2026-09-12

### Version numbers (read from files, not this doc)
- `SHELL_VERSION` → `shell-v309` (`sw.js`)
- `_CACHE_VERSION` → `133` (`engine/question_loader.js`)

### What is done — working tree only, not yet committed
- ✅ Smart quotes fixed in all 13 `*_data.js` lab files (SyntaxError root cause)
- ✅ Periodic table — mobile layout fix + back button added
- ✅ Mobile fold fix — `labs.css` (start panel visible before canvas on phones)
- ✅ Guide interactivity — `_coachGuide(on)` added to all 11 interactive labs (separation, light, measure, motion, quadrat, microscope, rusting, materials + the 3 previously fixed)
- ✅ Separation G7 exam text — grade-conditional, no longer quotes Grade 9 papers
- ✅ Unbalanced equations — `g8s-acids-004` and `g8s-acids-008` corrected
- ✅ `lab_plan.md` updated to reflect current state

### What is blocking — must resolve before commit
1. **Run data tests** for all 8 untested labs (4 batch-1 + 4 batch-2). Node.js is not on the Claude Code shell PATH — use `! node` from the terminal:
   ```
   ! node scripts/test-labs-nutrition-data.js
   ! node scripts/test-labs-gastests-data.js
   ! node scripts/test-labs-changes-data.js
   ! node scripts/test-labs-energy-data.js
   ! node scripts/test-labs-magnets-data.js
   ! node scripts/test-labs-forces-data.js
   ! node scripts/test-labs-sunmoon-data.js
   ! node scripts/test-labs-heat-data.js
   ```
2. **Run browser tests** (Chrome for Testing, `file://`) for the same 8 labs sequentially.
3. **Flip `ready: true`** in `engine/labs/lab_core.js` for nutrition, gastests, changes, energy — only after both tests pass 0 failures.
4. **Run full suite** (§6 of `docs/labs/lab_plan.md`) — last clean run was 2026-09-11 night, before the current batch of changes.

### Commit scope — must be one commit, not piecemeal
The working tree contains finished versions that supersede the half-built `eb9c86b` commit. The next commit must include ALL of:
- `engine/labs/` (all lab JS + CSS files)
- `scripts/test-labs-*.js`
- `engine/app.js` (`_LAB_GRADES`, `openLabs` toast, TTS auto-read flag)
- `index.html` (Labs note text)
- `docs/` (lab_plan.md, this file)
- `sw.js` (SHELL_VERSION bump)
- `engine/question_loader.js` (\_CACHE\_VERSION bump)

### Known non-blocking issues (do not hold the deploy for these)
- Mixing Bench text links — inline `min-height:44px` should move to `.lab-mixing .lab-link` in `labs.css` (cosmetic)
- Float accumulation in `_tick()` — fixed in `lab_food.js`; other labs with time thresholds may have the same flaky behaviour; fix on first failure
- `scripts/test-pending-report-clarity.js` fails on HEAD — pre-existing, unrelated to labs
