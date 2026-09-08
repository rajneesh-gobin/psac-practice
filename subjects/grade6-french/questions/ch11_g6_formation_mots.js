'use strict';
// Grade 6 French - Formation des Mots (dérivation lexicale).
// PSAC Q7 ("Écris la forme correcte du mot entre parenthèses", 10 marks) is set
// every year and Grade 6 had no chapter of any kind covering it: the ten
// chapters are tenses, reading and text types.
// Data table + loop, like extended_practice_bank.js: the linguistics live in the
// table, so a wrong suffix is a one-line fix and not a hunt through 100 blocks.
(function () {
  const CH = 'g6fr-formation';

  const RULES = {
    nom0:  'Certains verbes donnent un nom <b>sans suffixe</b> : accueillir → l\'accueil, entretenir → l\'entretien, rejeter → le rejet.',
    tion:  'Verbe → nom en <b>-tion / -sion</b>. Le radical change souvent : produire → production, permettre → permission, résoudre → résolution.',
    mentn: 'Verbe → nom en <b>-ment</b>, souvent sur le radical long des verbes du 2e groupe : avertir → avertissement, épanouir → épanouissement.',
    ance:  'Verbe → nom en <b>-ance / -ence</b> : croire → croyance, naître → naissance, souffrir → souffrance.',
    al:    'Nom → adjectif en <b>-al</b> : amitié → amical, nation → national. Féminin <b>-ale</b>, masculin pluriel <b>-aux</b>.',
    el:    'Nom → adjectif en <b>-el / -elle</b> : mois → mensuel, main → manuel, an → annuel.',
    eux:   'Nom → adjectif en <b>-eux</b>, féminin <b>-euse</b>, pluriel masculin <b>-eux</b> : orgueil → orgueilleux, respect → respectueux.',
    ier:   'Nom → adjectif en <b>-er / -ier</b>, féminin <b>-ère / -ière</b> : mensonge → mensonger / mensongère.',
    aire:  'Nom → adjectif en <b>-aire</b> : île → insulaire, peuple → populaire, semaine → hebdomadaire.',
    savant:'Certains adjectifs viennent du <b>radical latin ou grec</b> du nom, pas du nom lui-même : mer → maritime, terre → terrestre, ciel → céleste.',
    inadj: 'Nom → adjectif en <b>-in</b> ou <b>-ard</b> : enfant → enfantin, campagne → campagnard.',
    antadj:'Nom → adjectif en <b>-ant</b>, formé sur le verbe de la famille : bruit → bruire → bruyant.',
    adve:  'Adverbe = adjectif au <b>féminin</b> + <b>-ment</b> : naturel → naturelle → naturellement, nouveau → nouvelle → nouvellement.',
    adva:  'Adjectif en <b>-ant</b> → adverbe en <b>-amment</b> : élégant → élégamment, suffisant → suffisamment.',
    advem: 'Adjectif en <b>-ent</b> → adverbe en <b>-emment</b>, qui se prononce « -amment » : évident → évidemment, fréquent → fréquemment.',
    advac: 'Quelques adverbes prennent un <b>é accentué</b> à la place du e du féminin : profond → profondément, énorme → énormément, aveugle → aveuglément.',
    advi:  'Adverbes irréguliers, à apprendre par cœur : bref → brièvement, bon → bien (comparatif <b>mieux</b>), gentil → gentiment.',
    verpr: 'Beaucoup de verbes dérivés prennent en plus un <b>préfixe</b> : riche → <b>en</b>richir, court → <b>rac</b>courcir, force → <b>ren</b>forcer.',
    ver:   'Nom → verbe du <b>1er groupe</b> en <b>-er</b> : liberté → libérer, organisation → organiser.',
    iser:  'Nom ou adjectif → verbe en <b>-iser</b> : mémoire → mémoriser, moderne → moderniser, sensible → sensibiliser.',
    ifier: 'Nom ou adjectif → verbe en <b>-ifier</b> : juste → justifier, simple → simplifier, solide → solidifier.',
    pin:   'Le préfixe <b>in-</b> s\'assimile à la lettre qui suit : <b>im-</b> devant m, b, p ; <b>il-</b> devant l ; <b>ir-</b> devant r.',
    psous: 'Le préfixe <b>sous-</b> dit « pas assez » : estimer → sous-estimer, évaluer → sous-évaluer. Il garde son trait d\'union.',
    psur:  'Le préfixe <b>sur-</b> dit « trop » : chargé → surchargé, peuplé → surpeuplé. Il s\'écrit sans trait d\'union.',
    ppre:  'Le préfixe <b>pré-</b> dit « avant » : voir → prévoir, dire → prédire.',
    pcont: 'Le préfixe <b>contre-</b> dit « contre » : dire → contredire, attaquer → contre-attaquer.',
    pdes:  'Le préfixe <b>dis- / dé- / dés-</b> dit l\'action inverse : paraître → disparaître, ordre → désordre.',
    pinter:'Le préfixe <b>inter-</b> dit « entre » : national → international, changer → interchanger.',
    ptrans:'Le préfixe <b>trans-</b> dit « à travers, d\'un état à un autre » : former → transformer, porter → transporter.',
    pre:   'Le préfixe <b>re- / ré-</b> dit « une deuxième fois » : construire → reconstruire, lire → relire.',
  };

  const HINTS = {
    verbe_nom:        'Il faut un <b>nom</b>. Attention : le radical du verbe change souvent (produire → produc-, résoudre → résolu-).',
    nom_adjectif:     'Il faut un <b>adjectif</b> - puis vérifie son <b>accord</b> en genre et en nombre avec le nom qu\'il qualifie.',
    adjectif_adverbe: 'Adjectif au <b>féminin</b> + -ment. Sauf : <b>-ant → -amment</b>, <b>-ent → -emment</b>, et quelques adverbes en <b>-ément</b>.',
    former_verbe:     'Il faut un <b>verbe</b> à l\'infinitif - et beaucoup de ces verbes prennent en plus un <b>préfixe</b>.',
    prefixes:         'Choisis le préfixe qui donne exactement le sens demandé : contraire, « trop », « pas assez », « avant » ou « à nouveau ».',
  };

  const ROWS = [
    // ── Du verbe au nom ──────────────────────────────────────────────
    ['verbe_nom', 3, 'accueillir', 'accueil', 'L\'___ à l\'hôtel a été très chaleureux.', ['accueillement', 'accueillage', 'accueilleur'], 'nom0'],
    ['verbe_nom', 4, 'croire', 'croyance', 'Sa ___ en la réussite est restée intacte.', ['croiance', 'croyement', 'croyation'], 'ance', 'Le i du radical devient <b>y</b> devant une voyelle : croire → croy- → croyance.'],
    ['verbe_nom', 3, 'apparaître', 'apparition', 'L\'___ de la lune a surpris les enfants.', ['apparaissement', 'apparaissance', 'apparaiture'], 'tion'],
    ['verbe_nom', 3, 'disparaître', 'disparition', 'La ___ du dodo reste une leçon pour Maurice.', ['disparaissement', 'disparaissance', 'disparation'], 'tion'],
    ['verbe_nom', 3, 'élire', 'élection', 'L\'___ du chef de classe aura lieu demain.', ['élisement', 'élisance', 'éliture'], 'tion'],
    ['verbe_nom', 3, 'produire', 'production', 'La ___ de canne a baissé cette année.', ['produisement', 'produisance', 'produiture'], 'tion'],
    ['verbe_nom', 3, 'réduire', 'réduction', 'Le magasin offre une ___ de dix pour cent.', ['réduisement', 'réduisance', 'réduiture'], 'tion'],
    ['verbe_nom', 3, 'traduire', 'traduction', 'La ___ de ce poème est très difficile.', ['traduisement', 'traduisance', 'traduiture'], 'tion'],
    ['verbe_nom', 4, 'conclure', 'conclusion', 'Sa ___ est claire et bien construite.', ['concluement', 'concluance', 'concluture'], 'tion'],
    ['verbe_nom', 3, 'permettre', 'permission', 'Il a demandé la ___ de sortir plus tôt.', ['permettement', 'permettance', 'permetture'], 'tion'],
    ['verbe_nom', 4, 'admettre', 'admission', 'Son ___ au collège est confirmée.', ['admettement', 'admettance', 'admetture'], 'tion'],
    ['verbe_nom', 4, 'trahir', 'trahison', 'Sa ___ a surpris tous ses amis.', ['trahissement', 'trahissance', 'trahition'], 'tion'],
    ['verbe_nom', 3, 'guérir', 'guérison', 'Sa ___ a demandé trois semaines de repos.', ['guérissement', 'guérissance', 'guérition'], 'tion'],
    ['verbe_nom', 2, 'définir', 'définition', 'Cherche la ___ de ce mot dans le dictionnaire.', ['définissement', 'définissance', 'définiture'], 'tion'],
    ['verbe_nom', 3, 'inscrire', 'inscription', 'L\'___ au concours ferme lundi soir.', ['inscrivement', 'inscrivance', 'inscriture'], 'tion'],
    ['verbe_nom', 4, 'résoudre', 'résolution', 'Sa ___ est prise : il ira jusqu\'au bout.', ['résolvement', 'résolvance', 'résoudure'], 'tion'],
    ['verbe_nom', 3, 'entretenir', 'entretien', 'L\'___ du jardin coûte cher chaque année.', ['entretenement', 'entretenance', 'entreteniture'], 'nom0'],
    ['verbe_nom', 3, 'rassembler', 'rassemblement', 'Le ___ des élèves aura lieu à huit heures.', ['rassemblation', 'rassemblance', 'rassembleur'], 'mentn'],
    ['verbe_nom', 3, 'avertir', 'avertissement', 'Il a reçu un ___ du directeur.', ['avertition', 'avertissance', 'avertiture'], 'mentn'],
    ['verbe_nom', 4, 'épanouir', 'épanouissement', 'L\'___ de l\'enfant passe aussi par le jeu.', ['épanouition', 'épanouissance', 'épanouiture'], 'mentn'],

    // ── Du nom à l'adjectif ──────────────────────────────────────────
    ['nom_adjectif', 3, 'mois', 'mensuel', 'Le magazine ___ paraît le premier du mois.', ['moisuel', 'mensal', 'mensueux'], 'el', 'Le radical vient du latin : mois → <b>mens-</b> → mensuel.'],
    ['nom_adjectif', 4, 'an', 'annuelle', 'La fête ___ du village a lieu en décembre.', ['annuel', 'anuelle', 'annale'], 'el', '« La fête » est <b>féminin</b> : annuel → <b>annuelle</b>.'],
    ['nom_adjectif', 4, 'semaine', 'hebdomadaire', 'Il achète toujours le journal ___ .', ['semainier', 'semainal', 'hebdomadal'], 'aire', 'Le radical vient du grec : semaine → <b>hebdomad-</b> → hebdomadaire.'],
    ['nom_adjectif', 3, 'enfant', 'enfantin', 'C\'est un raisonnement ___ .', ['enfantal', 'enfanteux', 'enfantier'], 'inadj'],
    ['nom_adjectif', 4, 'montagne', 'montagneuses', 'Les régions ___ sont plus fraîches.', ['montagneux', 'montagneuse', 'montagnales'], 'eux', '« Les régions » est <b>féminin pluriel</b> : montagneux → <b>montagneuses</b>.'],
    ['nom_adjectif', 4, 'orage', 'orageuse', 'La nuit a été ___ sur tout le nord de l\'île.', ['orageux', 'orageuxe', 'oragale'], 'eux', '« La nuit » est <b>féminin</b> : orageux → <b>orageuse</b>.'],
    ['nom_adjectif', 4, 'peuple', 'populaire', 'Le séga est une musique très ___ .', ['peuplaire', 'peupleux', 'populeux'], 'aire', 'Piège : <b>populeux</b> existe, mais veut dire « très peuplé ».'],
    ['nom_adjectif', 4, 'campagne', 'campagnarde', 'La vie ___ est plus calme qu\'en ville.', ['campagnard', 'campagnal', 'campagneuse'], 'inadj', '« La vie » est <b>féminin</b> : campagnard → <b>campagnarde</b>.'],
    ['nom_adjectif', 4, 'mer', 'maritime', 'Le trafic ___ augmente chaque année à Port-Louis.', ['marital', 'mareux', 'merien'], 'savant', 'Piège : <b>marital</b> existe, mais se rapporte au mari.'],
    ['nom_adjectif', 3, 'île', 'insulaire', 'La population ___ est très variée.', ['îlien', 'îlaire', 'insulal'], 'aire', 'Le radical vient du latin : île → <b>insul-</b> → insulaire.'],
    ['nom_adjectif', 3, 'terre', 'terrestre', 'Les animaux ___ respirent l\'air.', ['terrien', 'terral', 'terreux'], 'savant', 'Piège : <b>terreux</b> veut dire « couvert de terre ».'],
    ['nom_adjectif', 4, 'ciel', 'céleste', 'Un corps ___ a traversé le ciel cette nuit.', ['cielaire', 'cieleux', 'célestal'], 'savant'],
    ['nom_adjectif', 3, 'main', 'manuel', 'Il a choisi un métier ___ .', ['mainuel', 'manal', 'maineux'], 'el', 'Le radical vient du latin : main → <b>man-</b> → manuel.'],
    ['nom_adjectif', 4, 'amitié', 'amicale', 'Elle m\'a écrit une lettre très ___ .', ['amical', 'amitieuse', 'amitiale'], 'al', '« une lettre » est <b>féminin</b> : amical → <b>amicale</b>.'],
    ['nom_adjectif', 4, 'silence', 'silencieuse', 'Toute la classe est restée ___ .', ['silencieux', 'silencial', 'silenceuse'], 'eux', '« La classe » est <b>féminin</b> : silencieux → <b>silencieuse</b>.'],
    ['nom_adjectif', 4, 'respect', 'respectueux', 'Il est toujours ___ envers ses aînés.', ['respectif', 'respectal', 'respecteux'], 'eux', 'Piège : <b>respectif</b> existe, mais veut dire « de chacun ».'],
    ['nom_adjectif', 3, 'mensonge', 'mensonger', 'C\'est un discours ___ du début à la fin.', ['mensongeux', 'mensongeal', 'mensongier'], 'ier'],
    ['nom_adjectif', 3, 'orgueil', 'orgueilleux', 'Ce garçon est bien trop ___ .', ['orgueilleur', 'orgueilal', 'orgueilier'], 'eux'],
    ['nom_adjectif', 4, 'malheur', 'malheureuse', 'Elle a eu une enfance ___ .', ['malheureux', 'malheuraise', 'malheurale'], 'eux', '« une enfance » est <b>féminin</b> : malheureux → <b>malheureuse</b>.'],
    ['nom_adjectif', 3, 'bruit', 'bruyant', 'Le quartier est très ___ le samedi soir.', ['bruiteux', 'bruital', 'bruitant'], 'antadj'],

    // ── De l'adjectif à l'adverbe ────────────────────────────────────
    ['adjectif_adverbe', 3, 'évident', 'évidemment', '___ , il avait raison depuis le début.', ['évidentement', 'évidamment', 'évidment'], 'advem'],
    ['adjectif_adverbe', 3, 'intelligent', 'intelligemment', 'Il a résolu le problème très ___ .', ['intelligentement', 'intelligamment', 'intelligment'], 'advem'],
    ['adjectif_adverbe', 3, 'différent', 'différemment', 'Chacun réagit ___ devant le danger.', ['différentement', 'différamment', 'différment'], 'advem'],
    ['adjectif_adverbe', 3, 'fréquent', 'fréquemment', 'Il vient ___ nous rendre visite.', ['fréquentement', 'fréquamment', 'fréqument'], 'advem'],
    ['adjectif_adverbe', 4, 'apparent', 'apparemment', '___ , personne n\'avait rien remarqué.', ['apparentement', 'apparamment', 'apparment'], 'advem', 'Piège : <b>apparentement</b> existe, mais c\'est un nom qui veut dire « alliance ».'],
    ['adjectif_adverbe', 3, 'suffisant', 'suffisamment', 'Il n\'a pas ___ dormi cette semaine.', ['suffisantement', 'suffisemment', 'suffisment'], 'adva'],
    ['adjectif_adverbe', 3, 'élégant', 'élégamment', 'Elle s\'habille toujours très ___ .', ['élégantement', 'élégemment', 'élégment'], 'adva'],
    ['adjectif_adverbe', 4, 'savant', 'savamment', 'Le décor du spectacle est ___ arrangé.', ['savantement', 'savemment', 'savment'], 'adva'],
    ['adjectif_adverbe', 3, 'puissant', 'puissamment', 'Le moteur du bateau ronfle ___ .', ['puissantement', 'puissemment', 'puissment'], 'adva'],
    ['adjectif_adverbe', 3, 'abondant', 'abondamment', 'Il a plu ___ hier soir.', ['abondantement', 'abondemment', 'abondment'], 'adva'],
    ['adjectif_adverbe', 3, 'précis', 'précisément', 'C\'est ___ ce que je voulais dire.', ['précisement', 'précisemment', 'précisamment'], 'advac'],
    ['adjectif_adverbe', 3, 'énorme', 'énormément', 'Il a ___ travaillé pour cet examen.', ['énormement', 'énormemment', 'énormament'], 'advac'],
    ['adjectif_adverbe', 3, 'profond', 'profondément', 'Après cette longue marche, elle dort ___ .', ['profondement', 'profondemment', 'profondamment'], 'advac'],
    ['adjectif_adverbe', 4, 'commun', 'communément', 'Ce mot est ___ employé à Maurice.', ['communement', 'communemment', 'communamment'], 'advac'],
    ['adjectif_adverbe', 4, 'aveugle', 'aveuglément', 'Il lui a fait confiance ___ .', ['aveuglement', 'aveuglemment', 'aveuglamment'], 'advac', 'Piège : <b>aveuglement</b> sans accent existe, mais c\'est un nom qui désigne le fait de ne rien vouloir voir.'],
    ['adjectif_adverbe', 4, 'bref', 'brièvement', 'Réponds ___ à la question posée.', ['brefment', 'brèvement', 'brièvment'], 'advi'],
    ['adjectif_adverbe', 3, 'naturel', 'naturellement', 'Il s\'exprime ___ devant la classe.', ['naturelement', 'naturelment', 'naturellemment'], 'adve'],
    ['adjectif_adverbe', 3, 'réel', 'réellement', 'A-t-il ___ dit cela devant tout le monde ?', ['réelement', 'réelment', 'réellemment'], 'adve'],
    ['adjectif_adverbe', 4, 'nouveau', 'nouvellement', 'Le pont ___ construit est déjà fermé.', ['nouveaument', 'nouvelment', 'nouvellemment'], 'adve', 'nouveau → <b>nouvelle</b> → nouvellement.'],
    ['adjectif_adverbe', 4, 'bien', 'mieux', 'Aujourd\'hui, il travaille ___ qu\'hier.', ['meilleur', 'bonnement', 'bienement'], 'advi', 'Piège : <b>meilleur</b> est le comparatif de l\'ADJECTIF « bon » ; <b>mieux</b> est celui de l\'ADVERBE « bien ».'],

    // ── Former un verbe ──────────────────────────────────────────────
    ['former_verbe', 3, 'riche', 'enrichir', 'Ce voyage va ___ ta culture générale.', ['richer', 'richir', 'richisser'], 'verpr'],
    ['former_verbe', 4, 'faible', 'affaiblir', 'La maladie va l\'___ pendant plusieurs semaines.', ['faiblir', 'faibliser', 'enfaiblir'], 'verpr', 'Piège : <b>faiblir</b> existe, mais on ne peut pas « faiblir quelqu\'un » - il faut le verbe transitif <b>affaiblir</b>.'],
    ['former_verbe', 3, 'profond', 'approfondir', 'Il faut ___ tes connaissances en histoire.', ['profondir', 'enprofondir', 'profonder'], 'verpr'],
    ['former_verbe', 3, 'court', 'raccourcir', 'La couturière va ___ cette jupe.', ['courtir', 'courcir', 'encourcir'], 'verpr'],
    ['former_verbe', 4, 'long', 'allonger', 'On va ___ la table pour le repas de famille.', ['longer', 'longir', 'enlonger'], 'verpr', 'Piège : <b>longer</b> existe, mais veut dire « suivre le bord de ».'],
    ['former_verbe', 3, 'nouveau', 'renouveler', 'Il faut ___ ton passeport avant le voyage.', ['nouveler', 'renouver', 'nouveauter'], 'verpr'],
    ['former_verbe', 3, 'clair', 'éclaircir', 'Le ciel va s\'___ dans l\'après-midi.', ['clairir', 'clairer', 'enclaircir'], 'verpr'],
    ['former_verbe', 3, 'force', 'renforcer', 'Il faut ___ la clôture avant le cyclone.', ['forciser', 'enforcer', 'forçonner'], 'verpr'],
    ['former_verbe', 3, 'terre', 'atterrir', 'L\'avion va ___ dans dix minutes.', ['terrir', 'enterrir', 'terriser'], 'verpr'],
    ['former_verbe', 2, 'liberté', 'libérer', 'Ils vont ___ les oiseaux blessés.', ['libertiser', 'libérir', 'liberter'], 'ver'],
    ['former_verbe', 3, 'mémoire', 'mémoriser', 'Tu dois ___ ce poème pour vendredi.', ['mémorier', 'mémoirer', 'mémoriquer'], 'iser'],
    ['former_verbe', 3, 'économie', 'économiser', 'Il faut ___ l\'eau pendant la sécheresse.', ['économer', 'économir', 'économiquer'], 'iser'],
    ['former_verbe', 3, 'moderne', 'moderniser', 'La commune va ___ l\'hôpital du village.', ['moderner', 'modernir', 'modernifier'], 'iser'],
    ['former_verbe', 4, 'sensible', 'sensibiliser', 'La campagne veut ___ les jeunes au tri des déchets.', ['sensibler', 'sensibilir', 'sensiter'], 'iser'],
    ['former_verbe', 3, 'juste', 'justifier', 'Tu dois ___ ton absence par un mot des parents.', ['juster', 'justir', 'justiser'], 'ifier'],
    ['former_verbe', 3, 'simple', 'simplifier', 'Il faut ___ cette phrase trop longue.', ['simpler', 'simplir', 'simpliser'], 'ifier'],
    ['former_verbe', 4, 'solide', 'solidifier', 'Le froid va ___ la graisse dans la casserole.', ['solider', 'solidir', 'solidiser'], 'ifier'],
    ['former_verbe', 4, 'nombre', 'dénombrer', 'Il est impossible de ___ les étoiles à l\'œil nu.', ['nombrer', 'nombrir', 'ennombrer'], 'verpr'],
    ['former_verbe', 4, 'paix', 'apaiser', 'Ses paroles ont réussi à ___ la dispute.', ['paiser', 'paisir', 'empaiser'], 'verpr'],
    ['former_verbe', 4, 'nature', 'dénaturer', 'La pollution finit par ___ le lagon.', ['naturer', 'naturiser', 'ennaturer'], 'verpr'],

    // ── Préfixes ─────────────────────────────────────────────────────
    ['prefixes', 3, 'probable', 'improbable', 'Une telle coïncidence est ___ .', ['inprobable', 'désprobable', 'méprobable'], 'pin'],
    ['prefixes', 3, 'supportable', 'insupportable', 'Ce bruit de marteau est ___ .', ['imsupportable', 'désupportable', 'mésupportable'], 'pin'],
    ['prefixes', 4, 'réparable', 'irréparable', 'Le cyclone a causé un dégât ___ .', ['inréparable', 'imréparable', 'désréparable'], 'pin'],
    ['prefixes', 4, 'remplaçable', 'irremplaçable', 'Pour cette équipe, ce joueur est ___ .', ['inremplaçable', 'imremplaçable', 'désremplaçable'], 'pin'],
    ['prefixes', 4, 'rationnel', 'irrationnel', 'Sa peur des lézards est ___ .', ['inrationnel', 'imrationnel', 'désrationnel'], 'pin'],
    ['prefixes', 3, 'limité', 'illimité', 'Le forfait offre un accès ___ à Internet.', ['inlimité', 'imlimité', 'délimité'], 'pin', 'Piège : <b>délimité</b> existe, mais veut dire « dont on a tracé les limites ».'],
    ['prefixes', 4, 'lettré', 'illettré', 'Autrefois, beaucoup d\'adultes étaient ___ .', ['inlettré', 'imlettré', 'délettré'], 'pin'],
    ['prefixes', 3, 'moral', 'immoral', 'Un tel mensonge est ___ .', ['inmoral', 'désmoral', 'mémoral'], 'pin'],
    ['prefixes', 4, 'matériel', 'immatériel', 'Les chants et les contes forment le patrimoine ___ .', ['inmatériel', 'désmatériel', 'mématériel'], 'pin'],
    ['prefixes', 4, 'estimer', 'sous-estimer', 'Il ne faut jamais ___ ses adversaires.', ['désestimer', 'inestimer', 'contre-estimer'], 'psous'],
    ['prefixes', 4, 'évaluer', 'sous-évaluer', 'L\'entrepreneur a eu tort de ___ le coût des travaux.', ['désévaluer', 'inévaluer', 'contre-évaluer'], 'psous'],
    ['prefixes', 3, 'chargé', 'surchargé', 'Le camion est ___ : il roule beaucoup trop lentement.', ['suchargé', 'hyperchargé', 'préchargé'], 'psur'],
    ['prefixes', 3, 'peuplé', 'surpeuplé', 'Ce quartier est ___ depuis dix ans.', ['supeuplé', 'hyperpeuplé', 'prépeuplé'], 'psur'],
    ['prefixes', 3, 'voir', 'prévoir', 'Il faut ___ la pluie et emporter un parapluie.', ['prévoyer', 'antivoir', 'revoir'], 'ppre'],
    ['prefixes', 3, 'dire', 'prédire', 'Personne ne peut ___ l\'avenir.', ['prédiser', 'antidire', 'redire'], 'ppre'],
    ['prefixes', 4, 'dire', 'contredire', 'Tu ne dois pas ___ ton professeur devant la classe.', ['antidire', 'desdire', 'sousdire'], 'pcont'],
    ['prefixes', 3, 'paraître', 'disparaître', 'Le soleil va ___ derrière la montagne.', ['déparaître', 'misparaître', 'apparaître'], 'pdes', 'Piège : <b>apparaître</b> dit exactement le contraire de ce que demande la phrase.'],
    ['prefixes', 3, 'national', 'international', 'Plaisance est un aéroport ___ .', ['intranational', 'extranational', 'entrenational'], 'pinter'],
    ['prefixes', 4, 'former', 'transformer', 'La chaleur va ___ la glace en eau.', ['entreformer', 'intraformer', 'superformer'], 'ptrans'],
    ['prefixes', 3, 'construire', 'reconstruire', 'Après le cyclone, il a fallu ___ toute l\'école.', ['déconstruire', 'méconstruire', 'inconstruire'], 'pre'],
  ];

  let n = 0;
  for (const [subsection, difficulty, base, answer, sentence, wrong, rule, extra] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6fr-form-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Écris la forme correcte du mot entre parenthèses.<br>« ${sentence} » &nbsp;<b>(${base})</b>`,
      options: [answer, ...wrong],
      answer,
      hint: HINTS[subsection],
      explanation: `« <b>${answer}</b> » - ${base} → ${answer}. ${RULES[rule]}${extra ? ' ' + extra : ''}`,
    }));
  }
})();
