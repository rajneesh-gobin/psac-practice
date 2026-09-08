'use strict';
// Grade 5 French - Formation des Mots (dérivation lexicale).
// PSAC Q7 ("Écris la forme correcte du mot entre parenthèses", 10 marks) is set
// every year. Five of these rows are the 2025 paper's own items, kept verbatim.
// Data table + loop, like extended_practice_bank.js: the linguistics live in the
// table, so a wrong suffix is a one-line fix and not a hunt through 100 blocks.
(function () {
  const CH = 'g5fr-formation';

  const RULES = {
    tion:  'Verbe → nom en <b>-tion / -sion</b> : décider → décision, punir → punition, protéger → protection.',
    mentn: 'Verbe → nom en <b>-ment</b> : changer → changement, ranger → rangement. À ne pas confondre avec le -ment des adverbes.',
    age:   'Verbe → nom en <b>-age</b> : atterrir → atterrissage, jardiner → jardinage, laver → lavage.',
    ure:   'Verbe → nom en <b>-ure</b> : blesser → blessure, peindre → peinture, ouvrir → ouverture.',
    ance:  'Verbe → nom en <b>-ance / -ence</b> : naître → naissance, obéir → obéissance, connaître → connaissance.',
    al:    'Nom → adjectif en <b>-al</b> : hiver → hivernal, nation → national. Féminin <b>-ale</b>, masculin pluriel <b>-aux</b>.',
    el:    'Nom → adjectif en <b>-el / -elle</b> : nature → naturel, culture → culturel, tradition → traditionnel(le).',
    eux:   'Nom → adjectif en <b>-eux</b>, féminin <b>-euse</b> : danger → dangereux / dangereuse.',
    ier:   'Nom → adjectif en <b>-ier</b>, féminin <b>-ière</b> : lait → laitier, une vache laitière, des produits laitiers.',
    ique:  'Nom → adjectif en <b>-ique</b> : histoire → historique, science → scientifique, tourisme → touristique.',
    adjif: 'Nom → adjectif en <b>-if</b>, féminin <b>-ive</b> : sport → sportif / sportive, attention → attentif / attentive.',
    aire:  'Nom → adjectif en <b>-aire</b> : banque → bancaire, université → universitaire, alimentation → alimentaire.',
    adve:  'Adverbe = adjectif au <b>féminin</b> + <b>-ment</b> : sérieux → sérieuse → sérieusement, léger → légère → légèrement.',
    adva:  'Adjectif en <b>-ant</b> → adverbe en <b>-amment</b> : constant → constamment, courant → couramment.',
    advem: 'Adjectif en <b>-ent</b> → adverbe en <b>-emment</b>, qui se prononce « -amment » : prudent → prudemment.',
    advi:  'Quelques adverbes sont irréguliers et s\'apprennent par cœur : gentil → gentiment, bon → bien, mauvais → mal.',
    ver:   'Nom → verbe du <b>1er groupe</b> en <b>-er</b> : pollution → polluer, décoration → décorer, plantation → planter.',
    vir:   'Nom ou adjectif → verbe du <b>2e groupe</b> en <b>-ir</b> : rouge → rougir, choix → choisir, noir → noircir.',
    pin:   'Le préfixe <b>in-</b> dit le contraire. Il devient <b>im-</b> devant m, b, p ; <b>il-</b> devant l ; <b>ir-</b> devant r.',
    pmal:  'Les préfixes <b>mal-</b> et <b>mé-</b> disent aussi le contraire : honnête → malhonnête, content → mécontent.',
    pdes:  'Le préfixe <b>dé- / dés-</b> dit l\'action inverse : ordre → désordre, coudre → découdre, charger → décharger.',
    pre:   'Le préfixe <b>re- / ré-</b> ne dit pas le contraire : il dit <b>une deuxième fois</b>. lire → relire, chauffer → réchauffer.',
  };

  const HINTS = {
    verbe_nom:        'Il faut un <b>nom</b> : regarde le déterminant devant le trou (le, la, l\', un, une, des).',
    nom_adjectif:     'Il faut un <b>adjectif</b> - et vérifie ensuite son <b>accord</b> avec le nom qu\'il qualifie.',
    adjectif_adverbe: 'Mets l\'adjectif au <b>féminin</b> puis ajoute <b>-ment</b>. Sauf en <b>-ant</b> (→ -amment) et en <b>-ent</b> (→ -emment).',
    former_verbe:     'Il faut un <b>verbe</b>. Après « doit », « va », « il faut », « veut », on écrit l\'<b>infinitif</b>.',
    prefixes:         'Le mot existe déjà : ajoute devant lui le préfixe qui dit le <b>contraire</b>.',
  };

  const ROWS = [
    // ── Du verbe au nom ──────────────────────────────────────────────
    ['verbe_nom', 2, 'décider', 'décision', 'Papa a pris une bonne ___ .', ['décidement', 'décidage', 'décideur'], 'tion', 'Question posée telle quelle au PSAC 2025 (Q7a).'],
    ['verbe_nom', 2, 'punir', 'punition', 'Le maître lui a donné une ___ .', ['punissement', 'punissage', 'punisseur'], 'tion'],
    ['verbe_nom', 2, 'protéger', 'protection', 'La ___ des animaux est l\'affaire de tous.', ['protégement', 'protégeage', 'protecteur'], 'tion', 'Piège : <b>protecteur</b> est la personne, pas l\'action.'],
    ['verbe_nom', 2, 'respirer', 'respiration', 'Sa ___ est rapide après la course.', ['respirement', 'respirage', 'respireur'], 'tion'],
    ['verbe_nom', 2, 'inviter', 'invitation', 'J\'ai reçu une ___ à la fête.', ['invitement', 'invitage', 'inviteur'], 'tion'],
    ['verbe_nom', 3, 'réunir', 'réunion', 'La ___ des parents aura lieu jeudi.', ['réunissement', 'réunissage', 'réunisseur'], 'tion'],
    ['verbe_nom', 2, 'augmenter', 'augmentation', 'Il y a eu une ___ du prix du pain.', ['augmentement', 'augmentage', 'augmenteur'], 'tion'],
    ['verbe_nom', 3, 'construire', 'construction', 'La ___ du pont a commencé en mars.', ['construisement', 'construisage', 'constructeur'], 'tion'],
    ['verbe_nom', 2, 'changer', 'changement', 'Il y a eu un ___ de programme.', ['changition', 'changeage', 'changeur'], 'mentn'],
    ['verbe_nom', 2, 'commencer', 'commencement', 'Le ___ du film est très amusant.', ['commencition', 'commençage', 'commenceur'], 'mentn'],
    ['verbe_nom', 3, 'développer', 'développement', 'Le ___ de l\'île continue chaque année.', ['développation', 'développage', 'développeur'], 'mentn'],
    ['verbe_nom', 3, 'déménager', 'déménagement', 'Le ___ aura lieu samedi matin.', ['déménagition', 'déménagerie', 'déménageur'], 'mentn'],
    ['verbe_nom', 3, 'remercier', 'remerciement', 'Il a envoyé une lettre de ___ .', ['remerciation', 'remerciage', 'remercieur'], 'mentn'],
    ['verbe_nom', 2, 'blesser', 'blessure', 'Sa ___ au genou guérit vite.', ['blessement', 'blessation', 'blesseur'], 'ure'],
    ['verbe_nom', 2, 'brûler', 'brûlure', 'Il a une petite ___ à la main.', ['brûlement', 'brûlation', 'brûleur'], 'ure'],
    ['verbe_nom', 3, 'peindre', 'peinture', 'La ___ du mur est encore fraîche.', ['peignage', 'peindement', 'peigneur'], 'ure'],
    ['verbe_nom', 3, 'naître', 'naissance', 'La ___ de ma petite sœur était en mai.', ['naîtrement', 'naîtration', 'naisseur'], 'ance'],
    ['verbe_nom', 3, 'connaître', 'connaissance', 'Il a une bonne ___ de l\'histoire de Maurice.', ['connaîtrement', 'connaîtration', 'connaisseur'], 'ance', 'Piège : <b>connaisseur</b> existe, mais c\'est la personne, pas le savoir.'],
    ['verbe_nom', 3, 'obéir', 'obéissance', 'L\'___ est une qualité utile en classe.', ['obéition', 'obéiment', 'obéisseur'], 'ance'],
    ['verbe_nom', 3, 'atterrir', 'atterrissage', 'L\'___ de l\'avion a été très doux.', ['atterrition', 'atterrissement', 'atterrisseur'], 'age'],

    // ── Du nom à l'adjectif ──────────────────────────────────────────
    ['nom_adjectif', 2, 'hiver', 'hivernal', 'Il fait très froid. C\'est un temps ___ .', ['hivernel', 'hivernale', 'hiverneux'], 'al', 'Question posée telle quelle au PSAC 2025 (Q7b). « un temps » est masculin singulier.'],
    ['nom_adjectif', 4, 'lait', 'laitiers', 'Bébé prend des produits ___ pour bien grandir.', ['laitières', 'laiteux', 'laités'], 'ier', 'Question posée telle quelle au PSAC 2025 (Q7d). « des produits » est masculin <b>pluriel</b> : « laitier » seul coûte le point.'],
    ['nom_adjectif', 3, 'automne', 'automnal', 'Le paysage ___ est magnifique.', ['automnel', 'automnale', 'automneux'], 'al'],
    ['nom_adjectif', 2, 'nation', 'national', 'Le drapeau ___ flotte devant l\'école.', ['nationnel', 'nationale', 'nationeux'], 'al'],
    ['nom_adjectif', 2, 'région', 'régional', 'Le journal ___ paraît le lundi.', ['régionnel', 'régionale', 'régioneux'], 'al'],
    ['nom_adjectif', 2, 'nature', 'naturel', 'C\'est un jus de fruit ___ .', ['natural', 'naturelle', 'natureux'], 'el'],
    ['nom_adjectif', 3, 'culture', 'culturel', 'Le centre ___ est ouvert le samedi.', ['cultural', 'culturelle', 'cultureux'], 'el'],
    ['nom_adjectif', 3, 'accident', 'accidentel', 'Les pompiers parlent d\'un incendie ___ .', ['accidental', 'accidentelle', 'accidenteux'], 'el'],
    ['nom_adjectif', 4, 'tradition', 'traditionnelle', 'Le séga est une danse ___ de Maurice.', ['traditionnel', 'traditionnal', 'traditionneuse'], 'el', '« une danse » est <b>féminin</b> : traditionnel → <b>traditionnelle</b>, avec deux l et un e.'],
    ['nom_adjectif', 3, 'profession', 'professionnel', 'Son cousin est un joueur ___ .', ['professional', 'professionnelle', 'professionneux'], 'el'],
    ['nom_adjectif', 3, 'science', 'scientifique', 'Il lit une revue ___ chaque mois.', ['scientique', 'sciencieux', 'sciental'], 'ique'],
    ['nom_adjectif', 3, 'histoire', 'historique', 'Le Château de Labourdonnais est un lieu ___ .', ['historial', 'historieux', 'histoirique'], 'ique'],
    ['nom_adjectif', 3, 'tourisme', 'touristique', 'Grand Baie est une région très ___ .', ['tourismique', 'touristal', 'touristeux'], 'ique'],
    ['nom_adjectif', 2, 'sport', 'sportif', 'Mon grand frère est très ___ .', ['sportique', 'sportal', 'sporteux'], 'adjif'],
    ['nom_adjectif', 3, 'attention', 'attentif', 'Sois ___ pendant toute la leçon !', ['attentieux', 'attentionnel', 'attential'], 'adjif'],
    ['nom_adjectif', 3, 'banque', 'bancaire', 'Son père a ouvert un compte ___ .', ['banquier', 'banqual', 'banqueux'], 'aire', 'Le radical change : banque → <b>banc-</b> → bancaire. « banquier » est la personne.'],
    ['nom_adjectif', 3, 'alimentation', 'alimentaire', 'Il faut une bonne hygiène ___ .', ['alimental', 'alimenteux', 'alimentier'], 'aire'],
    ['nom_adjectif', 3, 'université', 'universitaire', 'Ma cousine suit des études ___ .', ['universel', 'universital', 'universiteux'], 'aire', 'Piège : <b>universel</b> existe, mais veut dire « de tout le monde ».'],
    ['nom_adjectif', 4, 'danger', 'dangereuse', 'Cette route est ___ la nuit.', ['dangereux', 'dangereuxe', 'dangerale'], 'eux', '« Cette route » est <b>féminin</b> : dangereux → <b>dangereuse</b>.'],
    ['nom_adjectif', 4, 'montagne', 'montagneuse', 'La région ___ attire les randonneurs.', ['montagneux', 'montagnal', 'montagnier'], 'eux', '« La région » est <b>féminin</b> : montagneux → <b>montagneuse</b>.'],

    // ── De l'adjectif à l'adverbe ────────────────────────────────────
    ['adjectif_adverbe', 2, 'sérieux', 'sérieusement', 'Les élèves travaillent ___ en classe.', ['sérieuxement', 'sérieusment', 'sériousement'], 'adve', 'Question posée telle quelle au PSAC 2025 (Q7c). sérieux → <b>sérieuse</b> → sérieusement.'],
    ['adjectif_adverbe', 2, 'attentif', 'attentivement', 'Écoute ___ la consigne du maître.', ['attentifment', 'attentivment', 'attentieusement'], 'adve', 'attentif → <b>attentive</b> → attentivement.'],
    ['adjectif_adverbe', 2, 'actif', 'activement', 'Il participe ___ au projet de la classe.', ['actifment', 'activment', 'actieusement'], 'adve'],
    ['adjectif_adverbe', 3, 'vif', 'vivement', 'Je te remercie ___ de ton aide.', ['vifment', 'vivment', 'vieusement'], 'adve', 'vif → <b>vive</b> → vivement.'],
    ['adjectif_adverbe', 3, 'complet', 'complètement', 'Le cahier est ___ rempli.', ['completment', 'complètment', 'complétemment'], 'adve', 'complet → <b>complète</b> → complètement, avec un accent grave.'],
    ['adjectif_adverbe', 3, 'premier', 'premièrement', '___ , lis bien la consigne.', ['premierement', 'premièrment', 'premiéremment'], 'adve', 'premier → <b>première</b> → premièrement.'],
    ['adjectif_adverbe', 3, 'léger', 'légèrement', 'La table penche ___ vers la gauche.', ['légerement', 'légèrment', 'légéremment'], 'adve'],
    ['adjectif_adverbe', 3, 'fier', 'fièrement', 'Il porte ___ son uniforme.', ['fierement', 'fièrment', 'fiéremment'], 'adve'],
    ['adjectif_adverbe', 2, 'malheureux', 'malheureusement', '___ , la sortie a été annulée.', ['malheureuxement', 'malheureusment', 'malheureusemment'], 'adve'],
    ['adjectif_adverbe', 3, 'cruel', 'cruellement', 'L\'eau manque ___ dans ce village.', ['cruelement', 'cruelment', 'cruellemment'], 'adve', 'cruel → <b>cruelle</b> → cruellement, avec deux l.'],
    ['adjectif_adverbe', 3, 'prudent', 'prudemment', 'Mon oncle conduit ___ .', ['prudentement', 'prudamment', 'prudment'], 'advem'],
    ['adjectif_adverbe', 3, 'patient', 'patiemment', 'Elle attend ___ son tour.', ['patientement', 'patiamment', 'patiment'], 'advem'],
    ['adjectif_adverbe', 3, 'violent', 'violemment', 'La porte a claqué ___ .', ['violentement', 'violamment', 'violment'], 'advem'],
    ['adjectif_adverbe', 3, 'récent', 'récemment', 'Sa famille est arrivée ___ à Maurice.', ['récentement', 'récamment', 'récment'], 'advem'],
    ['adjectif_adverbe', 4, 'intelligent', 'intelligemment', 'Il a répondu très ___ au maître.', ['intelligentement', 'intelligamment', 'intelligment'], 'advem', 'On entend « -amment » mais on écrit <b>-emment</b>, parce que l\'adjectif finit par <b>-ent</b>.'],
    ['adjectif_adverbe', 3, 'constant', 'constamment', 'Il se plaint ___ du bruit.', ['constantement', 'constemment', 'constment'], 'adva'],
    ['adjectif_adverbe', 3, 'bruyant', 'bruyamment', 'Les élèves parlent ___ dans le couloir.', ['bruyantement', 'bruyemment', 'bruyment'], 'adva'],
    ['adjectif_adverbe', 3, 'méchant', 'méchamment', 'Il a répondu ___ à sa petite sœur.', ['méchantement', 'méchemment', 'méchment'], 'adva'],
    ['adjectif_adverbe', 4, 'courant', 'couramment', 'Ma tante parle ___ le français et l\'anglais.', ['courantement', 'couremment', 'courment'], 'adva', 'L\'adjectif finit par <b>-ant</b>, donc l\'adverbe s\'écrit <b>-amment</b>.'],
    ['adjectif_adverbe', 3, 'gentil', 'gentiment', 'Elle m\'a aidé très ___ .', ['gentillement', 'gentimment', 'gentielement'], 'advi'],

    // ── Former un verbe ──────────────────────────────────────────────
    ['former_verbe', 2, 'pollution', 'polluer', 'On ne doit pas ___ notre environnement.', ['pollutionner', 'polluter', 'polutier'], 'ver', 'Question posée telle quelle au PSAC 2025 (Q7e). Après « doit », on écrit l\'<b>infinitif</b>.'],
    ['former_verbe', 2, 'plantation', 'planter', 'Nous allons ___ un arbre dans la cour.', ['plantationner', 'plantier', 'plantiser'], 'ver'],
    ['former_verbe', 2, 'décoration', 'décorer', 'Il faut ___ la salle avant la fête.', ['décorationner', 'décorier', 'décoriser'], 'ver'],
    ['former_verbe', 2, 'respiration', 'respirer', 'Le médecin lui demande de ___ profondément.', ['respirationner', 'respirier', 'respiriser'], 'ver'],
    ['former_verbe', 2, 'organisation', 'organiser', 'Nous allons ___ une kermesse.', ['organisationner', 'organir', 'organiquer'], 'ver'],
    ['former_verbe', 2, 'réparation', 'réparer', 'Il faut ___ la barrière du jardin.', ['réparationner', 'réparier', 'répariser'], 'ver'],
    ['former_verbe', 3, 'explication', 'expliquer', 'Peux-tu m\'___ cette règle ?', ['explicationner', 'explicater', 'expliciser'], 'ver'],
    ['former_verbe', 2, 'téléphone', 'téléphoner', 'Je dois ___ au médecin ce matin.', ['téléphonier', 'téléphoniser', 'téléphonner'], 'ver'],
    ['former_verbe', 3, 'chaleur', 'chauffer', 'Il faut ___ le lait avant de le boire.', ['chaleurer', 'chalorer', 'chauffier'], 'ver', 'Le radical change : chaleur → <b>chauff-</b> → chauffer.'],
    ['former_verbe', 2, 'gel', 'geler', 'L\'eau va ___ dans le congélateur.', ['gelier', 'geloyer', 'gelisser'], 'ver'],
    ['former_verbe', 3, 'punition', 'punir', 'Le maître va le ___ s\'il recommence.', ['punitionner', 'punier', 'punisser'], 'vir'],
    ['former_verbe', 2, 'choix', 'choisir', 'Tu dois ___ un livre à la bibliothèque.', ['choiser', 'choixir', 'choisiser'], 'vir'],
    ['former_verbe', 3, 'réussite', 'réussir', 'Il veut ___ son examen de fin d\'année.', ['réussiter', 'réussiser', 'réussieter'], 'vir'],
    ['former_verbe', 1, 'fin', 'finir', 'Je vais ___ mes devoirs avant le dîner.', ['finer', 'finiser', 'finoyer'], 'vir'],
    ['former_verbe', 2, 'rouge', 'rougir', 'Il va ___ de honte.', ['rouger', 'rougier', 'rougeter'], 'vir'],
    ['former_verbe', 3, 'noir', 'noircir', 'La fumée va ___ tout le mur.', ['noirer', 'noirier', 'noircer'], 'vir'],
    ['former_verbe', 3, 'mince', 'mincir', 'Ma tante veut ___ un peu avant l\'été.', ['mincer', 'mincier', 'mincisser'], 'vir'],
    ['former_verbe', 3, 'pâle', 'pâlir', 'Il va ___ en entendant cette nouvelle.', ['pâler', 'pâlier', 'pâlisser'], 'vir'],
    ['former_verbe', 4, 'dur', 'durcir', 'Le ciment va ___ en séchant.', ['durer', 'durier', 'durcer'], 'vir', 'Piège : <b>durer</b> existe, mais veut dire « prendre du temps ». Ici il faut <b>durcir</b> : devenir dur.'],
    ['former_verbe', 3, 'vieux', 'vieillir', 'Personne n\'aime ___ .', ['vieuxir', 'vieuxer', 'vieillier'], 'vir', 'Le radical change : vieux → <b>vieill-</b> → vieillir.'],

    // ── Préfixes & contraires ────────────────────────────────────────
    ['prefixes', 3, 'régulier', 'irrégulier', 'Son écriture est ___ : les lettres n\'ont pas la même taille.', ['inrégulier', 'imrégulier', 'désrégulier'], 'pin', 'Devant un <b>r</b>, in- devient <b>ir-</b> et le r se double.'],
    ['prefixes', 3, 'responsable', 'irresponsable', 'Conduire aussi vite est ___ .', ['inresponsable', 'imresponsable', 'désresponsable'], 'pin'],
    ['prefixes', 3, 'réel', 'irréel', 'Ce paysage semble presque ___ .', ['inréel', 'imréel', 'désréel'], 'pin'],
    ['prefixes', 3, 'légal', 'illégal', 'Ce stationnement est ___ .', ['inlégal', 'imlégal', 'deslégal'], 'pin', 'Devant un <b>l</b>, in- devient <b>il-</b> et le l se double.'],
    ['prefixes', 3, 'lisible', 'illisible', 'Son devoir est ___ : personne ne peut le lire.', ['inlisible', 'imlisible', 'deslisible'], 'pin'],
    ['prefixes', 3, 'logique', 'illogique', 'Ton raisonnement est ___ .', ['inlogique', 'imlogique', 'délogique'], 'pin'],
    ['prefixes', 2, 'mobile', 'immobile', 'Le lézard reste ___ sur le mur.', ['inmobile', 'désmobile', 'mémobile'], 'pin', 'Devant un <b>m</b>, in- devient <b>im-</b>.'],
    ['prefixes', 2, 'prudent', 'imprudent', 'Ce conducteur est vraiment ___ .', ['inprudent', 'désprudent', 'méprudent'], 'pin'],
    ['prefixes', 2, 'correct', 'incorrect', 'Cette phrase est ___ : il manque le verbe.', ['imcorrect', 'décorrect', 'mécorrect'], 'pin'],
    ['prefixes', 2, 'croyable', 'incroyable', 'Cette histoire de dodo vivant est ___ .', ['imcroyable', 'décroyable', 'mécroyable'], 'pin'],
    ['prefixes', 2, 'certain', 'incertain', 'Le résultat du match est encore ___ .', ['imcertain', 'décertain', 'mécertain'], 'pin'],
    ['prefixes', 3, 'honnête', 'malhonnête', 'Ce commerçant est ___ : il trompe ses clients.', ['inhonnête', 'imhonnête', 'méhonnête'], 'pmal'],
    ['prefixes', 3, 'adroit', 'maladroit', 'Il a renversé le verre : il est ___ .', ['inadroit', 'désadroit', 'méadroit'], 'pmal'],
    ['prefixes', 2, 'content', 'mécontent', 'Le directeur est ___ de ce bulletin.', ['incontent', 'décontent', 'acontent'], 'pmal'],
    ['prefixes', 3, 'coudre', 'découdre', 'Le bouton va se ___ si tu tires dessus.', ['incoudre', 'mécoudre', 'recoudre'], 'pdes', 'Piège : <b>recoudre</b> existe, mais veut dire « coudre à nouveau » - le contraire de ce que dit la phrase.'],
    ['prefixes', 3, 'charger', 'décharger', 'Il faut ___ le camion avant midi.', ['incharger', 'mécharger', 'rechargier'], 'pdes'],
    ['prefixes', 3, 'ordonné', 'désordonné', 'Sa chambre est ___ : rien n\'est à sa place.', ['inordonné', 'imordonné', 'méordonné'], 'pdes'],
    ['prefixes', 4, 'avantage', 'désavantage', 'Habiter loin de l\'école est un vrai ___ .', ['inavantage', 'imavantage', 'méavantage'], 'pdes'],
    ['prefixes', 4, 'lire', 'relire', 'Tu dois ___ ton texte avant de le rendre.', ['délire', 'mélire', 'inlire'], 'pre', 'Piège : <b>délire</b> existe, mais c\'est un nom qui veut dire tout autre chose.'],
    ['prefixes', 2, 'chauffer', 'réchauffer', 'Je vais ___ la soupe d\'hier.', ['déchauffer', 'méchauffer', 'inchauffer'], 'pre'],
  ];

  let n = 0;
  for (const [subsection, difficulty, base, answer, sentence, wrong, rule, extra] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5fr-form-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Écris la forme correcte du mot entre parenthèses.<br>« ${sentence} » &nbsp;<b>(${base})</b>`,
      options: [answer, ...wrong],
      answer,
      hint: HINTS[subsection],
      explanation: `« <b>${answer}</b> » - ${base} → ${answer}. ${RULES[rule]}${extra ? ' ' + extra : ''}`,
    }));
  }
})();
