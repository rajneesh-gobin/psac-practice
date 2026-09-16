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
];
