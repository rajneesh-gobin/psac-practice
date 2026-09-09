'use strict';
(function () {

// Multi-year (2021-2024) NCE French inspired questions — g9fr-my-001 to 040

// --- g9fr-grammaire ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-001', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'pronoms',
  question: 'Donne-moi ton stylo ! _____________ est perdu.',
  options: ['Le mien', 'La mienne', 'Le tien', 'La tienne'],
  answer: 'Le mien',
  explanation: 'Stylo est masculin singulier → pronom possessif "le mien" (mine).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-002', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'accords',
  question: 'Les chaussures _____________ sont exposées dans la vitrine.',
  options: ['neuves', 'neuf', 'neuve', 'neufs'],
  answer: 'neuves',
  explanation: 'Chaussures = féminin pluriel → accord de l\'adjectif : neuves.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-003', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'temps_modes',
  question: 'Un noble roi _____________ dans ce château il y a deux cents ans.',
  options: ['habitait', 'habitera', 'habite', 'habiter'],
  answer: 'habitait',
  explanation: '"Il y a deux cents ans" indique le passé éloigné → imparfait.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-004', chapterId: 'g9fr-grammaire', difficulty: 3,
  subsection: 'accords',
  question: 'Les gâteaux que Danish a _____________ sont succulents.',
  options: ['préparés', 'préparé', 'préparée', 'préparées'],
  answer: 'préparés',
  explanation: 'Le participe passé s\'accorde avec le COD "que" (= gâteaux, masculin pluriel) placé avant.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-005', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'prepositions',
  question: 'L\'immense avion vole _____________ des maisons.',
  options: ['au-dessus', 'sur', 'sous', 'en-dessous'],
  answer: 'au-dessus',
  explanation: '"Au-dessus de" signifie plus haut que — l\'avion vole au-dessus.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-006', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'connecteurs',
  question: '_____________ la pluie, les garçons jouent au football.',
  options: ['Malgré', 'Parce que', 'Bien que', 'Quand'],
  answer: 'Malgré',
  explanation: '"Malgré" + nom exprime la concession (despite); les autres demandent un verbe.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-007', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'temps_modes',
  question: 'En _____________ sur la plage, Arnaud a trouvé un bijou.',
  options: ['se promenant', 'se promène', 'se promenait', 'se promener'],
  answer: 'se promenant',
  explanation: '"En + gérondif" — le gérondif est formé avec la base du participe présent : promenant.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-008', chapterId: 'g9fr-grammaire', difficulty: 2,
  subsection: 'pronoms',
  question: 'Le facteur _____________ vient au village est tombé de sa motocyclette.',
  options: ['qui', 'que', 'où', 'dont'],
  answer: 'qui',
  explanation: '"Qui" remplace le sujet (facteur, personne) dans la proposition relative.'
}));

// --- g9fr-transformation ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-009', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'negation',
  question: 'Quelle est la forme négative correcte de : "Kenzo boit de l\'eau le matin" ?',
  options: [
    'Kenzo ne boit pas de l\'eau le matin.',
    'Kenzo ne boit pas d\'eau le matin.',
    'Kenzo boit ne pas de l\'eau le matin.',
    'Kenzo ne pas boit de l\'eau le matin.'
  ],
  answer: 'Kenzo ne boit pas de l\'eau le matin.',
  explanation: 'Forme négative : ne + verbe + pas. L\'article partitif reste après "pas de".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-010', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'ponctuation',
  question: 'Quelle ponctuation convient à la fin de : "La tempête a causé des dégâts. Quel désastre" ?',
  options: ['!', '.', '?', ','],
  answer: '!',
  explanation: '"Quel désastre" est une exclamation qui exprime la surprise ou le regret → point d\'exclamation.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-011', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'changement_personne',
  question: 'Réécris avec "Je" : Nous nous déguisons pour la fête. La bonne réponse est :',
  options: [
    'Je me déguise pour la fête.',
    'Je nous déguisons pour la fête.',
    'Je me déguisons pour la fête.',
    'Je se déguise pour la fête.'
  ],
  answer: 'Je me déguise pour la fête.',
  explanation: 'Nous → Je ; pronom réfléchi nous → me ; verbe s\'accorde : déguise.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-012', chapterId: 'g9fr-transformation', difficulty: 3,
  subsection: 'voix_passive',
  question: 'Quelle est la forme passive correcte de : "La styliste coud cette robe" ?',
  options: [
    'Cette robe est cousue par la styliste.',
    'Cette robe est coudée par la styliste.',
    'Cette robe a été coudée par la styliste.',
    'Cette robe était cousue par la styliste.'
  ],
  answer: 'Cette robe est cousue par la styliste.',
  explanation: 'Voix passive au présent : être + participe passé accordé. Coudre → cousue.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-013', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'jonction_phrases',
  question: 'Relie avec "si" : "Jade joue de la guitare. Denis chantera." La bonne réponse est :',
  options: [
    'Si Jade joue de la guitare, Denis chantera.',
    'Si Jade jouait de la guitare, Denis chanterait.',
    'Si Jade joue de la guitare, Denis chante.',
    'Si Jade joue de la guitare, Denis a chanté.'
  ],
  answer: 'Si Jade joue de la guitare, Denis chantera.',
  explanation: 'Condition réelle (si présent, futur simple) : si + présent → futur.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-014', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'pronominalisation',
  question: 'Remplace "aux enfants" par un pronom : "Grand-père raconte une histoire aux enfants chaque soir."',
  options: [
    'Grand-père leur raconte une histoire chaque soir.',
    'Grand-père les raconte une histoire chaque soir.',
    'Grand-père lui raconte une histoire chaque soir.',
    'Grand-père en raconte une histoire chaque soir.'
  ],
  answer: 'Grand-père leur raconte une histoire chaque soir.',
  explanation: '"Aux enfants" = COI pluriel → pronom indirect "leur".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-015', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'negation',
  question: 'Quelle est la forme négative correcte de : "C\'est une bonne idée" ?',
  options: [
    'Ce n\'est pas une bonne idée.',
    'C\'est ne pas une bonne idée.',
    'Ce n\'est pas de bonne idée.',
    'Ce n\'est une pas bonne idée.'
  ],
  answer: 'Ce n\'est pas une bonne idée.',
  explanation: 'Négation de "c\'est" : ce n\'est pas. L\'article indéfini reste : une bonne idée.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-016', chapterId: 'g9fr-transformation', difficulty: 2,
  subsection: 'genre_nombre',
  question: 'Réécris au masculin : "Chaque matin, la charmante directrice arrive tôt." La bonne réponse est :',
  options: [
    'Chaque matin, le charmant directeur arrive tôt.',
    'Chaque matin, le charmante directeur arrive tôt.',
    'Chaque matin, le charmant directrice arrive tôt.',
    'Chaque matin, la charmant directeur arrive tôt.'
  ],
  answer: 'Chaque matin, le charmant directeur arrive tôt.',
  explanation: 'Directrice → directeur (masc.) ; charmante → charmant (masc.) ; la → le.'
}));

// --- g9fr-vocabulaire ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-017', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'notions_abstraites',
  question: '_____________ d\'eau est interdit, surtout en cette période de sécheresse.',
  options: ['Le gaspillage', 'L\'économie', 'La protection', 'La conservation'],
  answer: 'Le gaspillage',
  explanation: '"Le gaspillage" = le fait de gaspiller, de perdre inutilement. C\'est ce qui est interdit.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-018', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'adjectifs_qualificatifs',
  question: 'Fumer est _____________ pour la santé.',
  options: ['nocif', 'énergétique', 'bénéfique', 'inoffensif'],
  answer: 'nocif',
  explanation: '"Nocif" signifie nuisible, dangereux. Fumer est nocif pour la santé.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-019', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'traits_caractere',
  question: 'Nizam passe beaucoup de temps à apprendre ses leçons. Quel élève _____________ !',
  options: ['studieux', 'distrait', 'impoli', 'paresseux'],
  answer: 'studieux',
  explanation: '"Studieux" décrit quelqu\'un qui travaille bien ses études — le contraire de paresseux.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-020', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'verbes_action',
  question: 'Quand quelqu\'un est en danger, il faut le _____________ .',
  options: ['secourir', 'frapper', 'servir', 'détester'],
  answer: 'secourir',
  explanation: '"Secourir" signifie aider, porter assistance à quelqu\'un en danger.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-021', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'noms_concrets',
  question: 'Le chasseur tire un coup de _____________ et abat un cerf.',
  options: ['fusil', 'main', 'téléphone', 'soleil'],
  answer: 'fusil',
  explanation: 'On tire un coup de fusil — c\'est l\'arme utilisée pour chasser.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-022', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'noms_concrets',
  question: 'Éteins les _____________ que tu n\'utilises pas pour économiser de l\'électricité.',
  options: ['lumières', 'fenêtres', 'robinets', 'feux'],
  answer: 'lumières',
  explanation: 'On éteint les lumières (les lampes) pour économiser l\'électricité.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-023', chapterId: 'g9fr-vocabulaire', difficulty: 2,
  subsection: 'traits_caractere',
  question: 'Grand-père est très _____________ . Il se lève tous les jours avant le lever du soleil.',
  options: ['matinal', 'bavard', 'généreux', 'curieux'],
  answer: 'matinal',
  explanation: '"Matinal" décrit quelqu\'un qui se lève tôt le matin.'
}));

// --- g9fr-formation-mots ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-024', chapterId: 'g9fr-formation-mots', difficulty: 2,
  subsection: 'formation_adverbe',
  question: 'Après l\'annonce de la bonne nouvelle, grand-mère sourit _____________ . (gai → adverbe)',
  options: ['gaiement', 'dangereusement', 'bruyamment', 'furieusement'],
  answer: 'gaiement',
  explanation: '"Gai" → adverbe "gaiement" (joyeusement). Formé à partir du féminin : gaie + -ment.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-025', chapterId: 'g9fr-formation-mots', difficulty: 2,
  subsection: 'formation_adjectif',
  question: 'Forme l\'adjectif à partir du nom "danger" : Cette route est très _____________ .',
  options: ['dangereuse', 'danger', 'dangement', 'dangerosité'],
  answer: 'dangereuse',
  explanation: 'Danger → dangereux (masc.) / dangereuse (fém.). La route est féminin → dangereuse.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-026', chapterId: 'g9fr-formation-mots', difficulty: 2,
  subsection: 'nominalisation',
  question: 'Forme un nom à partir du verbe "protéger" : La _____________ de l\'environnement est essentielle.',
  options: ['protection', 'protéger', 'protecteur', 'protégé'],
  answer: 'protection',
  explanation: 'Protéger → protection (nom féminin). Suffixe -tion est très courant en nominalisation.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-027', chapterId: 'g9fr-formation-mots', difficulty: 2,
  subsection: 'formation_verbe',
  question: 'Quel verbe est correctement formé à partir de "large" ?',
  options: ['élargir', 'largeir', 'largiser', 'largement'],
  answer: 'élargir',
  explanation: 'Large → élargir (rendre large). Préfixe é- + base + -ir est un procédé courant.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-028', chapterId: 'g9fr-formation-mots', difficulty: 2,
  subsection: 'noms_de_personne',
  question: 'Forme le nom de la personne qui chante : Un _____________ se produit sur scène.',
  options: ['chanteur', 'chantage', 'chanson', 'chantement'],
  answer: 'chanteur',
  explanation: 'Chanter → chanteur (nom de personne masculin). Suffixe -eur indique celui qui fait l\'action.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-029', chapterId: 'g9fr-formation-mots', difficulty: 3,
  subsection: 'noms_de_quantite',
  question: 'Quel nom indique une grande quantité d\'eau ?',
  options: ['une cascade', 'un robinet', 'une goutte', 'un nuage'],
  answer: 'une cascade',
  explanation: 'Une cascade est un grand volume d\'eau qui tombe — nom de quantité/intensité pour l\'eau.'
}));

// --- g9fr-correction ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-030', chapterId: 'g9fr-correction', difficulty: 2,
  subsection: 'homophones',
  question: 'Choisis la bonne orthographe : "Les enfants _____________ contents de partir en vacances."',
  options: ['sont', 'son', 'se', 'sœur'],
  answer: 'sont',
  explanation: '"Sont" = forme conjuguée du verbe être (ils sont). "Son" = adjectif possessif.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-031', chapterId: 'g9fr-correction', difficulty: 2,
  subsection: 'homophones',
  question: 'Choisis la bonne orthographe : "Il _____________ allé au marché ce matin."',
  options: ['est', 'et', 'es', 'ai'],
  answer: 'est',
  explanation: '"Est" = auxiliaire être conjugué (il est allé). "Et" = conjonction de coordination.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-032', chapterId: 'g9fr-correction', difficulty: 2,
  subsection: 'accords',
  question: 'Trouve la faute et choisis la forme correcte : "Deux vieilles dames sont assis sur le banc."',
  options: ['assises', 'assis', 'assite', 'assie'],
  answer: 'assises',
  explanation: 'S\'asseoir avec être → accord avec le sujet. Dames = féminin pluriel → assises.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-033', chapterId: 'g9fr-correction', difficulty: 2,
  subsection: 'participe_infinitif',
  question: 'Choisis la bonne forme : "Elle aime _____________ de la musique."',
  options: ['écouter', 'écouté', 'écoutée', 'écoutés'],
  answer: 'écouter',
  explanation: 'Après un verbe comme "aimer", on utilise l\'infinitif : aimer écouter.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-034', chapterId: 'g9fr-correction', difficulty: 2,
  subsection: 'accords',
  question: 'Les fleurs de ce jardin _____________ les abeilles. Quelle est la forme correcte ?',
  options: ['attirent', 'attires', 'attire', 'attirer'],
  answer: 'attirent',
  explanation: '"Les fleurs" est le sujet (3e personne pluriel) → attirent (avec -ent).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-035', chapterId: 'g9fr-correction', difficulty: 3,
  subsection: 'orthographe_accents',
  question: 'Quelle phrase contient une erreur d\'accent ?',
  options: [
    '"Il mange a la cantine." (manque un accent sur à)',
    '"Elle est arrivée hier." (correct)',
    '"Où est-il allé ?" (correct)',
    '"Il préfère le chocolat." (correct)'
  ],
  answer: '"Il mange a la cantine." (manque un accent sur à)',
  explanation: '"À" (préposition) prend un accent grave pour le distinguer de "a" (verbe avoir).'
}));

// --- g9fr-textes-trous (avec textes courts intégrés) ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-036', chapterId: 'g9fr-textes-trous', difficulty: 2,
  subsection: 'determinants',
  question: 'Complète le texte : "Il achète _____________ billet d\'avion pour voyager à Paris."',
  options: ['un', 'une', 'du', 'de'],
  answer: 'un',
  explanation: '"Billet" est masculin singulier, indéfini → article indéfini "un".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-037', chapterId: 'g9fr-textes-trous', difficulty: 2,
  subsection: 'conjonctions',
  question: 'Complète : "Chaque matin, je fais une petite marche _____________ du yoga pour rester en forme."',
  options: ['et', 'ni', 'or', 'donc'],
  answer: 'et',
  explanation: '"Et" coordonne deux activités positives. "Ni" est réservé aux structures négatives.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-038', chapterId: 'g9fr-textes-trous', difficulty: 2,
  subsection: 'prepositions',
  question: 'Complète : "Les plantes et les animaux souffrent _____________ la sécheresse."',
  options: ['à cause de', 'parce que', 'pour que', 'en dépit de'],
  answer: 'à cause de',
  explanation: '"À cause de" + nom exprime la cause. "Parce que" et "pour que" sont suivis d\'un verbe.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-039', chapterId: 'g9fr-textes-trous', difficulty: 2,
  subsection: 'pronoms_relatifs',
  question: 'Complète : "La directrice _____________ nous a parlé est très compétente."',
  options: ['qui', 'que', 'dont', 'où'],
  answer: 'qui',
  explanation: '"Qui" est pronom relatif sujet (la directrice parle → elle est sujet de "a parlé").'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9fr-my-040', chapterId: 'g9fr-textes-trous', difficulty: 3,
  subsection: 'verbes_contexte',
  question: 'Lis cet extrait et choisis le bon verbe :<br><br><i>"Hier soir, ma famille _____________ au restaurant pour fêter l\'anniversaire de mon frère. Nous avons commandé des plats délicieux."</i>',
  options: ['est allée', 'va', 'allait', 'ira'],
  answer: 'est allée',
  explanation: '"Hier soir" indique le passé composé. "Ma famille" → féminin singulier → est allée.'
}));

})();
