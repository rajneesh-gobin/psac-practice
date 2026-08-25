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
supabase.js → store.js → registry.js → questions_engine.js → helpers.js →
events.js → protect.js → question_loader.js → auth.js → admin.js →
teacher.js → forum.js → calendar.js → app.js
```
Then all `_manifest.js` files (grades 4/5/6, all subjects).

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

### Referral system
- Every `profiles` row gets a unique `referral_code` (8-char, auto-generated). Deliberately separate from `families.family_code` — that one's a private "join my family" secret, this one is meant to be pasted into WhatsApp.
- Parent dashboard → "🎁 Invite Friends" button → modal with the code, a `?ref=CODE` link, WhatsApp share (`wa.me`), native Share (`navigator.share`, falls back to clipboard copy), and a live list of "Friends who joined" + total count.
- Flow: `Auth._captureReferralFromUrl()` reads `?ref=` on every page load (before routing), stores it in `localStorage`, strips it from the URL. `screen-family-setup` shows it in an editable "Referral code (optional)" field, pre-filled if one was captured. On `completeSetup()` / teacher bootstrap, `Store.recordReferral()` calls the `record_referral()` RPC once the new profile exists.
- `record_referral()` / `my_referrals()` are both `SECURITY DEFINER` (see `supabase-referrals.sql`) so a referrer can see who they referred (name + join date only, never email) without widening `profiles`' `SELECT` RLS policy beyond "own row".
- `referrals.status` is `'joined'` for everyone today — the column already distinguishes `'joined'` from `'subscribed'` so a future reward (e.g. free tier months) can flip it without another migration, but nothing does yet.

---

## Pending / Not yet done
1. ~~Supabase table~~ — **DONE.** `push_subscriptions` already exists (created by
   `supabase-rls-migration.sql` Part 0, which supersedes the standalone
   `supabase-push-table.sql`). Verified live 2026-08-25: anon read returns
   `200 []`, not "relation does not exist."
1b. ~~Supabase referrals~~ — **DONE.** `supabase-referrals.sql` is deployed.
   Verified live 2026-08-25: `record_referral`/`my_referrals` both return
   `42501 permission denied` (function exists, correctly gated to
   `authenticated`), not `PGRST202 could not find the function`.
   (Same live-verification pass confirmed every other `supabase-*.sql`
   migration in the repo is also already deployed — guest assignments,
   guest hardening, guest submit-token, teacher approval, classrooms,
   the pgcrypto search_path fix, create_student_with_pin, and the
   bridge-policy drop. Nothing outstanding needs running.)
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
  supabase-push-table.sql     ← run once in Supabase to create push_subscriptions table
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
