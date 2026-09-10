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
    id: "g8m-samp-001",
    chapterId: "g8m-sequences",
    difficulty: 2,
    subsection: "continuing_sequences",
    question: "What is the next term in this sequence?<br><b>3, 7, 11, 15, ...</b>",
    options: ["19","17","20","23"],
    answer: "19",
    hint: "Find what is added each time.",
    explanation: "Each term is 4 more than the one before: 3, 7, 11, 15. So the next term is 15 + 4 = 19. Adding 2 gives 17 and adding 8 gives 23, but neither matches the pattern."
  })
);
