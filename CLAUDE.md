# PSAC Exam Practice — Project Brief for Claude

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

## Database files — only two, since 2026-08-26
The 24 incremental `supabase-*.sql` files are gone. They had all been applied,
several had been superseded by later ones, and a live audit found the deployed
schema differed from what they claimed in three places — so they were actively
misleading about what was running.

| File | What it is |
|---|---|
| `supabase-migration.sql` | **The file to run.** Idempotent; re-running changes nothing. Parts 1–4 run unattended, Part 5 is destructive/disruptive and stays commented out. |
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
2. **Netlify env vars** — set these in the Netlify dashboard, never in the repo:
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
3. **Push notifications for assignments** — infrastructure is ready; wire up `push-send.js` when parent creates an assignment
4. **Badge API** — show assignment count badge on app icon (needs Supabase assignment count)
5. **Enrichment chapters for French/English/Maths** — partly superseded: `Description d'Images` (French, all grades) and `Passages & Text Types` (English + French, all grades) now cover the picture and text-type work. Still open: an English "Vocabulary Builder" and a maths "Shapes Around Us" picture chapter.
6. **Grade 6 maths enrichment** — not started
7. ~~Illustrated questions for Maths chapters~~ — **DONE for Grade 4 & 5** (Grade 6 Maths already had some).
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
8. ~~Illustration coverage across other subjects (exam mode)~~ — **broad pass done**, follow-up
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
After restart, open this file and tell Claude: "Continue the PSAC project — read CLAUDE.md first."
The immediate next steps are listed under "Pending / Not yet done" above.
