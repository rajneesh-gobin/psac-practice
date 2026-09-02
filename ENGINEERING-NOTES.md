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
A vanilla JS single-page app (SPA) for Shanvi (child of deepmala.gobin@accenture.com) to revise for the Mauritius PSAC primary school exam. Grades 4, 5, 6. Subjects: Maths, English, French, Science, History & Geography.

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
| shanvi | yes | **0** | 57 |
| Shanvi | no | 0 | 48 |
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
  only by case (`shanvi` / `Shanvi`), on distinct usernames `@shanvi` and
  `@shanvi1` — which is precisely why the child cards show `@username`.
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
shanvi/
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
Shanvi — just type your PIN"*, with a "Not you? Sign in another way" escape.
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
