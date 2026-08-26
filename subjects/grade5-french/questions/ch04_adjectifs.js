'use strict';
// Grade 5 French - Chapitre : Les Adjectifs
// IDs format: g5fr-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-adj-001', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'Comment forme-t-on généralement le féminin d\'un adjectif ?',
    options:['On ajoute -s','On ajoute -e','On change tout le mot','On ajoute -es'],
    answer:'On ajoute -e',
    hint:'Masculin : petit → féminin : petite.',
    explanation:'En général, on ajoute <b>-e</b> pour former le féminin d\'un adjectif : grand → grand<b>e</b>, petit → petit<b>e</b>, joli → joli<b>e</b>. Si l\'adjectif se termine déjà par -e, il ne change pas : rouge, facile, honnête.' }),

  makeMCQ({ id:'g5fr-adj-002', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'Quel est le féminin de l\'adjectif "grand" ?',
    options:['grande','grands','grandes','grandi'],
    answer:'grande',
    hint:'Masculin : grand → féminin : grand + ?',
    explanation:'"<b>Grande</b>" est le féminin de "grand". Règle générale : masculin + <b>-e</b> = féminin. La consonne finale qui était muette devient prononcée : "gran" → "grand<b>e</b>" (le d se prononce).' }),

  makeMCQ({ id:'g5fr-adj-003', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Quel est le féminin de "beau" ?',
    options:['beaue','belle','beau','beaux'],
    answer:'belle',
    hint:'"Beau" a une forme irrégulière au féminin.',
    explanation:'"<b>Belle</b>" est le féminin de "beau". Adjectifs irréguliers : beau → <b>belle</b>, nouveau → <b>nouvelle</b>, vieux → <b>vieille</b>. "Beau" → "bel" devant une voyelle (un bel homme).' }),

  makeMCQ({ id:'g5fr-adj-004', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Où se place généralement l\'adjectif de COULEUR en français ?',
    options:['Avant le nom','Après le nom','N\'importe où dans la phrase','Au début de la phrase'],
    answer:'Après le nom',
    hint:'En français, la couleur vient après le nom qu\'elle décrit.',
    explanation:'Les adjectifs de couleur se placent <b>après</b> le nom : une robe <b>rouge</b>, un chat <b>noir</b>, des yeux <b>bleus</b>. En anglais, les adjectifs sont avant le nom (a red dress), mais en français, beaucoup d\'adjectifs viennent après.' }),

  makeMCQ({ id:'g5fr-adj-005', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Complétez : "C\'est une ___ maison." (petit)',
    options:['petit','petits','petite','petites'],
    answer:'petite',
    hint:'"Maison" est féminin. L\'adjectif doit s\'accorder.',
    explanation:'"C\'est une <b>petite</b> maison." - "Maison" est féminin singulier, donc l\'adjectif prend la forme féminine singulière : petit → petit<b>e</b>. Les adjectifs s\'accordent toujours en genre et en nombre avec le nom.' }),

  makeMCQ({ id:'g5fr-adj-006', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Quel est le pluriel de "un nouveau livre" ?',
    options:['des nouveaux livres','des nouvelles livres','des nouveau livres','des nouvel livres'],
    answer:'des nouveaux livres',
    hint:'"Nouveau" → pluriel masculin = nouveaux. "Livre" est masculin.',
    explanation:'"<b>Des nouveaux livres</b>" - "nouveau" (masc. sing.) → <b>nouveaux</b> (masc. plur.). Tableau : nouveau → nouveaux, nouvelle → nouvelles. Devant voyelle : bel, nouvel, vieil (singulier masculin seulement).' }),

  makeTF({ id:'g5fr-adj-007', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'En français, les adjectifs s\'accordent en genre et en nombre avec le nom qu\'ils décrivent.',
    answer:true,
    hint:'Un adjectif modifie un nom - il doit lui "correspondre".',
    explanation:'<b>Vrai.</b> Les adjectifs français s\'accordent toujours avec le nom : masculin/féminin, singulier/pluriel. Exemples : un garçon <b>grand</b> / une fille <b>grande</b> / des garçons <b>grands</b> / des filles <b>grandes</b>.' }),

  makeMCQ({ id:'g5fr-adj-008', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Complétez : "Les enfants sont ___." (heureux)',
    options:['heureuse','heureux','heureuses','heureux'],
    answer:'heureux',
    hint:'"Enfants" est masculin pluriel. La forme masculine de "heureux" ne change pas au pluriel.',
    explanation:'"Les enfants sont <b>heureux</b>." - "Heureux" est masculin pluriel (et aussi masculin singulier - la forme ne change pas). Féminin singulier/pluriel : heureus<b>e</b> / heureus<b>es</b>. Les adjectifs en -eux/-euse suivent ce modèle.' }),

  makeMCQ({ id:'g5fr-adj-009', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Quel est le féminin de "vieux" ?',
    options:['vieuxe','vielle','vieille','vieux'],
    answer:'vieille',
    hint:'"Vieux" est irrégulier comme "beau" et "nouveau".',
    explanation:'"<b>Vieille</b>" est le féminin de "vieux". Les trois irréguliers : beau → belle, nouveau → nouvelle, <b>vieux → vieille</b>. Devant voyelle (masculin singulier) : vieil (un vieil homme).' }),

  makeMCQ({ id:'g5fr-adj-010', chapterId:'fr-adjectifs', subsection:'demonstratifs', difficulty:2,
    question:'Parmi ces adjectifs, lequel se place généralement AVANT le nom ?',
    options:['rouge','français','grand','intéressant'],
    answer:'grand',
    hint:'Les adjectifs BAGS (Beauté, Âge, Grandeur, Forme courte) se placent avant le nom.',
    explanation:'"<b>Grand</b>" se place <b>avant</b> le nom : un <b>grand</b> immeuble, une <b>grande</b> ville. Règle BAGS : Beauté (beau, joli), Âge (jeune, vieux), Grandeur/nombre (grand, petit, gros), formes courtes (bon, mauvais) → avant le nom. Les autres (couleurs, nationalités, etc.) → après.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-adj-011', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'Quelle est la forme féminine de "blanc" ?',
    options:['blanche','blance','blanque','blanc'],
    answer:'blanche',
    hint:'Les adjectifs en -nc forment généralement leur féminin en -che.',
    explanation:'"<b>blanche</b>" - blanc → blanche. Autres adjectifs en -c → -che : sec → sèche, franc → franche. Note : "public" → "publique" est différent. Féminin : une fleur blanche, une voiture blanche.' }),

  makeMCQ({ id:'g5fr-adj-012', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'Quelle est la forme féminine de "sportif" ?',
    options:['sportive','sportife','sportiève','sportife'],
    answer:'sportive',
    hint:'Les adjectifs en -if changent en -ive au féminin.',
    explanation:'"<b>sportive</b>" - -if → -ive : sportif → sportive. Autres exemples : actif → active, naïf → naïve, attentif → attentive, négatif → négative. Question type très courante au PSAC !' }),

  makeMCQ({ id:'g5fr-adj-013', chapterId:'fr-adjectifs', subsection:'demonstratifs', difficulty:2,
    question:'Complétez : "Cette fille est très ___ ." (heureux)',
    options:['heureux','heureuse','heureuses','heureux'],
    answer:'heureuse',
    hint:'"Fille" est féminin singulier → forme féminine singulière de l\'adjectif.',
    explanation:'"<b>heureuse</b>" - heureux (masc.) → heureuse (fém.). Schéma -eux → -euse : heureux/heureuse, courageux/courageuse, sérieux/sérieuse, dangereux/dangereuse. L\'adjectif doit s\'accorder en genre et en nombre avec le nom qu\'il qualifie.' }),

  makeMCQ({ id:'g5fr-adj-014', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'Quel est le comparatif de supériorité de "grand" ?',
    options:['aussi grand','plus grand','le plus grand','très grand'],
    answer:'plus grand',
    hint:'Comparatif = more than → "plus + adjectif". Superlatif = the most → "le/la plus + adjectif".',
    explanation:'"<b>plus grand</b>" - le comparatif de supériorité. Structures : plus + adj (+ que) → comparatif de supériorité. aussi + adj (+ que) → comparatif d\'égalité. moins + adj (+ que) → comparatif d\'infériorité. Superlatif : le/la/les plus + adj.' }),

  makeMCQ({ id:'g5fr-adj-015', chapterId:'fr-adjectifs', subsection:'possessifs', difficulty:2,
    question:'Dans "son ventre est aussi doux que Caramel", pourquoi "doux" est-il au masculin ?',
    options:[
      '"doux" est toujours masculin',
      '"ventre" (stomach) est masculin → l\'adjectif est masculin',
      '"Caramel" est masculin',
      '"doux" ne change pas au féminin'
    ],
    answer:'"ventre" (stomach) est masculin → l\'adjectif est masculin',
    hint:'L\'adjectif s\'accorde avec le nom qu\'il qualifie. Quel nom "doux" qualifie-t-il ici ?',
    explanation:'"<b>ventre</b>" est masculin → "doux" reste au masculin. Si "ventre" était féminin, on dirait "douce". Règle d\'accord : l\'adjectif s\'accorde en genre ET en nombre avec le nom qu\'il qualifie. (Exemple tiré du manuel scolaire MIE Grade 5, PSAC 2025.)' }),

  makeTF({ id:'g5fr-adj-016', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'"La forme féminine de \'bon\' est \'bone\'."',
    answer:false,
    hint:'"Bon" a une forme féminine irrégulière.',
    explanation:'<b>Faux.</b> La forme féminine de "bon" est "<b>bonne</b>" (double n). Bon → bonne, mignon → mignonne, ancien → ancienne, moyen → moyenne. Ces adjectifs doublent la consonne finale au féminin. Autres irréguliers : beau → belle, vieux → vieille, nouveau → nouvelle.' }),

  makeMCQ({ id:'g5fr-adj-017', chapterId:'fr-adjectifs', subsection:'accord', difficulty:3,
    question:'Corrigez l\'ordre des adjectifs : "C\'est une voiture rouge vieille."',
    options:[
      'C\'est une rouge voiture vieille.',
      'C\'est une vieille voiture rouge.',
      'C\'est une voiture vieille rouge.',
      'C\'est une rouge vieille voiture.'
    ],
    answer:'C\'est une vieille voiture rouge.',
    hint:'"Vieille" (âge) = BAGS → avant le nom. "Rouge" (couleur) → après le nom.',
    explanation:'"<b>une vieille voiture rouge</b>" - Les adjectifs BAGS (Beauté, Âge, Bonté, Grandeur) se placent AVANT le nom : belle, vieille, bonne, grande. Les adjectifs de couleur se placent TOUJOURS après le nom : rouge, bleu, vert. Donc : vieille (avant) + voiture + rouge (après).' }),

  makeMCQ({ id:'g5fr-adj-018', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:3,
    question:'Quel est le superlatif de supériorité de "intelligent" pour un groupe masculin pluriel ?',
    options:['le plus intelligent','les plus intelligents','très intelligent','plus intelligent'],
    answer:'les plus intelligents',
    hint:'Superlatif + accord pluriel masculin.',
    explanation:'"<b>les plus intelligents</b>" - superlatif pour un groupe masculin pluriel : les + plus + adj (accordé au pluriel). "Ce sont les élèves les plus intelligents de l\'école." Féminin singulier : la plus intelligente. Pluriel féminin : les plus intelligentes.' }),

  makeMCQ({ id:'g5fr-adj-019', chapterId:'fr-adjectifs', subsection:'accord', difficulty:4,
    question:'Quelle phrase utilise les adjectifs CORRECTEMENT ?',
    options:[
      'Il porte un chapeau grand noir.',
      'Elle a de beaux yeux marron.',
      'C\'est une fille intelligente belle.',
      'Il a des cheveux noirs très longues.'
    ],
    answer:'Elle a de beaux yeux marron.',
    hint:'"Beau" (BAGS) est avant le nom ; "marron" (couleur) est après. Vérifiez aussi les accords.',
    explanation:'"<b>Elle a de beaux yeux marron.</b>" ✓ - beau (BAGS) → beaux (avant, masc. plur.), marron (couleur invariable → après, pas d\'accord). Erreurs : (1) "chapeau <b>grand</b> noir" → "grand" (BAGS) doit être avant : un <b>grand</b> chapeau noir ; (2) "fille intelligente belle" → beau (BAGS) doit être avant : une <b>belle</b> fille intelligente ; (3) "cheveux... <b>longues</b>" → cheveux est masculin → longs.' }),

  makeMCQ({ id:'g5fr-adj-020', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'Complétez avec le superlatif : "Pierre est ___ élève de la classe." (grand)',
    options:['le plus grand','le grand','plus grand','très grand'],
    answer:'le plus grand',
    hint:'Superlatif de supériorité : le/la/les + plus + adjectif.',
    explanation:'"Pierre est <b>le plus grand</b> élève." - Superlatif de supériorité : <b>le/la/les + plus + adjectif</b>. Exemples : la plus belle, les plus intelligents. Superlatif d\'infériorité : le/la/les + moins + adjectif : le moins grand.' }),

  makeMCQ({ id:'g5fr-adj-021', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'Quel est le comparatif irrégulier de "bon" ?',
    options:['plus bon','meilleur','mieux','plus bien'],
    answer:'meilleur',
    hint:'"Bon" a un comparatif irrégulier - on ne dit pas "plus bon" !',
    explanation:'"<b>meilleur/meilleure</b>" - bon → <b>meilleur(e)</b> (comparatif), le/la meilleur(e) (superlatif). On ne dit JAMAIS "plus bon". Autres irréguliers : mauvais → <b>pire</b> (ou plus mauvais), bien (adverbe) → <b>mieux</b>.' }),

  makeTF({ id:'g5fr-adj-022', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'"Plus mauvais" et "pire" sont tous les deux corrects comme comparatifs de "mauvais".',
    answer:true,
    hint:'Les deux formes existent, mais "pire" est plus soutenu.',
    explanation:'<b>Vrai.</b> "Pire" et "plus mauvais" sont tous les deux acceptés. "Pire" est plus courant dans la langue soignée : "C\'est pire qu\'avant." "Plus mauvais" est aussi correct : "Ce résultat est plus mauvais." Le superlatif : le/la pire.' }),

  makeMCQ({ id:'g5fr-adj-023', chapterId:'fr-adjectifs', subsection:'demonstratifs', difficulty:1,
    question:'"Ce gâteau est le meilleur." Que signifie cela ?',
    options:['This cake is good.','This cake is better.','This cake is the best.','This cake is very good.'],
    answer:'This cake is the best.',
    hint:'"Le meilleur" = superlatif (le + comparatif).',
    explanation:'"<b>the best</b>" - meilleur = better (comparatif), <b>le meilleur</b> = the best (superlatif). Exemples : Ce plat est bon. Ce plat est <b>meilleur</b> que l\'autre. Ce plat est <b>le meilleur</b> du restaurant.' }),

  makeMCQ({ id:'g5fr-adj-024', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Formez l\'adjectif : "Le temps est ___ aujourd\'hui." (nuage)',
    options:['nuageux','nuagé','nuagier','nuagal'],
    answer:'nuageux',
    hint:'"Nuage" + suffixe -eux → adjectif.',
    explanation:'"Le temps est <b>nuageux</b>." - nuage → <b>nuageux/nuageuse</b>. Le suffixe -eux/-euse forme des adjectifs à partir de noms : neige → neigeux/neigeuse, brouillard → brumeux, soleil → ensoleillé. (Féminin : nuageuse)' }),

  makeMCQ({ id:'g5fr-adj-025', chapterId:'fr-adjectifs', subsection:'accord', difficulty:1,
    question:'"Une journée ensoleillée" veut dire...',
    options:['a rainy day','a sunny day','a cold day','a windy day'],
    answer:'a sunny day',
    hint:'"Ensoleillé" vient de "soleil".',
    explanation:'"<b>une journée ensoleillée</b>" = a sunny day. Ensoleillé/ensoleillée vient de "soleil" (sun). D\'autres adjectifs météo : pluvieux/pluvieuse (rainy, de pluie), neigeux/neigeuse (snowy, de neige), venteux/venteuse (windy, de vent).' }),

  makeTF({ id:'g5fr-adj-026', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'"Neigeux" est un adjectif formé à partir du nom "neige".',
    answer:true,
    hint:'"Neige" + -eux/-euse.',
    explanation:'<b>Vrai.</b> neige → <b>neigeux/neigeuse</b>. Même formation : nuage → nuageux, pluie → pluvieux (irrégulier), brouillard → brumeux (irrégulier), chaleur → chaud (irrégulier). En météo, ces adjectifs décrivent les conditions climatiques.' }),

  makeMCQ({ id:'g5fr-adj-027', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Accordez le participe passé : "une porte ___" (fermer)',
    options:['fermé','fermée','fermés','fermer'],
    answer:'fermée',
    hint:'"Porte" est féminin singulier → accordez le participe passé.',
    explanation:'"une porte <b>fermée</b>" - "Porte" est féminin singulier → participe passé féminin singulier → fermé<b>e</b>. Règle : quand le participe passé est utilisé comme adjectif, il s\'accorde avec le nom : une porte fermée, un livre ouvert, des fenêtres fermées.' }),

  makeMCQ({ id:'g5fr-adj-028', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Accordez le participe passé : "des livres ___" (ouvrir)',
    options:['ouvert','ouverts','ouvertes','ouvrir'],
    answer:'ouverts',
    hint:'"Livres" est masculin pluriel → accordez le participe passé.',
    explanation:'"des livres <b>ouverts</b>" - "livres" est masculin pluriel → ouvert + <b>s</b>. Tableau d\'accord de "ouvert" : un livre ouvert, une fenêtre ouverte, des livres ouverts, des portes ouvertes.' }),

  makeMCQ({ id:'g5fr-adj-029', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'Quel adjectif est au superlatif dans : "Elles sont les plus courageuses de l\'équipe." ?',
    options:['courageuses','les','plus courageuses','les plus courageuses'],
    answer:'les plus courageuses',
    hint:'Le superlatif = article défini + plus + adjectif accordé.',
    explanation:'"<b>les plus courageuses</b>" - superlatif féminin pluriel de "courageux". Structure : les + plus + courageuses. "Les" s\'accorde avec le nom (elles → féminin pluriel). "De l\'équipe" complète le superlatif : les plus courageuses de l\'équipe.' }),

  makeMCQ({ id:'g5fr-adj-030', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:2,
    question:'Complétez le comparatif : "Cette route est ___ celle d\'hier." (dangereux, moins)',
    options:['moins dangereuse que','moins dangereux que','moins dangereuse de','pas dangereuse que'],
    answer:'moins dangereuse que',
    hint:'"Route" est féminin → accordez l\'adjectif. Comparatif d\'infériorité = moins + adj + que.',
    explanation:'"Cette route est <b>moins dangereuse que</b> celle d\'hier." - Route = féminin → dangereuse (fém.). Comparatif d\'infériorité : <b>moins + adjectif + que</b>. Exemples : moins grand que, moins belle que, moins intelligents que.' }),

  makeMCQ({ id:'g5fr-adj-031', chapterId:'fr-adjectifs', subsection:'comparatif', difficulty:3,
    question:'Superlatif irrégulier : "C\'est la ___ note possible." (mauvais)',
    options:['la plus mauvaise','la pire','la plus pire','la moins bonne'],
    answer:'la pire',
    hint:'"Mauvais" a un superlatif irrégulier.',
    explanation:'"C\'est <b>la pire</b> note." - mauvais → comparatif : pire / superlatif : la pire. "La pire note" = the worst mark. On dit aussi "la plus mauvaise" (acceptable mais moins courant). Exemples : le pire cauchemar, la pire journée.' }),

  makeTF({ id:'g5fr-adj-032', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'"Mieux" est la forme comparative de l\'adverbe "bien".',
    answer:true,
    hint:'"Bien" (adverbe) → "mieux" (comparatif), pas "meilleur".',
    explanation:'<b>Vrai.</b> "Bien" (adverbe) → comparatif : <b>mieux</b>. "Il chante mieux que moi." Ne pas confondre avec "meilleur" (adjectif) : "Ce gâteau est meilleur." Exemples : Elle travaille <b>mieux</b> maintenant. Tu vas <b>mieux</b> aujourd\'hui ?' }),

  makeMCQ({ id:'g5fr-adj-033', chapterId:'fr-adjectifs', subsection:'accord', difficulty:2,
    question:'Choisissez l\'adjectif dérivé de "pluie" : "Une journée ___"',
    options:['pluvieuse','pluieuse','pluieuxe','pluviale'],
    answer:'pluvieuse',
    hint:'"Pluie" → "pluvieux/pluvieuse" (attention : changement de radical).',
    explanation:'"Une journée <b>pluvieuse</b>" - pluie → <b>pluvieux/pluvieuse</b> (le radical change légèrement). Forme masculine : un temps pluvieux. Forme féminine : une journée pluvieuse.' }),

  makeMCQ({ id:'g5fr-adj-034', chapterId:'fr-adjectifs', subsection:'accord', difficulty:3,
    question:'Accordez le participe passé : "une lettre ___ à la main" (écrire)',
    options:['écrit','écrite','écrits','écrire'],
    answer:'écrite',
    hint:'"Lettre" est féminin singulier. Participe passé de "écrire" = écrit.',
    explanation:'"une lettre <b>écrite</b> à la main" - écrire → écrit (participe passé). "Lettre" = féminin singulier → écrit + <b>e</b> = <b>écrite</b>. Tableau : un message écrit / une lettre écrite / des messages écrits / des lettres écrites.' }),

  makeMCQ({ id:'g5fr-adj-035', chapterId:'fr-adjectifs', subsection:'possessifs', difficulty:4,
    question:'Comparez : "La mangue est ___ que la pomme" (bon) ET "Le résultat de Marc est ___ que celui de sa sœur" (mauvais).',
    options:['meilleure / pire','plus bonne / plus mauvaise','mieux / moins bon','meilleur / plus mauvais'],
    answer:'meilleure / pire',
    hint:'"Bon" → meilleur(e) ; "mauvais" → pire. Accordez avec le nom.',
    explanation:'"La mangue est <b>meilleure</b> que la pomme" - bon (fém.) → <b>meilleure</b>. "Le résultat est <b>pire</b>" - mauvais → <b>pire</b> (invariable en genre). Récapitulatif : bon → meilleur/meilleure ; mauvais → pire (ou plus mauvais) ; bien → mieux.' })

);
