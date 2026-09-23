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

### Stage 1 — Set work, from inside the class *(the reported complaint)*
Add the **Set work** sheet to the classroom's Work section, with the library as a
source, defaulted to the class's grade. Reuse `Library` — mount it into a picker
target and let `canShareToClass()` answer true there too.
*Touches:* `teacher_classroom_detail.js` (new section), `library.js` (a picker
mode), `index.html`, `style.css`.
*Does not touch:* any existing tab, any table.
**After this, the teacher never crosses the board to set a paper.**

### Stage 2 — one timeline
Merge Activities into Calendar. `_renderCalendar()` already merges the three
sources; delete the undated duplicate list and keep the timeline, with a "not yet
dated" group at the top for work without a deadline.
*Risk:* low. One section absorbs another; no new data.

### Stage 3 — the class becomes a screen
Promote `#tc-classroom-detail` from `role="dialog"` to a real `.screen`, recorded
with `_recordTab`/`history.pushState` the way the board tabs now are. Back then
walks class sections, then leaves the class, then leaves the board.
*Risk:* medium — this is the one that touches `showScreen()` and the history
model. Do it **after** Stages 1–2 are in and steady, and lean on
`test-screen-restore.js` and `test-hub-back-button.js`, which already cover the
recorder.

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
