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
    id: "g8eng-samp-001",
    chapterId: "g8eng-listening",
    difficulty: 2,
    subsection: "fact_opinion",
    question: "A speaker says: <i>\"The library opened in 1998, and it is easily the most welcoming building in town.\"</i><br>Which part of this is an <b>opinion</b>?",
    options: ["That it is the most welcoming building","That the library opened in 1998","That the library is in the town","That the building is open to all"],
    answer: "That it is the most welcoming building",
    hint: "Which part could another person reasonably disagree with?",
    explanation: "A date can be checked in a record, so \"opened in 1998\" is a fact. \"Most welcoming\" is a judgement the speaker is making, and someone else could disagree — that makes it an opinion."
  })
);
