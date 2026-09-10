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
    id: "g9eng-samp-001",
    chapterId: "g9eng-listening",
    difficulty: 2,
    question: "A speaker begins: <i>\"There are three points I want to make, and the last one matters most.\"</i><br>What should a listener do with this information?",
    options: ["Expect three points and listen hardest for the third","Write down only the first point","Assume the talk has finished","Ignore the order the points come in"],
    answer: "Expect three points and listen hardest for the third",
    hint: "The speaker has just told you how the talk is organised.",
    explanation: "A signpost like this tells you the structure in advance: three points are coming, and the speaker has flagged the third as the important one. Knowing that lets you listen and take notes with the right emphasis."
  })
);
