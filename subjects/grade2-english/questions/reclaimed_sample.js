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
    id: "g2eng-samp-001",
    chapterId: "g2eng-grammar",
    difficulty: 1,
    subsection: "nouns_pronouns",
    question: "Which word is the <b>naming word</b> (noun) in this sentence?<br><b>The bird sings loudly.</b>",
    options: ["bird","sings","loudly","very"],
    answer: "bird",
    hint: "A naming word tells you the person, animal, place or thing.",
    explanation: "\"Bird\" names the animal, so it is the noun. \"Sings\" is what the bird does, and \"loudly\" tells you how it sings."
  })
);
