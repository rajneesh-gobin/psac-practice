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
    id: "g1eng-samp-001",
    chapterId: "g1eng-phonics",
    difficulty: 1,
    subsection: "initial_sounds",
    question: "Which word begins with the same sound as <b>ball</b>?",
    options: ["bus","cat","dog","sun"],
    answer: "bus",
    hint: "Say each word out loud and listen to the very first sound.",
    explanation: "\"Ball\" begins with the /b/ sound, and so does \"bus\". \"Cat\" begins with /k/, \"dog\" with /d/ and \"sun\" with /s/."
  })
);
