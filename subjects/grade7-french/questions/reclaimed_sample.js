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
    id: "g7fr-samp-001",
    chapterId: "g7fr-co",
    difficulty: 2,
    subsection: "type_texte_oral",
    question: "Tu entends : <i>« Prenez la deuxième rue à droite, puis continuez tout droit jusqu'au marché. »</i><br>De quel type de message s'agit-il ?",
    options: ["Un itinéraire","Une recette","Une publicité","Un bulletin météo"],
    answer: "Un itinéraire",
    hint: "Écoute les mots qui indiquent une direction.",
    explanation: "« Prenez la deuxième rue à droite » et « continuez tout droit » indiquent un chemin à suivre : c'est un itinéraire."
  })
);
