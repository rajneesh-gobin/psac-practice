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
    id: "g8s-samp-001",
    chapterId: "g8s-inquiry",
    difficulty: 2,
    subsection: "lab_procedures",
    question: "When reading the volume of water in a measuring cylinder, where should your eye be?",
    options: ["Level with the bottom of the meniscus","Above the cylinder, looking down","Below the cylinder, looking up","Level with the top of the cylinder"],
    answer: "Level with the bottom of the meniscus",
    hint: "Looking from the wrong angle makes the reading too high or too low.",
    explanation: "Water curves down at the centre, and the reading is taken from the bottom of that curve with your eye level with it. Looking down or up introduces a parallax error and gives the wrong volume."
  })
);
