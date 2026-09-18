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

> **Web: ready. Payments: compliant. App: not submittable yet.**

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

## ❌ Tier 1 — blocks a submission

### A2 · Families policy: social share-out from children's screens
`engine/minigame.js` — six identical functions (`ecShareTo`, `fnShareTo`,
`lbShareTo`, `qfShareTo`, `rfShareTo`, `stShareTo`, 26 markup sites) open
Facebook, X and WhatsApp from **child-facing** game screens. Links out to social
networks from a children's app are exactly what Families review flags.

**Fix:** one shared helper, keep Copy (stays in the app), drop the three
networks when `_isAndroidApp()`. Web keeps all four.

⚠ Also `app.js:5818` tells a **child** *"They earn credits by inviting other
families."* Incentivising children to recruit is the same policy. Parents keep
the referral copy at `5904`.

Already fine: the forum is adult-only (`_ADULT_ONLY_SCREENS`), the global
leaderboard is off by default, avatars are emoji, no child photo upload, no DOB
collected, no ads.

### A3 · targetSdk
`convert_to_app.md` Step 3 and its troubleshooting table both say **34**. New
Play apps have needed **35** since Aug 2025. This is not cosmetic: SDK 35 forces
edge-to-edge on Android 15, which is what makes B1 a real defect.

### B1 · `index.html` is missing `viewport-fit=cover`
The repo contradicts itself — `guest`, `materials`, `privacy`, `score` and
`vote` all have it; `index.html:5` does not. So **all 9
`env(safe-area-inset-*)` rules in `style.css` evaluate to 0px**: the bottom nav
(`2624`), `.pr-actions` (`1794`), `#exam-nav-row` (`1911`), `#toast` (`1138`),
the auth shell (`1330`), `.ta-wiz-nav` (`10102`).

⚠ **Measure after adding it** — it wakes those rules on notched iPhones on the
**web** too: `node scripts/audit-mobile-screens.js 360` and `320`. Expect to add
`safe-area-inset-top` to the sticky app header, which has none.

### B2 · The Android back button closes the app from any screen
**Zero `pushState`/`popstate` in the codebase** (only 5 `replaceState`, all URL
cleanup). Navigation is `showScreen(id)` with no history entries, so back from
mid-exam finishes the activity. On Android this reads as a crash.

**~171 `showScreen()` call sites across 10 files**, so the fix goes *inside*
`showScreen()`; every caller inherits it. `pushState` is synchronous, so
**`showScreen()` stays synchronous** — dozens of callers read the DOM straight
after it.

⚠ **The trap:** `auth.js:171, 193, 241, 283` and `profile_install.js:239` pass
`null`/`{}` as state and would wipe the screen. Each must pass `history.state`
through.

Also decide: back on the first screen should exit (correct Android behaviour),
and modals should close on back rather than navigate.

### assetlinks SHA-256 is still a placeholder
Order is fixed and cannot be shortcut: build → upload to internal testing → read
the fingerprint from **Play Console → Setup → App integrity → App signing**
(Google's key, **not** your upload key) → paste → deploy → *then* install and
check there is no address bar. See `convert_to_app.md`.

---

## ❌ Tier 2 — visible defects

| item | where | fix |
|---|---|---|
| **B4** install UI is dead and misleading | `profile_install.js`, `app.js:2383` | `beforeinstallprompt` never fires in a TWA; the fallback tells users to open a browser menu that does not exist. Early-return on `_isAndroidApp()`. |
| **B6** per-child home-screen icons | `profile_install.js` | One Play listing = one icon. A 3-child family loses 3 launchers. Needs a good in-app child switcher, or stays web-only and is said so. |
| **B9** icon declared maskable but isn't | `manifest.json`, `icons/icon-512.png` | Full-bleed badge with its own corner radius; the bottom book bars sit outside the 80% safe zone and crop in the launcher and splash. Add a padded `purpose:"maskable"` variant and split it from `purpose:"any"`. |
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

1. **Deploy what is done** — closes the content leak. Web unaffected
   (`_isAndroidApp()` is false in every browser). ⚠ `SHELL_VERSION` was bumped,
   so every returning user re-downloads the shell once.
2. **A3 + B1 + B4 + B9** — a morning; small, independent, low risk.
3. **A2** — an hour, and it is a policy blocker.
4. **B2** — the only real piece of work. Own branch, own test.
5. Build the TWA → internal testing → fingerprint → deploy → verify no address bar.
6. Tier 2 remainder, then Tier 3.

Realistically **2-3 focused days** to submittable, with B2 roughly half of it.
