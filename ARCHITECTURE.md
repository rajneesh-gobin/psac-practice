# MathMaster — Architecture Overview

## File Structure

```
shanvi/
├── index.html                  # Single-page app shell — all screens, modals, script tags
├── style.css                   # Custom CSS (Tailwind CDN handles utilities)
│
├── engine/                     # Core infrastructure — subject-agnostic
│   ├── helpers.js              # rnd, shuffle, fmt, makeMCQ, makeNum, makeSymmetry
│   ├── questions_engine.js     # STATIC_QUESTIONS[], getQuestionsForChapter(), assembleExamPaper()
│   ├── registry.js             # SUBJECT_PACKS[], registerSubject()
│   ├── events.js               # Events bus — on/off/emit
│   ├── store.js                # Store IIFE — localStorage adapter (key: mathmaster_g5)
│   ├── app.js                  # All UI logic, screen routing, gamification, XP
│   └── auth.js                 # Auth IIFE — child profile setup, parent PIN, dashboard
│
└── subjects/
    └── grade5-maths/
        ├── _manifest.js        # CHAPTERS, SYLLABUS, FORMULAS, BADGES, GENERATORS
        │                       # + registerSubject({id, name, grade, icon, ...}) call at bottom
        ├── help.js             # CHAPTER_HELP — YouTube video IDs + concept bullets per chapter
        └── questions/
            ├── core.js         # Base questions for all 18 chapters
            ├── questions_extra.js
            ├── questions_wordproblems.js
            ├── questions_examstyle.js
            ├── questions_diverse.js
            ├── questions_conversions.js
            ├── questions_audit.js
            ├── questions_subsections.js
            ├── questions_challenge.js
            └── questions_challenge2.js
```

## Script Load Order (index.html)

```
engine/helpers.js           ← globals: rnd, shuffle, fmt, makeMCQ, makeNum, makeSymmetry
engine/questions_engine.js  ← globals: STATIC_QUESTIONS[], getQuestionsForChapter(), ...
engine/registry.js          ← globals: SUBJECT_PACKS[], registerSubject()
engine/events.js            ← globals: Events
engine/store.js             ← globals: Store
subjects/grade5-maths/_manifest.js   ← globals: CHAPTERS, SYLLABUS, FORMULAS, BADGES, GENERATORS
subjects/grade5-maths/help.js        ← globals: CHAPTER_HELP
subjects/grade5-maths/questions/*    ← each file pushes into STATIC_QUESTIONS
engine/app.js               ← UI logic, reads all globals above
engine/auth.js              ← Auth IIFE, reads DB/save()/showScreen() from app.js
```

**Rule**: files lower in the list may read globals from files higher up, never the reverse.

## Data Flow

```
localStorage (key: mathmaster_g5)
      ↕ Store.load() / Store.save()
      DB (let in app.js — mutated in place, never reassigned)
      ↕ save(DB) calls Store.save(DB)
      Auth.resetProgress() uses Object.assign(DB, fresh) to mutate in place
```

## XP & Levels

| Level | Name       | XP Required |
|-------|-----------|-------------|
| 1     | Beginner   | 0           |
| 2     | Explorer   | 100         |
| 3     | Learner    | 250         |
| 4     | Practiser  | 500         |
| 5     | Achiever   | 900         |
| 6     | Expert     | 1400        |
| 7     | Champion   | 2000        |
| 8     | Master     | 2800        |
| 9     | Genius     | 3800        |
| 10    | Legend     | 5000        |

+10 XP per correct answer. Level-up triggers confetti + toast.

## Adding a New Subject Pack

See `CONTRIBUTING.md`.

## Multi-student Storage Layout

```
localStorage keys
├── mathmaster_accounts   → [{id, name, avatar}, ...]  (accounts list)
├── mathmaster_pin        → "1234"  (parent PIN — app-wide)
├── mathmaster_s_{id}     → per-student data (stats, chapters, xp, badges, theme)
└── mathmaster_g5         → legacy v1 key (auto-migrated on first load)
```

- `ACTIVE_STUDENT_ID` (let in app.js) tracks the logged-in student.
- `DB` (let in app.js) holds the active student's data in memory.
- `Auth.loginStudent(id)` loads a student: sets `ACTIVE_STUDENT_ID`, `DB`, and re-renders.

## Content Protection

`engine/protect.js` (loads first):
- Disables right-click context menu
- Blocks Ctrl+S, Ctrl+U, Ctrl+A, Ctrl+P, F12, Ctrl+Shift+I/J/C
- Disables drag-start

`style.css`:
- `body { user-select: none }` — no text selection on UI
- inputs/textareas are exempted

## Migrating to a Backend

Only `engine/store.js` needs to change. Swap `Store.getAccounts()`, `Store.loadStudent()`,
`Store.saveStudent()` etc. to call an API instead of localStorage. The rest of the engine is unchanged.
