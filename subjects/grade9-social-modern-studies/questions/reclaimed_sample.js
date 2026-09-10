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
    id: "g9sms-samp-001",
    chapterId: "g9sms-economy-1960s",
    difficulty: 2,
    subsection: "sugar_dependence",
    question: "What was the main weakness of the Mauritian economy in the 1960s?",
    options: ["It depended on a single crop","It had no access to the sea","It relied on heavy industry","It had no working population"],
    answer: "It depended on a single crop",
    hint: "Think about what almost all export earnings came from.",
    explanation: "Almost all export earnings came from sugar, so a bad harvest or a fall in the world sugar price hit the whole economy at once. Diversifying away from that dependence was the central economic task after independence."
  })
);
