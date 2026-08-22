# Contributing — Adding a New Subject Pack

MathMaster is designed so each subject is a self-contained folder under `subjects/`.
The engine discovers subjects via `registerSubject()` — no engine files need editing.

## Step 1 — Create the folder

```
subjects/
  grade5-science/         ← new pack
    _manifest.js
    help.js               ← optional
    questions/
      core.js
```

## Step 2 — Write `_manifest.js`

```javascript
// subjects/grade5-science/_manifest.js
'use strict';

const SCI_CHAPTERS = [
  { id: 'plants', name: 'Plants & Growth', icon: '🌱', subsections: ['Photosynthesis','Life cycle'] },
  { id: 'animals', name: 'Animals',        icon: '🐾', subsections: ['Habitats','Food chains'] },
  // ...
];

// Optional: formulas/facts modal content
const SCI_FORMULAS = {
  plants: { title: '🌱 Plants', facts: ['Photosynthesis: CO₂ + H₂O → glucose + O₂'] },
};

// Register with the engine — this is the only coupling point
registerSubject({
  id:         'grade5-science',
  name:       'Science',
  grade:      5,
  icon:       '🔬',
  subject:    'Science',
  curriculum: 'MIE Mauritius',
  chapters:   SCI_CHAPTERS,
});
```

## Step 3 — Write questions

Each question file must push into the global `STATIC_QUESTIONS` array.
Never redeclare it — it already exists in `engine/questions_engine.js`.

```javascript
// subjects/grade5-science/questions/core.js
'use strict';

STATIC_QUESTIONS.push(
  makeMCQ({
    chapterId:  'plants',
    difficulty: 1,
    q:  'Which gas do plants absorb during photosynthesis?',
    opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
    answer: 'Carbon dioxide',
    explanation: 'Plants take in CO₂ and release O₂ during photosynthesis.',
  }),
  // more questions ...
);
```

### Question factories

| Factory | Use for |
|---------|---------|
| `makeMCQ({chapterId, difficulty, q, opts, answer, explanation, hint?})` | Multiple-choice |
| `makeNum({chapterId, difficulty, q, answer, tolerance?, unit?, hint?})` | Numeric answer |

Difficulty scale: **1 = Basic, 2 = Medium, 3 = Hard, 4 = Word Problems**.

## Step 4 — Add script tags to `index.html`

Add these after the grade5-maths blocks, before `engine/app.js`:

```html
<!-- Grade 5 Science pack -->
<script src="subjects/grade5-science/_manifest.js"></script>
<script src="subjects/grade5-science/questions/core.js"></script>
```

That's it. On next load, the subject selector screen will appear automatically
because `SUBJECT_PACKS.length > 1`.

## Rules

- **Never edit engine files** to add subject content. All subject-specific data lives under `subjects/`.
- **Never redeclare `STATIC_QUESTIONS`** — only `push()` into it.
- **Load order**: `_manifest.js` must come before any `questions/*.js` for that subject.
- **Chapter IDs must be unique** across all subjects (prefix with subject: `sci-plants`, not just `plants`).

## Help content (optional)

```javascript
// subjects/grade5-science/help.js
'use strict';

const CHAPTER_HELP = {
  ...CHAPTER_HELP,   // keep existing maths help
  plants: {
    title:   'Photosynthesis explained',
    channel: 'Khan Academy',
    videoId: 'YOUTUBE_ID_HERE',
    bullets: ['Plants make food from sunlight', 'Chlorophyll gives leaves their green colour'],
  },
};
```
