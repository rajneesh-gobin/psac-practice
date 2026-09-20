'use strict';
// Grade 5 English - the nine items the NCF Grade 5 grammar column names and the
// pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade5-english.json is built from
//   the NCF GRAMMAR SYLLABUS table (MIE syllabus, printed pages 19-22), Grade 5
//   column. Against 823 questions it reported nine with nothing behind them:
//     ⚠ the whole ADJECTIVE-CATEGORY strand - shape, origin and material, which
//       are the syllabus's own examples ("a French film", "a wooden spoon");
//     ⚠ the PAST CONTINUOUS TENSE - zero hits for "past continuous", and none
//       for "was playing" or "were playing" either;
//     plus 'the' for something already mentioned, 'the' with island-cluster
//     countries, 'must' for necessity, prepositions of time, and 'before' used
//     as a conjunction.
//
// ⚠ Two new subsections, `prepositions` and `conjunctions`, on eng-sentences -
//   the chapter that already holds punctuation, sentence types and direct
//   speech. Both ids are reused from sibling packs (grade9-english carries
//   `prepositions`, grade6-english `conjunctions`) rather than invented. Both are
//   declared in _manifest.js; declared and tagged ids must match exactly or
//   scripts/test-subsection-invariant.js fails.
//
// IDs: g5eng-syl-001 onwards.

STATIC_QUESTIONS.push(

  // ── Adjectives of shape, origin and material ───────────────────────────
  makeMCQ({ id:'g5eng-syl-001', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:1,
    question:'Which adjective describes the <b>shape</b> of something?',
    options:['oval','wooden','Chinese','noisy'], answer:'oval',
    hint:'Shape tells you what form a thing has: round, square, oval.',
    explanation:'<b>Oval</b> tells us the shape. "Wooden" is material, "Chinese" is origin and "noisy" is opinion.' }),

  makeMCQ({ id:'g5eng-syl-002', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'In <i>a rectangular table</i>, what does the adjective tell us?',
    options:['Its shape','Its colour','Where it came from','What it is made of'], answer:'Its shape',
    hint:'A rectangle is a form, not a colour or a country.',
    explanation:'"Rectangular" gives the <b>shape</b> of the table. Adjectives of shape answer the question "what form is it?"' }),

  makeMCQ({ id:'g5eng-syl-003', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Which adjective tells us the <b>origin</b> of something?',
    options:['French','square','plastic','heavy'], answer:'French',
    hint:'Origin means where a thing or a person comes from.',
    explanation:'<b>French</b> tells us where something comes from, so it is an adjective of origin &mdash; as in "a French film".' }),

  makeMCQ({ id:'g5eng-syl-004', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'In <i>Mauritian sugar</i>, what does the adjective tell us?',
    options:['Its origin','Its shape','Its material','Its price'], answer:'Its origin',
    hint:'It names the country the sugar comes from.',
    explanation:'"Mauritian" gives the <b>origin</b> of the sugar. Adjectives of origin usually start with a capital letter.' }),

  makeMCQ({ id:'g5eng-syl-005', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Which adjective tells us the <b>material</b> something is made of?',
    options:['wooden','oval','Indian','careful'], answer:'wooden',
    hint:'Material means the stuff a thing is made from.',
    explanation:'<b>Wooden</b> says what the thing is made of, so it is an adjective of material &mdash; as in "a wooden spoon".' }),

  makeMCQ({ id:'g5eng-syl-006', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'In <i>a plastic bucket</i>, what does the adjective tell us?',
    options:['Its material','Its shape','Its origin','Its age'], answer:'Its material',
    hint:'Ask what the bucket is made from.',
    explanation:'"Plastic" names the <b>material</b> the bucket is made of.' }),

  makeMCQ({ id:'g5eng-syl-007', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:3,
    question:'In <i>a round Chinese metal tray</i>, which adjective gives the <b>material</b>?',
    options:['metal','round','Chinese','tray'], answer:'metal',
    hint:'Take each adjective in turn and ask what kind of information it gives.',
    explanation:'"Round" is shape, "Chinese" is origin and <b>metal</b> is the material. English usually puts them in that order: shape, origin, material.' }),

  makeMCQ({ id:'g5eng-syl-008', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:4,
    question:'Which sentence puts the adjectives of shape, origin and material in the usual English order?',
    options:['She bought a square Italian leather bag.','She bought a leather square Italian bag.','She bought an Italian leather square bag.','She bought a leather Italian square bag.'], answer:'She bought a square Italian leather bag.',
    hint:'The order runs shape, then origin, then material.',
    explanation:'English puts <b>shape before origin before material</b>: a <i>square</i> (shape) <i>Italian</i> (origin) <i>leather</i> (material) bag.' }),

  // ── The Past Continuous Tense ──────────────────────────────────────────
  makeMCQ({ id:'g5eng-syl-009', chapterId:'eng-verbs', subsection:'continuous', difficulty:1,
    question:'Which sentence is in the <b>Past Continuous Tense</b>?',
    options:['She was reading a book.','She reads a book.','She has read a book.','She will read a book.'], answer:'She was reading a book.',
    hint:'Look for "was" or "were" with a verb ending in -ing.',
    explanation:'The <b>Past Continuous</b> is made of <i>was</i> or <i>were</i> plus a verb ending in -ing: "She was reading."' }),

  makeMCQ({ id:'g5eng-syl-010', chapterId:'eng-verbs', subsection:'continuous', difficulty:2,
    question:'How is the <b>Past Continuous Tense</b> formed?',
    options:['was or were + verb + ing','has or have + verb','will + verb','did + verb'], answer:'was or were + verb + ing',
    hint:'Two parts: a helper verb in the past, then the -ing form.',
    explanation:'<b>Was/were + verb + -ing</b>. "Were" goes with you, we and they; "was" with I, he, she and it.' }),

  makeMCQ({ id:'g5eng-syl-011', chapterId:'eng-verbs', subsection:'continuous', difficulty:2,
    question:'Complete in the <b>Past Continuous</b>: <i>The children ___ in the yard when it started to rain.</i>',
    options:['were playing','are playing','have played','will play'], answer:'were playing',
    hint:'"The children" is plural, so use the plural helper verb.',
    explanation:'"The children" is plural, so we use <b>were playing</b>. The action was going on when something else happened.' }),

  makeMCQ({ id:'g5eng-syl-012', chapterId:'eng-verbs', subsection:'continuous', difficulty:3,
    question:'What does the <b>Past Continuous Tense</b> show?',
    options:['An action that was going on in the past','An action finished long ago','An action that will happen','An action that happens every day'], answer:'An action that was going on in the past',
    hint:'Think of an action still in progress at that moment.',
    explanation:'The Past Continuous shows an action that was <b>going on</b> at a moment in the past, often when something else interrupted it.' }),

  makeMCQ({ id:'g5eng-syl-013', chapterId:'eng-verbs', subsection:'continuous', difficulty:3,
    question:'Which is correct? <i>While I ___ my homework, the lights went out.</i>',
    options:['was doing','did','have done','do'], answer:'was doing',
    hint:'One long action is interrupted by a short one.',
    explanation:'The homework was in progress, so it takes the <b>Past Continuous</b>: "While I was doing my homework...". The interruption takes the simple past.' }),

  makeMCQ({ id:'g5eng-syl-014', chapterId:'eng-verbs', subsection:'continuous', difficulty:4,
    question:'What is the difference between <i>She cooked</i> and <i>She was cooking</i>?',
    options:['The second shows it was still going on','The second shows it never happened','The first shows a future plan','There is no difference at all'], answer:'The second shows it was still going on',
    hint:'Ask whether the action is finished or in progress.',
    explanation:'"She cooked" is finished; "She was cooking" shows the action was <b>still going on</b> at that moment &mdash; which is why it so often ends "...when the phone rang".' }),

  // ── 'The' for something already mentioned ─────────────────────────────
  makeMCQ({ id:'g5eng-syl-015', chapterId:'eng-nouns', subsection:'articles', difficulty:2,
    question:'Which article do we use for something <b>already mentioned</b>?',
    options:['the','a','an','no article'], answer:'the',
    hint:'The first time we say "a dog"; the second time we say something different.',
    explanation:'We use <b>the</b> once the listener already knows which one we mean: "I saw a dog. <i>The</i> dog was barking."' }),

  makeMCQ({ id:'g5eng-syl-016', chapterId:'eng-nouns', subsection:'articles', difficulty:2,
    question:'Complete: <i>I bought a pen and a book. ___ pen was blue.</i>',
    options:['The','A','An','No word'], answer:'The',
    hint:'The pen has been mentioned once already.',
    explanation:'The pen was <b>already mentioned</b>, so we say "<b>The</b> pen was blue." "A pen" would sound like a different pen.' }),

  makeMCQ({ id:'g5eng-syl-017', chapterId:'eng-nouns', subsection:'articles', difficulty:3,
    question:'Why is "the" correct here? <i>A boy came in. The boy was crying.</i>',
    options:['The boy has already been mentioned','The boy is very young','"The" is always used with boy','The sentence is a question'], answer:'The boy has already been mentioned',
    hint:'Compare what the reader knows in the first sentence and in the second.',
    explanation:'In the second sentence the reader knows which boy is meant, because he was <b>already mentioned</b>. That is exactly when English switches from "a" to "the".' }),

  // ── 'The' with countries made of clusters of islands or states ─────────
  makeMCQ({ id:'g5eng-syl-018', chapterId:'eng-nouns', subsection:'articles', difficulty:2,
    question:'Which is correct?',
    options:['We sailed to the Seychelles.','We sailed to Seychelles island.','We sailed to a Seychelles.','We sailed to Seychelles the.'], answer:'We sailed to the Seychelles.',
    hint:'Some country names are groups of islands, and they take an article.',
    explanation:'A country made of a <b>cluster of islands</b> takes "the": <b>the Seychelles</b>, the Maldives, the Comoros.' }),

  makeMCQ({ id:'g5eng-syl-019', chapterId:'eng-nouns', subsection:'articles', difficulty:3,
    question:'Which country name needs <b>the</b> in front of it?',
    options:['United States','Mauritius','India','Madagascar'], answer:'United States',
    hint:'One of these is a group of states rather than a single place.',
    explanation:'We say <b>the United States</b>, because the name describes a group of states. Mauritius, India and Madagascar take no article.' }),

  makeMCQ({ id:'g5eng-syl-020', chapterId:'eng-nouns', subsection:'articles', difficulty:3,
    question:'Why do we say "the Maldives" but simply "Mauritius"?',
    options:['The Maldives is a group of islands','Mauritius is a smaller country','The Maldives is further away','Mauritius begins with a capital letter'], answer:'The Maldives is a group of islands',
    hint:'Count the islands each name stands for.',
    explanation:'Names standing for a <b>group of islands or states</b> take "the"; a single-name country like Mauritius does not.' }),

  // ── 'Must' for necessity ───────────────────────────────────────────────
  makeMCQ({ id:'g5eng-syl-021', chapterId:'eng-verbs', subsection:'auxiliary', difficulty:2,
    question:'In <i>You must drink your medicine on time</i>, what does <b>must</b> express?',
    options:['A necessity','A choice','A wish','A possibility'], answer:'A necessity',
    hint:'Is there any option here, or is it something that has to happen?',
    explanation:'"Must" here expresses a <b>necessity</b> &mdash; something that has to be done for a good reason, not something you may choose.' }),

  makeMCQ({ id:'g5eng-syl-022', chapterId:'eng-verbs', subsection:'auxiliary', difficulty:3,
    question:'Which sentence uses <b>must</b> to show a <b>necessity</b>?',
    options:['Plants must have water to live.','You must come to school on time.','You must sit down, please.','We must meet again soon.'], answer:'Plants must have water to live.',
    hint:'A necessity is something without which the thing cannot work at all.',
    explanation:'Without water a plant cannot live, so that is a <b>necessity</b>. "You must come on time" is an obligation set by a rule, which is the other use of "must".' }),

  makeMCQ({ id:'g5eng-syl-023', chapterId:'eng-verbs', subsection:'auxiliary', difficulty:4,
    question:'What is the difference between an obligation and a <b>necessity</b> when we use "must"?',
    options:['An obligation comes from a rule, a necessity from nature','They mean exactly the same thing','A necessity is always polite','An obligation is always about the future'], answer:'An obligation comes from a rule, a necessity from nature',
    hint:'Ask who or what is making the demand.',
    explanation:'"You must wear uniform" is an <b>obligation</b> set by a rule; "You must breathe to live" is a <b>necessity</b> set by nature. The syllabus names both uses of "must".' }),

  // ── Prepositions of time ───────────────────────────────────────────────
  makeMCQ({ id:'g5eng-syl-024', chapterId:'eng-sentences', subsection:'prepositions', difficulty:1,
    question:'Which <b>preposition</b> of <b>time</b> completes the sentence? <i>We have music ___ Tuesday.</i>',
    options:['on','in','at','of'], answer:'on',
    hint:'Days of the week take one particular preposition.',
    explanation:'Days of the week take <b>on</b>: on Tuesday, on Monday morning.' }),

  makeMCQ({ id:'g5eng-syl-025', chapterId:'eng-sentences', subsection:'prepositions', difficulty:2,
    question:'Which <b>preposition</b> of <b>time</b> completes the sentence? <i>It rained a lot ___ the week.</i>',
    options:['during','on','at','to'], answer:'during',
    hint:'The rain went on throughout that whole period.',
    explanation:'<b>During</b> shows that something happened all through a period of time: during the week, during the holidays.' }),

  makeMCQ({ id:'g5eng-syl-026', chapterId:'eng-sentences', subsection:'prepositions', difficulty:2,
    question:'Which <b>preposition</b> of <b>time</b> goes with a clock time? <i>The bus leaves ___ six o&rsquo;clock.</i>',
    options:['at','on','in','during'], answer:'at',
    hint:'Clock times take the shortest of these words.',
    explanation:'Clock times take <b>at</b>: at six o&rsquo;clock, at noon, at midnight.' }),

  makeMCQ({ id:'g5eng-syl-027', chapterId:'eng-sentences', subsection:'prepositions', difficulty:3,
    question:'Which <b>preposition</b> of <b>time</b> goes with a month? <i>The cyclone season starts ___ November.</i>',
    options:['in','on','at','during'], answer:'in',
    hint:'Months and years take the same preposition.',
    explanation:'Months, seasons and years take <b>in</b>: in November, in summer, in 2026.' }),

  makeMCQ({ id:'g5eng-syl-028', chapterId:'eng-sentences', subsection:'prepositions', difficulty:4,
    question:'Which sentence uses every <b>preposition</b> of <b>time</b> correctly?',
    options:['We met at noon on Friday in June.','We met in noon at Friday on June.','We met on noon in Friday at June.','We met at noon in Friday on June.'], answer:'We met at noon on Friday in June.',
    hint:'Clock time, then day, then month - each takes its own word.',
    explanation:'<b>At</b> for a clock time, <b>on</b> for a day and <b>in</b> for a month: "at noon on Friday in June".' }),

  // ── 'Before' as a conjunction ─────────────────────────────────────────
  makeMCQ({ id:'g5eng-syl-029', chapterId:'eng-sentences', subsection:'conjunctions', difficulty:2,
    question:'Which <b>conjunction</b> joins these? <i>Wash your hands. Then you eat.</i>',
    options:['before','because','although','however'], answer:'before',
    hint:'The washing comes first in time.',
    explanation:'<b>Before</b> joins the two and shows which happened first: "Wash your hands <b>before</b> you eat."' }),

  makeMCQ({ id:'g5eng-syl-030', chapterId:'eng-sentences', subsection:'conjunctions', difficulty:2,
    question:'What does the <b>conjunction</b> "<b>before</b>" tell us?',
    options:['Which action happened first','Why something happened','Where something happened','Who did the action'], answer:'Which action happened first',
    hint:'It is a conjunction of time, not of reason or place.',
    explanation:'"Before" is a conjunction of <b>time</b>: it tells us <b>which action came first</b>.' }),

  makeMCQ({ id:'g5eng-syl-031', chapterId:'eng-sentences', subsection:'conjunctions', difficulty:3,
    question:'In <i>She locked the door before she left</i>, which happened first?',
    options:['She locked the door','She left','Both at the same time','The sentence does not say'], answer:'She locked the door',
    hint:'The action in front of the conjunction "before" comes first.',
    explanation:'What comes before the word "before" happened first: <b>she locked the door</b>, and only then did she leave.' }),

  makeMCQ({ id:'g5eng-syl-032', chapterId:'eng-sentences', subsection:'conjunctions', difficulty:4,
    question:'Rewrite with the <b>conjunction</b> "<b>before</b>": <i>The bell rang. Then the pupils went in.</i>',
    options:['The bell rang before the pupils went in.','The pupils went in before the bell rang.','Before the bell rang, it rang again.','The bell rang, before.'], answer:'The bell rang before the pupils went in.',
    hint:'Put the earlier action in front of the word "before".',
    explanation:'The bell rang first, so it goes in front: "The bell rang <b>before</b> the pupils went in." Swapping them would reverse the meaning.' })

);
