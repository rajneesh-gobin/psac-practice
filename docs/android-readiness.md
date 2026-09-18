# Android / Google Play readiness

> Companion to [`convert_to_app.md`](convert_to_app.md), which is the BUILD
> recipe (keystore, Bubblewrap, assetlinks, the Play listing). **This file is
> what has to change in the WEB APP itself** before that recipe produces
> something submittable.
>
> ⚠ `convert_to_app.md` says *"The web app itself needs **zero** code changes."*
> That was wrong, and this file is the correction. The app **runs** unchanged;
> it does not **comply** unchanged, and several screens misbehave.

**Audited 2026-09-18.** Everything below was read out of the code or measured
against production — re-measure rather than quoting this file.

---

## The one-line status

> **Web: ready. Payments: compliant. Policy blockers: cleared.**
> **Code: done. The only thing left before a submission is the assetlinks**
> **SHA-256, which needs a build to exist first.**

---

## There is ONE codebase and ONE deploy — this is not a port

A TWA is a ~3 MB Android shell whose entire content is *"open
`https://nouklass.com` full-screen"*. It contains none of your HTML, CSS or JS.

```
wrangler deploy  ──►  nouklass.com  ──┬──►  a parent's Chrome        (web)
                                      └──►  the Play app's window    (app)
```

One deploy changes both at the same instant — no Play review, no app update, no
version skew. The Android shell is rebuilt only for a package name, icon or
splash colour change.

⚠ **So every difference between web and app is a RUNTIME question, never a
build.** That is what `_isAndroidApp()` exists for. Never branch the repo, never
fork a file, never ship a second bundle.

---

## ✅ Done (2026-09-18)

### The question bank was publicly downloadable — closed
`scripts/prepare-deploy.js` copied `subjects/` **whole**, publishing all 748
question source files (19 MB) as static assets. Measured on production:

```
/subjects/grade6-english/questions/ch03_clauses.js  ->  200  text/javascript  15142B
```

…answers, hints and explanations included, with no login, bypassing
`questions.js` and every entitlement, expiry and kill-switch check in it.

- **Fix:** one `FORBIDDEN` rule, `/^subjects\/[^/]+\/questions($|\/)/`.
- ⚠ **Anchored at the pack level on purpose.** `subjects/_index.js` (in
  `SHELL_FILES`) and all 49 `subjects/<pack>/_manifest.js` (fetched by
  `PackLoader.ensure()`) **must keep shipping**. Staged output verified: 0
  question files, 49 manifests, `_index.js`, `grade5-maths/help.js`.
- ⚠ **Nothing in production ever asked for them.** `_loadLocal()` is the only
  consumer of `LOCAL_FILES` and both its call sites sit behind
  `if (_isFileProtocol)` — `file://` dev only.
- ✅ `/netlify/question-bundles/*.json` now 404s (pending.md item 1 is closed).
  `/api/questions` correctly 401s.
- ⚠ **No files were deleted.** All 748 remain on disk and in git; they are the
  authoring source read by `build-questions.js`, `import-questions.js` and ~12
  local scripts. Only *publishing* stopped.

### Google Play payments — seven gates
Google Play forbids **selling** digital content in the app and expressly allows
**honouring** a purchase made elsewhere. Juice stays on the web and is hidden in
the app.

`_isAndroidApp()` in `engine/helpers.js` (loads 3rd, ahead of `app.js` and
`auth.js`), plus:

| function | closes |
|---|---|
| `openPlansModal()` | **the one door** into the Juice flow, + Rs prices |
| `startJuicePayment()` | direct call — it is exported to `window` |
| `_shopOpenForParents()` | Shop tab, credit chip, `[data-shop-entry]`, expired banner |
| `renderShop()` | the screen's own guard |
| `hydrateLandingPrices()` | landing-page prices (latent — see below) |
| `_showFeatureModal()` | the "See plans" button on 14 paywall modals |
| `_showCapModal()` | same route, second function — easy to miss |

Paywall **copy** is untouched: a child still reads *"The Game Zone is part of a
paid plan"*, with an **OK** button instead of **See plans**. Telling someone a
feature is not in their plan is not steering; showing a price or a route to pay
is.

`scripts/test-android-app-gates.js` — 21 assertions, standalone (not in
preflight, not in CI, so parking this costs no daily noise, same as
`test-assetlinks.js`).

⚠ **Traps this cost us, all pinned by the test:**
- **`sessionStorage`, NOT `localStorage`.** A TWA runs on Chrome's own profile
  and shares this origin's `localStorage` with the user's ordinary browser on
  the same phone — a sticky flag there hides the shop on the **web** too.
- **NOT `display-mode: standalone`.** Equally true of a PWA installed from
  Chrome, which is still the web and must keep its payment options.
- **NOT a `?platform=` start URL.** `sw.js` matches with
  `caches.match(request)` and no `ignoreSearch`, so `/?platform=android` misses
  the cached `/` and a cold offline launch lands on *"Offline — resource not
  cached yet."*
- ⚠⚠ **The referrer must be tested FIRST and OUTSIDE the `try`.**
  `sessionStorage` does not return `null` when site data is blocked — it
  **throws**. With both tests in one `try`, such a device answered `false` with
  `android-app://` staring at it, putting the shop back inside the Play app.
  Found by the test, not by reading. That is assertion 8.
- ⚠ `hydrateLandingPrices()` is **dead today** — no `[data-plan-price]` exists
  in `index.html` (the three priced tiers are commented out on purpose,
  `index.html:1225`). It is gated anyway so it cannot wake up inside the app.

---

### Families policy, stale icons, and the dead install panel (2026-09-18)

**A2 — social share-out.** The six end-of-game screens (`qfShareTo`, `fnShareTo`,
`rfShareTo`, `lbShareTo`, `ecShareTo`, `stShareTo`) drew direct wa.me /
facebook.com/sharer / twitter.com/intent buttons. In the app they are no longer
drawn, and each handler refuses a social target as well.
- ⚠ **What stays, deliberately:** the 📤 Share button (`navigator.share`) and
  🔗 Copy. Those are the platform’s own share sheet and the clipboard —
  user-initiated, naming no third-party destination inside the app. A child who
  picks WhatsApp from the OS sheet is the OS’s doing, not a link we shipped.
  That is the line Play draws, and it keeps the feature working.
- The five identical two-button blocks became one `_socialShareBtns(fn)` helper,
  so the next policy change lands in one place instead of five.
- `app.js:5818` no longer tells a child *“they earn credits by inviting other
  families”* in the app. The web keeps it — whether it should say that to a
  nine-year-old anywhere is a product call, not a technical one.

**A3 — targetSdk.** `convert_to_app.md` now says **35** (and minSdk 21), with a
note that Android 15 forces edge-to-edge at that level — which is what makes B1
a real defect rather than a dormant one.

**B4 — install UI.** Narrower than the audit assumed. The iOS tip banner already
gates on `isIOS`, and `#pwa-install-btn` only unhides on `beforeinstallprompt`,
which never fires in a TWA. Only `showInstallPanel()` needed gating — it fell
through to *“use your browser menu and choose Install app”*, a menu a full-screen
app does not have. It clears `?installProfile=` on the way out, or the param
survives into the next `replaceState` and reopens the panel on the next load.
- ⚠ `openLauncher()` is deliberately **not** gated. `renderLauncher()` only lists
  saved profiles with Open and Forget, and that is exactly the child switcher the
  app needs in place of per-child home-screen icons (B6).

**B9 — icons.** ⚠⚠ **The PNGs were two days older than the artwork.**
`icon.svg` was redesigned 2026-08-27 (commit 9654a4d) specifically to be
maskable-safe; `icon-192.png` and `icon-512.png` are from 2026-08-25 and were
never regenerated. So the favicon showed a graduation cap and a star while the
Android launcher showed a different conical-hat logo with coloured bars along the
bottom edge — two logos for one app, and the PNG is the one Android and
Bubblewrap actually use.
- `scripts/build-icons.js` rebuilds all four from `icon.svg` using headless Edge
  (no image library, no network), checks every shape against the 80% safe circle,
  and fails if `icons/generate-icons.html` — which embeds a **second copy** of the
  artwork — has drifted from it.
- ⚠ Two purposes, two files. `purpose:"any"` keeps the rx=115 rounded corners;
  `purpose:"maskable"` squares the background off, because the OS crops a maskable
  icon and fills nothing in — ship the rounded one and a square-mask launcher
  shows four transparent corner wedges.
- ⚠ The test now fails if any PNG is older than `icon.svg`, so this cannot rot
  the same way twice.

`scripts/test-android-app-gates.js` is now **42 assertions** covering all of the
above plus the payment gates.

---

### B2 — the Android back button (2026-09-18)

`engine/app.js` had **no `pushState` anywhere**: navigation was `showScreen(id)`
and nothing else, so history held exactly one entry. A TWA maps Android’s
hardware/gesture Back to `history.back()`, so Back from any screen **finished the
activity** — back out of question 30 of an exam and the app closed.

The entry is pushed **inside `showScreen()`**, not at the ~171 call sites across
10 files, so every caller inherits it and a new one cannot forget.

- ⚠ `pushState` is synchronous, so **`showScreen()` stays synchronous** — dozens
  of callers read the DOM or focus a field on the line after it.
- ⚠ **The URL never changes.** This app has no routes; the screen lives in
  `history.state` alone. Writing a path would make every entry a reload target
  the SPA cannot serve.
- ⚠ **The first screen replaces rather than pushes.** Pushing would leave a
  stateless entry underneath, so leaving the app would take two Backs from the
  home screen and the first would appear to do nothing.
- ⚠ **Entry screens are excluded** (`landing`, `auth`, `verify-email`,
  `reset-password`, `biometric-lock`) — the same set `psac-last-screen` uses, now
  defined **once** and shared. A signed-in child pressing Back must not land on
  the sign-in screen, and Back on the home screen *should* leave the app.
- ⚠ **Five `replaceState` callers passed `null` or `{}`** and would have wiped
  `.screen` off the current entry (`auth.js` ×4, `profile_install.js` ×1), after
  which Back read no target and left the app — and only on the paths that clean a
  URL, so it would have looked random. They now carry `history.state` through.
- ⚠ **A modal swallows the Back press**, closed through its **own** control via
  `_Dialogs._closeControl` — never by hiding the wrapper, so its cleanup (a
  document keydown listener, focus restore) still runs. Reusing `_Dialogs._stack`
  means Back and Escape can never disagree about which modal is on top.
- ⚠ **Mid-exam Back reuses `#exit-exam-btn`**, so the wording and the cleanup
  (`_clearExamResume`, the timer, the answers) stay one implementation.
- ⚠ **A guard may refuse the replayed screen** — a kid-only screen in a parent
  session bounces to the dashboard. Those redirects run with `_navPopping` still
  true and record nothing, so history is reconciled to where we actually landed,
  by `replaceState`: one Back press, one step.

`scripts/test-back-button.js` — **27 assertions**. It extracts the shipped block
out of `app.js` and runs it against a real history stack, so it exercises the
code rather than a paraphrase of it.

⚠ **Not verified in a real browser.** A headless-Edge probe would not run here
(`--dump-dom` returns nothing in Edge 153, and screenshots of a local page
failed), so `pushState`/`popstate` wiring and the interaction with the fully
booted app are still unproven. Both belong to the on-device internal-testing
step regardless — check Back from: an exam, a modal, a deep chapter, and the home
screen (which should exit).

---

### B1 — `viewport-fit=cover` (2026-09-18)

`index.html:5` was the only HTML file in the repo without it, so all 9
`env(safe-area-inset-*)` rules in `style.css` resolved to **0px** — the bottom
nav, the practice action bar, the exam nav row, the toast, the auth shell. With
targetSdk 35 forcing edge-to-edge on Android 15, that means content under the
gesture bar.

**Measured with Chrome for Testing 153** (installed at
`~/.cache/psac-chrome`, outside the repo — an earlier `npx` browser install put
500 MB *inside* it because Git Bash’s `$TMPDIR` is empty):

- `scripts/audit-mobile-screens.js` at **360px and 320px**, before and after:
  identical. One "protruding element" in both runs, and it is `div.contact-hp`
  — the contact form’s spam honeypot, deliberately parked at `left:-9982px`.
  No horizontal regression.
- `scripts/audit-safe-area.js` (new) drives insets through CDP and measures the
  response: with `top=47 bottom=34`, `main` under the tab bar computes to
  **106px = 60 (tabbar) + 34 (inset) + 12**. The rule consumes the inset, so
  content clears the gesture bar.

⚠⚠ **What that script CANNOT prove, and the first version of it got wrong.**
`Emulation.setSafeAreaInsetsOverride` injects the env() values directly and
**bypasses the viewport-fit gate**: serving `index.html` with the attribute
stripped still reported `top=47 bottom=34`. The strip worked — the probe prints
the meta it parsed — Chrome simply does not apply the spec rule under the
override. So an A/B of "with and without the meta" is not possible this way,
and the script’s first run reported a FAIL that was its own artefact rather
than a defect in the page. The dead-rules claim rests on the spec instead: under
the default `viewport-fit=auto` the viewport is already inset past the unsafe
areas, so there is nothing left for `env()` to return. **Confirm on a real
notched device** — that is the on-device step, not this one.

---

## ❌ Tier 1 — blocks a submission

> ✅ **A2 and A3 are done** — see the Done section above. Two items remain.

### assetlinks SHA-256 is still a placeholder
Order is fixed and cannot be shortcut: build → upload to internal testing → read
the fingerprint from **Play Console → Setup → App integrity → App signing**
(Google's key, **not** your upload key) → paste → deploy → *then* install and
check there is no address bar. See `convert_to_app.md`.

---

## ❌ Tier 2 — visible defects

| item | where | fix |
|---|---|---|
| **B6** per-child home-screen icons | `profile_install.js` | One Play listing = one icon. A 3-child family loses 3 launchers. Needs a good in-app child switcher, or stays web-only and is said so. |
| **B3** printable paper | `app.js:10475, 10483` | `window.open('','_blank')` + `document.write` — a TWA hands that to a Custom Tab. ⚠ The existing failure message, *"Please allow pop-ups"*, is unfollowable in an app. **Reuse the pattern already in `calendar.js:1388`**: render a print-only div, then `window.print()`. |
| **B7** keyboard covers the answer bar | no `visualViewport` anywhere | Measure on a device first — Bubblewrap's `adjustResize` may handle it. |
| **B10** offline first launch | inherent to TWA | No service worker exists before the first successful load, and asset-links verification needs network. **Not fixable in code** — handle it in the listing copy. |

---

## ❌ Tier 3 — polish

| item | fix |
|---|---|
| `theme-color` static (`index.html:137`) vs the light/dark toggle | update the meta on theme change |
| `navigator.storage.persist()` never called | one call at boot; stops Android evicting the progress blob and question cache |
| `sw.js` has no `ignoreSearch` | ⚠ **worth doing regardless of Android** — auth magic links (`/?code=…`) and `?installProfile=` miss the shell cache **today** |
| `skipWaiting()` with no update prompt (`sw.js:114`) | offer a reload rather than swapping the shell mid-exam |
| **B11** deep-link scope | with assetlinks verified, **every** `nouklass.com` link on the device opens the app — including `score.html` / `vote.html` share pages and auth magic links. Decide. |
| portrait lock vs wide content | `manifest.json` `portrait-primary` + `app.js:2061`; fine for exams, check the map and labs |

---

## Measured facts worth not re-deriving

**Google Play / Mauritius** (checked 2026-09-18 against Google's own pages):
- Mauritius **is** a supported **merchant** location — many countries have
  developer registration and not this. Payout currency **USD**.
- Payouts ~the **15th** of the following month, **US$100** minimum for USD wire
  payouts (the $1 threshold is for local-currency payouts only).
- Service fee **15%** on the first US$1M/year — ⚠ **not automatic**, you must
  accept the 15% tier terms in Play Console.
- ⚠ **Buyers in Mauritius fall under "other countries": cards only.** No PayPal,
  no carrier billing, no Juice. That conversion cliff matters more than the 15%.
- ⚠ **External payment links reach Mauritius on 30 September 2027**
  ("remaining regions"), at ~10%. EEA/UK/US got them 30 June 2026. Until then,
  in-app sale = Play Billing or nothing.

**This codebase:**
- ⚠ **Credits cannot be bought** — only earned (referrals at 15, admin
  adjustment). Virtual currency that can only be earned is **not** an in-app
  purchase, so the credit shop is not itself a Play Billing problem. Gate 5 is
  belt-and-braces.
- The Juice flow is a **closed graph with exactly one door**: every
  `startJuicePayment` / `_renderJuiceInstructions` / `markJuiceSent` call site
  is inside `openPlansModal()` or its descendants.
- `payments.provider` is free text with **no CHECK constraint** (only `status`
  has one), so `provider = 'google_play'` would need **no migration**.
  `workers/api/payment-webhook.js` already exists as a fail-closed skeleton.
- ⚠ **`profiles.expires_at` is nullable with no default**, and the server reads
  `expired = !!(p.expires_at && …)` (`questions.js:201`) — so **`NULL` means
  never expires** and every account created today is permanently free.

---

## Decisions still open

1. **How the free period ends.** ⚠ Recommended: a `free_access_until` key in the
   **existing global settings blob** rather than stamping every profile row —
   no migration, zero rows written, reversible, and `NULL` stops meaning "free
   forever". Needs one condition in **both** copies of `questions.js`.
   ⚠ **Do not author this from `supabase-schema.sql`** — it dumps `public` only,
   and the `profiles` row is created by a trigger on `auth.users` that is not in
   the dump. Query the live database first (`database.md` rule 1).
2. **Play Billing later, or web-only forever?** Recommended: ship web-only,
   watch whether the Android app drives signups, revisit. A full Play Billing
   integration (Digital Goods API in the TWA, server-side receipt verification,
   Real-time Developer Notifications for renewals/refunds, a `play_grant()`
   twin of `payment_admin_confirm()`) is larger than every other item here
   combined.
3. **School/B2B licences** — invoiced seats never touch Play at all, 0%, and
   Teacher Mode, classrooms and pupil PINs already exist.
4. **B11 deep-link scope.**

---

## Order of work

1. ✅ **Deployed 2026-09-18.** The content leak is closed and the payment gates
   are live. Verified on production: the question files now 404, `_index.js` and
   all 49 manifests still 200, `/api/questions` still 401.
   ⚠ Each `SHELL_VERSION` bump re-downloads the whole shell for every returning
   user, so batch deploys rather than shipping one fix at a time.
2. ✅ **A2 + A3 + B4 + B9 — done 2026-09-18.** Both policy blockers cleared.
3. ✅ **B1 — done 2026-09-18**, measured at 360px and 320px with Chrome for Testing.
4. ✅ **B2 — done 2026-09-18.** Still needs on-device confirmation.
5. Build the TWA → internal testing → fingerprint → deploy → verify no address bar.
6. Tier 2 remainder, then Tier 3.

Realistically **2-3 focused days** to submittable, with B2 roughly half of it.
