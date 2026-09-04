# French and English question-quality repair — 4 September 2026

Scope: local Grade 4–6 JavaScript practice banks. This is a structural scan and
targeted editorial review of faulty templates and source questions, not a claim
that every question has received an independent teacher review. No live database
import or deployment was performed.

## English repairs

- Present-continuous and present-perfect answers now fit their blanks without
  repeating the verb phrase already in the question.
- Adjective templates no longer produce “a fluffy a cloud”; vowel-sound examples
  use “an exciting story” and “an easy problem”.
- Article exercises specify the indefinite article and no longer ask pupils to
  imagine seeing an hour near a gate.
- Adverb questions specify manner, since “tomorrow” is also an adverb.
- Auxiliary exercises distinguish a current action from a past one, and modal
  exercises explicitly request a modal verb.
- Past-tense prompts no longer repeat “yesterday”.
- Comparative distractors use real comparative/superlative forms; the subjective
  book/comic comparison is explicitly an opinion.
- Grade 5 adjective-order questions identify the noun being described; the
  fragment question specifies the reason conjunction rather than offering three
  valid fragments. Determiner questions state the intended quantity/meaning.
- Repeated spelling distractors replaced; punctuation distractors correctly
  remove punctuation inside a closing quotation mark.

## French repairs and integration

Concurrent local work supplied verb-specific completions, unique generated choices,
corrected Grade 5 subjunctive subject agreement, and coherent Grade 6 tense and
connector templates. These changes were preserved and tested, not overwritten.

Additional corrections in this review:

- Masculine nouns beginning with a vowel are not inferred to be feminine from
  the article “l’”. The question supplies the indefinite article, resolving
  ambiguous nouns such as “enfant”.
- Article questions specify definite or indefinite articles.
- Position questions provide a precise meaning clue instead of arbitrarily
  marking one possible location correct.
- Adjective agreement exercises ask for grammatical forms rather than creating
  combinations such as a happy house or a blue boy.
- “Nous mangions” and “vous mangiez” use the correct imperfect stem.
- Imagined-scene colour questions state the colour, and “deux enfants” takes
  “sont”. These remain explicitly imagined scenes, not newly supplied photographs.
- Six handwritten French questions receive distinct distractors.
- All 150 original Grade 6 connector IDs are retained. Each coherent example now
  supports five different tasks: choosing a connector, identifying its relation,
  finding the connector, finding the subordinate clause and finding the main clause.
  This avoids leaving 120 obsolete records untouched on the next upsert import.

## Verification and release

- `node scripts/test-english-language-quality.js`: all 1,600 English questions;
  checks both runtime options and direct source distractor pools plus repaired examples.
- `node scripts/test-french-context-quality.js`: all 5,673 French questions;
  source distractors, targeted language assertions and preserved counts/connector IDs.
- `node scripts/test-french-bank-quality.js`: generated French template checks.
- `node scripts/check.js`: application static checks.

These tests do not establish semantic correctness for every possible question.
Repetitive low-value items, weak distractors, subsection classification, and
capitalisation-sensitive grading still deserve a separate editorial/product pass.

Deploy the updated site and run the usual question importer when ready. Existing
protected database questions are intentionally not overwritten; review protection
on any affected question that still shows the old wording after import. Publishing
local files alone does not update database-held question content.
