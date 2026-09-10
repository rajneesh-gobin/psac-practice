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
    id: "g3eng-samp-001",
    chapterId: "g3eng-grammar",
    difficulty: 1,
    subsection: "parts_of_speech",
    question: "Which word is the <b>adjective</b> in this sentence?<br><b>The tall boy ran quickly.</b>",
    options: ["tall","boy","ran","quickly"],
    answer: "tall",
    hint: "An adjective describes a noun.",
    explanation: "\"Tall\" describes the boy, so it is the adjective. \"Boy\" is the noun, \"ran\" is the verb, and \"quickly\" is an adverb describing how he ran."
  })
);
