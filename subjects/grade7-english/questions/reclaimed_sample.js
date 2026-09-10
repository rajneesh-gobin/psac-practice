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
    id: "g7eng-samp-001",
    chapterId: "g7eng-listening",
    difficulty: 2,
    subsection: "identifying_message",
    question: "A speaker says: <i>\"I know the bus is cheaper, but it leaves you a twenty-minute walk in the rain, and you arrive late anyway.\"</i><br>What is the speaker's main message?",
    options: ["The bus is not worth the saving","The bus fare should be lowered","The walk is good exercise","The rain will stop soon"],
    answer: "The bus is not worth the saving",
    hint: "The word \"but\" tells you which side the speaker comes down on.",
    explanation: "The speaker admits the bus is cheaper, then lists two drawbacks after \"but\" — so the message is that the saving is not worth it. Nothing is said about fares, exercise or the weather clearing."
  })
);
