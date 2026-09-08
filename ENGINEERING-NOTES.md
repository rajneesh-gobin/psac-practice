# PSAC Exam Practice — Engineering Notes (archive)

> The long-form record: every investigation, measurement, rationale and
> post-mortem written while building this app. **`CLAUDE.md` is the working
> brief** — it carries the rules and invariants distilled from this file and
> is what gets loaded every session. Come here for the *why* behind a rule,
> the evidence behind a claim, or the full story of a bug.
>
> Sections are roughly chronological and are not maintained. Where this file
> and `CLAUDE.md` disagree, `CLAUDE.md` wins; where either disagrees with the
> code or the live database, **those** win — several claims in here were
> already stale when written, and say so.

## What this is
A vanilla JS single-page app (SPA) for Mauritian primary children revising for the PSAC exam. Grades 4, 5, 6. Subjects: Maths, English, French, Science, History & Geography.

Hosted on **Netlify**. Backend: **Supabase**. No frameworks — pure HTML/CSS/JS + Tailwind CDN.

---

## Tech stack
- `index.html` — single HTML file, all screens inside, shown/hidden via `showScreen(id)`
- `style.css` — custom CSS (Tailwind extended)
- `engine/` — all JS logic (loaded via `<script>` tags at bottom of index.html)
- `subjects/[grade-subject]/` — each subject has `_manifest.js` + `questions/` folder
- `netlify/functions/` — Netlify serverless functions (Node.js, esbuild bundler)
- `sw.js` — PWA service worker (cache-first shell, SWR for questions, network-first for API)
- `manifest.json` — PWA manifest
- Supabase URL: `https://xawvjwsiqhtxgpocdqgm.supabase.co`

## Engine load order (index.html script tags)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js →
  [all 15 subjects/*/_manifest.js] → subjects/grade5-maths/help.js →
question_loader.js → app.js → biometric.js → auth.js → teacher.js →
admin.js → forum.js → calendar.js → search.js → classroom.js
```
Two things this order guarantees, both load-bearing — verify against
`index.html` before trusting any summary of it, this one included:
- **The manifests load BEFORE `app.js`.** `CHAPTERS` is declared *once* in the
  whole repo, as `const CHAPTERS` in `subjects/grade5-maths/_manifest.js:9`, and
  `app.js` references it at top level (its final `console.log`, and
  `activateSubjectPack`). Move a manifest after `app.js` and that is a
  ReferenceError, not a warning.
- **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and assigns `ACTIVE_STUDENT_ID` — both defined in
  `app.js`. Anything `auth.js` touches at load time must already exist.

---

## Key globals
- `STATIC_QUESTIONS` — flat array, all question objects pushed here by question files
- `CHAPTERS` — flat array of chapter objects from active subject pack
- `ACTIVE_PACK` — current subject pack object
- `ACTIVE_STUDENT_ID` — current student's UUID
- `DB` — student progress/stats object (saved to Supabase + localStorage)
- `S` — in-memory session state: `S.practice.{chapterId, qs, idx, difficulty}`, `S.exam.{qs, answers, flagged, idx, type, endTime}`
- `SUBJECT_PACKS` — all registered subject packs

## Key functions
- `makeMCQ({id, chapterId, difficulty, question, options, answer, hint, explanation})` — question factory
- `startChapterDirect(chapterId, forceDiff)` — starts practice for a chapter
- `loadPracticeQuestion()` — renders current practice question
- `renderExamQuestion()` — renders current exam question
- `renderChapterSelect()` — renders chapter grid (splits regular vs enrichment)
- `assembleExamPaper(type)` — builds exam from chapters weighted by examWeight
- `showScreen(id)` — navigate between screens
- `_makeImgsZoomable(container)` — makes `<img>` AND `<svg>` elements zoomable via lightbox
- `openLightbox(src)` / `closeLightbox()` — lightbox for image zoom
- `speakQuestion(mode)` — text-to-speech for 'practice' or 'exam'
- `shareResult()` — Web Share API on exam results
- `setupPushNotifications(studentId)` — registers push subscription
- `_saveResume()` / `_doResume()` — session resume after page refresh

---

## Question file pattern
```js
'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-XXX', chapterId:'plants', difficulty:2,
    question:'Question text (innerHTML, so <b> and <img> tags work)',
    options:['A','B','C','D'], answer:'B',
    hint:'...', explanation:'...' })
);
```
- IDs: `[grade-abbrev][subject-abbrev]-[chapter-abbrev]-[3-digit-number]`
- difficulty: 1=Basic, 2=Medium, 3=Hard, 4=Challenge (word problems)
- Images: use `<img src="https://commons.wikimedia.org/wiki/Special:FilePath/Filename.jpg" style="max-height:220px;border-radius:8px">` — alt text must NEVER be the answer
- Inline SVG maps: embed directly in question string, click-to-zoom works automatically

## Enrichment chapters pattern
```js
// In _manifest.js:
{ id: 'g5enr-personalities', name: 'Key Historical Personalities', icon: '👤',
  enrichment: true, examWeight: 2,
  enrichmentNote: 'Derived from syllabus, NOT a direct MIE chapter.' }
```
- Marked `enrichment: true` so they get gold "✨ BONUS" badge in UI
- `examWeight: 2` means they appear in exams (0 = excluded)
- Guard comment in question files: `// @enrichment — DO NOT remove during syllabus audits`

## question_loader.js — LOCAL_FILES
For `file://` local dev, each subject has an explicit file list in `LOCAL_FILES`. When adding new question files, add them here too. Prod (Netlify) auto-discovers all files in `subjects/[id]/questions/`.

**Also bump `_CACHE_VERSION` in the same file.** Prod caches each subject's question JSON in `localStorage` for 7 days. Without a bump, a child keeps getting the old question set for up to a week after deploy — new chapters just do not appear, and nothing in the UI explains why. Bumping it also purges the previous version's cache entries.

---

## Subjects & chapters completed
All 15 subjects (grades 4/5/6 × 5 subjects each) are fully built with 19 questions per chapter.

### Enrichment chapters added (examWeight: 2):
- **Grade 4 History**: Famous Explorers, Know Your Mauritius, World at a Glance
- **Grade 5 History**: Key Historical Personalities (+ photo Qs), Mauritius Landmarks, Indian Ocean & Volcanoes
- **Grade 6 History**: Key Personalities (+ photo Qs: Ramgoolam, Jugnauth, d'Epinay), Symbols & Heritage, World Geography
- **Grade 4 Science**: Mauritius Animals (+ photo Qs), Science Equipment (+ photo Qs)
- **Grade 5 Science**: Endemic Species (+ photo Qs), Energy Sources (+ photo Qs)
- **Grade 6 Science**: Ecosystems in Pictures (+ photo Qs), Our Solar System (+ photo Qs)

### Illustrated questions added to regular chapters:
- **History G4-6**: ch03_voyages, ch04_port_louis, ch06_volcanism, ch02_independence, ch03_cultural_heritage — landmark & flag photos
- **Science G4-5**: ch02_plants, ch03_animals, ch06_electricity — diagrams via Wikimedia SVGs
- **English G4-6**: ch01_nouns, ch03_adjectives (G4), ch07_vocabulary (G5), ch06_vocabulary (G6) — instrument & object photos
- **French G4-6**: ch01_vocabulaire (G4+G5), ch06_lecture (G6) — picture-to-word vocab photos

### SVG Map added to Map Skills chapters (all grades):
- `ch06_g4_map_skills.js`, `ch08_g5_map_skills.js`, `ch07_g6_map_skills.js`
- Self-contained inline SVG: 4 rivers + 5 mountains + 4 towns + compass rose + Mauritius flag strips
- 6 map-reading questions per grade (18 total)

---

### Passages & Text Types chapters (English + French, all grades)
Real exam-style texts in the MIE text types, with the passage embedded in every
question (practice and exam both serve single questions at random, so there is
no shared-stem slot to hang it on).

| Grade | Chapter id | File | Text types |
|---|---|---|---|
| G4 Eng | `g4eng-passages` | `ch07_g4_passages.js` | story, poster/notice, postcard, recipe/instructions |
| G5 Eng | `eng-passages` | `ch09_passages.js` | email (From/To/Cc/Subject), informal letter, personal recount, advertisement, poem |
| G6 Eng | `g6eng-passages` | `ch07_g6_passages.js` | formal letter, newspaper report, advertisement + small print, legend (Pieter Both), factual report + data table |
| G4 Fr | `g4fr-textes` | `ch09_g4_textes.js` | récit, affiche, carte postale, recette |
| G5 Fr | `fr-textes` | `ch11_textes.js` | courriel, lettre amicale, récit personnel, annonce, poème |
| G6 Fr | `g6fr-textes` | `ch09_g6_textes.js` | lettre formelle, article de journal, dépliant touristique, légende, mode d'emploi |

Grounded in the MIE pupils' books: G5 English Units 1–3 teach postcard / email /
informal letter; G6 English Units 1–3 teach folktale, legend, formal letter and
poster; G6 French dossiers cover récit, descriptif, informatif, dialogue and
brochure. Passages are original prose in Mauritian settings — nothing is copied
out of a textbook.

Grade progression: G4 = literal retrieval + one inference; G5 = evidence,
simile/metaphor, bracketed conditions, deadlines; G6 = balance and bias in
reporting, unnamed sources, real cost behind an advertised price, moral of a
legend, reading a table against the prose.

### Description d'Images chapters (French, all grades)
Both PSAC formats: **one picture to describe**, and **three pictures telling a
story**. Sourced from the MIE G6 French « Je décris une image » task and the
picture-sequence writing in `Grade_5_French_40_Day_Practice_Workbook.pdf`.

| Grade | Chapter id | File | Scenes |
|---|---|---|---|
| G4 Fr | `g4fr-images` | `ch10_g4_images.js` | à la plage (1 image) · le ballon perdu (3 images) |
| G5 Fr | `fr-images` | `ch12_images.js` | au marché (1 image) · le chat dans le sac (3 images) |
| G6 Fr | `g6fr-images` | `ch10_g6_images.js` | journée de l'environnement (1 image) · l'oiseau blessé (3 images) |

The G5 and G6 sequences are the workbook's own Day 40 and Day 30 stories, so
practice here lines up with the paper exercises.

**Scenes are inline SVG, not photos.** Same reasoning as the maths diagrams: no
external image can 404, it works offline in the PWA, and the contents are known
exactly, so every question has a verifiable answer. Scenery is drawn from
rects/circles/polygons; people and objects are emoji in `<text>`. The `<title>`
is the generic "Image à décrire" — a descriptive title would leak the answers.

Skills covered, by grade: G4 lieu/temps/personnages/actions, prépositions de
lieu, connecteurs *D'abord–Ensuite–Enfin*, passé composé with *être*; G5 premier
plan / arrière-plan, *être en train de*, imparfait vs passé composé, inventing
dialogue; G6 champ lexical, discours indirect, *si + présent → futur*,
narrator's point of view, and the message the image argues for.

---

## Features built (this session)

### Bug fixes
- Cross-subject question contamination fixed (`startChapterDirect` now waits for QuestionLoader)
- `grade5-science` LOCAL_FILES cleaned (removed deleted ch01/ch07/ch08 that no longer exist)
- Circular French question fixed (g5fr-voc-002)

### UI/UX
- Single logout button in header (all modes)
- Admin Content tab reorganised by grade
- Image/SVG lightbox zoom (click any image or inline SVG to expand)
- Enrichment chapters: gold gradient cards with ✨ BONUS badge
- Chapter select splits regular vs enrichment sections

### Session resume
- Auto-saves practice/exam state to `localStorage` on every question render
- Blue "Resume where you left off" banner on dashboard after accidental refresh
- Exam: fully restores questions, answers, flagged, remaining time
- Practice: returns to same chapter
- Clears on normal completion/submission/back button

### Account sharing prevention
- Every fresh student PIN login bumps `session_version` in Supabase DB
- Background guard polls every 5 minutes; also fires immediately on `online` event
- If version mismatch detected → auto-logout with "account accessed on another device" message
- `pdSwitchStudent` (parent view) passes `bumpSession: false` — does NOT kick student

### PWA
- `manifest.json`, `sw.js` (service worker), `icons/icon.svg`, `icons/icon-192.png`, `icons/icon-512.png`
- Install button (`#pwa-install-btn`) in header — shows only when `beforeinstallprompt` fires (Android)
- iOS tip banner — fixed bottom bar on first visit, dismissed to localStorage, never shows if standalone

### Mobile features
- **Haptic feedback**: vibrate on correct (50ms), wrong (double-buzz), level-up (triple)
- **Screen wake lock**: prevents screen sleep during exam, releases on submit
- **Portrait lock**: locks orientation during exam, releases on submit
- **Text-to-speech**: 🔊 button on every question (practice + exam), tap again to stop
- **Share result**: 📤 button on exam results screen, uses Web Share API, falls back to clipboard

### Push notifications
- VAPID keys generated and stored (add to Netlify env vars — see below)
- `netlify/functions/push-subscribe.js` — saves subscription + reminder_time
- `netlify/functions/push-send.js` — sends push to student(s)
- `netlify/functions/push-reminders.js` — cron every 15 min, sends due reminders
- `sw.js` — handles `push` event + `notificationclick`
- Parent dashboard → Controls tab → "🔔 Daily Study Reminder" time picker
- Reminder stored in `push_subscriptions.reminder_time` as "HH:MM" in Mauritius time (UTC+4)
- `package.json` created with `web-push` dependency

### One-tap child login links
After creating a child, the parent gets a **📲 Send login** modal (WhatsApp /
native share / copy) carrying family name, username, an optional PIN, and a link
`?join=<token>` that signs the child straight in. The same button sits in the
child's detail panel for re-sends.

- **The link never contains the PIN.** A PIN does not expire and does not rotate,
  so a forwarded message or a screenshot would be a permanent key, and the
  anti-sharing `session_version` guard could never see it being used. The token
  is 32 random bytes, **single use**, **48 hours**, and only its SHA-256 is
  stored — same shape as `student_sessions`.
- `create_student_invite()` (owning parent or admin) replaces any unused link for
  that child, so only the most recent one works. `redeem_student_invite()` is
  callable by **anon** — the child is not signed in yet and the token *is* the
  credential — and returns exactly the payload `verify_student_pin` returns, so
  the client logs in through the unchanged path.
- Missing / used / expired all answer the same `invalid_link`, so nobody can
  probe which tokens ever existed.
- `Auth._tryJoinLink()` runs **before** every other routing decision in `init()`
  and signs out any parent session on that device first — the child may be
  tapping the link on the parent's phone. The token is stripped from the URL
  immediately.
- Re-sending from the detail panel offers no PIN: the parent's plaintext copy
  exists only at creation time, and the stored one is bcrypt. Forgotten PIN ⇒
  reset it in Controls.

### Referral system
- Every `profiles` row gets a unique `referral_code` (8-char, auto-generated). Deliberately separate from `families.family_code` — that one's a private "join my family" secret, this one is meant to be pasted into WhatsApp.
- Parent dashboard → "🎁 Invite Friends" button → modal with the code, a `?ref=CODE` link, WhatsApp share (`wa.me`), native Share (`navigator.share`, falls back to clipboard copy), and a live list of "Friends who joined" + total count.
- Flow: `Auth._captureReferralFromUrl()` reads `?ref=` on every page load (before routing), stores it in `localStorage`, strips it from the URL. `screen-family-setup` shows it in an editable "Referral code (optional)" field, pre-filled if one was captured. On `completeSetup()` / teacher bootstrap, `Store.recordReferral()` calls the `record_referral()` RPC once the new profile exists.
- `record_referral()` / `my_referrals()` are both `SECURITY DEFINER` (see `supabase-schema.sql`) so a referrer can see who they referred (name + join date only, never email) without widening `profiles`' `SELECT` RLS policy beyond "own row".
- `referrals.status` is `'joined'` for everyone today — the column already distinguishes `'joined'` from `'subscribed'` so a future reward (e.g. free tier months) can flip it without another migration, but nothing does yet.

### Parent Account & Settings page
Before this, the only settings a parent had were **per child** (Parent Dashboard →
tap a child → ⚙️ Controls). There was no account-level page at all: password,
invite and calendar were loose pills in the dashboard header, and theme was a
header toggle with no memory of intent.

`showProfile()` → `_renderParentProfile()` (`engine/app.js`) is now the single
**Account & Settings** page, reached from the ⚙️ Settings pill on the Parent
Dashboard (it replaced the 🔑 Password pill — password moved *into* the page)
and from the header profile chip. Sections:

| Section | What it does | Stored in |
|---|---|---|
| Profile | display name, email (read-only), role badge | `profiles.full_name` |
| Security | change password | Supabase auth |
| Family Login | edit the family name children type at login; shows the private family code | `families.family_name` |
| Appearance | Light / Dark / **System** | `localStorage.mm_theme_pref` + `profiles.preferences.theme` |
| Notifications | weekly progress email on/off; daily reminder time applied to **all** children at once | `profiles.preferences` + `push_subscriptions.reminder_time` |
| Defaults For All Children | difficulty cap, exam mode, cross-grade search/revision, hints — written to every child in one go | each child's `students.settings` + `profiles.preferences.child_defaults` |
| Referral | existing invite code card | — |
| Danger Zone | sign out; delete account (parent + family + all children) | `delete_my_account()` RPC |

Design notes worth keeping:
- **`profiles.preferences` is one jsonb blob**, fetched by `Store.getMyPreferences()`
  *separately* from `Store.getProfile()` — same rule as `referral_code`: the query
  that gates login must never reference a column a not-yet-migrated database
  might lack. Un-migrated DB ⇒ `{}` ⇒ every setting still renders and still works
  locally, it just doesn't follow to another device.
- **"System" theme** is a third state `applyTheme()` cannot hold (it only knows
  concrete `'light'`/`'dark'`), so it lives in its own key `mm_theme_pref` and is
  re-resolved through `matchMedia` on every OS flip. `mm_global_theme` still means
  exactly what it always did — the last concrete theme applied — so `_preferredTheme()`
  and the boot paint are unchanged. The header toggle now drops the device out of
  `'system'`, otherwise the next OS flip would silently undo a deliberate tap.
- **Applying defaults merges, never replaces**: `lockedChapters` is per-child and
  per-grade, so it is deliberately *not* one of the "apply to all" settings and must
  survive the write.
- **Two pre-existing bugs this surfaced and fixed.** A parent who taps a child's
  card gets that child loaded into `ACTIVE_STUDENT_ID` (`pdSwitchStudent`, so the
  Controls tab has something to read) while still being a signed-in parent. So
  (a) `showProfile()` keyed off `ACTIVE_STUDENT_ID` and showed the parent the
  *child's* profile, and (b) `applyTheme()` wrote the parent's theme choice into
  that child's saved progress. Both now go through `_isParentSession()`
  (`!!Auth.getParentProfile()`), which wins over the student id.
- `weekly-digest.js` skips parents with `preferences.weekly_digest === false`.
  A missing key, and a database where that `select` errors outright, both mean
  opted-in — i.e. exactly the behaviour the cron had before the setting existed.
  Its contents are now the last 7 days, not lifetime totals — see
  "Weekly digest" below.

### Parent dashboard: second pass
- **Controls no longer bounce you out.** Every toggle used to call
  `renderParentDashboard()`, which hides `pd-detail-panel` — so flipping one
  switch threw the parent back to the children grid and they had to tap in
  again. Toggles now call `PD.refreshControls()`, which repaints only the
  Controls tab, and `Auth._syncCachedSettings()` keeps the cached
  `_familyStudents[].settings` row in step with `DB.restrictions`.
- **Admin-disabled chapters vs parent locks.** `_adminBlocksChapter(id)` is the
  new distinction: `GLOBAL_SETTINGS.disabled_chapters` (admin kill switch) OR
  outside the plan tier's `allowed_chapters`. Those rows render unticked,
  `disabled`, with **🛡️ Unavailable** and no `onchange`; `toggleChapterLock`
  refuses them server-side of the DOM too, because a `disabled` attribute is one
  devtools edit from gone. **The enforcement that actually counts is in
  `netlify/functions/questions.js`** — it now filters `disabled_chapters` and
  `disabled_subjects` as well as the plan list, so those questions never leave
  the server and there is nothing to cheat with.
  - Two consequences worth remembering: the response now varies per caller, so
    `Cache-Control` drops from `public, s-maxage=86400` to `private, max-age=300`
    whenever a plan filter applies (a shared CDN copy would leak one family's
    chapter set to another). And `_CACHE_VERSION` in `question_loader.js` went
    8 → 9 to flush the 7-day localStorage copies of the old unfiltered payload.
  - Still client-side only: a parent's **own** `lockedChapters`. The parent is
    not the adversary there, and filtering per-child server-side would make the
    per-subject question cache per-child too.
- **Per-assignment hints.** `student_assignments.show_hints` alongside
  `show_answers`; the New Assignment form has an "Allow hints" checkbox, and the
  hint button is hidden for that run. NOT the same switch as
  `restrictions.hintsDisabled`, which governs the onboarding tip callouts.
  - `_practiceMode` is a one-shot module-level handover from
    `startAssignmentDirect` to `startChapterDirect`, consumed once and re-armed
    across the "questions not loaded yet" recursion. A parameter would have been
    cleaner, but `startChapterDirect(chapterId, forceDiff)` is called from inline
    `onclick`s and is effectively public API. Side effect: it also fixes
    `showAnswers:false` leaking from a finished assignment into ordinary practice.
- **"Are you a tutor?" is dismissable** — ✕ stores
  `psac_tutor_pitch_hidden_<userId>`. Only that unsolicited pitch; the
  pending/rejected/suspended cards report a real application state and stay.
- **Plans modal** (`#modal-plans`, `openPlansModal()`). Free-until-31-October-2026
  banner, plans from the `plans` table, and Juice / card payment rows that are
  visibly **disabled**. Nothing here calls a payment provider — when payment
  opens this is the single place to wire it up. `FREE_UNTIL_LABEL` in `app.js`
  is the one date string to change — `index.html` still carries the date in 8
  places for the first paint and for JS-off, but each is wrapped in
  `<span data-free-until>` and overwritten by `_applyFreeUntilLabel()` on every
  `showScreen`. Change the constant; the markup copies are only a fallback and
  are worth updating in the same commit so the two never disagree on screen
  before JS runs. Currently **30 September 2026**.
- **Header buttons** were six pill buttons in six pastel colours matching nothing
  else in the app. Now `.pd-action` (style.css): icon over label, one neutral
  surface, same shape language as `.nav-btn` in the student bottom bar. Colour is
  reserved for the primary action (Add child) and the privileged one (Admin).
  ⚠ `.pd-action.hidden { display: none }` is required — style.css loads after the
  Tailwind CDN, so a bare `display:flex` would outrank `.hidden` and reveal the
  Admin button to every parent.

### Soft delete
Nothing is destroyed any more. `profiles.deleted_at` and `students.deleted_at`,
plus a partial unique index `students_live_username_key ON (family_id, username)
WHERE deleted_at IS NULL`.

- **A child**: `soft_delete_student()` sets `deleted_at`, renames the username to
  `name.del.xxxxxxxx` so the family can recreate the same child by name straight
  away, and deletes their `student_sessions` (signed out everywhere).
- **A parent**: `delete_my_account()` does the same to the profile and every
  child under it. The **`auth.users` row is deliberately kept** — that is what
  makes restore possible and what makes signing up again with the same email land
  on "you already have an account" instead of quietly creating a second one.
- **Restore**: signing in to a closed account routes to `#screen-account-deleted`
  (checked via `Store.getAccountDeletedAt()`, separate from `getProfile()` for the
  usual un-migrated-database reason). `restore_my_account()` clears the flags and
  puts the usernames back, unless a new child has since taken the name.
- **Signing up with an existing email**: Supabase reports this either as an error
  or — with email-enumeration protection on — as a *success* carrying an empty
  `data.user.identities` array. Both are detected; showing "check your email"
  for either would leave the parent waiting for a message that never arrives.
- `Store.getFamilyStudents` / `loadAssignments` / `createAssignment` all retry
  with the older column list if the new column is missing, so an un-migrated
  database degrades instead of showing an empty dashboard.

#### Two ways a "duplicate child" appears — both fixed
Symptom: delete a child, recreate them with the same name, end up with two.
1. **The fallback was too broad.** `getFamilyStudents` retried on *any* error and
   dropped the `deleted_at IS NULL` filter to do it — so one transient failure
   returned the soft-deleted child alongside the recreated one. It now falls back
   **only** on a genuine missing-column error (42703 / PGRST204); anything else
   returns `[]` and logs. Deleted rows are also filtered client-side as a
   backstop.
2. **A silent no-op delete.** Under RLS a `DELETE` whose policy matches no row
   returns **no error and no rows** — and the old code read that as success. The
   child vanished from the screen, came back on the next reload, and if the
   parent had recreated them in between there were now two. The hard-delete
   fallback now uses `.delete().select('id')` and reports `not_deleted` when
   nothing changed; `soft_delete_student()` likewise returns `already_deleted`
   on a zero-row update.

Child cards and the detail header now show `Grade N · @username`. Two children
can legitimately share a display name, and the username is the only thing on the
card that tells them apart — it is also what the child types to log in.

### Syllabus screen: non-maths subjects
`renderSyllabus()` was written around `pack.syllabus[chapterId].subsections`, and
**only `grade5-maths` ever defined that**. Every other pack describes a chapter
as one prose paragraph in `chapter.syllabus`, and *enrichment* chapters carry
`chapter.enrichmentNote` instead — which nothing read at all. So in Grade 6
History & Geography the six ordinary chapters rendered as an unreadable wall of
prose and all three bonus chapters said **"No subsections defined yet."**

Now: `_syllabusPoints()` splits the prose into its sentences — which *are* the
sub-topics in these strings — and renders them as a bulleted list;
`enrichmentNote` is used as the body for bonus chapters, above a line explaining
what a bonus chapter is; the header carries a ✨ Bonus badge and a question
count.

#### Chapter content lives in FOUR different shapes — the screen read one
Audited across all 15 packs, 148 chapters. The screen only ever looked at the
first row, which is why so much of the app appeared to have no syllabus:

| Shape | Chapters | Subjects |
|---|---|---|
| `pack.syllabus[id].subsections` | 18 | **grade5-maths only** — the only pack with per-subsection Practise buttons |
| `chapter.syllabus` prose | 60 | History ×3, Science ×3, grade6-maths, grade4-maths |
| `chapter.notes` revision points | 55 | **English ×3, French ×3** (`notesBased: true` packs) |
| `chapter.enrichmentNote` | 15 | bonus chapters in History ×3, Science ×3 |

`renderSyllabus` now reads all four. The `notes` case was the big one: 55
English and French chapters had a completely blank syllabus screen while their
content sat in the manifest all along — `Calendar.showNotes()` had been
rendering it the whole time. `_notesToHtml()` uses the same `**bold**`/`*italic*`
subset as that function; keep the two in step.

Only **grade4-maths** (6 chapters) genuinely had nothing, and now has
`syllabus:` prose written from what its question files actually test.

Verified by rendering the syllabus screen for all 15 packs against their real
manifests: every one of the 148 chapters now shows content, and
"No subsections defined yet." appears nowhere.

#### Per-subsection "Practise →" — subject-by-subject rollout
A sub-topic row only gets its own Practise button and question count if the
questions carry `subsection:`. Two things must be added per subject: a
`SYLLABUS` map on the pack (`chapterId → { subsections: [{id, name}] }`) and the
matching tag on every question.

**COMPLETE — all 15 subjects, 5,428 questions, 100% tagged.** Every chapter in
the app now expands into named sub-topics with a live question count and its own
"Practise →" button.

| Subject | Questions | Subsections | | Subject | Questions | Subsections |
|---|---|---|---|---|---|---|
| grade4-maths | 186 | 36 | | grade4-history | 279 | 31 |
| grade5-maths | 1,023 | 76 | | grade5-history | 369 | 42 |
| grade6-maths | 432 | 68 | | grade6-history | 315 | 45 |
| grade4-english | 212 | 41 | | grade4-science | 286 | 43 |
| grade5-english | 269 | 48 | | grade5-science | 287 | 33 |
| grade6-english | 259 | 41 | | grade6-science | 305 | 45 |
| grade4-french | 355 | 54 | | | | |
| grade5-french | 415 | 60 | | | | |
| grade6-french | 436 | 49 | | | | |

**Two kinds of subject, two ways of deriving subsections.** Maths, English and
French chapters are *skills*, so the subsections are the skills and the rules
match how a question is phrased. History and Science chapters are *content*, so
the subsections come from the sub-topics the chapter's own prose `syllabus`
already names, and the rules are the distinctive nouns in them — no new
curriculum judgement was invented.

grade5-maths was a *backfill*: it already declared subsections but only 137 of
1,023 questions carried a tag, so most rows read "practice available" with no
count, four chapters declared subsections that had **no questions at all**
(`square_types`, `2d_shapes`, `3d_shapes`, `area/conversion`), and two tags in
use (`roman`, `rounding`) were **not declared**, hiding those questions from the
screen. Both directions are now reconciled and the invariant holds.

The tagging was done by script, not by hand: ordered keyword rules per chapter,
run against the *rendered* question text, with anything unmatched **reported and
the write refused** rather than given a default — a wrong tag is worse than no
tag, because it puts a question under a heading a child chose deliberately. The
rules went through four review passes against a printed listing of all 186
assignments. Traps found there, worth knowing before adapting this to English or
French:
- **Match the question text only, not the options.** Every triangle-naming
  question matched `/angle/` because "right-angled triangle" is an option, and
  the `shapes_2d` subsection came out completely empty.
- **Order is load-bearing.** `add_sub` has to precede `equivalent`, or
  "Calculate: 7/8 − 3/8 (Simplify if possible)" files under equivalent;
  `bar_chart` has to precede `tally`, or a bar chart titled "Class Survey" files
  under tally.
- **Watch short-word boundaries.** A bare `\bg\b` for grams matched the "g" in
  "e.g. 3.5" and filed a centimetres-to-metres conversion under mass.
- **SVG questions strip down to their title text**, so the chart title is the
  only thing left to match on.
- **Beware the "textbook" regex.** The standard Roman-numeral pattern
  `M{0,4}(CM|CD|D?C{0,3})…` matches the **empty string** — every group is
  optional — so it tagged 41 of 68 numeration questions as Roman numerals.
- **Comprehension questions embed the whole passage.** Match the task, not the
  stimulus: everything up to the last `<hr>` or `</div>` is the passage, and
  classifying on it put 24 of 31 grade-4 comprehension questions into the
  catch-all because the passage mentions fishermen, not "infer".
  **Text-type chapters (`*-passages`, `*-textes`) are the exception** — there the
  passage *is* the thing being classified, so they match on the full text.
- **Past-paper gap-fills** (`__________`) test whatever the gap needs, so no
  grammar rule describes them and they silently bulk out whichever bucket is
  last. They get their own `cloze` subsection: 25 of grade-6 vocabulary's 59.
- **Watch what the fall-through bucket is absorbing.** Grade-6 vocabulary put
  52 of 59 into `synonyms` until Latin/Greek roots, confusable pairs
  (stationary/stationery) and picture questions got rules of their own.
- **A substring can match the chapter's own name.** `/condition/` matches
  "**condition**nel", so that one rule tagged 27 of 35 conditional-tense
  questions as si-clauses. Anchor with `\b…\b` when the topic word is a stem of
  the grammar term.
- **French function words are everywhere.** A bare `\ble\b` swallowed 22 of 41
  noun questions ("la forme plurielle de *le* chat"), and `\bque\b` / `\bqui\b`
  took 33 of 39 subordinate-clause questions. For French, the pronoun has to be
  *named* (`pronom relatif`) or *quoted* (`"qui"`, `« que »`), never matched bare.
- **Stripping HTML also strips the evidence a question has a picture.**
  "Qu'est-ce qu'il fait ?" is unclassifiable as text but obvious as an image
  question, so the matcher prefixes `[IMG]` when the raw source contains
  `<img`/`<svg` — 16 of grade-6 French reading.
- ⚠ **The writer must accept both quote styles.** The French text-type files use
  ``id:`g4fr-txt-001` `` with backticks; a single-quote-only pattern skipped 119
  questions *while still reporting success*. Always reconcile "tags written"
  against a fresh coverage count — the write step is not self-verifying.
- **A missing `/i` is invisible.** The grade-6 numeration questions shout
  "EXPANDED NOTATION" in caps; the rule was written lower-case without `/i`, so
  it never fired and those questions fell through to place value.
- **`makeMatch` has no `question` field.** It *builds* the text from `leftItem`,
  so a harness stub that returns the object unchanged leaves those questions
  with empty text and unclassifiable. Any tooling that loads questions outside
  the browser has to reproduce what each factory actually returns.
- **Don't scope a rule on a generic instruction word.** "Work out:" appears on
  past-paper arithmetic (`Work out: 311 + 465`) as readily as on BODMAS
  questions, and put 23 of 49 plain sums under mixed operations.

Invariant worth keeping green: declared subsection ids and tagged subsection ids
must be identical per chapter — a declared id with no questions advertises a
topic that opens empty, and a tagged id that isn't declared hides those questions
from the screen entirely. The English maps are **generated from the tags** for
exactly this reason, so the two cannot disagree at birth.

⚠ Two engine bugs this work uncovered, both fixed:
- **`makeSymmetry` silently dropped `subsection`.** Every other factory
  destructures and returns it; that one did not, so a question could carry
  `subsection:'symmetry'` in its source and still arrive with it `undefined`.
  It exists in **four** copies — `engine/helpers.js`,
  `netlify/functions/questions.js`, `netlify/build-questions.js`,
  `netlify/lib/questions-sandbox.js` — and all four needed the same fix. Any
  change to a question factory has to be made in all four.
- ~~**`questions_extra.js` throws on every load**~~ — **FIXED**, see below.

### Dynamic generators (grade5-maths) — the only pack that has any
`GENERATORS` was never a global any file defined, so
`Object.assign(GENERATORS, …)` in `questions/questions_extra.js` threw a
ReferenceError on every load and the six generators below it had never run.

⚠ **A generator can only live in a `_manifest.js`.** In production the browser
fetches question files as JSON from `netlify/functions/questions` — nothing in a
`questions/*.js` file is ever executed as a script in the browser (only
`file://` local dev injects them as script tags). Manifests always are. So those
six generators could never have worked where they sat, error or no error: they
now live in `G5M_GENERATORS` alongside the original six, which brings the pack
from 6 working generators to 12.

Running them for the first time exposed three defects, all fixed:
- **`Date.now()` alone is not a unique id.** All 34 generator ids used it, so
  every call inside the same millisecond produced the same id — and
  `getMixedQuestions()` de-dupes by id, so a run of generated questions
  collapsed to one. Measured at **99% duplicates**. Now `genId(prefix)`, which
  appends a counter.
- **`average` returned answers like `25.333333333333332`.** `makeNums()`
  balanced the numbers to hit an exact mean, then — if the fix-up pushed the
  first number below 1 — *reset it to `avg`*, destroying the total it had just
  balanced. Correct arithmetic for the numbers shown, but an answer no child can
  type, and the only way to get it right was to be wrong. This generator has
  been live all along, so this was a real bug in the app, not just in dead code.
- **`average` L3 gave up 48% of the time**, returning `null` when its random
  known-numbers draw left an implausible missing value — and a `null` makes
  `getQuestionsForChapter` stop padding. It now retries, with a deterministic
  fallback.
- Also: the isosceles generator drew an odd top angle half the time, giving base
  angles like 79.5°.

Verified by running all 12 generators 800× per difficulty and asserting the
answer is present and whole, MCQ answers are among 4 distinct options,
`chapterId`/`difficulty` match what was asked, and no `NaN`/`undefined` reaches
the text — then exercising the real `getQuestionsForChapter` /
`getMixedQuestions` path with an empty static pool, so every question had to
come from a generator.

### Past Papers screen (`#screen-past-papers`)
162 real PSAC questions, 2016–2024, reachable from the Syllabus browser. They
live in the same `past_paper_*.js` files as the practice MCQs but push to
`window.PSAC_PDF_QUESTIONS`, and until now **nothing read them**.

**These are TRANSCRIPTIONS, not extractions.** Nobody parsed a PDF: someone read
the real papers and typed out the question text, the marks, and a *description*
of any diagram. The source PSAC papers have never been in this repo (git history
across all commits holds four workbook PDFs and no past papers). So the artwork
was never lost — it was never captured, and it cannot be recovered from here.
Getting it means either sourcing the papers from MES/MIE (with the copyright
question that raises) or redrawing from the descriptions, which are good enough
to draw from and which this project already does well in inline SVG.

**63 of the 162 refer to artwork that does not exist** — "Study Map 2 … name the
feature shown by diagonal shading", with no Map 2. They carry
`needsArtwork: true` in the source and the screen does not show them; a footer
line says how many are hidden so they are hidden, not lost. That flag is written
into the data on purpose rather than re-derived from a regex at runtime: a regex
gets it wrong both ways — "complete the table" is a table the child *draws*
(self-contained), while "which of the four clock faces shown" needs artwork and
never says "diagram".

**They have no `answer` — none of the 162.** They are written, drawn, matched
and labelled responses carrying a mark allocation (23 different `type` values).
An optional `markScheme` field powers a "Show mark scheme" reveal for
self-marking; exactly one entry has one so far (`g5h-pp20-pdf-003`, whose part
(b) arrived with its matching pairs already matched — its own answer printed in
the prompt). The mechanism is there for the rest.
So the screen is deliberately read-only: no input, no button, no score, and a
banner saying the app cannot mark them and the child should write on paper. An
item with no answer must never reach code that expects to grade one, which is
why they ship in their own `past-papers.json` bundle and are **never** pushed
into `STATIC_QUESTIONS`.

Path: `build-questions.js` collects them into `past-papers.json` →
`questions.js?papers=1[&grade=N]` serves it (through the function, so it
inherits the same auth) → `QuestionLoader.loadPastPapers(grade)` →
`renderPastPapers()`, grouped by subject, filtered by year, newest first.

⚠ **Two production bugs this uncovered, both fixed.** The server-side sandboxes
defined `STATIC_QUESTIONS` as a `{ push }` stub with no other array methods:
- Every file that used `window` threw and was **skipped entirely** — 39 files,
  losing the practice MCQs inside them as well as the past-paper items.
- `grade5-maths/questions_audit.js` iterates `STATIC_QUESTIONS` to demote
  misclassified L4 questions and then adds 18 genuine L4 word problems. It threw
  on `.forEach` and was skipped, so **the shipped bundle had 1,005 questions
  instead of 1,023** and none of the difficulty corrections. The stub is now the
  real array with a flattening `push`, in all three copies
  (`build-questions.js`, `functions/questions.js`, `lib/questions-sandbox.js`).
  The build now skips **nothing**.

Any file that READS the pool it is adding to needs a real array, not a sink.

⚠ `_syllabusPoints` uses `.match(/[^.!?]+[.!?]*/g)`, **not** a lookbehind split.
A lookbehind regex is a *parse* error on Safari before 16.4 — it would take the
whole of `app.js` down, not just this screen.

Part 5 of `supabase-migration.sql` carries the commented diagnostic queries for
inspecting duplicates directly. Deliberately not executable: which row to keep
depends on whose progress matters.

---

## Database files
⚠ **This section was headed "only two, since 2026-08-26" long after that stopped
being true** — there are eleven `supabase-*.sql` files in the repo today. The
consolidation described below did happen; files have simply been added since,
one per change, and the heading was not kept in step. `ls supabase-*.sql` is the
authority, not this table.

The original 24 incremental files were removed on 2026-08-26. They had all been
applied, several had been superseded by later ones, and a live audit found the
deployed schema differed from what they claimed in three places — so they were
actively misleading about what was running.

The ones that still matter:

| File | What it is |
|---|---|
| `supabase-indexes.sql` | Indexes for columns the app filters on but Postgres scans. No data or behaviour change. Idempotent. Found by the 2026-08-30 live audit. |
| `supabase-forum-author.sql` | **Run this first.** Server half of the forum impersonation fix — a trigger that derives `author_name`/`author_type` from the caller's session instead of trusting the browser. Independent of every other file. Idempotent. |
| `supabase-forum-adults.sql` | Restricts the community forum to signed-in adults. Reads were `USING (true)` — open to anyone with the anon key. Idempotent. |
| `supabase-credits-shop.sql` | Referral credits, the chapter shop, and the privilege-escalation fix. Idempotent. |
| `supabase-grades-1-9.sql` | Opens `classrooms.grade_level` from `ARRAY[4,5,6]` to `BETWEEN 1 AND 9`. The ONLY database change grades 1-9 needs. Idempotent. |
| `supabase-migration.sql` | Idempotent; re-running changes nothing. Parts 1–4 run unattended, Part 5 is destructive/disruptive and stays commented out. |
| `supabase-schema.sql` | Generated dump of the live schema — tables, constraints, indexes, RLS policies, functions, grants. For rebuilding a fresh project and for answering "what is actually deployed?". Not for running against production. |

Regenerate the dump with `pg_get_functiondef` / `pg_indexes` / `pg_policies` via
the Supabase management API, not by hand. Both files were validated by executing
them against the live database inside a rolled-back transaction.

⚠ **`public.students` has COLUMN-LEVEL SELECT grants**, not a table-wide one, so
that `pin`, `pin_hash`, `pin_attempts` and `pin_locked_until` stay unreadable.
**Any column added to `students` later inherits no grant** and is as unreadable
as the PIN: every query selecting or filtering on it fails with
`42501 permission denied for table students` — a message that never names the
column — and the client turns that into an empty result. This is exactly how
adding `deleted_at` made the parent dashboard show zero children. Put a
`GRANT SELECT (col)` beside every `ALTER TABLE students ADD COLUMN`.

## Parent Reports (2026-08-30) — the app had no dated data at all
The parent dashboard could say *"412 questions at 62%"* and nothing else. Every
number in it — `stats`, `chapters[id].attempted/correct` — is a **cumulative
total**, so no screen could answer the three questions a parent actually asks:
*is she improving?*, *did she study this week?*, *what is she getting wrong?*
`examHistory` was the only dated series in the whole app, and it was unreadable
(see the date bug below).

### Two new keys in the progress blob
Both in `Store._defaultStudent()`, so `loadStudentProgress()`'s key-merge
backfills every existing child for free. Deliberately in the jsonb rather than a
new table: no migration, and **no new column-level `GRANT` to forget** — the
`students` grant trap in this file is exactly how `deleted_at` once emptied the
parent dashboard.

| Key | Shape | Written by | Bound |
|---|---|---|---|
| `daily` | `{ 'YYYY-MM-DD': { a, c, e } }` | `_recordDaily()` from `recordAnswer()`; `e` from `submitExam()` | `_DAILY_KEEP` = 120 days |
| `mistakes` | newest-first array | `_recordMistake()` from `_logPracticeAnswer()` and `submitExam()` | `_MISTAKE_KEEP` = 60 |

- Keys are **Mauritius** day keys (`_muDayKey`), never the device clock — same
  rule as `usage`. A child who changes the timezone would otherwise rewrite
  their own history, and the parent's week-on-week comparison with it.
- `YYYY-MM-DD` is chosen so a lexicographic sort **is** chronological; the prune
  in `_dayBucket()` relies on that.
- `_recordDaily()` runs **before** the `ASSIGNMENT_MODE` early return in
  `recordAnswer()` — parent-set assignment work is the activity a parent most
  wants to see. That branch now also calls `save()`, which it never did: it used
  to touch only in-memory `ASSIGNMENT_SCORE`, so returning without saving was
  correct then and would have silently discarded a whole assignment's activity now.
- **Skips are not mistakes.** A skipped question means she ran out of ideas or
  patience; mixing those in would drown the answers she actually got wrong,
  which are the teachable ones.
- Mistake question text is run through `_plainText()` (detached node,
  `textContent`) and capped at 160 chars. Question text is `innerHTML` by design
  and can carry a whole inline SVG map or an embedded comprehension passage —
  storing that verbatim on every wrong answer would add kilobytes at a time.
  A regex over tags is not enough; the SVGs defeat it.

### The Reports tab (`PD.pdTab('reports')` → `_renderReports()`)
Rendered lazily on tab click, like `assign` and `login`. Read-only over the
blob, so it works offline and makes no extra network call.

- **Last 7 days vs the 7 before** — questions, accuracy, days active, exams,
  each with a direction. **Rolling windows, not calendar weeks**: on a Monday a
  calendar week holds one day, and "questions down 95%" would be an artefact of
  the day it is rather than anything the child did. A previous window of zero
  renders "new", never a triumphant +100%.
- **Plain-sentence headline** — a parent who reads nothing else should still
  learn whether the week went well. A 10-point accuracy drop is reported as
  *"often a sign she has moved on to harder chapters"*, because it usually is.
- **30-day strip** — bar height is volume, colour is accuracy. Height has an 8%
  floor so a 2-question day still reads as a day she showed up.
- **8-week accuracy trend** — solid line across consecutive active weeks, faint
  dashed spine across the whole series. Solid-only was tried first and was
  wrong: one silent week between two active ones left every run a single point
  long and **drew no line at all**. The two-line split keeps the gap visible
  without claiming an improvement she was not there to make.
- **Subjects, weakest first** — that ordering is the point; the parent is here
  to find what to act on. A chapter with no attempts is reported as *not
  started*, never as 0% — a gap and a weakness are different things to be told.
- **Recent mistakes** — the real questions, her answer and the right one.
  `_repShowAllMistakes` is module-level and reset **in `_renderReports()`**, not
  in the toggle — same rule as `_examReviewWrongOnly`, or the next child's panel
  opens expanded.
- **Share summary** — plain text via `navigator.share` / clipboard, for pasting
  to a tutor. Same pattern as `shareResult()`.
- ⚠ Everything user-supplied goes through `_attr()`. Mistake rows carry the
  child's own typed answer and question text.

### Three bugs this uncovered, all fixed
- ⚠ **`examHistory.date` was write-only.** It stored `toLocaleDateString()` and
  `_renderExamTimeline` read it back with `new Date(e.date)`. On any `en-GB`
  browser that is `"30/08/2026"` → **Invalid Date**, so the parent's exam chips
  printed "Invalid Date" on exactly the devices this app targets (verified: the
  default locale on the dev machine is `en-GB`). Rows now also carry `iso`;
  `_repExamDate()` prefers it and shows a legacy string as-is rather than
  round-tripping it through `Date`.
- ⚠ **`PD.selectChild` never awaited `Auth.pdSwitchStudent`**, which is `async`
  and loads that child's blob into the global `DB` — and nothing re-rendered the
  panel when it landed. A parent who tapped child A, went back, then tapped
  child B saw **A's questions, accuracy, streak and weak chapters under B's
  name**. Now awaited, with an `_activeId !== id` guard so a fast second tap
  wins; the name and avatar still paint immediately from the cached family row.
- ⚠ **Never build a regex through a shell heredoc into a JS template literal.**
  `\s` arrived in the source as `s`, so `_plainText`'s whitespace collapse
  became `/s+/g` and deleted the letter **s** from every recorded mistake
  ("symmetry" → " ymmetry"). Silent, plausible-looking output; only caught
  because the test asserted the exact string.

### Family overview — the one view that reads every child at once
Everything else in the app holds exactly **one** child: the global `DB`, the
detail panel, the Reports tab. So "how is the household doing" had nowhere to
live. `_renderFamilyOverview()` renders into `#pd-family-overview`, above the
children grid, from **two children up** — with one child it would restate the
Reports tab directly below it.

- **`Store.loadFamilyProgress(ids)`** — one query for every child instead of N.
  RLS does the limiting (`progress_rw` passes a row on
  `owns_student_txt(student_id)`), so the id list is a convenience, not the
  security boundary. It returns `{}` on error rather than a partial result,
  precisely so the caller can tell a failure from an all-children-are-new family
  and fall back to the old per-child path instead of painting every card empty.
  **The children grid now reads the same result**, so the two views cannot
  disagree about a child's numbers — they are the same objects.
- `_repWindow()` grew a third argument. Only one child's blob is ever in the
  global `DB`, so anything comparing children must pass that child's `daily` map
  explicitly; it still defaults to `DB.daily` for the single-child callers.
- **Family stat row** — questions, family accuracy, how many children practised,
  and *days covered* (days on which **any** child did something, which is not the
  same as any one child's day count).
- **Quiet-child alert**, at the same 3-day threshold the child card already uses
  for its "⚠️ Last active Nd ago" pill, so the two never disagree on one screen.
- **Per-child row** — a 14-day activity strip, then questions / accuracy / days /
  streak / direction for the last 7. Tapping a row opens that child's dashboard.
- ⚠ **Ordered by who has been quietest, never by score.** Ranking siblings
  against each other is the wrong thing to put in a parent's hands, and across
  grades an accuracy comparison is not even meaningful — the caption says so.
  Ties (children who all practised today) break on who did **less** this week, so
  the ordering keeps meaning something instead of falling back to creation order.
- Days-since-last-activity is derived from `daily`, not `stats.lastDate`:
  `lastDate` is a `toDateString()` written on the device clock, and this table
  sits next to Mauritius-keyed numbers.

#### The row is a grid, and the columns are fixed on purpose
⚠ **`.fam-head` and `.fam-row` are separate grids, so `auto` columns cannot
align.** Each grid sizes its own content — "Streak" is wider than "12🔥", "Acc"
narrower than "72%" — and the header sat off by a few pixels from every row.
Measured misaligned at all ten widths. The template is now explicit rem widths,
shared by header and rows, so they agree by construction. The strip column is 14
cells × 3px + 13 gaps × 1px = 55px, hence `3.5rem`. **Header labels have to stay
short**: a fixed column does not widen for a longer word, it overflows.

⚠ **An inline `style="display:flex"` on the header's strip cell silently beat the
mobile `display:none`**, leaving the header one column wider than every row
beneath it. The inline style is gone and the rule is `!important` so it cannot
happen again. Below 560px the strip, streak and trend columns drop — eight
columns do not fit a phone, and squeezing them is what broke the bottom bar and
the tab bar before it.

Measured in headless Chrome at 320–1440 against the **real** rendered markup and
the real `style.css`: header and rows aligned at every width, no row or page
overflow, and a 24-character name truncates on phones instead of pushing the
numbers out.

### Weekly digest — it was labelled weekly and was not
`weekly-digest.js` was headed **"Weekly Progress Report"** and said *"how your
children performed this week"*, but every figure in it — XP, questions,
accuracy, streak — was a **lifetime cumulative total**. A child who had not
opened the app in a month still showed 400 questions at 62%, and the parent read
that as a good week. Not stale data: a wrong claim, every Sunday.

Now genuinely the last seven days, from `data.daily`:

- Per child: questions, accuracy, days practised, each with a ▲▼ against the
  seven days before; streak stays, correctly labelled as a current run.
- A family line above the table: questions (vs last week), family accuracy, how
  many children practised, days on which **anyone** revised, exams taken.
- A quiet-child callout, and the row tinted amber, at the same 3-day threshold
  the child card and the family overview already use.
- A footnote saying exactly which window each column covers, and that accuracy
  is not comparable across grades.
- XP and level are gone from the table. They are lifetime figures and there was
  no honest way to put them under a weekly heading.

⚠ **A false "everyone has stopped working" alarm, caught before it shipped.**
The quiet test was `quietFor === null || quietFor >= 3`, and a child with no
dated history yet has `quietFor === null`. On the **first digest after this
deploys** — when no child has any `daily` data — that told every parent that
**every** child had stopped practising, and tinted every row amber, for children
revising daily. Both the callout and the tint now require `hasDated` first: no
dated history means *unknown*, not *idle*.

Other fixes made in passing:
- **One query for the family's progress**, not one per child.
- `display:flex` on the accuracy bar → `inline-block`. Outlook's Word renderer
  drops flex, so the bar was collapsing to nothing in a large share of inboxes.
- Child display names were interpolated **raw** into the email; now escaped.
- The date line said "Week ending 30 August" with **no year**, and was formatted
  off the Lambda's own UTC clock. It is now the real range on the Mauritius
  clock — "24 – 30 August 2026", or "27 August – 2 September 2026" across a
  month boundary — and the year is back in the subject.

⚠ The MU day-key helpers are **duplicated** from `engine/app.js` (Lambda vs
browser, no shared module — same standing duplication as `REWARD_SLOTS` in
`functions/questions.js`). If the day-key scheme changes, both must change
together, or the email and the in-app Reports tab will quietly disagree about
what "this week" means — and a parent *will* compare them.

Verified by running the real handler against a stubbed `fetch` (28 assertions:
weekly-not-lifetime arithmetic, the batched query, the transition week, opt-out,
escaping, a child with no progress row at all), then rendering the produced email
in headless Chrome at 360/400/600px — well-formed table, header and body columns
matching, bars drawn, no overflow.

### Calendar: what was planned vs what actually happened
The calendar showed only the **plan** — parent-authored rows in
`schedule_entries`. Whether any of it got done lived somewhere else entirely, so
the one screen built around dates could not answer the question dates are for.

`_loadActivity()` now derives a second layer from history the app already keeps.
**Nothing new is stored**, and nothing is written into `schedule_entries`:

| Layer | Source | Row reads |
|---|---|---|
| practice | `daily[date].ch` → `{ chapterId: [attempted, correct] }` | ✅ Fractions · 15 questions · 80% |
| exam | `examHistory[].iso` | 🏁 Full Mock Exam · 72% · 29/40 |
| assignment | `student_assignments.completed_at` | 📋 Fractions · the parent's note |

- ⚠ **Activity rows are derived history, not plan rows, and carry no edit or
  delete button.** They are deliberately not written into `schedule_entries`:
  that table is parent-editable, so storing actuals there would let a parent
  edit or delete "she sat a mock on Tuesday" — meaningless, and a way to lose
  the record silently.
- In the day modal the actuals come **first**. A parent opening a past day wants
  to know whether the work happened, not to re-read what was scheduled.
- In the month grid, **solid dot = done, hollow ring = planned**. There is no
  room for a legend on a 52px square, and "was this actually done" is what the
  month view gets scanned for. Capped at four with a `+N`, or a busy day grows
  taller than its neighbours and the month stops reading as a grid.

#### Attribution — the same work was about to be counted twice
Exam and assignment answers both flow through `recordAnswer()`, so they were
landing in `daily[date].ch` alongside ordinary practice. A 40-question mock would
have drawn **five "practised X" rows plus an exam row** for one sitting.
`recordAnswer(chapterId, correct, source)` now passes `'exam'`, and
`_recordDaily` skips the per-chapter map for exams and for `ASSIGNMENT_MODE` —
each of those already has a row of its own from a dated source.

The day **totals** (`a` / `c`) still count every answer whatever its source:
those mean "how much did she do today", and an exam is emphatically doing
something. Only the per-chapter breakdown is attributed. Chapter mastery
(`DB.chapters`) is untouched — exam answers still count there, as they always did.

#### Filters
Four toggles above the grid — Planned / Practice / Exams / Assignments — in
`localStorage` under `mm_cal_filters`, so the choice survives a reload. Stored
per browser rather than per child: a parent who switches the plan off to read the
actuals means that for the calendar, not for one child.
- ⚠ **OFF is the styled state, not ON.** Every layer is on by default, so if the
  chips rendered as filled "selected" buttons the whole bar would read as a set
  of pressed toggles on first sight. The muted, hollow-dot chip is the one
  hiding something.
- With everything filtered out a day says *"Nothing on this day in the layers you
  have showing"*, not "No events" — otherwise the filter looks like data loss.
- The day modal repaints on toggle if it is open; leaving it stale reads as the
  filter not working.

Measured at 320–1024: all four chips reachable, no label spill, no page
overflow. Two rows on a phone, one from 640px up.

#### ⚠ A completed assignment was invisible — two separate causes
Reported from real use: a child finished an assignment, the parent opened the
calendar the same day, and there was nothing there. Both assignment flows were
broken, in different ways.

**`completed_at` was almost never written.** `Store.completeAssignment()` had
exactly ONE caller — `_markAssignmentDone()`, the parent's manual "✓ Done"
button in their own list. **Finishing the actual questions never marked the
assignment complete**, in either flow. So the calendar's assignment source, and
the parent's "is it done yet" status, both depended on the parent ticking a box
by hand about work they could not see had happened.

**And the practice fallback had been removed.** `_recordDaily()` returned early
for `ASSIGNMENT_MODE` on the assumption that `completed_at` would supply the row
instead. With completion never written, teacher/guest assignment work produced
**no record at all** — not a completion row, not a chapter row. The day totals
still counted the questions, so the Reports tab and the 30-day strip showed the
work; only the calendar, where a parent goes to ask "what did she do today",
showed nothing.

⚠ **There are two assignment flows and they behave differently.** A PARENT
assignment goes through `startAssignmentDirect()`, which deliberately never sets
`ASSIGNMENT_MODE` — it hands `startChapterDirect()` a one-shot `_practiceMode`.
So parent-assigned work was recorded as *ordinary practice*, indistinguishable
on the calendar from a chapter the child chose themselves. The teacher/guest
flow sets `ASSIGNMENT_MODE` and was recorded not at all. `_assignmentActive` is
the flag that is true for **both**, and is what the fix keys on.

**The fix, in three parts:**
1. `daily[date].asg` — a second per-chapter map beside `ch`, written whenever
   `_assignmentActive || ASSIGNMENT_MODE`. Assignment work is now recorded and
   *labelled*, whichever flow produced it, whether or not it is ever marked
   complete, and offline.
2. `startAssignmentDirect()` takes a trailing `assignmentId` (trailing, because
   it is called from an inline `onclick` and its existing signature is
   effectively public API), stashed in `_activeAssignmentId`.
   `_finishAssignmentIfAny()` writes `completed_at` when the round ends —
   from `_showRoundComplete()` for the parent flow and
   `showAssignmentComplete()` for the teacher/guest one, which are genuinely
   different exit points. Fire-and-forget: a child must never be blocked from
   seeing their score because a status write did not land.
3. The calendar reads both buckets and **dedupes** — a local `asg` entry and a
   server `completed_at` row for the same chapter and day are the same sitting,
   so the server row wins (it carries the parent's note) and the local one is
   dropped. A local row with no server twin still shows: that is the case this
   whole fix exists for.

Exam answers still write to neither bucket — `examHistory` gives them their own
row — and still count in the day total and toward chapter mastery. Both buckets
are independently capped at `_DAY_CH_KEEP`.

Verified by driving the real recording code and the real calendar through the
reported scenario: 19 assertions, including that a completed assignment with no
`completed_at` row is now visible, that it is labelled as an assignment rather
than practice, that a completed one is not listed twice, and that a local row
for a different chapter survives the dedupe.

#### The child's half — a recap, not an audit
The same activity layer reaches `#screen-schedule` ("My timetable"), but framed
for the person reading it. A parent gets filters and a month grid to audit with;
a child gets **"✅ What you have done"** — the last 14 days, newest first,
grouped by day, above a one-line tally ("3 days of work · 47 questions").

Two deliberate differences from the parent view, both load-bearing:

- ⚠ **`getRecentActivity()` returns activity UNFILTERED.** `_filters` is the
  parent's auditing choice and lives in `localStorage` per **browser** — on a
  shared phone, a parent who hid exams to read something would otherwise
  silently blank a chunk of the child's own record of their work.
- ⚠ **There is no "missed sessions" counterpart, and there must not be.** On a
  parent's calendar an unticked plan row is information. On a child's own screen
  it is a list of their failures, served every time they open it. The plan they
  can still act on is what `getUpcoming()` already shows; the recap shows only
  what they did.

`renderMyActivity()` is called on **both** exits of `renderSchedule()`, and the
container sits **outside** `#schedule-body` — that element is overwritten whole,
including on the empty-timetable path, and a child with no timetable at all is
exactly the one who most needs to see that they have been working.

#### Today's plan now ticks off what is already done
A scheduled chapter the child has already practised today renders as a green
**✅ Done today** card instead of still nagging them to start it. If history
cannot be read the plan renders exactly as before — a failed lookup must never
cost a child their timetable.

⚠ **This uncovered a pre-existing bug: `chapter_id` was never selected.** It has
been a column on `schedule_entries` since the table was created, but all four
`.select()` calls omitted it, so `renderTodayPlan` interpolated the string
`"undefined"` into its buttons — `Calendar.startPractice(subject, 'undefined')`
and `showNotes(subject, 'undefined')`. The `getUpcoming` path hid this because
`_resolveChapter()` matches on the display label instead; the dashboard's Today
plan had no such fallback and silently degraded to a generic "pick a chapter"
toast. All four selects now fetch it — **including the insert and update that
return the saved row straight into `_entries`**, or a freshly-saved entry would
lack a column that a reloaded one has. Rows written before it was populated
still fall back to label matching.

#### Timetable generator: second pass (2026-08-30)
`showGenModal()` / `generateTimetable()` in `engine/calendar.js`. The form used
to be start date + weeks + hours; it now reads everything through one
`_genReadForm()` — every number is **clamped there**, because the `<input max>`
attributes are advisory and a typed `1e9` used to reach `Array(...).fill()`.

| Option | Field | Effect |
|---|---|---|
| End date | `gen-end-date` | Synced both ways with weeks (`genSyncFromWeeks` / `genSyncFromEnd`); end is **inclusive**, partial weeks round up, cap `_GEN_MAX_WEEKS` = 26 |
| Until exam | `gen-until-exam` | Shown only when a future `entry_type:'exam'` exists; sets end = day before it |
| Stay on a subject for | `gen-block` (single mode) | N consecutive study days per subject before rotating |
| Subjects per day | `gen-perday` (mixed mode) | 2 / 3 / all, drawn from the weighted rotation without repeats within a day |
| Max study time per day | `gen-maxday` | Over the cap, every subject that day is scaled down **in proportion**, never dropped |
| Session length | `gen-session` | Minutes per chapter visit (was a hard-coded 30) |
| Choose chapters by | `gen-focus` | `weak` (old behaviour) · `balanced` · `order` (syllabus order, no weighting) |
| Include bonus chapters | `gen-bonus` | Off ⇒ enrichment chapters skipped, unless a subject has nothing else |

Days are **assigned first, then minutes** (`_genAssignDays` → `_genMinutes`):
a subject's weekly hours are spread over the days it actually got, not over an
estimate from the weights — the old estimate drifted whenever rounding did not
land exactly. `genPreview()` runs the same two functions on every input and
prints study days / avg minutes / session count, plus a warning when the daily
cap trims the requested hours or a subject gets no day at all.

Verified with 13 scenarios driving the real `Calendar` in a `vm` with a fake
DOM and stubbed Supabase: weeks↔end-date sync, block=3 gives three consecutive
days then switches, weekly hours honoured within 20% in block mode, end date
overrides weeks, the daily cap holds, mixed/2-per-day yields exactly two
subjects a day, session length bounds every row, bonus toggle, syllabus order
starts at chapter 0, and `weeks=999` / `hours=1e9` produce a bounded plan.

#### Two traps worth remembering
- ⚠ **`engine/calendar.js` is CRLF; `engine/app.js` is LF.** The repo is mixed
  (`style.css` and `weekly-digest.js` are CRLF too). A multi-line search string
  written with `\n` matches **nothing** in a CRLF file and reports "anchor not
  found" as though the code had changed. Normalise in memory and restore the
  file's own convention on write — never convert the whole file as a side effect.
- **Legacy `examHistory` rows have no `iso`**, only an unparseable `en-GB` date
  string. Those get **no** calendar square rather than a guessed one: a mock
  shown on the wrong day is worse than one not shown.
- An activity timestamp is keyed with the **local** date, not the Mauritius day
  key used everywhere else — the grid is built from `new Date(y, m, d)`, so an
  evening session would otherwise land on the wrong square. This is the one
  deliberate exception to the MU-key rule, and it is correct: the squares are
  local dates.

### The tab bar had to change shape
A fifth tab does not fit. Five `flex-1` tabs at 360px give each ~64px while
"Assignments" needs ~130px, and the label spills out of the button on both
sides — the identical failure `.nav-btn` had in the student bottom bar.
`.pd-tabbar` (style.css) is `flex-wrap: wrap` with **`flex: 1 0 auto`**;
`flex-shrink` must stay `0`. A horizontal scroller was tried first and measured
worse: it fits, but hides 2 of 5 tabs off the right edge at every phone width,
so a parent might never find the Reports tab — which would defeat the feature.

Measured in headless Chrome over CDP at 320/360/390/412/428/640/768/820/1024/
1440: **all 5 tabs reachable, 0px label spill, no page-level overflow at every
width.** 3 rows at 320px, 2 rows from 360–428, 1 row from 640 up.

⚠ `SHELL_VERSION` v17 → v18. `app.js` is cache-first in the SW shell; without
the bump no returning parent receives any of this.

---

## Security fixes (2026-08-30) — identity was assertable by the client
Five findings from a code review, all closed. The theme in four of the five: the
server accepted the caller's own claim about who they were.

### `netlify/lib/student-auth.js` — the new credential check
A child has no Supabase JWT. They sign in with a PIN and get an opaque session
token, stored SHA-256-hashed in `student_sessions` with an expiry, and that is
what RLS resolves through `current_student_id()`. It is the only thing in the
system that proves "I am this student".

`resolveStudent(headers)` does in a Lambda exactly what `current_student_id()`
does in Postgres: same header, same sha256 hex digest, same `expires_at > now()`.
⚠ **Duplicated logic — if the token scheme changes, both must change.**

- Lookup is **by hash**, so the plaintext token never enters a URL or a request log.
- Missing / expired / revoked all answer the same `401`, so nobody can probe
  which tokens ever existed.
- ⚠ **Fails closed with no service key.** The old student check treated a missing
  key as "skip the check", turning one configuration mistake into an open endpoint.

### 1. `notify.js` — the auth check was a tautology
```js
const headerStudentId = event.headers['x-student-id'];
if (!headerStudentId || headerStudentId !== studentId) return { statusCode: 403 };
```
It compared a client-supplied **header** with a client-supplied **body field**.
Setting both to the same value passed, so anyone could trigger email to any
family's parent with an attacker-chosen assignment label and score. The student
is now resolved from the session token and **the body's `studentId` is ignored
entirely** — there is nothing left to assert.

### 2. `questions.js` — a UUID was treated as a credential
It accepted `X-Student-Id` and checked only that the id **existed** in
`students`. Existence is not proof of possession: a student UUID is a permanent
identifier in client state, never rotated, shared across every device that child
uses. Whoever held one could pull that child's plan-gated and reward-gated
question set — the enforcement this file exists to provide.

Now `X-Student-Token`, resolved through the helper. The auth cache is keyed on
the **token**, not the student id, so revoking a session (logout-everywhere, or
the anti-sharing `session_version` bump) stops working within the cache TTL
rather than never — the same property the JWT branch already had. A 503 "cannot
check right now" is deliberately **not** cached, or one transient failure would
lock a child out for the whole TTL.

⚠ **Rollout:** `question_loader.js` and the assignment-complete notify call now
send `X-Student-Token`. A browser holding a stale service-worker shell still
sends the old header and will get 401 until it reloads — `SHELL_VERSION` v18 →
v19 forces that on next load, and the 7-day localStorage question cache covers
the gap. This is the correct trade: the alternative is leaving the bypass open.

### 3. Forum — anyone could post as a teacher
`author_name` and `author_type` were written straight from the browser, and
`posts_insert` only checked that *somebody* was signed in, never who. So any
parent or child could post with `author_type: 'teacher'` and any name, and
`_authorName()` renders a green **(T)** badge off exactly that column — an
adult-authority badge anyone could mint, on a forum used by primary-school
children.

`author_id`/`author_student_id` looked safe (`DEFAULT auth.uid()` /
`current_student_id()`) but ⚠ **a DEFAULT only applies when the column is
omitted** — an explicit value in the insert overrode it and nothing checked.

**`supabase-forum-author.sql`** adds a `BEFORE INSERT` trigger
(`forum_set_author`) that overwrites all four identity columns from the caller's
real session, and tightens both `WITH CHECK`s to pin the id columns. A trigger
rather than only a policy, because a policy can only *reject*, and rejecting
would break every already-deployed client that still sends the fields. The
`'teacher'` badge is now a fact about `profiles.role`, not a string the browser
chose. Existing rows claiming an unearned badge are demoted, not deleted.

`engine/forum.js` no longer sends `author_type` at all.

### 4. The service worker re-introduced the leak its own comment described
`sw.js` explains that Supabase caching was removed because *"the offline
fallback matches on URL alone, ignoring the auth header, so it could hand one
child a response cached for another"* — then cached `/.netlify/functions/*`,
which includes `questions`, the endpoint that answers `Cache-Control: private`
**precisely because it varies per caller**. On a family device, child A's
entitled question set could be served to child B.

That path is now never cached. And because `DATA_CACHE` deliberately survives a
version bump, **`activate` evicts the entries every previous version already
wrote** — skipping the route from now on would not have removed them, and those
stale entries *are* the leak.

### 8. `payment-webhook.js` verifiers returned `true`
Three signature verifiers were `return true; // placeholder`, sitting directly
above a commented-out block that activates subscriptions from the request body.
Whoever enabled payments would have uncommented that and shipped an endpoint
granting paid plans to anyone who could POST JSON. They **fail closed** now, so
enabling payments breaks loudly until the real checks are written.

### Verified
32 security assertions across three suites, run against the real handlers:
the old `x-student-id` bypass is rejected and sends no email; unknown, expired
and malformed tokens are rejected (malformed without spending a DB call); a
valid token is looked up by hash with an expiry bound and never in plaintext; a
`studentId` in the body is ignored; forged JWTs still fail; the questions route
is not intercepted by the SW while every other route is unchanged; and stale
per-child entries are evicted on activate.

### Still open from the same review
`report-question.js` (unauthenticated, no rate limit, service-role write),
the parent PIN stored as base64 under a function named `_getStoredPinHash`,
the VAPID private key still in git history and unrotated, missing SRI on three
CDN scripts with a floating `@2` major, and the CSP's `'unsafe-inline'`
(311 inline handlers). None are as exploitable as the five above.

---

## Live database audit (2026-08-30) — run against production, not the dump
Connected to project `xawvjwsiqhtxgpocdqgm` via the Management API and checked
the deployed schema against what the client code actually calls. Read-only,
except one impersonation test applied and **rolled back** inside a transaction.

**Everything the client depends on is deployed.**

| Check | Result |
|---|---|
| Tables | 31, **RLS enabled on all 31** |
| RPCs the client calls | 31 of 31 exist, **all SECURITY DEFINER** |
| Columns the client reads/writes | **88 of 88 exist** across 16 tables |
| Policies on client-queried tables | all 19 have usable policies |
| RPC EXECUTE for `anon` (a child's session) | all 13 child-path RPCs granted |
| `students` column grants | correct — `pin`, `pin_hash`, `pin_attempts`, `pin_locked_until` ungranted; every column the client reads granted, including `deleted_at` and `friend_code` |
| Student PINs | 16/16 **bcrypt**, zero plaintext |
| `student_sessions` | 5 rows, all unexpired — the token auth fix has real sessions to validate against |

Deployed and previously believed outstanding:
- **`family_referral_count()` EXISTS.** The Pending list said referral rewards
  had not been run. It has.
- **`supabase-forum-adults.sql` IS applied.** Live `posts_read` / `replies_read`
  are `auth.uid() IS NOT NULL`, not `USING (true)`.
- `create_student_with_pin`, `soft_delete_student` (incl. push-subscription
  cleanup), `students.friend_code`, `students.deleted_at`,
  `students_live_username_key`, `shop_settings()`, `chapter_entitlements`,
  `question_reports` — all present.

Genuinely outstanding: **`supabase-forum-author.sql` only** (0 of its 2 triggers
deployed).

### ⚠ `supabase-schema.sql` is STALE and cost me a real mistake
The dump still shows the pre-forum-adults policies. Writing
`supabase-forum-author.sql` against it, I produced a policy that would have
**silently undone the adults-only restriction and let children post on the forum
again**. Caught only by querying the live database. The live policies are:
```
posts_insert / replies_insert:
  ((auth.uid() IS NOT NULL) AND ((author_id IS NULL) OR (author_id = auth.uid())))
posts_read / replies_read:
  (auth.uid() IS NOT NULL)
```
The file now preserves those and adds only the `author_student_id` clause.
**Never author a policy change from `supabase-schema.sql` — regenerate it, or
query `pg_policies` first.**

This also corrects a finding in the 2026-08-30 security review: "the forum is
world-readable to anon" was true of the dump, **not of production**. Forum reads
already require a signed-in adult. The impersonation finding stands — the live
`posts_insert` pins `author_id` but says nothing about `author_type`, so any
signed-in adult can still mint a teacher badge until the trigger is installed.
Children cannot post at all, so the exploit is narrower than first reported.

### The forum fix was verified against production
Applied inside a transaction, impersonating a real non-teacher parent via
`request.jwt.claims`, then rolled back. An insert claiming
`author_name: 'Mrs Somebody', author_type: 'teacher'` returned:
```
returned_name = "rajneesh"   returned_type = "parent"   returned_author_id = <the real caller>
```
Impersonation refused, nothing persisted, trigger not left installed. This also
confirms the ordering the fix relies on: the BEFORE INSERT trigger rewrites the
row *before* RLS `WITH CHECK` evaluates it.

### ⚠ Why the calendar was empty — confirmed from the data
The earlier report ("my child completed an assignment, the calendar showed
nothing") is fully explained by production data:

| child | has `daily` key | days recorded | lifetime questions |
|---|---|---|---|
| kavya | yes | **0** | 57 |
| Kavya | no | 0 | 48 |
| Veer | no | 0 | 30 |
| child1 | no | 0 | 26 |

**Not one child has a single day of dated activity.** Lifetime totals exist, so
the work happened — under the old code, which had no `daily` at all. The one
`daily` key present is an empty `{}` written by the schema backfill in
`loadStudentProgress()`, not by any answer.

So the calendar had nothing to show because **the dated-activity code has not
run in production yet**. The code fixes were still needed (assignment work would
have been invisible even once deployed), but the empty calendar was a deploy
gap, not only a bug. Reports, the family overview and the calendar all fill in
from each child's next practice session after deploy.

### Not a problem, checked because it looked like one
- **9 soft-deleted student rows** with `.del.<hash>` usernames alongside 7 live
  ones. That is `soft_delete_student()` working exactly as designed, not the
  duplicate-child bug. The 7 live children are distinct.
- Family `gobin` legitimately has two live children whose display names differ
  only by case (`kavya` / `Kavya`), on distinct usernames `@kavya` and
  `@kavya1` — which is precisely why the child cards show `@username`.
- `verify_student_pin` still contains a plaintext-equality branch
  (`v_student.pin = p_pin`) ahead of the bcrypt comparison. Dormant: all 16
  stored PINs are bcrypt, so it never fires. Worth removing eventually — it
  would accept a plaintext PIN if anything ever wrote one — but it is not a
  live exposure.
- `pin_hash` is NULL for all 16 students, and that is correct: both the live
  `verify_student_pin` and the pending `set_student_pin` standardise on `pin`
  holding the bcrypt hash. Running `supabase-migration.sql` will **not** lock
  anyone out.

---

## Pre-deploy scan (2026-08-30) — measured, not eyeballed
Bugs and performance, checked against the live database and by benchmarking in
real Chrome. **No new bugs found.** Three performance findings, one of which is
worth a decision before the next deploy.

### Clean
- **Service worker shell list**: 18 `<script src="engine/…">` tags, 18 matching
  `SHELL_FILES` entries, all present on disk, none listed-but-unloaded. This is
  the all-or-nothing hazard (`cache.addAll` rejects wholesale on one 404), so it
  is worth re-running the check on every deploy that touches the script tags.
- **Undefined globals**: every engine file shares one global scope; a scan for
  identifiers called but never declared found only IIFE self-references
  (`_purgeStaleCaches`, `_maybeShowIOSTip`) and locals. Nothing genuinely
  undefined.
- **Stale assignment flag**: all four practice entry points declare their
  assignment status — `startChapterDirect` (`_setAssignmentContext(!!mode)`),
  `startSearchPractice`, `startSubsectionPractice` and the exam path all set it.
  So the new `asg` bucket cannot capture ordinary practice from a leftover flag.
- **Guest flow**: `guest.js` never calls `/functions/questions`, so the switch
  to `X-Student-Token` does not touch it.

### 1 · Four tables never use an index → `supabase-indexes.sql`
From `pg_stat_user_tables` on production:

| table | rows | seq scans | idx scans | tuples read |
|---|---|---|---|---|
| `schedule_entries` | 247 | 148 | **0** | 30,310 |
| `student_assignments` | 3 | 603 | **0** | 1,102 |
| `subscriptions` | 1 | 1,048 | **0** | 1,036 |
| `question_reports` | 4 | 204 | **0** | 565 |

Plus **10 foreign keys with no index**, which makes every parent-row DELETE
scan the child table.

⚠ **Nothing is slow today** — the whole database is under 6 MB and scanning 247
rows is free. This is about the shape of the growth: `generateTimetable()` writes
weeks × study-days × subjects rows *per child* in one go, and `_loadEntries()`
re-reads the lot on every calendar open. Indexes are sized from the real query
shapes, not guessed — composite `(schedule_id, date)` because the query filters
on one and orders by the other, a partial index on `completed_at IS NOT NULL`
for the calendar's assignment rows.

Applied against production inside a transaction and rolled back: all four
sampled indexes created cleanly, nothing left behind.

### 2 · The progress blob grew 80× — the cost is NETWORK, not CPU
`daily`, `mistakes` and `asg` all live in `student_progress.data`, which is
rewritten **whole** on every answer.

Measured in real Chrome:

| scenario | size | `JSON.stringify` + `setItem` per answer |
|---|---|---|
| today | 0.5 KB | 0.007 ms |
| realistic (120d × 3 chapters, 60 mistakes) | 39.5 KB | 0.067 ms |
| worst case (120d × 12 chapters) | 76 KB | 0.123 ms |
| if capped at 60d × 3ch, 40 mistakes | 28.8 KB | 0.050 ms |

**The CPU cost is a non-issue** — 0.067 ms per answer, and even 6× slower on a
cheap Android phone is under half a millisecond. I expected this to be the
problem and it is not; the synchronous `localStorage` write on every answer is
fine at these sizes.

⚠ **The network cost is real.** The Supabase write is debounced to 30 s
(`_SAVE_DEBOUNCE_MS`), so a 30-minute practice session is ~60 writes. At 40 KB
that is **~2.4 MB uploaded per session**, against ~30 KB today. On metered
mobile data that is a genuine regression, and it is entirely a consequence of
the reporting keys.

Options, in order of cost:
- **Do nothing.** 2.4 MB per half-hour session is tolerable on wifi.
- **Cut `_DAILY_KEEP` 120 → 60 and `_MISTAKE_KEEP` 60 → 40** — 39.5 KB → 28.8 KB
  for one line each. Every view still works: the Reports strip shows 30 days and
  the trend 8 weeks (56 days), the family overview 14. The only loss is calendar
  history beyond ~2 months.
- **Move `daily` to its own table.** The correct long-term fix — a day is a row,
  writes are one small INSERT/UPDATE instead of rewriting the blob — but it is a
  migration plus a rewrite of every reader, so not a pre-deploy change.

Left at 120/60 deliberately: it is a product decision about how far back the
calendar reaches, not a bug.

### localStorage: the question cache is the only large dependency, and it now evicts
Measured: everything except the question cache is trivial. Session, PIN, prefs,
flags, filters, likes and the resume record come to **under 5 KB combined**; a
child's progress blob is ~40 KB. The cache is everything else:

| | size |
|---|---|
| one subject (`mm_qc_v14_<subject>`) | ~272 KB average, **473 KB** largest |
| all five subjects of one grade | 1.1 – 1.66 MB |
| **all three grades** | **4.3 MB**, against a ~5 MB quota |

One grade is comfortable. **Cross-grade practice is not** — it is a real
feature (the parent Controls toggle), and a child using it reaches the ceiling.
`_loadBatchForGrade()` writes a whole grade, up to 1.66 MB across five keys, in
a single pass.

⚠ **This cache is now the ONLY offline copy of the questions.** The service
worker used to cache `/functions/questions` as well and deliberately no longer
does — that response varies per caller, and a shared URL-keyed cache handed one
child's entitled question set to another. So this got more load-bearing on the
same day it got bigger.

#### What was wrong
`_purgeStaleCaches()` only drops caches from an earlier `_CACHE_VERSION`. There
was no size cap, no eviction, and no handling of quota pressure — every write
was `catch {}`. Hitting the quota therefore failed **silently and permanently**:

- Every subject load refetched ~272 KB for ever, invisibly.
- Worse, the writes that then lose the race are whatever runs next — including
  `Store.saveStudentSession()`. That is also try/caught, so the token stays
  installed on the live page and the child only finds out the session was never
  persisted when they reload and land back on the PIN screen. To a parent that
  reads as *"the app keeps logging me out"*.

#### What it does now
- **Cap of 6 subjects** (`_LRU_MAX`) — one full grade plus headroom, holding the
  cache near 1.6 MB instead of 4.3 MB. Trimmed *before* writing, so the common
  case never has to fail a write first.
- **On `QuotaExceededError`, evict and retry**, up to three attempts. Three
  because the first failure may be caused by data this cache does not own, and
  one eviction may not free enough for a 473 KB bundle.
- **Recency is USE, not write time** — `_lruTouch()` runs on every cache hit and
  lives in its own few-hundred-byte key, rather than rewriting a ~272 KB
  envelope just to record a read.
- **Eviction only ever removes this cache's own `mm_qc_` keys.** The session,
  the progress copy and everything else are never candidates.
- Quota detection covers Safari's `NS_ERROR_DOM_QUOTA_REACHED` and the legacy
  codes `22` / `1014`, not just `QuotaExceededError` — matching only the
  standard name would skip eviction on the browser most likely to be tight.
- A **non-quota** failure (e.g. `SecurityError` in a locked-down browser) evicts
  nothing and returns, as before.

⚠ **The recency key is a monotonic counter, not `Date.now()`.** Timestamps
looked obvious and were wrong: `_loadBatchForGrade` writes all five of a grade's
subjects inside the same millisecond, so they recorded identical times and the
eviction sort had no way to order them — it picked arbitrarily among the ties.
That surfaced as a test passing twice and failing the third run. A counter gives
a strict total order and does not depend on clock resolution.

Verified in real Chrome against a real `localStorage`, including a genuine
`QuotaExceededError` produced by filling the origin with 4 MB of ballast: 15
assertions, and eight consecutive clean runs after the counter fix (the tie bug
reproduced roughly one run in three before it).

`SHELL_VERSION` → v21. `_CACHE_VERSION` deliberately **not** bumped: the stored
envelope shape is unchanged, so existing caches stay valid and simply come under
management.

### Idle-crash investigation (2026-08-30) — NEGATIVE result, app side is clean
Reported: Chrome crashed "again" while idling on the student grade-choosing
screen. Investigated by instrumenting a real headless Chrome over CDP and
sampling `Performance.getMetrics` — heap, DOM nodes, listeners — plus wrapping
`setTimeout` / `setInterval` / `requestAnimationFrame` to count timer churn, and
trapping `Runtime.exceptionThrown` and console errors.

Three configurations, `grade-select` and `subject-select`, 60–90 s each:

| | heap after forced GC | nodes | listeners | setTimeout | setInterval | rAF | errors |
|---|---|---|---|---|---|---|---|
| grade-select | **−0.48 MB** | 0 | 0 | 1 | 0 | 0 | none |
| subject-select | **−0.73 MB** | −3 | 0 | 0 | 0 | 0 | none |
| subject-select, SW active + localStorage filled | **−0.90 MB** | −7 | 0 | 0 | 0 | 0 | none |

Heap goes **down** after GC in all three. Nothing accumulates. The idle student
screens arm essentially no timers at all.

⚠ **Tailwind Play CDN was loaded in every run** (`typeof window.tailwind`
confirmed true, `200 https://cdn.tailwindcss.com/3.4.17`). Worth stating because
its whole-document MutationObserver is the obvious suspect for an idle-page
problem, and these runs exonerate it *for a screen that does not mutate*. It
would still be the first thing to look at for a screen that does.

Also checked and cleared by reading: every `setInterval` is cleared on the paths
that create it (exam timer, 30-minute session guard); both `requestAnimationFrame`
loops self-terminate (confetti when particles fall off, the carousel one is
cancel-and-reschedule); only three CSS `infinite` animations exist and none are
on these screens; no Supabase realtime subscriptions anywhere; the only
`location.reload()` is account deletion; the service worker registers once on
`load`.

Follow-up report: idle ~5 min on grade-select, then tap **🔒 Parent Access**,
crash "immediately". A crash on a GESTURE rather than on elapsed time is not a
leak — it is something that runs on interaction. Every branch of that button was
then driven in an instrumented browser:

| path taken | result |
|---|---|
| no session, no PIN → `showScreen('auth')` | survived, heap **fell** 12.1 → 9.1 MB |
| stored parent PIN → `_showParentPinModal()` | survived, heap flat |
| logged-in parent → `renderParentDashboard()` with 3 children × 120 days × 24 chapter entries (worst-case blob) | **resolved in 33 ms**, +1.6 MB, no hang |

⚠ **A harness lesson worth keeping:** the first run of this test appeared to hang
after the click, which looked exactly like a hung renderer. It was the harness —
`Runtime.evaluate` was awaited with no timeout. An infinite loop in page JS
blocks the renderer's message loop so CDP never answers, and a harness without
per-call timeouts cannot tell "page is wedged" from "I forgot a timeout". Every
CDP call in these harnesses now has its own 8 s timeout.

**What this does NOT rule out:** windows were 60–90 s, so a slow accumulation
over tens of minutes would not show; and it says nothing about the reporter's
own device, extensions or GPU driver.

⚠ **The environment is the stronger hypothesis, and there is direct evidence for
it in this same conversation.** The first question in this session was
FortiClient blocking `findonlineresults.com` — a browser-hijacker domain — on a
**top-level** navigation (`main_frame=1`), i.e. something was actively
redirecting that browser. Recurring crashes on a browser already showing
hijacker behaviour, with FortiClient's request-intercepting extension also
installed, is a far better fit than an app whose idle heap shrinks.

The diagnostics that would settle it are all on the reporter's machine:
`chrome://crashes` (the crash reason), Shift+Esc during the crash (which process
is growing), `chrome://extensions` in guest mode (does it still crash with none
loaded).

One genuine app-side contributor was found and fixed independently — the
question cache could grow to 4.3 MB of localStorage with no eviction (see the
localStorage section above). Chrome maps an origin's localStorage into the
renderer, so that is real memory, but 4.3 MB alone does not crash a tab.

The harness is worth keeping: it takes a screen id and a duration and reports
retained heap, node and listener deltas, timer churn and page errors.

### 3 · 1.4 MB of blocking JavaScript on first visit
Uncompressed; Netlify gzips to roughly a third, and the service worker caches it
after the first load. Worth knowing: **`admin.js` (127 KB) and `teacher.js`
(21 KB) are parsed by every child on every first load**, for screens they can
never open. `app.js` itself is 452 KB and grew 85 KB this session. Splitting the
privileged modules behind a role check is the obvious win and is a refactor, not
a fix.

### Known deploy risk, unchanged
The `X-Student-Token` switch means a browser holding a stale service-worker
shell still sends the old header and gets 401 until it reloads. `SHELL_VERSION`
v20 forces that on next load, and the 7-day localStorage question cache covers
the gap.

---

### First CLI deploy (2026-08-30) — two production bugs it exposed
Deployed with `netlify deploy --prod --dir=. --functions=netlify/functions`
(there is no `dist/`; `publish = "."`). The build runs LOCALLY with this
command — proven by it failing here on `Could not resolve "@supabase/supabase-js"`
until `npm install` was run — so no Netlify build minutes are consumed.

⚠ **A CLI deploy uploads from local disk, not from git.** Everything gitignored
but present on disk therefore ships. `.env` holds `SUPABASE_SERVICE_ROLE_KEY`;
the git-based build never had it, a `--dir=.` deploy would publish it. Move it
out of the tree before every CLI deploy, restore after. `node_modules` was also
untracked-but-present (10 MB) and is now gitignored.

⚠ **`publish = "."` served the entire repo root.** Verified live before the fix:
`/supabase-schema.sql` → 200 with every RLS policy in the system, `/CLAUDE.md` →
200 with the architecture notes. 26 explicit 404 redirects added to
`netlify.toml` — explicit because Netlify wildcards only match a TRAILING
splat, so `/*.md` matches nothing and would have silently left it all exposed.

#### ⚠ SUPABASE_SERVICE_ROLE_KEY was never set on Netlify
Only `SUPABASE_ANON_KEY` existed. This had been invisible because the OLD
questions.js guarded its student check with `if (SB_SRK && …)` — **it failed
OPEN**, skipping validation entirely when the key was absent. That is the same
fail-open the security review replaced with a fail-closed check, so the moment
the new code shipped every child got `{"error":"Auth not configured"}` and no
questions loaded at all. Set via `netlify env:set`, and the missing key is now
`{"error":"Invalid session"}` — i.e. the lookup actually runs.

The lesson is not "the fix was wrong" — a fail-open auth check is worse than an
outage. It is that **a fail-closed change must be paired with a check that its
dependency is configured in the target environment**, before deploying.

#### ⚠ The CDN was caching 401s and replaying them to everyone
Every response shared one headers object carrying
`Cache-Control: public, s-maxage=86400`. Netlify's CDN keys on URL alone — it
does not vary on `Authorization` or `X-Student-Token` — so the first
unauthenticated request to a subject URL poisoned it for 24 hours and every
legitimate child asking for that subject afterwards got the cached 401.

Proved in production: identical requests differing only in credentials all
returned 401 with `Age: 2`, and adding a cache-busting query string immediately
produced three *different* correct answers. Six error paths now use an
`errHeaders` object with `no-store`; the success path keeps its own caching
(already `private` whenever a plan filter applies).

This one predates the auth change but was latent — the old code rarely 401'd.

#### Draft deploys could not catch either
The draft URL answers 401 to everything (Netlify preview auth), so nothing could
be curled against it. **Verify a CLI deploy against production immediately after
promoting**, with a cache-busting query string, or the CDN will show you a
stale answer and you will conclude the wrong thing.

---

## Pending / Not yet done
1. ~~Supabase migrations~~ — **DONE**, with one file outstanding. Live audit on
   2026-08-26 confirmed every historical migration is deployed: push table,
   referrals, guest assignments/hardening/submit-token, teacher approval,
   classrooms, the pgcrypto search_path fix, create_student_with_pin, the
   bridge-policy drop, parent settings and soft delete. All 25 tables have RLS
   on; all 15 RPCs the client calls exist; every column the client selects
   exists. **`supabase-migration.sql` has not been run yet** — it carries the
   PIN-counter move, the ambiguous-family-name guard, and the push-subscription
   cleanup on delete.
   ⚠ **`supabase-forum-author.sql` has not been run — run this one first.**
   Confirmed by live audit 2026-08-30: it is the ONLY outstanding migration. It is the server half of the forum impersonation fix and is
   independent of everything in `supabase-migration.sql`. Until it runs, that
   fix is client-side only: the browser has stopped sending `author_type`, but
   nothing stops a crafted request from setting it and minting a teacher badge.
   The only outstanding item from the 2026-08-30 security review — the other
   four fixes are entirely in code and went live with the deploy.
2. ⚠ **Re-run `supabase-credits-shop.sql`.** A live probe on 2026-08-28 found
   `shop_settings`, `my_credits`, `my_entitlements` and `family_entitlements`
   already deployed — so an earlier copy of this file HAS been run and Part 0
   (the privilege-escalation fix) is in place. What is missing is everything
   added since: `purchase_subject()` and `shop_subject_price()` (whole-subject
   buying, confirmed 404 on the live database), the anti-farming knobs inside
   `record_student_activity()`, and the new `shop_settings` keys. The file is
   idempotent and now BACKFILLS the settings row instead of skipping it, so
   re-running keeps every configured price and only adds what is absent.
   Then open Admin → Content → 🛒 Credit Shop and press **Publish catalogue**
   once — whole-subject buying refuses outright without it, since the database
   has no other way to know which chapters belong to a pack.
3. **Netlify env vars** — set these in the Netlify dashboard, never in the repo:
   ```
   VAPID_PUBLIC_KEY  = <see Netlify env vars>
   VAPID_PRIVATE_KEY = <see Netlify env vars>   ← NEVER commit this
   VAPID_EMAIL       = mailto:...
   ```
   ⚠ The previous VAPID **private** key was committed here in `dba9b8e` and is
   therefore in git history permanently. Removing it from this file does NOT
   purge it. **Rotate the VAPID keypair** (`npx web-push generate-vapid-keys`),
   update the Netlify env vars, and update `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Push is non-functional until `push_subscriptions` has real subscribers, so
   rotating now costs nothing.
4. **Push notifications for assignments** — infrastructure is ready; wire up `push-send.js` when parent creates an assignment
5. **Badge API** — show assignment count badge on app icon (needs Supabase assignment count)
6. **Enrichment chapters for French/English/Maths** — partly superseded: `Description d'Images` (French, all grades) and `Passages & Text Types` (English + French, all grades) now cover the picture and text-type work. Still open: an English "Vocabulary Builder" and a maths "Shapes Around Us" picture chapter.
7. **Grade 6 maths enrichment** — not started
8. ~~Illustrated questions for Maths chapters~~ — **DONE for Grade 4 & 5** (Grade 6 Maths already had some).
   All inline SVG (no external image dependency), built from straight lines/circles/polygons only —
   no elliptical-arc SVG math, so nothing can render subtly wrong on any device.
   - `g4-geometry` (+6 g4m-geo-020..025): right/acute/obtuse angle rays, equilateral/isosceles
     triangles marked with tick marks, a square with all 4 lines of symmetry drawn.
   - `g4-measures` (+3 g4m-meas-020..022): analog clock faces (`_g4mClockFace(hour,minute)` helper,
     hands positioned by real trig, no digital readout — genuinely has to be read).
   - `g4-data` (+4 g4m-data-020..023): a real bar chart (`_g4mBarChart`) and pictogram
     (`_g4mPictogram`) with half-symbol shading, replacing "using the bar chart..." questions that
     previously had no picture at all.
   - New file `subjects/grade5-maths/questions/illustrated_diagrams.js` (+11 g5m-illus-001..011):
     reflex-angle diagram (shaded wedge fan, sampled via `Math.cos/sin` in a loop — no arc-sweep
     flags), triangle/quadrilateral angle-sum problems ("? angle" diagrams, "not to scale" like a
     real exam paper), a non-square rectangle showing only its 2 real symmetry lines (tests the
     "diagonals aren't symmetry lines unless it's a square" misconception), a 5-bar test-score
     chart (mean/range/lowest), a car-sales pictogram, and two analog-clock questions (one is an
     elapsed-time-between-two-clocks problem).
   - Registered in `question_loader.js` `LOCAL_FILES['grade5-maths']` for local `file://` dev;
     prod auto-discovers it.
9. ~~Illustration coverage across other subjects (exam mode)~~ — **broad pass done**, follow-up
   session. Metric used: illustrated questions as % of a subject's *whole* pool, since exam mode
   draws proportionally across all chapters — a subject can have "some" illustrated chapters and
   still show a blank paper almost every time if the pool is huge. Science was already the
   strongest (10.6–16.9%); this pass targeted the weakest instead:
   - **Grade 5 Maths** (+13 more, `illustrated_diagrams.js` g5m-illus-012..024): angles-around-a-
     point (reuses the reflex-angle wedge-fan technique), fraction bars, a 100-square percentage
     grid, decimal number lines, grid-square areas, a triangle base/height diagram, and two
     perimeter diagrams (rectangle + a labelled L-shape). Still only ~1.4% of the 1,045-question
     pool — the pool itself would need trimming or a much larger illustrated batch (50+) to move
     this further; flagged, not solved.
   - **Grade 6 Maths** (+14, spread across `ch07_geometry`/`ch09_area_vol`/`ch10_time_speed`/
     `ch11_graphs`): angle-on-a-line, a shaded reflex wedge, a cube net (surface area), a simple
     pseudo-3D cuboid (fixed offset vector, no trig), the D/S/T speed-triangle mnemonic, and a real
     coordinate grid with plotted points (`_g6mCoordGrid`, computed by code, not hand-typed pixels).
   - **French, all 3 grades** (+42: G4 `ch01_vocabulaire` +10 / `ch02_noms` +6, G5 `ch01_vocabulaire`
     +10 / `ch02_noms` +6, G6 `ch06_lecture` +10) — was the weakest subject family (2.1–2.8%). Every
     `<img>` filename was verified to actually exist on Wikimedia Commons via the `action=query`
     API (`titles=File:X|File:Y|...&formatversion=2`, checking for the `missing` key) **before**
     being written into a question — nothing here is a guessed/unverified filename. G6 has no
     vocabulaire chapter (grammar-only), so its new content extends `g6fr-lecture`'s existing
     action-verb-photo pattern (dormir/chanter/dessiner/cuisiner/danser/sauter/sourire/conduire/
     pêcher/pleurer) instead.
   - **English** (+17: G4 `ch01_nouns` +6 / `ch03_adjectives` +2, G5 `ch07_vocabulary` +6, G6
     `ch06_vocabulary` +3) and **History** (+5: G4 `ch03_voyages` +2 / `ch05_weather` +1, G5
     `ch06_volcanism` +1, G6 `ch05_natural_hazards` +1) — lighter top-up as scoped, same
     Commons-verified-before-use discipline.
   - Every new global SVG-helper/constant name across all touched files was checked for collisions
     (all files share one global JS scope at runtime, loaded via plain `<script>` tags) — none found.

---

## File structure highlights
```
psac-practice/
  index.html                  ← entire app UI
  style.css                   ← custom CSS + enrichment card styles
  sw.js                       ← PWA service worker
  manifest.json               ← PWA manifest
  package.json                ← web-push dependency for Netlify
  netlify.toml                ← functions config + cron schedules
  supabase-migration.sql      ← the one file to run in the Supabase SQL editor
  supabase-schema.sql         ← generated dump of the live schema (reference / fresh rebuild)
  icons/
    icon.svg / icon-192.png / icon-512.png
  engine/
    app.js                    ← main app logic, all UI functions
    shop.js                   ← referral credits + chapter shop (UI only; see the SQL for enforcement)
    auth.js                   ← Supabase auth + student PIN login + session guard
    store.js                  ← localStorage + Supabase data layer
    question_loader.js        ← loads question files (LOCAL_FILES for file://, API for prod)
    admin.js                  ← admin panel logic
    registry.js               ← registerSubject(), SUBJECT_PACKS, CHAPTERS
    questions_engine.js       ← getQuestionsForChapter(), assembleExamPaper(), etc.
  netlify/functions/
    questions.js              ← serves question files (auto-discovers subjects/*/questions/*)
    push-subscribe.js         ← save push subscription + reminder_time
    push-send.js              ← send push to student(s)
    push-reminders.js         ← cron every 15min, sends due study reminders
    weekly-digest.js          ← cron Sunday 9am, emails parent progress digest
  subjects/
    grade[4-6]-[subject]/
      _manifest.js            ← registerSubject() call with chapters array
      questions/
        ch01_*.js ... ch0N_*.js
        enrichment_*.js       ← @enrichment bonus chapters
```

---

### End-of-round answer review
The Round Complete modal showed only a score — a child who got 4/20 was told
they got 4/20 and nothing else. It now offers **"Review my answers (N)"**:
every question of the round with a ✅ / ❌ / ⏭️ mark, what they answered, the
correct answer, and the explanation on the ones they got wrong.

- `_logPracticeAnswer()` records each question from `practiceSubmit()` and
  `practiceSkip()`. The log is created **lazily** on `S.practice.session` rather
  than in an initialiser: every place that starts a fresh round *replaces* that
  object, so the log clears itself and there is no reset site to forget.
- **Collapsed by default** — the score should land first, and a 20-question
  round would otherwise open as a wall of text. Reset to collapsed on every
  render, or the second round opens showing the first round's state.
- ⚠ **Honours `S.practice.showAnswers === false`.** A parent who turned answers
  off for an assignment must not have every answer handed over by the review;
  it then shows only which ones were wrong.
- A `symmetry` question has no typeable answer, so the review says the correct
  cells were shown on the grid rather than printing coordinates.
- The modal is `max-w-md` and scrolls (`overflow-y-auto` + `my-auto`): a centred
  flex child taller than the viewport gets its top clipped with no way to reach
  it, which is what a long review does on a phone.

### Exam results review
The exam results screen **already had** a "📝 Full Question Review"
(`#results-review`) listing every question. This pass fixed what was wrong with
it and added a filter:

- ⚠ **A symmetry question dumped raw coordinates.** `q.answer` is an array of
  `[row,col]` pairs, so `✓ Correct: ${q.answer}` rendered
  `Correct: 1,4,2,6,2,5` — meaningless to a child — and "Your answer" printed the
  raw JSON string. Both now explained in words, as in the practice review.
- ⚠ **The typed answer was interpolated unescaped.** Only ever the child's own
  input on their own screen, so self-XSS at worst, but it is now escaped.
- **Unanswered is distinguished from wrong** (⏭️ vs ❌), and a question the child
  flagged during the exam is marked 🚩.
- **"Show only what I got wrong (N)"** — a full mock is 40 questions and the
  mistakes are the point of reading it. `_examReviewWrongOnly` is module-level
  state, so it is reset in `renderResults()`, not in the toggle: otherwise the
  *next* exam's results open already filtered.
- `_makeImgsZoomable()` now runs on the review — question text can carry an
  inline SVG diagram or a photo, and this was the one place they could not be
  tapped to enlarge.

## Device-display pass (2026-08-28) — measured in headless Chrome, not eyeballed
Reported from real devices: the bottom bar "gets extra large" and the page
scrolled sideways on some Android phones; the Sign In button sat almost off the
right edge on a Samsung; the student login looked broken; and on an iPad the
**Review** button at the end of an exam did nothing.

Every fix below was verified by driving the app in headless Chrome over the
DevTools protocol at 320 / 360 / 390 / 412 / 428 / 640 / 768 / 820 / 1024 /
1152 / 1440 px. Two things about that harness are worth knowing before repeating
it: the **service worker serves a stale shell**, so a CDP run must
`Page.setBypassServiceWorker` *and* `Page.reload {ignoreCache:true}` or it will
happily measure the previous version of style.css and report a fix that has not
landed (this happened, and briefly produced nonsense results); and an
overflow-detector that walks up to `document.documentElement` now finds
`overflow-x: clip` on `body` and concludes nothing overflows anywhere. **Stop
the ancestor walk at `body`.**

### The bottom bar: a class-name collision
`.nav-btn` was TWO different components. The exam question-navigator grid
(`width: 2rem; height: 2rem`) and the student bottom tab bar shared the name, so
each tab was laid out in a 32×32 box while holding a 24px icon and a whole word.
"Practice" and "Progress" cannot wrap, so they spilled out of the button on both
sides; measured at 360px the four buttons were 32px wide with labels overflowing
by up to 7px each. A wide screen had slack in the `max-w-lg` track and hid it —
which is why it only showed on phones, and worse on Samsung's larger default
font scale. The tab bar is now `.tabbar-btn`, its own component, `flex: 1 1 0` +
`min-width: 0`. Four 90×60 tabs at 360px, no overflow. **Do not reintroduce a
shared class name here.**

### Header: labelled pills, or one "Menu" button
Eight ad-hoc pills in four sizes and six pastel colours became one `.hdr-btn`.
Three approaches have now been tried on this row; only the third works:

1. **Labelled pills on phones** (the original). Seven controls took TWO rows at
   every width from 360 to 428 and made the header **136px** tall.
2. **Icon-only squares.** One tidy 94px row — and reported straight back as
   *"the top icons are not intuitive on mobile, we don't know what each one
   does"*. Which is what an emoji alone is: 🔒 could be a lock, a password or a
   private mode; 💬 could be chat, comments or feedback. Saving 42px of header
   was not worth making every control a guess. The pre-existing comment in
   style.css had warned about exactly this and was overridden on measurements
   alone — **vertical space is not worth comprehension.**
3. **One labelled `☰ Menu` button** below 1100px, opening a sheet where every
   action gets its name *and* a line saying what it does. Header is now a single
   **52px** row on a phone (60px on desktop), one row at every width from 320 to
   1440, nothing clipped, and nothing to guess at.

1100px is measured, not chosen: with all eight controls showing, the labelled
toolbar needs ~810px and the branding another ~234px, and `max-w-6xl` only ever
gives 1120px.

⚠ **The sheet's rows are BUILT FROM the live header buttons**
(`_buildHeaderMenu()`), never hard-coded. Which controls exist is decided in
half a dozen places — auth.js reveals Teacher only for an approved teacher, the
`beforeinstallprompt` handler reveals Install, `showScreen()` shows Account and
Logout everywhere except the auth screens, Search only once a grade is active. A
second list would drift and start offering a button the header had hidden.
Verified: hiding `#search-btn` removes its row.
- `data-menu-desc` on each button carries the description; `data-menu-label`
  overrides the word where it is dynamic (the account chip shows the person's
  NAME, which is right in a header and useless as a menu row).
- The Appearance row reports the current theme and is rebuilt on every open, so
  it flips from "Currently dark — tap for light" to the opposite after use.
- Bottom sheet under 640px (the header is the furthest point from a thumb), a
  top-right dropdown above it. `#hdr-menu-list` needs `min-h-0` or a long list
  pushes past the 85vh cap instead of scrolling.

Also learned the hard way: `#hdr-actions { flex-shrink: 0 }` to stop a
five-pixel wrap at 1024 stopped it by letting the row **overflow** instead — at
768 and 820 the toolbar ran to 876px and Logout sat off the right edge,
invisible because the page-level overflow guard clipped it. The toolbar must be
allowed to wrap; a two-row header is survivable, a control you cannot reach is
not.
### Page-level overflow guard
`body { overflow-x: hidden }` propagates to the viewport and makes it a scroll
container, which is the documented way to break `position: sticky` in Safari —
and the app header is sticky. It is now `overflow-x: clip` behind `@supports`
(clips without creating a scroll container), with the old rule as the fallback.

### Landing nav, auth screen, exam header
- The landing `<nav>` was a single no-wrap flex line holding branding plus five
  controls — well over a 360-412px viewport, so **"Sign In" was pushed past the
  right edge**. It wraps now, with the action cluster full-width under 640px.
  That is the Samsung report; the overflow guard only ever hid the symptom.
- Auth screen: the logo block is sized off viewport **height** with `clamp()`
  (that is the axis that runs out), and the subtitle drops under 700px tall.
  The PIN field's placeholder is shrunk by `.pin-field::placeholder` — at
  `text-2xl` + `tracking-widest` inside `px-11`, "PIN (4 digits)" was wider than
  the content box and got sliced mid-word before a single key was pressed.
- Exam header: timer + a `flex-1` progress bar + Exit + Submit on one no-wrap
  line left the progress bar **16px wide** at 360px. It wraps now; the bar gets
  its own full-width line on a phone (296px) and the original single line from
  640px up.

### The end of an exam: "Review" was the wrong word, twice over
The last-question button was labelled `Review →` and its handler was
`if (idx < len - 1) { idx++; render() }` — false on the last question, so the
tap did **nothing at all**, silently. On a desktop the sidebar navigator
softened it; on an iPad that navigator is a full screen below the fold.

Fixing the dead handler was not enough, and the second report said why:
*"kids tend to click it, but it dont work without any warning, the submit button
is on top, he needs to click that first then he can review."*

Two separate faults:
1. **The word.** To a nine-year-old "Review" means *show me my answers* — which
   only exists on the results screen, after submitting. The button could never
   do what its label promised, so making it open a pre-submit check sheet still
   left a child tapping it and not getting their score.
2. **The layout.** The finishing action lived in the top toolbar as a small
   `✓ Submit` pill beside `✕ Exit` — the two controls a child had been
   deliberately ignoring for forty questions — while the biggest button on the
   screen, bottom right, was the one that led nowhere.

Now: the last question's bottom button is **`✓ Finish exam`**, green and larger
than an ordinary primary (`.btn-finish`). The word "Review" appears nowhere on
the exam screen. Tapping it opens the check sheet, which states
"All 8 questions answered — nice work!" or "⚠ 5 questions still blank · 1
flagged to come back to", offers a jump to the first blank, and carries
**`✓ Submit & see my score`**.

⚠ That sheet button submits **directly**, with no second "are you sure". The
sheet IS the confirmation — it has just shown the blank count, the flag count
and "You can't change your answers after you submit". Stacking another dialog
made finishing a four-tap job for a child who had already been told everything
twice. The TOP-BAR Submit keeps its confirm: that one is an escape hatch pressed
mid-exam with no summary in front of you.

Measured child journey, end to end: sees `✓ Finish exam` → sheet
("3 of 8 answered · ⚠ 5 questions still blank · 1 flagged") →
`✓ Submit & see my score` → results at 25%, all eight questions reviewed with
explanations and the flagged one marked. **Two taps, and nothing on the way is
silent.**

Also fixed alongside: `_renderExamReview` tested `S.exam.flagged[i]` on a
**Set**, so the 🚩 marker never appeared on any reviewed question.

⚠ Production builds from `main`. The first version of this fix sat on `dev` for
two days while children kept hitting the dead button on the live site — if a fix
is reported as still broken, check which branch is deployed before concluding
the fix itself is wrong.

## ⚠ "The Next button is only half visible" — a transformed ancestor
Reported from real devices during tests. Two separate faults, both measured
rather than reasoned about (headless Chrome, 9 viewports from 320×568 to
1024×768 plus a 130% font-scale case, `getBoundingClientRect()` of every
button against `innerHeight` and `elementFromPoint()` at its centre):

1. **The practice action bar was not anchored to the viewport.**
   `.screen-enter-right/left` animated `transform: translateX()` with
   `fill-mode: both`, which leaves the computed transform at
   `matrix(1,0,0,1,0,0)` — *not* `none` — so `#screen-practice` became the
   containing block for its `position: fixed` `.pr-actions` bar. The bar sat at
   the bottom of the screen's **content**: 784–875px on an 844px viewport, and
   1129–1277px (entirely off-screen) at 130% font. Whether a child saw all,
   half or none of Check/Next depended on how tall the question was. The
   keyframes are opacity-only now, which is also what the policy comment at the
   top of `style.css` already required.
2. **The exam Prev/Next row sat under the bottom tab bar** at page top on
   shorter phones (641–688px against a bar starting at 661px at 130% font).
   `#exam-nav-row` is now `position: sticky` above the tab bar below the `lg`
   breakpoint — it rides just above the nav while the card is taller than the
   screen and settles into place at the end of the card. Sticky, not fixed,
   because the row belongs to the card and the navigator sidebar stacks
   beneath it on phones.

⚠ Do not add `transform`, `translate`, `filter` or `contain` to `.screen`,
`main` or `body`, even as an animation — any `position: fixed` descendant is
silently re-anchored. If a fixed bar is reported clipped again, walk its
ancestors' computed styles for those properties before touching the bar's CSS.

## ⚠ Teacher assignment links never worked — two systems, only one wired
Reported as "I have to open the Assignments list to share the link". The real
problem was underneath: **the link itself was inert.**

There are two assignment systems in this repo:

| | Backend | Link | State |
|---|---|---|---|
| **Guest flow** | `guest_assignment_create()` → `guest_assignments` row, `guest_open`, `guest_submit`, `guest_results`, `guest_grant_retry`, `guest_cleanup` cron | `/a/<CODE>` → `guest.html` (netlify.toml rewrite) | fully deployed, **no UI ever called it** |
| **TeacherMode (legacy)** | `localStorage['mathmaster_teacher']` only | `?assign=<base64>` | the UI, and **nothing reads that parameter** |

`grep` for the URL parameters the app parses returns exactly three — `join`,
`ref`, `friend`. `git log -S"get('assign')"` returns **no commit at all**: an
`assign` handler was never written. So every link `copyLink()` ever produced
dropped the student on the ordinary home screen. `renderAssignmentEntrance()`
(`app.js:7445`) likewise has no callers.

`buildAssignment()` now calls **`guest_assignment_create`** and produces a real
`/a/<CODE>` link, and the share sheet (`#modal-share-assignment`) opens the
moment the assignment is created — WhatsApp, Copy, and native Share, with the
PIN shown beside the link.

- ⚠ **The PIN is not optional.** `guest_assignment_create` rejects anything that
  is not `^\d{4}$`, and the guest page prompts for it. A teacher who leaves the
  new `#ta-pin` field blank gets one generated rather than a validation error on
  a form they thought they had finished — and **every share path carries the PIN
  with the link**, because a link alone strands the child at the PIN prompt.
- The teacher's daily cap is server-side (1/day unverified, 3/day verified) and
  every refusal — `pending_approval`, `not_approved`, `daily_limit`,
  `invalid_pin`, `no_questions` — is mapped to a sentence in `_createError()`.
  A generic "could not create" would leave someone who hit the cap pressing the
  same button all afternoon.
- ⚠ `_shuffled()` is local. The file header claims a global `shuffle()`; **no
  such global is defined anywhere in the repo.**
- Assignments saved before this change have no `code`, and `shareAssignment()`
  says so plainly instead of copying a link that goes nowhere.

## Two SQL grant gaps, both fixed
- **`purchase_subject()`** was `revoke all … from public` with **no matching
  grant** — the single omission among 13 functions in that block. Whole-subject
  buying answered `42501 permission denied` for every caller, and since
  `_rpcMissing()` only recognises `PGRST202`/`42883`, the parent saw the raw
  Postgres string. Re-running the file as instructed would NOT have fixed it.
- **The four friend RPCs** (`add_friend`, `get_my_friends`, `get_my_friend_code`,
  `remove_friend`) plus `GRANT SELECT (friend_code)` were granted `TO
  authenticated` only — but all four resolve the caller with
  `current_student_id()`, i.e. a **child** session, which is `anon` + an
  `x-student-token` header. They are now `TO anon, authenticated`, matching
  `verify_student_pin` and `redeem_student_invite`. Without this the Friends
  leaderboard would have stayed dead *after* the migration, in a harder-to-
  diagnose way.

## `report-question.js` deleted
Zero callers. The report flow goes straight to Supabase
(`Store.reportQuestion()` → `question_reports`), whose `reports_insert` policy
accepts `current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL` and is
granted to `anon`. The function was an unauthenticated, unrate-limited,
service-role write path kept alive for nothing — one of the open items in the
security review, closed at no cost.

## Three wiring bugs found by a cross-module audit
Found by checking every `Foo.bar()` call site against what `Foo` actually
exports, and every top-level declaration against every other file's.

### `Admin.resolveReport` — a global that does not exist
`engine/admin.js:1618` rendered
`onclick="Admin.resolveReport('…')"`. The module is **`AdminPanel`**; there is
no `Admin` global anywhere in the repo. So "Mark resolved" in Admin → Reports
threw `ReferenceError` and **no question report could ever be closed from that
list**. The near-identical list 130 lines below (`:1752`) uses `AdminPanel.`
correctly, which is why only one of the two report UIs was broken.
⚠ The other seven bare `Admin.` strings in that file are **log prefixes**
(`console.warn('[Admin._loadChildStats]', …)`) and a toast, not calls. Only the
one inside an `onclick` was a bug — check for `onclick=` before "fixing" them.

### `learnMore` was dropped by all three server-side factories
`engine/helpers.js` destructures and returns `learnMore` in `makeMCQ`/`makeNum`.
The three copies that build the shipped JSON — `netlify/functions/questions.js`,
`netlify/build-questions.js`, `netlify/lib/questions-sandbox.js` — did not, so
the field was silently stripped at build time. 15 questions across 6 files carry
it and `_learnMoreHTML()` (`engine/app.js:7297`) renders a panel from it, so
**the "Learn more" panel only ever appeared in local `file://` dev**, never in
production. Proved by grepping the built bundles: zero occurrences before, 30
after. Only `makeMCQ` and `makeNum` accept `learnMore`; `makeTF`, `makeMatch`
and `makeSymmetry` do not, in any copy.
⚠ This is the same four-copy trap `makeSymmetry`'s dropped `subsection` fell
into. **Any change to a question factory must be made in all four copies**, and
the only reliable check is to grep the built bundle for the field, not to read
the code.
⚠ `netlify/question-bundles/` is **gitignored** and rebuilt by
`node netlify/build-questions.js` (netlify.toml `command`), so a factory fix
reaches production on the next deploy with no artifact to commit.

### `const _SVG_GRID` declared twice
`subjects/grade5-history/questions/ch08_map_skills.js` (a latitude/longitude
grid) and `subjects/grade6-science/questions/ch05_g6_energy.js` (a national-grid
diagram) both declared it at top level. Question files are plain scripts sharing
**one** global scope, and under `file://` dev `_loadLocal` appends every
subject's files to `document.head` and never removes them — so loading both
subjects in one session (cross-grade search, or just switching subject) threw
`Identifier '_SVG_GRID' has already been declared` and took the second file's
whole chapter with it. Not reachable in prod (questions arrive as JSON) nor
server-side (one `vm` context per subject). The grade-6 one is now
`_SVG_NATGRID`, which is what it actually draws. Verified: both subjects load in
one session, 25 map-skills + 19 energy questions present, no redeclaration.
A scan of all 45 packs found this was the **only** cross-file duplicate.

### `window` was missing from two of the four sandbox contexts
`build-questions.js` has always supplied it (`_withPdfCapture`), but
`netlify/functions/questions.js` and `netlify/lib/questions-sandbox.js` did not
— so CLAUDE.md's claim that the sandbox fix landed "in all three copies" was
only half true: the `STATIC_QUESTIONS`-array half landed, the `window` half did
not. **Measured: 39 `past_paper_*.js` files threw `ReferenceError: window is not
defined`** in those two contexts (grade5-history, grade5-science, grade6-*).

It cost nothing *visible* because the `window.PSAC_PDF_QUESTIONS.push(...)`
block is the last statement in every one of those files, so the practice
questions above it had already been pushed — which is precisely why it survived
this long. Add one push below that block and it disappears silently.

Both contexts now take a `papers` buffer and expose
`window: { PSAC_PDF_QUESTIONS: papers }`.

⚠ **The papers are deliberately NOT merged into `STATIC_QUESTIONS`.** A
past-paper item has no `answer`, and must never reach code that expects to grade
one — `assignment-submit.js` grades through `questions-sandbox.js`, so a leak
there would try to mark an unmarkable question.

Verified by running all 45 packs through both contexts, before and after:
window errors **39 → 0**, practice questions **5535 → 5535 with every
per-subject count identical** (so nothing served changed), and all **162**
past-paper items now captured into the separate buffer. Bundle invariant checked
both directions: 162 papers with **0** carrying an `answer`, and 1023
grade5-maths questions with **0** missing one.

## Pricing: grades 1–2 free, grades 3–9 paid
A permanent rule, deliberately separate from the temporary "everything is free
until <FREE_UNTIL_LABEL>" promotion — one of those ends on a date and the other
does not, so they are stated in two different boxes everywhere they appear.

**`FREE_GRADES = [1, 2]` lives in `engine/helpers.js`** with
`isFreeGrade()` / `isFreeSubjectId()` / `isFreeChapter()`. helpers.js loads 3rd,
so shop.js, admin.js and app.js all see it. `isFreeChapter()` resolves through
`SUBJECT_PACKS` because chapter ids carry no grade (`g5m-…`, `eng-passages`,
`numeration`), and several are not prefixed at all.

⚠ **DUPLICATED in `netlify/functions/questions.js`** (Lambda vs browser, no
shared module — the same standing duplication as the MU day-key helpers). If the
list changes, both must change together or the padlocks the UI draws and the
questions the server releases will disagree.

### Where the rule sits in the order of checks
Above the plan list and above the expiry restriction; **below** moderation.

| Check | Applies to a free grade? |
|---|---|
| account blocked (403) | **yes** — moderation, not pricing |
| `disabled_chapters` / `disabled_subjects` kill switch | **yes** — same reason |
| plan `allowed_chapters` | no — bypassed |
| expired account ⇒ entitlements only | no — bypassed |
| credit shop | not sold at all |

`_planFilter()` in questions.js therefore had to take a **`subjectId`**: a
question object carries `chapterId`, not a grade, and the subject id is the only
thing in the request that says which grade is being served. All five call sites
pass it.

### The shop no longer sells what is already free
`sellableChapters()` / `sellableSubjects()` (shop.js) and
`_allChapters()` / `_allSubjects()` (admin.js) share one predicate: not
`comingSoon` **and** not a free grade. The admin pair matters more than the UI
pair — it is what `publishCatalog()` writes, and what `purchase_chapter()` /
`purchase_subject()` validate against, so a crafted request cannot buy a 30-day
unlock for a grade that is free forever.

### The chapter list was one flat list of 148 rows
That was the whole complaint, and search was the only way through it. Now:
**grade heading → subject (collapsed, with its chapter count) → chapters**.
45 tidy rows instead of 148 loose ones.
- `_shopOpen` (a Set of expanded subject ids) is cleared in **`renderShop()`**,
  not in the toggle — same rule as `_examReviewWrongOnly` and
  `_repShowAllMistakes`, or the shop reopens showing the last visit's state and
  the grouping stops being worth anything. The search box is cleared there too.
- **Search deliberately flattens** to matching chapters: someone typing
  "fractions" wants the matches, not a tree to dig through.
- What the family already holds stays pinned at the top with its remaining days
  — that is what a returning parent opens the tab for, and it must not be buried
  inside a collapsed subject.
- A footnote states why grades 1–2 are absent. A shop that silently omits two
  grades reads as a bug.

### Pages updated
Landing Free/Starter cards and the pricing footnote, the Plans modal (a second,
blue, *permanent* notice under the green dated one), the Shop notice, and the
**grade picker**. ⚠ On the grade picker the availability badge and the price
badge **stack**, because both can be true at once: grades 1–2 are free *and* not
built yet. "Coming Soon" alone hid the pricing rule on the one screen where a
parent chooses a grade; "Always free" alone would promise content that is not
there.

Verified: the real `questions.js` handler driven with a stubbed Supabase —
expired **and** plan-capped, grades 1–2 are served in full while grades 3 and 5
are cut to their entitlements (0); not expired and plan-capped, same result.
In the browser: `_planAllowsChapter()` returns true for a grade-1 chapter on an
expired capped account and false for a grade-5 one; the shop offers grades
[4,5,6] only, opens with 15 collapsed subjects and 0 chapter rows, expanding one
reveals exactly its 6, search flattens to 3 matches; the grade picker shows
exactly 2 "Always free" badges; no element or page overflow at 320–1024px.

## Fractions read as fractions (not "1 slash 5")
`_prettyMath()` already stacked `a/b` over a bar, but two things undid it:
- Its trailing guard `(?![\w\/.])` excluded a following full stop, so a fraction
  at the **end of a sentence** ("Simplify 2/4.") stayed raw while the same
  fraction mid-sentence was stacked. The guard is now `(?=$|[^\w\/]|\.(?!\d))`
  — a `.` only disqualifies when a digit follows it, i.e. the "/5.5" of a
  decimal. Dates (`3/4/2020`) and decimals (`12.5/2.5`) are still left alone.
- It was applied to question text and options but **not** to explanations,
  hints, correct-answer lines, the practice round review or the exam results
  review — every place a child looks *after* getting it wrong. All now go
  through it.

Also: `2 1/2` is marked up as a mixed number (`.frac-mixed`) so it prints tight
like a book, and each fraction carries `aria-label`/`data-tts`. That last one
matters — the stack is a column flexbox, so `innerText` reads "1 5" and the
read-aloud button used to say "one five". `_ttsText()` swaps `data-tts` in on a
clone before speaking. A `□` inside a fraction becomes the word "blank" in the
label **before** the blank-numbering pass runs, or that pass would rewrite it
into markup inside an attribute value.

## My Colours: 12 vibes, theme-aware
`KID_VIBES` went 6 → 12, and each now sets **four** custom properties, not two:
the gradient pair plus `--kid-ink` (readable on white) and `--kid-ink-dark`
(readable on a dark card). Reusing the accent as a text colour is wrong at both
ends — Mango's `#f59e0b` is 2.15:1 on white, Midnight's `#1e40af` is 2.03:1 on
the dark page. All 24 inks were measured; the lowest is 5.02:1.
`--kid-ink-now` resolves the pair once, and everything tinted reads only that.
⚠ Keep the `:root[data-kid-vibe=…]` list in style.css in step with `KID_VIBES`.
⚠ The dashboard hero's Tailwind `bg-gradient-to-br` was **removed**, not kept as
a fallback: the Play CDN injects its `<style>` after the `<link>` to style.css,
so its equally-specific `background-image` won and the vibe silently did
nothing. `.kid-hero` carries its own default. Deliberately **not** applied to
`.kid-tile` — those three tiles' distinct colours are how a child tells them
apart.

## Idle nudge — the shake, extended beyond the first-run tip
`_IDLE_NUDGES` maps a screen to its obvious next action. Sit 15s without a
pointer, key, wheel or touch event and that control gets a small shake
(`.attn-nudge`) plus the existing hint callout. Twice per screen per page load,
then that screen goes quiet. Never during practice or an exam, never while a
modal is open, never in a parent session outside the parent dashboard, and never
when the parent has turned tips off.
- `_showHint(..., { ephemeral: true })` is new: an idle nudge is a reminder, not
  a tutorial step, so it is **not** written to the persisted seen-list.
- The nudge only fires when the target is already in the viewport —
  `_showHint` scrolls to its target, and yanking the page under someone who is
  simply reading is worse than staying quiet.
- ⚠ The "is a modal open" gate must be `div[id^="modal-"].fixed:not(.hidden)`.
  A bare `[id^="modal-"]` also matches `#modal-confirm-msg`, a text div inside
  `#modal-confirm` that is never given `.hidden` — so the plain selector matched
  on every page and the nudge could never fire at all.
- Calm Mode (`.kid-calm`) and OS `prefers-reduced-motion` both drop the motion
  and keep the words.

## Referral CREDITS + the chapter SHOP (`engine/shop.js`)
Replaces the tier ladder that was here before. Invite a family → **their child
answers one practice question** → you earn credits → spend them on 30-day
chapter unlocks. Defaults: **15 credits per activated referral, 250 per
chapter, 30 days** — all three admin-configurable in
`mm_data.shop_settings` (Admin → Content → 🛒 Credit Shop).

**The activation rule IS the anti-abuse design.** A sign-up alone pays nothing;
creating a shell account is cheap, sitting a child in front of it is not. The
award is computed in the database from the student's own session token
(`current_student_id()`), so a browser cannot claim it for an account it does
not hold, and `record_student_activity()` is idempotent — the second and every
later call returns `nothing_pending`.

### Where each rule is actually enforced
| Rule | Enforced in | Not enforced by |
|---|---|---|
| Credits can only be earned | `record_student_activity()` RPC | anything client-side |
| Credits can only be spent | `purchase_chapter()` RPC (reads price + balance server-side, row-locked) | the Buy button |
| A chapter is unlocked | `netlify/functions/questions.js` (service role) | `_planAllowsChapter()`, which is UI only |
| An expired account is restricted | same function | `Auth.isAccessExpired()`, which only picks the wording |

`credit_ledger`, `chapter_entitlements` and `security_events` have **no
insert/update/delete grant at all** for anon or authenticated — stronger than a
policy, because a policy mistake later cannot open a hole that has no grant
behind it. Verified against a real Postgres: a direct insert, update or delete
on any of them from the `authenticated` role returns *permission denied*.

### Expiry became a soft door
An expired account used to be refused at sign-in (`auth.js`, both the parent
and the student path). It now **signs in to a restricted app**, because a
chapter bought with credits outlives the account it was bought on and the family
has to be able to reach what they paid for. `disabled` is still a hard stop —
that is a moderation decision, not a lapsed date.

⚠ The order of the two rules in `questions.js` is the whole feature:
- **expired** ⇒ the allowed list becomes *exactly* the live entitlements, even
  if the plan was unlimited **and even if plan enforcement is switched off**.
- **not expired** ⇒ entitlements are *added* to whatever the plan allowed.
  Never subtractive; buying can only ever give you more.

Both directions, plus blocks, are covered by a harness that drives the real
handler with a stubbed Supabase (10 scenarios, all passing) — including
"expired with no entitlements ⇒ nothing served" and "child expiry counts as well
as parent expiry".

### ⚠ A live privilege-escalation hole was found and closed doing this
`public.profiles` has a table-wide UPDATE grant and policy `profiles_update`
allows `id = auth.uid()` **with no column restriction**. So before this work,
any signed-in parent could run

```js
_sb.from("profiles").update({ role: "admin" }).eq("id", myOwnId)
```

and `is_admin()` — which reads exactly that column — returned true for them
everywhere, including the admin panel and every `is_admin()` policy in the
schema. The same statement cleared their own `expires_at` or `disabled`.
`public.students` was the same shape (`students_parent` is FOR ALL over a
parent's own children), so a parent could clear a child's expiry.

Closed by `guard_profiles_privileged()` / `guard_students_privileged()`,
BEFORE UPDATE triggers that revert privileged columns unless the caller is
already an admin. Two things make that safe:
- In a BEFORE UPDATE trigger the row is not written yet, so `is_admin()` reads
  the **OLD** value — setting `role=admin` in the same statement cannot
  bootstrap past the check.
- The SECURITY DEFINER functions set a transaction-local flag
  (`priv_write_allowed()`) around their own writes, so awarding and spending
  credits still work while a direct PostgREST update does not.

Guarded: `role`, `is_super_admin`, `disabled`, `expires_at`,
`referral_code`, `credits`, `blocked_until`, and `students.expires_at`.

⚠ **Deliberately NOT guarded**, and each for a reason that will look like an
oversight if it is not written down:
- `teacher_status` / `teacher_tier` / `teacher_decided_*` —
  `request_teacher_access()` is SECURITY DEFINER but runs for a *non-admin*
  applicant, so guarding these would silently break every teacher application.
  They are inert alone: `is_approved_teacher()` needs `role='teacher'` too, and
  `role` **is** guarded.
- `students.session_version` — `verify_student_pin()` bumps it on every login
  as an anon caller, so guarding it would freeze the account-sharing guard at
  its first value. Writing it only logs your own child out.
- `profiles.deleted_at` — `delete_my_account()` / `restore_my_account()` are
  the owner's own to use.

### Verified against a real Postgres, not reasoned about
`supabase-credits-shop.sql` was executed twice (idempotent) against
`postgres:16-alpine` with stub tables matching the live column names, then
driven through the whole flow. Confirmed: referral pays 15 only after the child
practises and only once (one ledger row); minting credits, self-promoting to
admin and clearing own expiry are all **reverted and logged** with the exact
columns attempted; direct writes to the three new tables are refused;
purchase refuses an off-catalogue id, honours an admin price change instantly,
and refuses when the shop is closed; re-buying **extends** to 60 days in one
row rather than stacking two.

One real bug that only a live run would have caught: `v_tampered || 'credits'`
on a `text[]` makes Postgres read the literal as an **array literal**, not an
element (*malformed array literal*). It is `array_append()` now.

### The Shop is a PAGE (`#screen-shop`), and it sells subjects too
A modal could not hold 15 subjects and 148 chapters, and a parent wants to come
back to it from the bottom of a long list. Two tabs:
- **Whole subjects** — every chapter of a pack, at `default_subject_price`
  (1500) or a per-subject override. Shows "N already unlocked" so a parent can
  see they are not paying twice for nothing.
- **Single chapters** — as before, with what they already hold at the top and
  its remaining days.

⚠ The page carries a **prominent green notice that everything is already free**
until the free-until date, and that credits are *banked* for later. Without it a
shop reads as a paywall that is not actually there, which would be a straight
lie to a parent.

⚠ Parent-only: `renderShop()` bounces a student session. A child has no balance
of their own and must never be shown prices to go and ask about.

Under the hood there is **no second entitlement mechanism**: `purchase_subject()`
grants an ordinary `chapter_entitlements` row per chapter, so
`questions.js` needs no idea that subjects exist and "is this chapter live" is
still one row lookup. Each chapter extends from its OWN expiry, so buying a
subject over a chapter already held adds days rather than shortening it
(verified: a 30-day chapter became 60 while its siblings got 30).

⚠ Subject buying REQUIRES the published catalogue — the database has no other
way to know which chapters belong to a pack, since they live in the JS
manifests. It refuses with `catalog_not_published` rather than charging for
nothing. `publishCatalog()` now writes `subject` = the **pack id** and
`subjectName` = the display label; they were one field until subjects became
buyable, and conflating them left the database only a display string to group by.

### Credits are visible without opening anything
A `🪙 N credits` chip in the header, next to the branding. Parent sessions only,
and hidden at zero — "🪙 0" is clutter, and the Shop button on the parent
dashboard is the discovery path for someone who has never earned any. Tapping it
opens the Shop.

⚠ Adding it surfaced something that predates credits: `#streak-display` and
`#xp-display` read `DB`, and in a parent session `DB` holds whichever CHILD is
loaded — so a parent had been looking at a streak that was never theirs.
`body.is-parent-session` (set by `_renderCreditChip()`) now hides both for a
parent. One reading of the header per session type, and as a bonus the two
stopped competing for the same row, which is what had pushed the desktop header
onto a second line.

### Logout is the one control that never hides in the menu
`#header-logout-mobile` is a labelled twin of `#header-logout-btn`, shown below
1100px where the pills are hidden. Signing out is what someone on a shared
family phone reaches for in a hurry; burying it two taps behind ☰ made it the
hardest control to find rather than the easiest. It keeps its word for the same
reason the Menu button does — 🚪 alone is a door, not an instruction.
- Both are toggled together by `Auth._setLogoutVisible()` and by `showScreen()`.
  Which of the two is on SCREEN is a CSS decision; those only decide whether
  logging out makes sense at all.
- `_MENU_EXCLUDED` keeps the twin out of the sheet, or there would be two
  identical "Log out" rows in it.

### Re-running supabase-credits-shop.sql BACKFILLS settings
`on conflict (key) do nothing` was wrong the moment this file had a second
version: a database that ran an earlier copy already has a `shop_settings` row,
so `do nothing` skipped it and every key added since stayed missing. It is
`excluded.value || mm_data.value` now — jsonb concat with the RIGHT side
winning, so configured values are kept exactly and only unseen keys are added.
Verified: a row customised to 40 credits / 300 / 45 days / a 999 chapter
override kept all four and gained the six new keys.

⚠ One consequence of the client's null contract, worth not undoing:
`Store.getMyEntitlements()` and `getFamilyEntitlements()` return **null** on
failure, never `[]`. An empty array is a real answer — "this family owns
nothing" — and the caller acts on it by clearing what it has. Conflating a
dropped request with that answer made a flaky network silently re-lock chapters
in the UI.

### Everything about the economy is admin-configurable
Admin → Content → 🛒 Credit Shop. All of it lives in `mm_data.shop_settings`
(admin-only under RLS) and every value is re-read **server-side on each award or
purchase**, so changing one takes effect on the next referral or the next Buy
with no deploy.

| Setting | Default | What it does |
|---|---|---|
| Shop open | on | Closed ⇒ `purchase_chapter()` returns `shop_closed` |
| Earning on | on | Off ⇒ referrals still register but pay nothing; balances and chapters already bought are untouched |
| Credits per referral | 15 | Paid on activation |
| Default chapter price | 250 | Overridable per chapter |
| Default subject price | 1500 | A whole pack in one purchase; overridable per subject |
| Unlock lasts (days) | 30 | Re-buying **extends** from the current expiry |
| Min account age (mins) | 0 | The referred account must be this old before activation pays. ⚠ The referral stays **pending**, so it still pays after the wait |
| Max paid referrals / person | 0 = none | Above it the referral is marked activated with 0 credits — leaving it pending would re-run the check on every question for ever |
| Flag burst above (per hour) | 8 | Writes a security-log row only |

A live line under the fields does the arithmetic an admin actually cares about:
*"At 15 credits per referral and 250 per chapter, a parent needs **17**
successful referrals to unlock one chapter for 30 days."* It reads the FIELDS,
not the saved row, so the consequence is visible before pressing Save — 15
against 250 is easy to set by accident.

Per-account, in the member list: balance, a +/- adjustment with a reason
(`admin_adjust_credits()`, which writes the ledger — there is deliberately no
path that moves credits without leaving a row), a 30-entry ledger view, and
block/unblock.

⚠ The defaults exist in **three** places and all three have to agree:
`SHOP_DEFAULTS` in `engine/admin.js`, `DEFAULTS` in `engine/shop.js`, and the
`coalesce(...)` fallback inside each SQL function plus the defaults row at the
bottom of `supabase-credits-shop.sql`. They are separate because the value has
to be readable before the settings row loads, when the row is missing entirely,
and inside the database with no client involved. The anti-farming knobs are
deliberately **absent** from `engine/shop.js` — the database applies them and a
browser has nothing to do with them, so a copy there would only be a copy to
drift.

Verified against a real Postgres, one scenario per knob: earning off pays 0 and
the referral stays pending; turning it on pays the same child; 15→40 takes
effect on the next referral; `min_account_age_minutes=60` refuses a
minutes-old account as `account_too_new` and **still pays once the requirement
is dropped**; `max_credited_referrals=3` pays 0 on the fourth and logs
`referral_cap_reached`; a hand adjustment writes `admin:<reason>` to the ledger.

### Suspicious activity
`security_events` is written **by the database and the questions function**,
about what they were actually asked to do — blocked privileged writes,
off-catalogue purchases, runs of insufficient-funds attempts, referral
activation bursts. Admin → Content → 🛡️ Security log shows them with Block 1h /
24h / Unblock (`admin_block_user()`), and a block makes `questions.js` return
**403** rather than an empty subject.

⚠ Entries prefixed `client:` come from `flag_security_event()` and are **hints,
not evidence** — a real attacker simply does not call it. The one client
detector that exists compares the cached entitlement list against the server's
and reports ids the server does not know about; it catches the casual
localStorage edit and nothing more. Never build enforcement on a `client:`
event.

A referral burst is **flagged, never auto-blocked**: a genuinely popular
referrer looks exactly like a farm for the first few hours, and locking one out
is worse than reviewing them.

## Two panels of suggestions became two buttons

Reported as: *"when we go in chapter practice, the scheduler suggestion may
confuse the kid."*

The dashboard carried **two full schedule panels** — `#dash-today-plan`
(`Calendar.renderTodayPlan`) and `#dash-schedule` (a 14-day outlook, four rows).
Both sat between the greeting and the chapter tiles, on the screen a child
reaches *immediately after tapping a subject in order to practise*. The first
thing under their name was a stack of suggestions about something else.

Both are now one small button with a count and a one-line summary, on the kid
home **and** the dashboard:

```
🗓️ Today's plan  ②          ⏸ Pick up again  ③
Maths · Science             2 chapters · 1 exam
about 25 min                Tap to choose
```

⚠ Nothing was deleted. `renderTodayPlan()` and `renderDashSchedule()` still
exist and still work; the dashboard simply stopped calling them and their
containers stay `hidden`. The full detail is one tap away on the Schedule
screen, which is where a child goes when they actually want to know what is
planned.

### "Pick up again" (`#modal-resume-tasks`)
A sheet listing everything the CHILD paused — a half-finished exam, and any
chapter left mid-round via "Continue Later" — each with **Continue →** and a ✕
to drop it. The old resume banner showed only the most recent item and reported
the rest as dead text (*"+ 2 more paused chapters — see Chapter Practice"*),
which named a screen rather than offering the thing.

⚠ Parent assignments are deliberately **absent** from this list. Work somebody
else set is not work you postponed, and piling the two together is how the old
panels became noise in the first place. The assignments banner is untouched.

⚠ Chapter names are resolved across **all** packs, not `CHAPTERS`: that global
holds only the ACTIVE subject, and a child can have chapters paused in three
subjects at once.

### Empty states
- Nothing planned **and** nothing paused ⇒ the whole row renders as `''`. Two
  empty boxes explaining their own emptiness is worse than no boxes.
- Sheet with nothing in it ⇒ "✅ All caught up! Anything you pause with
  'Continue Later' shows up here" — which also teaches the feature.

### Painting order
`_renderTaskButtons()` paints synchronously from the resume store (localStorage,
instant), then fills the plan half when `Calendar.getUpcoming()` resolves. A
child should never watch a spinner where a button is about to be.

Verified at 360–1440px: buttons fit, side by side from 480px and stacked below,
sheet lists exam + chapters with correct positions ("Question 5 of 10"), ✕
updates both the sheet and the badge, and both schedule panels stay hidden.

## ⚠ Two navigation bugs a student reported, both real

### 1. "I clicked a subject and maths material loaded"
Not a loading race and not an id collision (all 130 chapter ids across the 15
packs are unique — checked). Two independent defaults, both maths:

- **`CHAPTERS` shipped full of Grade 5 Maths.** It is the global every screen
  renders from, declared `const CHAPTERS = [ …18 maths chapters… ]` in
  `subjects/grade5-maths/_manifest.js` and only mutated in place later by
  `activateSubjectPack()`. Until a subject was activated, every screen reading it
  showed Grade 5 Maths — to a Grade 4 child, inside Science, whatever they had
  actually tapped.
- **`_activePack()` fell back to the first registered pack**, which is
  **grade4-maths**. So the breadcrumb, syllabus, `packBadges()` and `_ttsLang()`
  all answered for Grade 4 Maths at the same moment.

Measured at boot before the fix: `CHAPTERS` = 18 Grade **5** Maths chapters,
`_activePack()` = grade**4**-maths. The app was showing two *different* maths
subjects at once.

**Fixed:** the global starts `[]` (the pack's own chapters moved to
`G5M_CHAPTERS`, which `registerSubject` copies as before), and `_activePack()`
returns null when nothing is chosen. ⚠ The `const CHAPTERS` declaration stays in
that manifest at that point in the load order — app.js references it at top level
and the manifests load first (see the load-order note above). Only its initial
contents moved.

⚠ A guess dressed as an answer is worse than no answer. Every caller already
handled null (`(p && p.badges) || []`), the chapter grid has a real empty state
pointing at the Subjects screen, and `_activeSubjectLabel()` now says
"your subject" rather than defaulting to "Maths".

### 2. "Suddenly his view switched to parent view"
A shared family phone holds BOTH a parent Supabase session and a child PIN
session. `init()` checked the parent's first and `return`ed, so **every reload
threw the child into the parent dashboard** — and in the PWA that fires on every
cold start, not just a refresh. `onAuthStateChange`'s `INITIAL_SESSION` did the
same thing a moment later.

Neither session expiring is the right signal — both are long-lived by design.
`_markActiveMode()` records who most recently signed in **on purpose**: a student
PIN login, landing on the parent dashboard, and `exitParentMode()` handing the
phone back. ⚠ Never on a restore, or every reload would re-crown the parent and
the bug would come straight back.

⚠ With no record at all (every account predating this), a stored **student**
session wins: it is created only by an explicit PIN login on this device and is
explicitly cleared when the parent logs out, so it says far more about who is
using the device than a Supabase session that may have sat in localStorage for
weeks.

Verified all three states with both sessions present: no record → child;
last was student → child; last was parent → parent.

## Breadcrumbs, and getting back to the grade picker
`studentScreens` omitted **subject-select, grade-select, results and
past-papers** — the subject picker being where a child LANDS, and results being
where they end up after an exam. Both showed no trail at all. All four are in
now, and the grade crumb links to the grade picker when more than one grade
exists (the same reachability the "← Back to Grades" button on the subject
picker already had, so nothing new is opened).

## Quick sign-in: a PIN and nothing else
A returning child had to type the family name, their username *and* a PIN, on a
phone their family had used for months — and `Auth.loginStudent()` (tapping your
own face on the student picker) prefilled only the username, leaving the family
name blank, so tapping your own card still meant typing the field you are least
likely to get right.

The device now remembers, per child, the **family name and username** —
`psac_known_students`, capped at 8. ⚠ Never the PIN: that is the credential, and
`verify_student_pin()` still checks it in the database exactly as before. This
removes typing, not a security step.

`loginStudent()` prefills both and collapses the form to *"👋 Welcome back,
Kavya — just type your PIN"*, with a "Not you? Sign in another way" escape.
⚠ The two fields are **hidden, not emptied** — `checkStudentReady()` and
`studentSignIn()` still read them, so the sign-in path is untouched. Quick mode
is entered only via `loginStudent()`, which knows who is signing in, and
`setRole()` clears it: tapping the Student tab directly is the generic route and
must not leave the previous child's name above a PIN box.

Verified: four digits alone enable the button; the escape hatch and the Student
tab both restore the full form.

## Grades 1-9: the plumbing, ahead of the content

The app was Grades 4-6. All nine grades are now **registered**; the thirty new
packs are `comingSoon: true` placeholders with no content. Nothing else has to
be edited when one of them is filled in.

### What was actually grade-coupled — it was very little
`renderGradeSelect()`, `renderSubjectSelect()`, `assembleExamPaper()`, the admin
Content tab and the shop catalogue all derive grades from `SUBJECT_PACKS` at
runtime, so a registered pack reaches every one of them for free. Six things
were not:

| | Was | Now |
|---|---|---|
| `classrooms_grade_level_check` | `ARRAY[4,5,6]` | `BETWEEN 1 AND 9` — `supabase-grades-1-9.sql` |
| 4 grade `<select>`s in `index.html` | hand-written `<option value="4/5/6">` | generated by `_populateGradeSelects()` |
| `netlify/build-questions.js` | `for (const grade of [4, 5, 6])` | grades discovered from `subjects/` |
| `netlify/import-questions.js` | same | same |
| manifest `<script>` tags | 15 | 45 |
| `LOCAL_FILES` (file:// dev only) | 15 packs | 45 packs, `_CACHE_VERSION` 13 → 14 |

`students.grade` and `questions.grade` are plain unconstrained integers, so the
database needed **one** constraint changed. That is also why the parent-facing
dropdowns, not Postgres, are what stop a child being enrolled into an empty
grade.

### ⚠ Two dropdown modes, and the difference is the point
`_populateGradeSelects()` fills anything carrying `data-grade-select`:
- **`"live""** — only grades with at least one pack that is NOT `comingSoon`.
  These are the **parent-facing** ones (family setup, add child). Enrolling a
  child into a grade with no content gives them a screen of "Coming Soon" cards
  and nothing to do, which is worse than not offering the grade. This list opens
  by itself the moment a pack flips to `comingSoon: false` — there is no second
  place to edit and no migration.
- **`"all""** — every registered grade. These are the **authoring** ones (admin
  question filter and question form): you have to be able to file a question
  under Grade 2 before Grade 2 opens to anyone.

⚠ **It runs twice, and the second run is not belt-and-braces.** The `<script>`
tags sit in the middle of `<body>`, so `#modal-qm-form` — which holds
`#qmf-grade` — has not been parsed when `app.js` executes. Filling only at that
point left the admin question form with a **completely empty** grade dropdown
(measured: 0 options) while `#qm-grade` higher up the document filled correctly.
`DOMContentLoaded` catches the rest.

### What makes an empty pack safe to ship
`comingSoon: true` is load-bearing, not cosmetic: `activateSubjectPack()` refuses
the pack (returns null), `QuestionLoader.loadForStudent()` filters it out of the
per-grade fetch, and `renderGradeSelect()` renders the card disabled with a
"Coming Soon" badge. Belt and braces on top: the one placeholder chapter carries
`examWeight: 0`, and each pack's `SYLLABUS` map is `{}` — an id declared there
with no questions behind it would advertise a sub-topic that opens empty.

Each placeholder pack is one `_manifest.js` + one `questions/ch01_sample.js`
holding a single obviously-fake MCQ, so the file shape is copyable. The manifest
header carries the fill-in checklist.

### ⚠ Registering 30 empty packs put an empty pack up for sale

`comingSoon` had only ever been set on a pack that did not exist yet, so most
code that walks `SUBJECT_PACKS` had never had a reason to check it. Registering
thirty of them at once found seven places that did not, and one of them reached
the database:

| Where | What it did |
|---|---|
| `Shop.sellableChapters()` / `sellableSubjects()` | offered "Grade 1 Maths · Sample Chapter" at 250 credits, and the whole of Grade 1 Maths at 1500 |
| `admin.js _allChapters()` / `_allSubjects()` | ⚠ **Publish catalogue** writes these into `mm_data.shop_settings.catalog`, and `purchase_subject()` validates against exactly that — so the empty packs would have become genuinely buyable **server-side**, where no client fix could reach them |
| admin plan chapter picker | let a plan "allow" chapters that do not exist |
| `calendar.js _subjectsForGrade()` | timetable generator offered placeholder subjects with an hours-per-week box |
| `search.js _fillSubjectFilter()` | 9 optgroups and 45 subjects, 30 of which can never match anything |
| `app.js _subjectChips()` | one chip per pack — 30 grey "not started" chips on every child's card |

All seven filter `!p.comingSoon` now.

⚠ **Two places deliberately do NOT filter, and must not start:**
- `renderGradeSelect()` / `renderSubjectSelect()` — showing the card *is* the
  feature; they render it disabled with a "Coming Soon" badge.
- The admin **Content** kill switch — it has to be able to reach every
  registered grade. A grade whose packs are all `comingSoon` now carries a
  "No content yet" badge instead, so an unlabelled "Grade 1" row does not read
  as live content.
- The admin **question manager** cascades (`qm-*` / `qmf-*`) also stay
  unfiltered: you have to be able to file a question under Grade 2 *before*
  Grade 2 opens.

**The rule for the next pack:** anything that builds a list a PARENT or CHILD
sees filters `comingSoon`; anything an ADMIN authors with does not; and the two
grade pickers show them on purpose.

### The PSAC years are separated from the NCE years wherever grades are listed

Grades 1-6 end in the **PSAC**; grades 7-9 end in the **NCE** — a different
exam, a different syllabus and (once filled in) a different subject list. Nine
cards in one flat run invites a parent to read “Grade 8” as more of the same
PSAC preparation.

`_gradeStage(grade)` in `app.js` is the **single** definition of the boundary
(`_PSAC_MAX_GRADE = 6`), exported on `window` for `admin.js`. Three surfaces use it:

| Surface | Split |
|---|---|
| Grade picker (`renderGradeSelect`) | a full-width divider row: **Primary · PSAC** then **Lower secondary · NCE** |
| Grade dropdowns (`_populateGradeSelects`) | `<optgroup>` “Primary (PSAC)” / “Lower secondary (NCE)” |
| Admin → Content, subjects by grade | a stage heading above the first grade of each stage |

⚠ **Headings appear only when BOTH stages are on screen.** The parent-facing
dropdowns offer 4-6 alone today, so a lone “Primary” optgroup would be labelling
the only thing there. `renderGradeSelect` shows both because all nine grades are
registered.

⚠ **The divider uses an inline `style="grid-column:1/-1"`, NOT Tailwind’s
`sm:col-span-2`.** The Play CDN generates rules from the classes it finds in the
document, and this markup is injected by `innerHTML` long after its initial
scan: the class landed in the attribute and no rule was ever produced. Measured
at 768px and 1440px, the heading rendered **328px wide inside a 672px
two-column grid** — sitting in one column with a grade card beside it. Asserting
that the class is present passes either way; only measuring the WIDTH catches
it. Verified after the fix: heading width equals grid width at 320/390/768/1440.

Not split, because there is nothing to split yet: the **Shop** lists only
non-`comingSoon` subjects, which are 4-6, so no NCE row can appear there until a
grade 7-9 pack goes live. Same for the search filter and the plan chapter
picker. Each already sorts by grade, so a stage header can be added with the
same `_gradeStage` helper when it becomes visible.

### Landing-page copy: every coverage claim stays at 4-6
The home page now announces the expansion without promising it. **Grades 4-6
remains the "covered" claim everywhere** — the subject cards, the free-plan
bullet, the header tagline, the auth subtitle and the share text are all
unchanged, because that is what a child can actually practise today.

What was added: a sixth card in the subjects grid (“More grades · Grades 1-3 ·
Grades 7-9”) carrying the same **Coming Soon** badge the in-app grade picker
shows, one sentence in the section subtitle, one in the info-page header, and a
parenthetical in the footer.

⚠ **No subject list is promised for 7-9.** The five subjects registered there
are a placeholder copy of the primary five and are not confirmed against the MIE
lower-secondary syllabus, so the card says only that those grades are being
built. Do not "tidy" it into "five subjects, Grades 1-9".

### ⚠ Before ANY of these packs is filled in
- **The manifest `<script>` tags must become a lazy per-grade load.** They are
  blocking scripts on every page start. The 15 live packs are ~200 KB; the 30
  placeholders are ~2 KB each and cost nothing today, but a filled pack averages
  ~13 KB of manifest. At 45 real packs that is ~600 KB parsed before `app.js`
  runs, on the cheap Android phones this codebase already had display problems
  on. A child only ever needs their own grade.
- **Grades 1-2 need a picture-first question mode.** The renderer assumes the
  child can read the question and all four options; read-aloud speaks the
  question *only, not the options* (documented as accepted). That is a renderer
  change, not a content one.
- ⚠ **Grades 7-9 are not PSAC.** Lower secondary ends in the **NCE**, and the
  app is called "PSAC Exam Practice" ("PSAC" appears 18× in `index.html`, 16× in
  `app.js`), serves PSAC past papers, and stamps `curriculum: 'MIE Mauritius'` on
  every pack. The five subjects registered for 7/8/9 are a **placeholder copy of
  the primary five** — the real MIE lower-secondary list differs. Confirm it
  against the MIE syllabus and add or remove packs before writing any questions.
  Every 7/8/9 manifest says so in its own header.

### Verified
Headless Chrome, service worker bypassed, hard reload: 45 packs, grades
`[1..9]`, live `[4,5,6]`, 30 `comingSoon`; the grade picker renders 9 cards with
exactly 6 disabled and labelled "Coming Soon", and clicking a disabled card does
not navigate; `activateSubjectPack('grade1-maths')` returns null and leaves
`CHAPTERS` empty; no placeholder question reaches `STATIC_QUESTIONS`; parent
dropdowns offer 4/5/6 and admin dropdowns offer 1-9 with the "All grades" row
kept; zero exceptions. After the comingSoon audit: Shop offers 148 chapters and 15
subjects with **0** placeholders leaked, the search filter shows 3 grade groups
and 15 subjects with 0 leaked, the parent card shows 15 chips not 45, and the
timetable generator says "No subjects found for this grade." for a Grade 1 child
while still showing all five for a Grade 5 one. `netlify/build-questions.js` builds all nine grades
(grade1-3 and 7-9 at 5 placeholder questions each; 4/5/6 unchanged at
1,344 / 2,388 / 1,773).

`supabase-grades-1-9.sql` executed against `postgres:16-alpine` with the
constraint exactly as deployed: before, a Grade 2 classroom was refused; after,
grades 1-9 and NULL insert and grades 0 and 55 are still refused; applying it
twice is silent; the pre-existing Grade 5 row survived.

## ⚠ The browser crash: an unbounded retry in `startChapterDirect`

Reported as: *"a few times when I switched to student view, entered the PIN and
started browsing, suddenly my browser crashed."*

Not the switch modal. Tapping a **chapter** whose questions were not in the pool
put the app into a tight infinite loop:

```js
const hasQs = STATIC_QUESTIONS.some(q => q && q.chapterId === chapterId);
if (!hasQs && …) {
  toast('⏳ Loading questions…', 2000);
  QuestionLoader.loadSubject(ACTIVE_PACK.id)
    .then(() => startChapterDirect(chapterId, forceDiff));   // ← no bound
  return;
}
```

`loadSubject()` short-circuits on its `_done` set, so the retry's call
**resolves instantly having done nothing**. `hasQs` was still false, so it
recursed through resolved promises as fast as the event loop would go — each
pass scanning ~5,400 questions and firing a toast.

Measured against the real pre-fix `app.js` in headless Chrome, with a hard cap
so the demonstration could not hang the tab: **20,000 iterations and 20,000
toasts in one second**, still going when the cap stopped it. That is a pegged
CPU and a dead tab.

It is now **one** retry, then a real message ("These questions could not be
loaded. Check your connection, or ask your parent whether this chapter is
unlocked.") and a console warning naming the chapter and the subject.
`_attempt` is an internal third argument; every call from markup passes two, so
the public signature is unchanged.

### Three ways the pool ends up empty — all of them fixed too
A bounded retry stops the crash. It does not stop the child being handed an
empty subject, and each of these was a live route to one:

- ⚠ **A failed load counted as a successful one.** `loadSubject()` added the id
  to `_done` *before* awaiting, and never removed it. `_loadFromAPI()` returns
  quietly on a non-2xx, on a fetch error, **and when no auth header is available
  yet** — a real race on login, and exactly what a stale service-worker shell
  produces (401 until it reloads; see the `X-Student-Token` rollout note). One
  such miss marked the subject permanently loaded with **zero** questions for
  the rest of the session. `_loadFromAPI`/`_loadLocal` now report success, and
  `loadSubject` rolls `_done` back when they did not. ⚠ "The server says you get
  nothing" stays `true` — that is a final answer, and retrying it would be a
  request per tap for ever. Only "we never managed to ask" is retried.
- ⚠ **An empty payload was cached for seven days.** A subject can legitimately
  answer with nothing — every chapter plan-gated, or an expired account with no
  entitlements — and `_writeCache`/`_readCache` treated `[]` like any other
  payload. The child then got an empty subject for a week, with nothing on
  screen explaining it and no recovery even after the parent bought the chapter.
  `[]` is now neither written nor read back as a hit. The cost in the other
  direction is one extra request per subject load for a family entitled to
  nothing — much the cheaper mistake.
- **The server and the client disagreed about the chapter.**
  `_planAllowsChapter()` is UI-only; `netlify/functions/questions.js` is the
  enforcement, and it also filters `disabled_chapters` and `disabled_subjects`.
  A chapter the client offers and the server withholds lands in exactly this
  branch, which is why it needed a real message rather than a retry.

⚠ `_CACHE_VERSION` 12 → 13, to purge caches already poisoned with an empty
payload on devices in the field. Without the bump those families keep the empty
subject for up to a week after this deploys.

### Verified
Pre-fix build (the real `app.js` with only the bound removed, served as its own
page): 20,001 iterations in 1,000ms, capped. Post-fix: exactly **one**
`loadSubject` call, two toasts, settled well inside 1,500ms, tab responsive,
zero exceptions. Plus: an empty cache entry is purged rather than served, and
the no-auth path now leaves the subject retryable.

## ⚠ Progress stopped reaching the server — "56 done" never moved

Reported as: *"I see for eg Science and there is a badge (56 done), student did
some more work and it is still at 56."*

The badge was right. `renderSubjectSelect()` sums `DB.chapters[id].attempted`
over the pack's chapters and `showScreen()` re-renders it on every visit, so
**within a session the number did climb**. What was frozen was the copy in
Supabase, which is what the next login reads back.

### The debounce had no maximum wait
`Store.saveStudentProgress()` wrote localStorage synchronously and batched the
Supabase write behind a 30-second `setTimeout` — and **cancelled and
rescheduled that timer on every single answer**. A child answering a question
every twenty seconds reset it every twenty seconds, so it never fired. Measured
against the real `store.js` with a fake clock: **fifteen answers over five
minutes produced zero writes.**

The only thing that ever got through was `immediate: true`, and there is
exactly one such call in the whole app — exam submit (`app.js`). Practice,
which is most of what a child does, had no path to the server at all except an
accidental 30-second pause.

It is a **throttle** now, not a debounce: `_pendingSince` records when the
oldest un-flushed change arrived, and once `_SAVE_MAX_WAIT_MS` has passed the
next answer flushes instead of rescheduling. Same write rate as intended
(~one per 30s), but it actually happens. The timer is still there and still
matters — it is what flushes the **tail** once practice stops.

### Ending the session deleted the write instead of sending it
`saveStudentSession()` and `clearStudentSession()` both called
`_cancelPendingFlush()`. So logging out — the normal end of a session — threw
the pending write away, and so did switching to another child.

All three now flush first:
- `clearStudentSession()` / `saveStudentSession()` issue the write **before**
  touching the stored session, because `_flushProgressToSupabase` checks the
  stored session id against the row it is writing and the installed
  `x-student-token` is still the outgoing child's. The request is in flight by
  the time the header is removed.
- ⚠ `endStudentSession()` **awaits** the flush before the RPC. That RPC deletes
  the student's sessions, after which `current_student_id()` is null and RLS
  refuses every write — and `Auth.logout()` calls it *first*, so it is the last
  moment anything can still be saved.
- `_cancelPendingFlush()` still exists but now genuinely means discard; nothing
  in the session path calls it any more.

### Nothing was listening for the tab closing
No `beforeunload`, `pagehide` or `visibilitychange` handler existed. Closing
the tab, locking the phone or the OS evicting a backgrounded PWA killed the
timer silently. Both `visibilitychange → hidden` and `pagehide` now flush —
`hidden` is the one that fires reliably on mobile Safari and Chrome;
`beforeunload` does not. Fire-and-forget by necessity: a write that sometimes
lands beats one that never does.

### ...and the next login overwrote the local copy with the stale one
`loadStudentProgress()` took the server row and then wrote it back over
localStorage. So one lost write was not "lose the last 30 seconds" — it was
**permanent**, because the newer local blob was destroyed on the next sign-in.

It now keeps the cache when `stats.totalAttempted` is higher there than on the
server. Deliberately a comparison and not a merge: total answers only ever goes
up, so a server row behind the cache is a strict ancestor of it and has nothing
to merge back. `assignments` stay special-cased, because those the **parent**
writes server-side and the child's cache may never have seen them.

### Verified
13 assertions driving the real `store.js` in a `vm` context with a stubbed
Supabase and a fake clock, then the same suite against a reconstruction of the
pre-fix code. Before: **6/13**, with steady practice reaching the server zero
times, logout and child-switch both discarding the pending write, and a local
cache 120 answers deep overwritten by a 100-answer server row. After: **13/13**,
and no work sits un-flushed for more than ~60s of practice.

⚠ A second, narrower reason a subject tile can legitimately not move:
`recordAnswer()` returns early for `ASSIGNMENT_MODE` (the **teacher/guest**
flow) before touching `DB.chapters`. The parent-assignment flow goes through
ordinary practice and does count.

## "Student view" is a PIN pad, not the login screen

Tapping **👦 Student view** on the parent dashboard dropped the parent on the
full sign-in screen, where the family name and the child's username had to be
typed again — on a device where the parent was already signed in and the app
knew every child in the family by name.

`switchToStudentSelect()` now opens `#modal-student-switch`: a chip per child
(avatar over name) and a 4-digit pad that auto-submits on the fourth digit.

- ⚠ **No auth logic lives in the modal.** Picking a child fills the same three
  fields the sign-in screen uses and the pad calls the same `studentSignIn()`,
  so `verify_student_pin()`, the attempt lockout, the session minting and the
  `session_version` bump are all shared. It is an input surface.
- ⚠ **`_showAuthError()` is routed into the modal while it is open.** The auth
  screen is not on screen, so the wrong-PIN message — the one thing the modal
  most needs to show — would otherwise be written somewhere nobody can see.
- **Children come from `_familyStudents`**, falling back to the
  `psac_known_students` roster, and only rows carrying *both* a username and a
  family name qualify. Nothing to list ⇒ the full sign-in screen, unchanged.
  One child ⇒ auto-selected, but the chip still renders: it is what tells them
  whose PIN is being asked for.

### ⚠ Where the device stops belonging to the parent
`_parentProfile = null` moved **out of `switchToStudentSelect()` and into the
`navigate` branch of `_loginStudentRow()`**. Clearing it before the attempt
strands a parent who mistypes: the profile is gone, the PIN was rejected, and
there is no parent session left to go back to. It must happen only once the PIN
has actually been accepted. `pdSwitchStudent()` passes `navigate:false`
precisely because it is the parent *previewing* a child and must stay a parent.

`_parentUser` is still deliberately kept — see the `_submitParentPin` comment.

**Success is a counter (`_handovers`), not "`_parentProfile` went away".** Null
is also the state when no parent was signed in to begin with, which would read a
rejected PIN as a success and close the modal on a child who never got in.
`ACTIVE_STUDENT_ID` is no good either: `pdSwitchStudent()` has usually already
set it to this very child so the Controls tab has something to read.

### Verified
Headless Chrome at 390×844 and 1440×900, service worker bypassed, hard reload:
no children ⇒ full screen; two children ⇒ two chips, none preselected; a digit
before a child is chosen is refused; picking fills family/username and clears
the PIN; dots fill `1000`→`1100`→`1110`, backspace and clear step back;
switching child mid-entry resets the digits; Escape and the backdrop close it;
physical-keyboard digits reach the pad; a rejected PIN keeps the modal open with
the error **inside** it, resets the dots, clears the PIN field and leaves the
parent where they were; a child name of `<img src=x onerror=…>` renders as text
(0 `<img>` elements, no execution); one child auto-selects; 320px box on a
390px viewport with no horizontal overflow. Zero exceptions.

⚠ **Do not point the probe at a real family.** Four digits against a username
that exists is a real failed login: it increments `pin_attempts` and can trip
the server-side `pin_locked_until`. Use a username nobody owns.

## ⚠ The parent PIN could be set once, by accident, and never changed

`_promptSetParentPin()` was the **only** caller of the setup modal. It ran once,
from `_openParentDashboard()`, on a 1.8-second delay — and its first line is
`if (_getStoredPinHash()) return;`. So:

- **Dismiss that one prompt** and there was no way to set a PIN, ever. The
  parent then had to sign in with email and password every single time they
  switched back from a child's view.
- **Set one** and there was no way to change it, and no way to remove it. A PIN
  a sibling watched you type was permanent.

There was no PIN control anywhere in Account & Settings, the parent dashboard,
or the admin panel — checked.

**Now:** Account & Settings → Security carries a **Parent PIN** row with
*Set a PIN* / *Change* and *Remove*, and copy that reports the real state.

- `_promptSetParentPin()` keeps its once-only guard — that is the first-run
  nudge and it should stay a nudge.
- `openParentPinSetup()` is the new unguarded entry point, and the two now share
  `_showPinSetupModal()` rather than the modal living inside the prompt's
  `setTimeout`.
- The two-step confirm flow is unchanged, so changing a PIN is the same
  enter-twice interaction as setting one.

⚠ **The PIN is BROWSER-LOCAL** (`localStorage`, `psac_parent_pin_v1`), not an
account setting — it guards the switch back to the parent dashboard on the phone
or tablet a family shares. The row says "on this device" for that reason: a
parent who sets it here and later opens the app on their laptop will be asked
for their password there, and should not be surprised by that. It is also why
the row is filled by `_renderParentPinRow()` after render rather than baked into
the settings template with the account-level sections.

⚠ **“Device” was the wrong word, and it cost a real support question.**
`localStorage` is scoped to the **origin** (scheme + host + port) and to the
browser profile — not to the device. A parent who set a PIN while testing on a
branch/preview deploy URL and then opened production was asked to create one
again, with copy that said it was already set “on this device”. Switching
browser, opening a private window, or Safari deleting script-writable storage
after 7 days without a visit all do the same thing.

All user-visible copy now says **“in this browser”** — the Settings row in both
states, the Remove confirm and its toast, and the two expired-session messages.
The setup modal says it **up front** (“Saved in this browser only — on another
browser or device you will sign in with your email”) rather than only in
Settings afterwards: learning it when the PIN silently stops working is worse
than reading one line while choosing it.

⚠ It is a convenience, not a second factor. It gates a UI switch; it cannot mint
a Supabase session, which is why an expired session still asks for the password
even when the PIN is correct (see the PIN section above).

Verified: opens when unset **and** when already set (the old blocker), the row
flips between "Set a PIN"/"Change" with Remove appearing, changing to a new PIN
stores the new hash and stops matching the old one, and Remove reverts it.

## ⚠ The student token was attached to the parent’s own token refresh

Reported as: *“Your parent sign-in has expired on this device. Your PIN was
correct — but signing in again needs your email and password.”*

That message is the honest one: `_sb.auth.getSession()` really did return null.
The question was why, on a device the parent had signed in on and never signed
out of.

`_sbFetch` in `engine/supabase.js` attached `x-student-token` to **every**
request the client made — including `POST /auth/v1/token?grant_type=refresh_token`.
Measured by intercepting `fetch`: one `refreshSession()` call produced **eight**
refresh attempts, every one carrying the header.

`x-student-token` is not a CORS-safelisted header, so adding it turns the
refresh into a **preflighted** request — the browser sends `OPTIONS` first and
proceeds only if GoTrue answers with that header in `Access-Control-Allow-Headers`.
PostgREST is configured to accept it (that is how student sessions work at all);
the auth service is a different service with its own CORS configuration and no
reason to know about it.

The failure is silent and delayed, which is what made it hard to see. Nothing
goes wrong while the access token is valid. About an hour after a student token
is installed on the device — i.e. after switching to student view and browsing
for a while — the parent’s session tries to refresh, cannot, is retried, and is
dropped. The next 🔒 Parent + correct PIN then finds no session.

⚠ **This is the real cause of BOTH parent-PIN reports.** The `!_parentUser`
guard fixed above was a genuine second bug on the same path, and fixing it made
the message accurate — but it was demonstrated against a constructed session,
not against this one. A correct message for a session that should never have
been lost is not a fix.

`_sbIsAuthRequest()` now keeps the header off `/auth/v1/`. Deliberately a
**deny-list on the auth path rather than an allow-list on `/rest/v1/`**: every
other route the client may use keeps behaving exactly as it does today, and only
the one that was broken changes. An unparseable target is treated as auth —
being wrong that way costs a student request its token, which fails loudly and
locally; being wrong the other way costs an hour-later session loss.

Verified by intercepting `fetch` with a token installed: **0 of 8** auth
requests carry the header, **5 of 5** PostgREST requests still do (including
`rpc/verify_student_pin`). `SHELL_VERSION` v21 → v22 — without it a cached shell
keeps the old client.

## ⚠ The parent PIN locked parents out of their own dashboard

Reported as: *"I login as student and click parent mode, I get a PIN to enter,
when I enter the PIN it says no parent has currently signed in on this device —
and this is false as I have only 1 device."*

It was false, and the app had every piece of information needed to know that.

`switchToStudentSelect()` ("Student view") does two deliberate things, each with
its own reason:
- **clears `_parentProfile`**, so `_isParentSession()` is false and the
  `_KID_ONLY_SCREENS` guard does not bounce the child off their own screens;
- **keeps `_parentUser`**, so `onAuthStateChange` does not re-fire
  `_handleParentSessionGated` in the middle of the child's session.

Its own comment states the contract: *"enterParentMode() restores
`_parentProfile` via `_handleParentSession()` when the parent wants to come
back."* `enterParentMode()` honours it — it checks `if (session)` and nothing
else. `_submitParentPin()` did not:

```js
if (session && !_parentUser)   { await _handleParentSession(session); }  // skipped: _parentUser IS set
else if (_parentProfile)       { _openParentDashboard(); }               // skipped: cleared on purpose
else                           { "No parent account is signed in ... yet" } // ← a live session lands here
```

So the one state the app deliberately creates — live session, `_parentUser` set,
`_parentProfile` cleared — was the one state that fell through to the error. The
failure only appeared on devices that had a PIN set, because without one
`enterParentMode()` never reaches this function.

**Fixed:** a live session is used regardless of `_parentUser`. Demonstrated
rather than reasoned about — the same scripted journey (sign in as parent →
Student view → set PIN → 🔒 Parent → correct PIN) returns
`dashboardRestored: false` with the old guard and restores the dashboard with
the new one.

⚠ **The message was unconditionally wrong, too.** `_submitParentPin()` is only
reachable through the PIN modal; the modal is only shown when
`_getStoredPinHash()` is non-null; and that hash exists only because a parent set
it **on this device**. "No parent account is signed in on this device *yet*"
therefore could never be true at that point. For the genuine expired-session case
it now says the session expired and that email sign-in is needed — and still does
not navigate while a child is signed in, so their place is kept.

## ⚠ The forum is for parents and teachers — and it was wide open

Asked for as "children don't need access to the forum". The button was the
smallest part of it. What was actually true:

- `posts_read` / `replies_read` were **`USING (true)`** — not "any signed-in
  user", but **anyone holding the public anon key**, which is in the page
  source. A child, and an unauthenticated stranger, could list every post.
- `posts_insert` / `replies_insert` allowed
  `current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL`, so a signed-in
  child could post and reply — and `forum_posts` carries an
  `author_student_id uuid DEFAULT current_student_id()` column built for exactly
  that.

### The half that counts: `supabase-forum-adults.sql`
Reads and writes now require `auth.uid()`. A student session is anon plus an
`x-student-token` header and has no `auth.uid()`, so it is excluded **by
construction** rather than by a check somebody has to remember to write.

Insert also gained `author_id is null or author_id = auth.uid()`: without that
half, any signed-in adult could post under someone else's id simply by sending
one.

⚠ Existing student-authored posts are **not** deleted. They stay, adults can
still see them, and the delete policies are deliberately untouched so an
administrator can tidy up. Removing content somebody wrote is a moderation
decision, not a migration.

Verified against a real Postgres, before and after, with the old policies in
place first:

| | before | after |
|---|---|---|
| child reads | 1 post | **0** |
| child posts | succeeded | **RLS violation** |
| child replies | — | **RLS violation** |
| anonymous visitor reads | 1 post | **0** |
| parent reads | 1 | 2 (incl. the child's old post) |
| parent posts | ok | ok |
| parent posting as another author_id | ok | **RLS violation** |

### The UI half
`_ADULT_ONLY_SCREENS` (a `Set`, mirroring `_KID_ONLY_SCREENS`) is checked in
`showScreen()`, so every route in is covered rather than every button. A student
who reaches `showScreen('forum')` is told it is for parents and teachers and
sent back to their dashboard.

`#btn-open-forum` is hidden unless `_isParentContext()`. That also removes it
from the mobile ☰ menu for free — the sheet is built from the visible header
buttons, which is exactly why it is built that way.

⚠ Hiding the button was never the fix. Before the SQL it would have hidden a
door that was still unlocked.

## Admin: what a member's family has actually done

### Account created
`created_at` was already in the members query and displayed **nowhere**. The row
now carries the full timestamp plus a relative age — *"Joined 15/01/2026,
09:30:00 · 7 months ago"* — because the timestamp answers "exactly when" and the
relative form is what makes a long list scannable.

### Per-child progress
Expanding a parent shows, per child: **answered · accuracy · chapters · exams ·
best · time · days**, then a per-subject breakdown (chapters touched, questions,
accuracy) sorted by volume.

No new table, RPC or policy: `student_progress.data` is the same jsonb blob the
child's own session reads, and `progress_rw` already grants `is_admin()`.

⚠ **One request per family, not per child** — `student_id=in.(…)`. A family of
four was otherwise four round trips every time a row expanded. Every requested
id is marked fetched hit *or* miss, so a child who has never practised is not
re-queried on every expand.

⚠ `stats.totalAttempted` is used for the headline total, not the per-chapter sum:
exam answers are counted there and are not filed under a chapter. The
per-chapter sum is what "chapters practised" is built from.

## Time on task
⚠ **Measured as the gap between consecutive answers, capped at 3 minutes — NOT
by a wall-clock timer.**

A timer is the obvious implementation and the wrong one: a tab left open on the
practice screen over lunch would report an hour of study that never happened,
and that number would then be shown to a parent and an administrator as though
it were real. A between-answers gap cannot run away — anything past the cap is a
child who wandered off, and is discarded.

It therefore **under-reports**: the reading time before the first answer of a
session is never counted, because nothing knows when they started. An honest
floor beats a flattering guess.

Stored as `daily[key].s` (seconds) alongside the existing `{a, c, e, ch}`, so it
needs no new field anywhere else and prunes with the same 120-day window.

⚠ Rendered as **"—" when absent, never "0m"**: every existing child has no time
data until they next practise, and "0m" would be a claim that they studied for
zero minutes rather than that nothing was recorded. The footer says so.

Verified: first answer records nothing; a 45s gap adds 45; a 30-minute gap adds
nothing; a further 20s gap takes the total to 65.

## Progress visibility: the student's grid and the parent's reports

### ⚠ "% mastery" on a chapter card was accuracy, and it lied
`getChapterPct()` is `correct / attempted`. The chapter card printed it as
**"% mastery"** next to a three-star rating whose only input was that same
number. So a child who answered **two** questions on a nineteen-question chapter
and got both right saw **"100% mastery ★★★"** — identical to a chapter they had
genuinely worked through. That is why "I cannot see which chapters I have
already done" was a fair complaint about a screen that was already covered in
numbers.

`_chapterProgress(chapterId)` is now the single reading, used by the card **and**
the summary tiles so the two cannot disagree:

| Reading | Meaning |
|---|---|
| `acc` | accuracy, and the card now says **"correct"**, never "mastery" |
| `effort` | answers given ÷ questions in the chapter, capped at 1 |
| `stars` | 1 = started · 2 = 5+ answers at 50%+ · 3 = 80% effort **and** 80% accuracy |
| `state` | `new` → `started` → `worked` → `mastered` |
| `last` | when it was last practised (new: `DB.chapters[id].last`) |

⚠ **`attempted` counts ANSWERS GIVEN, not distinct questions seen.** Nothing in
the app records which questions a child has met, and a random 10 from the pool
repeats. So the card deliberately never claims "12 of 19 questions done" — it
says "12 answers" against a chapter of 19, which is true.

⚠ **An unknown question pool must withhold the claim, not assume it.** `total` is
0 whenever the grid paints before QuestionLoader has answered. A first version
fell back to `effort = attempted ? 1 : 0`, which handed "✓ Mastered ★★★" to any
chapter with two correct answers the moment the pool was slow — reintroducing
the exact bug the function exists to kill. `known = total > 0` now gates both
`worked` and `mastered`.

The card gained a done-ness badge (**In progress / ✓ Worked through /
✓ Mastered**) and a **🕘 Today / Yesterday / 4 days ago** stamp — "when" being
most of what "have I done this one?" means.

### A filter, because per-card detail cannot answer a question about the list
"Which ones have I NOT done?" is a question about all eighteen cards at once.
`All · Not started · In progress · Needs work`, each with a live count.
⚠ `_chapterFilter` is declared **above** `activateSubjectPack()` and reset there
on every subject change: it is a `let`, so a reference from that function while
the declaration sat below it would hit the temporal dead zone and throw, and a
filter left on "Not started" would otherwise follow the child into the next
subject where an empty grid reads as a broken app.

### Parent reports (📈 Reports tab)
Built on `DB.daily` (per-day `{a, c, e, ch}`, 120 days) and `DB.mistakes` (last
60 wrong answers), both recorded in `recordAnswer()` — including in
`ASSIGNMENT_MODE`, which returns early, so `_recordDaily()` runs **before** that
return and the branch now saves.

**🕘 What they did** — Today and Yesterday, chapter by chapter, with questions
and accuracy per chapter. It sits FIRST, above the trends: "what did she do
today?" is the question a parent opens the tab to answer, and a 30-day chart is
what they look at second. `daily[key].ch` is capped at 12 chapters per day, and a
day recorded before this shipped shows its totals and says the breakdown was not
kept rather than looking broken.

Then: a 7-day vs previous-7 comparison with deltas, a 30-day activity strip
(height = volume, colour = accuracy), an accuracy trend, exam scores, per-subject
breakdown, and the actual questions they got wrong.

⚠ **Report copy says "they", not "she".** Six user-visible strings called every
child "she". Nothing in the data records a child's gender and the app serves
whole families, so half of them were reading the wrong pronoun about their own
son.

## Today's goal, and a level a child can actually see

Two engagement fixes, from an audit of why a well-gamified app still felt flat.

### The diagnosis
Every reward was either **instant** (a ding on one answer) or **very distant**
(100 questions, a 7-day streak, 90% on a full mock, "practise every chapter").
Nothing sat in the five-to-fifteen-minute range a child can start *and finish*,
so a session had no ending — they answered until bored and closed the tab, and
nothing ever told them they were done for the day.

Separately, `style.css` carried `@media (max-width: 640px) { #xp-display {
display: none !important } }`. The XP/level chip was hidden on **every phone**,
and the dashboard hero shows questions, accuracy and exams but no level — so the
whole progression system was invisible on the only device children use, while
the landing page advertised *"Earn XP, level up, unlock badges"*.

### The goal card (`_renderDailyGoal`)
A ring showing `6/10`, what is left to do, the level line with an XP bar, and a
seven-day strip. Rendered into **both** landing screens: a child with more than
one subject lands on the kid home, a child with one lands on the dashboard.

`_checkDailyGoal()` runs inside `_recordDaily()` — before its early returns, so
an exam question and a parent's assignment both count, since both are work done
today. On the answer that reaches the goal: confetti, the level-up sound, a
haptic pattern, and *"🎯 Today's goal done — 10 questions! See you tomorrow."*

⚠ **`daily[key].g` is the latch**, written into the same day bucket the parent
reports read. It survives a reload and makes the celebration once-per-day; the
11th question of the day must not fire it again.

⚠ The celebration is deliberately delayed ~900ms. The answer's own correct/wrong
feedback lands first; two celebrations on one frame read as a single confused
flash.

⚠ **The goal deliberately does NOT drive the streak.** `updateStreak()` still
counts days a child showed up at all. Breaking a twelve-day streak because a
nine-year-old managed three questions is a punishment no child-facing app should
hand out, and re-basing it would silently reset every existing child's streak on
the day it deploys. The week strip carries the distinction instead — **met**
(green), **showed up** (indigo), **nothing** (grey) — so "goal met on 4 of the
last 7 days" is sayable without anyone losing what they had.

Goal size is `DB.dailyGoal` with a default of 10, validated to 1–500 because it
rides in the synced blob. No UI sets it yet; the parent Controls tab is the
natural home when it does.

### The level chip (`_renderLevelChip`)
`⭐ Lv.4` in the header, the mirror image of the credits chip: a child sees a
level where a parent sees credits, and neither sees the other's. ⚠ A parent
previewing a child has that child's `DB` loaded, so without the
`_isParentSession()` guard the parent's own header would show the child's level
as theirs. Refreshed from `updateXPBar()` as well as `showScreen()`, since that
is where XP actually changes.

`#xp-display` (the wide bar) stays desktop-only — the chip is the mobile half,
not a duplicate.

### Verified
Nine answers fire nothing; the tenth fires confetti and the toast; the eleventh
does not celebrate again and the latch persists. The card flips to a ✓ ring and
today's cell turns green. Header stays one row at 320–1440px with the extra chip
(52px on a phone, 60px on desktop), and no screen overflows.

## Read-aloud in French

`_ttsLang()` returns `fr-FR` when the active pack's `subject` is `'French'` and
`en-GB` otherwise, and `speakQuestion()` sets both `utt.lang` and a matching
`utt.voice`. Verified by intercepting what actually reaches the speech engine: a
Grade 5 French question goes out as `lang: "fr-FR"` with `Google français
(fr-FR)`, an English one as `en-GB` with a UK English voice.

The French question bank needs no special handling — the questions are written
in French, `makeTF` already emits *Vrai/Faux* for French ids, and `makeMatch`
(whose stem "What does X match to?" is hard-coded English) is used by **no**
French pack.

Two things were wrong and are fixed:

### ⚠ getVoices() is empty on the first tap
Chrome fetches the voice list asynchronously and announces it via
`voiceschanged`. Reading it inside the tap handler therefore returned `[]` for
the first 🔊 after every page load, no voice was set, and the engine used its
default — an **English voice reading French**. `utt.lang` alone is only a hint
and not every engine honours it.

The list is now warmed at load and refreshed on `voiceschanged`, so a voice is
already in hand when the child taps. ⚠ Nothing is deferred: `speak()` is still
called synchronously inside the user gesture, which is what iOS requires — do
not "fix" this later by awaiting the voice list.

`_pickVoice()` prefers an exact region match, then any voice for the language:
with fr-FR, fr-CA and two English voices installed it picks fr-FR; with only
fr-CA it takes fr-CA; with no French voice it returns null and `utt.lang` is
left to do what it can.

### ⚠ Stacked fractions spoke an English word inside French
`_prettyMath()` writes the spoken form of a stacked fraction into `data-tts`
(that markup is a column flexbox, so `innerText` reads "1" then "5"). It wrote
`"2 over 5"` unconditionally, so a French voice said *"deux ovair cinq"*.

It now writes `sur` / `blanc` when the active pack is French and `over` /
`blank` otherwise, decided at render time — the only moment the markup is built,
and a moment when the active pack is known. Verified: *"Combien font 2 sur 5 de
40 ?"* against *"What is 2 over 5 of 40?"*.

### Known and accepted
Read-aloud speaks the QUESTION only, not the options — unchanged, and fine for
vocabulary work where the options are single words already on screen.

## Cross-browser notes (audited 2026-08-26)
Audited statically against support matrices — **no browser was actually run**,
so this is "no known hazards in the source", not "tested on device".

Already correct before the audit, and worth not regressing:
- `wakeLock`, `vibrate`, `navigator.share`, `PushManager`, `Notification` are all
  feature-detected; `screen.orientation.lock` is in a try/catch because
  `screen.orientation` does not exist at all in iOS Safari.
- `Notification.requestPermission()` is called as the **first** thing a tap does
  — an intervening `await` drops the user activation and iOS then silently
  refuses the prompt.
- `speechSynthesis.getVoices()` returning `[]` on first call is handled.
- `100dvh` behind `@supports` for the iOS address-bar viewport bug.
- No regex lookbehind anywhere (a `(?<=…)` is a **parse error** on Safari <16.4
  and would take the whole file down, not just one feature).

Fixed by the audit:
- ⚠ **iOS zooms the page in on any form control under 16px and never zooms back
  out.** Nine controls used Tailwind `text-sm` (14px). A `@media (pointer:
  coarse)` rule now raises `input/select/textarea.text-sm|.text-xs` to 16px —
  only the small ones, because a blanket rule would shrink the deliberately
  large login username (`text-xl`) and PIN (`text-2xl`). `guest.html` already set
  16px by hand and needed nothing.
- `backdrop-filter` ×3 had no `-webkit-` twin — the modal blur silently did
  nothing on every iOS 17 and older device.
- `user-select: none` ×5 had no `-webkit-` twin — Safari only took it unprefixed
  from 17, so long-pressing a button on an older iPhone popped the text-selection
  callout.

Known and accepted: `.exam-opt:has(input:checked)` has no fallback, so on Safari
<15.4 / Firefox <121 the selected exam-length card does not highlight. The radio
itself still shows as checked, so nothing is unusable.

## Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no bundlers on the frontend
- **No comments** unless the WHY is non-obvious
- **Autonomous execution** — implement fully without asking for confirmation on obvious tasks
- **Student-first UX** — any new UI must work cleanly on mobile
- **L4 = word problems** — difficulty 4 questions must be applied/contextual, not just harder recall
- **Question images**: alt text must NEVER reveal the answer; always use generic alt ("an object", "a diagram")
- **Enrichment guard**: never remove `// @enrichment` comment blocks from question files

---

## How to continue
Read `CLAUDE.md` first — it is the working brief. Come back here for the *why*
behind a rule or the full story of a bug.

## Parent-controlled Game Settings (2026-09-06)

**What.** A per-child "Game settings" card in the Controls tab (collapsed
summary + "Customise games"), stored as `DB.restrictions.games` inside the
existing `students.settings` JSON — no new table, no migration, no new grant.
`engine/game_settings.js` holds the settings model, the single capability
table (`GAMES`), the shared question-selection service (`pick`/`pickForGame`),
the parent card and the child's one-line summary.

**Why one module.** The three things must agree: which settings a game
honours, how a round is filled, and what the parent is promised. Splitting them
is how "the mix applies to Quick Fire" and "Quick Fire ignores the mix" would
both become true. Nothing branches on a game name; the games ask
`GameSettings.pickForGame('<key>', count, {levels, safe})`.

**Selection.** Excluded subjects are removed first and never consulted again —
the fallback for a short subject is another INCLUDED subject, reported through
`console.warn`. Shares are largest-remainder over the round and spread with a
smooth weighted round-robin, so 40/30/30 on ten questions is 4/3/3 every run
(measured 50/50) and not "maths, maths, maths, maths, then the rest". Levels are
clamped to `min(difficulty top, restrictions.maxDifficulty)` on both the plan
and the draw, so the practice cap the parent already set still wins.

**Two orderings of "fresh vs exact level".** A game with a declared ladder
(Billionaire rungs, Brain Battle pairs) keeps the exact level and only then
prefers a fresh question — otherwise a full `DB.games.recent` list made the two
questions of a Brain Battle round land on different levels, which the existing
fairness test caught. A free-running stream (Quick Fire) does the opposite.

**Grade scoping bug found while testing.** The first cut treated a chapter no
manifest knew as "own grade", which let a grade-6 question through for a
grade-5 child whenever only the grade's own packs were passed. Rule now: all
packs are passed for attribution; an unknown chapter is dropped when any
manifest is loaded, and only the manifest-less dev harness gets the
"everything is one anonymous subject" fallback.

**The chalkboard trap.** The card is injected by innerHTML into
`#screen-parent`, which the parent-dashboard chalkboard work made dark in BOTH
themes. A light palette measured 1.06:1 there. The `.gs-*` rules carry a
`#screen-parent` override block; `scripts/test-game-settings-ui.js` measures
every text style in both themes rather than trusting the class names.

**RLS proof without a fixture on disk.** `scripts/sql-tests/game-settings-rls.js`
creates a family, child and session inside one DO block against the LIVE
database, measures child (anon + token: 0 rows updated), stranger (0) and
parent (1), then ends with `RAISE EXCEPTION` carrying the JSON — the exception
is the rollback, and the Management API returns the message. Nothing is
written. Run with `SUPABASE_ACCESS_TOKEN`.

**Deliberately not done.** Round length does not resize Billionaire's 20-rung
ladder (the prizes and safe havens are the game), Quick Fire's 60 s clock, or
Explorer's 12 real stops. Word Builder and Time Traveller keep running when
English/History is excluded from the quiz mix: their banks are curated, not
the question bank, and the copy says "Quiz games will only use…".

## Teacher Mode → Hybrid Classroom Command Centre (2026-09-06)
Reworked the teacher area around one rule: show the next useful action, not
every feature. Nothing was removed; secondary tools moved behind a labelled
**More** menu.

### What changed, and where
| Surface | Now | File |
|---|---|---|
| Main navigation | **Home · Classrooms · Set Work · Results** + `⋯ More` (Materials, Messages, Gradebook, Archived work, Teacher settings) | `index.html`, `TeacherMode.switchTab/toggleMore` |
| Home | greeting + one-line summary, three big actions, cards for *Work due soon*, *Pupils who may need help*, *Recent submissions* | new `engine/teacher_home.js` |
| Classroom screen | **Overview · Work · Pupils** + `⋯ More` (Materials, Results, Settings); Work has Active/Closed/Archived chips and mixes digital work, worksheets and files; Pupils is a searchable roster with per-pupil PIN show/hide/copy, a "may need help" flag and a `⋯` manage menu; tapping a name opens their work | `engine/teacher_classroom_detail.js` |
| Set Work | Classroom → sharing choice → Grade/Subject → Chapter → Number of questions → Due date → **Assign to the whole class**. Difficulty, timer, time allowed, name, shuffle and *Which pupils?* sit inside `<details id="ta-more-options">` | `index.html`, `TeacherMode` |
| Success screen | name, classroom, due date, copy link, WhatsApp / native share, QR when the bundled encoder loads, **View assignment** | `#modal-share-assignment` |
| Results | Assigned / Completed / In progress / Not started / Average result / Average time; **Who needs my help?** with one action per line; bulk *Remind* / *Give more practice* / *Export* / *Open individual answers*; pupils grouped Completed / Working on it / Not started / May need help | `TeacherWorkspace._renderMainResults`, new `engine/teacher_insights.js` |
| Refresh | `psac_teacher_loc_v1` (owner-scoped) remembers tab, list filter, selected results and the open classroom + section; `render()` restores them | `TeacherMode._readLoc/_saveLoc/_restoreClassroom` |

### Evidence thresholds (`TeacherInsights`)
A pupil is "may need help" only with **≥ 5 answered questions** below 50 %;
a chapter is named only after **≥ 3 answers in it**; "very quickly" means
under 8 s per question **and** below 60 %, again on ≥ 5 answers. One or two
answers never produce a label — the card says so instead. Home and the
classroom roll pupils up across the latest 8 active assignments.

### Database: one migration, applied by hand
`migrations/20260906_teacher_assignment_due_date_and_pupils.sql` replaces
`teacher_guest_create_assignment()` with two extra optional parameters
(`p_due_at`, `p_pupil_ids`) and makes `guest_my_assignments()` return
`chapter_ids`. Idempotent (DROP IF EXISTS old signature + CREATE OR REPLACE +
grants). ⚠ Until it is applied, the nine-argument call answers **PGRST202**;
`_buildAssignment()` detects that, retries with the seven-argument form, and
puts a warning on the success screen ("closes 48 hours from now … ask an
administrator to apply the latest migration"). It never pretends the due
date took. After applying, regenerate `supabase-schema.sql`.

### Decisions worth knowing
- **The sharing choice is on step 1, not under More options.** A teacher of an
  online group needs "Anyone with the link" immediately; burying it means
  they cannot share at all without discovering a disclosure. PIN entry is the
  default whenever the classroom has pupils; the teacher's own tap is the only
  thing that flips it (`_linkPreferred`), not the hidden `#ta-access` select's
  first option — that is exactly how the first cut defaulted to the open link.
- **Filters are Active / Closed / Archived, not "Scheduled".** Nothing in the
  schema schedules a future start; a "Scheduled" tab would be a lie.
- **Hints, attempt limits and answer visibility are not on the form.** The
  guest flow has no such settings server-side; a control that changes nothing
  is worse than none. "Allow another attempt" per pupil (the real feature)
  stays on the Results screen.
- **The classroom `?classroom=` share link is inert** — no code parses that
  parameter (only `join`, `ref`, `friend`), so it was left in Settings but not
  promoted on the Overview. Same class of bug as the old `?assign=` link.
- **QR is opportunistic.** `assets/vendor/qrcode.mjs` imports `/npm/…` paths
  that nothing serves, so the encoder usually fails to load; the QR block
  stays hidden rather than showing a blank square.

### Traps found while measuring
- **The board's `p` rule outranks any single-id selector.**
  `#screen-teacher .ta-tab-content p:not(.teacher-intro):not(.ta-chip-hint)`
  scores **(1,3,1)** because each `:not()` adds its argument. Every paper-card
  override at (1,2,x) silently lost and painted cream on white. The doubled
  `#screen-teacher#screen-teacher` prefix in the command-centre CSS is
  deliberate: (2,x,y) is the only thing above it without rewriting the board.
- **`.teacher-intro` was brown (#5c4a2a) on the chalkboard** — 1.36:1 — a
  pre-existing defect from the chalkboard commit, now overridden inside panels.
- **`checkVisibility()` answers false for everything in headless Chrome 152**,
  so a probe built on it measures nothing and reports success. The harness
  filters closed `<details>` by walking ancestors instead, and asserts the
  collapsed state by geometry (details box ≤ summary height).
- **A refresh superseded by a newer refresh resolves `undefined`.**
  `render()` started one refresh through Home and another explicitly;
  `ensureLoaded()` read the first's `undefined` as failure and Home showed
  the error state on every load. It now waits for the *newest* in-flight
  refresh and judges by `loaded`.
- **Never trust a roster row that arrives with a `pin`.** The reveal state is
  per session; `_loadPupils` strips the field so nothing is pre-revealed.
- **Git Bash's grep/sed/od translate CRLF on read here**, so a `\n` anchor in
  a Node replace "was not found" while plainly present. Check and normalise
  line endings with Node before multi-line edits.

### Measured
`scripts/test-teacher-command-centre-layout.js` drives the real app in
headless Chrome with a scripted teacher (2 classrooms, 3 pieces of work, a
struggling pupil) at **360 px and 1280 px, light and dark**: 11 screens each
(Home, More, Classrooms, Set Work, Results, classroom Overview/Work/Pupils/
More, pupil panel, success screen) with no element past the viewport, every
visible text ≥ 4.5:1 against its composited background, every primary
control ≥ 44 px. `scripts/test-teacher-command-centre.js` (141 checks) covers
the markup contract, the insight thresholds, location restore, publish paths
(PIN / open link / due date / chosen pupils / PGRST202 fallback / repeated
clicks) and the loading / empty / failed states.

---

## Question importer → loader parity, fail-closed preflight (2026-09-08)

### The defect

`netlify/import-questions.js` carried its own private `_buildContext()`. It held
`makeMCQ`, `makeNum`, `makeTF`, `makeMatch` and `makeSymmetry` — and nothing
else. `makeCloze`, `makeText` and `makeTask` had been added to the loaders that
ship (`engine/helpers.js`, `netlify/functions/questions.js`,
`netlify/build-questions.js`, `netlify/lib/questions-sandbox.js`) and never to
this fifth copy.

Six source files therefore threw on their first factory call:

    subjects/grade4-french/questions/ch12_g4_textes_trous.js  makeCloze is not defined
    subjects/grade4-french/questions/ch13_g4_correction.js    makeText is not defined
    subjects/grade5-french/questions/ch14_textes_trous.js     makeCloze is not defined
    subjects/grade5-french/questions/ch15_correction.js       makeText is not defined
    subjects/grade6-french/questions/ch12_g6_textes_trous.js  makeCloze is not defined
    subjects/grade6-french/questions/ch13_g6_correction.js    makeText is not defined

Reproduced before any edit, by driving both loaders over the same 45 packs:

    production loader   mcq 12319 · numeric 2024 · cloze 60 · text 305 · multi 12 · symmetry 6 = 14726
    importer sandbox    mcq 12319 · numeric 2024 · cloze  0 · text   0 · multi 12 · symmetry 6 = 14361
    difference          365 = 60 cloze + 305 text, 6 files skipped, 0 extra ids

The command printed `skip <file>: <message>` and then reported completion.

**The production consequence was real, and was measured on the live database
before the fix, not inferred:**

    data->>type = mcq       10329
    data->>type = numeric    2007
    data->>type = text          0
    data->>type = cloze         0
    data->>type = multi        12
    data->>type = symmetry      6

Zero. Every PSAC French Q6 texte-a-trous and every Q7A correction item — the two
formats written specifically because the bank had nothing for those exam
questions — had never reached the database at all.

⚠ The lesson is the one this codebase keeps paying for: **a skipped file that
prints a warning and a successful run look identical from outside.** The
importer's own regression suite (`scripts/test-question-import.js`) was green
throughout, because it tests database accounting against a mock PostgREST and
never loads a real source file. It could not have caught this.

### The fix: one loader

The private sandbox was deleted rather than extended. Copying three more
factories into it would have made the next format drift the same way — this is
the failure mode CLAUDE.md's duplicated-code table exists to name.

`netlify/lib/questions-sandbox.js` — already the module the deployed question
service and the assignment re-grading path share — gained a corpus API:

- `loadPack(subjectId)` returns
  `{ subjectId, grade, dir, practice, papers, files, errors }`. Errors are
  returned as **data**, not printed. A file that throws has its partial
  contribution rolled back: importing half a file is worse than importing none
  of it, because nothing downstream can tell which half.
- `loadSubject(subjectId)` keeps its exact old contract (practice pool, warn on
  error) so the eight existing callers are untouched.
- `listPacks()` — discovered from the directory, never listed.
- `loadCorpus()` — every pack, with `packs`, `practice`, `papers`, `errors`.
- `evaluateSources([{file, code}])` — run an explicit list of sources through the
  same context. This is what lets the write-back **prove** a rewrite.

⚠ Writing this patch through a shell heredoc into a JS template literal ate one
backslash from every regex: `/^grade(\d+)-/` arrived as `/^grade(d+)-/`, so
`listPacks()` returned 0 packs and the corpus loaded empty. Exactly the trap
CLAUDE.md records under "Never build a regex through a shell heredoc". Caught in
one run because the loader was measured immediately rather than assumed.

### Two phases, fail-closed

The old command uploaded each subject as it went and reported skipped files in
the closing summary — *after* every group that loaded had already been written.
A broken file near the end left the database holding a corpus nobody had
validated as a whole.

Now: **preflight, then database.** Preflight discovers packs, evaluates every
source, builds every row, and validates:

- a source-file exception is **fatal**;
- every id is a non-empty string, unique across practice **and** past papers;
- structure per type, from a `TYPE_RULES` table — an unknown `type` fails with
  the id and the reason, and is never coerced to MCQ;
- difficulty 1-4, a `chapterId`, a grade derivable from the pack name;
- a past-paper item must **not** carry an answer (it is a transcription of a
  printed question, and must never reach code that expects to grade it).

Supabase is not contacted until all of that passes. `--check` runs the whole of
it with no credential and no network; `--dry-run` adds a read-only
classification; the bare command writes. An unknown flag exits 2 with usage —
`--dry_run` is not `--dry-run`, and silently uploading 14,890 rows because a
hyphen was typed as an underscore is not a mistake this command may make.

**Preflight found two real content defects on its first run**, both pre-existing:
`g5hg-min5-coast-0` and `g5s-min5-renew-0` were MCQs with exactly one option,
which was the answer. The `rows()` helper in `coverage_min5.js` shares one option
pool across a group of questions, so a group with a single row got a pool with a
single word. A child saw one button and a free mark. Fixed with real distractors.

### Protected rows: the write-back that could have destroyed source

`_generateBlock()` returned `null` for symmetry, used `makeNum` for numeric, and
**`makeMCQ` for everything else**. A protected cloze text, typed-text
correction, multi-select item or structured task would have been rewritten into
the source file as an MCQ — with a `.bak` beside it as the only trace.

The replacement (`netlify/lib/question-writeback.js`) has two rules:

1. an **exhaustive** type switch. Only `mcq`, `numeric` and `text` have a
   lossless source form; an unlisted type is never regenerated. `TYPE_RULES`
   carries the `regenerable` flag, so the table that validates a type is also
   the table that decides whether it can be written back.
2. losslessness is **proved, not assumed**. The candidate file is executed
   *alongside its siblings* through the real loader — siblings because a
   question file may read the pool earlier files pushed into
   (`questions_audit.js` does) — and the rewrite is accepted only if the pack
   still loads, the id set is unchanged, the target question now equals the
   database version exactly, and **no neighbouring question moved**. Anything
   else leaves the source untouched and becomes a conflict for a human.

Backups and the conflict report go to `.import-conflicts/`, never beside the
source. ⚠ That directory needed **both** a `.gitignore` entry and a
`netlify.toml` 404 rule: `publish = "."` serves the repo root, and a CLI deploy
uploads from local disk, so gitignored-but-present files ship. The conflict
report contains correct answers.

⚠ `.bak` files were previously written next to the source. They end `.js.bak`,
so the loader's `.endsWith('.js')` filter excluded them — but only by luck of
naming, and the backup directory removes the question entirely.

### The summary

Rewritten so a non-technical operator can tell what happened, and so the totals
cannot contradict each other. `accountingProblems()` fails the run if:

    corpus total      != practice + past papers
    candidates        != new + updated + unchanged + protected(unchanged+conflict) + failed
    writes attempted  != new + updated + failed
    verified + failed != attempted

The wording is deliberate, because these are not synonyms: **loaded** is not
**written**; a **write response** is not **verified**; **protected** is not an
error unless it *conflicts*. Protected is split into `protectedUnchanged` (the
database agrees with local source — nothing to do) and `protectedConflict` (it
disagrees — a human is needed), because reporting them as one number made a
healthy import look broken and a broken one look healthy.

A live import ends with a separate **`Database verification`** block that
re-reads every row it wrote, in a fresh request, and compares canonical content.
⚠ Deliberately **not** a table row count: the table legitimately holds protected
and historical rows outside the corpus, so a global count proves nothing. The
mock-database test proves the distinction matters — a write whose response looks
correct but never lands is caught only by reading it back.

Exit code is 0 only for a fully successful run. `--report <path>` / `--json`
emit a versioned, redacted report carrying no answers, no row payloads and no
credentials.

### The live import

    Preflight: PASSED — 45 packs, 316 source files, 0 skipped
    Corpus:    14,726 practice + 164 past papers = 14,890
    Result:    2,377 new · 3,904 updated · 8,609 unchanged · 0 protected · 0 failed
    Writes attempted 6,281 · verified 6,281 · failed 0
    Verification: PASSED — every intended write was read back
    Elapsed 151s — SUCCESS

Live table afterwards: **14,893 rows — 14,729 practice + 164 past papers**;
`mcq 12,322 · numeric 2,024 · text 305 · cloze 60 · multi 12 · symmetry 6`.
Every corpus row present; field-level round trips confirmed for cloze (gap
counts, bank size, alternates, two-part flag, notes), text (acceptable answers,
confusables, strictAccents), multi (option and answer arrays, image markup),
symmetry (grid, axis, coordinates), numeric, mcq (inline SVG and `<img>`
survived) and past papers (no answer). French accents intact.

⚠ **The 3-row surplus is not an error.** `g7h-samp-001`, `g8h-samp-001` and
`g9h-samp-001` are left over from the retired `grade{7,8,9}-history` placeholder
packs, replaced by `-social-modern-studies`. **The importer never deletes**, so
deleting a question from `subjects/` does not delete it from the database.

### No migration, and why that is a finding rather than an omission

The live schema was read, not taken from the dump: `questions.data` is
`jsonb NOT NULL`, there is no question-type column, no CHECK constraint, and
`id` is the primary key (which is what lets the upsert merge duplicates). The
table **already held 12 `multi` and 6 `symmetry` rows**, which is direct evidence
that JSONB accepts the non-MCQ shapes — a stronger argument than reading the
DDL. No SQL was written. A ceremonial empty migration would have been worse than
nothing.

### ⚠ A clean re-import is "0 new, ~560 updated", not zero writes

Measured immediately after the successful import: **0 new, 560 updated, 14,330
unchanged.**

`makeMCQ` keeps the answer plus a **random 3** of the remaining options. For a
question authored with more than four usable options the stored option set is
therefore drawn fresh on every load, and the importer honestly reports it as
changed every time. **580 items are in that state** — grade4-history 277,
grade4-french 154, grade5-history 114, grade5-english 27, grade5-science 5,
grade5-maths 3.

This is churn, not drift, and it is the one place the import is not idempotent.
It is recorded here because "0 new, 560 updated" on a re-run is otherwise
indistinguishable from something having gone wrong. (Whether 580 questions
*should* be authored with a distractor pool larger than the question can show is
a separate content question — it means two children sitting side by side see
different distractors for the same item, which for a shared answer pool is
arguably the point.)

### Tests

- `scripts/test-question-import-parity.js` (123 checks) — the importer declares
  no factory and no `vm.createContext`; the importer and `build-questions.js`
  return **identical** practice and past-paper id sets and per-type counts; the
  six formerly-skipped files load and contribute; a fixture for all seven types
  survives load to row JSON to parse with no field loss (including a `makeTask`
  fixture keeping its parts, response kinds, rubric and per-part marks, and not
  being projected into legacy items); option order is cosmetic while multi
  answers, symmetry coordinates, cloze gaps and task parts are not; preflight
  rejects source exceptions, duplicate ids across subjects **and** across
  practice/past-paper groups, unknown types, and ten malformed shapes;
  `--check` runs in a subprocess with the key stripped and `fetch` replaced by a
  tripwire, proving zero network calls; the live schema claims are asserted
  against `supabase-schema.sql`.
- `scripts/test-question-writeback.js` (88 checks) — against a throwaway pack in
  the OS temp directory. `generateBlock` refuses cloze, symmetry, multi, task
  and unknown types; a protected one of those leaves the file **byte-for-byte**
  unchanged and introduces no `makeMCQ`; a protected mcq/numeric/text is synced,
  the pack still loads, every neighbour is untouched, the pool-reading file
  still runs, and the backup lands outside `subjects/` with a non-`.js` name; a
  rewrite that cannot reproduce the row is refused; `write:false` is a genuine
  dry run.
- `scripts/test-question-import.js` — extended for the protected split, the
  written-row collector, `classifyRows` writing nothing, read-after-write
  changing the outcome, bounded error output, the redacted JSON report, and
  every summary category balancing in check / dry-run / success / failure /
  aborted scenarios. ⚠ The accounting assertion caught the test's *own*
  hand-written fixture first; the fixture now derives its totals.

⚠ One test bug worth recording, because it is the shape that makes a harness lie:
the parity suite first checked for `window.PSAC_PDF_QUESTIONS` by reading only
the **first line** of the sandbox's context `return {`. That export list wraps,
and the entry sits one line down — so the check reported a missing export that
was present. The export line is exactly the half that ships (it is how `makeCloze`
was lost in the first place), so a false reading there is expensive. It now reads
the whole return statement.


---

# Archived: full CLAUDE.md as it stood on 2026-09-08 (before the condense)

> CLAUDE.md had grown to **167 KB / 2,457 lines** and was loaded into every
> session. It was condensed on 2026-09-08; every rule survives there in one-line
> form, and the long-form reasoning that used to sit beside each rule is kept
> verbatim below. **The current CLAUDE.md outranks this copy** — where the two
> disagree, this one is the stale half. Version numbers, counts and "measured"
> figures below are frozen at 2026-09-08.

### PSAC Exam Practice — Project Brief for Claude

#### What this is
A vanilla JS single-page app for Mauritian primary children revising for the
**PSAC** exam (grades 1–9 registered; **4, 5, 6 are the live ones**). Subjects:
Maths, English, French, Science, History & Geography.

Hosted on **Netlify**. Backend: **Supabase** (`https://xawvjwsiqhtxgpocdqgm.supabase.co`).
No frameworks — HTML/CSS/JS + Tailwind CDN.

#### Where the documentation lives
| File | What it is |
|---|---|
| **`CLAUDE.md`** (this file) | The working brief: rules, invariants, current state. Loaded every session — **keep it short**. |
| **`ENGINEERING-NOTES.md`** | The long-form archive: why each rule exists, how each bug was found, what was measured. ~200 KB. **Grep it before re-investigating anything** — most surprising behaviour in this app has already been chased down once. |
| `PROJECT_OVERVIEW.md`, `PLAN.md`, `ARCHITECTURE.md` | Older overviews. Treat as historical. |
| `HOW_TO_RUN_LOCALLY.md`, `HOW_TO_PUBLISH.md`, `DB_IMPORT_GUIDE.md` | Operational. |

⚠ Nothing in any `.md` outranks the code or the live database. Several claims in
the archive were stale when written. **Verify before relying on a summary — this
one included.**

---

#### File layout
```
index.html                  ← entire app UI, all screens, shown/hidden by showScreen(id)
style.css                   ← custom CSS, loaded AFTER the Tailwind Play CDN
sw.js  manifest.json  icons/
netlify.toml                ← functions, cron, and 28 explicit 404 redirects
supabase-schema.sql         ← THE schema. One file, generated. See "Database"
engine/
  supabase.js protect.js helpers.js questions_engine.js registry.js events.js store.js
  question_loader.js app.js biometric.js auth.js teacher.js teacher_home.js
  teacher_insights.js teacher_workspace.js teacher_guest_classes.js
  teacher_classroom_detail.js admin.js forum.js
  calendar.js search.js classroom.js shop.js
netlify/
  functions/    questions.js push-*.js weekly-digest.js notify.js assignment-submit.js …
  lib/          student-auth.js questions-sandbox.js
  build-questions.js  import-questions.js
  question-bundles/   ← GITIGNORED, rebuilt by build-questions.js on every deploy
subjects/
  _index.js               ← GENERATED eager pack index — the ONLY subject script
                             index.html loads. node scripts/build-subject-index.js
  grade[1-9]-[subject]/
    _manifest.js          ← registerSubject() + chapters + SYLLABUS + generators.
                             LAZY: fetched by PackLoader.ensure() on demand
    questions/ch01_*.js … ← plain scripts; enrichment_*.js, past_paper_*.js
```

##### Where a feature lives
| Feature | File |
|---|---|
| Screens, practice, exam, dashboards, reports, daily goal | `engine/app.js` (~478 KB — the big one) |
| Parent/teacher auth, student PIN login, session guard, mode handover | `engine/auth.js` |
| localStorage + Supabase data layer, progress blob | `engine/store.js` |
| Question fetching + 7-day localStorage cache | `engine/question_loader.js` |
| Timetable, calendar, activity layer | `engine/calendar.js` |
| Interactive map — the child's map AND the admin editor | `engine/interactive_map.js` |
| Textes à Trous (French Q6) · Chasse aux Erreurs (French Q7) | `engine/cloze.js` · `engine/errorhunt.js` |
| Credits + entitlement model, `sellableChapters/Subjects` | `engine/shop.js` (the shop *screen* — `renderShop()` — lives in `app.js`) |
| Admin panel, shop settings, security log | `engine/admin.js` |
| Server-side entitlement enforcement | `netlify/functions/questions.js` |
| Teacher navigation, Set Work form, success screen, location restore | `engine/teacher.js` (`TeacherMode`) |
| Teacher Home dashboard | `engine/teacher_home.js` |
| Assignment cards, Results screen, results cache, reminders/export | `engine/teacher_workspace.js` |
| Classroom screen (Overview · Work · Pupils · More) | `engine/teacher_classroom_detail.js` |
| Classroom list + new-classroom form | `engine/teacher_guest_classes.js` |
| Evidence thresholds, grouping, "who needs my help" (pure) | `engine/teacher_insights.js` |

#### Engine load order (script tags in `index.html`)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → subjects/_index.js → question_loader.js → app.js →
biometric.js → auth.js → teacher.js → admin.js → forum.js → calendar.js →
search.js → classroom.js
```
One guarantee is load-bearing — verify against `index.html` before trusting any
summary of it, this one included:
- **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and `ACTIVE_STUDENT_ID` from `app.js`.

##### Subject packs are LAZY — one index, then per-pack on demand (2026-09-08)
`index.html` carries **one** subject script, the generated `subjects/_index.js`.
It used to carry one blocking `<script>` per pack: **measured 45 requests and
323 KB parsed before `app.js` ran**, on the cheap Android phones this app
already had display problems on. The index is **39.9 KB in one request**.
- `subjects/_index.js` registers all 45 packs with their **chapter lists** but
  **without** chapter prose, subsection maps, generators, badges, formulas or
  help. `_lite: true` marks such an entry.
- `PackLoader.ensure(packId)` (engine/registry.js) injects that pack's own
  `_manifest.js` plus any extras (`grade5-maths/help.js`) and resolves with the
  full pack. `ensureGrade(grade)` does a whole grade.
- ⚠ **The split is measured, not guessed.** Pack metadata 6.3 KB · chapter
  metadata 38.2 KB · chapter prose 94.4 KB · subsection maps 41.1 KB. Every
  consumer outside the active pack (`admin _allChapters`, `Shop.sellableChapters`,
  the plan chapter picker, reports, calendar, search, the grade/subject pickers)
  was checked and reads a chapter's `id`, `name` and `icon` **only** — so the
  index alone satisfies them all.
- ⚠ **`CHAPTERS` is declared in `engine/registry.js`,** not in a pack. It used to
  be `const CHAPTERS` at the top of `subjects/grade5-maths/_manifest.js`, which
  made one arbitrary pack a load-bearing dependency of `app.js` — and made lazy
  loading impossible, since a deferred file cannot declare a global `app.js`
  references at top level. Re-adding it to that manifest throws *"Identifier
  'CHAPTERS' has already been declared"* the moment the pack loads.
- ⚠ **`registerSubject()` MERGES on a second call for the same id** — that is how
  the real manifest lands over the lite entry. It **mutates the existing object**
  rather than replacing the array slot, because callers hold references to it
  (`ACTIVE_PACK` among them); replacing the slot would leave the open subject
  pointing at the lite copy for the rest of the session. If the pack is the
  active one it also refreshes `CHAPTERS` in place, so a subject activated while
  still lite picks up its prose when the load finishes.
- ⚠ **A failed load drops the cached promise** so a retry can succeed. Keeping it
  would turn one dropped request into a permanently prose-less subject for the
  session — the defect `QuestionLoader._done` was fixed for.
- ⚠ **The index is GENERATED — never hand-edit it.** `node scripts/build-subject-index.js`.
  Prose fields are dropped **by name** (`syllabus`/`notes`/`enrichmentNote` on a
  chapter), so a new chapter field is kept by default rather than silently
  stripped and read as `undefined` at the far end.
- `scripts/check.js` executes both the index and the manifests and **fails on
  drift** (a new pack, a renamed or reordered chapter, a bad `_src`), and fails if
  `index.html` ever loads a pack manifest eagerly again. Verified to catch it by
  renaming a chapter id and restoring the file byte-for-byte.
- Verified in real headless Chrome, 28/28: one `subjects/` request at boot, 45
  packs and 334 chapters registered, no prose/generators until `ensure()`, no
  duplicate pack after it, generators + help + badges arriving for grade5-maths,
  `Shop.sellableChapters()` returning 160 named chapters off the index alone.

#### Key globals
- `STATIC_QUESTIONS` — flat array; every question file pushes into it
- `CHAPTERS` — chapters of the active pack, declared in `engine/registry.js`.
  **Starts `[]`**; mutated in place by `activateSubjectPack()` and refreshed in
  place by `registerSubject()` when a lazily-loaded pack lands on the active one.
  (It used to ship full of Grade 5 Maths, which is how a Grade 4 child tapping
  Science got maths.)
- `PackLoader` — `ensure(packId)` / `ensureGrade(grade)` / `isLoaded(packId)`.
  ⚠ Anything that takes a child **into** a subject must `await PackLoader.ensure()`
  first, or the syllabus screen and the generators are missing. Anything that only
  **lists** chapters across packs needs nothing — the index already has them.
- `ACTIVE_PACK` / `ACTIVE_STUDENT_ID` / `SUBJECT_PACKS`
- `DB` — the student progress blob (localStorage + Supabase `student_progress.data`)
- `S` — session state: `S.practice.{chapterId,qs,idx,difficulty,session}`,
  `S.exam.{qs,answers,flagged,idx,type,endTime}`
- `_activePack()` returns **null** when nothing is chosen — never a fallback pack.
  Every caller handles null; a guess dressed as an answer is worse than no answer.

#### Key functions
`makeMCQ / makeNum / makeTF / makeMatch / makeSymmetry` (factories) ·
`startChapterDirect(chapterId, forceDiff)` · `loadPracticeQuestion()` ·
`renderExamQuestion()` · `renderChapterSelect()` · `assembleExamPaper(type)` ·
`showScreen(id)` · `getQuestionsForChapter()` / `getMixedQuestions()` ·
`_makeImgsZoomable()` · `speakQuestion(mode)` · `_saveResume()` / `_doResume()` ·
`_chapterProgress(chapterId)` · `_prettyMath()` · `_gradeStage(grade)`

---

#### Content model

##### Question file pattern
```js
'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-plants-001', chapterId:'plants', difficulty:2,
    subsection:'photosynthesis',
    question:'Question text (innerHTML — <b>, <img>, inline <svg> all work)',
    options:['A','B','C','D'], answer:'B', hint:'…', explanation:'…' })
);
```
- IDs: `[grade][subject]-[chapter]-[3 digits]`
- difficulty: 1 Basic · 2 Medium · 3 Hard · **4 = word problems** (applied/contextual, not just harder recall)
  ⚠ **That L4 definition is MATHS-SHAPED and is not what L4 holds in every pack.**
  Measured 2026-09-08: maths L4 = multi-step word problems (as above); english L4 =
  extended passage/essay analysis; french L4 = multi-verb cloze passages;
  history/science L4 = applied scenarios. A rule written across all five is wrong —
  two automatic gates were tried and rejected for exactly that reason (they fired on
  1 055 French and 206 English items, whose grammar answers are single words by
  nature). `scripts/audit-difficulty-labels.js` therefore **reviews, never fails**:
  whether a question demands reasoning is a reading, and a script can only count what
  someone has already asserted. It carries the per-level criteria, anchored on what
  the real papers award marks for. ⚠ The labels are the AUTHOR'S assertion, not a
  measurement — L1 measured 86% recall, but L3/L4 had been diluted with plain
  retrieval ("In which year was Aapravasi Ghat inscribed?" sat at L3); 34 grade-6
  history/science items were re-labelled on 2026-09-08.
- Images: Wikimedia `Special:FilePath` URLs, **verified to exist via the
  `action=query` API before being written into a question**. Prefer inline SVG —
  it cannot 404, works offline, and its contents are known exactly.
- ⚠ **Alt text must NEVER reveal the answer** ("an object", "a diagram").
- ⚠ **Never remove a `// @enrichment` guard comment** during syllabus audits.

##### Chapter content comes in FOUR shapes — a reader must handle all four
| Shape | Chapters | Where |
|---|---|---|
| `pack.syllabus[id].subsections` | 18 | **grade5-maths only** |
| `chapter.syllabus` prose | 60 | History ×3, Science ×3, grade4/6-maths |
| `chapter.notes` | 55 | English ×3, French ×3 (`notesBased: true`) |
| `chapter.enrichmentNote` | 15 | bonus chapters |

`renderSyllabus()` reads all four; `_notesToHtml()` and `Calendar.showNotes()`
share a `**bold**`/`*italic*` subset — **keep them in step**.

##### Subsections
Every chapter expands into named sub-topics with a live count and its own
"Practise →" (5,428 questions, 100% tagged). ⚠ **Invariant: declared subsection
ids and tagged subsection ids must be identical per chapter.** A declared id with
no questions opens empty; a tagged id that is not declared hides those questions
from the screen. The English/French maps are *generated from the tags* so they
cannot disagree at birth. Tagging traps (match question text not options, order
is load-bearing, comprehension passages are stimulus not task, etc.) are in the
archive under "Per-subsection Practise".
⚠ **It was broken in five chapters at once, and had been for a long time**
(found 2026-09-08, all pre-existing): 22 elapsed-time word problems on
`g6-time-speed` tagged `word_probs` with no declaration — unreachable on the
Practise screen; four more on `g4fr-lecture`, three on `g6fr-lecture`, one on
`g6-animals`; and `independence` declared on `g5enr-personalities` with nothing
behind it. **`audit-content-coverage.js` was counting undeclared tags the whole
time** — it prints a total, never names them and never fails, which is precisely
how five survived. `scripts/test-subsection-invariant.js` now names them and
fails the build; verified by reintroducing BOTH halves separately and restoring
the files byte-for-byte. Prefer reusing the id a sibling pack already uses
(`narration`, `figures_style`, `vrai_faux`, `word_probs`) over inventing a
one-item subsection.

##### Enrichment chapters
```js
{ id:'g5enr-personalities', name:'…', icon:'👤', enrichment:true,
  examWeight:2, enrichmentNote:'Derived from syllabus, NOT a direct MIE chapter.' }
```
Gold "✨ BONUS" card; `examWeight: 0` excludes from exams.

##### Past papers — 162 items, never gradable
Transcriptions (not PDF extractions) of real 2016–2024 PSAC questions. They push
to `window.PSAC_PDF_QUESTIONS`, ship in their own `past-papers.json`, and are
**never merged into `STATIC_QUESTIONS`**: none has an `answer`, and
`assignment-submit.js` grades through the sandbox. 63 carry `needsArtwork: true`
and are hidden (the artwork never existed in this repo). Read-only screen, no
scoring; `markScheme` powers an optional self-marking reveal.

##### Dynamic generators
⚠ **A generator can only live in a `_manifest.js`.** In production question files
are fetched as JSON and never executed as scripts — only `file://` dev injects
them. `G5M_GENERATORS` (grade5-maths) is the only pack with any (12).
Generated ids come from `genId(prefix)`, never `Date.now()` alone —
`getMixedQuestions()` de-dupes by id and same-millisecond ids collapsed a whole
run into one question.

---

#### Adding or changing questions — checklist
1. Write the file under `subjects/[pack]/questions/`.
2. Add it to `LOCAL_FILES[pack]` in `question_loader.js` (**`file://` dev only**;
   prod auto-discovers).
3. ⚠ **Bump `_CACHE_VERSION`** in the same file. Prod caches each subject's JSON
   in localStorage for 7 days — without a bump a child keeps the old set for up
   to a week and nothing in the UI explains why. Bumping also purges the old keys.
4. If you touched a **question factory**, apply it to all four copies (below).
5. If chapters changed, keep the SYLLABUS subsection map in step.
6. ⚠ If you added, removed, renamed or reordered a **chapter** — or added a pack —
   re-run `node scripts/build-subject-index.js`. `scripts/check.js` fails on drift,
   so this cannot ship stale, but it will stop the build until you do.

#### ⚠ Code that is duplicated on purpose — change every copy together
There is no shared module between the browser and the Lambdas. Each of these has
bitten this project at least once:

| Thing | Copies |
|---|---|
| **Question factories** (`makeMCQ`…`makeSymmetry`, `makeCloze`, `makeErrorHunt`) | `engine/helpers.js`, `netlify/functions/questions.js`, `netlify/build-questions.js`, `netlify/lib/questions-sandbox.js` |
| Sandbox context (`STATIC_QUESTIONS` as a **real array**, `window.PSAC_PDF_QUESTIONS`) | the three server copies above |
| `FREE_GRADES` / free-grade helpers | `engine/helpers.js`, `netlify/functions/questions.js` |
| Mauritius day-key helpers (`_muDayKey`) | `engine/app.js`, `engine/store.js`, `netlify/functions/weekly-digest.js` |
| Student-token resolution | `netlify/lib/student-auth.js` ↔ Postgres `current_student_id()` |
| Parent PIN salt `:psac_v1_db` | `_hashPinForDb` (auth.js) ↔ `hashPin` (functions/parent-pin-signin.js) |
| Refusing a password change on a PIN-only session | `changePassword` (auth.js) ↔ `_saveProfilePassword` (app.js) |
| Shop defaults | `SHOP_DEFAULTS` (admin.js), `DEFAULTS` (shop.js), the SQL `coalesce()`s |
| Teacher assignment caps | `GUEST_LIMIT_DEFAULTS` (admin.js), the `coalesce()`s in `guest_assignment_limits()`, the seeded `mm_data` row |
| `REWARD_SLOTS` | app.js ↔ functions/questions.js |
| Kid vibe list | `KID_VIBES` (app.js) ↔ `:root[data-kid-vibe=…]` (style.css) |

⚠ **Reading the code is not a sufficient check for the factory copies.** Grep the
**built bundle** for the field. `learnMore` and `subsection` were each silently
stripped at build time for months while the source looked correct.

⚠ **`netlify/import-questions.js` used to be a FIFTH copy, and that cost 365
questions in production** (fixed 2026-09-08). Its private `_buildContext()` held
only `makeMCQ/makeNum/makeTF/makeMatch/makeSymmetry`, so six French files threw
`makeCloze is not defined` / `makeText is not defined`, were skipped with a
warning in a summary nobody read, and it uploaded **14,361 of 14,726** questions
— **measured live: 0 `text` and 0 `cloze` rows in the database.** It now loads
through `netlify/lib/questions-sandbox.js` (`loadCorpus()` / `loadPack()` /
`evaluateSources()`), the same module the question service and re-grading use, so
it can never drift again; `scripts/test-question-import-parity.js` fails if it
grows a factory or a `vm.createContext` of its own.

##### The importer (`netlify/import-questions.js`)
Full write-up in `DB_IMPORT_GUIDE.md`. The three things worth knowing here:
- **`--check` (no credential, no network) · `--dry-run` (reads only) · no flag
  (upserts).** An unknown flag exits 2 with usage — it must never fall through
  to a live import.
- **Two-phase and fail-closed.** The whole corpus is validated before Supabase
  is contacted, so a broken file anywhere means **zero** writes. An unknown
  question `type` fails preflight; it is never coerced to MCQ.
- ⚠ **A protected row can never rewrite local source as `makeMCQ`.** Only
  `mcq`/`numeric`/`text` are regenerable, and even then the candidate file is
  re-executed through the real loader and compared before it is written.
  Backups + the answer-carrying conflict report go to `.import-conflicts/`
  (gitignored **and** given a `netlify.toml` 404 — a CLI deploy ships
  gitignored files).
- ⚠ **A clean re-import is "0 new, ~560 updated", not zero writes.** `makeMCQ`
  keeps a random 3 distractors, so the 580 questions authored with more than 4
  options change shape on every load. Churn, not drift.

---

#### The landing page (`#screen-landing`, index.html)
The public front door, and the only screen most visitors ever see. Order:
nav → under-construction banner → hero → **measured stats strip** →
**How we teach** → subjects → what we offer → Game Zone → three ways in →
**free-while-we-build panel** → 3 steps → tutors → footer.
- ⚠ **PRICING IS HIDDEN, NOT DELETED.** The three priced tiers that used to sit at
  `#plans` were replaced by a "everything is free right now" panel, and the nav's
  Pricing link and the dashboard's `#pd-upgrade-btn` are gone/hidden. The machinery
  is untouched — `modal-plans`, `Store.listPlans()`, `purchase_*()` and the admin
  Plans tab all still work — so restoring it is a markup change. `#plans` is kept as
  the section id so any old anchor still lands somewhere sensible.
- ⚠ **The "How we teach" section is the product's actual claim**, not decoration:
  many simple questions covering the WHOLE syllabus beat a handful of very hard
  ones; difficulty rises Basic → Medium → Hard → Word Problems where harder means
  *applied*, never obscure. Keep new copy consistent with that — it is why the
  subsection split and the 4-level scale exist at all.
- ⚠ **Every number on this page is measured, and they go stale silently.** The
  stats strip carries a comment saying how to re-count. The page claimed "five
  learning games" in three places for two days after the seventh shipped.
- ⚠ Under 640px every `[data-carousel]` grid becomes a horizontal scroll-snap
  track with dots. **An overflow detector that does not stop at a scrolling
  ancestor will report every card as protruding** — they are off-screen by design.
- ⚠ Contrast on this page was the worst in the app: 20 text runs under 4.5:1,
  the footer disclaimer at **1.65:1**. Fixed 2026-09-06 by raising the alpha on
  `text-indigo-*/30..60` and moving the two CTAs from indigo-500 to indigo-600.
  ⚠ The colour is usually on an ANCESTOR (the `<footer>`, not the `<p>`), and every
  card is a translucent white over a gradient with no opaque background anywhere —
  a naive contrast probe reads `rgba(255,255,255,.05)` as the ground and reports
  1:1 for white text. Composite the layers over each gradient stop and take the worst.
- Tap targets: the nav controls were 32–36px and the carousel dots **8px**. The dots
  are now 16×44px via `padding` + `background-clip: content-box` (+ explicit
  `box-sizing: content-box`, or Tailwind preflight's border-box eats the padding),
  so they look identical and measure 5.5x the area.

#### Grades, pricing, and `comingSoon`
- **Registered: grades 1–9.** Live: **4, 5, 6**. The other 30 packs are
  `comingSoon: true` placeholders (one manifest + one sample question).
- **Grades 1–2 are free forever; 3–9 are paid.** Permanent, and deliberately
  stated separately from the fact that **everything is free right now** while the
  app is being built. ⚠ That second promise carries **no end date anywhere** —
  `FREE_UNTIL_LABEL`, the `data-free-until` spans and `_applyFreeUntilLabel()`
  were all removed. The copy says "free right now, paid plans later"; do not
  reintroduce a deadline without changing every surface at once.
- **Grades 1–6 = PSAC; 7–9 = NCE.** `_gradeStage()` / `_PSAC_MAX_GRADE = 6` is
  the single definition. ⚠ The five subjects registered for 7–9 are a
  **placeholder copy of the primary five** and are not confirmed against the MIE
  lower-secondary syllabus. Confirm before writing any question there.
- ⚠ **Coverage copy is "Grades 4–6, plus NCE Grade 9 Mathematics"** — that, and
  only that, is what a child can actually practise today (updated 2026-09-08).
  **16 live packs, 182 chapters, 15,625 practisable questions.**
  ⚠ **Name the SUBJECT, never the grade.** Grade 9 registers SIX packs and five
  are still `comingSoon`: English, French, Science and Social & Modern Studies
  hold one sample question each, and ICT has 25 questions in **1 of its 12
  chapters**. "Grade 9 is live" or "NCE is live" promises five subjects that
  open empty. The landing page, `_appShareText()` (app.js) and `_inviteText()`
  (auth.js) all say "NCE Grade 9 Mathematics" for this reason, each with a
  comment saying why. ⚠ A WhatsApp message cannot be corrected once forwarded.
  ⚠ **Count what PROJECTS, not what is stored.** 833 of those 15,625 come from
  667 grade9-maths `task` items via `Assessment.projectToItems()`. A raw task is
  in `_POOL_TYPES_EXCLUDED` and has no `question` field at all, so counting
  bundle rows would advertise 667 questions no child can ever be dealt.
  Verified before publishing: all 19 chapters project to something; only 2 tasks
  (drawing/construction) yield nothing online, by design.

##### The `comingSoon` rule
> Anything that builds a list a **parent or child** sees filters `!p.comingSoon`.
> Anything an **admin authors with** does not. The two grade pickers show them on
> purpose, disabled, badged "Coming Soon".

Filtering: `Shop.sellableChapters/sellableSubjects`, `admin _allChapters/_allSubjects`
(⚠ these feed **Publish catalogue**, which is what `purchase_subject()` validates
against server-side), the plan chapter picker, `calendar _subjectsForGrade`,
`search _fillSubjectFilter`, `app _subjectChips`.
Not filtering, and must not start: `renderGradeSelect` / `renderSubjectSelect`,
the admin Content kill switch, the admin question-manager cascades.

##### Grade dropdowns
`_populateGradeSelects()` fills anything with `data-grade-select`:
`"live"` = grades with a non-`comingSoon` pack (**parent-facing**: family setup,
add child) · `"all"` = every registered grade (**authoring**: admin filters).
⚠ It runs twice — the script tags sit mid-`<body>`, so `#modal-qm-form` is not
parsed yet at first run. `DOMContentLoaded` catches the rest.

---

#### ⚠ Where each rule is ACTUALLY enforced
The client decides what to *draw*. The server decides what a child *receives*.
Never move an entitlement decision into the browser.

| Rule | Enforced in | NOT enforced by |
|---|---|---|
| Which questions a child gets (plan, kill switch, entitlements, expiry, blocks) | `netlify/functions/questions.js` (service role) | `_planAllowsChapter()` — UI only |
| Credits earned | `record_student_activity()` RPC (idempotent, reads `current_student_id()`) | anything client-side |
| Credits spent | `purchase_chapter()` / `purchase_subject()` (price + balance read server-side, row-locked) | the Buy button |
| Expired account | `questions.js` | `Auth.isAccessExpired()` — picks wording only |
| Forum identity (`author_name`/`author_type`) | `forum_set_author` BEFORE INSERT trigger | the browser (it no longer sends them) |
| Parent PIN, when it mints a session | `netlify/functions/parent-pin-signin.js` + `parent_pin_attempts` (service role) | `_pinMatches()` — a local convenience check only |
| Parent's own `lockedChapters` | client only — **deliberate**: the parent is not the adversary, and per-child server filtering would make the question cache per-child |

Ordering that is the whole feature, in `questions.js`:
- **expired** ⇒ allowed list becomes *exactly* the live entitlements, even on an
  unlimited plan and even with plan enforcement off.
- **not expired** ⇒ entitlements are *added* to the plan. Buying is never subtractive.
- Free grades bypass the plan list and expiry, but **not** moderation blocks or
  the admin kill switch.

⚠ `security_events` rows prefixed `client:` are **hints, not evidence** — a real
attacker does not call `flag_security_event()`. Never build enforcement on one.
A referral burst is flagged, never auto-blocked: a genuinely popular referrer
looks exactly like a farm for the first few hours.

---

#### Data & storage

##### The progress blob (`DB`, → `student_progress.data`)
`stats` · `chapters[id].{attempted,correct,last}` · `examHistory` ·
`daily` · `mistakes` · `assignments` · `restrictions` · `dailyGoal`.
New keys go in `Store._defaultStudent()` so the key-merge in
`loadStudentProgress()` backfills every existing child for free — and so there is
**no new column-level GRANT to forget**.

| Key | Shape | Cap |
|---|---|---|
| `daily` | `{'YYYY-MM-DD': {a, c, e, s, g, ch:{id:[att,corr]}, asg:{…}}}` | `_DAILY_KEEP` 120 days, `_DAY_CH_KEEP` 12 chapters/day |
| `mistakes` | newest-first | `_MISTAKE_KEEP` 60 |

- ⚠ **Day keys are Mauritius days (`_muDayKey`), never the device clock.** A child
  changing timezone would otherwise rewrite their own history. `YYYY-MM-DD` is
  chosen so a lexicographic sort *is* chronological; the prune relies on it.
  **One deliberate exception**: calendar squares are keyed on the *local* date,
  because the squares are local dates.
- **Attribution**: exam and assignment answers do **not** write `daily[].ch` —
  each already has a dated row of its own (`examHistory`, `completed_at` / `asg`).
  Day totals `a`/`c` still count every answer whatever the source, and chapter
  mastery (`DB.chapters`) still counts exam answers.
- **Skips are not mistakes.** Mistake text goes through `_plainText()` capped at
  160 chars — question text is `innerHTML` and can carry a whole inline SVG.
- `s` = **time on task, measured as the gap between consecutive answers capped at
  3 minutes** — never a wall-clock timer, which would report an hour of "study"
  for a tab left open. It under-reports on purpose; renders as "—", never "0m".
- `_recordDaily()` and `_checkDailyGoal()` run **before** the `ASSIGNMENT_MODE`
  early return in `recordAnswer()`, and that branch must `save()`.
- ⚠ `examHistory` rows carry **`iso`** as well as the legacy display `date` —
  `toLocaleDateString()` read back through `new Date()` is **Invalid Date** on
  every `en-GB` browser, i.e. exactly the devices this app targets. Legacy rows
  are shown as-is, never round-tripped, and get no calendar square.

##### Saving
⚠ `Store.saveStudentProgress()` is a **throttle, not a debounce**
(`_pendingSince` + `_SAVE_MAX_WAIT_MS`). It used to reschedule on every answer,
so steady practice produced **zero** server writes and only exam submit
(`immediate: true`) ever got through.
- `clearStudentSession()` / `saveStudentSession()` **flush before** touching the
  stored session; `endStudentSession()` **awaits** the flush before the RPC
  (after it, `current_student_id()` is null and RLS refuses every write).
- `visibilitychange → hidden` and `pagehide` flush. Not `beforeunload` — it does
  not fire reliably on mobile.
- `loadStudentProgress()` **keeps the local cache when its `stats.totalAttempted`
  is higher than the server's** — total answers only ever go up, so a lower server
  row is a strict ancestor. `assignments` stay special-cased (parent-written).
- `_cancelPendingFlush()` now genuinely means *discard*; nothing in the session
  path calls it.

##### Question cache (`mm_qc_v<N>_<owner>|<subject>`, 7 days)
⚠ **The key carries the OWNER, and the owner is whoever authorised the fetch** —
a child's session id, or `adult`. It was the subject alone, on a device a whole
family shares, so the first child to open Maths cached the set the server had
filtered for *them* and the next child read it straight back. Same defect the
service worker was stopped from having; this copy simply outlived that fix.
- ⚠ **A handover must call `QuestionLoader.useStudent(id)`.** `STATIC_QUESTIONS`
  and `_done` are module state and **switching child never reloads the page**
  (`openStudentSwitch` and `pdSwitchStudent` are both in-page), so without it the
  next child inherits the pool outright and `_done` reports every subject already
  loaded — which defeats the owner-scoped key entirely. `reset()` truncates to the
  count captured at module load, so whatever the manifests pushed survives.
- ⚠ **The child's token beats the parent's JWT in `_buildAuthHeaders()`.** It
  preferred the JWT whenever one existed — and on a shared phone one always does,
  by design — so a child practising beside a signed-in parent was authorised as
  the *parent*, and `_resolveOwner()` gives a JWT no `studentExpiresAt`. That
  child's own expiry was never applied. A stored session belonging to a *different*
  child is ignored (the `pdSwitchStudent` preview case).
- ⚠ The purge tests `mm_qc_v`, **not** `mm_qc_` — `mm_qc_lru` shares the shorter
  prefix and was deleted on every page load, leaving eviction order arbitrary.
- `_LRU_MAX = 6` counts **slots, not subjects**: two children on one device
  compete for the same six. Deliberate — a lost bundle costs one refetch; losing
  the session token to the quota reads as "it keeps logging me out".
- `scripts/test-question-pool-isolation.js` (25 checks).
⚠ **This is the ONLY offline copy of the questions** — the SW deliberately no
longer caches `/functions/questions` (that response varies per caller).
- ⚠ **THE CACHE IS BUDGETED IN BYTES, NOT SLOTS** (`_BYTE_BUDGET = 3,400,000`
  characters, alongside `_LRU_MAX = 6` as a second, cheaper guard). Counting slots
  was fine while every subject was a similar size and stopped being fine the moment
  one was five times another. **Measured 2026-09-07:** grade6-french **1,413 KB**
  against grade4-science 237 KB; all fifteen live subjects **8.48 MB**; the six
  largest **5.64 MB** — i.e. six slots exceeded a ~5 MB quota on their own.
  ⚠ Sized so **a child's own grade always fits whole**. ⚠ **RE-MEASURED
  2026-09-08, after 525 items were added: Grade 4 2.78 MB, Grade 5 3.26 MB,
  Grade 6 3.29 MB against the 3.40 MB budget** — the headroom is down to about
  0.11 MB, from 0.36 MB. The largest bundle is now grade6-french at 1,508 KB and
  all fifteen come to 9.33 MB. **The next content addition of this size pushes a
  grade out of its own cache**, and the symptom is a child losing a subject
  offline with nothing in the UI to explain it. Re-run the budget test before
  writing another bank, and treat raising _BYTE_BUDGET as a trade against the
  5 MB origin quota (Grade 6 already puts the origin at 4.19 MB). Earlier figures
  were Grade 4 2.72 MB, Grade 5 3.04 MB, Grade 6 2.72 MB — that is the entire offline case, and cross-grade
  practice is the exception that evicts. A 3.0 MB budget was tried first and cost
  Grade 5 a subject.
  ⚠ **A size the index does not know is MEASURED, never assumed to be zero.**
  The recency index now stores `{u, b}` — use counter and size — and reads an
  older bare number as `{u: n, b: 0}`, filling `b` in from storage the first time a
  total is needed. Treating an unmeasured 1.4 MB entry as free space is how a budget
  stays in the code and stops doing anything.
  ⚠ There is nothing to strip from the payload: **74% of a French bundle is
  question + explanation + hint + options**, which is the teaching content and
  exactly what a child needs offline. The fix had to be eviction, not compression.
  `scripts/test-question-cache-budget.js` drives the real `_writeCache` with the
  real built bundle sizes through a storage stub that enforces a 5 MB quota, and
  fails if a grade stops fitting — rebuild the bundles first
  (`node netlify/build-questions.js`). `scripts/test-question-pool-isolation.js`
  covers the eviction order, the legacy index and the session token (42 checks).
- On `QuotaExceededError` (incl. Safari's `NS_ERROR_DOM_QUOTA_REACHED`, codes
  22/1014): evict and retry ×3. A non-quota failure evicts nothing.
- ⚠ **Recency is a monotonic counter, not `Date.now()`** — a grade's five
  subjects are written in the same millisecond and tie.
- ⚠ **`[]` is never written or read back as a hit.** An empty payload is a real
  answer (fully gated account) and caching it handed a child an empty subject for
  a week with no recovery.
- Eviction only ever touches this cache's own `mm_qc_` keys — never the session.
  (A silently failed `localStorage` write is also how `saveStudentSession()` lost
  a token and the app read as *"it keeps logging me out"*.)

##### `QuestionLoader.loadSubject()`
⚠ `_done` is rolled back when a load **failed**; only "the server says you get
nothing" stays `true`. Marking a failed load as done left a subject permanently
empty for the session. `startChapterDirect()` retries **once** and then shows a
real message — an unbounded retry through resolved promises pegged the CPU at
20,000 iterations/second and killed the tab.

---

#### Auth & sessions

##### Two credentials, two worlds
- **Adults** (parent/teacher/admin): a Supabase JWT, `auth.uid()`.
- **Children**: no JWT. A PIN → an opaque session token, stored **SHA-256-hashed**
  in `student_sessions` with an expiry, sent as `x-student-token`, resolved by
  Postgres `current_student_id()` and by `netlify/lib/student-auth.js`
  (`resolveStudent(headers)` — same header, same digest, same expiry bound).

⚠ **Fails closed with no service key.** The old check treated a missing key as
"skip", turning one config mistake into an open endpoint. A fail-closed change
must be paired with a check that its dependency is configured in the target
environment — that omission took the whole app down on the first CLI deploy.
⚠ Missing / expired / revoked all answer the same 401. A student **UUID is not a
credential** — it is permanent client state; only the token proves possession.
⚠ The questions auth cache is keyed on the **token**, not the student id, so
revocation actually takes effect. A 503 is never cached.

##### ⚠ Email is a scarce, shared resource
- **Password recovery has two routes, and only one needs email.** A parent still
  signed in changes their password in Account & Settings (`Auth.changePassword`
  → `updateUser`) with no email at all. A parent who is signed out needs the
  reset link, which **is** capped — so `admin-account-recovery.js` also takes
  `action:'set_password'`: the server generates a temporary password, sets it
  through the service role, and returns it **once** to the administrator, who
  passes it on out of band. Nothing is emailed.
  ⚠ The password is in the response and **nowhere else** — not the log line, not
  the `security_events` row. ⚠ An admin may not set a **peer admin's** password
  unless they are super admin; that would be a straight privilege grab between
  equals. Every use writes `security_events kind='admin:password_set'`
  (`service_role` has the INSERT grant — checked, not assumed).
- ⚠ **The parent PIN can NEVER be a password-reset credential**, and a
  PIN-minted session may not change the password either. It can sign a parent
  back IN on a browser that already knows them (see The parent PIN), and that
  is the whole of its reach. On a new device — the actual "I forgot my
  password" case — there is no remembered parent to sign in as, so the PIN is
  not even applicable; and letting four digits REPLACE the password they stand
  in for is the one move that turns a shoulder-surfing child into an account
  takeover. `Auth.isPinOnlySession()` refuses it in **both** password forms
  (`changePassword` in auth.js, `_saveProfilePassword` in app.js — two hand-written
  copies of one action, so both check or the guard is decorative).
- ⚠ **`emailSignUp()` routes off the RESULT, never a stored assumption about the
  project's email setting.** `signUp()` returns a live session when
  `mailer_autoconfirm` is on and none when it sends a link, so the branch is
  `if (data?.session)` → `_handleParentSessionGated`, else the check-email
  screen. Hard-coding either one strands every new parent on the wrong screen the
  day that setting is flipped.
- ⚠ **Every sign-up, resend and password reset spends ONE email from ONE shared
  quota.** `_emailErrorText()` separates the two situations GoTrue returns behind
  the same 429 — `over_request_rate_limit` (the 60s per-address floor, the
  caller's own doing) from `over_email_send_rate_limit` (the project-wide cap,
  which no amount of retrying clears) — and leaves anything it does not recognise
  with its ORIGINAL wording, because an invented friendly message over an unknown
  fault is how a real bug becomes unreportable.
  `scripts/test-email-errors.js`.

##### ⚠ `x-student-token` must never touch `/auth/v1/`
It is not CORS-safelisted, so it turns the parent's token refresh into a
preflighted request GoTrue rejects — the parent's session then dies silently
about an hour later. `_sbIsAuthRequest()` in `engine/supabase.js` is a
**deny-list on the auth path**, not an allow-list on `/rest/v1/`; an unparseable
target is treated as auth.

##### Who owns the device
A shared phone holds both sessions at once. `_markActiveMode()` records who most
recently signed in **on purpose** — a student PIN login, landing on the parent
dashboard, `exitParentMode()`. ⚠ **Never on a restore**, or every reload
re-crowns the parent (which is exactly the bug: `init()` used to check the parent
session first and `return`, throwing the child into the parent dashboard on every
cold start). With no record, a stored **student** session wins.
- `_isParentSession()` = `!!Auth.getParentProfile()` and **wins over
  `ACTIVE_STUDENT_ID`** — a parent previewing a child has that child's `DB`
  loaded, which once showed the parent the child's profile, streak and level and
  wrote the parent's theme into the child's saved progress.
- `switchToStudentSelect()` clears `_parentProfile` (so the kid-only screen guard
  does not bounce the child) but **keeps `_parentUser`** (so `onAuthStateChange`
  does not re-fire mid-session). ⚠ `_parentProfile = null` happens only **after**
  the PIN is accepted — clearing it first strands a parent who mistypes. Success
  is a `_handovers` counter, not "`_parentProfile` went away".
- ⚠ Anything checking "is a parent signed in" must accept **live session +
  `_parentUser` set + `_parentProfile` cleared** — the state the app deliberately
  creates. Getting this wrong locked parents out of their own dashboard.

##### The parent PIN
⚠ **CHANGED 2026-09-06: the PIN is now a real credential.** It used to gate a
UI switch and nothing else, and a correct PIN could still end at "signing in
again needs your email and password" whenever the refresh token was genuinely
dead. It now signs the parent back in through the server. Two copies exist and
they are not equivalent:
- `localStorage` `psac_parent_pin_v1` = `btoa(pin + ':psac_v1')`. **Still base64,
  still not a hash** — `atob()` gives the PIN straight back. It is a local
  convenience check, never proof of anything, and `_backfillDbPinFromLocal()`
  exists to read it back out and move legacy PINs to the server.
- `profiles.parent_pin_hash` = SHA-256 of `pin + ':psac_v1_db'`. **This one is
  the credential.** `profiles_select` is `id = auth.uid() OR is_admin()`, so
  only the owner and an admin can ever read it.

⚠ **The DB copy is unreachable from the browser in exactly the case it was
added for.** `_fetchDbPinHash()` reads `profiles` through the browser client,
which needs `auth.uid()` — which is what is missing when the session is dead.
So `_pinMatches()` can only ever compare against `localStorage` at that point,
and a **local miss is not a verdict**: a cleared localStorage, another browser
profile or a PIN set on a different device all left a CORRECT PIN failing
against nothing at all. `_submitParentPin()` therefore falls through to the
server on a local miss, and only a refusal from **there** shakes the pad.
Offline is the exception — nothing to ask, so a miss stays a miss.

All copy says **"in this browser"**, not "on this device":
localStorage is per origin + browser profile, so a preview URL, another browser,
a private window, or Safari's 7-day eviction all lose it.
`openParentPinSetup()` is the unguarded entry (Account & Settings → Security);
`_promptSetParentPin()` keeps its once-only first-run guard.

##### Server-side PIN sign-in — `netlify/functions/parent-pin-signin.js`
`POST /api/parent-pin-signin {user_id, pin}` → service role verifies against
`profiles.parent_pin_hash`, then mints a session with
`admin.generateLink({type:'magiclink'})` → `verifyOtp({token_hash})` and returns
**only** `access_token` + `refresh_token`. The browser installs it with
`setSession()`. `scripts/test-parent-pin-signin.js` (36 checks) and the ladder + wiring in
`scripts/test-parent-pin-recovery.js` (51).
- ⚠ **`generateLink` GENERATES; it does not send.** That distinction is
  load-bearing — email is a shared ~500/day Gmail quota and a recovery path
  that spent one per attempt would exhaust it. Re-verify after deploy.
- ⚠ **Every kind of "no" answers the SAME 401 `invalid`**: no such profile, no
  PIN on file, disabled, closed, an admin, a wrong PIN, a malformed id. Any
  difference between them is an account-enumeration oracle. The branches exist
  only so the server log can tell them apart.
- ⚠ **An admin can never be entered by PIN.** Four digits in front of
  `is_admin()` is not a trade this project makes.
- ⚠ **The lockout is the only thing standing between 10 000 guesses and a
  parent account.** 5 wrong → a lockout, and **each lockout is twice the
  last** (15m, 30m, 1h, 2h ... capped at 24h), counted in `parent_pin_attempts`,
  which has **no grant to anon or authenticated at all**. Deliberately NOT a
  column on `profiles`: `profiles_update` lets a parent update their own row
  with no column restriction, so a counter there could be zeroed by the very
  session an attacker is trying to obtain. A per-IP burst cap sits in front of
  it, best-effort (module scope, one Lambda container).
- ⚠ A mint failure is **503, never 401** — telling a parent their correct PIN
  was wrong is how an evening is spent retyping four right digits.
- ⚠ The **salt `:psac_v1_db` is hand-copied** into `engine/auth.js`
  (`_hashPinForDb`) and the function. Drift means a stored PIN silently stops
  matching with no error anywhere; the test asserts both literals.
- ⚠ `psac_parent_uid_v1` is a **separate** localStorage key from the stash and
  is never cleared with it. The stash holds a refresh token that can
  legitimately die; this holds only WHICH parent this browser belongs to, which
  stays true afterwards and is the subject the endpoint needs. Keeping it
  inside the stash is how a verified PIN ended up with nobody to sign in as.
  It is **not** a credential — a user id is permanent client state; only the
  PIN proves possession.

⚠ **A correct PIN must never dead-end on "your sign-in expired".** The PIN
cannot mint a session, but a **refresh token** can — and supabase-js deletes its
own persisted one the first time a refresh fails (a tunnel, a sleeping phone),
which is indistinguishable from a revoked session. `_ensureParentSession()`
escalates instead: read → re-read (still restoring) → `refreshSession()` →
**`refreshSession({refresh_token})` from our own copy** in `psac_parent_sess_v1`,
rewritten on every auth event because rotation makes a stale copy worse than
none. Same origin, same localStorage, no new exposure — `persistSession` already
writes that value under `mm_sb_auth`.
- ⚠ Step 4 runs **only last, and only once**: replaying a rotated-out token can
  revoke the whole family server-side. A **refusal** drops the stash.
- ⚠ **Only a refusal.** This used to drop the stash on ANY failure, so one 502,
  one captive portal, one connection dropped mid-flight — none of which say
  anything about the token — disarmed the recovery permanently, and every
  correct PIN afterwards dead-ended. `_isTokenRefusal()` calls 400/401/403 a
  verdict, 5xx/429/408 the network, and falls back to the message (GoTrue names
  a dead token; a network failure says "Failed to fetch"). Erring towards
  KEEPING it is the safe direction: replaying a dead token costs one refused
  request, dropping a live one costs the parent their account on this device.
- **Step 5 is the server** (`_pinServerSignIn`) — see Server-side PIN sign-in
  below. Reaching the "could not reach your account" message now means BOTH
  routes are gone, which is why that copy no longer implies the PIN was wrong.
- ⚠ The stash is cleared **only on a deliberate sign-out**, never in the
  `SIGNED_OUT` handler — supabase-js emits that for a dropped refresh too, which
  is the exact case being recovered from.
- ⚠ A successful re-mint **emits `SIGNED_IN`**, so `_suppressAuthEvents` keeps
  `onAuthStateChange` out of the routing the caller is already awaiting. It is
  scoped to **that arm only** — `SIGNED_OUT` is always honoured, including the
  one `_handleParentSession()` raises for a disabled account, or `_parentUser`
  survives the refusal and the next sign-in opens the dashboard anyway.
- ⚠ **Offline is not "signed out"** — the ladder stops at the first read and the
  copy says so; the token may be perfectly good and merely unverifiable.
- ⚠ **`session-invalid` is not always the CHILD's session.** `_activeAccount` is
  set for a parent *previewing* a child too, and that path has no student token —
  its writes go through the parent's JWT. The handler used to answer a refusal
  there by clearing the child's session and dropping the parent onto the student
  PIN screen reading "Your session has expired". It now renews the parent's
  session in place and says nothing; `_parentProfile` is the discriminator.
- `init()` consults the stash too, gated on it existing so a first-time visitor
  makes no network call — otherwise the same lapse still logged a parent out on a
  plain reload, with no PIN involved to hint why.
- `scripts/test-parent-pin-recovery.js` (25 checks, scripted `_sb` stub).

##### Other session rules
- Every fresh student PIN login bumps `session_version`; a 5-minute guard logs out
  a mismatch ("account accessed on another device"). `pdSwitchStudent` passes
  `bumpSession: false`.
- One-tap child login links: `?join=<token>`, 32 random bytes, **single use**,
  48 h, **SHA-256 stored only**, and **never carrying the PIN** (a PIN never
  expires, so a forwarded screenshot would be a permanent key).
  `_tryJoinLink()` runs before every routing decision and signs out any parent
  session on that device first.
- `psac_known_students` (cap 8) remembers family name + username per child for
  quick sign-in. ⚠ **Never the PIN.** The fields are *hidden, not emptied* —
  `checkStudentReady()` / `studentSignIn()` still read them.
- ⚠ **A parent previewing a child is NOT a student login.** `pdSwitchStudent()`
  reaches `_loginStudentRow()` with **no token**, and that path must not persist
  a student session or stamp `_markActiveMode('student')` — a tokenless session
  is a credential nobody can use, so the next reload resumed it, found no token
  and answered "Please sign in again to continue." on **every** refresh. One tap
  on a child's card in the parent dashboard poisoned the device permanently.
  Routing therefore reads a tokenless stored session as **absent**
  (`_storedStudentSession()`), which also heals installs already poisoned.
- The student-switch PIN pad holds **no auth logic** — it fills the same three
  fields and calls the same `studentSignIn()`. ⚠ `_showAuthError()` is routed
  into the modal while it is open, or the wrong-PIN message is written to a
  screen nobody can see.
- Referrals: `?ref=CODE` captured before routing. `referral_code` (public, for
  WhatsApp) is deliberately **not** `families.family_code` (private join secret).
- ⚠ **Forum ownership is `author_id`, never the display NAME.** `canDel` compared
  `author_name` to the caller's own name, which gave two parents with the same
  name a delete button on each other's posts (the database refused, so the button
  was simply a lie) and gave an **admin** no delete button at all — while
  `posts_delete`/`replies_delete` have allowed `is_admin()` the whole time.
  Being an admin is a property of the ACCOUNT, not of which screen they are on,
  so `Auth.isAdmin()` applies in the ordinary parent view too.
  ⚠ **41 of the 42 live forum rows have `author_id = NULL`** — written before the
  `forum_set_author` trigger — so their authors can never satisfy the ownership
  arm of the policy and `is_admin()` is the only way they can ever be removed.
  Verified as `authenticated` in a rolled-back transaction: a parent's DELETE of
  someone else's post matches **no rows and raises nothing**; the admin's removes it.
- **The forum is adults-only, in the database** (`auth.uid() IS NOT NULL`), not
  by hiding the button. A child session is anon and is excluded by construction.
  `_ADULT_ONLY_SCREENS` in `showScreen()` covers every route in.

---

#### Database

##### One file: `supabase-schema.sql`
**There is exactly one .sql file at the repo root, and it is generated, not
written.** On 2026-09-06 the 31 incremental migrations (every `supabase-*.sql`,
plus `guest.sql`, `report_error.sql` and `migrations/`) were replaced by a
single dump of the live database. Every one of them had already been applied.

This has happened before: the previous `supabase-schema.sql` replaced 24
incremental files on 2026-08-26, and 31 more accumulated in the eleven days
after. **Expect the same drift, and regenerate rather than adding a file.**

| Thing | Where |
|---|---|
| The schema | `supabase-schema.sql` — 48 tables · 144 constraints · 121 indexes · 105 functions · 10 triggers · 77 policies · 1 093 grants |
| Regenerate it | `SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js` |
| Test it | `scripts/sql-tests/run-schema-tests.sh` |

⚠ **Do not hand-edit `supabase-schema.sql`.** Apply the change to the database,
then regenerate. The file's whole value is that it says what is *deployed*, not
what someone intended — which is the difference that has cost this project the
most time. `scripts/dump-schema.js` carries the traps that make the dump
correct (the `NOTNULL` postfix-operator alias that silently deleted every NOT
NULL, constraint ordering by kind, deferred defaults found via `pg_depend`,
`check_function_bodies`, the pinned `search_path`); read its header before
changing it.

⚠ **Verified 2026-09-06, not asserted:** a database rebuilt from this file alone
on `postgres:17-alpine` matches production on **1 969 catalogue objects** —
every column with its type, nullability and default, every constraint, index,
function body, trigger, policy and grant. The only differences are the two
explained in the file. Re-measure with `scripts/sql-tests/run-schema-tests.sh`
plus the comparison it describes; do not carry that number forward.

⚠ **The file is a snapshot, not a diff.** It drops nothing, so anything added to
production later survives a re-run — but it *overwrites* function, policy and
trigger bodies with the ones recorded in it. **Regenerate before you re-run it,
or you roll a later fix backwards.**

⚠ **Applying it to production is no longer a pure no-op.** §12 backfills an
owner row per family and production is missing 9 of them (measured 2026-09-06).
That is the intended convergence, but know it before you run it.

⚠ **The live database cannot tell you whether the file works.** Applying it to
production only proves it is idempotent against a database that already has
everything. Both ordering bugs it has had — a foreign key emitted before its
target's primary key, and a column default calling a function not yet created —
were invisible until it was built **from nothing**. That is what step 1 of
`run-schema-tests.sh` does.

##### Two things in the file are deliberately NOT applied
`supabase-schema.sql` ends with two blocks that need a human decision:
1. **`families_name_unique_ci`** — self-skipping, because two families are both
   named "gobin" (see Pending). It warns instead of failing.
2. **The `families_own` fix** — commented out. See the security finding in
   Pending; a co-parent can currently take over a family.

##### ⚠ Four rules that have each cost real damage
1. **Never author a policy change from `supabase-schema.sql`.** It is stale.
   Query `pg_policies` on the live database first — writing against the dump once
   produced a policy that would have silently un-restricted the forum.
2. ⚠ **A policy's USING clause is checked on INSERT too — whenever the statement
   carries a `RETURNING`**, which PostgREST emits for every `.insert().select()`.
   So a USING predicate that has to **look the row up** answers false for a row
   being created in that same statement: it is `STABLE`, and the new tuple is not
   in its snapshot. The co-parent change rewrote `families_own` USING from
   `parent_id = auth.uid()` to `is_family_member(id)` and broke creating a family
   outright — for two days, four real parents, while every existing family still
   read back fine. ⚠ **The 42501 names the wrong half**: "new row violates
   row-level security policy" reads as a WITH CHECK failure and the WITH CHECK
   was passing throughout. Tell them apart by running both forms as
   `authenticated` in a rolled-back transaction — plain `INSERT` succeeded,
   `INSERT … RETURNING` did not. **Always keep a same-row column predicate in a
   USING clause you widen.**
3. **`public.students` has COLUMN-LEVEL SELECT grants** (so `pin`, `pin_hash`,
   `pin_attempts`, `pin_locked_until` stay unreadable). **Any new column inherits
   no grant**: every query touching it fails `42501 permission denied for table
   students`, a message that never names the column, and the client turns that
   into an empty result. Put a `GRANT SELECT (col)` beside every `ADD COLUMN`.
   (This is how adding `deleted_at` emptied the parent dashboard.)
4. **Grant `TO anon, authenticated` for anything a child calls.** A child session
   is `anon` + a token header. The friend RPCs were `authenticated`-only and dead.
   And check every function in a `revoke … from public` block actually has a
   matching grant — `purchase_subject()` did not.

##### Other database facts worth keeping
- ⚠ **`public.profiles` has NO email column** — the address is in `auth.users`,
  which the browser cannot read and should not. So the admin members list could
  only identify an account by a display name the member typed themselves, which
  is worthless for telling two test accounts apart.
  `admin-member-emails.js` resolves them through the service role: **only for
  the ids asked for, only for an admin**, with no list/search/page, so it cannot
  enumerate the user base. Failures are logged and leave the line blank rather
  than toasting on every render.
- **Admin › Teachers shows what each teacher has DONE, not just who they are.**
  `profiles` holds a name, status and tier; whether a teacher ever set work
  lives in ten teacher-owned tables plus `auth.users.last_sign_in_at`, most of
  which an admin cannot read from the browser. `admin-teacher-activity.js`
  (service role, `requireAdmin`, ids only, capped at 30 — same shape as
  `admin-member-emails.js`) folds them via `netlify/lib/teacher-activity.js`
  into one summary per id: status bucket (active in 30 days / dormant / signed
  in but never set work / never signed in), last thing done and when, last
  sign-in, classes and pupils, assignments and results (total + last 30 days),
  materials, and a per-class + recent-guest-assignment breakdown. A table that
  cannot be read is NAMED in `partial` and shown as unknown, never as 0.
  `scripts/test-admin-teacher-activity.js` asserts every bucket.
- ⚠ **Deleting an account does NOT delete everything it owns.** `auth.users`
  cascades cleanly down `profiles → families → students →` sessions,
  submissions, enrolments, push subs, friends, invites (verified against the
  live constraints, not the dump). But **five tables key their owner as `text`
  with no foreign key**, so the cascade cannot see them and every row survives:
  `student_progress`, `schedule_entries`, `study_schedules`,
  `student_assignments`, `login_events`. Production already carries one
  orphaned `student_progress` row. `admin-delete-account.js` purges them
  explicitly, and **collects the student ids BEFORE the cascade** — afterwards
  there is no way left to know which rows belonged to whom.
  ⚠ `security_events` is deliberately NOT purged: its `user_id`/`student_id`
  carry no FK precisely so the audit trail outlives its subject.
  ⚠ Admin delete is **permanent**; `Store.deleteMyAccount()` is the soft one
  (`profiles.deleted_at`, `auth.users` kept so a parent can restore). Do not
  confuse them, and keep Disable as the reversible option in the UI.
- A `DELETE` whose RLS policy matches no row returns **no error and no rows**.
  Use `.delete().select('id')` and treat zero rows as failure — reading that as
  success is how a deleted child came back and became a duplicate.
- Soft delete everywhere: `profiles.deleted_at`, `students.deleted_at`, partial
  unique index `students_live_username_key … WHERE deleted_at IS NULL`. The
  `auth.users` row is **deliberately kept** so restore works and re-signup lands
  on "you already have an account".
- ⚠ Fall back to an older column list **only** on a genuine missing-column error
  (42703 / PGRST204). Falling back on *any* error once dropped the
  `deleted_at IS NULL` filter and resurrected deleted children.
- Privileged columns (`role`, `is_super_admin`, `disabled`, `expires_at`,
  `referral_code`, `credits`, `blocked_until`, `students.expires_at`) are
  protected by BEFORE UPDATE triggers, because `profiles_update` allows a parent
  to update their own row with **no column restriction** — a one-line PostgREST
  call used to grant `role: 'admin'`. Deliberately **not** guarded, each for a
  reason: `teacher_status` / `teacher_tier` (a non-admin applicant writes them,
  and `role` is guarded anyway), `session_version` (anon `verify_student_pin`
  bumps it), `profiles.deleted_at` (the owner's own).
- `credit_ledger`, `chapter_entitlements` and `security_events` have **no
  insert/update/delete grant at all** — stronger than a policy, because a later
  policy mistake cannot open a hole with no grant behind it.
- ⚠ **Family setup is a three-step wizard with no transaction** — profile, then
  family, then the first child. A failure at step 2 or 3 leaves earlier rows
  written, so `createProfile()` and `createFamily()` **resume on 23505** rather
  than failing: the profile PK can only be the caller's own row, and
  `families.parent_id` is UNIQUE, so "you already have one" is probed via
  `getMyFamily()` and never confused with the family-NAME collision that shares
  the same SQLSTATE. Both now return `{_error:{code,message}}`; a bare null hid
  a `42501` behind "Error creating profile. Please try again."
  A **profile with no family is that interrupted setup**, and
  `_handleParentSession()` routes it back to family-setup — but only when
  `Store.lastFamilyError()` is empty (the query *answered* "none") and only for
  `role === 'parent'`. Routing a failed READ there would write a second family
  over one that exists; an admin legitimately has no family of their own, and a
  co-parent's arrives via `my_member_family()`. Covered by
  `scripts/test-setup-recovery.js`.
- `Store.getMyEntitlements()` / `getFamilyEntitlements()` return **null** on
  failure, never `[]`. `[]` is a real answer ("owns nothing") and conflating them
  made a flaky network silently re-lock chapters.
- Queries that gate login must never reference a column an un-migrated database
  might lack — hence `getMyPreferences()`, `getAccountDeletedAt()` and
  `referral_code` are fetched **separately** from `getProfile()`.
- Read a family's children in **one** query (`student_id=in.(…)`), not one per
  child, and mark every requested id fetched hit *or* miss so a child who has
  never practised is not re-queried on every expand.

---

#### UI, CSS and layout traps
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`,
  `main` or `body`, even as an animation.** A transformed ancestor becomes the
  containing block for every `position: fixed` descendant — this is what put the
  practice Check/Next bar off-screen. Screen-transition keyframes are
  opacity-only for this reason. If a fixed bar is reported clipped, walk its
  ancestors' computed styles before touching the bar.
- ⚠ **The practice Check/Next bar (`.pr-actions`) is `position: sticky`, not
  `fixed`** (changed 2026-09-08). Fixed pinned it to the bottom of the VIEWPORT
  however short the question was, so on a desktop browser the primary action
  floated in empty space: **measured 449px of empty gap at 1920×1080 and 809px
  at 2560×1440**, putting Check Answer ~620px below the last option. The bug is
  invisible on a phone, where content fills the screen — it only appears when
  the viewport is taller than the content, which is every desktop browser.
  Sticky gives both from one rule: in flow under the content when the page does
  not scroll, pinned when it does. After the change the gap is **0px at every
  size**, and at full scroll every element still clears the bar.
  - ⚠ `margin-inline: -1rem` cancels `<main class="px-4">` so the bar stays
    edge-to-edge on a phone exactly as the fixed version was. Removing it makes
    the bar read as a card rather than a toolbar.
  - ⚠ **`.pr-wrap` must NOT carry a `padding-bottom` reserve any more.** The old
    5.5rem existed to stop the fixed bar covering the last of the content; with
    a sticky bar that takes its own space in flow, the reserve becomes a 5.5rem
    hole between the content and the bar on every screen.
  - ⚠ Sticky's dependency is different from fixed's: it breaks inside an
    ancestor with `overflow` hidden/auto, not a transformed one. `body` carries
    `overflow-x: clip`, which leaves `overflow-y` visible and creates no scroll
    container — that is why `clip` was chosen over `hidden`, and the sticky
    header relies on it too. `body { overflow: hidden }` would kill both.
- ⚠ **MCQ options pair into two columns only when the option TEXT is short**
  (`.pr-answers-pair`, added by `renderAnswerArea()`, CSS at ≥ 700px).
  `.mcq-opt` is `width: 100%`, so on desktop four numeric options were four
  736px-wide bars each holding two characters. The test is on the content, not
  the viewport alone: a French comprehension option is a whole sentence, and
  half a column wraps it to four lines. The class is cleared at the top of the
  render, per the module-state rule — every other question type returns early,
  so a numeric item after an MCQ would inherit the grid.
- `scripts/test-practice-action-bar.js` (85 checks) guards both: the source
  rules, the gap at six viewports from 360×740 to 2560×1440, the phone bar
  staying edge-to-edge, the option pairing, 44px targets, and that the note and
  the explanation still clear the bar at full scroll. ⚠ **Verified to catch the
  bug** by restoring `position: fixed` and the `padding-bottom` reserve — the
  gap came back at 89/135/299/355px and 16 checks failed — then restoring
  `style.css` byte-for-byte (sha256 re-checked).
  ⚠ Two harness traps, both of which produce confident wrong numbers:
  poll for `typeof renderAnswerArea === 'function'`, **not** for `.pr-actions`,
  which is in `index.html` from the first byte and so races `app.js`; and read
  every element measurement into a plain number **before** re-rendering the
  answer area, because a detached node reports 0×0 and that reads as a collapsed
  layout rather than a late question.
- ⚠ **`style.css` loads AFTER the Tailwind Play CDN**, so an equally-specific
  rule of yours wins over Tailwind's — and a bare `display:flex` outranks
  `.hidden` (that is why `.pd-action.hidden { display: none }` is required, and
  why `.kid-hero` carries its own gradient instead of `bg-gradient-to-br`).
- ⚠ **The Play CDN only generates rules for classes present at its initial
  scan.** Markup injected by `innerHTML` later gets the class and no rule. Use
  inline styles there (`style="grid-column:1/-1"`), and **measure the width** —
  asserting the class is present passes either way.
- ⚠ **`body { overflow-x: clip }` behind `@supports`**, not `hidden`: `hidden`
  propagates to the viewport, makes it a scroll container, and breaks the sticky
  header in Safari.
- ⚠ **An `<option>` is painted by the PLATFORM, not by the page.** It inherits
  the select’s `color` and **never** its `background`, which computes to
  `rgba(0,0,0,0)` on every option unless something sets it — so the popup list is
  drawn on whatever ground the platform picks. `bg-white/10 text-white` on the
  family-setup grade picker therefore rendered "Grade 4 / 5 / 6" white on white,
  and all 31 selects in index.html carried the same latent defect. `style.css`
  now gives `option`/`optgroup` an explicit opaque pair per theme, plus
  `color-scheme` **scoped to `select`** (on `:root` it would repaint every native
  control in the app). Guarded by `scripts/test-select-contrast.js`, which
  measures all 31 in both themes and fails below 4.5:1.
- **`.pd-switch` is the promoted "Switch to student mode" bar**, and it sits
  **above** the `.pd-action` row rather than inside it. Handing the device over is
  the most frequent thing a parent does on that screen and the one they could not
  find — as one of eight identical tiles labelled "Student view" it read as a
  settings item, which is why the app carries a one-time nudge pointing at it.
  ⚠ Promote by **altitude, not by colour**: a louder tile inside the row would
  break the single shape language that row exists to have, and put a second CTA
  beside "Add child". Measured by `scripts/test-switch-mode-button.js` — at 360px
  (re-measured 2026-09-06) it is **296px** wide and **5.3x the area** of the
  largest tile, clears 4.5:1 on both gradient stops, and adds no horizontal
  scroll. It is narrower than the student-side twin (328px) only because the
  chalkboard frame pads `#screen-parent`; do not break it out of that padding.
  ⚠ **The two mode switches are ONE control in two directions and must paint
  identically.** `.student-parent-switch` on `#screen-dashboard` /
  `#screen-subject-select` sends the child to the parent gate; `#pd-student-view-btn`
  on `#screen-parent` hands the device back. All three are `.pd-switch` and all
  three are deliberately left OUT of their screen's chalkboard repaint — the
  student side always was (`#screen-dashboard .student-parent-switch` is an
  explicit no-op marker), and `#screen-parent .pd-switch` used to mute the
  gradient to `rgba(99,102,241,.45)`, which made the parent-side bar read as a
  panel rather than the button its twin is. Removed 2026-09-06; a scratch CDP
  probe compares `background-image`, border, radius, padding, shadow and both
  label colours/sizes across all three in **both themes** and they now match
  exactly. ⚠ `test-switch-mode-button.js` hard-codes the stops `[79,70,229]` and
  `[124,58,237]` for its contrast maths — it was measuring the base gradient
  while the screen painted the muted one, so it was passing against a colour
  that was not on screen. Keep those two numbers in step with `.pd-switch`.
  ⚠ The ids stay `pd-student-view-*` and the seen-flag stays
  `psac_student_view_guide_seen` — renaming that key would re-show the onboarding
  nudge to every existing parent.
- ⚠ **Do not share a class name between two components.** `.nav-btn` was both the
  exam question-navigator cell (32×32) and the student tab bar, so tab labels
  spilled out of their buttons on every phone. The tab bar is `.tabbar-btn`.
- Header: below 1100px everything collapses into one labelled **`☰ Menu`**.
  ⚠ The sheet rows are **built from the live header buttons**
  (`_buildHeaderMenu()`), never hard-coded — which controls exist is decided in
  half a dozen places. Icon-only was tried and rejected: an emoji alone is a
  guess, and vertical space is not worth comprehension.
  **Logout keeps a labelled twin (`#header-logout-mobile`)** and never hides in
  the menu (`_MENU_EXCLUDED`).
- Fixed-width grids (`.fam-head` / `.fam-row`) share explicit rem columns because
  two separate grids with `auto` columns cannot align. ⚠ Header labels must stay
  short — a fixed column overflows rather than widening. An inline
  `display:flex` on a cell will silently beat the mobile `display:none`.
- `.pd-tabbar` is `flex-wrap: wrap` with **`flex: 1 0 auto`**; `flex-shrink` must
  stay `0`. A horizontal scroller measured worse — it hid 2 of 5 tabs.
- A centred flex child taller than the viewport gets its top clipped with no way
  to reach it — long modals need `overflow-y: auto` + `my-auto`.
- iOS: any form control under 16px zooms the page in and never back out — a
  `@media (pointer: coarse)` rule raises only `.text-sm`/`.text-xs` controls.
  `backdrop-filter` and `user-select` need `-webkit-` twins.
- ⚠ **No regex lookbehind anywhere.** `(?<=…)` is a *parse* error on Safari <16.4
  and would take the whole file down, not one feature. (`_syllabusPoints` uses
  `.match(/[^.!?]+[.!?]*/g)` for exactly this reason.)
- ⚠ **Line endings differ per file AND between the object store and the working
  tree** — git's autocrlf converts on checkout, so what `git show HEAD:file` gives
  you is not what is on disk. **Measured 2026-09-06 in this working tree:**
  `engine/auth.js` and `scripts/test-*.js` are **CRLF**; `index.html`, `style.css`,
  `engine/app.js` and `sw.js` are **all LF** — index.html is no longer the mixed
  file this note used to describe. **Do not trust this list either: measure the file
  you are about to edit**, preserve what you find, and prefer editing by line index
  over multi-line string patterns. A multi-line search
  string written with `\n` matches nothing in a CRLF file and reports "anchor not
  found" as though the code had changed. Normalise in memory, restore the file's
  own convention on write, and in `index.html` detect the convention **per
  anchor**.
  ⚠ Not theoretical: `scripts/test-family-setup-routing.js` extracted
  `_needsFamilySetup` with a `\n  }\n` pattern and had been reporting "could not
  extract" — which reads as "the function is gone" — while the function was
  present and correct the whole time.
- Everything user-supplied goes through `_attr()` / escaping — mistake rows,
  child display names and the digest email all carry typed input.

##### Screen changes, dialogs and field names (added 2026-09-06)
- ⚠ **A panel that is not INSIDE a `.screen` is never hidden by anything.**
  `showScreen()` toggles `.hidden` on `.screen` elements only, so a full-page
  panel that has escaped its screen simply stays on top of whatever comes next.
  Two live cases, both measured 2026-09-07 and both fixed:
  - **`#admin-tab-questions` sat OUTSIDE `#screen-admin`** — one `</div>` at
    indent 4 closed the admin screen a panel early, and it was the last of the
    ten tab panels so nothing looked wrong. Admin → Question bank → 🔒 Parent
    hid the admin header, stats and tab bar and left the Question bank painted
    over the parent dashboard. It reads as **"the Parent button does nothing"**,
    which is how it was reported and why it cost a long hunt through
    `enterParentMode()` before the DOM was asked instead. ⚠ **Ask the DOM, not
    the indentation** — the file was perfectly tidy and nine panels were fine.
  - **`#tc-classroom-detail`** is a deliberate full-page overlay that is also
    not a `.screen`, and `showScreen()` had never heard of it. A teacher with a
    classroom open who tapped 🔒 Parent got the dashboard rendered under a
    1394×900 panel with `body.style.overflow` still locked to `hidden`, so the
    page could not even scroll. `showScreen()` now hides it — ⚠ but does **not**
    call `TeacherClassroomDetail.close()`, which would clear the remembered
    classroom that `psac_teacher_loc_v1` exists to restore, and it skips the
    case `id === 'teacher'` for the same reason.
  `scripts/check.js` → `checkScreenNesting()` matches each `<div id>` to its
  `</div>` by depth (skipping HTML comments) and fails any `.admin-tab-panel`
  outside `#screen-admin`. Verified to actually catch it by reintroducing the
  bug and restoring the file byte-for-byte.
- **`showScreen()` scrolls to the top and focuses the screen's first heading**
  (`_focusScreen`, only when the id actually changed). Before this, a child
  arriving from a long chapter grid landed mid-page and a screen reader stayed
  "on" a button that no longer existed. It runs synchronously, so a caller that
  focuses its own field straight after still wins.
- **Every `#modal-*` overlay gets the dialog contract from `_Dialogs`** (app.js,
  a MutationObserver on the `hidden` class): `role="dialog"`, `aria-modal`,
  labelled by its first heading (or `*-title` / `*-msg`), focus moved in, Tab
  trapped, **Escape closes through the modal's OWN close control** (backdrop
  handler, ✕, Cancel/Close/Not now…) so its cleanup runs, focus returned to the
  opener. Measured 26/26 get the role, 25/26 close on Escape;
  `modal-round-complete` has no close control by design. New modals need
  nothing — keep the `modal-` id prefix and the `fixed inset-0` wrapper.
- **`_labelUnlabelledFields()`** names any input/select/textarea that has no
  label from its placeholder, title or the short element before it. It is a
  fallback: write a real `aria-label` / `<label for>` (the login, sign-up and
  family-setup fields now have them).
- **The student tab bar is OFF on the practice screen** (`'practice'` is not in
  `_BOTTOM_NAV_SCREENS`). Two stacked fixed bars covered 155px of a 740px
  phone: 2 of 4 options visible on first paint, explanation hidden after Check.
  `_scrollPracticeFeedbackIntoView()` measures against the bar; `'nearest'`
  only cleared the viewport, not the bar.
- **Chapter cards inside the chalkboard subject hub keep their own ink.** The
  board's `h3`/`p` chalk overrides painted card titles cream on white (1.2:1
  in light mode). `.ch-card` rules under the override block reset it; measured
  13.0:1 light, 11.5:1 dark.
- **Focus ring is theme-neutral** (`:focus-visible` on buttons/links in both
  themes, two-tone). The old rule was `html:not(.dark)` only while dark is the
  default.

##### The rough-working pad clears per SESSION, not per screen (2026-09-08)
`#scratchpad-practice` / `#scratchpad-exam` live in `index.html` and are never
rebuilt, so whatever a child drew stayed on the canvas for the rest of the visit —
leave a chapter, open another, and the last chapter's sums sat under the new
question. `_resetScratchpadForSession()` blanks it from the two screen observers.
- ⚠ **Keyed on the SESSION OBJECT's identity** (`S.practice.session`, `S.exam.qs`),
  never on the screen becoming visible and never per question. All five practice
  starts and both exam starts already assign a fresh object literal immediately
  before `showScreen`, so identity alone separates "a new session began" from
  "the child came back to the one they were in" — and a sixth entry point gets
  the behaviour for free, since it cannot start without resetting those counters.
  Clearing on visibility wipes the pad on any return to the screen; clearing per
  question wipes it mid-working, which is the one moment it is needed.
- ⚠ **A reset must restore the placeholder AND re-arm its one-shot listener.**
  That `pointerdown … {once:true}` handler has already fired and been removed by
  the time a session ends, so redrawing the faint prompt without re-adding it
  prints it under everything the child writes for the rest of the session. The
  stroke still lands, so a pixel count does not notice — assert the prompt state.
- ⚠ Clear whenever a 2d context exists, **visible or not**: a pad initialised in
  an earlier session keeps its strokes while its wrapper is collapsed, and
  `clearRect` works on a hidden canvas (the dimensions are the backing store's).
- `scripts/test-scratchpad-session.js` (19 checks, real PointerEvents on real
  pixels, no login — the pad's lifecycle is driven by session identity and the
  screen's class, both drivable directly; the "fresh session object" half is
  asserted against the source). Verified to catch both regressions.

##### ⚠ Module-level UI state must be reset in the RENDER, not in the toggle
Otherwise the next child's panel, the next exam's results or the next subject's
grid opens in the last one's state:
`_examReviewWrongOnly` (in `renderResults`) · `_repShowAllMistakes` (in
`_renderReports`) · `_shopOpen` + the search box (in `renderShop`) ·
`_chapterFilter` (in `activateSubjectPack` — and it is declared **above** that
function, or the reference hits the temporal dead zone) · the round-review
collapsed state.

##### The interactive map — one module, two surfaces
`engine/interactive_map.js` renders both the child's map (`GeoMap.render`) and
the admin editor (`GeoMap.renderEditor`) from one catalogue, one projection and
one set of marker markup. Keep it that way — every bug it has had came from the
two surfaces disagreeing.
- ⚠ **The box's `aspect-ratio` is defined in `ISLANDS` in the JS, not in CSS**,
  and is each base image's own ratio (755×874, 1700×1600). `object-fit: contain`
  then fills the box exactly, so *a percentage of the box is a percentage of the
  artwork* — on both surfaces. A second copy in `style.css` is how they drift.
- **Catalogue size: 88 Mauritius · 25 Rodrigues · 20 world**, every one on real
  lon/lat. Island categories: mountain · **crater** · river · waterfall · water ·
  coast · island · **plain** · reserve · cave · port · town · heritage.
- ⚠ **A river is a LINE, not a point.** Fifteen carry `line: [[lon,lat],…]`
  straight from OpenStreetMap, plus `labelAt` (0–1) saying how far along that
  course the pin and caption sit. `markerPosition()` walks the course by
  DISTANCE, so `labelAt` means "half way down the river" and not "half way
  through the point list" — otherwise the caption bunches wherever OSM happened
  to record detail. Everything else — labels, selection, the info card, the
  editor form — then treats a river exactly like a place.
- ⚠ **Dragging a river's pin slides the name ALONG it; dragging a course point
  reshapes it.** The course is surveyed data and the caption position is ours,
  so `setPosition()` on a line writes `labelAt`, never coordinates. Course
  points get handles only on the SELECTED river — every course at once is a few
  hundred overlapping targets.
- ⚠ **Two Mauritian rivers can share a name.** "Rivière du Rempart" names one
  river in the west and the northern one the district is named after; "Rivière
  du Poste" is in the south while the Flacq river is "Rivière du Poste de
  Flacq". Taking the longest stitched chain silently picked the wrong river and
  attached the wrong fact to it. `build-rivers2.js` therefore chooses a chain
  by a `near` point and **throws if the nearest match is over 12 km away**. Categories are
  mountain · river · waterfall · water · coast · island · reserve · cave · port
  · town · heritage (plus the world map's continent/region/ocean/volcano/
  latitude/longitude). Adding one is content work — write the row, re-run the
  three harnesses, done.
- ⚠ **Filter chips are island-aware** (`typesOn()`): only categories that
  island actually has. Eleven categories is already three chip rows on a phone,
  and offering "Caves" on the world map is a filter that can only empty the map.
- ⚠ **Above `LABEL_LIMIT` (15) visible pins the markers layer goes
  `.labels-quiet`**: only the selected or hovered caption is drawn. Fifty-eight
  captions at once is a wall of text, not a map — the category filters are how a
  child reads a group, tapping is how they read one place, and a hint line says
  so. **Therefore label offsets are solved PER CATEGORY**, because a filtered
  view is the only time a group's captions share the screen.
- ⚠ **Pin positions are real coordinates, and every one is sourced.** All
  came from OpenStreetMap (peaks carry a matching `ele`; reservoirs, parks and
  islands are the polygon's centre) — Wikipedia rounds several to 0.1°, i.e.
  11 km. One deliberate exception: **Gris Gris** is the island's southernmost
  point and sits ~40 m beyond the district bbox the artwork covers, so it is
  placed at the southern limit the artwork reaches.
  **Do not nudge a pin to make a label fit**; move the label (`lx`/`ly`).
- ⚠ **Each island has its OWN projection**, picked by island in
  `PROJECTIONS` — never by "this row happens to have a lon". Mauritius and
  Rodrigues are rectangular lon/lat boxes; **the world map is Robinson**.
  Mauritius = the district GeoJSON's bbox, and the base image's land spans it to
  within 1px (rasterised and measured). Rodrigues = the extent its Commons file
  page declares, and the island fills only 14.5–92.8% × 20.1–71.8% of that
  image. Both were hand-placed x/y grids with no geographic meaning before.
- ⚠ **The world artwork is Robinson, established by measurement.** Its SVG
  carries eight id'd country paths (Iceland, Czechia, Mongolia, Uzbekistan,
  Madagascar, Eswatini, Lesotho, Tasmania); fitting those against candidates
  picks Robinson by an order of magnitude — y rms **0.58px** on a 1538px canvas
  against 3.0 (plate carrée), 5.2 (Mollweide), 10.3 (Eckert IV). It also puts
  the poles at 6.95% and 97.72% of the height, which is exactly where the
  artwork's land starts and stops. Longitude is fitted to ~0.2% of width.
  **The Equator is at 52.33% of the height and the Prime Meridian at 47.54% of
  the width** — not 50/50, which is what the graticule used to assume.
- ⚠ **The world graticule is drawn FROM the projection**, not from evenly
  spaced CSS gradients: Robinson's parallels are not evenly spaced and its
  meridians curve. A card that names the Equator was pointing at the wrong line.
  `map-calibration` re-checks the Equator, Prime Meridian and pole positions on
  every run.
- ⚠ **Markers and districts project through `MAURITIUS_BOUNDS` only**, and the
  district `<svg>` is `viewBox="0 0 100 100" preserveAspectRatio="none"`. It used
  to derive its own bbox and fit uniformly, letterboxing the districts 6.8%
  against markers that fill the box — every coastal pin sat ~15px off its
  district. `MAURITIUS_BOUNDS` **is** the GeoJSON's bbox; verified, not assumed.
- ⚠ **A drag never repaints the canvas.** Repainting replaces the markers'
  innerHTML and destroys the button the pointer is on, so pointerup lands
  nowhere, the move listener survives, and the *next* drag moves two features.
  Selection mid-drag toggles a class and repaints the side panel only.
- Label offsets (`lx`/`ly`) live **on the feature**, not in a positional array
  indexed by `indexOf` — that gave every added feature one shared offset.
- Editor edits are a **draft** (localStorage, `psac-geo-map-draft-v2`) and never
  touch the array the child's map paints. **Publish** writes a *diff against the
  built-in catalogue* to `mm_data.geo_map_content`, so later code changes to a
  built-in fact still reach installs that have published something else. A
  built-in is `hidden`, never deleted.
- Publishing goes through `Store.mmSave` (awaited, returns `{ok,error}`), not
  `Store.mmSet` (fire-and-forget). Reporting "saved" for a write nobody waited
  for is how the old editor claimed success on a refused upsert.
- Three harnesses, all headless Chrome over a local static server, all under
  `/scripts/` (which 404s on Netlify):
  `map-editor-harness.html` — 33 self-asserting checks on the editor ↔ child
  correspondence · `map-calibration.html` — rasterises each base map and checks
  every pin samples the right ground (a reservoir marker SHOULD be on water; a
  mountain should not), checks every river along its WHOLE course rather than at
  one point, falls in the right district, and — for the world map,
  which has no district layer — pushes 47 known land and ocean coordinates
  through the shipped projection to confirm it still agrees with the artwork ·
  `map-label-solver.html` — recomputes `lx`/`ly` from the measured caption
  sizes · `map-world-fit.html` — re-derives the world projection from scratch;
  run it if the world artwork is ever replaced. Re-run the solver
  after adding or renaming a feature: offsets are absolute px against a
  percentage-positioned pin, so they do not survive a text change.
- ⚠ **A feature outside its island's bounds is silently clamped to the edge** by
  the percentage positioning, so it reads as a coastal feature rather than the
  error it is. Coin de Mire, Flat Island and Round Island are all north of the
  Mauritius artwork; the calibration harness fails any such pin outright.
- ⚠ **Land is a different colour on every base map.** `#fefefe` is the SEA on
  Mauritius; on the world map the sea is **transparent**, land is `#cccccc`, and
  **Antarctica carries its own `fill:#ffffff`** (ice) so white counts as land
  there. Each is a fact about that one file, not a convention.
- ⚠ **`#fefefe` is the SEA on the Mauritius base map**, not a neutral
  background — a bay, a lagoon islet and a marine reserve all legitimately
  sample it. The harness judges by feature type (a reservoir marker SHOULD be on
  water) and treats anything within 4px of land as "on the shoreline".
- ⚠ **Do not read a pin being "outside every district" as an error on its own.**
  The district polygons are generalised and do not quite tile; Pieter Both sits
  338 m outside the nearest one while being demonstrably on land and on its own
  peak. The calibration harness prints the distance so the two cases are
  distinguishable.

##### My Timetable — list ⇄ calendar (2026-09-06)
`#screen-schedule` carries a two-button view toggle (`setTimetableView`,
remembered in `psac_timetable_view_v1`). The **list** is unchanged. The
**calendar** is a Monday-first month grid (`_ttCalendarHtml`) with big dates and
a chip per session in each square; tapping a square opens `#modal-tt-day` with
that day's sessions, the parent's note, chapter accuracy, **Start practice** plus
per-level buttons, what the child already did that day, and "Choose any chapter".
Both views paint from one load (`_ttData`) and both start work through
`startScheduledSession(subjectId, chapterId, forceDiff)` — that third argument is
new and optional.
- ⚠ **`#screen-schedule` is a CHALKBOARD in both themes**, so the grid needs the
  `#screen-schedule .tt-*` override block; the light-mode ink measured **1.1:1**
  on the board. The popup is outside the screen and keeps ordinary sheet colours.
- ⚠ `_ttMonth` / `_ttView` reset in `renderSchedule()`, per the module-state rule
  — otherwise the next child opens on the last one's month.
- ⚠ Chip **labels are hidden below 520px**: a 46px square cannot hold a word a
  nine-year-old can read, so the phone grid is colour + icon and the popup
  carries the words.
- Past days are dimmed, never tagged "missed" — the overdue tag belongs in the
  list, where a child can act on it (see `renderMyActivity`'s note).
- Day squares are keyed on the **local** date, the same deliberate exception the
  parent's calendar makes.
- `scripts/test-timetable-views.js` (58 checks, real headless Chrome at 360px and
  768px in both themes: grid shape, chips, month nav, the dialog contract,
  Escape, the difficulty cap, overflow, contrast).
  ⚠ Its contrast helper **composites translucent backgrounds**; taking the first
  background with any alpha reads a .07 tint as solid near-black and fails
  perfectly legible text at 1.2:1.

##### Learning materials — sorting, three surfaces (2026-09-06)
`sortMaterials()` / `materialSortBar()` / `readMaterialSort()` live in
**`engine/helpers.js`** and are used by the teacher **Materials tab**
(`TeacherMaterials.setSort`, keys recent·oldest·subject·grade·title) and by a
classroom's **Materials section** (`TeacherClassroomDetail.setMaterialSort`).
The pupil's list on **`guest.html`** gets Newest·Subject·Name.
- ⚠ **`guest.js` carries its own copy** of the comparator — that page loads no
  engine file at all, by design. Change both together.
- ⚠ **"Date" means two different things.** `classroom_materials.assigned_at`
  (when the file was shared with THIS class) beats `learning_materials.created_at`
  (when it was uploaded, possibly for another class). Rows carry `shared_at`
  where the junction was read; the comparator prefers it and falls back.
- ⚠ **A row with no subject/grade sorts LAST**, never first.
- `classroom-materials.js` had **no ORDER BY at all**, so two identical requests
  could answer in different orders; it now orders by `assigned_at desc` and
  returns `shared_at` + `created_at`.
- One file gets **no** sort control on any surface. The classroom Work-tab
  preview stays newest-first whatever the Materials tab is sorted by.
- `scripts/test-materials-sort.js` (69 checks: comparator in a VM, wiring, then
  the teacher tab and the pupil page in real headless Chrome at 360px).
  ⚠ Its contrast probe needs the **KNOWN-surface table** the command-centre
  harness uses: a chalkboard gradient is a background *image*, so its computed
  `backgroundColor` is transparent and a naive walk measures chalk on white at
  1:1.

##### The public contact form (2026-09-07)
`#screen-contact` (reached from the landing nav and footer) now carries a real
form — message · bug · suggestion · question · account help — open to anyone
with no account at all. It posts to **`netlify/functions/contact-message.js`**
(service role), which writes into **`question_reports`** with
`report_type: 'contact'` and `question_id: '__contact__'`, so a guest message
lands in the SAME admin queue as every other report. A second inbox is an inbox
nobody reads. The mailto stays underneath: it is the one route that still works
when the app itself is broken.
- ⚠ **A guest has no inbox**, so the admin card hides the in-app reply box for
  these rows and shows a **mailto** for the address they left (or says plainly
  that there is no way to answer). Replying in-app would write into nothing.
- The sender's name/email/browser go in the existing `\n__meta__` JSON the card
  already parses — **no schema change**, no new column-level GRANT to forget.
- ⚠ **The raw IP is never stored.** A 16-char salted hash goes in the meta, only
  so 3-per-15-minutes can be counted; there is also a 40-per-hour global brake.
- ⚠ Honeypot (`#contact-website`) is **off-screen, not `display:none`**, and a
  hit answers a plain success so a bot learns nothing from the difference.
- **Anti-spam layers, in the order they fire**: honeypot → too-fast (`elapsedMs`
  under 3 s, and an absurd or missing value counts as instant) → link count
  (> 2) and a three-real-words rule with **URLs stripped first**, or
  `https://spam.example/buy` counts as three words of its own → per-sender
  15-minute cap → hourly global brake.
  ⚠ The fill time comes from the client and is forgeable, exactly like the
  honeypot: these are bot filters, not security controls.
  ⚠ **An unknown sender is not an unlimited one.** No IP header used to skip the
  per-sender check entirely; unknown callers now share one bucket
  (`noip000000000000`) on a *tighter* cap.
  ⚠ **The rate limit fails CLOSED.** It used to allow the message through
  whenever the count could not be read, so one database hiccup lifted the limit
  — the same shape as the missing-service-key bug this project has paid for.
- **Admin → Reports** filters `All · 🚩 Question reports · 🌐 Contact form` **in
  the query** (`Store.loadReports(offset, limit, kind)` / `countReports(kind)`),
  never over one loaded page, plus per-row tick boxes, Select all shown and
  `Store.deleteReports(ids)`. ⚠ Bulk delete sends only ids that are **on screen
  now** — the selection Set can outlive a filter change — and reports the count
  the DELETE returned, never the count requested (`.select('id')`, zero rows is
  a failure).
- ⚠ `.contact-field` backgrounds are **opaque**: a translucent `<select>` is
  painted over the UA's own light control ground and white text vanishes — the
  same defect the option-contrast rules exist for. Fields are 16px (iOS zoom).
- ⚠ **The form is hidden after a send, never overwritten.** Replacing its
  innerHTML left a visitor who sent one message looking at the receipt for the
  rest of the session; `_resetContactForm()` runs from `showScreen('contact')`,
  per the module-state rule.
- ⚠ An undeployed `/api/` route answers with the SPA fallback (HTML, status
  404), so the client checks the content type before `res.json()`.
- `scripts/test-contact-form.js` (102 checks: the Lambda's rules against a
  stubbed PostgREST, the form in headless Chrome at 360px, and the guest card
  the admin actually sees).

##### Sharing to WhatsApp — one panel, always (2026-09-06)
`TeacherWorkspace.shareText(title, text, url)` is **the** share path: assignment
links, reminders, and now materials (`TeacherMaterials.share(id)` and
`TeacherClassroomDetail.shareMaterial(id)`, both building the message with
`materialShareMessage()` in `engine/helpers.js`).
- ⚠ **The panel is never replaced by `navigator.share`.** It used to hand the
  whole job to the OS sheet wherever one existed — and that sheet lists WhatsApp
  only if the OS knows about it, which on a laptop it usually does not. The panel
  now always opens with **💬 Share on WhatsApp**, Copy message, Copy link, and
  **📤 More apps** (the native sheet) as one more button, called inside the click
  so the gesture is still live.
- ⚠ WhatsApp is a real `<a href="https://wa.me/?text=…">` the teacher taps —
  `window.open()` after an `await` is eaten by popup blockers.
- ⚠ **The share message states the link's lifetime** (`fmtMaterialExpiry`). A
  signed URL that dies silently reads to the recipient as a broken app.
- ⚠ `TeacherMaterials.getLink()` signed for a **hard-coded hour** and said so,
  whatever the teacher had chosen; it now takes the material id and uses the
  row's own `link_expiry_seconds`.
- ⚠ `.tc-share-wa-btn` ink is **dark green, not white** — white on WhatsApp's
  own `#25d366` measures **2:1**.
- `scripts/test-teacher-share.js` (43 checks: message building in a VM, wiring,
  then headless Chrome with `navigator.share` **stubbed present** — the point is
  that WhatsApp survives a device that has a native sheet — plus escaping, tap
  targets, overflow and contrast).

##### Child-facing vs parent-facing, deliberately
- The child's activity recap is **unfiltered** — the parent's `_filters` live in
  `localStorage` per browser, and on a shared phone would silently blank the
  child's own record of their work.
- **There is no "missed sessions" list on a child's screen, and must not be.** On
  a parent's calendar an unticked row is information; on a child's it is a list
  of their failures served every time they open the app.
- Family overview is **ordered by who has been quietest, never by score**;
  ranking siblings is the wrong thing to hand a parent, and accuracy is not
  comparable across grades.
- A chapter with no attempts is reported as **not started**, never 0%.
- ⚠ Report copy says **"they"**, not "she". Nothing records a child's gender.
- The chapter card says **"correct"**, never "mastery" — `getChapterPct()` is
  accuracy, so 2/2 once read as "100% mastery ★★★". `_chapterProgress()` is the
  single reading used by both card and tiles; `attempted` counts **answers
  given**, not distinct questions seen, so the card never claims "12 of 19 done".
  ⚠ An unknown question pool (`total === 0`, grid painted before QuestionLoader
  answered) must **withhold** the mastery claim, not assume it.
- The daily goal deliberately does **not** drive the streak — breaking a 12-day
  streak because a nine-year-old managed three questions is a punishment no
  child-facing app should hand out. `daily[key].g` latches the celebration once
  per day.
- Reports and the digest use **rolling 7-day windows, not calendar weeks** (on a
  Monday a calendar week holds one day), and a previous window of zero renders
  "new", never +100%. "No dated history" means **unknown**, never idle — that
  distinction is the difference between an accurate digest and telling every
  parent their child has stopped working.
- Derived activity rows are **never written into `schedule_entries`**: that table
  is parent-editable, and storing actuals there would let a parent delete the
  record that a mock exam happened.
- A parent's own settings apply to children by **merge, never replace** —
  `lockedChapters` is per-child and must survive the write.

---

#### Caching & deploy

##### Version bumps
- **`SHELL_VERSION` (`sw.js`)** — bump on any change to a shell-cached engine
  file, or returning users never receive it. Currently **v198** (bumped 2026-09-08
  for lazy pack loading: `subjects/_index.js` joined `SHELL_FILES` and
  `engine/registry.js` changed). ⚠ Individual pack manifests are deliberately NOT
  precached — `PackLoader` fetches only the packs a child opens, and listing all
  45 would put the whole 323 KB back on first load.
- **`_CACHE_VERSION` (`question_loader.js`)** — bump when question content or the
  cache envelope changes. Currently **v39** (bumped 2026-09-07 for the two-part
  cloze envelope — `textB` / `gapAlts` / `gapsA` / `gapsB` / `twoPart`. A bundle
  cached before them has no part B at all, and the bump purges the old keys).
- ⚠ **Both numbers above are STALE in this file and go stale within the hour.**
  Read `sw.js` and `engine/question_loader.js`; do not quote these.
- ⚠ The SW shell list is all-or-nothing (`cache.addAll` rejects wholesale on one
  404). **Re-check `<script src="engine/…">` tags against `SHELL_FILES` on every
  deploy that touches them.**

##### The shell is 632 KB, not 2.87 MB — what is NOT precached (2026-09-08)
Measured, then cut: the shell was **56 files / 2.87 MB over the wire**, of which
1.63 MB was media that does not compress at all. It is now **37 files / 632 KB**.
Three separate things came out, and each is a rule, not a one-off tidy-up:
- ⚠ **Static assets (`/assets/**`, `/fonts/**`) are NOT in `SHELL_FILES`** and
  live in the unversioned `ASSET_CACHE` — see the next section.
- ⚠ **Two precached photographs were 1.1 MB between them.**
  `mahe-de-labourdonnais.jpg` alone was **928 KB**, a third of the whole shell,
  at 721×1056 for a `max-height:220px` slot. Re-encoded to 340×498 → **28 KB**;
  `pierre-poivre.jpg` 167 → 36 KB. ⚠ `market.jpg` was tried and **reverted**:
  180 → 146 KB is not worth degrading a picture a child is asked to describe.
  Size every bundled image against the CSS box it is displayed in.
- ⚠ **`admin.js` + the five teacher files + `forum.js` are loaded ON DEMAND** by
  `RoleModules` (`engine/registry.js`) — 0.48 MB of source, 126 KB brotli, that
  every child used to download and parse for screens they can never open.
  - The order inside the teacher group is **load-bearing** and is now a list in
    one file rather than `<script>` tag order: the four helpers, then
    `teacher.js`, then `teacher_classroom_detail.js`.
  - ⚠ **Check a module is loaded by BARE IDENTIFIER, never `window.X`.** They
    declare `const AdminPanel = (() => {…})()` at the top level of a classic
    script, which lands in the global *lexical* environment and never on
    `window`; only `TeacherHome` and `TeacherInsights` assign themselves across.
    A `window.AdminPanel` probe reports a working module as missing.
  - ⚠ `showScreen()` stays **synchronous** — dozens of callers read the DOM
    straight after it. It shows the screen and renders when the module lands,
    exactly as a lazy subject pack does.
  - Verified safe before splitting: every reference from an earlier-loading file
    was already behind `typeof X !== 'undefined'`, all 81 inline handlers sit
    INSIDE their own screen, and the only unguarded-looking uses
    (`TeacherMode.getAttemptCount/hasRetry/saveResult`) are reached through
    `renderAssignmentEntrance()`, **which nothing calls** — dead code.
  - `scripts/test-role-modules.js` (22 checks: boots clean with none of the
    eight globals defined, nothing fetched, then each group arriving on demand).
    ⚠ Anchor any "was it fetched" regex on `engine/` — a bare
    `/(admin|teacher|forum)\.js/` also matches `engine/nce_paper_admin.js`.
- ⚠ **`SHELL_VERSION` churn is the multiplier on all of this**, and it is a
  process problem, not a code one: v232 → v249 in one working session, each bump
  re-downloading the whole shell for every returning user. Batch deploys.
- ⚠ Netlify's default is `public,max-age=0,must-revalidate` on **everything**
  (measured against production). `netlify.toml` now gives `/assets/questions/*`
  and `/fonts/*` a 30-day max-age — deliberately **not** the engine or
  `index.html`, and deliberately not `immutable`.

##### Question images are BUNDLED, in their own unversioned cache (2026-09-08)
The bank used to hotlink its pictures from Wikimedia Commons. It no longer does:
**138 files, 11.9 MB**, served from **`assets/questions/`**. Two harnesses, and
they ask different questions: `scripts/test-question-images.js` asks whether a
picture reaches a child's screen (served as an image, decoded, fits 360px, alt
text does not leak the answer); `scripts/test-question-image-offline.js`
(15 checks) asks whether it is still there when the network is not, and whether
its licence is recorded.
- ⚠ **Hotlinking had already failed silently.** 24 of the 139 Commons files had
  been DELETED and were 404ing in production, in 27 live questions.
- ⚠ **The SW never caches cross-origin requests** (deliberately — see the note in
  its fetch handler), so every picture question was a broken icon offline.
- ⚠ **Commons now refuses direct ORIGINAL fetches**: `429 ... instead use
  thumbnail images in sizes listed on https://w.wiki/GHai`, `retry-after: 600`.
  An arbitrary thumb width is refused too (`400 Use thumbnail sizes listed on…`).
  Only certain widths are served — **120 and 250 were the only ones available**
  for the five files whose original is under 480px. Ask for a width *below* the
  original or the API hands back the original url and the fetch is refused.
  ⚠ **Commons also rounds a requested width UP to its own standard size** — asked
  for 1024 it served 1280. Measure the file, never trust `iiurlwidth`.
- ⚠ **`ASSET_CACHE` in `sw.js` is deliberately UNVERSIONED and `activate` keeps it,**
  and it now covers **all** of `/assets/**` and `/fonts/**`, not just the question images.
  Bundling made these same-origin, which dropped them into `SHELL_CACHE` — deleted
  on every `SHELL_VERSION` bump, so each deploy would re-download every picture a
  child had already seen on a metered connection. They are also kept OUT of
  `SHELL_FILES`: 7.4 MB of all-or-nothing pre-cache is not a first load.
- ⚠ **ONE credits record: `assets/questions/provenance.json`** (138 images, every
  one with a licence), and `image-credits.html` is **generated from it** by
  `node scripts/build-image-credits.js` and linked from the landing footer.
  Bundling is redistribution, and CC BY / BY-SA require the author, the licence
  and a link on every copy. Do not hand-edit the page, and do not give it a
  `netlify.toml` 404 — an attribution nobody can reach discharges nothing.
  ⚠ There were briefly TWO credits files (`assets/questions/CREDITS.md` and this
  one), written the same day by two sessions in the same working tree. Merged
  2026-09-08; if a second one reappears, merge rather than pick.
- ⚠ **Provenance is captured FORWARD, from the API response that produced the
  file. Never reconstruct it from a filename** — the local names are lossy slugs,
  so `adrien-d-epinay1.jpg` never matches `File:Adrien d'Epinay1.jpg` and a
  generic `ball.jpg` matches an unrelated Commons file. That reverse lookup
  reported ~106 of 115 as "no such file", which reads as "provenance unknown"
  for images whose licence and author were fully recorded — and is what produced
  the second file.
  ⚠ Commons filenames contain parentheses (`Ganga Talao (5489050038).jpg`), so a
  markdown-link regex of `\(([^)]+)\)` truncates the URL at the first `)` and
  yields a title that does not exist. Six of twenty-three hit that.
- ⚠ A PNG only stays a PNG if its alpha is **measured in use**. 8 of 12 were fully
  opaque and became JPEGs (751 KB → 21 KB for Mars); the 4 that really use alpha
  would get a white box behind them in dark mode.
- ⚠ Harness traps, all paid for once: `Emulation`/`Network` overrides on the page
  target do **not** reach the service worker (shut the origin server down instead);
  a lazy `<img>` in an off-screen iframe never loads, so `decode()` never settles;
  and injecting question HTML into the live app fires `_Dialogs`' MutationObserver
  once per question — measure in an isolated same-origin iframe that loads
  `style.css`.
- ⚠ **`/.netlify/functions/questions` must never be cached by the SW.** That
  response is `private` precisely because it varies per caller; a URL-keyed cache
  hands one child's entitled set to another. `activate` also **evicts** entries
  earlier versions wrote — `DATA_CACHE` survives a version bump, so skipping the
  route from now on would not remove the leak.

##### CLI deploy
`netlify deploy --prod --dir=. --functions=netlify/functions` (there is no
`dist/`; `publish = "."`). The build runs **locally**, so no Netlify build
minutes.
- ⚠ **It uploads from local disk, not git.** Everything gitignored but present
  ships — `.gitignore` excludes nothing from a CLI deploy, and Netlify has no
  publish-exclude when `publish = "."`.
- ✅ **Stage the publish directory first — `node scripts/prepare-deploy.js`**,
  then `netlify deploy --prod --dir=.deploy --functions=netlify/functions`.
  Measured 2026-09-08: the repo tree is **491 MB / 8,900 files**; the site is
  **29 MB / 682 files**. What used to ship with every deploy: `past-papers/`
  (147 MB of copyrighted MES/MIE PDFs), `.netlify/` (60 MB of CLI cache),
  `netlify/` (21 MB — including the question bundles that answered **200 with
  real questions and their answers**, bypassing every entitlement check),
  `exam_papers/`, and **`.env` with the service role key**.
  ⚠ That last one is why this exists. "Move `.env` out of the tree before every
  CLI deploy" was a manual step in a document, i.e. one forgotten command away
  from publishing the service role key. The staging dir removes the footgun
  instead of restating it.
  - ⚠ It is an **ALLOWLIST**. A denylist ships every new scratch file at the
    repo root by default — this root has collected `dbg18/23/25/27.js`,
    `test.py`, `tmp/` and two stray report JSONs without anyone deciding to
    publish them. The allowlist inverts the failure: something NEEDED goes
    missing and the script's own checks fail loudly.
  - ⚠ `assets/past-papers/` is **kept** — that is the cropped artwork questions
    display, a different thing that merely shares a name with the PDF folder.
    An unanchored `/past-papers/` rule matched it and blocked the first run.
  - ⚠ `netlify/` is **not published**: functions ship via `--functions`, which
    reads the repo, and `included_files` resolves against the repo root.
    **Verify `/.netlify/functions/questions` answers 401 (not 404) right after
    the first staged deploy** — that is the one thing here no local check can
    prove.
  - Verified by booting the staged directory in headless Chrome: 45 packs, 343
    chapters, service worker active with its shell cache built (so `addAll`
    succeeded), **0 console errors and 0 404s**.
- ⚠ `publish = "."` serves the repo root. `netlify.toml` carries **28 explicit
  404 redirects** — explicit because Netlify wildcards match only a *trailing*
  splat, so `/*.md` matches nothing. Add one for any new sensitive root file.
- ⚠ **The CDN keys on URL alone** — it does not vary on `Authorization` or
  `X-Student-Token`. Every error path in `questions.js` uses an `errHeaders`
  object with `no-store`; one cached 401 poisoned a subject for 24 hours for
  every child.
- ⚠ **Draft deploys cannot verify this** (Netlify preview auth answers 401 to
  everything). Verify against **production immediately after promoting**, with a
  cache-busting query string.
- ⚠ **Production builds from `main`.** If a fix is reported as still broken,
  check which branch is deployed before concluding the fix is wrong.
- ⚠ **MEASURED 2026-09-04: production, `main` and `dev` HEAD are all on
  `shell-v88`; only the working tree is ahead (v106).** The older note here
  claimed production was on v23 with `admin-account-recovery` returning 404 —
  both were stale, and that staleness once sent a whole debugging session the
  wrong way. Re-measure; never carry these numbers forward.

  | | `SHELL_VERSION` | `admin-account-recovery` |
  |---|---|---|
  | `psac-practice.netlify.app` | v88 | **401 — deployed** |
  | `main` | v88 | present |
  | `dev` HEAD | v88 | present |
  | working tree | **v106** | present |

  Probe it, never infer it — `curl -s <site>/sw.js | grep SHELL_VERSION` and
  POST to an `/api/` route (**401 means deployed**, 404 means missing).
  ⚠ **An undeployed `/api/` route returns the SPA fallback: HTML with status
  404, not an error.** `response.json()` then throws, and code that treats that
  as `{}` reports the server’s own refusal message for a request the server
  never saw. `AdminPanel._adminApi()` checks the content type first and says
  "not available (HTTP 404)" instead. The same is true on a plain local static
  server, where no function runs at all — every `/api/` call fails there.
##### Netlify env vars (dashboard only, never in the repo)
`SUPABASE_SERVICE_ROLE_KEY` (⚠ its absence used to fail *open*),
`SUPABASE_ANON_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_EMAIL`.

---

#### Verifying work — traps in the harnesses
- `scripts/audit-mobile-screens.js [width]` reveals every `.screen` at 360px and
  320px and reports elements that visibly protrude past the viewport. It judges
  per-element rects (a scrollWidth check is blinded by body's `overflow-x:
  clip`), skips children of clipping/scrolling ancestors and pure-emoji
  decorations, and covers **static markup only** — dynamically rendered
  content needs its own probe.
This project's fixes are **measured, not eyeballed**. Repeat that, and know these:
- ⚠ **The service worker serves a stale shell.** A CDP run must
  `Page.setBypassServiceWorker` **and** `Page.reload {ignoreCache:true}`, or you
  will measure the previous `style.css` and report a fix that never landed.
- ⚠ **Stop an overflow detector's ancestor walk at `body`** — `overflow-x: clip`
  above it makes every page look clean.
- ⚠ **Give every CDP call its own timeout.** An infinite loop in page JS blocks
  the renderer's message loop so CDP never answers; without a timeout you cannot
  tell "page wedged" from "harness bug".
- ⚠ **Do not point a login probe at a real family.** Four digits against a real
  username increments `pin_attempts` and can trip `pin_locked_until`.
- ⚠ **Never build a regex through a shell heredoc into a JS template literal.**
  `\s` arrived as `s` and silently deleted the letter *s* from every recorded
  mistake — plausible-looking output, caught only by asserting the exact string.
- Any tooling that loads questions outside the browser must reproduce what each
  factory actually returns (`makeMatch` has **no `question` field** — it builds
  the text from `leftItem`).
- **`scripts/sql-tests/run-schema-tests.sh`** builds `supabase-schema.sql` from
  nothing on `postgres:17-alpine`, re-applies it to prove idempotency, then runs
  47 RLS assertions as `authenticated`. ⚠ It exits **non-zero today**, on the
  co-parent finding in Pending item 0 — that is the finding, not a broken test.
  ⚠ The assertions run as `authenticated`, never the superuser: RLS does not
  apply to a superuser, which once made every "can see the row" check pass for a
  total stranger.
- SQL changes are applied against production **inside a transaction and rolled
  back**, or against `postgres:16-alpine` with the live constraints.
- The write step is not self-verifying: always reconcile "rows written" against a
  fresh count. A quote-style mismatch once skipped 119 questions *while reporting
  success*.

---

#### Current state

##### The question database is now complete — imported 2026-09-08
The live `questions` table holds **14,893 rows: 14,729 practice + 164 past
papers**, verified by read-after-write on every row written.
`mcq 12,322 · numeric 2,024 · text 305 · cloze 60 · multi 12 · symmetry 6`,
0 protected. Before this run it held **0 `text` and 0 `cloze`** — see the
importer note above.
- ⚠ **3 rows in the database are not in the corpus** and are not errors:
  `g7h-samp-001`, `g8h-samp-001`, `g9h-samp-001`, left by the retired
  `grade{7,8,9}-history` placeholder packs that `-social-modern-studies`
  replaced. **The importer never deletes**, so removing a question from
  `subjects/` does not remove it from the database.
- ⚠ **No migration was needed and none was made.** `questions.data` is `jsonb
  NOT NULL` with no type column and no CHECK constraint (live schema read, not
  taken from the dump), and the table already carried `multi` and `symmetry`
  rows — proof JSONB accepts the non-MCQ shapes.
- Two single-option MCQs found by the new preflight and fixed:
  `g5hg-min5-coast-0` and `g5s-min5-renew-0` had one option, which was the
  answer. Pre-existing; the `rows()` helper in `coverage_min5.js` shares one
  option pool across a group, so a one-row group got a one-word pool.

#### The Game Zone (minigames) — added 2026-09-04
`engine/minigame.js` (the `MiniGames` module), reached from the kid dashboard
`#dash-games-tile` and `#screen-minigames`. Seven live games:
- **Who Wants to Be a Billionaire?** 💰 (was "Peak Quest") — a 20-question prize
  ladder to Rs 1 Billion, TV-quiz styled (dark set, lozenge answers, prize
  ladder, 4 lifelines: 50:50, Ask the Crowd, Wise Owl, Safety Rope). Q1–10 are
  the child's grade easy→medium, Q11–15 the hardest textbook questions, and
  **Q16–20 are general knowledge** from `engine/minigame_gk.js` (37 curated
  MCQs, same subjects, beyond the book) — each question shows its subject +
  chapter/topic. Safe havens at Q5/Q10/Q15. Synthesised WebAudio sounds
  (correct/wrong/lock-in/win) — **no audio files, no copyright**. A distinct
  name and look on purpose; no show logo/music/wording. `startBillionaire`.
- **Quick Fire** ⚡ — a 60-second MCQ blitz with a combo multiplier (×1–5), a
  time penalty on wrong answers, and a shareable score.
- **Word Builder** 🧩 (added 2026-09-04) — spell 10 clued words to cross the
  lagoon on stepping stones; tap scrambled letter tiles into slots, auto-check
  on full, 3 lives, 3 hints (each locks in the next correct letter, clearing any
  wrong prefix first). Words come from `engine/minigame_words.js` —
  `window.MINIGAME_WORDS`, 90 curated words in 3 bands, mixed by the child's own
  grade. ⚠ A clue must never contain its own word; words are A–Z only (tiles).
  `startWords`.
- **Island Explorer** 🗺️ (added 2026-09-04) — a 12-stop geography tour of real
  Mauritius places (Port Louis → clockwise → Curepipe) from
  `engine/minigame_geo.js` (`window.MINIGAME_GEO`, ~40 curated fact MCQs, one
  drawn per stop per tour). First try = 🏅 gold stamp, second = ⭐ silver, two
  wrongs = the guide explains and the tour **continues** — a child always
  finishes the trip. ⚠ Every fact is real, verifiable geography; keep it that
  way. `startExplorer`.
- **Number Ninja** 🥷 (added 2026-09-04) — mental-maths belts, white → black:
  7 belts × 5 sums, per-question timer tightening 12s → 7s, 3 lives. ⚠ Sums are
  **GENERATED** per belt (`_njGen`), never drawn from the question bank; the
  harness `scripts/test-number-ninja.js` re-derives every answer from the
  question text and simulates full win/loss runs through the real module (29
  checks). Bests in `DB.games.ninja` `{plays,bestBelts,bestScore}`. `startNinja`.
  The hub shows four `mg-card-soon` teasers (Memory Reef, Potion Lab, Écoute!,
  Story Sprint) — **each has a full design-intent comment block above
  `renderHub()` in `minigame.js`** (mechanics, data file to create, DB.games
  key, traps); read it before building one.
- **Brain Battle** ⚔️ (added 2026-09-04) — pass-the-phone duel: 5 rounds, one
  question EACH per round, both drawn from the **same difficulty band** but
  never the same question (the second player would inherit the answer). A
  handover screen hides the question until the player taps Ready — and a resume
  after reload always lands on that handover, never mid-question. 25s/question,
  speed bonus; tie → sudden death (max 3 extra rounds) → draw. Tallies in
  `DB.games.battle` `{plays,p1Wins,p2Wins,draws}`.
  `scripts/test-brain-battle.js` (11 checks: same-band pairing measured over
  240 rounds, crown/draw paths, phase guards). `startBattle`.
- **Time Traveller** 🕰️ (added 2026-09-04) — history sequencing: 8 rounds of
  3–4 real dated events (`engine/minigame_time.js`, `window.MINIGAME_TIME`,
  38 curated facts, Mauritius core + world anchors) TAPPED into chronological
  order before a rewind timer; years stay hidden until the reveal, which waits
  for a tap (the learning moment). ⚠ Every fact real and verifiable; ⚠ a label
  must never contain a 3+ digit number (it would leak the order); ⚠ never two
  same-year events in one round (their order would be unknowable). Bests in
  `DB.games.timetravel` `{plays,bestScore,bestPerfect}`.
  `scripts/test-time-traveller.js` (20 checks). `startTimeTravel`.
⚠ **Game answers NEVER call recordAnswer()/_recordDaily().** A replay must not
distort the mastery, mistake and daily reporting parents rely on. Game bests
live in `DB.games.{billionaire,quickfire,wordbuilder,explorer,ninja,battle,timetravel}`
(`games` key seeded in `Store._defaultStudent`, so existing children backfill for
free — no schema change). The four data files (`minigame_gk/words/geo/time.js`)
are blocking script tags before `minigame.js` and listed in `SHELL_FILES`. In-progress games persist to
sessionStorage per student (`_persist`/`resumeOrHub`) — the explorer stash
stores indices into `MINIGAME_GEO`, so it is only resumed while the catalogue
shape still matches. `scripts/test-minigame-arcade.js` (789 checks: bank
integrity, full win/lose playthroughs of both new games in a VM, wiring).

##### Exam weighting — set from the papers, not from item counts (2026-09-08)
`examWeight` is a chapter's share of a 40-question exam:
`n = Math.max(1, Math.round(examWeight * count / 40))`. It is the **only** lever
on what an exam contains — `getMixedQuestions()` is a flat shuffle inside one
chapter, and how many questions a chapter holds changes nothing.

**Ten of the fifteen live packs are now weighted from their real papers.** One
rule throughout: read the paper question by question and give each mark to the
chapter that teaches it; a chapter the exam pool cannot reach comes out of the
denominator too. `scripts/exam-mark-maps.json` holds every mark map, and the
comment block above `chapters:` in each `_manifest.js` is **generated from it**,
so the two cannot drift.

| pack | papers read | marks |
|---|---|---|
| grade6-english / grade6-french | 2024 | 100 (French: 90 reachable) |
| grade6-science / grade6-history | 2022 + 2023 + 2024 | 150 |
| grade6-maths | 2023 + 2024 | 200 |
| grade5-english | 2023 + 2024 + 2025 | 51 items |
| grade5-french | 2025 | 100 (90 reachable) |
| grade5-science / grade5-history | 2024 + 2025 | 100 |
| grade5-maths | 2024 + 2025 | 200 |

- ⚠ **One paper is not enough for a topic-based subject.** Science and History
  rotate: `g6-ecosystems` scores 0 in 2023 and 6 in 2022; `g6-solar-system` 0 in
  2024 and 5 in 2023. Three years is the smallest sample that stops a real topic
  reading as zero. The languages are fixed year to year, so one paper is enough.
- ⚠ **THE GRADE 4 PACKS ARE NOT DERIVED AND CANNOT BE.** There is no Grade 4
  paper — `past-papers/` holds `psac6`, `psac5`, `psac5-mes` and `nce` only. All
  five keep their hand-set weights, and grade4-maths still has **none at all**
  (0 of 6 chapters), so its exam shape is an accident of chapter count. Do not
  invent a mark map for them from the Grade 5 paper.
- ⚠ **Some ✨ BONUS chapters are core exam content.** `g6enr-symbols` earns 9.3%
  of the History marks — flag, coat of arms and anthem are asked EVERY year, more
  than Map Skills or Independence — and `g5enr-world` earns 8%. The gold "BONUS"
  card tells a child a yearly exam topic is optional. Worth re-labelling.
- ⚠ **Some weighted chapters earn almost nothing.** `trade-agri` earned 1 mark in
  two Grade 5 papers against a weight of 4; `percentage` earns **zero** in both
  Grade 5 maths papers (it is a Grade 6 topic) — that is measured over two years,
  not a sampling artefact. Both sit at the floor now.
- ⚠ **Weighting to the paper CONCENTRATES the draw, and the bank is not deep
  enough underneath it.** Measured 2026-09-08: **23 chapters now repeat inside
  ten exams**, worst `g6-materials` and `g6-animals` (3 exams each, 9 and 10
  questions a paper from 35 and 39 items), `fr-images` (3), `g6-land-use` (4).
  Reaching a ten-exam pool everywhere needs about **520 new items**, and they are
  needed in exactly the chapters the real exam leans on hardest. The weights are
  right; the content behind them is thin. `scripts/test-exam-paper-shape.js`
  prints the full list on every run.
- ⚠ **Weighting to the paper CONCENTRATES the draw, and 594 items were written
  to keep up.** Matching the paper meant chapters like `g6-land-use` (11 of 40
  questions) drawing from a pool of 47 — four mock exams and a child had seen it
  out. `subjects/*/questions/exam_depth.js` in eight packs adds **594 items** to
  the 23 chapters that repeated inside ten exams, and every one of them now
  clears it. Measured 2026-09-08:
  | pack | items | chapters |
  |---|---|---|
  | grade6-science | 133 | materials 55, animals 61, air 12, energy 5 |
  | grade6-history | 121 | land-use 63, slaves-immigrants 31, hazards 23, heritage 4 |
  | grade5-science | 106 | energy 39, electricity 36, water-matter 17, plants 9, conservation 5 |
  | grade5-english | 89 | verbs 45, sentences 14, writing 17, comprehension 10, vocabulary 3 |
  | grade5-french | 40 | fr-images 40 |
  | grade5-history | 18 | g5ge-weather 18 |
  | grade6-french | 15 | images 10, argumentation 5 |
  | grade6-maths | 3 | ratio-pct 3 |
  | grade4-science | 58 | plants 20, animals 20, enr-animals 9, enr-equipment 9 |
  | grade5-history | +11 | g5enr-personalities/independence (see Subsections) |
  ⚠ **`makeMCQ()` SHUFFLES its own options** (engine/helpers.js) — every one of
  these files was first written with an answer-first rotation meant to spread
  the answer across A/B/C/D, and it did nothing at all. The spread comes from
  the factory. Authoring answer-first is still worth doing because `options[0]`
  is then always the answer and an item can be checked at a glance, but do not
  believe a comment that claims it positions anything. What DOES need care is
  keeping all four options the same grammatical shape and length: measured
  4.9 characters of spread here against the real papers' 6.5-6.8, and
  `test-option-parity.js` caught one length leak (`g6sc-dep-028`) before it
  shipped.
  ⚠ **Four new subsections were declared**, because the syllabus named the
  content and the map did not: `teeth` and `diet` on g6-animals (the 2023 and
  2024 papers spend 9 and 6 marks there and neither had anywhere to live), and
  `decrire` / `raconter` on both French image chapters. The existing fr-images
  items each carry a PHOTOGRAPH; the new ones deliberately do not, because that
  artwork does not exist in this repo and « Observe l'image » with no image is a
  broken item. They train the same Q8 skill without one.
  ⚠ **grade4-science was deepened too** (58 items, 2026-09-08): four chapters
  repeated inside 7-9 exams. Every core chapter in that pack held exactly 31
  items and every enrichment chapter exactly 19 — a fixed quota, not a measure
  of need. **No pool in any of the fifteen live packs now repeats inside ten
  exams.** ⚠ Grade 4 still has no paper, so its examWeight values are the
  original hand-set ones and the SHAPE of a Grade 4 exam remains unverified;
  only its depth was fixed.
- `scripts/test-exam-paper-shape.js` asserts every live pack deals a whole
  40 / 25 / 15, holds each weighted pack's worst chapter within 4 points of its
  paper (one question is 2.5 points, so a tighter band fails on rounding alone),
  and reports the thin pools.

##### Parent-controlled Game Settings — added 2026-09-06
`engine/game_settings.js` (`GameSettings`, loaded **before** `minigame.js`, in
`SHELL_FILES`). Per child, in `DB.restrictions.games` → `students.settings`
(parent-written through `Auth.saveGameSettings` → `_saveRestrictions`, same
rollback-on-refusal as every Controls toggle; **no migration** — RLS on
`students` already gives a child SELECT only, proven live and rolled back by
`scripts/sql-tests/game-settings-rls.js`). Missing/partial settings
`normalise()` to: Balanced · all grade subjects · Medium · 10 per round · weak
focus off · avoid-recent on · GK off.
- **`GameSettings.GAMES` is the single capability table** (`supportsSubjectMix
  / Difficulty / RoundLength / WeakTopics / GeneralKnowledge / RecentAvoidance`).
  Billionaire, Quick Fire, Brain Battle take the mix; Word Builder and Time
  Traveller take difficulty (band windows) and Word Builder the round length
  (stones); Explorer and Ninja take nothing. Never branch on a game's name.
- **Every quiz game draws through `pickForGame()`**: valid MCQs only
  (`isValidMCQ` — answer present once, options unique, answer within the first
  four), the child's grade only (other grades only with `crossGradePractice`,
  and last), locked/admin-blocked chapters out, excluded subjects removed
  **before** anything else, largest-remainder shares (40/30/30 → 4/3/3, spread
  through the round, not clumped), levels never above
  `min(difficulty top, restrictions.maxDifficulty)`, weak-area weights from
  `DB.chapters`, recent ids (`DB.games.recent`, cap 150) avoided while fresh
  ones remain, shortfall filled from another **included** subject with a
  `console.warn`. Zero usable ⇒ `NO_QUESTIONS_MSG`, distinct from "still
  loading" (`_pickFailToast`). A game with a `levels` ladder keeps the exact
  level before freshness (Brain Battle pairs must match); a free-running game
  prefers fresh at a nearby level.
- Adaptive: `DB.games.adaptive {level,up,down}` — +1 after 3 right, −1 after 2
  wrong, clamped to the cap at read AND write. Recorded by Billionaire and
  Quick Fire (which re-orders its remaining stream), never by Brain Battle
  (two players).
- ⚠ GK defaults OFF, so Billionaire's rungs 16–20 are textbook level-4 unless
  the parent turns it on; hub copy and tier badge follow the setting.
- ⚠ The parent card is rendered by `innerHTML` **inside the chalkboard
  `#screen-parent`**, which is dark in BOTH themes — `.gs-*` carries a
  `#screen-parent` override block, and `scripts/test-game-settings-ui.js`
  measures 19 text styles ≥ 4.5:1 in both themes at 360px, plus overflow and
  touch sizes. `scripts/test-game-settings.js` (231 checks) is the model +
  picker + game-integration suite. Card state (`_open`, `_draft`) resets when
  the child id changes — in the render, per the module-state rule above.

⚠ **Confetti is `launchConfetti(count)` (app.js), NOT the canvas-confetti
`confetti({...})` API** — that library is not loaded. The first cut of Peak
Quest called the library form guarded by `typeof confetti === "function"`, so
every burst silently no-opped until this was fixed.

##### Ask the Crowd — live public voting
**Applied** (now in `supabase-schema.sql`): `minigame_polls` + three RPCs
(`minigame_poll_create/vote/results`), granted `anon, authenticated`. The child
creates a 3-minute poll and shares `/v/<CODE>` (`vote.html`, standalone like
`guest.html`); anyone votes, the child watches counts live.
⚠ **The CORRECT ANSWER IS NEVER STORED** — the row holds question + options
only, so neither a voter nor the child can read the answer back from the server.
⚠ `minigame_polls` FKs `students(id) ON DELETE CASCADE`, so the account-delete
cascade takes polls with it — nothing added to `admin-delete-account.js`. (Unlike
the five text-keyed orphan tables.)

##### Score sharing
Quick Fire shares via `navigator.share` (native sheet → WhatsApp/Instagram/…),
preferring a **canvas-rendered 1080×1080 PNG** score card where
`navigator.canShare({files})` allows, else WhatsApp/Facebook/X intent links or
clipboard. Landing page `score.html?s=&c=&a=` shows the score and a play CTA.
⚠ **A share carries a score and a challenge — never the child’s name, id, or any
profile link.** A game score is the one thing safe to post; keep it that way.

##### Gates
- Parent: `DB.restrictions.minigamesDisabled` (per-child toggle on the parent
  dashboard, `Auth.toggleMinigamesDisabled`). `MiniGames.syncTile()` (called from
  `renderDashboard`) hides the tile live.
- Plan: `_PLAN_GATED_SCREENS.minigames = 'minigames'` + the `minigames` capB
  switch in the admin Plans tab. Unlike a feature that opens an upsell, an
  excluded games tile simply hides rather than teasing the child.

⚠ Verified end to end in headless Chrome as a real child (14/14 Peak Quest incl.
a second tab voting on `vote.html`; 8/8 Quick Fire incl. `score.html`). All
throwaway data purged; `minigame.js`/`style.css` are shell-cached (SHELL bumped).

- **15 live packs, 164 chapters, 14,636 questions**, plus 164 past-paper items
  and 30 `comingSoon` placeholder packs. 24 of the 160 chapters are bonus/enrichment.
  ⚠ **Measured 2026-09-06** by executing the manifests and counting distinct ids in
  the BUILT bundles (`node netlify/build-questions.js`, then count `id` per file) —
  not by adding up the numbers that used to be here, every one of which was stale.
  Re-measure rather than carrying these forward.
- Per-pack question counts, measured the same way:
  | pack | q | pack | q | pack | q |
  |---|---|---|---|---|---|
  | grade4-maths | 662 | grade5-maths | 1,419 | grade6-maths | 705 |
  | grade4-english | 873 | grade5-english | 645 | grade6-english | 890 |
  | grade4-french | **2,121** | grade5-french | **2,295** | grade6-french | **2,234** |
  | grade4-history | 558 | grade5-history | 532 | grade6-history | 460 |
  | grade4-science | 344 | grade5-science | 424 | grade6-science | 463 |
- **Formation des Mots** — added 2026-09-06, one ordinary chapter per live French
  pack (`g4fr-formation` / `g5fr-formation` / `g6fr-formation`), 100 questions
  each in five subsections of 20 (`verbe_nom`, `nom_adjectif`,
  `adjectif_adverbe`, `former_verbe`, `prefixes`). This drills PSAC French **Q7**
  ("Écris la forme correcte du mot entre parenthèses"), **10 marks on every**
  **paper**, which the bank covered with three one-off items and Grade 6 not at
  all. ⚠ Deliberately **not** an enrichment chapter: a gold "✨ BONUS" card would
  tell a child a numbered exam question is optional. Files are a data table +
  loop like `extended_practice_bank.js`. The five 2025 Q7 items are in the
  Grade 5 table verbatim and `scripts/test-french-word-formation.js` (86 checks)
  asserts their answers, the declared-vs-tagged subsection invariant, and that
  no prompt contains its own answer.
  ⚠ 20 per subsection is not arbitrary — `audit-content-coverage.js` reports any
  declared subsection under 20 as a permanent gap.
- **Chasse aux Erreurs** — added 2026-09-08, a ✨ BONUS chapter per live French
  pack (`g4fr-chasse-erreurs` / `g5fr-chasse-erreurs` / `g6fr-chasse-erreurs`),
  **20 texts each**. Correction de texte, PSAC French **Q7**. The child reads a
  deliberately broken passage and taps every word they think is wrong;
  **Vérifier** answers with a COUNT only and **Terminer** reveals everything.
  Errors per text rise with the grade: **8 / 10 / 12**, 600 in total.
  ⚠ **A NEW QUESTION TYPE, `errorhunt`, from a new factory `makeErrorHunt`** — so
  it lives in all four copies (`helpers.js` + the three server ones) **and in
  their exported context lists**, which is the step `makeCloze` was missing when
  every cloze text vanished from the built bundle while the source read correctly.
  `isPoolQuestion()` excludes it, like `cloze`; dealt into practice it would draw
  a number pad under a French passage.
  ⚠ **VÉRIFIER IS CAPPED AT 3, and the screen says so.** A count you can ask for
  freely is an oracle: click one word, read the count, and you have been told
  whether that word is an error. `test-error-hunt-interaction.js` captures the
  text's markup either side of a check and asserts it **byte-identical** — the
  moment a checked word looks different from an unchecked one, Vérifier has
  answered the question instead of the child.
  ⚠ **Errors are authored INLINE**, `{faux>juste:regle}`, so an error can never
  drift from its word. Punctuation outside the braces rides onto both forms
  (`{cahier>cahiers:pl}.` = a wrong word with a correct stop) while
  `{cour>cour.:pt}` is a MISSING stop — the child clicks the word it should
  follow. Anything else containing a brace **throws at build time**: a
  half-written token would otherwise print `{cour>cour.:pt}` at a child.
  ⚠ **Every word outside the braces must be correct French.** A word left wrong
  by accident is an error a child can see, cannot score, and **is told is
  correct** when they click it. The factory therefore also emits `correct`, the
  whole text put right, so a harness can read all sixty as plain French.
  ⚠ **A title must not contain the correction of its own error** — 10 of the
  first 20 titles did, handing a proper noun away on the list screen before the
  text was opened. Same rule the cloze titles learned.
  ⚠ **A tap must never call `renderPlayer()`** — it rebuilds the host's
  innerHTML, destroying the button under the finger and jumping to the top of
  the text. `tap()` flips one class and patches the counter line.
  ⚠ The 44px tap rule is **deliberately bent, here only**: every word is a
  button, and 44px-tall words turn a 110-word Grade 6 passage into six phone
  screens. Words are 40px with `min-width` holding the short ones.
  Progress: one `recordAnswer()` per error (one error = one mark), passing the
  TEXT id, so `answeredIds` gains it once; `DB.hunt` (seeded in
  `Store._defaultStudent`) holds the best score per text. These answers DO count
  toward mastery.
  `engine/errorhunt.js` · `scripts/test-error-hunt.js` (70 checks) ·
  `scripts/test-error-hunt-interaction.js` (42 checks, real headless Chrome at
  360px in both themes).
- **Textes à Trous** — added 2026-09-06, a ✨ BONUS chapter per live French pack
  (`g4fr-textes-trous` / `g5fr-textes-trous` / `g6fr-textes-trous`), **20 texts
  each**. This is PSAC French **Q6** (10 marks); the bank had **nothing** for it
  in any grade.
  ⚠ **THE THREE PACKS ARE NOT THE SAME SHAPE, because the real papers are not.**
  Grades 4 and 5 are **one part** — one passage, ten gaps, eleven words, one
  deliberate spare — and Grade 5 text 1 is the real 2025 paper. **Grade 6 is two
  parts** (rebuilt 2026-09-07): **6A** is 5 gaps with a bank of 6 and one spare,
  then **6B** is 5 more gaps of the SAME story with **no word list at all** — the
  child types the word. Texts 1 and 2 are real papers (Jumbo, Alice), verbatim.
  Grade 6 was originally built to the Grade 5 shape, so a child in the year they
  actually sit the PSAC drilled 200 gaps that every one of them handed the word
  over, and had never met the half of Q6 that does not.
  ⚠ **Q6 is grammar-in-context inside a STORY, not a vocabulary quiz.** Measured
  over the two real papers: **11 of 20 answers are grammar words** (`devant sans`
  `très tard sous sa autour dans qui`), the other 9 everyday narrative vocabulary
  (`petit première ronde commence matin perdu`). The first Grade 6 set answered
  with `transbordement`, `blanchiment`, `écosystème` in expository texts about the
  port and coral reefs — **5.5% grammar words**, a different skill in a different
  genre. The rebuild measures **85%**; the papers are 55%, so it now errs the
  other way. Keep new texts narrative and the answers to words a child owns.
  ⚠ **A part-B gap accepts a LIST** (`gapAlts`): « je veux rentrer / retourner /
  revenir chez moi » are all correct, and failing a child for the better word is
  the one thing this exercise must not do. A **missing accent scores as right**
  and is flagged — a phone keyboard is a device problem, not a French mistake.
  ⚠ **Every typed gap is the SAME width.** An input sized to its answer prints
  the answer's length on screen; the paper draws one dotted line for every gap.
  ⚠ **Typing must never call `renderPlayer()`** — it rebuilds the host's
  `innerHTML`, destroying the input being typed into and dropping the caret
  mid-word. `typeGap()` writes state and patches the progress line only.
  ⚠ **A NEW QUESTION TYPE, `cloze`**, from a new factory `makeCloze` — so it lives
  in all four copies (`helpers.js` + the three server ones). It was defined in all
  three server copies and **missing from their exported context list**, so every
  text was silently absent from the built bundle while the source read correctly.
  That is the standing hazard in this table, caught only by grepping the BUNDLE.
  ⚠ **`isPoolQuestion()` in `questions_engine.js` excludes `cloze` from every
  pool** — `getStaticQs` feeds practice, subsection practice AND
  `assembleExamPaper`. Dealt into either, a cloze item falls through to the
  numeric branch and draws a **number pad under a French passage**.
  ⚠ **`examWeight: 0` does NOT keep a chapter out of an exam.**
  `assembleExamPaper()` clamps every weight with `Math.max(1, …)`, so a 0 still
  buys a slot. The older claim in this file was wrong. The TYPE filter is the
  guard that actually holds — and until 2026-09-08 that slot was simply LOST:
  a chapter that could fill nothing still took its question out of the paper,
  so a "40-question" French exam dealt 39 in grades 5 and 6 and **37 in grade
  4**, silently, for as long as these chapters have existed. `assembleExamPaper`
  now drops a chapter that has neither a poolable question nor a generator.
  `scripts/test-exam-paper-shape.js` asserts all fifteen live packs deal a whole
  40 / 25 / 15, and was verified to catch it by reintroducing the bug.
  ⚠ **Tap-to-place, not drag.** HTML5 drag does not fire on touch at all, and a
  pointer-drag on a 360px phone means a nine-year-old holding a chip over a 40px
  target while the page scrolls. Tapping a word fills the **next empty gap**, so
  a child never has to aim; tapping a filled gap takes the word back. Drag is
  added on top for mouse/stylus only.
  ⚠ **A title must never contain one of its own answers** — 28 did, which handed
  a free mark on the list screen before the text was even opened. ⚠ With `le`,
  `la`, `un` and `à` now among the Grade 6 answers this rules out most « Le … »
  titles: three of the twenty tripped it on the first run.
  ⚠ **A passage printing a content answer in plain sight is grandfathered, not
  accepted.** 19 Grade 4/5 texts do it (`g4fr-clz-002` gap 1 is « chien » and the
  next sentence reads « Le chien a tout … ») — and so does the real 2025 hérisson
  paper, which repeats « doux », so it is not a rule the papers follow. The test
  prints those as notes and **asserts** it only for the two-part pack.
  Progress: `recordAnswer()` runs **once per gap** (one gap = one mark), passing
  the TEXT id, so `DB.chapters[ch].answeredIds` gives the list its ticks with no
  new bookkeeping; `DB.cloze` (seeded in `Store._defaultStudent`) holds only the
  best score per text. Unlike the minigames, these answers DO count toward mastery.
  `engine/cloze.js` · `scripts/test-cloze-texts.js` (100 checks) ·
  `scripts/test-cloze-interaction.js` (64 checks, real headless Chrome at 360px:
  place, un-place, mark, tick, overflow, tap targets).
  ⚠ In that harness, measure a gap with **`offsetHeight`, not**
  **`getBoundingClientRect()`** — the pop animation's `scale(.82)` reports 29px
  for an element that is really 35.7px.
- Every live grade has enrichment chapters (History, Science), a Map Skills SVG,
  Passages & Text Types (English + French) and Description d'Images (French).
- Read-aloud speaks the **question only, not the options** (accepted). French
  packs speak `fr-FR` with a matching voice; voices are warmed at load because
  `getVoices()` is empty on the first tap, and `speak()` stays synchronous inside
  the gesture for iOS.
- ⚠ **No child had a single day of `daily` data as of 2026-08-30** — the dated
  reporting code had not run in production. Reports, family overview and calendar
  fill in from each child's next session after deploy.

#### Teacher Mode — Hybrid Classroom Command Centre (2026-09-06)
Main navigation is **Home · Classrooms · Set Work · Results** plus a labelled
`⋯ More` menu (Materials, Messages, Gradebook, Archived work, Teacher settings).
The classroom screen is **Overview · Work · Pupils** plus `⋯ More` (Materials,
Results, Settings). Set Work shows classroom → sharing choice → grade/subject →
chapter → number of questions → due date; everything else is inside
`<details id="ta-more-options">`. Full write-up: ENGINEERING-NOTES
"Teacher Mode → Hybrid Classroom Command Centre".
- **Location survives refresh**: `psac_teacher_loc_v1` (owner-scoped) holds tab,
  list filter, selected results and the open classroom + section.
- **Evidence thresholds** live in `TeacherInsights`: ≥ 5 answers before "may
  need help" (< 50 %), ≥ 3 answers in a chapter before naming it, "very
  quickly" = < 8 s/question **and** < 60 %. Never label on one or two answers.
- ⚠ **The board's `p:not(…):not(…)` rule scores (1,3,1)** and beats every
  single-id override; the command-centre CSS uses `#screen-teacher#screen-teacher`
  on purpose. Paper cards carry their own ink in both themes.
- ⚠ **`checkVisibility()` answers false for everything in headless Chrome 152.**
  A probe built on it measures nothing and passes. The harness filters closed
  `<details>` by ancestry and asserts collapse by geometry.
- ⚠ **A refresh superseded by a newer one resolves `undefined`** —
  `TeacherWorkspace.ensureLoaded()` waits for the newest in-flight refresh and
  judges by `loaded`, or Home shows its error state on every load.
- Sharing choice is on step 1 on purpose (online groups need "Anyone with the
  link" without discovering a disclosure); PIN is the default whenever the
  classroom has pupils, flipped only by the teacher's own tap.
- Not shown, on purpose: a "Scheduled" filter (nothing schedules a start),
  hints / attempt limits / answer visibility (no server support). The classroom
  `?classroom=` share link is **inert** (nothing parses it) and is not promoted.
- Tests: `scripts/test-teacher-command-centre.js` (141 checks, VM) and
  `scripts/test-teacher-command-centre-layout.js` (headless Chrome, 360/1280 ×
  light/dark, overflow + contrast + 44 px targets; `--shots DIR` for screenshots).

#### Pending / not yet done
⚠⚠ **THE PUBLISH ROOT LEAKED MORE THAN netlify/, AND THE REAL DEFECT IS THAT
THE 404 LIST IS HAND-MAINTAINED.** Also measured live 2026-09-08:
`/docs/content-coverage-plan.md`, `/dbg18.js` and `/test.py` answered **200**;
`past-papers/` (PDFs of real copyrighted exam papers), `exam_papers/`,
`migrations/`, `tmp/`, `node_modules/` and five dot-directories were unblocked
and safe only because the last deploy did not contain them.
⚠ **A 404 from this site has two meanings**: ~398 KB is one of our rules firing,
~4.2 KB is Netlify saying the file was not deployed. Never read the second as a
block. Rules are added; `scripts/test-netlify-redirects.js` (133 checks) now
walks the tree and fails on anything neither allowlisted nor blocked, and was
verified in both directions - including that a rule matching `/.netlify/*`
would 404 every function in the app.
⚠ `.netlify/` CANNOT be blocked by a path rule (same prefix as the functions);
it is asserted gitignored instead.

⚠⚠ **THE WHOLE `netlify/` DIRECTORY WAS PUBLICLY SERVED, AND IS UNTIL THE
NEXT DEPLOY.** Measured against production 2026-09-08, anonymous, no headers:

| path | status |
|---|---|
| `/netlify/question-bundles/grade5-maths.json` | **200 — 651 KB of real questions with their answers** |
| `/netlify/functions/questions.js` | **200 — 36 KB, the source of the entitlement enforcement** |
| `/netlify/lib/questions-sandbox.js` | 200 |
| `/netlify/import-questions.js` | 200 |
| `/.netlify/functions/questions` | 401 — the function itself is fine |

58 bundle files. That path bypasses `netlify/functions/questions.js` entirely:
the plan, the kill switch, entitlements, expiry and moderation blocks are all
decided in that function and **none of them ran**. `publish = "."` serves the
repo root, and the bundles being gitignored is exactly what ships them — a CLI
deploy uploads from local disk.
⚠ A `[[redirects]]` 404 on `/netlify/*` is now in `netlify.toml` (trailing
splat, the only wildcard shape Netlify matches). It is **not verified**, because
nothing has been deployed. After the next deploy, probe BOTH:
`/netlify/question-bundles/grade5-maths.json` must answer 404 **and**
`/.netlify/functions/questions` must still answer 401 — a rule that caught the
leading-dot path would take the whole question service down.
⚠ Nothing in the browser fetches that path; grepped across `engine/`,
`index.html`, `guest.html`, `vote.html` and `score.html` before blocking it.
⚠ **`/subjects/*/questions/*` was already blocked.** One of the two source
routes was closed and the other, added later by the build, never was — which is
the standing shape of this hazard: the 404 list is hand-maintained and a new
directory joins the publish root silently.
⚠ **`netlify/functions/parent-pin-signin.js` IS NOT DEPLOYED YET.** The table
it needs (`parent_pin_attempts`) is applied to production and recorded in
`supabase-schema.sql`; the function and its `/api/parent-pin-signin` redirect
are in the working tree only. Until it ships, `_pinServerSignIn()` receives the
SPA fallback (HTML at status 404), reads it as `unavailable`, and the PIN pad
behaves exactly as it did before — the intended failure mode, not a silent one.
Verify against **production** immediately after promoting (a draft deploy
answers 401 to everything): **401 means deployed, 404 means missing**.
⚠ Unverified until then: that `admin.generateLink()` does not SEND an email.
It should not — that is what it is for — but email is a shared ~500/day Gmail
quota and being wrong costs one message per PIN sign-in.

⚠ **The question cache was over the localStorage quota and is now fixed** (byte
budget, 2026-09-07 — see "Question cache" above). It is listed here only
because the thing that caused it will happen again: **bundle sizes drift and
nothing re-measures them.** The French packs quintupled with no one noticing.
Run `node netlify/build-questions.js && node scripts/test-question-cache-budget.js`
after any large content addition; it fails when a grade stops fitting.

**There are no outstanding SQL migrations.** The teacher due-date /
chosen-pupils migration (`teacher_guest_create_assignment` gains `p_due_at` +
`p_pupil_ids`; `guest_my_assignments` returns `chapter_ids`) was **applied to
production on 2026-09-06**, verified as `authenticated` in rolled-back
transactions (a 7-day due date writes `due_at` and `expires_at` at 168 h, not
48; three chosen pupils roster three of twenty-five; no due date still gives
48 h and the whole class; a past due date and a foreign pupil id are both
refused), and `supabase-schema.sql` regenerated from the live database — the
diff is exactly those two function bodies and one grant line.
⚠ **A newly created function inherits Supabase's default privileges, which
include `anon`.** `REVOKE ... FROM PUBLIC` does NOT remove that — it only drops
the `=X` PUBLIC entry. The migration's own REVOKE/GRANT pair therefore left
`anon=X` on the new signature; it was revoked explicitly so the ACL matches the
signature it replaced. Check `proacl`, not the migration text, after any
`CREATE FUNCTION`. The migration file was deleted on application, per the rule
below. Before it, **there were no outstanding SQL migrations, because there
were no migration files.** All 31 were verified applied against the live database and consolidated
into `supabase-schema.sql` on 2026-09-06. This list used to name migrations as
outstanding that had been applied for weeks, and that staleness sent a whole
debugging session down the wrong path — so it cannot go stale that way again.
Anything below that touches the database is a **decision**, not a pending run.
Re-check with `pg_policies` / `pg_proc` before trusting any line of it.

0. ⚠⚠ **A CO-PARENT CAN TAKE OVER A FAMILY.** `families_own` is
   `USING (parent_id = auth.uid() OR is_family_member(id) OR is_admin())` with
   `WITH CHECK (parent_id = auth.uid() OR is_admin())`. A co-parent passes
   USING because they **are** a member, then passes WITH CHECK because the row
   they write names **themselves** as `parent_id` — so
   `UPDATE families SET parent_id = auth.uid()` succeeds and they become the
   owner, inheriting the right to invite, to remove the original parent, and to
   delete the family.
   **Measured against production 2026-09-06** as `authenticated` in a
   rolled-back transaction, and asserted by
   `scripts/sql-tests/run-schema-tests.sh`, **which fails on it today**.
   ⚠ A **stranger cannot** — USING fails for a non-member, and an UPDATE whose
   USING matches no row changes nothing and raises nothing. The exposure is to
   an adult the owner deliberately invited, which is why it is a decision and
   not an emergency.
   The one-line fix is written out, commented, at the end of
   `supabase-schema.sql`: narrow **WITH CHECK only** to
   `(parent_id = auth.uid() AND is_family_owner(id)) OR is_admin()`, leaving
   USING untouched so co-parent reads are unaffected and rule 2 above is not
   re-opened. ⚠ Check first whether any co-parent feature legitimately writes to
   `families` (renaming it, say) — if one does, that field needs a SECURITY
   DEFINER function rather than a wider policy.

1. **Email is SOLVED — custom SMTP is live on Gmail, verified 2026-09-04.**
   `smtp.gmail.com:465`, user and `smtp_admin_email` both
   `psacpractice@gmail.com`, sender name "PSAC Exam Practice", authenticated
   with a Google **App Password** (not the account password — Google has refused
   those over SMTP since 2022; measured: `535-5.7.8 Username and Password not
   accepted`). `mailer_autoconfirm` is **OFF** and `rate_limit_email_sent` is
   **30**, up from the built-in sender’s hard cap of 2/hour.
   ⚠ **`smtp_port` must be sent to the Management API as a STRING** (`"465"`).
   A number is rejected: `smtp_port: Invalid input: expected string, received
   number`.
   ⚠ **`smtp_admin_email` must BE the Gmail account.** Gmail rewrites `From`
   to the authenticated user, so any other sender address is replaced or
   refused. Mail visibly comes from `psacpractice@gmail.com`.
   ⚠ **Gmail’s own ceiling is ~500 recipients/day**, account-wide, and no
   Supabase setting raises it. That is the limit now — not `rate_limit_email_sent`.
   ⚠ Verified end to end, not assumed: a real recovery email was delivered and
   confirmed received, then a real sign-up returned **no session** with
   `confirmed_at: null` — which is what keeps `emailSignUp()`’s
   `if (data?.session)` branch landing on the check-email screen. The test
   user was deleted; `auth.users` was re-counted to prove it.
   ⚠ **Resend is now legacy for auth mail and was never the blocker’s fix.**
   The old plan (verify a domain at resend.com) is moot for GoTrue. It still
   matters for the two Netlify functions below.
   ⚠ **`psac-practice.netlify.app` can NEVER be a sending domain** — SPF/DKIM
   would have to live in a DNS zone Netlify owns. Still true, still worth not
   re-proposing.

1b. **`notify.js` and `weekly-digest.js` now send through the same Gmail
   account** — 2026-09-04. Both call the shared `netlify/lib/mailer.js`
   (nodemailer over `smtp.gmail.com:465`), reading `GMAIL_USER` /
   `GMAIL_APP_PASSWORD`, which are set on the Netlify site. Resend is gone from
   both. ⚠ **NOT DEPLOYED YET** — see the deploy note below.
   ⚠ **MEASURED: `RESEND_API_KEY` was never set on the Netlify site at all.**
   The site held only `SUPABASE_URL`, `SUPABASE_ANON_KEY` and
   `SUPABASE_SERVICE_ROLE_KEY`. So both functions were hitting their own
   `not_configured` guard and **never attempted a send** — no parent has ever
   received an assignment notification or a weekly digest. The 403
   unverified-domain finding recorded here previously was real, but it was
   measured against the Resend API directly and is **not** what production hit.
   The lesson is the one this file keeps re-learning: a guard that returns
   "not configured" and a send that fails look identical from outside.
   ⚠ **`VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_EMAIL` are also absent**
   from the site env, so `push-*.js` is equally inert. Pending item 4 (rotate
   the leaked keypair) is therefore free to do — nothing is using them.
   ⚠ **`sent++` in the digest counted ATTEMPTS, not deliveries**, so the closing
   log line reported a full run whether or not one email left the building.
   It now counts only `ok` sends and logs `N FAILED` beside them.
   ⚠ The from-address is deliberately **not** configurable any more. Gmail
   rewrites `From` to the authenticated account, so `NOTIFY_FROM_EMAIL` could
   only ever be wrong; `mailer.js` builds it from `GMAIL_USER`.
   ⚠ `nodemailer` is the first new runtime dependency in a long while. Verified
   it survives the esbuild bundler Netlify uses (488 KB, handler loads and
   runs) — a dynamic require would have failed only in production.
1c. **Child sessions can load their plan again — fixed 2026-09-04**, via
   `student_plan_features()` (applied; now in `supabase-schema.sql`). Found by signing in as a
   real child in a browser: `_loginStudentRow()` read `families.parent_id` to
   reach the plan, but `families_own` is
   `parent_id = auth.uid() OR is_family_member(id) OR is_admin()` and all three
   arms need `auth.uid()` — a child is **anon + a token header**. The read
   returned nothing, `_planFeaturesState` went to `failed`, and every child
   login logged *"plan limits are NOT being applied this session"*. It had
   never once succeeded. The family rows were fine; the child could not see them.
   ⚠ **THE OBVIOUS FIX WAS THE WRONG ONE.** Adding a child arm to `families_own`
   would let a child SELECT the whole row — including **`family_code`, the
   private join secret** (deliberately not the public `referral_code`), on the
   least trusted device in the family. The policy is therefore UNCHANGED, and
   the child calls `student_plan_features()` instead: SECURITY DEFINER, returns
   `{ok, plan_id, features}` and nothing else — no family_code, no parent_id,
   no credits, no family name.
   ⚠ Leaving the policy alone also sidesteps rule 2 above entirely: widening a
   USING clause with a predicate that must look the row up is what broke family
   creation for two days. Touching no policy cannot reintroduce it.
   ⚠ `p_student` is optional. A child omits it (the token answers); a parent
   PREVIEWING a child passes it, because that path has **no student token** and
   authorises through the parent’s JWT. Asking about a child that is not the
   token holder requires an adult of that family — verified: parent→own child
   `ok`, stranger→`not_authorized`, anon→`no_student`, anon naming a child
   →`not_authorized`.
   ⚠ Granted to **anon AND authenticated**. An authenticated-only grant is how
   the friend RPCs ended up dead (rule 4).
   ⚠ Verified in a browser on a **pure child session with no parent JWT in it**
   — that distinction matters, because a parent signed in on the same device
   answers these queries as the parent and hides the bug. Result: RPC `ok:true`,
   `plan_id "free"`, 12 features, **no console warning**, and a direct
   `families` select still returns **0 rows**.
1d. ⚠ **`anon` can INSERT into `question_reports` directly, unthrottled.**
   Measured in `supabase-schema.sql` 2026-09-07: policy
   `"anon can insert question reports" FOR INSERT TO anon WITH CHECK (true)`
   plus a full INSERT grant. Any visitor can therefore write rows into the
   admin queue from a console and skip the contact form's honeypot, validation
   and rate limits entirely. **Pre-existing — the contact form did not create
   it**, but it is what makes that throttle advisory rather than binding.
   ⚠ `reports_insert` (`current_student_id() IS NOT NULL OR auth.uid() IS NOT
   NULL`) already covers a child with a token and any signed-in adult, so the
   anon-true policy looks redundant — **verify that against `pg_policies` on
   the live database before dropping it**, not against this file. The guest
   path does not need it: the function holds the service role and bypasses RLS.
   Proposed, not applied:
   `DROP POLICY "anon can insert question reports" ON public.question_reports;`
   then `REVOKE INSERT ON public.question_reports FROM anon;` — and regenerate
   the dump.

2. ⚠ **Publish the shop catalogue** — Admin → Content → 🛒 Credit Shop →
   **Publish catalogue**. Not SQL: `purchase_subject()` and
   `shop_subject_price()` both exist, but `mm_data.shop_settings.catalog` is
   still `[]`, and that is what `purchase_subject()` validates against — so
   whole-subject buying refuses today.
3. ⚠ **Two families are both named "gobin"** (`B48C5A`, `4B2D15`), so
   `families_name_unique_ci` cannot be created and `verify_student_pin` can
   answer `ambiguous_family` to a child in either. family_name is one of the
   three things a child types to log in, so renaming one is a **decision about
   real children's credentials** — not a migration to run unattended.
   §13 of `supabase-schema.sql` therefore **skips itself and warns** rather
   than failing; those children can sign in with their 6-character family code
   meanwhile. Still true 2026-09-06.
4. ⚠ **Rotate the VAPID keypair** — the private key is in git history (`dba9b8e`)
   permanently. Update the Netlify vars and `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Costs nothing now: there are no real subscribers yet.
5. **Push notifications for assignments** — infrastructure ready, `push-send.js`
   not wired to assignment creation. Badge API not started.
6. **Split `admin.js` (133 KB) + `teacher.js` (28 KB) behind a role check** —
   every child parses them on first load for screens they can never open.
7. **Grades 1–2 need a picture-first question mode** — the renderer assumes the
   child can read the question *and* all four options.
8. **The grade 7–9 subject list is CONFIRMED** against the MIE NCF/TLS Grades 7–9
   (2026-09-08): English, Français, Mathematics, Science and **Social & Modern
   Studies** — 15 packs, 159 chapters, all still `comingSoon: true` because they
   have no questions yet.
   ⚠ **There is no separate History or Geography at 7–9.** Both live inside Social
   & Modern Studies, and the NCE assesses it as one subject; the old
   `grade{7,8,9}-history` placeholder packs were replaced. Chapters are grouped so
   the historical, geographical and civic strands stay distinguishable.
   ⚠ Grade 9 Science carries the exam’s own **B/C/P split** (`C1…C5`, `P1…P5`,
   `B1…B4`), matching the three separate NCE science papers.
   ⚠ Still to check before writing questions: the English and French **grammar**
   chapters. Those syllabus tables are dense multi-column layouts and pdftotext
   interleaved some columns, so verbs, modals, pronouns and prepositions were
   written at a deliberately general level. Re-read pp. 15–19 of the PDF first.
9. Still open from the security review, none as exploitable as the five fixed:
    the **local** parent-PIN copy is still base64 under `_getStoredPinHash`
    (now only a convenience check — the credential is
    `profiles.parent_pin_hash`), missing SRI on three CDN scripts with a
    floating `@2` major, CSP `'unsafe-inline'` (311 inline handlers), and the
    dormant plaintext-equality branch in `verify_student_pin`.
    ⚠ `parent_pin_hash` is a **plain SHA-256 with a fixed, shared salt**, so a
    4-digit PIN is 10 000 candidates to anyone who can read the column. Only
    the owner and an admin can (`profiles_select`), which is why this is a note
    and not an emergency — but a per-user salt and a slow KDF are what it
    should be now that the hash mints sessions.
    ⚠ `profiles_update` lets a parent write **their own** `parent_pin_hash`
    with no column restriction, and it is deliberately not in the privileged-
    column trigger list. That was harmless while the PIN gated a UI switch. It
    now means a live parent session can rewrite the credential — the same power
    that session already has, so it changes nothing today, but it is the next
    thing to guard if the PIN gains any further reach.
10. Content gaps: English "Vocabulary Builder", maths "Shapes Around Us",
    grade-6 maths enrichment. Illustration coverage in grade5-maths is still only
    ~1.4% of a 1,045-question pool.
11. **`daily` would be better as its own table** than a key in the rewritten-whole
    blob (~2.4 MB uploaded per 30-minute session at current caps). A migration
    plus a rewrite of every reader — not a quick change.
12. Payments are not wired: `openPlansModal()` is the single place to add them,
    and `payment-webhook.js` verifiers **fail closed** on purpose — enabling
    payments must break loudly until real signature checks are written.

---

#### Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no frontend bundler.
- **No comments** unless the WHY is non-obvious.
- **Autonomous execution** — implement fully; don't ask for confirmation on
  obvious tasks.
- **Student-first UX** — any new UI must work cleanly on mobile.
- **L4 = word problems** — difficulty 4 must be applied/contextual. ⚠ In maths only;
  L4 means something different in each pack (see the difficulty note above).
- **Alt text must never reveal the answer.**
- **Never remove `// @enrichment` guard comments.**
- **Measure, don't reason** — every ⚠ above exists because something that looked
  obviously correct was not.

#### How to continue
Open this file first, then grep `ENGINEERING-NOTES.md` for anything you are about
to investigate. Immediate next steps are under **Pending / not yet done**.

