'use strict';
// Memory Reef — curated French ↔ English vocabulary pairs.
//
// ⚠ CURATED ON PURPOSE, not drawn from the question bank. A game must never
//   depend on a subject being loaded or entitled — the Game Zone is reachable
//   by any child, including one whose French pack is not in their plan.
// ⚠ And NOT reused from MINIGAME_WORDS: those are spelling clues, not
//   translations, and a clue is written to describe a word rather than to be
//   its exact equivalent.
//
// ⚠ THE BOARD INVARIANT: on any one board, a French word maps to exactly one
//   English word and vice versa. A child who flips "la mer" and then "ocean"
//   has been told they are wrong about something they are right about, which is
//   worse than a hard board. Two guards keep that true:
//     1. `fr` and `en` are unique across this whole file.
//     2. `group` binds pairs that are near-enough to argue about (wardrobe vs
//        cupboard, foot vs leg). _reefPick() takes AT MOST ONE pair per group
//        onto a board. Most pairs need no group — cat and dog are not
//        confusable, they are just both animals.
//
// Bands follow the child's grade, and set both the vocabulary and the board
// size (see _REEF_BOARDS in minigame.js): 1 → 4×3, 2 → 4×4, 3 → 5×4.
//
// ⚠ Articles are part of the French side deliberately. Gender is examinable and
//   a bare noun teaches it wrong; "le chat" is the thing a child must learn.
//
// ⚠ Cognates are avoided (la table/table, le courage/courage): a pair a child
//   can match without knowing any French is a free tile, not a question.
window.MINIGAME_PAIRS = [

  // ── Band 1 — Grades 1-4: concrete, everyday nouns ─────────────────────────
  { band: 1, fr: 'le chat', en: 'cat' },
  { band: 1, fr: 'le chien', en: 'dog' },
  { band: 1, fr: 'la maison', en: 'house' },
  { band: 1, fr: "l'école", en: 'school' },
  { band: 1, fr: 'le livre', en: 'book' },
  { band: 1, fr: 'la porte', en: 'door' },
  { band: 1, fr: 'la fenêtre', en: 'window' },
  { band: 1, fr: "l'eau", en: 'water' },
  { band: 1, fr: 'le pain', en: 'bread' },
  { band: 1, fr: 'la pomme', en: 'apple' },
  { band: 1, fr: 'le lait', en: 'milk' },
  { band: 1, fr: 'la chaise', en: 'chair' },
  { band: 1, fr: 'le soleil', en: 'sun' },
  { band: 1, fr: 'la lune', en: 'moon' },
  { band: 1, fr: 'la mer', en: 'sea' },
  { band: 1, fr: 'le poisson', en: 'fish' },
  { band: 1, fr: "l'oiseau", en: 'bird' },
  { band: 1, fr: 'la fleur', en: 'flower' },
  { band: 1, fr: "l'arbre", en: 'tree' },
  { band: 1, fr: 'le lit', en: 'bed' },
  { band: 1, fr: 'la main', en: 'hand' },
  // ⚠ Grouped: a child translating loosely will accept either for the other.
  { band: 1, fr: 'le pied', en: 'foot', group: 'leg' },
  { band: 1, fr: 'la jambe', en: 'leg', group: 'leg' },

  // ── Band 2 — Grades 5-6: home, school and the street ──────────────────────
  { band: 2, fr: 'la cuisine', en: 'kitchen' },
  { band: 2, fr: 'le marché', en: 'market' },
  { band: 2, fr: 'la plage', en: 'beach' },
  { band: 2, fr: 'le voisin', en: 'neighbour' },
  { band: 2, fr: 'le médecin', en: 'doctor' },
  { band: 2, fr: 'la cour', en: 'courtyard' },
  { band: 2, fr: 'le cartable', en: 'schoolbag' },
  { band: 2, fr: 'la montre', en: 'watch' },
  { band: 2, fr: 'le parapluie', en: 'umbrella' },
  { band: 2, fr: 'la clé', en: 'key' },
  { band: 2, fr: 'le couteau', en: 'knife' },
  { band: 2, fr: 'la cuillère', en: 'spoon' },
  { band: 2, fr: "l'assiette", en: 'plate' },
  { band: 2, fr: 'le tiroir', en: 'drawer' },
  { band: 2, fr: "l'escalier", en: 'staircase' },
  { band: 2, fr: 'le trottoir', en: 'pavement' },
  { band: 2, fr: 'la ceinture', en: 'belt' },
  { band: 2, fr: 'la serviette', en: 'towel' },
  { band: 2, fr: 'le savon', en: 'soap' },
  { band: 2, fr: 'le mouchoir', en: 'handkerchief' },
  { band: 2, fr: 'le poulet', en: 'chicken' },
  // ⚠ Grouped: both are "somewhere you put things", and primary classes teach
  //   them within a week of each other.
  { band: 2, fr: "l'armoire", en: 'wardrobe', group: 'storage' },
  { band: 2, fr: 'le placard', en: 'cupboard', group: 'storage' },

  // ── Band 3 — Grades 7-9: weather, abstractions, civic life ────────────────
  { band: 3, fr: "l'ordinateur", en: 'computer' },
  { band: 3, fr: 'la bibliothèque', en: 'library' },
  { band: 3, fr: 'le brouillard', en: 'fog' },
  { band: 3, fr: "l'orage", en: 'thunderstorm' },
  { band: 3, fr: 'la récolte', en: 'harvest' },
  { band: 3, fr: 'la sécheresse', en: 'drought' },
  { band: 3, fr: 'la santé', en: 'health' },
  { band: 3, fr: 'le bonheur', en: 'happiness' },
  { band: 3, fr: 'la vérité', en: 'truth' },
  { band: 3, fr: 'la douleur', en: 'pain' },
  { band: 3, fr: 'le sommeil', en: 'sleep' },
  { band: 3, fr: 'la nourriture', en: 'food' },
  { band: 3, fr: 'le témoin', en: 'witness' },
  { band: 3, fr: 'la réussite', en: 'success' },
  { band: 3, fr: "l'échec", en: 'failure' },
  { band: 3, fr: 'le mensonge', en: 'lie' },
  { band: 3, fr: 'la peur', en: 'fear' },
  { band: 3, fr: 'le chômage', en: 'unemployment' },
  { band: 3, fr: 'la foule', en: 'crowd' },
  { band: 3, fr: 'le bruit', en: 'noise' },
  { band: 3, fr: 'la colère', en: 'anger' },
  { band: 3, fr: 'la grève', en: 'strike' },
  { band: 3, fr: 'le sondage', en: 'survey' },
];
