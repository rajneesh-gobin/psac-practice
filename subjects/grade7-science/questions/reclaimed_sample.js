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
    id: "g7s-samp-001",
    chapterId: "g7s-inquiry",
    difficulty: 1,
    subsection: "lab_safety",
    question: "Why should long hair be tied back during a practical lesson?",
    options: ["It could catch fire or trail in chemicals","It makes the room look tidier","It helps you hear the teacher","It stops your goggles slipping"],
    answer: "It could catch fire or trail in chemicals",
    hint: "Think about what is on the bench in front of you.",
    explanation: "Loose hair can fall into a Bunsen flame or dip into a chemical without you noticing. The rule is about your safety, not about tidiness or hearing."
  })
);
