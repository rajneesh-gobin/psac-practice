# Label the Diagram — plan

> A bonus chapter per pack, Grades 3–9, where the child names the marked parts of
> a real illustration. Practice shows a word bank and the child taps a word onto
> a marker; the exam shows the same figure with no bank and the child types.
>
> Start at [`CLAUDE.md`](../../CLAUDE.md). Authoring rules:
> [`content-authoring.md`](../claude/content-authoring.md). Image rules:
> [`deploy-and-verification.md`](../claude/deploy-and-verification.md).

---

## Why this chapter exists

Measured 2026-09-17 across all 35,580 practisable questions in 49 packs:

| | |
|---|---|
| questions carrying a diagram | **1,847** |
| …whose stem names a marker on it (A, B, X, P…) | **56** |
| …that ask the child to *label* that marker | **29** |

**Grades 1–4 hold 985 diagram questions and not one of this kind.** The format is
examined — `g6sc-pp24-002`, `g6sc-pp24-007` and `g9s-pp24b-016` are transcriptions
of real PSAC/NCE papers that set it — so the bank covers a live exam format at
roughly one question per 64 diagrams it already owns.

---

## The four decisions

### 1. ⚠ It is a `slots` question. Do NOT invent a type.
Everything a labelling question needs already exists and is already wired end to
end:

| Need | Already provided by |
|---|---|
| several blanks in one question | `slotResponse.kind = 'blanks'` |
| a list of acceptable answers **per blank** | `slotResponse.answer` = array of arrays |
| marks per question | `marks` |
| marking | `Assessment.markPart()` (`engine/assessment.js`, the ONE copy) |
| a renderer | the `slots` branch of `renderAnswerArea()` |
| reaching practice AND exams | `slots` is **not** in `_POOL_TYPES_EXCLUDED` |
| server grading | `netlify/lib/questions-sandbox.js` |

⚠ A new type would have to be added to the factory in `engine/helpers.js` **and**
all three server copies **and their exported context lists** — the exact route by
which `makeCloze`, `learnMore` and `subsection` were each silently dropped from
the built bundle. `makeTask` is required, not re-typed, precisely so this stops
happening. Ride on it.

### 2. ⚠ Tap-to-place, NOT drag-and-drop.
The request says drag and drop. **HTML5 drag never fires on touch**, and this is a
mobile-first app for primary children. `engine/cloze.js` already learned this:
tapping a word fills the next empty marker, tapping a filled marker takes the word
back. The labelling UI copies that interaction exactly. Pointer-drag may be added
on top for desktop later; tap is the one that must work.

### 3. ⚠ The image must not already carry its answers.
A diagram with the part names printed on it is not a question. Two sources solve
this, both on Wikimedia Commons:
- **`… (numbers).svg` / `… -numbers.svg`** — the illustrator's own language-neutral
  variant, markers drawn on, no words. `Simple diagram of plant cell (numbers).svg`,
  `Hawaiian Eruption-numbers.svg`, `Heart numlabels.svg`. **This is the preferred
  form: the marker positions are already drawn, correctly, by the illustrator.**
- **`… (blank).svg` / `…Blank.jpg`** — no markers at all. Usable, but then the
  markers have to be overlaid at hand-measured percentage coordinates.

The matching `… (en).svg` gives the answer key. ⚠ **It is read by the author and
never shipped** — shipping it would publish the answers.

### 4. ⚠ Provenance is captured at download time, never afterwards.
`assets/questions/PROVENANCE-TODO.md` records the cost of not doing this: **115 of
138 images ship with no recorded source, author or licence**, and tracing them
afterwards established provenance for **0**. `scripts/fetch-commons-image.js`
therefore writes the licence and author into a manifest in the same call that
fetches the pixels, and refuses a file whose licence it cannot read.

Accepted licences, in order of preference: **public domain / CC0**, then **CC BY**,
then **CC BY-SA** (attribution required for the last two — the existing
`assets/questions/CREDITS.md` table is the format). Anything else is refused.

---

## Pipeline, per diagram

```
  1  find      Commons search / category, prefer "(numbers)" variants
  2  fetch     node scripts/fetch-commons-image.js "File:X (numbers).svg"
                 → assets/questions/labels/x-numbers.png   (rendered at 900px)
                 → docs/label-diagrams/provenance.json     (licence + author + url)
  3  key       read the "(en)" sibling on Commons for the correct part names
  4  author    one `slots` question: stem + <img> + one blank per marker
  5  verify    node scripts/preflight.js   (fails on an unknown type, so this
                 also proves the question shape is accepted)
```

⚠ **Alt text names the subject, never the parts**: `imageAlt:'A diagram of a
flower with five parts numbered'` — never "…showing the stamen and carpel".

---

## Chapter shape

One bonus chapter per participating pack, so the existing machinery applies with
no new concepts:

```js
{ id:'g5sc-label-diagram', name:'Label the Diagram', icon:'🏷️',
  enrichment:true, examWeight:1,
  enrichmentNote:'Name the numbered parts of a diagram. Derived from the syllabus topics, not a separate MIE chapter.' }
```

⚠ `examWeight:1` on purpose. An explicit `0` keeps a chapter out of exams
entirely (changed 2026-09-09) and the request is that these **do** appear in
exams. ⚠ Check `scripts/exam-mark-maps.json`: for the ten packs weighted from
real papers, adding a weighted chapter changes every other chapter's share, so
the new weight must come out of the same 40 slots.

---

## Candidate content, by subject

Sized against the syllabus each pack already declares. ⚠ Confirm each figure has
an unlabelled or numbered variant on Commons before committing to it — the list
is a target, not an inventory.

| Subject | Grades | Figures |
|---|---|---|
| **Science / Biology** | 3–9 | parts of a flower · parts of a plant · leaf structure · plant cell · animal cell · human skeleton · digestive system · respiratory system · circulatory system / heart · the eye · the ear · tooth · life cycle of a butterfly · food chain |
| **Physics** | 7–9 | simple circuit and its symbols · the ray box / reflection in a mirror · refraction through a glass block · lever and fulcrum · the solar system · phases of the Moon |
| **Chemistry** | 8–9 | laboratory apparatus (beaker, flask, burette, condenser) · distillation apparatus · filtration set-up · the Bunsen burner · particle arrangement in solid/liquid/gas |
| **Geography** | 3–9 | the water cycle · a volcano in cross-section · a river from source to mouth · a valley cross-section (V-shaped) · coastal features · relief cross-section of Mauritius · the layers of the Earth · a contour map · compass points |
| **History / Heritage** | 4–6 | the Mauritian coat of arms · the national flag · a sailing ship's parts · Aapravasi Ghat plan |

⚠ **Mauritius-specific figures will not be on Commons as numbered diagrams.**
Those stay inline SVG drawn for this project, which is what the bank already does
for the map skills artwork. This chapter is for the universal figures.

---

## Order of work

1. ✅ **Measure** — done, the three counts above.
2. ✅ **Decide the type** — `slots`, no new type.
3. **Tooling** — `scripts/fetch-commons-image.js` with provenance capture.
4. **First slice, end to end**: one pack (grade5-science), 5–6 figures, the
   chapter, the questions, the tap-to-place renderer, green preflight.
5. **Renderer** — the word bank and marker targets; exam mode drops the bank.
6. **Widen** — one pack at a time, re-running preflight and the exam-shape test
   after each, because each new weighted chapter moves the other chapters' shares.
7. **Credits** — every image appended to `assets/questions/CREDITS.md` as it lands.

⚠ Each pack that gains the chapter needs: `_manifest.js` chapter + subsection map,
`LOCAL_FILES` entry, `_CACHE_VERSION` bump, `build-subject-index.js`, and a
`scripts/fact-ledgers/` update if that pack has a ledger.
