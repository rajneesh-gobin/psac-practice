# PSAC Practice — Question Bank Schema

This document describes the format for adding questions to the question bank.
Questions are stored as plain JavaScript arrays in files inside each subject folder,
e.g. `subjects/grade5-maths/questions/ch01_numeration.js`.

## File naming convention

```
subjects/
  grade5-maths/
    questions/
      ch01_numeration.js
      ch02_four_ops.js
      ...
  grade5-science/
    questions/
      ch01_living_things.js
      ...
```

Each file registers itself by pushing into a global array:
```js
(QUESTION_BANK = QUESTION_BANK || []).push(...QUESTIONS_G5_MATHS_CH01);
```

---

## Question object fields

```js
{
  id:         "g5m-num-001",    // REQUIRED. Unique ID: [grade][subject]-[chapterShort]-[seq]
  chapter:    "numeration",     // REQUIRED. Must match a chapter id in _manifest.js
  topic:      "place-value",    // optional — subsection id
  type:       "mcq",            // REQUIRED. See TYPE LIST below
  difficulty: 1,                // 1=easy 2=medium 3=hard. Use null for English/French
  marks:      1,                // marks in a real exam (1, 2, 3...)
  question:   "...",            // question text (plain text or simple HTML, no images)

  // ── Fields that depend on type ──────────────────────

  // For type "mcq":
  options:  ["A. ...", "B. ...", "C. ...", "D. ..."],
  correct:  "B",                // the letter A/B/C/D

  // For type "compute" or "fill-blank":
  answer:   "42",               // the expected answer as a string
  acceptableAnswers: ["42", "Rs 42"],  // optional — alternate correct wordings

  // For type "true-false":
  answer:   true,               // boolean

  // For type "match":
  pairs: [
    { left: "Solar panels", right: "Sun" },
    { left: "Sailing boat",  right: "Wind" },
  ],

  // For type "short-answer":
  answer:   "The roots absorb water from the soil.",
  // short-answer is not auto-graded; used for self-check and AI evaluation

  // For type "word-problem":
  answer:   "21429",
  acceptableAnswers: ["21429", "21,429"],
  workings: "12456 + 8973 = 21429",  // optional step-by-step

  // For type "cloze": (fill-in-the-blank passage)
  // question contains ___ for each blank
  blanks:  ["famous", "is", "cannot"],  // answers in order of blanks

  // For type "verb-conjugate":
  instruction: "Write the verb in brackets in the correct tense.",
  verb:     "chanter",
  tense:    "présent",
  expected: "chantons",

  // For type "transform":
  instruction: "Rewrite in the negative form.",
  expected:    "Ma cousine n'habite pas chez moi.",

  // ── Shared optional fields ───────────────────────────
  hint:        "...",           // one-sentence help tip shown on demand
  explanation: "...",          // full solution explanation shown after answer
}
```

---

## TYPE LIST

| type | Subject | Description |
|------|---------|-------------|
| `compute` | Maths | Calculate and write a numerical answer |
| `mcq` | All | Multiple choice — choose one of A/B/C/D |
| `fill-blank` | All | Fill in one or more blanks in a sentence |
| `true-false` | Science, Hist/Geo | True or False |
| `match` | Science | Match items in Column A to Column B |
| `short-answer` | Science, Hist/Geo, English, French | Write 1–2 sentence answer |
| `word-problem` | Maths | Multi-step story problem with calculation |
| `cloze` | English, French | Fill multiple blanks in a passage |
| `verb-conjugate` | English, French | Write verb in correct tense/form |
| `transform` | French | Rewrite sentence in different form (negative/interrogative) |

---

## Difficulty guide (for Maths, Science, History)

| Level | Meaning |
|-------|---------|
| 1 | Recall / recognition — identify, name, state a fact |
| 2 | Apply — use knowledge in a familiar context |
| 3 | Analyse / solve — multi-step, word problem, explain |

English and French: set `difficulty: null` — skill level comes from question type instead.

---

## Example questions

### Maths — MCQ
```js
{
  id: "g5m-num-012", chapter: "numeration", topic: "place-value",
  type: "mcq", difficulty: 1, marks: 1,
  question: "What is the place value of the digit 7 in the number 47,325?",
  options: ["A. Hundreds", "B. Thousands", "C. Ten thousands", "D. Ones"],
  correct: "B",
  hint: "Count from the right: ones, tens, hundreds, thousands, ten-thousands.",
  explanation: "In 47,325 the digit 7 is in the Thousands position."
}
```

### Science — True/False
```js
{
  id: "g5sci-pl-003", chapter: "plants", topic: "parts-functions",
  type: "true-false", difficulty: 1, marks: 1,
  question: "The leaf of a plant is responsible for absorbing water from the soil.",
  answer: false,
  explanation: "The root absorbs water from the soil. The leaf makes food through photosynthesis."
}
```

### Science — Match
```js
{
  id: "g5sci-en-001", chapter: "energy", topic: "energy-sources",
  type: "match", difficulty: 1, marks: 3,
  question: "Match each device in Column A to the energy source it uses in Column B.",
  pairs: [
    { left: "Solar panels",       right: "Sun" },
    { left: "Sailing boat",       right: "Wind" },
    { left: "Drying of octopus",  right: "Sun" },
    { left: "Motorcycle",         right: "Petrol" },
  ]
}
```

### History — MCQ
```js
{
  id: "g5hg-disc-001", chapter: "discovery", topic: "mascarene",
  type: "mcq", difficulty: 1, marks: 1,
  question: "In which ocean are the Mascarene Islands found?",
  options: ["A. Arctic Ocean", "B. Atlantic Ocean", "C. Indian Ocean", "D. Pacific Ocean"],
  correct: "C",
  hint: "Mauritius, Réunion and Rodrigues are all in one specific ocean.",
  explanation: "The Mascarene Islands (Mauritius, Réunion, Rodrigues) are located in the Indian Ocean."
}
```

### French — Verb Conjugation
```js
{
  id: "g5fr-verb-001", chapter: "verbes", topic: "present",
  type: "verb-conjugate", difficulty: 2, marks: 1,
  instruction: "Écris le verbe entre parenthèses au temps convenable.",
  question: "Chaque matin, nous __________ l'hymne national à l'école. (chanter)",
  verb: "chanter", tense: "présent", expected: "chantons",
  hint: "C'est une action habituelle au présent. Conjuguez 'chanter' avec 'nous'.",
  explanation: "Présent de l'indicatif : nous chant-ons."
}
```

### English — Cloze
```js
{
  id: "g5en-gram-001", chapter: "grammar", topic: "fill-blank",
  type: "fill-blank", difficulty: 2, marks: 1,
  question: "She laughed __________ the funny joke. (at / in / for)",
  answer: "at",
  hint: "We 'laugh at' something funny.",
  explanation: "The correct preposition is 'at': she laughed at the joke."
}
```

---

## How another AI should add questions

1. Open the relevant question file (e.g. `subjects/grade5-maths/questions/ch01_numeration.js`)
2. Append new objects to the `QUESTIONS_G5_MATHS_CH01` array
3. Use sequential IDs: check the last ID and increment the number
4. Follow the schema above exactly — do not add fields not listed here
5. Keep `difficulty` aligned to the guide above
6. For MCQ: always use exactly 4 options labelled A/B/C/D
7. Test: no trailing commas before `]`, valid JSON-like JS syntax

The app reads these files at load time and merges them into the global `QUESTION_BANK` array.
The practice engine uses `chapter` to filter questions for the selected topic.
