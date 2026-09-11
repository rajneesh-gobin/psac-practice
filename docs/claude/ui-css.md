# UI, CSS and layout traps

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read this before touching `style.css`, `index.html`, a screen, a modal or the map.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## UI, CSS and layout traps

### Stacking, positioning and the action bar
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`,
  `main` or `body`, even as an animation.** A transformed ancestor becomes the
  containing block for every `position: fixed` descendant — this is what put the
  practice Check/Next bar off-screen. Screen-transition keyframes are opacity-only
  for this reason. If a fixed bar is reported clipped, walk its ancestors'
  computed styles before touching the bar.
- ⚠ **The practice Check/Next bar (`.pr-actions`) is `position: sticky`, not
  `fixed`.** Fixed pinned it to the viewport bottom however short the question was
  (measured 449px of empty gap at 1920×1080, 809px at 2560×1440) — invisible on a
  phone, present in every desktop browser. Sticky gives both from one rule: in
  flow when the page does not scroll, pinned when it does.
  - ⚠ `margin-inline: -1rem` cancels `<main class="px-4">` so the bar stays
    edge-to-edge on a phone; removing it makes the bar read as a card, not a toolbar.
  - ⚠ **`.pr-wrap` must NOT carry a `padding-bottom` reserve** any more — with a
    sticky bar that takes its own space in flow, the old 5.5rem becomes a hole.
  - ⚠ Sticky's dependency differs from fixed's: it breaks inside an ancestor with
    `overflow` hidden/auto, not a transformed one. `body` carries `overflow-x:
    clip` (behind `@supports`), which leaves `overflow-y` visible and creates no
    scroll container — that is why `clip` was chosen over `hidden`, and the sticky
    header relies on it too. `body { overflow: hidden }` would kill both.
- ⚠ **MCQ options pair into two columns only when the option TEXT is short**
  (`.pr-answers-pair`, added by `renderAnswerArea()`, CSS at ≥ 700px). `.mcq-opt`
  is `width: 100%`, so on desktop four numeric options were four 736px bars each
  holding two characters. The test is on the content, not the viewport: a French
  comprehension option is a whole sentence. The class is cleared at the top of the
  render, per the module-state rule — every other type returns early.
- `scripts/test-practice-action-bar.js` guards both. ⚠ Two harness traps: poll for
  `typeof renderAnswerArea === 'function'`, **not** for `.pr-actions` (which is in
  `index.html` from the first byte and so races `app.js`); and read every
  measurement into a plain number **before** re-rendering, because a detached node
  reports 0×0 and that reads as a collapsed layout rather than a late question.

### Cascade and the Tailwind CDN
- ⚠ **`style.css` loads AFTER the Tailwind Play CDN**, so an equally-specific rule
  of yours wins — and a bare `display:flex` outranks `.hidden` (hence
  `.pd-action.hidden { display: none }`, and `.kid-hero`'s own gradient).
- ⚠ **The Play CDN only generates rules for classes present at its initial scan.**
  Markup injected by `innerHTML` later gets the class and no rule. Use inline
  styles there, and **measure the width** — asserting the class passes either way.
- ⚠ **An `<option>` is painted by the PLATFORM.** It inherits the select's `color`
  and **never** its `background`, which computes to `rgba(0,0,0,0)` unless
  something sets it — so `bg-white/10 text-white` rendered white on white, and all
  31 selects carried the same latent defect. `style.css` now gives
  `option`/`optgroup` an explicit opaque pair per theme, plus `color-scheme`
  **scoped to `select`** (on `:root` it repaints every native control in the app).
  `scripts/test-select-contrast.js` measures all 31 in both themes.
- ⚠ **Do not share a class name between two components.** `.nav-btn` was both the
  exam navigator cell (32×32) and the student tab bar, so tab labels spilled out
  of their buttons on every phone. The tab bar is `.tabbar-btn`.

### Screens, dialogs and layout
- ⚠ **A panel that is not INSIDE a `.screen` is never hidden by anything.**
  `showScreen()` toggles `.hidden` on `.screen` elements only. Two live cases,
  both fixed: `#admin-tab-questions` had escaped `#screen-admin` by one `</div>`
  (it read as *"the Parent button does nothing"* and cost a long hunt through
  `enterParentMode()`); and `#tc-classroom-detail` is a deliberate full-page
  overlay `showScreen()` had never heard of — it now hides it but does **not**
  call `TeacherClassroomDetail.close()` (that would clear the remembered classroom
  `psac_teacher_loc_v1` exists to restore) and skips `id === 'teacher'`.
  ⚠ **Ask the DOM, not the indentation** — the file was tidy and nine panels were
  fine. `scripts/check.js` → `checkScreenNesting()` fails any `.admin-tab-panel`
  outside `#screen-admin`.
- **`showScreen()` scrolls to the top and focuses the screen's first heading**
  (`_focusScreen`, only when the id changed) — before this a child arriving from a
  long chapter grid landed mid-page and a screen reader stayed on a button that no
  longer existed. It runs synchronously, so a caller that focuses its own field
  straight after still wins.
- **Every `#modal-*` overlay gets the dialog contract from `_Dialogs`** (app.js, a
  MutationObserver on the `hidden` class): `role="dialog"`, `aria-modal`, labelled
  by its first heading, focus moved in, Tab trapped, **Escape closes through the
  modal's OWN close control** so its cleanup runs, focus returned to the opener.
  New modals need nothing — keep the `modal-` id prefix and the `fixed inset-0`
  wrapper. (`modal-round-complete` has no close control by design.)
- **`_labelUnlabelledFields()`** names any control with no label from its
  placeholder, title or the short element before it. It is a fallback — write a
  real `aria-label` / `<label for>`.
- **The student tab bar is OFF on the practice screen** (`'practice'` is not in
  `_BOTTOM_NAV_SCREENS`) — two stacked fixed bars covered 155px of a 740px phone
  (2 of 4 options visible on first paint).
  `_scrollPracticeFeedbackIntoView()` measures against the bar; `'nearest'` only
  cleared the viewport.
- **Chapter cards inside the chalkboard subject hub keep their own ink** — the
  board's `h3`/`p` chalk overrides painted card titles cream on white (1.2:1);
  `.ch-card` rules under the override block reset it.
- **`.pd-switch` is the promoted "Switch to student mode" bar**, above the
  `.pd-action` row rather than inside it — handing the device over is the most
  frequent thing a parent does and the one they could not find.
  ⚠ Promote by **altitude, not colour**: a louder tile inside the row would break
  the single shape language that row exists to have.
  ⚠ **The two mode switches are ONE control in two directions and must paint
  identically** — all three (`.student-parent-switch` on dashboard and
  subject-select, `#pd-student-view-btn` on `#screen-parent`) are `.pd-switch` and
  are deliberately left OUT of their screen's chalkboard repaint; muting the
  parent-side gradient made it read as a panel rather than the button its twin is.
  ⚠ `test-switch-mode-button.js` hard-codes the gradient stops `[79,70,229]` and
  `[124,58,237]` for its contrast maths — it was once measuring a colour that was
  not on screen. Keep those two numbers in step with `.pd-switch`.
  ⚠ The ids stay `pd-student-view-*` and the flag stays
  `psac_student_view_guide_seen` — renaming it re-shows the nudge to every parent.
  ⚠ **The parent dashboard's idle nudge points at the parent's NEXT step**
  (`_parentIdleNudge()`): add-child while there are no children, then this
  switch — the same `.attn-nudge` shake plus callout, after 15s idle, up to 3
  times per page load — until the parent first uses student mode
  (`psac_student_mode_used:<parentId>`, set in `Auth.switchToStudentSelect()`).
  `scripts/test-parent-switch-nudge.js` (real browser).
- Header: below 1100px everything collapses into one labelled **`☰ Menu`**. ⚠ The
  sheet rows are **built from the live header buttons** (`_buildHeaderMenu()`),
  never hard-coded — which controls exist is decided in half a dozen places.
  Icon-only was tried and rejected. **Logout keeps a labelled twin**
  (`#header-logout-mobile`) and never hides in the menu (`_MENU_EXCLUDED`).
- Fixed-width grids (`.fam-head` / `.fam-row`) share explicit rem columns because
  two grids with `auto` columns cannot align. ⚠ Header labels must stay short — a
  fixed column overflows rather than widening — and an inline `display:flex` on a
  cell silently beats the mobile `display:none`.
- `.pd-tabbar` is `flex-wrap: wrap` with **`flex: 1 0 auto`**; `flex-shrink` must
  stay `0`. A horizontal scroller measured worse — it hid 2 of 5 tabs.
- A centred flex child taller than the viewport gets its top clipped with no way
  to reach it — long modals need `overflow-y: auto` + `my-auto`.
- iOS: any form control under 16px zooms the page in and never back out — a
  `@media (pointer: coarse)` rule raises `.text-sm`/`.text-xs` controls.
  `backdrop-filter` and `user-select` need `-webkit-` twins.
- **Focus ring is theme-neutral** (`:focus-visible` on buttons/links, two-tone,
  both themes; the old rule was light-mode only while dark is the default).
- ⚠ **No regex lookbehind anywhere.** `(?<=…)` is a *parse* error on Safari <16.4
  and would take the whole file down, not one feature (`_syllabusPoints` uses
  `.match(/[^.!?]+[.!?]*/g)` for exactly this reason).
- ⚠ **Line endings differ per file AND between the object store and the working
  tree** — autocrlf converts on checkout, so `git show HEAD:file` is not what is
  on disk. **Measure the file you are about to edit**, preserve what you find, and
  prefer editing by line index over multi-line string patterns: a `\n` pattern
  matches nothing in a CRLF file and reports "anchor not found" as though the code
  had changed. Normalise in memory, restore the file's own convention on write,
  and in `index.html` detect the convention **per anchor**.
- Everything user-supplied goes through `_attr()` / escaping — mistake rows, child
  display names and the digest email all carry typed input.

### ⚠ Module-level UI state must be reset in the RENDER, not in the toggle
Otherwise the next child's panel, the next exam's results or the next subject's
grid opens in the last one's state: `_examReviewWrongOnly` (in `renderResults`) ·
`_repShowAllMistakes` (in `_renderReports`) · `_shopOpen` + the search box (in
`renderShop`) · `_chapterFilter` (in `activateSubjectPack` — declared **above**
that function, or the reference hits the temporal dead zone) · the round-review
collapsed state · `_ttMonth`/`_ttView` (in `renderSchedule`) · the contact form
(`_resetContactForm` from `showScreen('contact')`) · the game-settings card state.

### The rough-working pad clears per SESSION, not per screen
`#scratchpad-practice` / `#scratchpad-exam` live in `index.html` and are never
rebuilt, so a child's drawing used to stay on the canvas for the rest of the
visit. `_resetScratchpadForSession()` blanks them from the two screen observers.
- ⚠ **Keyed on the SESSION OBJECT's identity** (`S.practice.session`, `S.exam.qs`),
  never on the screen becoming visible (that wipes the pad on any return) and
  never per question (that wipes it mid-working, the one moment it is needed).
  All five practice starts and both exam starts assign a fresh object literal
  immediately before `showScreen`, so a sixth entry point gets it for free.
- ⚠ **A reset must restore the placeholder AND re-arm its one-shot listener** —
  that `pointerdown … {once:true}` handler has already fired, so redrawing the
  prompt without re-adding it prints it under everything the child writes. The
  stroke still lands, so a pixel count does not notice; assert the prompt state.
- ⚠ Clear whenever a 2d context exists, **visible or not** — `clearRect` works on
  a hidden canvas.
- `scripts/test-scratchpad-session.js`.

### The interactive map — one module, two surfaces
`engine/interactive_map.js` renders both the child's map (`GeoMap.render`) and the
admin editor (`GeoMap.renderEditor`) from one catalogue, one projection and one set
of marker markup. **Keep it that way** — every bug it has had came from the two
surfaces disagreeing.
- ⚠ **The box's `aspect-ratio` is defined in `ISLANDS` in the JS, not in CSS**, and
  is each base image's own ratio. `object-fit: contain` then fills the box exactly,
  so a percentage of the box is a percentage of the artwork on both surfaces. A
  second copy in `style.css` is how they drift.
- **Catalogue: 88 Mauritius · 25 Rodrigues · 20 world**, every pin a real
  OpenStreetMap coordinate. ⚠ **Do not nudge a pin to make a label fit** — move
  the label (`lx`/`ly`), which lives **on the feature**, not in a positional array
  indexed by `indexOf`.
- ⚠ **A river is a LINE, not a point.** Fifteen carry `line: [[lon,lat],…]` plus
  `labelAt` (0–1); `markerPosition()` walks the course by **distance**. ⚠ Dragging
  a river's pin writes `labelAt` (slides the name along it), never coordinates —
  the course is surveyed data; dragging a course point reshapes it, and handles
  appear only on the SELECTED river. ⚠ **Two Mauritian rivers can share a name**,
  so `build-rivers2.js` picks a chain by a `near` point and **throws over 12 km**.
- ⚠ **Each island has its OWN projection** (`PROJECTIONS`), picked by island, never
  by "this row happens to have a lon". **The world map is Robinson** (fitted, y rms
  0.58px vs 3.0 plate carrée): **Equator at 52.33% of the height, Prime Meridian at
  47.54% of the width** — not 50/50. ⚠ **The graticule is drawn FROM the
  projection**, not from evenly spaced CSS gradients.
- ⚠ **Markers and districts project through `MAURITIUS_BOUNDS` only**, and the
  district `<svg>` is `viewBox="0 0 100 100" preserveAspectRatio="none"` — deriving
  its own bbox letterboxed the districts and put every coastal pin ~15px off.
- ⚠ **A drag never repaints the canvas** — that destroys the button the pointer is
  on, so pointerup lands nowhere and the *next* drag moves two features.
- ⚠ **Filter chips are island-aware** (`typesOn()`); above `LABEL_LIMIT` (15)
  visible pins the layer goes `.labels-quiet`. **Label offsets are therefore solved
  PER CATEGORY** — a filtered view is the only time a group's captions share a screen.
- Editor edits are a **draft** (`psac-geo-map-draft-v2`); **Publish** writes a
  *diff against the built-in catalogue* to `mm_data.geo_map_content` and a built-in
  is `hidden`, never deleted. It goes through `Store.mmSave` (awaited), not
  `Store.mmSet` (fire-and-forget), which claimed success on a refused upsert.
- ⚠ **A feature outside its island's bounds is silently clamped to the edge**, so
  it reads as a coastal feature rather than the error it is.
- ⚠ **Land is a different colour on every base map** — `#fefefe` is the SEA on
  Mauritius (a bay or lagoon islet legitimately samples it); the world sea is
  transparent, land `#cccccc`, Antarctica its own `#ffffff`. ⚠ **A pin "outside
  every district" is not an error on its own** — the polygons are generalised.
- Harnesses (headless Chrome, local static server, under `/scripts/`, which 404s
  on Netlify): `map-editor-harness.html` (editor ↔ child correspondence) ·
  `map-calibration.html` (every pin on the right ground, every river along its
  whole course, 47 known world coordinates) · `map-label-solver.html` (**re-run
  after adding or renaming a feature** — offsets are absolute px) ·
  `map-world-fit.html` (re-derives the world projection).

### Feature-specific UI notes
- **Admin › Question bank, the pupil preview** — the list card renders the real
  question HTML (`_kidPreviewHTML`, class `.qm-kid`) instead of a stripped line,
  and **👁 Preview as pupil** opens `#modal-qm-preview`, which draws the question
  through **`renderAnswerArea()` itself** inside `#qm-preview-board`.
  ⚠ **`#qm-preview-board` shares the practice screen's chalkboard rules** — one
  selector list in `style.css` names both `#screen-practice .pr-card` … through
  `.pr-feedback` **and** `#qm-preview-board …`. Extend that list; never fork the
  block. A preview drawn from a copy is a preview of the copy, which is worse than
  no preview: it says a question is fine when the screen the child holds says
  otherwise. Both selectors are id-based on purpose — the day-theme overrides at
  the bottom of the file (`html:not(.dark) :is(.pr-card, …)`) outrank a class.
  ⚠ **The board renders under a THROWAWAY id** (`__qm_preview__`).
  `_shouldShowAsBlank()` memoises a per-id coin flip in `_blankQuestions`, so
  previewing under the real id would settle how that question is drawn in a real
  session on the device. The typed-blank checkbox writes the scratch id only.
  ⚠ **`ACTIVE_PACK` is swapped for the duration of one synchronous
  `renderAnswerArea()` call and restored in a `finally`** — it is what decides the
  French placeholder and `lang`.
  ⚠ **Enter is stopped in the CAPTURE phase** on the modal: the real answer inputs
  carry `onkeydown="…practiceSubmit()"` inline, and there is no session behind a
  preview. An inline handler on the wrapper runs too late.
  ⚠ **`.pr-answers-pair` is a VIEWPORT media query**, and the frame is a phone's
  width inside a desktop page — the preview overrides it back to one column,
  because that is what the child in the frame gets.
  ⚠ The toggle's state lives in the **checkbox**, read in `_renderList()`; the
  three modal checkboxes are reset in `_openPreview()`, not in their handlers.
  ⚠ **The preview and the save share `_qmComposeData()`** — see
  [content-authoring.md](content-authoring.md). A preview built from the form
  alone showed a `slots` question with no `slotResponse`, i.e. a preview of a
  different object than the one that gets written.
  `cloze`/`errorhunt` are named and refused rather than falling through to the
  "can't be answered on screen" card. `scripts/test-admin-question-preview.js`
  (25 checks, real browser).
- **"Question bank not loaded yet" means nobody asked for it.** `SubjectHub.open()`
  awaits `PackLoader.ensure()`, which loads the **manifest** — chapters, syllabus,
  generators — and for a long time nothing awaited `QuestionLoader.loadSubject()`.
  ⚠ **The two loads are separate and both are needed before a chapter card can
  tell the truth.** Every card read "Question bank not loaded yet" and the
  summary "0 different bank questions recorded" on a pack holding 499 questions;
  `PracticeJourney.coverageLine()` says that whenever `eligible()` is empty, which
  is indistinguishable from "this pack has no content".
  ⚠ **It only ever showed on a subject in ANOTHER grade** — the bank is fetched
  for the child’s own grade at sign-in (`loadForStudent`) — which is why it read
  as a `file://` problem. Measured over `file://` on the reporter’s exact path:
  0 questions before the fix, **499 after**, so the LOCAL_FILES script-injection
  path was working the whole time. `startChapterDirect()` awaits the loader, so
  **Start worked while the card said the content was missing.**
  ⚠ **Render, then re-render.** Awaiting the bank before the first paint holds an
  empty screen; the second render is guarded on `_packId` still being the pack
  that was opened.
- **A screenshot has to say which grade it is.** The breadcrumb read
  `🏠 Home › Start Practicing › 📖 English` — identical in nine grades — and the
  header said only "English", so a support question about a screenshot could not
  be answered from it. `packLabel` / `subjName` now append ` · Grade N` **from the
  pack**, never from `SELECTED_GRADE`: the pack is what is actually open. Carried
  by every deeper screen too (chapters, syllabus, practice, exam).
  `scripts/test-subject-hub-bank.js` (9 checks, real browser over `file://`).
- **Start Practicing — own grade vs browsing grade.** `PracticeHub` keeps the
  two apart and must go on doing so: `_ownGrade()` is the grade on the signed-in
  account (the base every entitlement is computed from), `_browsingGrade()` is
  whose books are on screen — it follows the picker and every
  `activateSubjectPack()` via `SELECTED_GRADE`.
  ⚠ **They were ONE function that answered with the account grade first.**
  Reported from the app: pick Grade 8, open Science, then press "Start
  Practicing" in the breadcrumb — the only way back out of a subject — and
  Grade 5’s books are on screen. Measured on the old code, the picker was
  already lying one step earlier: choosing Grade 8 swapped the books and left
  the dropdown reading **Grade 5**, because `onGradeChange()` re-rendered the
  grid and nothing else. Tapping a book then starts the wrong grade’s work.
  ⚠ **Never pass the browsing grade to `GradeAccess.allowed()`** — it returns a
  list CONTAINING its argument, so deriving the allowed set from where the child
  is browsing makes any grade self-granting the moment it is opened once.
  ⚠ **A grade dropped by the clamp says so** (`prac-locked-note`). Silently
  painting another grade’s books under an unchanged heading is the half of the
  report that starts the wrong work; `#prac-hub-sub` now names the grade too.
  ⚠ `SELECTED_GRADE` is a **UI memory, never an entitlement** — it is clamped on
  read and only written from a grade the picker was allowed to offer.
  ⚠ `#screen-grade-select` / `renderGradeSelect()` is **dead** — nothing calls
  `showScreen('grade-select')`, and it filters by nothing, so it would let a
  child into any live grade. The "← Back to Grades" button its breadcrumb
  comment names does not exist either. Delete or gate it before reviving it.
  `scripts/test-practice-hub-grade.js` (14 checks).
- **My Timetable** — `#screen-schedule` has a list ⇄ calendar toggle
  (`setTimetableView`, `psac_timetable_view_v1`); both views paint from one load
  (`_ttData`) and both start work through
  `startScheduledSession(subjectId, chapterId, forceDiff)`.
  ⚠ **`#screen-schedule` is a CHALKBOARD in both themes** — the grid needs the
  `#screen-schedule .tt-*` override block (light-mode ink measured 1.1:1); the
  popup is outside the screen and keeps sheet colours. ⚠ Chip labels are hidden
  below 520px (a 46px square cannot hold a readable word); the popup carries them.
  Past days are dimmed, never tagged "missed" — the overdue tag belongs in the
  list, where a child can act on it. Day squares are keyed on the **local** date.
  `scripts/test-timetable-views.js`.
- **Learning materials sorting** — `sortMaterials()` / `materialSortBar()` /
  `readMaterialSort()` in `engine/helpers.js` (teacher Materials tab + a
  classroom's Materials section); `guest.html` gets Newest·Subject·Name.
  ⚠ **"Date" means two things**: `classroom_materials.assigned_at` (shared with
  THIS class) beats `learning_materials.created_at`; rows carry `shared_at` and the
  comparator prefers it. ⚠ **A row with no subject/grade sorts LAST.**
  `classroom-materials.js` had **no ORDER BY at all**. The classroom Work-tab
  preview deliberately gets no sort control. `scripts/test-materials-sort.js`.
- **The public contact form** — `#screen-contact` (open to anyone with no account)
  posts to `netlify/functions/contact-message.js` (service role), which writes into
  **`question_reports`** with `report_type:'contact'`, `question_id:'__contact__'`,
  so a guest message lands in the SAME admin queue — a second inbox is an inbox
  nobody reads. The mailto stays underneath: the one route that still works when
  the app itself is broken.
  ⚠ **A guest has no inbox**, so the admin card hides the in-app reply box and
  shows a **mailto**, or says plainly there is no way to answer. ⚠ Sender
  name/email/browser go in the existing `\n__meta__` JSON — **no schema change**.
  ⚠ **The raw IP is never stored** (a 16-char salted hash, only to count
  3-per-15-minutes; plus a 40-per-hour global brake).
  ⚠ Honeypot (`#contact-website`) is **off-screen, not `display:none`**, and a hit
  answers a plain success. Layers in firing order: honeypot → too-fast (<3 s, and
  a missing value counts as instant) → link count (>2) and a three-real-words rule
  with **URLs stripped first** → per-sender cap → hourly brake. ⚠ The fill time is
  client-supplied and forgeable: these are bot filters, not security controls.
  ⚠ **An unknown sender is not an unlimited one** — unknown callers share one
  bucket on a tighter cap. ⚠ **The rate limit fails CLOSED.**
  Admin → Reports filters **in the query** (`Store.loadReports(offset,limit,kind)`),
  never over one loaded page. ⚠ Bulk delete sends only ids **on screen now** (the
  selection Set outlives a filter change) and reports the count the DELETE
  returned. ⚠ `.contact-field` backgrounds are **opaque**; fields are 16px.
  `scripts/test-contact-form.js`.
- **Question reports — one action, not two.** ✅ Resolved / ⚪ Won't fix / 🔁 Reopen
  all go through `_replyThenStatus()`: whatever is in the message box is sent to
  the pupil's inbox FIRST, and only then does the status move.
  ⚠ **A failed message never moves the status**, and a moved status is never
  reported as a send — *"Message sent, but the status did not change"* is a real
  outcome and must not read like success.
  ⚠ **The reply box used to be gated on `isOpen`**, so pressing Resolved removed
  the only way to say why. It now renders whatever the status, which is also how
  a follow-up on a closed report gets answered.
  ⚠ **The Questions-tab panel had no way to reject spam** — only Edit question and
  Mark as resolved, with Delete and Won't fix on the other screen behind a
  "Review all reports →" link. It now carries Resolve · Not a problem · Delete.
  ⚠ **Its message box is `qm-report-reply-<id>`, NOT `report-reply-<id>`** — both
  panels can be in the DOM at once, and one id on two elements means
  `getElementById` returns the wrong box.
  ⚠ Spam is `wont_fix`, not `resolved`: resolved asserts the question was looked
  at and something was done, and the reports screen filters on that distinction.
  The pupil sees the message in `renderStudentInbox()` under "Admin replied:".
  `scripts/test-admin-report-actions.js` (17 checks) and
  `scripts/test-admin-pending-reports.js`.
- **Sharing to WhatsApp** — `TeacherWorkspace.shareText(title, text, url)` is
  **the** share path (assignment links, reminders, materials).
  ⚠ **The panel is never replaced by `navigator.share`** — the OS sheet lists
  WhatsApp only if the OS knows about it, which on a laptop it usually does not.
  The panel always opens with 💬 Share on WhatsApp, Copy message, Copy link, and
  📤 More apps (the native sheet) as one more button, called inside the click.
  ⚠ WhatsApp is a real `<a href="https://wa.me/?text=…">` — `window.open()` after
  an `await` is eaten by popup blockers. ⚠ **The message states the link's
  lifetime** (`fmtMaterialExpiry`); `TeacherMaterials.getLink()` uses the row's own
  `link_expiry_seconds`, not a hard-coded hour. ⚠ `.tc-share-wa-btn` ink is **dark
  green, not white** (white on `#25d366` measures 2:1).
  `scripts/test-teacher-share.js`.
