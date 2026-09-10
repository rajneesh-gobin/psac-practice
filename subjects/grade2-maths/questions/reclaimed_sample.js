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
    id: "g2m-samp-001",
    chapterId: "g2mth-numbers",
    difficulty: 1,
    subsection: "place_value",
    question: "In the number <b>47</b>, what does the digit <b>4</b> stand for?",
    options: ["4 tens","4 ones","7 tens","7 ones"],
    answer: "4 tens",
    hint: "Which column is the 4 sitting in?",
    explanation: "47 is 4 tens and 7 ones, so the 4 stands for 4 tens, which is 40. The 7 is the one that stands for 7 ones."
  })
);
