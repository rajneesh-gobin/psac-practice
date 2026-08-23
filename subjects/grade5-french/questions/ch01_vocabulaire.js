'use strict';
// Grade 5 French — Chapitre : Vocabulaire de base
// IDs format: g5fr-voc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-voc-001', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Quelle salutation utilise-t-on le soir ?',
    options:['Bonjour','Bonsoir','Au revoir','Merci'],
    answer:'Bonsoir',
    hint:'On utilise "Bon-" suivi d\'un mot qui signifie "evening".',
    explanation:'"<b>Bonsoir</b>" s\'utilise le soir. "Bonjour" = le matin ou l\'après-midi. "Au revoir" = pour dire adieu. "Bonne nuit" = avant de dormir.' }),

  makeMCQ({ id:'g5fr-voc-002', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Comment dit-on la couleur ROUGE en français ?',
    options:['bleu','vert','rouge','jaune'],
    answer:'rouge',
    hint:'C\'est la couleur du sang et des tomates.',
    explanation:'"<b>Rouge</b>" = red. Les couleurs : rouge (red), bleu (blue), vert (green), jaune (yellow), noir (black), blanc (white), orange (orange), violet (purple), rose (pink).' }),

  makeMCQ({ id:'g5fr-voc-003', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Comment dit-on le nombre 15 en français ?',
    options:['cinquante','vingt','quinze','treize'],
    answer:'quinze',
    hint:'10 + 5 = ?',
    explanation:'"<b>Quinze</b>" = 15. Les nombres de 11 à 20 : onze (11), douze (12), treize (13), quatorze (14), <b>quinze</b> (15), seize (16), dix-sept (17), dix-huit (18), dix-neuf (19), vingt (20).' }),

  makeMCQ({ id:'g5fr-voc-004', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Quel jour vient après "mercredi" ?',
    options:['mardi','vendredi','jeudi','samedi'],
    answer:'jeudi',
    hint:'L\'ordre : lundi, mardi, mercredi, ___.',
    explanation:'L\'ordre des jours : lundi, mardi, mercredi, <b>jeudi</b>, vendredi, samedi, dimanche. Rappel : en français, les jours ne prennent pas de majuscule.' }),

  makeMCQ({ id:'g5fr-voc-005', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Quel est le cinquième mois de l\'année en français ?',
    options:['avril','juin','mars','mai'],
    answer:'mai',
    hint:'Janvier (1), février (2), mars (3), avril (4), ___ (5).',
    explanation:'"<b>Mai</b>" est le 5e mois. Les mois : janvier, février, mars, avril, <b>mai</b>, juin, juillet, août, septembre, octobre, novembre, décembre.' }),

  makeMCQ({ id:'g5fr-voc-006', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Que signifie "s\'il vous plaît" ?',
    options:['merci','au revoir','please / s\'il te plaît (formel)','bonjour'],
    answer:'please / s\'il te plaît (formel)',
    hint:'On l\'utilise pour faire une demande poliment.',
    explanation:'"<b>S\'il vous plaît</b>" = please (forme formelle ou pluriel). "S\'il te plaît" = please (forme informelle, à un ami). "Merci" = thank you. "De rien" = you\'re welcome.' }),

  makeTF({ id:'g5fr-voc-007', chapterId:'fr-vocabulaire', difficulty:1,
    question:'En français, les jours de la semaine et les mois prennent une majuscule.',
    answer:false,
    hint:'En anglais oui, mais en français ?',
    explanation:'<b>Faux.</b> En français, les jours (lundi, mardi…) et les mois (janvier, février…) s\'écrivent en <b>minuscule</b>. On écrit une majuscule uniquement au début d\'une phrase.' }),

  makeMCQ({ id:'g5fr-voc-008', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Comment dit-on "goodbye" en français ?',
    options:['bonjour','merci','au revoir','bonsoir'],
    answer:'au revoir',
    hint:'"Au revoir" signifie littéralement "until we see each other again".',
    explanation:'"<b>Au revoir</b>" = goodbye. On peut aussi dire : "À bientôt" (see you soon), "À demain" (see you tomorrow), "Salut" (hi/bye, informel), "Bonne journée" (have a good day).' }),

  makeMCQ({ id:'g5fr-voc-009', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Comment dit-on 100 en français ?',
    options:['mille','cent','dix','vingt'],
    answer:'cent',
    hint:'"Cent" ressemble au mot anglais "century".',
    explanation:'"<b>Cent</b>" = 100. Autres grands nombres : deux cents (200), mille (1000), dix mille (10 000). "Cent" prend un "s" quand il est exact (deux cents) mais pas quand il est suivi d\'un autre nombre (deux cent vingt).' }),

  makeMCQ({ id:'g5fr-voc-010', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Quelle salutation utilise-t-on lorsqu\'on rencontre quelqu\'un pendant la journée ?',
    options:['bonsoir','bonne nuit','bonjour','au revoir'],
    answer:'bonjour',
    hint:'On l\'utilise le matin et l\'après-midi.',
    explanation:'"<b>Bonjour</b>" s\'utilise pendant la journée (le matin et l\'après-midi). "Bonsoir" = le soir. "Bonne nuit" = avant de dormir. "Salut" = informel, à tout moment.' })

);
