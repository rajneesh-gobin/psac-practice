# PSAC Exam Practice — Complete System Analysis

> A factual, exhaustive description of the codebase as it exists today.
> Written to be handed to another AI/reviewer as context for improvement suggestions.
> Everything below was derived by reading the actual source, not from prior documentation.

---

## 1. What the product is

A **vanilla-JS single-page web app** for Mauritian primary-school students revising for the
**PSAC** (Primary School Achievement Certificate) exam.

- **Grades:** 4, 5, 6
- **Subjects (×5 per grade = 15 subject packs):** Maths, English, French, Science, History & Geography
- **Curriculum:** MIE Mauritius
- **Personas:** Student, Parent, Teacher, Admin, Super Admin
- **Hosting:** Netlify (static site + serverless functions)
- **Backend:** Supabase (Postgres + Auth + RPC), project `xawvjwsiqhtxgpocdqgm`
- **Live URL referenced in code:** `https://psac-practice.netlify.app/`
- **PWA:** installable, offline-capable, push notifications

No frameworks, no bundler on the frontend. Tailwind via CDN + a hand-written `style.css`.
The entire UI lives in one 145 KB `index.html` as ~24 hidden `<div class="screen">` blocks toggled
by `showScreen(id)`.

---

## 2. Tech stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla ES2018 JS (IIFE modules, global namespace), HTML, Tailwind CDN, custom CSS |
| State | In-memory globals + `localStorage` cache + Supabase as source of truth |
| Auth | Supabase Auth (email/password + Google OAuth) for adults; custom username+PIN for students |
| DB | Supabase Postgres, 16 tables, RLS enabled but mostly permissive |
| Serverless | Netlify Functions (Node, esbuild bundler) — 9 functions, 2 on cron |
| Email | Resend API |
| Push | Web Push (VAPID) + `web-push` npm package |
| Offline | Service Worker (`sw.js`) with 3 caching strategies |
| Question delivery | Server-side `vm` sandbox that executes question `.js` files and returns JSON |

---

## 3. Repository map

```
psac-practice/
├── index.html                    145 KB — ALL screens, modals, script tags
├── style.css                      24 KB — custom CSS on top of Tailwind
├── sw.js                           6 KB — service worker (cache + push)
├── manifest.json                        — PWA manifest
├── netlify.toml                         — build, CSP headers, cron, redirects
├── package.json                         — single dep: web-push
│
├── engine/                        ~330 KB total — all application logic
│   ├── supabase.js         0.7 KB  Supabase client singleton (_sb)
│   ├── protect.js          1.3 KB  content protection (right-click, Ctrl+S/U/P)
│   ├── helpers.js          2.6 KB  rnd/shuffle/fmt + question factories
│   ├── questions_engine.js 4.8 KB  STATIC_QUESTIONS pool + selection/assembly
│   ├── registry.js         0.7 KB  SUBJECT_PACKS + registerSubject()
│   ├── events.js           0.8 KB  tiny pub/sub bus
│   ├── store.js           14.8 KB  ALL Supabase + localStorage data access
│   ├── question_loader.js 13.4 KB  loads question files (API in prod, <script> local)
│   ├── app.js            140.4 KB  ← the monolith: UI, practice, exam, gamification, PD
│   ├── auth.js            46.6 KB  auth flows, family/student CRUD, session guard
│   ├── admin.js           32.5 KB  admin panel (members, content, roles, plans, reports)
│   ├── teacher.js         17.0 KB  teacher mode (localStorage-only assignments)
│   ├── forum.js           26.9 KB  community forum
│   ├── calendar.js        35.9 KB  study timetable generator + today's plan
│   └── search.js          24.3 KB  fuzzy question/syllabus search
│
├── subjects/<grade>-<subject>/
│   ├── _manifest.js              registerSubject({...chapters})
│   └── questions/*.js            STATIC_QUESTIONS.push(makeMCQ({...}))
│
├── netlify/functions/            9 serverless functions (see §10)
│
├── SQL:  supabase-migration.sql (the one file to run), supabase-schema.sql
│         (live-schema dump, rebuild reference). The 24 incremental
│         supabase-*.sql files were consolidated into these two on 2026-08-26
│         and live in git history — filenames mentioned later in this document
│         are historical records of what was run, not files on disk.
│
└── Docs: CLAUDE.md, ARCHITECTURE.md (STALE — describes the old "MathMaster" v1),
          CONTRIBUTING.md, HOW_TO_PUBLISH.md, HOW_TO_RUN_LOCALLY.md,
          subjects/QUESTION_SCHEMA.md
```

---

## 4. Runtime architecture

### 4.1 Script load order (bottom of `index.html`)

```
supabase-js UMD (CDN)
  → engine/supabase.js        defines _sb
  → engine/protect.js
  → engine/helpers.js         rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry
  → engine/questions_engine.js STATIC_QUESTIONS[], getQuestionsForChapter, assembleExamPaper…
  → engine/registry.js        SUBJECT_PACKS[], registerSubject()
  → engine/events.js          Events
  → engine/store.js           Store
  → 15 × subjects/*/\_manifest.js   (grade4 ×5, grade5 ×5, grade6 ×5)
  → subjects/grade5-maths/help.js   CHAPTER_HELP
  → engine/question_loader.js QuestionLoader
  → engine/app.js             DB, S, showScreen, all render*, practice/exam engines
  → engine/auth.js            Auth  (calls Auth.init() at the bottom → boots the app)
  → engine/teacher.js         TeacherMode
  → engine/admin.js           AdminPanel
  → engine/forum.js           Forum
  → engine/calendar.js        Calendar
  → engine/search.js          Search
```

**Rule:** a file may read globals defined above it, never below. `auth.js` boots the app.

### 4.2 Global namespace (there is no module system)

| Global | Defined in | Meaning |
|---|---|---|
| `_sb` | supabase.js | Supabase client (publishable key hard-coded) |
| `STATIC_QUESTIONS` | questions_engine.js | Flat array of **every loaded question object** |
| `SUBJECT_PACKS` | registry.js | All 15 registered subject packs |
| `CHAPTERS` | **grade5-maths/_manifest.js** | Chapters of the *active* subject — mutated in place |
| `SYLLABUS`, `FORMULAS`, `BADGES`, `GENERATORS` | **grade5-maths/_manifest.js** | Maths-only extras, but global |
| `CHAPTER_HELP` | grade5-maths/help.js | YouTube video help — maths-only |
| `DB` | app.js | Active student's progress object (mutated in place, never reassigned) |
| `S` | app.js | Session state: `S.practice{…}`, `S.exam{…}`, `S.currentScreen` |
| `ACTIVE_STUDENT_ID`, `ACTIVE_PACK`, `SELECTED_GRADE` | app.js | Active context |
| `ASSIGNMENT_MODE`, `ASSIGNMENT_CONFIG`, `ASSIGNMENT_IS_TEST`, … | app.js | Teacher-assignment mode flags |
| `GLOBAL_SETTINGS` (on `window`) | set by auth.js | Admin kill-switches (disabled grades/subjects) |
| Modules | — | `Store`, `Auth`, `AdminPanel`, `TeacherMode`, `Forum`, `Calendar`, `Search`, `QuestionLoader`, `Events`, `PD` |

**Important quirk:** `CHAPTERS`, `BADGES`, `SYLLABUS`, `FORMULAS`, `GENERATORS`, `CHAPTER_HELP` are all
declared inside **Grade 5 Maths' manifest**. Switching subjects does *not* replace them — it
**mutates `CHAPTERS` in place** (`CHAPTERS.length = 0; chs.forEach(push)`). Consequences:
- Badges are Maths-flavoured (Fraction Wizard, Angle Detective…) but awarded across all subjects.
- Syllabus subsections and Formula cards only exist for Grade 5 Maths.
- Video help only exists for Grade 5 Maths.
- Dynamic question `GENERATORS` only exist for Grade 5 Maths chapters.

### 4.3 Screen router

`showScreen(id)` hides all `.screen` divs, shows `#screen-<id>`, toggles the header
(`data-hide-header`), toggles the logout + search buttons, rebuilds the breadcrumb,
then dispatches to the right render function:

```
dashboard → renderDashboard()      chapter-select → renderChapterSelect()
analytics → renderAnalytics()      syllabus       → renderSyllabus()
parent    → renderParentDashboard() subject-select→ renderSubjectSelect()
student-select → renderStudentSelect()  grade-select → renderGradeSelect()
teacher   → TeacherMode.render()   forum → Forum.render()   calendar → Calendar.render()
```

### 4.4 The 24 screens

`landing`, `auth`, `verify-email`, `reset-password`, `family-setup`, `add-student`,
`dashboard`, `student-select`, `grade-select`, `subject-select`, `exam-config`, `exam`,
`results`, `chapter-select`, `practice`, `analytics`, `syllabus`, `admin`, `teacher`,
`assignment`, `assignment-complete`, `parent`, `forum`, `search`, `calendar`.

---

## 5. Data model

### 5.1 Supabase tables (16)

| Table | Key columns | Purpose |
|---|---|---|
| `profiles` | id (=auth.users.id), role(parent/teacher/admin), full_name, disabled, expires_at, is_super_admin | Adult accounts |
| `families` | id, **parent_id** → profiles, family_name, family_code (auto 8-char) | One family per parent |
| `students` | id, family_id, username(unique), display_name, avatar, grade(4-6), **pin** (bcrypt), settings jsonb, session_version, expires_at | Child accounts |
| `student_progress` | student_id (TEXT PK), data jsonb, updated_at | The whole `DB` object as JSON |
| `student_assignments` | id, student_id, parent_id, subject_id, chapter_id, difficulty, note, show_answers, completed_at | Parent → child homework |
| `mm_data` | key PK, value jsonb | KV store; holds `global_settings` |
| `question_reports` | question_id, question_text, message, student_id, status | Student "report this question" |
| `plans` | id(free/starter/premium), name, price_mur, max_children, features jsonb, is_active | Pricing tiers |
| `subscriptions` | user_id, plan_id, status(active/cancelled), started_at, expires_at | Active plan |
| `payments` | user_id, plan_id, amount_mur, provider, status, notes, processed_at | Payment ledger |
| `login_events` | user_id(TEXT), user_type, ip_address, user_agent, fingerprint | Audit log |
| `forum_posts` | category, title, body, author_name, author_type, reply_count, status | Forum threads |
| `forum_replies` | post_id, body, author_name, author_type | Replies (trigger keeps `reply_count`) |
| `study_schedules` | student_id(TEXT), parent_id, settings jsonb | One timetable config per student |
| `schedule_entries` | schedule_id, student_id, date, topic_label, entry_type, duration_mins, subject_id, chapter_id, notes | Calendar events |
| `push_subscriptions` | student_id (unique), subscription jsonb, reminder_time "HH:MM" | Web Push |

**`student_progress.data` shape** (the `DB` object):
```js
{
  stats: { totalAttempted, totalCorrect, examCount, bestScore, maxStreak, streak, lastDate },
  chapters: { <chapterId>: { attempted, correct } },
  examHistory: [ { date, pct, correct, total, type } ],   // max 20
  badges: [ badgeId ],
  theme: 'dark'|'light',
  xp: 0, level: 1,
  assignments: [],
  restrictions: { lockedChapters:[], maxDifficulty:4, examDisabled:false,
                  crossGradeSearch:bool, crossGradePractice:bool }
}
```

### 5.2 Postgres RPCs (SECURITY DEFINER)

- **`verify_student_pin(p_username, p_pin) → jsonb`** — the production student-login path.
  Checks `expires_at`, reads `pin_attempts`/`pin_locked_until` out of `students.settings` jsonb,
  locks for 300 s after 5 failures, supports both plaintext (dev) and bcrypt (`crypt()`) PINs,
  returns the student row **without** the PIN.
- **`set_student_pin(p_student_id, p_pin) → void`** — bcrypt-hashes the PIN and clears lockout state.
- **`update_reply_count()`** — trigger keeping `forum_posts.reply_count` in sync.

### 5.3 localStorage keys

| Key | Written by | Content |
|---|---|---|
| `mm_sb_auth` | supabase-js | Supabase session |
| `mm_student_sess` | Store | `{id, displayName, avatar, grade, settings, sessionVersion}` |
| `mathmaster_s_<studentId>` | Store | Cached progress JSON (write-through cache) |
| `mathmaster_accounts` | Store | `[{id,name,avatar,grade}]` — mirror of family students |
| `mathmaster_pin` | Store | legacy parent PIN (v1 leftover) |
| `mathmaster_teacher` | TeacherMode | `{pin, assignments[], results{}}` — **device-local only** |
| `mm_qc_<subjectId>` | QuestionLoader | Question JSON cache, 7-day TTL |
| `mm_resume_<studentId>` | app.js | Interrupted practice/exam session, 24 h TTL |
| `mm_schedule_<studentId>` | Calendar | Cached timetable entries for offline "Today's Plan" |
| `mm_global_theme` | app.js | Theme before login resolves |
| `mm_forum_likes`, `mm_forum_nick` | Forum | Per-device likes + display nickname |
| `mm_ios_tip_dismissed` | app.js | iOS install banner dismissal |

---

## 6. Authentication & roles

### 6.1 Boot sequence (`Auth.init()`)

```
body.opacity = 0
 ├─ register onAuthStateChange (handles PASSWORD_RECOVERY, SIGNED_IN, SIGNED_OUT)
 ├─ _sb.auth.getSession()  → if session → _handleParentSession()
 ├─ else Store.getStudentSession() → if found → _resumeStudent()
 └─ else showScreen('landing')
```

### 6.2 Four login paths

| Persona | Mechanism | Landing screen |
|---|---|---|
| **Parent** | Supabase email/password or Google OAuth. First login with no `profiles` row → `family-setup` screen (creates profile + family + first child). | `parent` dashboard |
| **Teacher** | Same Supabase auth, but `profiles.role === 'teacher'` → `TeacherMode.render()`. Teachers **cannot self-register** (blocked in `emailSignUp`). | `teacher` |
| **Admin / Super Admin** | `profiles.role === 'admin'` (+ `is_super_admin`). Lands on parent dashboard with an extra "Admin" button. | `parent` + `admin` |
| **Student** | `username` + 4-digit PIN → `_sb.rpc('verify_student_pin')`. Session persisted in `localStorage`, **not** Supabase Auth. | `subject-select` |

### 6.3 Student session security

- **Anti-sharing:** every fresh PIN login bumps `students.session_version`. A background guard
  (`_startSessionGuard`) polls the DB every 5 min and also on the `online` event; if the version
  changed, the session is killed with a toast. Parent-supervised switching passes
  `bumpSession:false` so it doesn't kick the child.
- **Rate limiting:** client-side (5 tries → 60 s) *and* server-side in the RPC (5 tries → 300 s,
  state stored in `students.settings`).
- **Expiry:** both `profiles.expires_at` and `students.expires_at` are enforced at login and on resume.
- **Force logout:** admins can bump `session_version` from the admin panel.
- **Login audit:** `Store.logLoginEvent()` records IP (via `api.ipify.org`), UA and a base64
  device fingerprint into `login_events` on every login.

---

## 7. Content model

### 7.1 Subject pack shape

```js
registerSubject({
  id: 'grade5-history', name: 'History & Geography', subject: 'History & Geography',
  grade: 5, icon: '🌍', curriculum: 'MIE Mauritius',
  comingSoon: false,
  practiceble: true,      // has practice questions
  notesBased: true,       // Calendar shows "View Notes" instead of "Practice Now"
  noDifficulty: true,     // hide L1–L4 difficulty UI for this subject
  level4Label: 'Word Problems',   // maths only
  chapters: [
    { id, name, icon, examWeight, syllabus: '…prose description…' },
    { id, name, icon, examWeight, enrichment: true, enrichmentNote: '…' },
  ],
})
```
`registerSubject` snapshots `pack._chapters` so the mutable global `CHAPTERS` can't corrupt it.

**Per-pack flags in the wild:**
- `noDifficulty: true` → all English, French, Science, History packs (12 of 15)
- `level4Label: 'Word Problems'` → grade5-maths, grade6-maths
- `notesBased: true` → all English + French packs
- `comingSoon: false` on every pack (nothing is gated)

### 7.2 Question object

```js
{ id, chapterId, difficulty: 1|2|3|4, subsection?, type: 'mcq'|'numeric'|'symmetry',
  question,           // innerHTML — supports <b>, <img>, inline <svg>
  options[], answer, acceptableAnswers[], hint, explanation }
```

Factories in `helpers.js` (duplicated server-side in `netlify/functions/questions.js`):
`makeMCQ` (shuffles distractors + answer), `makeNum`, `makeTF`, `makeMatch`, `makeSymmetry`.

**Difficulty:** 1 = Basic, 2 = Medium, 3 = Hard, 4 = Challenge/Word Problems.

**ID convention:** `[grade+subject abbrev]-[chapter abbrev]-[3 digits]`, e.g. `g5sc-plants-004`.

**Enrichment chapters:** `enrichment: true` + `examWeight: 2`. Rendered with a gold
"✨ BONUS" badge, split into their own section on the chapter grid, guarded in source by
`// @enrichment — DO NOT remove during syllabus audits`.

### 7.3 Question delivery pipeline

```
PRODUCTION (Netlify)
  QuestionLoader.loadSubject(id)
    → localStorage cache `mm_qc_<id>` fresh (<7 days)?  → use it, no network
    → else GET /.netlify/functions/questions?subject=<id>
         with  Authorization: Bearer <supabase JWT>   (parent/teacher)
            or X-Student-Id: <uuid>                   (student)
    → function verifies JWT against /auth/v1/user, or validates UUID + existence
    → function reads subjects/<id>/questions/*.js from disk,
      executes each inside a Node `vm` sandbox with mock factories,
      collects pushes into a buffer, returns JSON
    → client dedupes by id and pushes into STATIC_QUESTIONS
    → cached for 7 days

LOCAL (file://)
  hard-coded LOCAL_FILES[subjectId] list → injects <script src> tags sequentially
```

`netlify.toml` 404s any direct browser request to `/subjects/*/questions/*`, so the raw
question source is never downloadable in production.

### 7.4 Question selection & exam assembly

- `getStaticQs(chapterId, difficulty)` — exact filter.
- `getQuestionsForChapter(ch, diff, count)` — L4 returns *only* static L4 (no padding);
  L1–L3 pad with `GENERATORS[chapterId]` then cross-difficulty fallback.
- `getMixedQuestions(ch, maxDiff, count)` — random across levels ≤ parent's cap. **Default mode**
  when a chapter is opened without a forced difficulty.
- `getQuestionsForSubsection(ch, sub, count)` — falls back to L2 chapter questions if < 3 found.
- `assembleExamPaper(type)` — `drill` 15Q/10min, `short` 25Q/25min, `full` 40Q/45min.
  Allocates per-chapter counts by `examWeight`, then samples 25/35/25/15 % across L1/L2/L3/L4,
  then reorders the whole paper easy→hard.

### 7.5 Content inventory (measured)

| Subject pack | Question files | Questions |
|---|---:|---:|
| grade4-maths | 6 | 114 |
| grade4-english | 6 | 125 |
| grade4-french | 8 | 289 |
| grade4-science | 10 | 198 |
| grade4-history | 9 | 184 |
| grade5-maths | 10 | **1027** |
| grade5-english | 8 | 158 |
| grade5-french | 10 | 358 |
| grade5-science | 8 | 172 |
| grade5-history | 12 | 241 |
| grade6-maths | 11 | 209 |
| grade6-english | 6 | 120 |
| grade6-french | 8 | 286 |
| grade6-science | 10 | 184 |
| grade6-history | 9 | 189 |
| **Total** | **131** | **≈ 3 854** |

Grade 5 Maths is ~27 % of all content and is the only pack with generators, syllabus
subsections, formula cards and video help — it is clearly the original v1 product ("MathMaster")
that the rest was built around.

**Illustrated content:** Wikimedia Commons `Special:FilePath` images embedded in question HTML
(alt text deliberately never reveals the answer), plus hand-written inline SVG maps of Mauritius
(rivers, mountains, towns, compass rose) in the Map Skills chapters of all three grades.
Any `<img>` **or inline `<svg>`** inside a question is auto-wired to a click-to-zoom lightbox
(`_makeImgsZoomable`, which serialises SVG to a data URI).

---

## 8. Feature inventory by persona

### 8.1 Student

**Practice mode** (`screen-practice`)
- Mixed-difficulty by default; parent can cap max difficulty.
- MCQ buttons, numeric input with an on-screen **number pad** (auto-shown on touch devices),
  and per-chapter **symbol keyboards** (`^ ² ³` for powers, `km m cm mm` for length, `h min s`
  for time, `kg g`, `L mL`, `m² cm²`, `°`…).
- **Symmetry grid** question type — click cells to mirror a pattern across an axis; graded with
  correct/missed/wrong colour legend.
- **3-tier progressive hints**: (1) the question's own hint, (2) first sentence of the
  explanation, (3) elimination tip for MCQ / the literal answer for numeric. Counter badge.
- Instant feedback with explanation, entrance animations (`feedback-pop` / `feedback-shake`).
- **Skip** button (counts as wrong).
- **Scratchpad**: HTML canvas, mouse + touch drawing, theme-aware stroke colour,
  placeholder text that clears on first stroke. Present on both practice and exam screens.
- **Formula card modal** (`FORMULAS[chapterId]`) and **Video help modal**
  (YouTube embed from `CHAPTER_HELP`, button disabled when no entry exists).
- **Text-to-speech** (🔊) — `SpeechSynthesisUtterance`, rate 0.88, `en-GB`, toggle to stop.
- **Report a question** → inserts into `question_reports`, surfaced in the admin panel.
- Auto-reloads a fresh 20-question set when the pool is exhausted.

**Exam mode** (`screen-exam`)
- 4 types: Quick Drill, Short Test, Full PSAC Mock, **Printable Paper**.
- Countdown timer with `timer-low` warning at 60 s and auto-submit at zero.
- Question navigation grid (unanswered / answered / flagged / current), flag-for-review,
  per-question hint, exit confirmation modal.
- **Screen wake lock** + **portrait orientation lock** during the exam, released on submit;
  wake lock re-acquired on `visibilitychange`.
- Results: banner grade (A+ → needs practice), per-chapter breakdown bars, full per-question
  review with your answer / correct answer / explanation, confetti at ≥ 80 %.
- **Share result** via Web Share API with clipboard fallback.
- **Printable paper generator**: opens a new window with a full PSAC-styled exam —
  Ministry header, name/class/index fields, instructions, Section A (30 Q × 2 marks, MCQ bubbles,
  chapter-spread algorithm, easy→hard) and Section B (10 L4 word problems × 4 marks with
  working space), running totals, `window.print()` button.

**Other student features**
- **Weak Area Drill** — finds the 3 chapters under 60 % accuracy, builds a 15-question timed drill.
- **Syllabus Browser** — expandable chapter list; for Maths shows subsections with per-subsection
  question counts and a "Practise →" button; for other subjects shows the chapter's syllabus prose.
- **Search** (see §8.6).
- **Analytics** — totals, accuracy, streak, exam count; **all subjects for the student's grade**
  (not just the active one) as collapsible per-subject → per-chapter accuracy bars;
  exam history list; JSON export of the whole `DB`.
- **Today's Study Plan** — top-of-dashboard card fed by `Calendar.renderTodayPlan()`; falls back
  to the next scheduled day if today is empty; per-entry "Practice Now" or "View Notes" button.
- **Assignments from parent** — banner with Start Now / Mark Complete.
- **Session resume** — practice/exam state is written to `localStorage` on every question render;
  a blue "Resume where you left off" banner appears on the dashboard after a refresh. Exams
  restore questions, answers, flags **and remaining time**.
- **Offline banner** driven by `online`/`offline` events.
- **Forum** access (see §8.5).

**Gamification**
- **XP**: +10 per correct answer, 10 levels (`0/100/250/500/900/1400/2000/2800/3800/5000`),
  names Beginner → Legend. Header XP bar, floating "+10 XP ✨" animation, level-up toast + confetti.
- **Combo streaks**: 2/3/4/5/7/10-in-a-row banners ("🔥🔥🔥 On fire!", "🏆 LEGENDARY!").
- **Daily streak**: consecutive-day counter with max-streak tracking.
- **13 badges** with unlock alerts (First Step, Sharp Mind, Fraction Wizard, Angle Detective,
  Speed Demon, Exam Ace, Centurion, Daily Hero, All Rounder, Money Master, Time Keeper,
  Data Scientist, Unit Converter).
- **Sound effects**: Web Audio oscillator tones for correct / wrong / combo / level-up, with mute toggle.
- **Haptics**: `navigator.vibrate` — 50 ms correct, double-buzz wrong, triple level-up.
- **Confetti**: 160-particle canvas animation.
- **Family leaderboard** in the parent dashboard (ranked by XP then accuracy, with medals).

### 8.2 Parent

Dashboard (`screen-parent`) with child cards (skeleton-loaded, then async per-card stats) and a
detail panel with **3 tabs**:

1. **Progress** — totals, accuracy, streak, badge count; per-subject collapsible progress
   (all subjects for the child's grade, chapter-by-chapter with attempt counts and %);
   family leaderboard.
2. **Assign** — create an assignment: subject → chapter → difficulty → note → "show answers"
   toggle. Writes to `student_assignments`. List with remove buttons.
3. **Controls** —
   - **Chapter locks** (per subject, collapsible, bonus chapters in their own section)
   - **Max difficulty** (radio 1–4)
   - **Exam mode** on/off
   - **Cross-grade search** on/off
   - **Cross-grade practice** on/off
   - **Daily study reminder** time picker (writes `push_subscriptions.reminder_time`, MU time)

All restrictions are written to both `DB.restrictions` (progress JSON) and
`students.settings` so they survive a re-login and apply on the next session.

Also: add/edit/delete children (max 3), avatar picker (12 emoji), change PIN,
reset a child's progress, change own password, plan banner showing current subscription,
plus **Calendar** and **Forum** access.

### 8.3 Teacher

Two *unrelated* teacher concepts coexist:

- **Supabase teacher role** — `profiles.role === 'teacher'` routes to `screen-teacher` at login.
  Accounts must be created by an admin.
- **TeacherMode PIN gate** — a header button anyone can press; sets/asks a 4-digit PIN stored in
  `localStorage` (`mathmaster_teacher`). All teacher data (assignments, results, retry grants)
  is **device-local**, never synced to Supabase.

Teacher dashboard tabs: **Create** (label, chapter checkboxes, difficulty, count, randomise,
mode = practice|test) · **Assignments** (list + copy shareable link + delete) ·
**Results** (per-student grouped attempts, score, timestamp, view per-question answers,
grant retry, delete a result).

Shareable link format: `?assign=<base64(JSON config)>`.

### 8.4 Admin / Super Admin

`screen-admin`, 7 tabs (last three super-admin only):

1. **Members** — searchable list of all `profiles`; change role (parent/teacher/admin);
   enable/disable account; inline rename; set account expiry; expand **Children** to view each
   student (username, grade, expiry) with per-student expiry editing and **Force Logout**;
   assign a **plan** (free/starter/premium × 1/3/6/12 months) which writes a subscription + a
   manual payment record.
2. **Content** — global kill switches: disable a whole **grade**, disable individual **subjects**,
   and an **open/close registrations** toggle. Persisted in `mm_data.global_settings`.
3. **Stats** — counts of users, students, families, teachers.
4. **Reports** — the 100 most recent `question_reports` with question id, excerpt, message, status.
5. **Roles** (SA) — promote/demote admins; self and other super-admins are protected.
6. **Plans** (SA) — list plans with price, max children, JSON features, and a live/draft toggle.
7. **Create** (SA) — create a **pre-activated account** via `/api/create-user`: bypasses the
   verification email, creates profile + family + subscription + payment log, generates a
   random password, and shows copyable credentials.

### 8.5 Forum (all personas)

10 categories (Announcements, General Help, Maths/English/Science/French/History Help,
Study Tips, Suggestions, Report a Problem). Features: post + reply with character counters
and limits (title 120, body 2000, reply 1000), 30 s anti-spam cooldown, sort by Latest or
Most Replied, full-text search over title+body (`ilike`), role badges (Student/Parent/
Teacher/Admin) with teacher highlighting, per-device likes (localStorage only — not persisted
server-side), author-only delete, **admin close/reopen thread**, and privacy-preserving display
names (auto-initials like "S.G." or a custom nickname).

### 8.6 Search

A dedicated fuzzy search engine over **both** questions and syllabus text:

- Three lazily-built indexes: question index (question + options + answer + hint + explanation,
  HTML-stripped, accent-folded), chapter/syllabus index (name + syllabus prose + enrichment note),
  and an autocomplete term list mined from chapter names, **capitalised proper nouns** and
  parenthetical lists in the syllabus prose.
- **Levenshtein-based fuzzy matching** with length-scaled tolerance (≥6 chars → distance 2,
  ≥4 → 1, else exact/prefix), plus an "Exact" mode toggle.
- Connector words (≤2 chars, e.g. French "de", "la") are skipped as required terms.
- Autocomplete dropdown with keyboard navigation (↑ ↓ Enter Esc) and mouse hover.
- Results split into **your grade** vs **other grades**; other-grade results are gated behind the
  parent's `crossGradeSearch` / `crossGradePractice` toggles with explanatory lock messages.
- Match highlighting with `<mark>`, subject filter dropdown grouped by grade.
- One-click **"Practise N matched questions"** → builds an ad-hoc practice session
  (`startSearchPractice`), and tapping a syllabus topic jumps straight into that chapter.

### 8.7 Calendar / study planner

Parent-facing month grid with coloured event dots and a day-detail modal
(add / edit / delete events; types: study, exam, holiday, blocked, other).

**Timetable generator**: pick start date, number of weeks, study days of the week, and
**hours-per-week per subject**; choose *mixed* (every subject every study day) or
*single subject per day* (weighted interleaved rotation). The generator:
1. loads the student's progress,
2. scores every chapter by accuracy and `examWeight` into a time "budget"
   (never attempted → biggest budget; <50 % → large; <70 % → medium; else small),
3. sorts weakest-first and fills each day's minutes from the queue (10–45 min blocks),
4. deletes previous auto-generated `study` entries and bulk-inserts in chunks of 200,
5. caches everything to `localStorage` so the student sees the plan offline.

Also: **print view** (week-by-week HTML table → `window.print()`), reset (deletes only
auto-generated study sessions, keeps manual events), and a **revision-notes modal**
rendering `chapter.notes[]` with `**bold**` / `*italic*` markdown for notes-based subjects.

---

## 9. Module interconnection map

```
                          ┌────────────┐
                          │ supabase.js│  _sb
                          └─────┬──────┘
                                │
        ┌───────────────────────┴────────────────────────┐
        │                    store.js                    │  ← ONLY file that talks to Supabase
        │  families · students · progress · assignments  │     (except calendar/forum/admin,
        │  profiles · mm_data · reports · plans · logins  │      which query _sb directly)
        └───┬───────────┬───────────┬───────────┬────────┘
            │           │           │           │
     ┌──────▼──┐  ┌─────▼────┐ ┌────▼─────┐ ┌───▼──────┐
     │ auth.js │  │  app.js  │ │ admin.js │ │teacher.js│
     └──┬───┬──┘  └──┬────┬──┘ └──────────┘ └──────────┘
        │   │        │    │
        │   │        │    └──► questions_engine.js ──► STATIC_QUESTIONS ◄── question_loader.js
        │   │        │                                                          ▲
        │   │        └──► Calendar.renderTodayPlan()                            │
        │   │                                                        registry.js (SUBJECT_PACKS)
        │   └──► QuestionLoader.loadForStudent(grade)                            ▲
        │                                                              subjects/*/_manifest.js
        └──► setupPushNotifications() ──► /.netlify/functions/push-subscribe
```

**Key call edges (who calls whom):**

| From | To | Why |
|---|---|---|
| `auth.js` `_loginStudentRow` | `Store.loadStudentProgress`, `QuestionLoader.loadForStudent`, `renderDashboard`, `updateStreak`, `updateXPBar`, `setupPushNotifications`, `Store.logLoginEvent`, `Store.getGlobalSettings` | full login fan-out |
| `app.js` `showScreen` | `TeacherMode.render`, `Forum.render`, `Calendar.render`, all `render*` | routing |
| `app.js` `renderDashboard` | `Calendar.renderTodayPlan`, `Store.loadAssignments`, `_renderResumeBanner` | dashboard composition |
| `app.js` `startChapterDirect` | `QuestionLoader.loadSubject` (awaits before starting if the pool is empty — this fixed cross-subject contamination) | correctness guard |
| `app.js` `recordAnswer` | `updateStreak`, `checkBadges`, `gainXP`, `save(DB)`, `Events.emit('answer')` | scoring |
| `app.js` `_submitTestAssignment` | `TeacherMode.saveResult` | test results |
| `app.js` `showAssignmentComplete` | `/.netlify/functions/notify` | parent email |
| `search.js` `practiceChapter` / `practiceOwn` | mutates `ACTIVE_PACK`/`SELECTED_GRADE`/`CHAPTERS`, then `startChapterDirect` / `startSearchPractice` | cross-subject jump |
| `calendar.js` `startPractice` | same global mutation + `showScreen('chapter-select')` | plan → practice |
| `app.js` `startAssignmentDirect` | same global mutation + `QuestionLoader.loadSubject` + `startChapterDirect` | assignment → practice |
| `PD.selectChild` | `Auth.pdSwitchStudent(id)` (with `bumpSession:false`) | parent views a child |
| `admin.js` `createAccount` | `/api/create-user` with the caller's JWT | privileged creation |
| `forum.js` | `_sb` directly (posts, replies, profiles for admin check) | — |
| `calendar.js` | `_sb` directly (`study_schedules`, `schedule_entries`) | — |

**Three places duplicate the "activate a subject pack" logic** (`selectSubject`,
`Calendar.startPractice`, `Search.practiceChapter`, `startAssignmentDirect`) — each mutates
`ACTIVE_PACK`, `SELECTED_GRADE` and `CHAPTERS` by hand.

---

## 10. Backend — Netlify Functions

| Function | Trigger | Auth | What it does |
|---|---|---|---|
| `questions.js` | `GET /api/questions?subject=` | Supabase JWT **or** `X-Student-Id` UUID verified against DB | Executes question `.js` files in a Node `vm` sandbox, returns JSON. Keeps source off the wire. |
| `create-user.js` | `POST /api/create-user` | Supabase JWT + `is_super_admin` check | Service-role `auth.admin.createUser` with `email_confirm:true`; creates profile, family, subscription, payment row. |
| `set-pin.js` | `POST /api/set-pin` | Parent JWT + family ownership check | scrypt-hashes a PIN into `students.pin_hash`. **Currently unused by the frontend** (auth.js uses the `set_student_pin` RPC instead). |
| `student-login.js` | `POST /api/student-login` | none (public) | scrypt PIN verify + server-side lockout + lazy plaintext→hash migration. **Currently unused by the frontend** (auth.js uses the `verify_student_pin` RPC). |
| `notify.js` | `POST` from the student's browser | `X-Student-Id` must equal body `studentId` | Emails the parent an assignment-completion summary via Resend (styled HTML). |
| `weekly-digest.js` | **Cron** `0 9 * * 0` (Sun 09:00 UTC) | service role | Per-family progress table (XP, questions, accuracy bar, streak) emailed to each parent. |
| `push-subscribe.js` | `GET`/`POST` | none | Upsert a Web Push subscription; get/set/clear `reminder_time`. |
| `push-send.js` | `POST` | `X-Service-Key` must equal the service-role key | Sends Web Push to a list of students; prunes 404/410 subscriptions. |
| `push-reminders.js` | **Cron** `*/15 * * * *` | service role | Converts UTC → Mauritius time (UTC+4), builds a ±7-minute window of `HH:MM` strings, sends "📚 Study time!" pushes. |
| `payment-webhook.js` | `POST` | **none — signature verification is a TODO stub** | Skeleton for Stripe / MCB Juice / MYT Money. Logs and returns 200. Not wired to anything. |

**netlify.toml** also sets security headers on every response: `X-Frame-Options: DENY`,
`nosniff`, `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo off), HSTS, and a **CSP**
allowing only `self` + `cdn.tailwindcss.com` + `*.supabase.co` + `accounts.google.com`
(`frame-ancestors 'none'`, `object-src 'none'`; `img-src` allows `https:` for Wikimedia).

---

## 11. PWA & offline

- `manifest.json`: standalone display, portrait-primary, SVG + 192 + 512 PNG maskable icons,
  categories education/kids.
- `sw.js` strategies:
  - **Cache-first** for the app shell (19 pre-cached files: HTML, CSS, all engine JS, icons)
  - **Stale-while-revalidate** for `/subjects/**`
  - **Network-first with cache fallback** for `/.netlify/functions/**`, `*.supabase.co`,
    and all cross-origin requests (Tailwind CDN, Wikimedia images)
  - Versioned caches (`psac-shell-v1` / `psac-data-v1`) purged on activate; `skipWaiting` + `clients.claim`
  - `push` and `notificationclick` handlers (focus existing window, else open)
- **Install UX**: `beforeinstallprompt` captured → header "📲 Install App" button (Android/desktop
  Chrome); a separate one-time bottom banner explains Share → Add to Home Screen on iOS,
  suppressed when already standalone or previously dismissed.
- VAPID public key is hard-coded in `app.js`; private key lives in Netlify env vars.

---

## 12. Security posture (as-built)

**Implemented**
- CSP + hardening headers; question source files 404'd in production.
- Student PINs bcrypt-hashed in Postgres via `SECURITY DEFINER` RPC; never returned to the client.
- Dual-layer PIN rate limiting (client 5/60 s, server 5/300 s) and account expiry.
- Session-version anti-sharing guard + admin force-logout.
- Login audit trail with IP + device fingerprint.
- Super-admin-only privileged endpoint gated by JWT + `is_super_admin` DB check.
- `notify.js` checks the `X-Student-Id` header against the body to prevent spoofed emails.
- `push-send.js` requires the service-role key as a header.
- Content protection: right-click, Ctrl+S/U/P and drag disabled; `user-select:none` on the body
  (inputs exempt). DevTools/F12 deliberately left enabled.

**Weak points visible in the code**
- **RLS is effectively off.** Almost every table has `CREATE POLICY "anon_all" … USING (true)
  WITH CHECK (true)` — `families`, `students`, `student_progress`, `student_assignments`,
  `mm_data`, `question_reports`, `subscriptions`, `payments`, `forum_*`, `study_schedules`,
  `schedule_entries`. Anyone with the publishable key (which is in `engine/supabase.js`) can read
  or write any family's students, progress, assignments, subscriptions and payments.
- `Store.createStudent` inserts the **plaintext PIN** first and only then calls the hashing RPC;
  in local-dev mode it stays plaintext.
- Two different PIN hashing schemes coexist: **bcrypt** (`pgcrypto crypt`, used) and
  **scrypt** (Netlify functions, unused).
- `payment-webhook.js` has `return true` placeholders for all three signature verifiers.
- The service-role key is used as a bearer credential in `push-send.js` (`X-Service-Key`).
- Forum likes are per-device localStorage, so like counts are cosmetic (always 0 or 1).
- Question HTML is injected via `innerHTML`; content is authored in-repo so this is
  contained, but `Calendar` note rendering and forum bodies rely on manual escaping.

---

## 13. Known gaps, dead code and inconsistencies

These are factual observations from reading the source — useful signal for a reviewer.

### 13.1 Fixed (surgical, no behaviour change beyond un-breaking the broken path)

| # | Bug | Fix |
|---|---|---|
| F1 | `defaultStore()` called by the Analytics **Reset** button but never defined → `ReferenceError`, button did nothing. | Replaced with an in-place `Object.assign(DB, …)` reset (`app.js`). Deliberately preserves `theme`, `assignments` and **`restrictions`** — a progress reset must not silently unlock chapters a parent locked. Also refreshes the header streak + XP bar. |
| F2 | `updateDiffBtns()` called at two sites but never defined → the Syllabus per-subsection **"Practise →"** button threw after rendering (skipping scratchpad init). | Replaced both calls with the real existing function `_updateDiffBadge(null)`, which renders the "🎲 Mixed" badge — the correct state for subsection practice. |
| F3 | `document.getElementById('difficulty-btns').classList` — element does not exist in `index.html` → `TypeError`. | Made it optional-chained (`?.`), matching the already-safe sibling call site. |
| F4 | `notify.js`, `weekly-digest.js`, `set-pin.js` queried `families.owner_id`; the real column is **`parent_id`** → assignment emails and the Sunday digest silently sent nothing. | Changed all five references (2 + 2 + 1) to `parent_id`. |
| F5 | `forum.js` `_author()` read `session.name`, but the session object stores **`displayName`** → every student posted as `?`. | Now reads `sess?.displayName \|\| sess?.name` (legacy fallback kept so older cached sessions still resolve). |
| F6 | `sw.js` `SHELL_FILES` omitted `engine/search.js` → search was not pre-cached and broke offline. | Added to the pre-cache list. Editing `sw.js` changes its bytes, so the browser re-runs `install` and re-populates `psac-shell-v1`; no cache-version bump needed. |
| F7 | `question_loader.js` `LOCAL_FILES` was out of sync with disk for 4 packs → 8 chapters invisible in `file://` local dev. | Added the 8 missing files. **All 15 packs now verified to match disk exactly.** Prod is unaffected (this list is only read when `location.protocol === 'file:'`). |

Verification performed: all `Module.method(...)` and bare `onclick` references in `index.html`
were re-scanned against `engine/*.js` — the only unresolved names are `Auth.saveProfile` and
`Auth.closePinModal` (see O3 below), which were left alone on purpose. `LOCAL_FILES` was
diffed against the filesystem for all 15 packs. No Node runtime is available in this
environment, so `node --check` could not be run; every edit is a single-token or
single-expression change reviewed in place.

### 13.2 Still outstanding — deliberately not fixed

**Dead / unreachable code (needs a product decision, not a patch)**

- **O1.** `TeacherMode.copyLink()` generates `?assign=<base64>` links, but **no code parses
  `location.search`** → `screen-assignment`, `renderAssignmentEntrance()` and
  `startAssignmentPractice()` are unreachable. The entire teacher-assignment student flow
  (test mode, retry grants, and the `notify.js` parent email it would trigger) is dead.
  Wiring this up is a *feature*, not a bug fix — it would activate untested code paths.
- **O2.** `netlify.toml` exposes `/api/student-login` and `/api/set-pin`, but `auth.js` calls the
  Supabase RPCs directly — both functions are orphaned, and they use **scrypt** while the live
  RPCs use **bcrypt**. Deleting or adopting one scheme is an auth change; too risky mid-test-cycle.
- **O3.** `#profile-modal` and `#pin-modal` in `index.html` are v1 leftovers that nothing ever
  opens (`Auth.saveProfile`, `Auth.closePinModal`, `Auth.submitPin` do not exist). Harmless dead
  markup; removing it is cosmetic cleanup.
- **O4.** `Auth.resetProgress()` and `Store._defaultStudent()` disagree on the default theme
  (`'light'` vs `'dark'`). Cosmetic; changing it could shift test expectations.

**Architectural debt**
- **A1.** `ARCHITECTURE.md` still documents the v1 "MathMaster" single-subject app (localStorage-only,
   no Supabase, no multi-grade). It is misleading.
- **A2.** `app.js` is 3 032 lines and mixes routing, rendering, practice engine, exam engine,
    gamification, audio, PWA install, push registration, the parent dashboard controller (`PD`),
    printing and reporting.
- **A3.** `CHAPTERS` / `BADGES` / `SYLLABUS` / `FORMULAS` / `GENERATORS` / `CHAPTER_HELP` all live in
    the Grade 5 Maths manifest and are mutated globally — a structural coupling that makes
    per-subject badges, syllabus subsections, formula cards and video help impossible for the
    other 14 packs.
- **A4.** Subject-pack activation logic is duplicated in four places.
- **A5.** `question_loader.js` keeps a hand-maintained `LOCAL_FILES` list that must be updated for
    every new question file (prod auto-discovers). It had drifted out of sync for 4 packs
    (now corrected — see F7), but the underlying duplication remains: the list will drift again
    on the next question file added. It could be generated at build time or removed by serving
    local dev through `netlify dev`.
- **A6.** Teacher data (assignments, results, retries) is **localStorage-only** — a teacher loses
    everything on a new device or cleared cache, and cannot see submissions from students on
    other devices.
- **A7.** `sw.js` `SHELL_FILES` is hand-maintained and had drifted (missing `engine/search.js`, now
    added — see F6). `cache.addAll` is all-or-nothing: one 404 in that list silently kills the
    entire offline shell, so the list is a standing fragility.
- **A8.** Cache invalidation: questions are cached for 7 days in `localStorage` and the SW cache is
    pinned to `v1` — content fixes can take a week to reach an installed user.
- **A9.** No build step, no tests, no linting, no CI. No `.env.example` documenting the ~8 required
    Netlify env vars.

**Product gaps (explicitly listed as pending in CLAUDE.md, verified against source)**
- **P1.** `push-send.js` exists but nothing calls it — assignment/homework push notifications are
    not wired up.
- **P2.** Badge API (app-icon badge count) not implemented.
- **P3.** Maths chapters have no illustrated questions (shapes, graphs, geometry diagrams).
- **P4.** No enrichment chapters for Maths / English / French.
- **P5.** Payment collection is manual-only (admin activates a plan); no live provider.
- **P6.** Plans exist and are enforced nowhere — `max_children` is hard-coded to 3 in `Auth.addStudent`,
    and no feature is actually gated by `plan_id`.

---

## 14. Suggested angles for the reviewing AI

Areas where an outside opinion would be most valuable:

1. **Data protection** — how to move from `anon_all` RLS to real per-family policies without
   breaking the PIN-based (non-Supabase-Auth) student session model.
2. **Decomposing `app.js`** — a pragmatic module split that keeps the no-build, no-framework
   constraint.
3. **De-globalising subject packs** — making badges, syllabus, formulas, generators and video
   help per-pack instead of Maths-only.
4. **Pedagogy** — spaced repetition / mistake re-queueing, adaptive difficulty (currently
   difficulty is either fixed or uniformly random), and using the existing `examWeight` +
   accuracy data for smarter question selection.
5. **Content scale** — Grade 5 Maths has 1 027 questions; several packs have ~120. Strategies for
   authoring, validating and de-duplicating question banks at scale.
6. **Teacher mode** — migrating it to Supabase so it works across devices, and finishing (or
   removing) the dead `?assign=` link flow.
7. **Offline/caching strategy** — reconciling the 7-day question cache, the versioned SW cache,
   and the need to ship content fixes quickly.
8. **Monetisation** — plans/subscriptions/payments tables exist but nothing is gated; the
   webhook is a stub with disabled signature checks.
9. **Engagement** — the gamification layer is rich (XP, combos, streaks, badges, confetti,
   haptics, sound) but the leaderboard is family-only and likes are per-device.
10. **Quality gates** — every bug in §13.1 (undefined functions, a wrong column name, a wrong
    property name) would have been caught by a linter or a smoke test. What minimal tooling
    fits a no-build vanilla project?

---

---

## 15. Live database verification

Probed against the production Supabase project using **only the publishable (anon) key that ships
in `engine/supabase.js`** — i.e. the access any visitor already has. Read-only, `limit=0`
(row counts from `Content-Range` headers only); no rows, names or progress data were fetched,
and no write was attempted.

**Confirmed correct**
- `families.parent_id` exists; `families.owner_id` does **not** → validates fix **F4**.
- `students.pin` and `students.pin_hash` both exist.
- RPC `verify_student_pin` is live and returns `invalid_credentials`.

**V1 — `push_subscriptions` table does not exist.** The entire push stack is inert in production:
`push-subscribe` errors, the `*/15 * * * *` reminder cron matches nothing, and the parent
"Daily Study Reminder" picker silently fails. (This is pending item 1 in `CLAUDE.md` — the
one-time SQL was never run.) Fixing it is one `supabase-push-table.sql` execution.

**V2 — RLS is open, verified live.** Using only the public anon key, these row counts were
readable without any login:

| Table | Rows readable by anon |
|---|---|
| `families` | 2 |
| `students` | 3 |
| `student_progress` | 3 |
| `student_assignments` | 1 |
| `login_events` | 47 |
| `forum_posts` | 9 |
| `payments` | 1 |
| `subscriptions` | 1 |
| `mm_data` | 2 |
| `profiles` | **0 — correctly blocked** |

`profiles` is the only table whose policy (`user_owns`, `auth.uid() = id`) actually restricts
access; it is the model the other tables should follow. Because the remaining policies are
`FOR ALL … WITH CHECK (true)`, **writes are permitted as well** (not tested). Practical impact:
any visitor can enumerate children's usernames, display names and grades, overwrite their
progress, or tamper with `subscriptions` / `payments`.
Note also that `login_events` is anon-**readable** (IP addresses, user agents, device
fingerprints) despite `DB_RESTORE_REFERENCE.txt` documenting it as INSERT-only — the deployed
policy is more permissive than the checked-in one.

**V3 — repo SQL has drifted from production.**
- All three `plans` rows are `is_active: false`, including `free`.
- `free.max_children` is `1`, but `Auth.addStudent()` hard-codes a limit of 3.
- Prices are 299 / 499 MUR; `supabase-db-patch.sql` says 150 / 350.
- Deployed `verify_student_pin` returns `invalid_credentials`; the repo copy returns
  `'User not found'` — a username-enumeration leak. **Production is newer and safer than the
  repo file**, so `supabase-db-patch.sql` must not be re-run blindly over it.

**V4 — column *types* have drifted too, not just policies.** Determined by PostgREST cast
probes (filtering a uuid column by a non-uuid literal raises `22P02`; a text column returns `[]`):

| Column | Documented in `DB_RESTORE_REFERENCE.txt` | Actual |
|---|---|---|
| `students.id` | UUID | UUID ✓ |
| `student_progress.student_id` | TEXT | TEXT ✓ |
| **`student_assignments.student_id`** | **UUID** | **TEXT** ✗ |
| `study_schedules.student_id` | TEXT | TEXT ✓ |
| `schedule_entries.student_id` | TEXT | TEXT ✓ |
| **`question_reports.student_id`** | **TEXT** | **UUID** ✗ |
| `login_events.user_id` | TEXT | TEXT ✓ |
| `families.parent_id` | UUID | UUID ✓ |

Two consequences beyond the RLS work:
- `student_assignments.student_id` is TEXT, so the documented
  `REFERENCES public.students(id)` foreign key **cannot exist** (a TEXT column cannot reference
  a UUID primary key). Deleting a student therefore leaves orphaned assignment rows rather than
  cascading. Same applies to `study_schedules` / `schedule_entries`.
- Any RLS policy or join comparing these columns to a UUID fails with
  `operator does not exist: text = uuid`. `supabase-rls-migration.sql` normalises both sides
  with `::text` for this reason.

Consequence: the SQL files in this repo are **not** a reliable source of truth for the live
schema — neither for policies nor for column types. A `pg_dump --schema-only` checked into the
repo would fix that, and is a prerequisite for trusting any future migration.

---

*Generated by reading every engine file, every Netlify function, the SQL schema reference,
`index.html`, `netlify.toml`, `sw.js` and all 15 subject manifests.*
*§13.1 records fixes applied to the codebase; §15 records checks made against the live
database; everything else describes the system as-is.*
