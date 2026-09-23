# Redesigning the teacher experience

**Written 2026-09-23**, after the person who built this app said they cannot use
the classroom section properly. That is the most serious usability signal this
project has produced, and it is worth writing down why it happened rather than
going straight to new screens.

⚠ **Everything in the "What is actually there" section was measured on
2026-09-23** — counted from `index.html`, `engine/teacher*.js` and the live
database, not recalled. Re-measure before trusting it; the whole point of this
document is that the structure drifted without anyone re-counting.

---

## 1. What is actually there

### The teacher board — 11 destinations, 6 of them visible

`TeacherMode.switchTab()` accepts **11** tab names (`engine/teacher.js:14-29`):

| group | tabs |
|---|---|
| `MAIN_TABS` | `home` |
| `DETAIL_TABS` | `create`, `results` |
| `TOOL_TABS` | `materials`, `messages`, `gradebook`, `assignments`, `papers`, `preview`, `library`, `settings` |

Six appear in the tab strip: **🏫 My classes · 📋 Marks book · 📂 My files ·
📦 Past work · 📝 Test papers · 📚 Past Exam Papers**.

### The classroom — a modal dialog containing a second tabbed app

`#tc-classroom-detail` is `role="dialog" aria-modal="true"`
(`index.html:5075`). Inside it is its own `role="tablist"` with **five buttons
plus a ⋯ More menu**: Dashboard · Activities · Pupils · Resources · Calendar ·
⋯ Settings — and `results` as a seventh section reachable from within.

Section sizes, `engine/teacher_classroom_detail.js` (2,444 lines total):

| section | lines |
|---|---|
| `_renderPupils` | 601 |
| `_renderMaterials` | 494 |
| `_renderWork` | 452 |
| `_renderSettings` | 283 |
| `_renderCalendar` | 130 |
| `_renderOverview` | 121 |
| `_renderResults` | 58 |

So: **18 places**, arranged as a 6-tab board with a 7-section modal on top.

---

## 2. Three structural faults, in the order they hurt

### Fault 1 — the classroom cannot reach the library, and the library is where the papers are

This is the reported complaint, and it is structural rather than cosmetic.

`Library.canShareToClass()` returns true only when `_target ===
'tc-library-body'` (`engine/library.js:791`) — the **board** tab. The classroom
overlay mounts no library at all: `grep 'Library\.' teacher_classroom_detail.js`
finds only the link helper added on 2026-09-23. So a teacher standing in the
class they are planning for must **close the class**, cross the board to a
different tab, find the paper, and assign it from there — choosing the class
again from a list, having just been inside it.

The Assign sheet built on 2026-09-23 made that possible in ~9 interactions. It
did not make it *sensible*. The fault is that **a source lives at board level
while the work lives at class level**, so every "give this class that" crosses a
boundary.

### Fault 2 — the same noun means two things, and the app already knows it

`engine/teacher.js:14-18` carries this comment, written before today:

> ⚠ ONE main destination. `create` and `results` are still real tabs and
> `switchTab()` still opens them — they are simply not somewhere a teacher
> PICKS, because the same two jobs also live inside every classroom and **a
> teacher could not tell the two "Results" apart.**

That was the right diagnosis and it was applied to exactly two tabs. The same
collision is still shipping elsewhere:

| board says | classroom says | both read |
|---|---|---|
| 📂 My files | 📁 Resources | `learning_materials` |
| 📋 Marks book | (Results) | per-class submissions |
| 📦 Past work | 📋 Activities | `guest_assignments` |

A teacher has to hold "which level am I on" in their head to predict what a tab
will show. That is the specific feeling of *not being able to use it properly*.

### Fault 3 — dated things are split across two sections that already merge

`_renderCalendar()` (line 1975) builds its list by merging **class events**,
**homework due dates** and **worksheet deadlines** into one sorted timeline.
`_renderWork()` (line 428) shows the same homework and worksheets, undated.

So the merge already exists, in one of the two sections. The split is
presentational only — and it means "what is my class doing on Friday" and "what
have I set" are different screens showing overlapping subsets of one list.

### Smaller, but telling

Two user-visible strings send a teacher to a tab that has not existed since the
classroom list moved onto Home:

- `teacher.js:1320` — *"create one in the Classrooms tab first"*
- `teacher.js:1980` — *"No classrooms yet. Create one in the Classrooms tab."*

`grep -c 'data-tab="classes"' index.html` → **0**. Nobody re-read the copy after
the structure moved, which is the same drift as everything above.

---

## 3. The model to design to

> **A teacher does not have tasks. A teacher has classes.**
> Every real job is *for a class*: set them work, see who did it, give them a
> file, tell them about Friday. The app should make the class the place you
> stand, and everything else a source you draw from without leaving.

Two consequences, and they settle most of the detail:

1. **The class is a screen, not a dialog.** A modal is the right shape for a
   decision you finish and dismiss. It is the wrong shape for the place you
   spend the whole session. A dialog also cannot own history, so Back does not
   walk it.
2. **Sources come to the class.** The library, your own files, the paper builder
   — none of these is a destination. They are pickers, opened from the one place
   you need them.

---

## 4. The target shape

**Board — three destinations**

| | |
|---|---|
| 🏫 **My classes** | the list, and the only place you start |
| 📚 **Library** | one shelf: public past papers *and* your own files, filtered by owner |
| ⚙️ **Account** | approval, tier, settings |

Everything else becomes either a class section or a picker.

**Class — four sections and an overflow**

| | replaces | |
|---|---|---|
| 🏠 **Today** | Dashboard | what needs marking, what is due, who is stuck |
| 📅 **Work** | Activities **+** Calendar | one timeline of everything dated. **Set work** lives here |
| 👥 **Pupils** | Pupils | roster, PINs, the join link |
| 📊 **Marks** | Results | this class's marks; the board's Marks book becomes "all classes" |
| ⋯ | Settings, Resources | Resources folds into Work as "files I gave them" |

**One Set work button, one sheet, four sources**

Inside **Work**, a single primary action opens a sheet that asks *what* before
it asks anything else:

```
Set work for Grade 6 Maths
  ○ A past paper        → the library, filtered to this class's grade
  ○ One of my files     → my uploads
  ○ Questions from the app → the existing question-set builder
  ○ A paper worksheet   → upload/describe, with a deadline
then: when?  [Today] [Tomorrow] [Pick a day]     and a note
```

This is the direct answer to the reported complaint. The teacher never leaves the
class, never re-picks the class, and the four things they might set are offered
side by side instead of living in four different tabs.

⚠ **The source picker must default to this class's grade.** Today the library
opens on whatever shelf was last viewed, which for a Grade 6 teacher means
scrolling past eight grades every time.

---

## 5. Staging — five shippable steps, in value order

Each stage stands alone and is worth shipping on its own. **None of them is a
rewrite**, which matters: `teacher_classroom_detail.js` is 2,444 lines and
`_renderPupils` alone is 601. A single-pass rewrite of this file is how the
classroom gets worse before it gets better.

### Stage 1 — ✅ DONE 2026-09-23 — a past paper, set from inside the class
Add the **Set work** sheet to the classroom's Work section, with the library as a
source, defaulted to the class's grade. Reuse `Library` — mount it into a picker
target and let `canShareToClass()` answer true there too.
⚠ **The shell for this already existed and the plan had not noticed.**
`showHomeworkChoice()` was already the front door, offering three sources —
questions on screen, a worksheet, a resource. What was missing was the fourth,
and the Resource card’s own copy said *“a file, video, website or past
paper”*, which is how a teacher ended up in a file list hunting for one. So
Stage 1 became **one more card**, not a new sheet: no parallel flow, no second
front door.

What shipped:
- A fourth card, **“A past exam paper”**, opening a two-step panel inside the
  class: pick from a real shelf, then pick the day.
- `Library.openPicker({hostId, grade, forLabel, onPick})` — picker mode. Cards
  show **Choose this paper** *instead of* Assign/Share/Report, and the cover
  stays a link so the paper can be read before it is set.
- The shelf **opens on the class’s own grade** (`_classGrade`).
- `Library.setForClass()` — one shared write (material + dated `kind='due'`
  event). The Assign sheet’s class branch now delegates to it rather than
  keeping a copy.

⚠ **Picker mode borrows module state and hands it back.** `_target`,
`_openShelf`, `_query` and the three filters are one shared browsing position;
not restoring them left the teacher’s own Past Exam Papers tab filtered to a
class’s grade with nothing on screen explaining why. `closePicker()` restores
all seven, and the browser test types a search, round-trips a picker and checks
the search survives.

⚠ **The shelf is bounded and scrolls itself** (`max-height:52vh`). Unbounded, the
panel grows to the height of the whole library and the Choose buttons sit below
the fold of a dialog that cannot be scrolled to.

*Touched:* `teacher_classroom_detail.js`, `library.js`, `style.css`.
*Did not touch:* any board tab, any table, any migration.

Test: `scripts/test-set-paper-in-class.js` — 24 checks in real Chrome at
390×844. The one that matters: **the class is never chosen twice** (zero
selects or checkboxes in the whole flow).

### Stage 2 — ✅ DONE 2026-09-23 — one timeline

Activities and Calendar are one **Work** section. The nav went 6 → 5.

⚠ **The rich cards were the whole difficulty.** The calendar rendered
activities with `_dueRow()` — a title, a date, and the words *“set on the
activity”* where the buttons would be. Share, Results and Archive come from
`TeacherWorkspace.drawCards()`, which **owns its container and wires handlers by
INDEX** into the array it was given, so its cards cannot be interleaved as HTML
strings. Each day now gets its own container and its own `drawCards()` call. The
test clicks Results and asserts `onclick` is a function, not merely that a
button is drawn.

⚠ **“Not yet dated” is not a group, because it cannot happen.** This plan
assumed undated work existed. Measured: `guest_assignments.expires_at` and
`physical_homework.expires_at` are both NOT NULL. A permanently empty heading is
dead furniture, so the undated branch renders only if a row really arrives
without a date — better than the old `_dueRow()`, which returned '' and made
such a row vanish silently.

**Two real bugs fell out of the merge:**

⚠⚠ **A day heading could contradict the card under it.** `_dueRow()` keyed on
`due_at || expires_at`; every card prints **expires_at** as “Due” and “Closes”,
and status is computed from it. Grouping now uses `expires_at` too. Measured
first: of 8 live assignments 4 carry `due_at` and in **zero** does its date
differ — `teacher.js` derives `p_expires_hours` FROM the due date — so this is a
correctness fix with no visible change to existing data.

⚠⚠ **`_calendarDateKey()` filed timestamps on their UTC day.** The regex
`/^d{4}-d{2}-d{2}/` had no `# Redesigning the teacher experience

**Written 2026-09-23**, after the person who built this app said they cannot use
the classroom section properly. That is the most serious usability signal this
project has produced, and it is worth writing down why it happened rather than
going straight to new screens.

⚠ **Everything in the "What is actually there" section was measured on
2026-09-23** — counted from `index.html`, `engine/teacher*.js` and the live
database, not recalled. Re-measure before trusting it; the whole point of this
document is that the structure drifted without anyone re-counting.

---

## 1. What is actually there

### The teacher board — 11 destinations, 6 of them visible

`TeacherMode.switchTab()` accepts **11** tab names (`engine/teacher.js:14-29`):

| group | tabs |
|---|---|
| `MAIN_TABS` | `home` |
| `DETAIL_TABS` | `create`, `results` |
| `TOOL_TABS` | `materials`, `messages`, `gradebook`, `assignments`, `papers`, `preview`, `library`, `settings` |

Six appear in the tab strip: **🏫 My classes · 📋 Marks book · 📂 My files ·
📦 Past work · 📝 Test papers · 📚 Past Exam Papers**.

### The classroom — a modal dialog containing a second tabbed app

`#tc-classroom-detail` is `role="dialog" aria-modal="true"`
(`index.html:5075`). Inside it is its own `role="tablist"` with **five buttons
plus a ⋯ More menu**: Dashboard · Activities · Pupils · Resources · Calendar ·
⋯ Settings — and `results` as a seventh section reachable from within.

Section sizes, `engine/teacher_classroom_detail.js` (2,444 lines total):

| section | lines |
|---|---|
| `_renderPupils` | 601 |
| `_renderMaterials` | 494 |
| `_renderWork` | 452 |
| `_renderSettings` | 283 |
| `_renderCalendar` | 130 |
| `_renderOverview` | 121 |
| `_renderResults` | 58 |

So: **18 places**, arranged as a 6-tab board with a 7-section modal on top.

---

## 2. Three structural faults, in the order they hurt

### Fault 1 — the classroom cannot reach the library, and the library is where the papers are

This is the reported complaint, and it is structural rather than cosmetic.

`Library.canShareToClass()` returns true only when `_target ===
'tc-library-body'` (`engine/library.js:791`) — the **board** tab. The classroom
overlay mounts no library at all: `grep 'Library\.' teacher_classroom_detail.js`
finds only the link helper added on 2026-09-23. So a teacher standing in the
class they are planning for must **close the class**, cross the board to a
different tab, find the paper, and assign it from there — choosing the class
again from a list, having just been inside it.

The Assign sheet built on 2026-09-23 made that possible in ~9 interactions. It
did not make it *sensible*. The fault is that **a source lives at board level
while the work lives at class level**, so every "give this class that" crosses a
boundary.

### Fault 2 — the same noun means two things, and the app already knows it

`engine/teacher.js:14-18` carries this comment, written before today:

> ⚠ ONE main destination. `create` and `results` are still real tabs and
> `switchTab()` still opens them — they are simply not somewhere a teacher
> PICKS, because the same two jobs also live inside every classroom and **a
> teacher could not tell the two "Results" apart.**

That was the right diagnosis and it was applied to exactly two tabs. The same
collision is still shipping elsewhere:

| board says | classroom says | both read |
|---|---|---|
| 📂 My files | 📁 Resources | `learning_materials` |
| 📋 Marks book | (Results) | per-class submissions |
| 📦 Past work | 📋 Activities | `guest_assignments` |

A teacher has to hold "which level am I on" in their head to predict what a tab
will show. That is the specific feeling of *not being able to use it properly*.

### Fault 3 — dated things are split across two sections that already merge

`_renderCalendar()` (line 1975) builds its list by merging **class events**,
**homework due dates** and **worksheet deadlines** into one sorted timeline.
`_renderWork()` (line 428) shows the same homework and worksheets, undated.

So the merge already exists, in one of the two sections. The split is
presentational only — and it means "what is my class doing on Friday" and "what
have I set" are different screens showing overlapping subsets of one list.

### Smaller, but telling

Two user-visible strings send a teacher to a tab that has not existed since the
classroom list moved onto Home:

- `teacher.js:1320` — *"create one in the Classrooms tab first"*
- `teacher.js:1980` — *"No classrooms yet. Create one in the Classrooms tab."*

`grep -c 'data-tab="classes"' index.html` → **0**. Nobody re-read the copy after
the structure moved, which is the same drift as everything above.

---

## 3. The model to design to

> **A teacher does not have tasks. A teacher has classes.**
> Every real job is *for a class*: set them work, see who did it, give them a
> file, tell them about Friday. The app should make the class the place you
> stand, and everything else a source you draw from without leaving.

Two consequences, and they settle most of the detail:

1. **The class is a screen, not a dialog.** A modal is the right shape for a
   decision you finish and dismiss. It is the wrong shape for the place you
   spend the whole session. A dialog also cannot own history, so Back does not
   walk it.
2. **Sources come to the class.** The library, your own files, the paper builder
   — none of these is a destination. They are pickers, opened from the one place
   you need them.

---

## 4. The target shape

**Board — three destinations**

| | |
|---|---|
| 🏫 **My classes** | the list, and the only place you start |
| 📚 **Library** | one shelf: public past papers *and* your own files, filtered by owner |
| ⚙️ **Account** | approval, tier, settings |

Everything else becomes either a class section or a picker.

**Class — four sections and an overflow**

| | replaces | |
|---|---|---|
| 🏠 **Today** | Dashboard | what needs marking, what is due, who is stuck |
| 📅 **Work** | Activities **+** Calendar | one timeline of everything dated. **Set work** lives here |
| 👥 **Pupils** | Pupils | roster, PINs, the join link |
| 📊 **Marks** | Results | this class's marks; the board's Marks book becomes "all classes" |
| ⋯ | Settings, Resources | Resources folds into Work as "files I gave them" |

**One Set work button, one sheet, four sources**

Inside **Work**, a single primary action opens a sheet that asks *what* before
it asks anything else:

```
Set work for Grade 6 Maths
  ○ A past paper        → the library, filtered to this class's grade
  ○ One of my files     → my uploads
  ○ Questions from the app → the existing question-set builder
  ○ A paper worksheet   → upload/describe, with a deadline
then: when?  [Today] [Tomorrow] [Pick a day]     and a note
```

This is the direct answer to the reported complaint. The teacher never leaves the
class, never re-picks the class, and the four things they might set are offered
side by side instead of living in four different tabs.

⚠ **The source picker must default to this class's grade.** Today the library
opens on whatever shelf was last viewed, which for a Grade 6 teacher means
scrolling past eight grades every time.

---

## 5. Staging — five shippable steps, in value order

Each stage stands alone and is worth shipping on its own. **None of them is a
rewrite**, which matters: `teacher_classroom_detail.js` is 2,444 lines and
`_renderPupils` alone is 601. A single-pass rewrite of this file is how the
classroom gets worse before it gets better.

### Stage 1 — ✅ DONE 2026-09-23 — a past paper, set from inside the class
Add the **Set work** sheet to the classroom's Work section, with the library as a
source, defaulted to the class's grade. Reuse `Library` — mount it into a picker
target and let `canShareToClass()` answer true there too.
⚠ **The shell for this already existed and the plan had not noticed.**
`showHomeworkChoice()` was already the front door, offering three sources —
questions on screen, a worksheet, a resource. What was missing was the fourth,
and the Resource card’s own copy said *“a file, video, website or past
paper”*, which is how a teacher ended up in a file list hunting for one. So
Stage 1 became **one more card**, not a new sheet: no parallel flow, no second
front door.

What shipped:
- A fourth card, **“A past exam paper”**, opening a two-step panel inside the
  class: pick from a real shelf, then pick the day.
- `Library.openPicker({hostId, grade, forLabel, onPick})` — picker mode. Cards
  show **Choose this paper** *instead of* Assign/Share/Report, and the cover
  stays a link so the paper can be read before it is set.
- The shelf **opens on the class’s own grade** (`_classGrade`).
- `Library.setForClass()` — one shared write (material + dated `kind='due'`
  event). The Assign sheet’s class branch now delegates to it rather than
  keeping a copy.

⚠ **Picker mode borrows module state and hands it back.** `_target`,
`_openShelf`, `_query` and the three filters are one shared browsing position;
not restoring them left the teacher’s own Past Exam Papers tab filtered to a
class’s grade with nothing on screen explaining why. `closePicker()` restores
all seven, and the browser test types a search, round-trips a picker and checks
the search survives.

⚠ **The shelf is bounded and scrolls itself** (`max-height:52vh`). Unbounded, the
panel grows to the height of the whole library and the Choose buttons sit below
the fold of a dialog that cannot be scrolled to.

*Touched:* `teacher_classroom_detail.js`, `library.js`, `style.css`.
*Did not touch:* any board tab, any table, any migration.

Test: `scripts/test-set-paper-in-class.js` — 24 checks in real Chrome at
390×844. The one that matters: **the class is never chosen twice** (zero
selects or checkboxes in the whole flow).

, so it matched
`2026-09-27T23:59:00Z` and sliced the **UTC** date, while every card beside it
formats in **local** time. An evening deadline could be filed under one day and
labelled another. Now anchored, with the date-only branch kept —
`teacher_class_events.date` is a `date` column and `new Date(2026-09-27)`
reads as midnight UTC, shifting a day back west of Greenwich.

⚠ **`showSection('calendar')` still resolves**, to `work`.
`TeacherMode.rememberClassroom` stores the section name, so deleting it would
send a returning teacher to the overview — the trap `classes` → `home` left on
the board. Old filter names (`active`/`closed`) map to `coming`/`past` for the
same reason.

⚠ **The list comes before the month grid.** At 390px the grid is ~700px tall;
first, it pushed every actual piece of work below the fold. “What is next” is the
question the section is opened with.

⚠ **The test had to stand on the teacher screen before seeding.** `showScreen()`
re-hides `#tc-classroom-detail` for every id but `teacher` — deliberately — and
`Auth.init()` ends boot with `showScreen('landing')`. The first green run was
asserting against DOM nobody could see; the screenshot is what caught it.

*Touched:* `teacher_classroom_detail.js`, `index.html`, `style.css`.
*Did not touch:* any board tab, any table, any migration.

Test: `scripts/test-class-work-timeline.js` — 27 checks in real Chrome.

### Stage 3 — ✅ DONE 2026-09-23 — the class is a screen, with its classes beside it

`#tc-classroom-detail` was `role="dialog"`, `position:fixed; inset:0;
z-index:200`. Opening a class hid the app header, the ☰ menu and every other
class, and the only way out was one ✕. It is `#screen-classroom` now, an
ordinary `.screen`.

⚠ **The inner `#tc-classroom-detail` id was kept.** Dozens of callers and the
whole CSS block name it. The SCREEN wrapper owns visibility; the inner element
keeps its identity and its loading state.

**What the conversion bought**

- **Back walks the sections** — Files → Pupils → Work → Today, and only then
  leaves the class. A dialog owns no history, which is why it could not before.
  `_TAB_SCREENS['classroom']` joins the four boards already in that model.
- **The app shell stays.** The header and ☰ menu never disappear, which is most
  of what “it takes the whole screen” meant.
- **`document.body.style.overflow` is gone.** That was the modal’s, and left
  behind it made the page permanently unscrollable — the defect app.js records.
  `showScreen()` now clears any stale value once, and its classroom-specific
  hack is deleted: the `.screen` loop hides it like everything else.

**The rail — one element, two layouts**

A teacher can always see their other classes and switch in one tap, instead of
backing out to a list and coming in again. Below 900px it is a sideways-scrolling
strip of chips above the class; at 900px and up it is a sidebar beside it.
No dropdown to discover, and nothing new to learn on either.

⚠ **Switching class is not a history step.** `open()` records the SECTION; the
class is remembered state. Otherwise Back walks every class the teacher glanced
at.

**Two guards the conversion made necessary**

⚠⚠ **`classroom` had to join `_ADULT_ONLY_SCREENS`.** As a dialog it was
unreachable except from the board, so no guard existed. A `.screen` can be
navigated to by anything that names it — including the `psac-last-screen`
restore, which would drop a CHILD signing in on a shared device straight into
the class roster, **PINs and all**.

⚠ **A cold open shows an empty shell.** The screen name survives a reload but
`_classId` does not, so `showScreen('classroom')` with no class loaded now
redirects to the class list instead of painting a header over four dashes.

**Plainer words**

Dashboard → **Today**, Resources → **Files**; every section carries a `title`
saying what it holds, so a new teacher can predict a tab before tapping it. The
two dead *“Classrooms tab”* strings are fixed — they pointed at a tab that has
not existed since the list moved onto Home.

*Touched:* `teacher_classroom_detail.js`, `app.js`, `teacher.js`, `index.html`,
`style.css`.  *Did not touch:* any table, any migration.

Test: `scripts/test-classroom-screen.js` — 26 checks in real Chrome at both
390×844 and 1280×900, including the full Back sequence and both guards.

### Stage 4 — collapse the board
Board goes to **My classes · Library · Account**. `materials` folds into Library
as "my files"; `gradebook` becomes "all classes" reached from My classes;
`assignments`, `papers`, `preview` become sources inside Set work.
⚠ `switchTab()` **rejects any tab not in `ALL_TABS` and silently falls back to
home** — retiring a tab means retiring its name there, and any saved location
holding it. Check `_readLoc()` before deleting anything.

### Stage 5 — say it in a teacher's words
Rename against what a teacher would say out loud, and fix the two dead
"Classrooms tab" strings. A copy pass is cheap and it is half of what "hard to
use" means.

---

## 6. What must not be lost

- ⚠ **The PIN is the gate, not the code.** Nothing in this redesign may make a
  class reachable without the pupil's own PIN.
- ⚠ **A teacher cannot write `student_assignments`** — RLS, deliberately. Class
  work stays in `guest_assignments` / `classroom_materials` /
  `teacher_class_events`. Any "set work" flow that appears to write a pupil's
  family rows is wrong, however tidy it looks.
- ⚠ **Marks stay on the teacher's screen.** `materials_library_open()` returns
  `done` without a score on purpose — children comparing marks on a shared
  tablet is what that prevents.
- ⚠ **Role modules load on demand** and the order inside the teacher group is
  load-bearing: four helpers, then `teacher.js`, then
  `teacher_classroom_detail.js`. Check by **bare identifier**, never `window.X`.
- ⚠ **Tailwind's Play CDN only generates rules for classes in the initial
  scan.** Any new control injected by `innerHTML` needs real CSS.

## 7. How to judge it afterwards

Not by looking at it. Count interactions for the five jobs, before and after:

| job | today |
|---|---|
| set a past paper for one class, for Friday | ~9, crossing the board |
| see what Grade 6 is doing next week | 2 screens (Activities + Calendar) |
| find out who has not handed in | Marks book, or the class's Results — both |
| give a class a file I already have | My files → share → pick class |
| add a pupil | class → Pupils → form |

⚠ **Measure it with the real thing, not a description.** The browser harnesses
here (`test-library-render.js`, `test-assign-a-paper-browser.js`) already drive
Chrome at 390×844 and count what is on screen — extend one of those rather than
judging from source, which is how "the library has a header button" stayed in a
test for weeks after the button was deliberately removed.
