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
    id: "g3fr-samp-001",
    chapterId: "g3fr-grammaire",
    difficulty: 1,
    subsection: "accord_nom_adj",
    question: "Choisis la bonne forme de l'adjectif.<br><b>Les fleurs sont ___.</b>",
    options: ["belles","belle","beaux","beau"],
    answer: "belles",
    hint: "« Fleurs » est féminin pluriel : l'adjectif doit s'accorder.",
    explanation: "« Fleurs » est féminin pluriel, donc l'adjectif prend un e et un s : « belles ». « Beaux » serait masculin pluriel."
  })
);
