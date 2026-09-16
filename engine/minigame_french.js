'use strict';
// FRENCH NINJA - the phrase bank. Loaded eagerly; kept out of the question bank
// on purpose, because a game must never depend on a subject pack being fetched
// or entitled.
//
// ⚠⚠ EVERY TOKEN NOT LISTED IN `errors` IS AN ASSERTION THAT IT IS CORRECT
//    FRENCH, and the game DOCKS A CHILD FOR TAPPING IT. So an unflagged token
//    that is actually wrong punishes a child for spotting a real mistake - the
//    worst thing this bank can do, worse than a missing phrase. When adding to
//    it: write the ONE fully-correct sentence first, then introduce the errors
//    into it, then re-read every remaining token in that corrected sentence.
//
// ⚠ Each error must be independently wrong. If token A is only wrong because of
//   what you did to token B, a child who slices B and leaves A is right and the
//   game tells them they are not.
//
// Shape:
//   { id, band, words: [...tokens], errors: [{ i, fix, why }] }
//   - tokens are single words with NO punctuation; an elision is one token
//     ("l'école", "j'ai", "qu'il").
//   - band 1 = agreement and present tense (PSAC upper primary)
//     band 2 = passé composé, imparfait, futur, irregular presents (G6-G8)
//     band 3 = subjonctif, conditionnel, accord du participe, pronouns (NCE G9)
//   - `why` is shown AFTER the child commits, never before - it is the part
//     that teaches. French, short.
//
// ⚠ NEVER use the word "trou" here. It is the cloze exercises' own word and it
//   carries a vulgar reading in Mauritius. scripts/test-french-ninja.js fails on
//   it, and on punctuation inside a token, and on an out-of-range error index.
//
// Windows scale with phrase length in minigame.js, so a long sentence is not
// harder merely for being long.
// ── REVIEW STATE ──────────────────────────────────────────────────────────
// All 150 phrases were read line by line on 2026-09-16 — every flagged token
// checked as genuinely wrong with a correct fix, AND every UNFLAGGED token
// checked as correct in the corrected sentence, which is the half that matters
// because the game docks a child for tapping it. No errors were found.
//
// ⚠ THAT REVIEW WAS BY THE SAME KIND OF AUTHOR THAT WROTE THEM — an LLM, not a
//   native or fluent French speaker, and not against a grammar reference. It
//   raises confidence; it is NOT a sign-off. Before this game is promoted
//   anywhere, a Mauritian French teacher should read the 60.
//
// Notes from that review, for whoever reads it next:
//   • fn3-018 (« elle en cherche » -> « les ») is the subtlest call in the bank.
//     With a definite antecedent the pronoun is « les »; « en » would mean SOME
//     glasses. Correct, but the first item to put in front of a human.
//   • fn1-011 « sentent très bon » — « bon » is adverbial after « sentir » and
//     correctly invariable, so it is correctly UNFLAGGED. A strong pupil may tap
//     it and lose points while reasoning carefully. Legitimate, but the one
//     distractor in band 1 that could feel unfair.
//   • fn2-010 / fn2-011 / fn2-014 pair a wrong auxiliary with a wrong participle.
//     Both tokens are flagged and each is wrong INDEPENDENTLY, so a child who
//     finds only one still scores. That is the property to preserve when adding
//     two-error phrases.
//   • fn3-042 has « les » TWICE — flagged as a pronoun at index 1, unflagged as an
//     article at index 4 (« les dessins »). Correct, and distinguishable by
//     position, but subtler than the fn3-014 pattern. If a pupil reports it as
//     unfair, this is the one to look at.
//   • fn3-050 is the subtlest independence case in the bank: « fait » -> « faite »
//     is required by the COD « que », and « qui » -> « que » is what makes it a COD.
//     Each is still wrong in the target sentence, so both score — but do not use
//     this shape as a model without thinking it through.
//   • fn3-029 « je t'aurais attendu » assumes a masculine addressee. Standard
//     default, and no pupil will tap it, but it is why gendered participles with
//     « tu » are otherwise avoided.
//   • fn3-014 is the only phrase where a repeated token is flagged inconsistently:
//     « que » at index 1 is the conjunction « Bien que » and correctly stands,
//     while index 7 is a relative needing « qui ». Deliberate, and good teaching.
window.MINIGAME_FRENCH = [

  // ── Band 1 ────────────────────────────────────────────────────────────
  { id: 'fn1-001', band: 1,
    words: ['Les', 'enfant', 'jouent', 'dans', 'le', 'jardin'],
    errors: [{ i: 1, fix: 'enfants', why: '« Les » est pluriel, donc « enfant » prend un -s.' }] },

  { id: 'fn1-002', band: 1,
    words: ['Ma', 'mère', 'achètent', 'des', 'mangues', 'au', 'marché'],
    errors: [{ i: 2, fix: 'achète', why: '« Ma mère » est singulier : « elle achète ».' }] },

  { id: 'fn1-003', band: 1,
    words: ['Le', 'maison', 'de', 'mon', 'oncle', 'est', 'près', 'de', 'la', 'plage'],
    errors: [{ i: 0, fix: 'La', why: '« Maison » est féminin, donc on écrit « la maison ».' }] },

  { id: 'fn1-004', band: 1,
    words: ['Tu', 'mange', 'un', 'gâteau', 'avec', 'ta', 'sœur'],
    errors: [{ i: 1, fix: 'manges', why: 'Avec « tu », le verbe prend un -s : « tu manges ».' }] },

  { id: 'fn1-005', band: 1,
    words: ['Ils', 'regarde', 'les', 'oiseaux', 'dans', 'les', 'arbres'],
    errors: [{ i: 1, fix: 'regardent', why: 'Avec « ils », le verbe prend la terminaison -ent.' }] },

  { id: 'fn1-006', band: 1,
    words: ['Une', 'grande', 'cyclone', 'arrive', 'sur', 'notre', 'île'],
    errors: [
      { i: 0, fix: 'Un', why: '« Cyclone » est masculin : on dit « un cyclone ».' },
      { i: 1, fix: 'grand', why: 'Masculin singulier : « un grand cyclone », sans -e.' }
    ] },

  { id: 'fn1-007', band: 1,
    words: ['Mes', 'amis', 'habite', 'dans', 'un', 'petit', 'village'],
    errors: [{ i: 2, fix: 'habitent', why: '« Mes amis » est pluriel, donc « habitent » avec -ent.' }] },

  { id: 'fn1-008', band: 1,
    words: ['Nous', 'allons', 'à', 'l\'école', 'tous', 'les', 'matin'],
    errors: [{ i: 6, fix: 'matins', why: '« Les » est pluriel, donc « matins » prend un -s.' }] },

  { id: 'fn1-009', band: 1,
    words: ['Le', 'dodo', 'était', 'une', 'oiseau', 'mauricien'],
    errors: [{ i: 3, fix: 'un', why: '« Oiseau » est masculin : on dit « un oiseau ».' }] },

  { id: 'fn1-010', band: 1,
    words: ['Je', 'cherches', 'mon', 'cahier', 'dans', 'mon', 'sac'],
    errors: [{ i: 1, fix: 'cherche', why: 'Avec « je », le verbe s\'écrit « cherche », sans -s.' }] },

  { id: 'fn1-011', band: 1,
    words: ['Les', 'fleur', 'rouge', 'sentent', 'très', 'bon'],
    errors: [
      { i: 1, fix: 'fleurs', why: '« Les » est pluriel, donc « fleurs » prend un -s.' },
      { i: 2, fix: 'rouges', why: 'L\'adjectif s\'accorde : « les fleurs rouges ».' }
    ] },

  { id: 'fn1-012', band: 1,
    words: ['Mon', 'petit', 'frère', 'nagent', 'dans', 'la', 'mer'],
    errors: [{ i: 3, fix: 'nage', why: '« Mon frère » est singulier : « il nage ».' }] },

  { id: 'fn1-013', band: 1,
    words: ['Vous', 'écoute', 'la', 'maîtresse', 'dans', 'la', 'classe'],
    errors: [{ i: 1, fix: 'écoutez', why: 'Avec « vous », le verbe finit par -ez : « vous écoutez ».' }] },

  { id: 'fn1-014', band: 1,
    words: ['Un', 'beau', 'plage', 'se', 'trouve', 'derrière', 'le', 'village'],
    errors: [
      { i: 0, fix: 'Une', why: '« Plage » est féminin : on dit « une plage ».' },
      { i: 1, fix: 'belle', why: 'Féminin singulier : « une belle plage ».' }
    ] },

  { id: 'fn1-015', band: 1,
    words: ['Les', 'élèves', 'chante', 'une', 'chanson', 'créole'],
    errors: [{ i: 2, fix: 'chantent', why: '« Les élèves » est pluriel : « chantent » avec -ent.' }] },

  { id: 'fn1-016', band: 1,
    words: ['Ma', 'cousine', 'porte', 'une', 'robe', 'bleu'],
    errors: [{ i: 5, fix: 'bleue', why: '« Robe » est féminin, donc « bleue » prend un -e.' }] },

  { id: 'fn1-017', band: 1,
    words: ['Le', 'chien', 'de', 'mon', 'voisin', 'aboie', 'le', 'nuit'],
    errors: [{ i: 6, fix: 'la', why: '« Nuit » est féminin : on écrit « la nuit ».' }] },

  { id: 'fn1-018', band: 1,
    words: ['Les', 'pêcheur', 'rentre', 'avec', 'beaucoup', 'de', 'poissons'],
    errors: [
      { i: 1, fix: 'pêcheurs', why: '« Les » est pluriel, donc « pêcheurs » prend un -s.' },
      { i: 2, fix: 'rentrent', why: 'Sujet pluriel : le verbe prend la terminaison -ent.' }
    ] },

  { id: 'fn1-019', band: 1,
    words: ['Mon', 'grand', 'sœur', 'prépare', 'un', 'bon', 'gâteau'],
    errors: [
      { i: 0, fix: 'Ma', why: '« Sœur » est féminin : on dit « ma sœur ».' },
      { i: 1, fix: 'grande', why: 'Féminin singulier : « ma grande sœur ».' }
    ] },

  { id: 'fn1-020', band: 1,
    words: ['Tu', 'trouve', 'des', 'petit', 'crabes', 'sur', 'la', 'plage'],
    errors: [
      { i: 1, fix: 'trouves', why: 'Avec « tu », le verbe prend un -s : « tu trouves ».' },
      { i: 3, fix: 'petits', why: '« Crabes » est pluriel, donc « petits » prend un -s.' }
    ] },


  // ── Band 1, added 2026-09-16 ────────────────────────────────────────────
  { id: 'fn1-021', band: 1,
    words: ['Les', 'vague', 'arrivent', 'sur', 'le', 'sable', 'chaud'],
    errors: [{ i: 1, fix: 'vagues', why: '« Les » est pluriel, donc « vagues » prend un -s.' }] },

  { id: 'fn1-022', band: 1,
    words: ['Mon', 'père', 'réparent', 'un', 'vieux', 'camion', 'dans', 'la', 'cour'],
    errors: [{ i: 2, fix: 'répare', why: '« Mon père » est singulier : « il répare ».' }] },

  { id: 'fn1-023', band: 1,
    words: ['Je', 'fermes', 'la', 'fenêtre', 'quand', 'la', 'pluie', 'tombe'],
    errors: [{ i: 1, fix: 'ferme', why: "Avec « je », le verbe s'écrit « ferme », sans -s." }] },

  { id: 'fn1-024', band: 1,
    words: ['Le', 'montagne', 'derrière', 'notre', 'village', 'est', 'très', 'haut'],
    errors: [
      { i: 0, fix: 'La', why: '« Montagne » est féminin : on écrit « la montagne ».' },
      { i: 7, fix: 'haute', why: 'Féminin singulier : « la montagne est haute ».' }
    ] },

  { id: 'fn1-025', band: 1,
    words: ['Nous', 'mange', 'du', 'riz', 'avec', 'des', 'ourites', 'chaque', 'dimanche'],
    errors: [{ i: 1, fix: 'mangeons', why: 'Avec « nous », le verbe finit par -ons : « nous mangeons ».' }] },

  { id: 'fn1-026', band: 1,
    words: ['Les', 'touristes', 'portent', 'des', 'chapeau', 'blanc', 'au', 'bazar'],
    errors: [
      { i: 4, fix: 'chapeaux', why: '« Des » marque le pluriel : « des chapeaux ».' },
      { i: 5, fix: 'blancs', why: "L'adjectif s'accorde : « des chapeaux blancs »." }
    ] },

  { id: 'fn1-027', band: 1,
    words: ['Tu', 'attend', 'le', 'taxi', 'devant', 'la', 'boutique'],
    errors: [{ i: 1, fix: 'attends', why: 'Avec « tu », le verbe prend un -s : « tu attends ».' }] },

  { id: 'fn1-028', band: 1,
    words: ['Ma', 'tante', 'vendent', 'des', 'letchis', 'au', 'bord', 'de', 'la', 'route'],
    errors: [{ i: 2, fix: 'vend', why: '« Ma tante » est singulier : « elle vend ».' }] },

  { id: 'fn1-029', band: 1,
    words: ['Un', 'joli', 'chanson', 'de', 'séga', 'passe', 'à', 'la', 'radio'],
    errors: [
      { i: 0, fix: 'Une', why: '« Chanson » est féminin : on dit « une chanson ».' },
      { i: 1, fix: 'jolie', why: 'Féminin singulier : « une jolie chanson ».' }
    ] },

  { id: 'fn1-030', band: 1,
    words: ['Le', 'maître', 'corrigent', 'les', 'cahiers', 'des', 'élèves'],
    errors: [{ i: 2, fix: 'corrige', why: '« Le maître » est singulier : « il corrige ».' }] },

  { id: 'fn1-031', band: 1,
    words: ['Mes', 'cousins', 'apporte', 'des', 'gâteau', 'à', 'la', 'fête'],
    errors: [
      { i: 2, fix: 'apportent', why: '« Mes cousins » est pluriel : « apportent » avec -ent.' },
      { i: 4, fix: 'gâteaux', why: '« Des » marque le pluriel : « des gâteaux ».' }
    ] },

  { id: 'fn1-032', band: 1,
    words: ['Le', 'bus', 'scolaire', "s'arrêtent", 'devant', "l'école"],
    errors: [{ i: 3, fix: "s'arrête", why: "« Le bus » est singulier : « il s'arrête »." }] },

  { id: 'fn1-033', band: 1,
    words: ['Les', 'grand', 'champs', 'de', 'canne', 'entoure', 'le', 'village'],
    errors: [
      { i: 1, fix: 'grands', why: "L'adjectif s'accorde : « les grands champs »." },
      { i: 5, fix: 'entourent', why: 'Sujet pluriel : le verbe prend la terminaison -ent.' }
    ] },

  { id: 'fn1-034', band: 1,
    words: ['Le', 'facteur', 'apporte', 'une', 'lettre', 'important', 'ce', 'matin'],
    errors: [{ i: 5, fix: 'importante', why: '« Lettre » est féminin, donc « importante » prend un -e.' }] },

  { id: 'fn1-035', band: 1,
    words: ['Nous', 'choisissez', 'des', 'livres', 'dans', 'la', 'bibliothèque'],
    errors: [{ i: 1, fix: 'choisissons', why: 'Avec « nous », on écrit « nous choisissons », pas « choisissez ».' }] },

  { id: 'fn1-036', band: 1,
    words: ['Mon', 'grand-père', 'plante', 'des', 'tomate', 'dans', 'son', 'potager'],
    errors: [{ i: 4, fix: 'tomates', why: '« Des » est pluriel, donc « tomates » prend un -s.' }] },

  { id: 'fn1-037', band: 1,
    words: ['Le', 'bateau', 'du', 'pêcheur', 'entrent', 'dans', 'le', 'lagon', 'calme'],
    errors: [{ i: 4, fix: 'entre', why: '« Le bateau » est singulier : « il entre ».' }] },

  { id: 'fn1-038', band: 1,
    words: ['Vous', 'lave', 'les', 'assiette', 'après', 'le', 'repas'],
    errors: [
      { i: 1, fix: 'lavez', why: 'Avec « vous », le verbe finit par -ez : « vous lavez ».' },
      { i: 3, fix: 'assiettes', why: '« Les » est pluriel, donc « assiettes » prend un -s.' }
    ] },

  { id: 'fn1-039', band: 1,
    words: ['Mon', 'uniforme', 'est', 'propre', 'et', 'mes', 'chaussure', 'sont', 'noires'],
    errors: [{ i: 6, fix: 'chaussures', why: '« Mes » est pluriel, donc « chaussures » prend un -s.' }] },

  { id: 'fn1-040', band: 1,
    words: ['Les', 'garçons', 'lance', 'un', 'cerf-volant', 'sur', 'le', 'colline'],
    errors: [
      { i: 2, fix: 'lancent', why: '« Les garçons » est pluriel : « lancent » avec -ent.' },
      { i: 6, fix: 'la', why: '« Colline » est féminin : on écrit « la colline ».' }
    ] },

  { id: 'fn1-041', band: 1,
    words: ['Les', 'tortues', 'géante', 'vivent', 'dans', 'un', 'grand', 'parc'],
    errors: [{ i: 2, fix: 'géantes', why: "L'adjectif s'accorde : « les tortues géantes »." }] },

  { id: 'fn1-042', band: 1,
    words: ['Le', 'sport', 'est', 'important', 'pour', 'un', 'bonne', 'santé'],
    errors: [{ i: 5, fix: 'une', why: '« Santé » est féminin : on dit « une bonne santé ».' }] },

  { id: 'fn1-043', band: 1,
    words: ['Les', 'enfants', 'colorient', 'une', 'grand', 'carte', 'de', "l'île"],
    errors: [{ i: 4, fix: 'grande', why: '« Carte » est féminin : « une grande carte ».' }] },

  { id: 'fn1-044', band: 1,
    words: ['Mon', 'frère', 'achète', 'des', 'samoussa', 'chauds', 'après', 'la', 'classe'],
    errors: [{ i: 4, fix: 'samoussas', why: '« Des » est pluriel, donc « samoussas » prend un -s.' }] },

  { id: 'fn1-045', band: 1,
    words: ['Pendant', 'Divali', 'nous', 'allumons', 'des', 'lampe', 'coloré'],
    errors: [
      { i: 5, fix: 'lampes', why: '« Des » est pluriel, donc « lampes » prend un -s.' },
      { i: 6, fix: 'colorées', why: "L'adjectif s'accorde : « des lampes colorées »." }
    ] },

  { id: 'fn1-046', band: 1,
    words: ['Tu', 'finit', 'tes', 'devoirs', 'avant', 'le', 'film', 'du', 'soir'],
    errors: [{ i: 1, fix: 'finis', why: 'Avec « tu », « finir » donne « tu finis ».' }] },

  { id: 'fn1-047', band: 1,
    words: ['Un', 'mangue', 'mûr', 'tombe', 'de', "l'arbre", 'du', 'voisin'],
    errors: [
      { i: 0, fix: 'Une', why: '« Mangue » est féminin : on dit « une mangue ».' },
      { i: 2, fix: 'mûre', why: 'Féminin singulier : « une mangue mûre ».' }
    ] },

  { id: 'fn1-048', band: 1,
    words: ['Le', 'vent', 'secoue', 'les', 'cocotier', 'près', 'de', 'la', 'rivière'],
    errors: [{ i: 4, fix: 'cocotiers', why: '« Les » est pluriel, donc « cocotiers » prend un -s.' }] },

  { id: 'fn1-049', band: 1,
    words: ['Une', 'chat', 'gris', 'dort', 'sous', 'la', 'petite', 'table'],
    errors: [{ i: 0, fix: 'Un', why: '« Chat » est masculin : on dit « un chat ».' }] },

  { id: 'fn1-050', band: 1,
    words: ['Les', 'grande', 'bouteille', "d'eau", 'sont', 'dans', 'la', 'cuisine'],
    errors: [
      { i: 1, fix: 'grandes', why: "L'adjectif s'accorde : « les grandes bouteilles »." },
      { i: 2, fix: 'bouteilles', why: '« Les » est pluriel, donc « bouteilles » prend un -s.' }
    ] },

  // ── Band 2 ────────────────────────────────────────────────────────────
  { id: 'fn2-001', band: 2,
    words: ['Hier', 'il', 'a', 'allé', 'au', 'marché', 'avec', 'sa', 'mère'],
    errors: [{ i: 2, fix: 'est', why: '« Aller » se conjugue avec « être » au passé composé.' }] },

  { id: 'fn2-002', band: 2,
    words: ["J'ai", 'prit', 'mon', 'parapluie', 'avant', 'le', 'cyclone'],
    errors: [{ i: 1, fix: 'pris', why: 'Le participe passé de « prendre » est « pris ».' }] },

  { id: 'fn2-003', band: 2,
    words: ['Elles', 'sont', 'parti', 'à', 'la', 'plage', 'ce', 'matin'],
    errors: [{ i: 2, fix: 'parties', why: 'Avec « être », le participe s’accorde : « elles sont parties ».' }] },

  { id: 'fn2-004', band: 2,
    words: ['Quand', 'nous', 'étions', 'petits', 'nous', 'mangeons', 'des', 'letchis'],
    errors: [{ i: 5, fix: 'mangions', why: 'À l’imparfait, « nous » prend « -ions » : « nous mangions ».' }] },

  { id: 'fn2-005', band: 2,
    words: ['Demain', 'je', 'finirais', 'mes', 'devoirs', 'avant', 'le', 'dîner'],
    errors: [{ i: 2, fix: 'finirai', why: 'Futur simple : « je finirai » ; « finirais » est du conditionnel.' }] },

  { id: 'fn2-006', band: 2,
    words: ['Mes', 'amis', 'allent', 'au', 'lagon', 'et', 'ils', 'prendent', 'le', 'bus'],
    errors: [
      { i: 2, fix: 'vont', why: '« Aller » est irrégulier : « ils vont ».' },
      { i: 7, fix: 'prennent', why: '« Prendre » donne « ils prennent » avec deux « n ».' }
    ] },

  { id: 'fn2-007', band: 2,
    words: ['Nous', 'vienons', 'de', 'finir', 'nos', 'devoirs'],
    errors: [{ i: 1, fix: 'venons', why: '« Venir » donne « nous venons », sans « i ».' }] },

  { id: 'fn2-008', band: 2,
    words: ['Je', 'ne', 'peut', 'pas', 'venir', 'avec', 'vous', 'demain'],
    errors: [{ i: 2, fix: 'peux', why: 'Avec « je », « pouvoir » donne « je peux ».' }] },

  { id: 'fn2-009', band: 2,
    words: ['Elles', 'voulent', 'acheter', 'des', 'letchis', 'au', 'marché'],
    errors: [{ i: 1, fix: 'veulent', why: '« Vouloir » donne « elles veulent ».' }] },

  { id: 'fn2-010', band: 2,
    words: ['Mon', 'oncle', 'a', 'venue', 'nous', 'voir', 'samedi', 'dernier'],
    errors: [
      { i: 2, fix: 'est', why: '« Venir » se conjugue avec « être » au passé composé.' },
      { i: 3, fix: 'venu', why: '« Mon oncle » est masculin singulier : « venu ».' }
    ] },

  { id: 'fn2-011', band: 2,
    words: ['Nous', 'avons', 'allé', 'au', 'lagon', 'hier', 'matin'],
    errors: [
      { i: 1, fix: 'sommes', why: '« Aller » demande l’auxiliaire « être ».' },
      { i: 2, fix: 'allés', why: 'Avec « être », on accorde : « nous sommes allés ».' }
    ] },

  { id: 'fn2-012', band: 2,
    words: ['Soudain', 'le', 'vent', 'a', 'soufflait', 'très', 'fort'],
    errors: [{ i: 4, fix: 'soufflé', why: 'Après « a », il faut le participe passé « soufflé ».' }] },

  { id: 'fn2-013', band: 2,
    words: ['Ma', 'sœur', 'est', 'rentré', 'tard', 'de', "l'école"],
    errors: [{ i: 3, fix: 'rentrée', why: 'Avec « être », accord au féminin : « elle est rentrée ».' }] },

  { id: 'fn2-014', band: 2,
    words: ['Mes', 'cousines', 'ont', 'revenu', 'de', 'Rodrigues', 'hier'],
    errors: [
      { i: 2, fix: 'sont', why: '« Revenir » se conjugue avec « être ».' },
      { i: 3, fix: 'revenues', why: 'Accord au féminin pluriel : « elles sont revenues ».' }
    ] },

  { id: 'fn2-015', band: 2,
    words: ['Demain', 'nous', 'allerons', 'au', 'marché', 'et', 'nous', 'achèterions', 'des', 'mangues'],
    errors: [
      { i: 2, fix: 'irons', why: 'Au futur, « aller » donne « nous irons ».' },
      { i: 7, fix: 'achèterons', why: 'Futur simple : « nous achèterons », pas le conditionnel.' }
    ] },

  { id: 'fn2-016', band: 2,
    words: ['Vous', 'faisez', 'vos', 'devoirs', 'tous', 'les', 'soirs'],
    errors: [{ i: 1, fix: 'faites', why: '« Faire » est irrégulier : « vous faites ».' }] },

  { id: 'fn2-017', band: 2,
    words: ['Il', 'a', 'mit', 'son', 'uniforme', 'avant', 'de', 'partir'],
    errors: [{ i: 2, fix: 'mis', why: 'Le participe passé de « mettre » est « mis ».' }] },

  { id: 'fn2-018', band: 2,
    words: ["J'ai", 'écrivé', 'une', 'lettre', 'à', 'ma', 'grand-mère'],
    errors: [{ i: 1, fix: 'écrit', why: 'Le participe passé de « écrire » est « écrit ».' }] },

  { id: 'fn2-019', band: 2,
    words: ['Quand', "j'était", 'petit', 'je', 'faisait', 'du', 'vélo'],
    errors: [
      { i: 1, fix: "j'étais", why: 'Avec « je », l’imparfait prend « -ais » : « j’étais ».' },
      { i: 4, fix: 'faisais', why: '« Je » demande « faisais », jamais « faisait ».' }
    ] },

  { id: 'fn2-020', band: 2,
    words: ['Les', 'enfants', 'se', 'sont', 'levé', 'tôt', 'ce', 'matin'],
    errors: [{ i: 4, fix: 'levés', why: 'Avec « être », accord au pluriel : « ils se sont levés ».' }] },


  // ── Band 2, added 2026-09-16 ────────────────────────────────────────────
  { id: 'fn2-021', band: 2,
    words: ['Mon', 'frère', 'a', 'descendu', 'du', 'bus', 'près', 'du', 'stade'],
    errors: [{ i: 2, fix: 'est', why: '« Descendre » se conjugue avec « être » au passé composé.' }] },

  { id: 'fn2-022', band: 2,
    words: ['La', 'pluie', 'est', 'tombé', 'toute', 'la', 'nuit', 'sur', 'Curepipe'],
    errors: [{ i: 3, fix: 'tombée', why: '« Pluie » est féminin : « elle est tombée ».' }] },

  { id: 'fn2-023', band: 2,
    words: ['Il', 'a', 'couri', 'vite', 'pour', 'attraper', 'le', 'bus'],
    errors: [{ i: 2, fix: 'couru', why: 'Le participe passé de « courir » est « couru ».' }] },

  { id: 'fn2-024', band: 2,
    words: ['Quand', 'il', 'a', 'arrivé', 'au', 'stade', 'nous', 'jouons', 'déjà'],
    errors: [
      { i: 2, fix: 'est', why: '« Arriver » se conjugue avec « être » au passé composé.' },
      { i: 7, fix: 'jouions', why: 'À l’imparfait, « nous » prend « -ions » : « nous jouions ».' }
    ] },

  { id: 'fn2-025', band: 2,
    words: ['Chaque', 'samedi', 'mes', 'parents', 'allait', 'au', 'bazar', 'de', 'Port-Louis'],
    errors: [{ i: 4, fix: 'allaient', why: 'À l’imparfait, « ils » prend « -aient » : « ils allaient ».' }] },

  { id: 'fn2-026', band: 2,
    words: ['Demain', 'je', 'venirai', 'avec', 'toi', 'au', 'stade'],
    errors: [{ i: 2, fix: 'viendrai', why: 'Au futur, « venir » donne « je viendrai ».' }] },

  { id: 'fn2-027', band: 2,
    words: ['Je', 'doit', 'partir', 'maintenant', 'car', 'je', 'veut', 'aider', 'ma', 'mère'],
    errors: [
      { i: 1, fix: 'dois', why: 'Avec « je », « devoir » donne « je dois ».' },
      { i: 6, fix: 'veux', why: 'Avec « je », « vouloir » donne « je veux ».' }
    ] },

  { id: 'fn2-028', band: 2,
    words: ['La', 'maîtresse', 'a', 'ouvri', 'la', 'fenêtre', 'de', 'la', 'classe'],
    errors: [{ i: 3, fix: 'ouvert', why: 'Le participe passé de « ouvrir » est « ouvert ».' }] },

  { id: 'fn2-029', band: 2,
    words: ['Mon', 'grand-père', 'a', 'né', 'à', 'Rodrigues', 'en', '1950'],
    errors: [{ i: 2, fix: 'est', why: '« Naître » se conjugue avec « être » : « il est né ».' }] },

  { id: 'fn2-030', band: 2,
    words: ['Mes', 'sœurs', 'ont', 'sortis', 'très', 'tôt', 'ce', 'matin'],
    errors: [
      { i: 2, fix: 'sont', why: '« Sortir » se conjugue avec « être » au passé composé.' },
      { i: 3, fix: 'sorties', why: 'Accord au féminin pluriel : « elles sont sorties ».' }
    ] },

  { id: 'fn2-031', band: 2,
    words: ['Tu', 'sait', 'nager', 'depuis', "l'âge", 'de', 'cinq', 'ans'],
    errors: [{ i: 1, fix: 'sais', why: 'Avec « tu », « savoir » donne « tu sais ».' }] },

  { id: 'fn2-032', band: 2,
    words: ['Samedi', 'prochain', 'tu', 'voiras', 'le', 'séga', 'sur', 'la', 'plage'],
    errors: [{ i: 3, fix: 'verras', why: 'Au futur, « voir » donne « tu verras ».' }] },

  { id: 'fn2-033', band: 2,
    words: ['Autrefois', 'mon', 'grand-père', 'partais', 'pêcher', 'et', 'il', 'prendait', 'une', 'pirogue'],
    errors: [
      { i: 3, fix: 'partait', why: 'Avec « il », l’imparfait prend « -ait » : « il partait ».' },
      { i: 7, fix: 'prenait', why: 'À l’imparfait, « prendre » donne « il prenait ».' }
    ] },

  { id: 'fn2-034', band: 2,
    words: ['Elle', 'a', 'lit', 'tout', 'le', 'journal', 'ce', 'matin'],
    errors: [{ i: 2, fix: 'lu', why: 'Le participe passé de « lire » est « lu ».' }] },

  { id: 'fn2-035', band: 2,
    words: ['Le', 'chat', 'a', 'monté', 'sur', 'le', 'toit', 'de', 'la', 'maison'],
    errors: [{ i: 2, fix: 'est', why: '« Monter » se conjugue avec « être » au passé composé.' }] },

  { id: 'fn2-036', band: 2,
    words: ['Demain', 'tu', 'fairas', 'tes', 'devoirs', 'puis', 'tu', 'pouveras', 'sortir'],
    errors: [
      { i: 2, fix: 'feras', why: 'Au futur, « faire » donne « tu feras ».' },
      { i: 7, fix: 'pourras', why: 'Au futur, « pouvoir » donne « tu pourras ».' }
    ] },

  { id: 'fn2-037', band: 2,
    words: ['Mon', 'père', "m'a", 'offri', 'un', 'ballon', 'pour', 'mon', 'anniversaire'],
    errors: [{ i: 3, fix: 'offert', why: 'Le participe passé de « offrir » est « offert ».' }] },

  { id: 'fn2-038', band: 2,
    words: ['Vous', 'disez', 'toujours', 'la', 'vérité', 'à', 'la', 'maîtresse'],
    errors: [{ i: 1, fix: 'dites', why: '« Dire » est irrégulier : « vous dites ».' }] },

  { id: 'fn2-039', band: 2,
    words: ['Quand', 'nous', 'étaient', 'à', 'Rodrigues', 'nous', 'voyons', 'des', 'ourites', 'partout'],
    errors: [
      { i: 2, fix: 'étions', why: 'Avec « nous », l’imparfait de « être » est « étions ».' },
      { i: 6, fix: 'voyions', why: 'À l’imparfait, « voir » donne « nous voyions ».' }
    ] },

  { id: 'fn2-040', band: 2,
    words: ['Nous', 'avons', 'buvé', 'du', 'thé', 'chez', 'ma', 'grand-mère'],
    errors: [{ i: 2, fix: 'bu', why: 'Le participe passé de « boire » est « bu ».' }] },

  { id: 'fn2-041', band: 2,
    words: ['Nous', 'pouverons', 'nager', 'dans', 'le', 'lagon', 'demain', 'matin'],
    errors: [{ i: 1, fix: 'pourrons', why: 'Au futur, « pouvoir » donne « nous pourrons ».' }] },

  { id: 'fn2-042', band: 2,
    words: ['Ils', 'ont', 'restait', 'à', 'la', 'maison', 'pendant', 'la', 'pluie'],
    errors: [
      { i: 1, fix: 'sont', why: '« Rester » se conjugue avec « être » au passé composé.' },
      { i: 2, fix: 'restés', why: 'Il faut le participe passé accordé : « ils sont restés ».' }
    ] },

  { id: 'fn2-043', band: 2,
    words: ['Les', 'pêcheurs', 'ont', 'voyé', 'des', 'ourites', 'près', 'des', 'rochers'],
    errors: [{ i: 3, fix: 'vu', why: 'Le participe passé de « voir » est « vu ».' }] },

  { id: 'fn2-044', band: 2,
    words: ['À', 'ta', 'place', 'je', 'resterai', 'à', 'la', 'maison', 'ce', 'soir'],
    errors: [{ i: 4, fix: 'resterais', why: 'Après « à ta place » il faut le conditionnel : « je resterais ».' }] },

  { id: 'fn2-045', band: 2,
    words: ['Nous', 'sommes', 'monté', 'dans', 'le', 'bus', 'et', 'nous', 'avons', 'chantait'],
    errors: [
      { i: 2, fix: 'montés', why: 'Avec « être », on accorde : « nous sommes montés ».' },
      { i: 9, fix: 'chanté', why: 'Après « avons », il faut le participe passé « chanté ».' }
    ] },

  { id: 'fn2-046', band: 2,
    words: ['Elle', 'faira', 'un', 'gâteau', 'pour', 'la', 'fête', 'de', "l'école"],
    errors: [{ i: 1, fix: 'fera', why: 'Au futur, « faire » donne « elle fera ».' }] },

  { id: 'fn2-047', band: 2,
    words: ['Elle', 'prends', 'le', 'bus', 'pour', 'aller', 'au', 'collège'],
    errors: [{ i: 1, fix: 'prend', why: 'Avec « elle », « prendre » donne « elle prend ».' }] },

  { id: 'fn2-048', band: 2,
    words: ['Elle', 'a', 'tombé', 'de', 'son', 'vélo', 'devant', "l'école"],
    errors: [
      { i: 1, fix: 'est', why: '« Tomber » se conjugue avec « être » au passé composé.' },
      { i: 2, fix: 'tombée', why: 'Accord au féminin : « elle est tombée ».' }
    ] },

  { id: 'fn2-049', band: 2,
    words: ["L'année", 'prochaine', "j'allerai", 'au', 'collège', 'à', 'Rose-Hill'],
    errors: [{ i: 2, fix: "j'irai", why: 'Au futur, « aller » donne « j’irai ».' }] },

  { id: 'fn2-050', band: 2,
    words: ['Demain', 'elle', 'venira', 'au', 'collège', 'et', 'elle', 'apporteras', 'son', 'cahier'],
    errors: [
      { i: 2, fix: 'viendra', why: 'Au futur, « venir » donne « elle viendra ».' },
      { i: 7, fix: 'apportera', why: 'Avec « elle », le futur donne « elle apportera ».' }
    ] },

  // ── Band 3 ────────────────────────────────────────────────────────────
  { id: 'fn3-001', band: 3,
    words: ['Il', 'faut', 'que', 'tu', 'viens', 'avec', 'nous', 'demain'],
    errors: [{ i: 4, fix: 'viennes', why: '« Il faut que » exige le subjonctif.' }] },

  { id: 'fn3-002', band: 3,
    words: ['Bien', "qu'il", 'est', 'fatigué', 'il', 'termine', 'ses', 'devoirs'],
    errors: [{ i: 2, fix: 'soit', why: '« Bien que » exige toujours le subjonctif.' }] },

  { id: 'fn3-003', band: 3,
    words: ['Si', "j'aurais", 'su', 'je', 'serais', 'resté', 'à', 'Curepipe'],
    errors: [{ i: 1, fix: "j'avais", why: "Après « si » jamais de conditionnel : ici le plus-que-parfait." }] },

  { id: 'fn3-004', band: 3,
    words: ['Les', 'livres', 'que', "j'ai", 'acheté', 'sont', 'très', 'chers'],
    errors: [{ i: 4, fix: 'achetés', why: "Le participe s'accorde avec le COD « que » placé avant." }] },

  { id: 'fn3-005', band: 3,
    words: ['Le', 'garçon', 'que', 'parle', 'créole', 'est', 'mon', 'cousin'],
    errors: [{ i: 2, fix: 'qui', why: '« Qui » est sujet du verbe « parle ».' }] },

  { id: 'fn3-006', band: 3,
    words: ['Nous', 'les', 'avons', 'expliqué', 'la', 'leçon', 'plusieurs', 'fois'],
    errors: [{ i: 1, fix: 'leur', why: "On explique quelque chose À quelqu'un donc « leur »." }] },

  { id: 'fn3-007', band: 3,
    words: ['Quand', 'nous', 'sommes', 'arrivés', 'le', 'bus', 'avait', 'déjà', 'parti'],
    errors: [{ i: 6, fix: 'était', why: '« Partir » se conjugue avec « être » au plus-que-parfait.' }] },

  { id: 'fn3-008', band: 3,
    words: ['Pour', 'que', 'nous', 'réussissons', 'il', 'faut', 'que', 'nous', 'travaillons', 'ensemble'],
    errors: [{ i: 3, fix: 'réussissions', why: '« Pour que » exige le subjonctif.' },
             { i: 8, fix: 'travaillions', why: '« Il faut que » exige aussi le subjonctif.' }] },

  { id: 'fn3-009', band: 3,
    words: ['Voici', 'le', 'village', 'que', 'je', 'te', 'parlais', 'hier', 'soir'],
    errors: [{ i: 3, fix: 'dont', why: 'On parle DE quelque chose donc le relatif est « dont ».' }] },

  { id: 'fn3-010', band: 3,
    words: ['Les', 'photos', 'que', 'nous', 'avons', 'pris', 'à', 'Chamarel', 'sont', 'belles'],
    errors: [{ i: 5, fix: 'prises', why: '« Que » reprend « les photos » donc accord au féminin pluriel.' }] },

  { id: 'fn3-011', band: 3,
    words: ['Il', 'faut', 'que', 'tu', 'finis', 'les', 'exercices', 'que', "j'ai", 'donné'],
    errors: [{ i: 4, fix: 'finisses', why: '« Il faut que » exige le subjonctif.' },
             { i: 9, fix: 'donnés', why: 'Le COD « que » précède donc accord au masculin pluriel.' }] },

  { id: 'fn3-012', band: 3,
    words: ['Si', 'tu', 'étudiais', 'davantage', 'tu', 'auras', 'de', 'meilleures', 'notes'],
    errors: [{ i: 5, fix: 'aurais', why: '« Si » + imparfait entraîne le conditionnel présent.' }] },

  { id: 'fn3-013', band: 3,
    words: ['La', 'lettre', 'que', 'tu', 'avais', 'écrit', 'est', 'arrivée', 'hier'],
    errors: [{ i: 5, fix: 'écrite', why: '« Que » reprend « la lettre » donc accord au féminin.' }] },

  { id: 'fn3-014', band: 3,
    words: ['Bien', 'que', 'ce', 'est', 'difficile', 'les', 'élèves', 'que', 'travaillent', 'réussissent'],
    errors: [{ i: 3, fix: 'soit', why: '« Bien que » exige le subjonctif.' },
             { i: 7, fix: 'qui', why: '« Qui » est sujet du verbe « travaillent ».' }] },

  { id: 'fn3-015', band: 3,
    words: ['Je', 'cherche', 'un', 'livre', 'que', 'le', 'titre', 'me', 'plaît'],
    errors: [{ i: 4, fix: 'dont', why: '« Dont » remplace « de » complément du nom « titre ».' }] },

  { id: 'fn3-016', band: 3,
    words: ['Nous', 'devons', 'partir', 'avant', "qu'il", 'fait', 'trop', 'chaud'],
    errors: [{ i: 5, fix: 'fasse', why: '« Avant que » exige le subjonctif.' }] },

  { id: 'fn3-017', band: 3,
    words: ['Il', 'faut', 'que', 'tu', 'les', 'dis', 'la', 'vérité', 'maintenant'],
    errors: [{ i: 4, fix: 'leur', why: "On dit quelque chose À quelqu'un donc « leur »." },
             { i: 5, fix: 'dises', why: '« Il faut que » exige le subjonctif.' }] },

  { id: 'fn3-018', band: 3,
    words: ['Elle', 'a', 'perdu', 'ses', 'lunettes', 'et', 'elle', 'en', 'cherche', 'partout'],
    errors: [{ i: 7, fix: 'les', why: 'Les lunettes sont un COD défini donc « les » et non « en ».' }] },

  { id: 'fn3-019', band: 3,
    words: ["L'homme", 'que', 'parle', 'est', 'celui', 'que', 'je', 'me', 'souviens'],
    errors: [{ i: 1, fix: 'qui', why: '« Qui » est sujet du verbe « parle ».' },
             { i: 5, fix: 'dont', why: "On se souvient DE quelqu'un donc « dont »." }] },

  { id: 'fn3-020', band: 3,
    words: ['Si', 'elle', 'serait', 'là', 'je', 'le', 'poserais', 'la', 'question'],
    errors: [{ i: 2, fix: 'était', why: "Jamais de conditionnel après « si » : ici l'imparfait." },
             { i: 5, fix: 'lui', why: "On pose une question À quelqu'un donc « lui »." }] },

  // ── Band 3, added 2026-09-16 ────────────────────────────────────────────
  { id: 'fn3-021', band: 3,
    words: ['Il', 'est', 'important', 'que', 'vous', 'êtes', 'à', "l'heure", 'demain'],
    errors: [{ i: 5, fix: 'soyez', why: '« Il est important que » exige le subjonctif.' }] },

  { id: 'fn3-022', band: 3,
    words: ['Restez', 'à', 'la', 'maison', "jusqu'à", 'ce', 'que', 'le', 'vent', 'faiblit'],
    errors: [{ i: 9, fix: 'faiblisse', why: "« Jusqu'à ce que » exige le subjonctif." }] },

  { id: 'fn3-023', band: 3,
    words: ['Ma', 'mère', 'veut', 'que', 'je', 'fais', 'mes', 'devoirs', 'maintenant'],
    errors: [{ i: 5, fix: 'fasse', why: '« Vouloir que » exige le subjonctif : « que je fasse ».' }] },

  { id: 'fn3-024', band: 3,
    words: ['Tu', 'peux', 'sortir', 'à', 'condition', 'que', 'tu', 'prends', 'ton', 'parapluie'],
    errors: [{ i: 7, fix: 'prennes', why: '« À condition que » exige le subjonctif.' }] },

  { id: 'fn3-025', band: 3,
    words: ['Le', 'maître', 'explique', 'lentement', 'afin', 'que', 'chacun', 'peut', 'comprendre'],
    errors: [{ i: 7, fix: 'puisse', why: '« Afin que » exige le subjonctif : « qu\'il puisse ».' }] },

  { id: 'fn3-026', band: 3,
    words: ['Quoique', 'la', 'pluie', 'est', 'forte', 'les', 'enfants', 'vont', 'à', "l'école"],
    errors: [{ i: 3, fix: 'soit', why: '« Quoique » exige le subjonctif, comme « bien que ».' }] },

  { id: 'fn3-027', band: 3,
    words: ['Si', 'tu', 'finis', 'tes', 'devoirs', 'tu', 'pourrais', 'regarder', 'la', 'télévision'],
    errors: [{ i: 6, fix: 'pourras', why: '« Si » + présent entraîne le futur : « tu pourras ».' }] },

  { id: 'fn3-028', band: 3,
    words: ['Si', 'nous', 'habiterions', 'à', 'Port', 'Louis', 'nous', 'prendrions', 'le', 'bus'],
    errors: [{ i: 2, fix: 'habitions', why: "Jamais de conditionnel après « si » : ici l'imparfait." }] },

  { id: 'fn3-029', band: 3,
    words: ['Si', 'tu', "m'avais", 'prévenu', 'je', "t'aurai", 'attendu', 'à', 'la', 'gare'],
    errors: [{ i: 5, fix: "t'aurais", why: '« Si » + plus-que-parfait entraîne le conditionnel passé.' }] },

  { id: 'fn3-030', band: 3,
    words: ['Ces', 'exercices', 'sont', 'difficiles', 'mais', 'je', 'les', 'ai', 'fini'],
    errors: [{ i: 8, fix: 'finis', why: 'Le COD « les » est placé avant : « je les ai finis ».' }] },

  { id: 'fn3-031', band: 3,
    words: ['Cette', 'chanson', 'est', 'belle', 'je', "l'ai", 'appris', 'hier', 'soir'],
    errors: [{ i: 6, fix: 'apprise', why: "« L' » reprend « la chanson » donc accord au féminin." }] },

  { id: 'fn3-032', band: 3,
    words: ['Mon', 'frère', 'a', 'soif', 'je', 'le', 'donne', 'un', 'verre', "d'eau"],
    errors: [{ i: 5, fix: 'lui', why: "On donne quelque chose À quelqu'un donc « lui »." }] },

  { id: 'fn3-033', band: 3,
    words: ['Le', 'lagon', 'est', 'magnifique', 'nous', 'en', 'nageons', 'chaque', 'samedi'],
    errors: [{ i: 5, fix: 'y', why: '« Y » remplace le lieu : « nous y nageons ».' }] },

  { id: 'fn3-034', band: 3,
    words: ['Papa', 'a', 'acheté', 'des', 'mangues', 'il', 'les', 'a', 'mangé', 'deux'],
    errors: [{ i: 6, fix: 'en', why: 'Devant un nombre on emploie « en » : « il en a mangé deux ».' }] },

  { id: 'fn3-035', band: 3,
    words: ['Les', 'touristes', 'se', 'sont', 'baigné', 'dans', 'le', 'lagon', 'hier'],
    errors: [{ i: 4, fix: 'baignés', why: 'Verbe pronominal avec « être » : accord au masculin pluriel.' }] },

  { id: 'fn3-036', band: 3,
    words: ['Mes', 'sœurs', 'étaient', 'déjà', 'rentré', 'quand', 'le', 'cyclone', 'a', 'frappé'],
    errors: [{ i: 4, fix: 'rentrées', why: 'Plus-que-parfait avec « être » : accord au féminin pluriel.' }] },

  { id: 'fn3-037', band: 3,
    words: ["C'est", 'la', 'maison', 'que', 'ma', 'grand-mère', 'est', 'née'],
    errors: [{ i: 3, fix: 'où', why: '« Où » indique le lieu : « la maison où elle est née ».' }] },

  { id: 'fn3-038', band: 3,
    words: ["C'est", 'un', 'chanteur', 'que', 'tout', 'le', 'monde', 'connaît', 'les', 'chansons'],
    errors: [{ i: 3, fix: 'dont', why: '« Dont » remplace « de lui », complément du nom « chansons ».' }] },

  { id: 'fn3-039', band: 3,
    words: ['Le', 'livre', 'qui', 'je', 'lis', 'parle', 'de', 'Rodrigues'],
    errors: [{ i: 2, fix: 'que', why: "« Que » est complément d'objet du verbe « lis »." }] },

  { id: 'fn3-040', band: 3,
    words: ['Si', 'tu', 'auras', 'le', 'temps', 'aide-moi', 'demain'],
    errors: [{ i: 2, fix: 'as', why: 'Après « si » de condition on met le présent, jamais le futur.' }] },

  { id: 'fn3-041', band: 3,
    words: ['Il', 'faut', 'que', 'tu', 'choisis', 'un', 'métier', 'que', 'te', 'convient'],
    errors: [{ i: 4, fix: 'choisisses', why: '« Il faut que » exige le subjonctif.' },
             { i: 7, fix: 'qui', why: '« Qui » est sujet du verbe « convient ».' }] },

  { id: 'fn3-042', band: 3,
    words: ['Elle', 'les', 'a', 'montré', 'les', 'dessins', "qu'elle", 'avait', 'fait'],
    errors: [{ i: 1, fix: 'leur', why: "On montre quelque chose À quelqu'un donc « leur »." },
             { i: 8, fix: 'faits', why: 'Le COD « qu\' » précède : accord au masculin pluriel.' }] },

  { id: 'fn3-043', band: 3,
    words: ['Il', 'veut', 'que', 'nous', 'relisons', 'la', 'question', "qu'il", 'a', 'posé'],
    errors: [{ i: 4, fix: 'relisions', why: '« Vouloir que » exige le subjonctif.' },
             { i: 9, fix: 'posée', why: 'Le COD précède « la question » donc accord au féminin.' }] },

  { id: 'fn3-044', band: 3,
    words: ['Quoique', 'tu', 'as', 'raison', 'tu', 'dois', 'les', 'parler', 'gentiment'],
    errors: [{ i: 2, fix: 'aies', why: '« Quoique » exige le subjonctif : « que tu aies ».' },
             { i: 6, fix: 'leur', why: "On parle À quelqu'un donc « leur » et non « les »." }] },

  { id: 'fn3-045', band: 3,
    words: ['Avant', 'que', 'tu', 'pars', 'rends', 'le', 'cahier', 'que', "j'ai", 'besoin'],
    errors: [{ i: 3, fix: 'partes', why: '« Avant que » exige le subjonctif.' },
             { i: 7, fix: 'dont', why: 'On a besoin DE quelque chose donc « dont ».' }] },

  { id: 'fn3-046', band: 3,
    words: ['Si', 'tu', 'les', 'parlerais', 'gentiment', 'ils', "t'écouteraient"],
    errors: [{ i: 2, fix: 'leur', why: "On parle À quelqu'un donc « leur »." },
             { i: 3, fix: 'parlais', why: "Jamais de conditionnel après « si » : ici l'imparfait." }] },

  { id: 'fn3-047', band: 3,
    words: ['Range', 'les', 'jouets', 'que', 'tu', 'as', 'sorti', 'avant', "qu'il", 'pleut'],
    errors: [{ i: 6, fix: 'sortis', why: '« Que » reprend « les jouets » : accord au masculin pluriel.' },
             { i: 9, fix: 'pleuve', why: '« Avant que » exige le subjonctif : « qu\'il pleuve ».' }] },

  { id: 'fn3-048', band: 3,
    words: ['Pour', 'que', 'tu', 'comprends', 'relis', 'les', 'règles', 'que', "j'ai", 'expliqué'],
    errors: [{ i: 3, fix: 'comprennes', why: '« Pour que » exige le subjonctif.' },
             { i: 9, fix: 'expliquées', why: 'Le COD « que » précède : accord au féminin pluriel.' }] },

  { id: 'fn3-049', band: 3,
    words: ['Les', 'lettres', 'que', 'je', 'parlais', 'sont', 'celles', "qu'il", 'a', 'envoyé'],
    errors: [{ i: 2, fix: 'dont', why: 'On parle DE quelque chose donc le relatif est « dont ».' },
             { i: 9, fix: 'envoyées', why: 'Le COD précède « les lettres » donc accord au féminin pluriel.' }] },

  { id: 'fn3-050', band: 3,
    words: ['La', 'tarte', 'qui', 'ma', 'tante', 'a', 'fait', 'est', 'délicieuse'],
    errors: [{ i: 2, fix: 'que', why: "« Que » est complément d'objet : « la tarte que ma tante a faite »." },
             { i: 6, fix: 'faite', why: 'Le COD « que » précède donc accord au féminin.' }] },

];
