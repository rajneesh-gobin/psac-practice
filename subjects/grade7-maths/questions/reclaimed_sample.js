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
    id: "g7m-samp-001",
    chapterId: "g7m-integers",
    difficulty: 2,
    subsection: "operations",
    question: "What is the value of <b>-8 + 15 - 4</b>?",
    options: ["3","7","11","27"],
    answer: "3",
    hint: "Work from left to right: deal with -8 + 15 first.",
    explanation: "-8 + 15 = 7, and 7 - 4 = 3. Stopping at 7 forgets the last step; 27 comes from adding all three numbers as positives."
  })
);
