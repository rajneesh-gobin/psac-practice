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
    id: "g9fr-samp-001",
    chapterId: "g9fr-grammaire",
    difficulty: 2,
    subsection: "temps_modes",
    question: "Choisis la forme correcte.<br><b>Si j'avais le temps, je ___ avec vous.</b>",
    options: ["viendrais","viendrai","venais","viens"],
    answer: "viendrais",
    hint: "Après « si » + imparfait, la seconde partie se met au conditionnel présent.",
    explanation: "La structure est « si + imparfait, conditionnel présent » : « Si j'avais le temps, je viendrais ». « Viendrai » est le futur simple, qui suivrait « si » + présent."
  })
);
