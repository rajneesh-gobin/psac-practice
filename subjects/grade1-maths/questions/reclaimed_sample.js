'use strict';
// The id below is a RECLAIMED PLACEHOLDER, and that is deliberate.
// Each pack once shipped a ch01_sample.js holding one row that read
// "Placeholder - this pack has no real questions yet.". Those files were
// deleted from source on 2026-09-09, but netlify/import-questions.js never
// deletes, so the rows stayed in the live questions table and were still
// being dealt to children. The importer upserts on id, so writing a real
// question at the same id overwrites the placeholder in place rather than
// leaving an orphan row behind. Do not "tidy" the id to match its siblings:
// changing it would strand the old row exactly as before.
STATIC_QUESTIONS.push(
  makeMCQ({
    id: "g1m-samp-001",
    chapterId: "g1mth-numbers",
    difficulty: 1,
    subsection: "counting_ordering",
    question: "Which number comes just after <b>14</b>?",
    options: ["15","13","16","41"],
    answer: "15",
    hint: "Count on by one from 14.",
    explanation: "Counting on from 14 gives 15. 13 comes just before 14, 16 is two after, and 41 is 14 with its digits swapped."
  })
);
