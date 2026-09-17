'use strict';
// Écoute ! — French listening items.
//
// ⚠⚠ THE ONE RULE THIS BANK EXISTS TO ENFORCE: every distractor must differ
//    from the answer by a sound a child can actually HEAR. The question is
//    audio; an option that sounds identical to the answer is not a hard
//    question, it is an unanswerable one, and the child is marked wrong for
//    hearing correctly.
//
// ⚠ THE DESIGN NOTE ABOVE renderHub() SAYS "curate minimal pairs on purpose
//   (vin/vingt, chat/chaud)". Half of that is wrong and is deliberately not
//   followed: `vin` and `vingt` are both /vɛ̃/ — TRUE HOMOPHONES, identical in
//   speech. An item offering both cannot be answered by listening. `chat` /ʃa/
//   vs `chaud` /ʃo/ is a real contrast and is exactly the right idea.
//   So the bank is built on contrasts that survive being spoken:
//     · different vowels      chat / chaud / chou / chien
//     · different consonants  pain / bain / main / nain
//     · voicing               poisson /s/ vs poison /z/
//     · a sounded final       bon /bɔ̃/ vs bonne /bɔn/, petit vs petite
//     · syllable count        deux vs douze, quatre vs quatorze
//   scripts/test-ecoute.js carries a homophone table and fails if two members
//   of one set ever land in the same item.
//
// ⚠ Numbers are in on purpose: "trois/treize" and "quatre/quatorze" are the
//   pairs Mauritian children actually lose marks on in dictée.
//
// Shape: { id, band, say, options:[4], answer }
// `say` is what the parrot speaks; `answer` must be one of `options`.
// ⚠ In flash-card mode (no French voice installed) `say` is SHOWN instead of
//   spoken, so it must be the plain written form — never a phonetic respelling.
window.MINIGAME_ECOUTE = [

  // ── Band 1 — Grades 1-4: single words, wide contrasts ─────────────────────
  { id: 'ec1-01', band: 1, say: 'chat', options: ['chat', 'chaud', 'chou', 'chien'], answer: 'chat' },
  { id: 'ec1-02', band: 1, say: 'chaud', options: ['chat', 'chaud', 'chou', 'chien'], answer: 'chaud' },
  { id: 'ec1-03', band: 1, say: 'pain', options: ['pain', 'bain', 'main', 'nain'], answer: 'pain' },
  { id: 'ec1-04', band: 1, say: 'main', options: ['pain', 'bain', 'main', 'nain'], answer: 'main' },
  { id: 'ec1-05', band: 1, say: 'poule', options: ['poule', 'boule', 'foule', 'moule'], answer: 'poule' },
  { id: 'ec1-06', band: 1, say: 'boule', options: ['poule', 'boule', 'foule', 'moule'], answer: 'boule' },
  { id: 'ec1-07', band: 1, say: 'roue', options: ['rue', 'roue', 'rat', 'riz'], answer: 'roue' },
  { id: 'ec1-08', band: 1, say: 'rue', options: ['rue', 'roue', 'rat', 'riz'], answer: 'rue' },
  { id: 'ec1-09', band: 1, say: 'lit', options: ['lit', 'lu', 'loup', 'la'], answer: 'lit' },
  { id: 'ec1-10', band: 1, say: 'loup', options: ['lit', 'lu', 'loup', 'la'], answer: 'loup' },
  { id: 'ec1-11', band: 1, say: 'feu', options: ['feu', 'fou', 'fée', 'fil'], answer: 'feu' },
  { id: 'ec1-12', band: 1, say: 'fou', options: ['feu', 'fou', 'fée', 'fil'], answer: 'fou' },
  { id: 'ec1-13', band: 1, say: 'joue', options: ['joue', 'chou', 'jour', 'chaud'], answer: 'joue' },
  { id: 'ec1-14', band: 1, say: 'jour', options: ['joue', 'chou', 'jour', 'chaud'], answer: 'jour' },
  { id: 'ec1-15', band: 1, say: 'bras', options: ['bras', 'bas', 'blé', 'bleu'], answer: 'bras' },
  { id: 'ec1-16', band: 1, say: 'bleu', options: ['bras', 'bas', 'blé', 'bleu'], answer: 'bleu' },
  { id: 'ec1-17', band: 1, say: 'gare', options: ['gare', 'car', 'gâteau', 'garçon'], answer: 'gare' },
  { id: 'ec1-18', band: 1, say: 'livre', options: ['livre', 'libre', 'lièvre', 'liste'], answer: 'livre' },

  // ── Band 2 — Grades 5-6: minimal pairs and the number traps ───────────────
  { id: 'ec2-01', band: 2, say: 'poisson', options: ['poisson', 'poison', 'boisson', 'buisson'], answer: 'poisson' },
  { id: 'ec2-02', band: 2, say: 'poison', options: ['poisson', 'poison', 'boisson', 'buisson'], answer: 'poison' },
  { id: 'ec2-03', band: 2, say: 'dessus', options: ['dessus', 'dessous', 'dessin', 'dedans'], answer: 'dessus' },
  { id: 'ec2-04', band: 2, say: 'dessous', options: ['dessus', 'dessous', 'dessin', 'dedans'], answer: 'dessous' },
  { id: 'ec2-05', band: 2, say: 'bonne', options: ['bon', 'bonne', 'beau', 'banc'], answer: 'bonne' },
  { id: 'ec2-06', band: 2, say: 'banc', options: ['bon', 'bonne', 'beau', 'banc'], answer: 'banc' },
  { id: 'ec2-07', band: 2, say: 'petite', options: ['petit', 'petite', 'peinture', 'pétale'], answer: 'petite' },
  { id: 'ec2-08', band: 2, say: 'grande', options: ['grand', 'grande', 'gronde', 'grange'], answer: 'grande' },
  { id: 'ec2-09', band: 2, say: 'treize', options: ['trois', 'treize', 'trente', 'trop'], answer: 'treize' },
  { id: 'ec2-10', band: 2, say: 'trente', options: ['trois', 'treize', 'trente', 'trop'], answer: 'trente' },
  { id: 'ec2-11', band: 2, say: 'quatorze', options: ['quatre', 'quatorze', 'quarante', 'quart'], answer: 'quatorze' },
  { id: 'ec2-12', band: 2, say: 'quarante', options: ['quatre', 'quatorze', 'quarante', 'quart'], answer: 'quarante' },
  { id: 'ec2-13', band: 2, say: 'seize', options: ['six', 'seize', 'sept', 'cent'], answer: 'seize' },
  { id: 'ec2-14', band: 2, say: 'douze', options: ['deux', 'douze', 'dix', 'douce'], answer: 'douze' },
  { id: 'ec2-15', band: 2, say: 'chevaux', options: ['cheveux', 'chevaux', 'chevet', 'chèvre'], answer: 'chevaux' },
  { id: 'ec2-16', band: 2, say: 'cheveux', options: ['cheveux', 'chevaux', 'chevet', 'chèvre'], answer: 'cheveux' },
  { id: 'ec2-17', band: 2, say: 'jeune', options: ['jaune', 'jeune', 'jour', 'joli'], answer: 'jeune' },
  { id: 'ec2-18', band: 2, say: 'plaine', options: ['plein', 'plaine', 'plante', 'plage'], answer: 'plaine' },
  { id: 'ec2-19', band: 2, say: 'tente', options: ['temps', 'dents', 'tente', 'danse'], answer: 'tente' },
  { id: 'ec2-20', band: 2, say: 'danse', options: ['temps', 'dents', 'tente', 'danse'], answer: 'danse' },

  // ── Band 3 — Grades 7-9: short sentences ──────────────────────────────────
  { id: 'ec3-01', band: 3, say: 'Il fait chaud aujourd\'hui.',
    options: ['Il fait chaud aujourd\'hui.', 'Il fait froid aujourd\'hui.', 'Il fait beau aujourd\'hui.', 'Il fait frais aujourd\'hui.'],
    answer: 'Il fait chaud aujourd\'hui.' },
  { id: 'ec3-02', band: 3, say: 'J\'ai douze livres.',
    options: ['J\'ai deux livres.', 'J\'ai douze livres.', 'J\'ai deux frères.', 'J\'ai douze frères.'],
    answer: 'J\'ai douze livres.' },
  { id: 'ec3-03', band: 3, say: 'Le chien sort.',
    options: ['Le chat dort.', 'Le chien dort.', 'Le chat sort.', 'Le chien sort.'],
    answer: 'Le chien sort.' },
  { id: 'ec3-04', band: 3, say: 'Elle mange du poisson.',
    options: ['Elle mange du pain.', 'Elle mange du riz.', 'Elle mange du poisson.', 'Elle mange une pomme.'],
    answer: 'Elle mange du poisson.' },
  { id: 'ec3-05', band: 3, say: 'Nous allons à la plage.',
    options: ['Nous allons à la plage.', 'Nous allons à la plaine.', 'Nous allons à l\'école.', 'Nous allons au marché.'],
    answer: 'Nous allons à la plage.' },
  { id: 'ec3-06', band: 3, say: 'trois roues',
    options: ['trois roues', 'trois rues', 'trois rois', 'trois croix'],
    answer: 'trois roues' },
  { id: 'ec3-07', band: 3, say: 'un petit arbre',
    options: ['un grand livre', 'un petit livre', 'un grand arbre', 'un petit arbre'],
    answer: 'un petit arbre' },
  { id: 'ec3-08', band: 3, say: 'Où est ma sœur ?',
    options: ['Où est ma sœur ?', 'Où est mon sac ?', 'Où est ma soupe ?', 'Où est mon stylo ?'],
    answer: 'Où est ma sœur ?' },
  { id: 'ec3-09', band: 3, say: 'Le train part à seize heures.',
    options: ['Le train part à six heures.', 'Le train part à seize heures.', 'Le train part à sept heures.', 'Le train part à treize heures.'],
    answer: 'Le train part à seize heures.' },
  { id: 'ec3-10', band: 3, say: 'Ma mère achète des mangues.',
    options: ['Ma mère achète des mangues.', 'Ma mère achète des bananes.', 'Mon frère achète des mangues.', 'Mon frère achète des bananes.'],
    answer: 'Ma mère achète des mangues.' },
];
