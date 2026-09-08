# Grade 9 English — MIE NCF/TLS Grades 7–9, extracted

Source: `past-papers/syllabus/NCF 7 to 9_230524.pdf` (330 pages, A4, Adobe InDesign 19.1).
Section **1.0 ENGLISH LANGUAGE**.

## Page offset — measured, not assumed

| | |
|---|---|
| Printed page number in footer of **PDF page 7** | **1** |
| Offset | **PDF page = printed page + 6** |
| Verified again at | PDF 8→"2", PDF 10→"4", PDF 13→"7", PDF 16→"10", PDF 19→"13" (each read off the rendered footer) |
| English occupies | **printed 1–13 = PDF pages 7–19** |
| Boundary confirmed | PDF page 20 is printed "14" and opens `2.0 FRENCH` |

**13 of 13 pages in range were rendered to PNG at 160 dpi and read visually** (`pdftoppm -png -r 160 -f 7 -l 19`). No page needed re-rendering larger; every cell in every table was legible at that resolution. Nothing in this document is inferred from `pdftotext` alone.

### The extraction defect this document exists to fix — confirmed present

`pdftotext -layout` genuinely interleaves these tables. Measured examples:

- **PDF 11 (printed 5, READING LO 1)** — text extraction emitted the level column as `3 4 5 / 3 4 5 / 1 2 3 / 1 2 3` bunched away from their rows, and **dropped two whole competency rows** ("Make and review assumptions predictions…", "Use word attack skills…"). The rendered page has them.
- **PDF 17 (printed 11)** — text extraction merged the `6. Adverbs` and `7. Modals` row labels into one line and pulled the Grade 9 adverbs text up beside the Grade 8 adverbs text, so the Grade-9 column looked fuller than it is.
- **PDF 9 (printed 3)** — the last LO 2 row ("Adhere to social norms and conventions while listening…") was truncated out of the text stream entirely.

Everything below is transcribed from the **images**.

## How the document distinguishes Grade 7 / 8 / 9 — two different mechanisms

This is the single most important structural fact, and the two halves of the syllabus do it differently:

1. **Skills half (printed 3–8): one shared competency list, three level columns.** Every competency statement applies to all three grades. What changes per grade is a **proficiency level 1–6** in the `Grade 7 | Grade 8 | Grade 9` columns. So "Grade 9 content" here is *not* a distinct list of topics — it is the same list read at a higher level. The level key (printed 2 / PDF 8) is:
   - 1 initiated, foundational, extensive teacher support
   - 2 further developed, aware of importance, with teacher support
   - 3 beginning to display, emerging confidence, teacher intervention still required
   - 4 extending and refining, starting to show independence, decreasing intervention
   - 5 continuing to extend and refine, growing proficiency, still requires facilitation
   - 6 confident, independent, sustained use, less facilitation
   - **A blank cell means the competency is not introduced in that grade at all.** Four Grade-9-only or Grade-8-onwards rows exist and are listed below.
2. **Grammar half (printed 9–13): one row per grammar item, three grade columns holding *different prose*.** Here Grade 9 has its own explicit content, and **two grammar items have an empty Grade 9 cell** — that is a fact about the syllabus, not a rendering failure (verified visually on PDF 17).

**Grade 9 content areas found: 20** — 11 learning outcomes across 3 skill strands, plus 9 of the 11 grammar items (Determiners and Modals carry no Grade 9 entry).

---

## Part 1 — Skills strands (printed 3–8 / PDF 9–14)

Levels shown as `G7/G8/G9`. Only the **G9** figure matters for this pack; the others are given so the progression is visible.

### Strand A — Communication Skills · Listening (printed 3 / PDF 9)

**LO 1: Demonstrate active listening according to situation and purpose**

| Competency | G7/G8/G9 |
|---|---|
| Listen to a range of aural texts (talk show, communiqué, news bulletin, documentary, conversation, interview, song) for different purposes | 3/4/**5** |
| Identify the purpose of aural texts (instruct, inform, persuade, entertain) | 3/4/**5** |
| Listen with sustained attention to texts of increasing duration, familiar or new topics, different speakers | 2/3/**4** |
| Listen for specific information and details according to purpose | 3/4/**5** |
| Follow the organisation of ideas; link information given implicitly or explicitly across parts of a text | 2/3/**4** |
| Use strategies to make up for communication gaps (infer meaning, deduce from paralinguistic features, use prior knowledge) | 1/2/**3** |
| Show awareness of the impact of a speaker's stylistic choices (specific words, expressions, registers, literary devices) | —/1/**2** |
| Interpret auditory *and* visual clues (irony, actions, gestures) in aural and audio-visual texts | 1/2/**3** |
| Respond appropriately to different speech acts (requests, directions, instructions) | 3/4/**5** |
| Listen critically (express likes/dislikes, agreement/disagreement) | 1/2/**3** |
| Listen for aesthetic sensitivity and appreciation | —/—/**1** |

**LO 2: Demonstrate good listening behaviours in communicative situations**

| Competency | G7/G8/G9 |
|---|---|
| Show interest (non-verbal cues: facial expression, nodding; verbal cues: "uh huh"; eye contact, posture) | 3/4/**5** |
| Listen with empathy and respect (sensitivity to what is said, understanding the speaker's view, respecting diverging views) | 2/3/**4** |
| Adhere to social norms and conventions while listening (eye contact, not commenting when not required, appropriate verbal/non-verbal response, not interrupting or side-talking, not being judgmental) | 3/4/**5** |

### Strand B — Communication Skills · Speaking (printed 4 / PDF 10)

**LO 3: Demonstrate the ability to communicate fluently and accurately in planned or spontaneous speech**

| Competency | G7/G8/G9 |
|---|---|
| Vary intonation, pitch, pace and register according to audience, message and purpose | 1/2/**3** |
| Pronounce correctly | 3/4/**5** |
| Use different language structures and forms (simple/complex/compound sentences; affirmative/negative/interrogative/imperative/exclamatory; active/passive voice) | 2/3/**4** |
| Use a range of appropriate vocabulary items to communicate with precision | 2/3/**4** |
| Convey ideas coherently and with clarity in a range of situations and purposes | 1/2/**3** |

**LO 4: Demonstrate the ability to engage in interaction with one or more persons**

| Competency | G7/G8/G9 |
|---|---|
| Engage in oral communication in English in different situations (classroom, social, leisure) | 1/2/**3** |
| Adhere to social norms and conventions (polite forms, turn-taking) | 2/3/**4** |
| Provide appropriate response according to situation, context and purpose | 1/2/**3** |
| Sustain a conversation (elaborate ideas, ask further questions) | 1/2/**3** |
| Provide views/arguments on topics/situations with ample justification | 1/2/**3** |
| Use strategies to overcome communication gaps (repeat, paraphrase, recast, gestures, facial expression, seek clarification) | 1/2/**3** |

### Strand C — Reading (printed 5–6 / PDF 11–12)

**LO 1: Demonstrate willingness and enthusiasm to engage in reading**

| Competency | G7/G8/G9 |
|---|---|
| Engage in individual/shared/guided reading for different purposes | 3/4/**5** |
| Show interest in different text types and genres (fiction, non-fiction, literary, factual, descriptive, narrative, websites, blogs) | 3/4/**5** |
| Discuss reading preferences (favourite author, favourite book, preferred genre) | 1/2/**3** |
| Read from a variety of information sources (website, magazines, dictionary, encyclopaedia) for specific tasks | 1/2/**3** |
| Engage in sustained silent reading for pleasure and learning | 1/2/**3** |
| Read increasingly challenging texts within and beyond the classroom | 1/2/**3** |

**LO 2: Demonstrate the ability to read aloud with fluency and accuracy**

| Competency | G7/G8/G9 |
|---|---|
| Apply decoding skills to read unfamiliar words | 1/2/**3** |
| Read aloud with correct pronunciation | 1/2/**3** |
| Read aloud to convey meaning through prosodic features (intonation, stress, pace, pause, volume) | 2/3/**4** |
| Use self-monitoring to read aloud with increasing proficiency (self-questioning, prior knowledge, asking for help, slowing down for complex structures, re-reading, underlining/highlighting difficult words) | 1/2/**3** |

**LO 3: Select and apply a range of strategies to read with understanding**

| Competency | G7/G8/G9 |
|---|---|
| Use text attack skills to derive meaning (title, layout, paragraphing) | 2/3/**4** |
| Decode visuals (tables, illustrations, pictures, graphics) in different text types for information | 3/4/**5** |
| Use knowledge of text organisation and structure to identify key ideas and specific information across genres (poster, letter, passage, play, poem, story) | 2/3/**4** |
| Identify specific information from texts | 3/4/**5** |
| Follow development of ideas in texts with growing independence | 2/3/**4** |
| Make and review assumptions/predictions based on information from texts, with growing independence | 3/4/**5** |
| Use word attack skills (root word, prefix, suffix, plural) | 3/4/**5** |
| Use knowledge of grammar to derive meaning from the text (position of adjectives, adverbs and conjunctions to indicate relation between ideas; tenses and time) | 1/2/**3** |
| Use self-monitoring for reading | 1/2/**3** |

**LO 4: Show appreciation of a variety of texts**

| Competency | G7/G8/G9 |
|---|---|
| Provide personal response to texts (likes, dislikes, opinions, emotions, agreement/disagreement, enjoyment) | 3/4/**5** |
| Express sensitivity to the use of language in texts | 1/2/**3** |
| Show awareness of author's message and intention in texts | 1/2/**3** |
| Make connections between text(s) and life experience / understanding of the world | 2/3/**4** |
| Provide creative responses to literary and non-literary texts (extend or modify a text, imagine a sequel, add a scene/dialogue/paragraph) | 2/3/**4** |
| Respond empathetically to texts | **all three cells are blank** |

> ⚠ "Respond empathetically to texts" carries **no level in any grade**. Verified visually on PDF 12 — the row exists, the three level cells are empty. Treated here as an apparent omission in the source, not as a Grade 9 requirement.

**LO 5: Demonstrate analytical skills when reading literary and non-literary texts**

| Competency | G7/G8/G9 |
|---|---|
| Discuss purpose of text (inform, entertain, persuade, argue, narrate) and intended audience | 1/2/**3** |
| Analyse plot, character, themes | 1/2/**3** |
| Explain how key literary devices (metaphor, imagery, personification, repetition, alliteration) construct meaning | 1/2/**3** |
| Use background and contextual knowledge for understanding of texts | 1/2/**3** |
| Produce informed and personal responses to texts supported by textual and contextual information | 1/2/**3** |
| Examine grammatical (adjectives, adverbs) and vocabulary choices with respect to character, theme, mood and tone | —/1/**2** |
| Analyse patterns, connections, contradictions and points of view within a text and/or across texts | —/—/**1** |

### Strand D — Writing (printed 7–8 / PDF 13–14)

**LO 1: Demonstrate willingness, interest and confidence when engaging in writing**

| Competency | G7/G8/G9 |
|---|---|
| Engage actively in shared and individual writing | 3/4/**5** |
| Produce texts that are increasingly challenging (postcard, letter, narratives, argumentative compositions) | 2/3/**4** |
| Follow the stages of the writing process (generating ideas, planning, drafting, editing, proofreading, publishing) with growing independence | 1/2/**3** |

**LO 2: Demonstrate the ability to write with clarity and accuracy**

| Competency | G7/G8/G9 |
|---|---|
| Spell words correctly using a range of strategies | 4/5/**6** |
| Use punctuation marks appropriately | 4/5/**6** |
| Use vocabulary appropriate to the situation to communicate with precision | 2/3/**4** |
| Write grammatically correct sentences (different types and structures — including Voice) | 2/3/**4** |
| Sequence ideas to produce well-structured texts of different genres | 2/3/**4** |
| Use cohesive devices to structure writing properly | 2/3/**4** |

> Spelling and punctuation are the **only two competencies in the whole English syllabus that reach level 6** at Grade 9. That is a direct signal about where a Grade 9 written paper puts its accuracy marks.

**LO 3: Produce a variety of texts using appropriate conventions**

| Competency | G7/G8/G9 |
|---|---|
| Write for different purposes (creative, functional, social, academic) | 2/3/**4** |
| Use appropriate format, style and register according to purpose and reader (inform, explain, express opinion, persuade, entertain, narrate, describe) | 2/3/**4** |
| Write a variety of creative texts (stories, tongue twisters, poems/slam, comic strips, dialogues, fictional diary entries, dramatic pieces, fictional newspaper articles, re-writing endings, creative reconstruction of stories/poems) | 1/2/**3** |

**LO 4: Develop texts by including relevant details according to genre and purpose**

| Competency | G7/G8/G9 |
|---|---|
| Compose texts with adequate information (character, plot, setting) | 2/3/**4** |
| Use descriptive language to enhance the text (describe persons, places, objects) | 2/3/**4** |
| Integrate dialogue to bring out character traits and further the plot | 1/2/**3** |
| Infuse creative elements (twists in plot, suspense, imaginative depictions, original ideas) | 1/2/**3** |
| Use literary devices (idioms, metaphors, similes) to enhance texts | 1/2/**3** |
| Support views with relevant arguments and adequate examples | —/1/**2** |

### Named components with no table of their own

Printed page 1 lists six components. Two of them get **no separate strand table**:

- **Vocabulary** — "embedded in all the components". It surfaces inside Reading LO 3 (word attack skills: root word, prefix, suffix, plural), Reading LO 5 (vocabulary choices and mood/tone), Speaking LO 3 and Writing LO 2 (precision).
- **Literature** — "an effective resource for language learning and a means to develop literary appreciation". It surfaces inside Reading LO 4 and LO 5 (plot, character, theme, literary devices, points of view across texts).

There is **no set-text list, no prescribed authors and no literature paper spec anywhere in printed pages 1–13.**

---

## Part 2 — GRAMMAR, exactly as the Grade 9 column states it

Printed 9–13 / PDF 15–19. Table `Grammar Items | Grade 7 | Grade 8 | Grade 9`. Everything below is the **Grade 9 cell only**, transcribed from the rendered pages. Where a cell is empty, it is empty in the document.

### 1. Nouns — printed 9 / PDF 15
- Use **nouns and noun phrases in apposition**. Example given: "John, the captain of the basketball team, is my brother."
- Nothing else. (Gerunds and noun-phrase expansion are the **Grade 8** cell; countable/uncountable agreement, subject–verb agreement with singular/plural/collective subjects, and verb/adjective→noun transformation are **Grade 7**.)

### 2. Pronouns — printed 9 / PDF 15
Exactly three items:
- **Reflexive pronouns** — "I hurt **myself**."
- **Emphasising pronouns** — "My father **himself** painted the house."
- **Relative pronouns `whom` and `whomever`**, used for different purposes.

> The Grade 8 cell holds **reciprocal** pronouns (*each other, one another*) and **interrogative** pronouns (*whom, whose*); the Grade 7 cell holds **indefinite** pronoun agreement (*anything, something, someone, anyone, everyone, everything*). None of those is Grade 9 content.

### 3. Adjectives — printed 10 / PDF 16
- Use **adjectives that function like nouns** — "the rich, the famous, the poor".
- Nothing else. (Adjective **order** and the *-ing* vs *-ed/-en* participle-adjective contrast are **Grade 8**.)

### 4. Verbs and Tenses — printed 10 / PDF 16
The Grade 9 cell names **exactly two tenses, and no others**:
- **Future Perfect** — "By this time next month, I will have got my results!"
- **Future Perfect Continuous** — "By this time next year, I will have been studying in this college for four years."

The wording is *"Become aware of the use of verbs in…"* — the weakest verb used anywhere in this table, and notably weaker than Grade 8's "Use".

Full tense ladder across the three grades, for question-writing context:
| Grade | Tenses named |
|---|---|
| 7 | Present Simple, Past Simple, Future Simple, Present Continuous (consolidate/extend); Past Continuous, Present Perfect, Past Perfect Simple (consolidate); **Future Continuous** (new) |
| 8 | **Present Perfect Continuous**, **Past Perfect Continuous** |
| 9 | **Future Perfect**, **Future Perfect Continuous** |

Grade 7 also owns transitive/intransitive verbs and auxiliary/main verb use in negative and interrogative transformation; Grade 8 owns noun/adjective→verb transformation (*able–enable; power–empower/disempower*). Neither is repeated at Grade 9.

### 5. Determiners: Articles and Quantifiers — printed 11 / PDF 17
**The Grade 9 cell is EMPTY.** Verified visually.
- Grade 7: uses of `the` (unique objects, as referent, before clusters of islands/states, before superlatives, category of objects); words taking no article (*bread*); quantifier–verb agreement for *no, each, every, fewer, another, other, both, either, neither*.
- Grade 8: differentiate words taking or not taking articles in specific situations ("I drink milk every day. / The milk had turned sour.")
- Grade 9: **nothing.**

### 6. Adverbs — printed 11 / PDF 17
- Use **adverbs that indicate the attitude of the speaker/writer** — *frankly, clearly, obviously*.
- Nothing else. (Adjective→adverb conversion, adverbs of reason/purpose *since, hence, therefore*, of duration *briefly, forever*, and of probability *certainly, definitely, maybe* are all **Grade 8**. Manner/place/time/degree/frequency and adverb position are **Grade 7**.)

### 7. Modals — printed 11 / PDF 17
**The Grade 9 cell is EMPTY.** Verified visually.
- Grade 7: consolidate **can, may, must, might**.
- Grade 8: use **could, would, should** for different purposes, e.g. polite requests ("Could you please close the door?").
- Grade 9: **nothing.** No modal is introduced, and no hypothetical/certainty modality is named — the only Grade 9 hypothetical work is the Perfect Conditional under Sentence structure.

### 8. Prepositions — printed 11 / PDF 17
- **"Extend the use of prepositions."**
- **"Extend the use of common phrasal verbs."**

That is the entire Grade 9 cell. **No individual preposition is named anywhere in the Grade 9 column, and none is named at Grade 7 or 8 either** — the only concrete examples in the whole row are the Grade 8 phrasal verbs *look up, look into, look out*. This is genuinely open-ended in the source; it is not an extraction failure, and any Grade 9 preposition question set has to choose its own inventory.

### 9. Sentence structure — printed 12 / PDF 18
- **Consolidate transformation of sentences from Active to Passive voice and vice versa.**
- **Construct sentences in the Perfect Conditional** — "If I had been in your place, I would have completed the work." (i.e. the third conditional)
- **Consolidate the construction and use of sentences in direct speech.**
- **Consolidate the construction and use of sentences in the Passive Voice.**

Conditional ladder: Future Conditional + Present Conditional = **G7**; Past Conditional ("If I had the money, I would give it to you") = **G8**; **Perfect Conditional = G9**.
Note that Grade 9 consolidates **direct** speech only — indirect speech and direct↔indirect conversion are **Grade 8** and are not restated at Grade 9.

### 10. Punctuation — printed 13 / PDF 19
Five items, all with worked examples in the source:
- **Comma before and after non-defining clauses** — "The men, who were at the top of the mountain, saw the beautiful valley below."
- **Single quotation marks for titles of books.**
- **Double quotation marks to quote the exact words** from a text or a person.
- **The dash**, for different purposes: to give extra information or indicate an additional thought/idea.
- **The semi-colon**, to separate two or more complete sentences — "I came home; I took a bath; I went to sleep."

Grade 7 owns full stop, comma, capital letters, colon, exclamation mark, question mark, comma after linking words and around apposition, and the colon before direct speech / before a list. Grade 8 owns **ellipsis points**. Neither is restated at Grade 9.

> ⚠ The dash example printed in the source is *"Dev went to La Croisette in Grand Bay to meet his friends."* — which contains **no dash**. The example is defective in the document. Do not copy it into a question; write a correct one.

### 11. Conjunctions — printed 13 / PDF 19
- **Extend the use of conjunctions:** *unless, due to, whereas, in order to, as though*.

Grade 7: *so that, but, although, however, for*. Grade 8: *whenever, whoever, wherever, since, despite, until*.

---

## Part 3 — Proposed subsection ids

Project style: `lowercase_with_underscores`, declared in `G9ENG_SYLLABUS`. Ids reused from `grade5-english` / `grade6-english` where the sibling id already fits are marked **(reused)**; the invariant that declared ids and tagged ids must match exactly per chapter still applies, so declare an id only when questions for it exist.

### Grammar chapters (content is exact, so these are safe to declare)

| Chapter | Proposed subsection ids |
|---|---|
| `g9eng-gr-nouns` | `apposition` |
| `g9eng-gr-pronouns` | `reflexive`, `emphasising`, `relative` **(reused)** |
| `g9eng-gr-adjectives` | `adjectives_as_nouns` |
| `g9eng-gr-verbs` | `future_perfect`, `future_perfect_continuous`, `tense_consistency` |
| `g9eng-gr-adverbs` | `attitude_adverbs` |
| `g9eng-gr-prepositions` | `prepositions`, `phrasal_verbs` |
| `g9eng-gr-sentence` | `voice` **(reused)**, `perfect_conditional`, `direct_speech` **(reused)** |
| `g9eng-gr-punctuation` | `non_defining_comma`, `quotation_marks`, `dash`, `semicolon` |
| *(new)* `g9eng-gr-conjunctions` | `conjunctions` **(reused)** |
| `g9eng-gr-determiners` | **none — no Grade 9 syllabus content exists** |
| `g9eng-gr-modals` | **none — no Grade 9 syllabus content exists** |

### Skills chapters

| Chapter | Proposed subsection ids |
|---|---|
| `g9eng-reading` | `retrieval` **(reused)**, `inference` **(reused)**, `authors_view` **(reused)**, `vocabulary` **(reused)**, `language` **(reused)**, `evidence` **(reused)**, `across_texts`, `text_features` |
| `g9eng-writing` | `planning` **(reused)**, `essay` **(reused)**, `descriptive` **(reused)**, `formal_letter` **(reused)**, `narrative`, `cohesion`, `register`, `spelling`, `punctuation` **(reused)** |
| `g9eng-listening` | see flag below — a written paper can only test the *transcript* form of these |
| `g9eng-speaking` | see flag below |

`across_texts` has no sibling equivalent and is worth adding: "Analyse patterns, connections, contradictions and points of view **within the text and/or across texts**" is the single Grade-9-only Reading competency (level 1 at G9, blank at G7 and G8).

---

## Part 4 — ⚠ What a written exam cannot assess

Flagged because two existing chapters carry exam weight for skills a paper never tests.

**Cannot be assessed on paper at all** (performance, live interaction, or attitude):

| Where | What |
|---|---|
| Listening LO 1, all 11 rows | Every one requires audio. "Listen for aesthetic sensitivity and appreciation" (G9-only) is additionally an attitude, not a performance. |
| Listening LO 2, all 3 rows | Eye contact, nodding, posture, not interrupting, not being judgmental — observed behaviour. |
| Speaking LO 3, all 5 rows | Intonation/pitch/pace, pronunciation, fluent delivery. |
| Speaking LO 4, all 6 rows | Turn-taking, sustaining a conversation, repairing communication gaps with gesture. |
| Reading LO 1, all 6 rows | Willingness, interest, discussing preferences, sustained silent reading — dispositions, not answers. |
| Reading LO 2, all 4 rows | Reading **aloud**: decoding aloud, pronunciation, prosody, self-monitoring while reading aloud. |
| Reading LO 4, "Respond empathetically" | Blank in all three grades anyway (see above). |
| Writing LO 1, "Engage actively in shared and individual writing" | Attitude/participation. |
| Writing LO 1, "Follow the stages of the writing process… with growing independence" | Process, observed over drafts — a single timed script cannot show it. |

**Assessable on paper, and where the marks realistically are:**
- All 11 grammar items (9 of which have Grade 9 content).
- Reading LO 3 (comprehension strategies), LO 4 (personal/creative response), LO 5 (analysis of purpose, plot, character, theme, literary devices, cross-text points of view).
- Writing LO 2 (spelling **level 6**, punctuation **level 6**, vocabulary precision, grammatical sentences incl. Voice, sequencing, cohesive devices), LO 3 (purpose/format/style/register, creative genres), LO 4 (detail, description, dialogue, literary devices, supported argument).

**Consequence for the pack:** `g9eng-listening` (`examWeight: 3`) and `g9eng-speaking` (`examWeight: 3`) together carry **6 of the pack's 32 weight units — 18.75% of every generated exam — for skills no written paper can test.** Options, in the project's own terms: drop both to `examWeight: 0` (⚠ note that `assembleExamPaper()` clamps with `Math.max(1, …)`, so 0 does **not** exclude a chapter — it still buys a slot, and only a chapter with no poolable question and no generator is dropped), or re-scope them as transcript-based / audio-script comprehension chapters and say so in the chapter name, or leave them out of the pack entirely and keep the syllabus prose on the syllabus screen only.

---

## Part 5 — Syllabus area ↔ existing chapter map

Read from `subjects/grade9-english/_manifest.js` (14 chapters, `comingSoon: true`, `G9ENG_SYLLABUS = {}` — deliberately empty). **That file was not modified.**

| Syllabus area (Grade 9) | Existing chapter | Verdict |
|---|---|---|
| Communication Skills · Listening (LO 1, LO 2) | `g9eng-listening` — *Listening & Comprehension*, w3 | Present. ⚠ Not paper-assessable. ⚠ Chapter prose invents "identify bias", "evaluate an argument", "take notes" — **none of those words appear in the syllabus**. |
| Communication Skills · Speaking (LO 3, LO 4) | `g9eng-speaking` — *Speaking & Oral Interaction*, w3 | Present. ⚠ Not paper-assessable. |
| Reading (LO 1–LO 5) | `g9eng-reading` — *Reading & Comprehension*, w4 | Present and broadly faithful. Missing the Grade-9-only "analyse patterns, connections, contradictions and points of view across texts". |
| Writing (LO 1–LO 4) | `g9eng-writing` — *Writing*, w4 | Present and faithful. Under-states that **spelling and punctuation are the only level-6 competencies**. |
| Grammar 1 · Nouns | `g9eng-gr-nouns` | ✅ Exact match (apposition). |
| Grammar 2 · Pronouns | `g9eng-gr-pronouns` | ⚠ **Wrong.** Chapter says "pronouns in complex sentences and in **reported speech**". Syllabus says **reflexive, emphasising, and relative `whom`/`whomever`**. Reported speech is Grade 8, and belongs to Sentence structure, not Pronouns. |
| Grammar 3 · Adjectives | `g9eng-gr-adjectives` | ✅ Exact match (adjectives functioning as nouns). |
| Grammar 4 · Verbs and Tenses | `g9eng-gr-verbs` | ⚠ **Wrong / far too broad.** Chapter says "a wide range of tenses… consistent tense across a whole text… passive voice". Syllabus Grade 9 names **only Future Perfect and Future Perfect Continuous**, and the passive belongs to Sentence structure. |
| Grammar 5 · Determiners, Articles, Quantifiers | `g9eng-gr-determiners`, w2 | ⚠ **Chapter with no Grade 9 syllabus area.** The Grade 9 cell is empty. Its prose ("consolidate… in extended writing") is invented. |
| Grammar 6 · Adverbs | `g9eng-gr-adverbs` | ✅ Exact match (speaker-attitude adverbs). |
| Grammar 7 · Modals | `g9eng-gr-modals`, w2 | ⚠ **Chapter with no Grade 9 syllabus area.** The Grade 9 cell is empty. Its prose ("degrees of certainty and hypothetical meaning") is invented. |
| Grammar 8 · Prepositions | `g9eng-gr-prepositions` | Present, and as vague as the source is. The chapter adds "in extended writing", which the syllabus does not say. Also **misses phrasal verbs**, which is half the Grade 9 cell. |
| Grammar 9 · Sentence structure | `g9eng-gr-sentence` | ✅ Faithful — active/passive both ways, Perfect Conditional, direct speech, passive voice. |
| Grammar 10 · Punctuation | `g9eng-gr-punctuation` | ⚠ Nearly right but **omits the semi-colon**, which is 1 of the 5 Grade 9 punctuation items. |
| **Grammar 11 · Conjunctions** | **— none —** | ⚠ **Syllabus area with no chapter.** *unless, due to, whereas, in order to, as though*. A new `g9eng-gr-conjunctions` chapter (or a `conjunctions` subsection under sentence structure, as `grade6-english` does with `g6eng-clauses`) is needed. |
| Vocabulary (named component) | — none — | Embedded across strands by design; both sibling PSAC packs nonetheless have a standalone `-vocabulary` chapter. A judgement call, not a defect. |
| Literature (named component) | — none — | No set texts are prescribed in printed 1–13. Covered indirectly by Reading LO 4/LO 5. |

### Summary of the map
- **Syllabus areas with no chapter: 1** — Conjunctions. (Plus Vocabulary and Literature as named-but-untabled components.)
- **Chapters with no Grade 9 syllabus area: 2** — `g9eng-gr-determiners`, `g9eng-gr-modals`. Both have an empty Grade 9 cell in the source.
- **Chapters whose `syllabus:` prose contradicts the source: 3** — `g9eng-gr-verbs` (much broader than Future Perfect / Future Perfect Continuous), `g9eng-gr-pronouns` (reported speech is Grade 8), `g9eng-listening` (bias/argument-evaluation/note-taking are not in the syllabus). Two more are incomplete: `g9eng-gr-punctuation` (no semi-colon) and `g9eng-gr-prepositions` (no phrasal verbs).
- **Chapters that match exactly: 4** — nouns, adjectives, adverbs, sentence structure.

## What was not readable

Nothing. Every cell on all 13 pages was legible at 160 dpi. The only blanks reported above (Determiners G9, Modals G7-column-only/G9, "Respond empathetically" all three grades, "Show awareness of stylistic choices" G7, "Listen for aesthetic sensitivity" G7+G8, "Examine grammatical and vocabulary choices" G7, "Analyse patterns… across texts" G7+G8, "Support views with relevant arguments" G7) are **empty cells in the document itself**, each confirmed on the rendered image.
