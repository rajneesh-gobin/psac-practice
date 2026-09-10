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
    id: "g2fr-samp-001",
    chapterId: "g2fr-grammaire",
    difficulty: 1,
    subsection: "nom_determinant",
    question: "Quel déterminant complète la phrase ?<br><b>___ maison est grande.</b>",
    options: ["La","Le","Les","Des"],
    answer: "La",
    hint: "« Maison » est un nom féminin au singulier.",
    explanation: "« Maison » est féminin singulier, donc on écrit « La maison ». « Le » est masculin, « Les » et « Des » sont au pluriel."
  })
);
