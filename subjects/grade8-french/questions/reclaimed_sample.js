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
    id: "g8fr-samp-001",
    chapterId: "g8fr-co",
    difficulty: 2,
    subsection: "schema_communication",
    question: "Un journaliste présente le journal télévisé du soir.<br>Qui est le <b>destinataire</b> du message ?",
    options: ["Les téléspectateurs","Le journaliste","La chaîne de télévision","Le studio d'enregistrement"],
    answer: "Les téléspectateurs",
    hint: "Le destinataire est celui qui reçoit le message.",
    explanation: "Le journaliste est l'émetteur : il envoie le message. Les téléspectateurs le reçoivent, ils sont donc les destinataires."
  })
);
