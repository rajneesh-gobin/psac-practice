# PSAC Exam Practice — Architecture

Vanilla-JS single-page app for Mauritian primary students (PSAC revision).
Grades 4–6 × 5 subjects = **15 subject packs**, ~3,850 questions.
Static site on **Netlify**, data in **Supabase** (Postgres + Auth + RPC).
No frontend framework, no bundler, no build step.

> For a full system description — feature inventory, verified DB state, known
> gaps — see **PROJECT_OVERVIEW.md**. This file covers structure and invariants.

---

## File structure

```
psac-practice/
├── index.html            All ~24 screens as hidden divs + all modals + script tags
├── style.css             Custom CSS on top of Tailwind (CDN)
├── sw.js                 Service worker (cache-first shell, SWR questions, network-first API)
├── manifest.json         PWA manifest
├── netlify.toml          Build, CSP/security headers, cron schedules, /api redirects
│
├── engine/               Subject-agnostic core. Load order matters — see below.
│   ├── supabase.js       _sb client singleton
│   ├── protect.js        Right-click / Ctrl+S/U/P / drag suppression
│   ├── helpers.js        rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry
│   ├── questions_engine.js  STATIC_QUESTIONS[], getQuestionsForChapter(), assembleExamPaper()
│   ├── registry.js       SUBJECT_PACKS[], registerSubject()
│   ├── events.js         Events bus (on/off/emit)
│   ├── store.js          ALL Supabase + localStorage data access
│   ├── question_loader.js  Questions via Netlify function (prod) or <script> (file://)
│   ├── app.js            UI, routing, practice + exam engines, gamification, parent dashboard
│   ├── auth.js           Auth flows, family/student CRUD, session guard. Boots the app.
│   ├── admin.js          Admin panel
│   ├── teacher.js        Teacher mode
│   ├── forum.js          Community forum
│   ├── calendar.js       Study timetable generator
│   ├── search.js         Fuzzy question/syllabus search
│   └── classroom.js      Classrooms & enrollments data layer
│
├── subjects/<grade>-<subject>/
│   ├── _manifest.js      registerSubject({ id, grade, chapters: [...] })
│   └── questions/*.js    STATIC_QUESTIONS.push(makeMCQ({...}))
│
├── netlify/functions/    8 serverless functions (2 on cron)
└── supabase-*.sql        Schema + RLS migrations
```

---

## Script load order (bottom of index.html)

```
supabase-js (CDN)
  → supabase.js → protect.js → helpers.js → questions_engine.js
  → registry.js → events.js → store.js
  → 15 × subjects/*/_manifest.js
  → subjects/grade5-maths/help.js
  → question_loader.js
  → app.js → auth.js        (auth.js calls Auth.init() and boots everything)
  → teacher.js → admin.js → forum.js → calendar.js → search.js → classroom.js
```

**Rule:** a file may read globals declared above it, never below.

---

## Key globals

| Global | Declared in | Notes |
|---|---|---|
| `_sb` | supabase.js | Supabase client (publishable key) |
| `STATIC_QUESTIONS` | questions_engine.js | Every loaded question, flat |
| `SUBJECT_PACKS` | registry.js | All 15 packs |
| `CHAPTERS` | **grade5-maths/_manifest.js** | Chapters of the *active* subject |
| `SYLLABUS`, `FORMULAS`, `BADGES`, `GENERATORS` | **grade5-maths/_manifest.js** | Maths-only, but global |
| `CHAPTER_HELP` | grade5-maths/help.js | Video help — maths-only |
| `DB` | app.js | Active student's progress |
| `S` | app.js | `S.practice`, `S.exam`, `S.currentScreen` |
| `ACTIVE_PACK`, `SELECTED_GRADE`, `ACTIVE_STUDENT_ID` | app.js | Active context |

### Invariant 1 — `DB` is mutated, never reassigned
Other modules hold a reference to it. Use `Object.assign(DB, next)`.

### Invariant 2 — `CHAPTERS` is mutated, never reassigned
Same reason. Use **`activateSubjectPack(packId)`** (app.js) — the single
function that sets `ACTIVE_PACK` + `SELECTED_GRADE` and syncs `CHAPTERS` in
place. Called from `selectSubject()`, `startAssignment()`,
`startAssignmentDirect()`, `Calendar.startPractice()` and
`Search.practiceChapter()`. Do not hand-roll those three assignments again.

### Known coupling
`CHAPTERS`, `BADGES`, `SYLLABUS`, `FORMULAS`, `GENERATORS` and `CHAPTER_HELP`
are all declared inside the **Grade 5 Maths** manifest, because that pack was
the original single-subject v1. Consequences: badges are Maths-themed but
awarded across all subjects; syllabus subsections, formula cards, video help and
dynamic generators exist only for Grade 5 Maths.

---

## Data flow

```
Supabase (source of truth)
   ↕  Store.*            ← the only module that talks to the DB (plus
   ↕                       calendar.js, forum.js, admin.js, classroom.js,
   ↕                       which query _sb directly)
localStorage (cache)
   ↕  Store.saveStudentProgress()  writes localStorage immediately,
                                   pushes to Supabase in the background
   DB (in-memory, mutated in place)
```

Writes are local-first so practice never blocks on the network; the Supabase
upsert is fire-and-forget.

---

## Auth model — four paths

| Persona | Mechanism |
|---|---|
| Parent | Supabase Auth (email/password or Google). No `profiles` row → family-setup screen. |
| Teacher | Supabase Auth, `profiles.role='teacher'`. Created by an admin; cannot self-register. |
| Admin / Super admin | Supabase Auth, `profiles.role='admin'` (+ `is_super_admin`). |
| **Student** | **Not a Supabase Auth user.** `username` + 4-digit PIN → `verify_student_pin()` RPC. |

### Student sessions and RLS
Students have no `auth.uid()`, so RLS cannot key off it. Instead
`verify_student_pin()` mints an opaque token, stores only its SHA-256 hash in
`student_sessions`, and returns it. The client sends it back as the
**`x-student-token`** header; `current_student_id()` resolves it inside the
database, letting policies read `student_id = current_student_id()`.

**PINs are bcrypt-hashed inside Postgres** (`set_student_pin()` RPC, pgcrypto
`crypt()`). There is exactly one hashing scheme and no plaintext path in any
environment. `students.pin` / `students.pin_hash` are not readable by
`anon`/`authenticated` — never `select('*')` on `students`.

---

## Question pipeline

```
Production:  QuestionLoader.loadSubject(id)
               → localStorage cache mm_qc_<id> (7-day TTL), else
               → GET /.netlify/functions/questions?subject=<id>
                   (auth: Supabase JWT, or X-Student-Id)
               → function executes subjects/<id>/questions/*.js in a Node vm
                 sandbox and returns JSON — raw source never reaches the browser
Local file:// → injects <script> tags from LOCAL_FILES (hand-maintained, drifts)
```

Prefer **`netlify dev`** for local work: it serves the same auto-discovering
function as production and bypasses `LOCAL_FILES` entirely.

---

## Adding things

**A new engine module** — create `engine/x.js`, add a `<script>` tag in
index.html *and* an entry in `sw.js` `SHELL_FILES` in the same commit.
`cache.addAll()` is all-or-nothing: one missing file kills the whole offline shell.

**A new subject pack** — see `CONTRIBUTING.md`.

**A new question file** — drop it in `subjects/<id>/questions/`. Production
auto-discovers it; add it to `LOCAL_FILES` too if you use `file://`.

---

## Database

16+ tables. Full schema and verified drift notes in **PROJECT_OVERVIEW.md** §5
and §15. Migrations, in run order:

1. `supabase-rls-migration.sql` — RLS lockdown, student sessions
2. `supabase-hotfix-pin-exposure.sql` — bcrypt existing PINs, fix column grants
3. `supabase-classrooms-migration.sql` — classrooms, enrollments, submissions

⚠ `DB_RESTORE_REFERENCE.txt` and `supabase-db-patch.sql` have **drifted from
production** — wrong column names and types in places, and an older
`verify_student_pin`. Do not treat them as the source of truth; take a
`pg_dump --schema-only` instead.
