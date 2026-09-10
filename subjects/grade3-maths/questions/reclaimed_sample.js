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
    id: "g3m-samp-001",
    chapterId: "g3mth-numbers",
    difficulty: 1,
    subsection: "place_value_hto",
    question: "In the number <b>528</b>, which digit is in the <b>tens</b> place?",
    options: ["2","5","8","0"],
    answer: "2",
    hint: "Read the columns from the right: ones, then tens, then hundreds.",
    explanation: "528 is 5 hundreds, 2 tens and 8 ones. The tens digit is 2. The 5 is in the hundreds place and the 8 is in the ones place."
  })
);
