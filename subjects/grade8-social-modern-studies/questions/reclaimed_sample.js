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
    id: "g8sms-samp-001",
    chapterId: "g8sms-slavery",
    difficulty: 2,
    subsection: "abolition_slavery",
    question: "In which year was slavery <b>abolished</b> in Mauritius?",
    options: ["1835","1810","1901","1968"],
    answer: "1835",
    hint: "It came about twenty-five years after the British took the island.",
    explanation: "Slavery was abolished in Mauritius in 1835, and indentured labourers began arriving from India soon after. 1810 is the British capture of the island and 1968 is independence."
  })
);
