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
    id: "g1fr-samp-001",
    chapterId: "g1fr-grammaire",
    difficulty: 1,
    subsection: "noms_communs",
    question: "Quel mot est un <b>nom</b> ?<br><b>Le chien court.</b>",
    options: ["chien","court","avec","très"],
    answer: "chien",
    hint: "Un nom désigne une personne, un animal ou une chose.",
    explanation: "« Chien » désigne un animal : c'est un nom. « Court » est un verbe, il dit ce que le chien fait."
  })
);
