'use strict';
// Grade 4 French — Chapitre : Vocabulaire de base
// IDs format: g4fr-voc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-voc-001', chapterId:'g4fr-vocabulaire', difficulty:1,
    question:'Que signifie "Bonjour" en anglais ?',
    options:['Goodbye','Good evening','Hello / Good morning','Thank you'],
    answer:'Hello / Good morning',
    hint:'On dit "Bonjour" le matin ou l\'après-midi pour saluer quelqu\'un.',
    explanation:'"<b>Bonjour</b>" = Hello / Good morning. On utilise "Bonjour" pendant la journée. "Bonsoir" = Good evening (le soir). "Au revoir" = Goodbye. "Bonne nuit" = Good night (avant de dormir).' }),

  makeMCQ({ id:'g4fr-voc-002', chapterId:'g4fr-vocabulaire', difficulty:1,
    question:'Comment dit-on "Thank you" en français ?',
    options:['S\'il vous plaît','Au revoir','Bonjour','Merci'],
    answer:'Merci',
    hint:'C\'est le mot poli que l\'on dit quand on reçoit quelque chose.',
    explanation:'"<b>Merci</b>" = Thank you. "S\'il vous plaît" = Please (formal) / "S\'il te plaît" (informal). "Au revoir" = Goodbye. "De rien" ou "Je vous en prie" = You\'re welcome (réponse à merci).' }),

  makeMCQ({ id:'g4fr-voc-003', chapterId:'g4fr-vocabulaire', difficulty:1,
    question:'Quelle est la couleur "red" en français ?',
    options:['bleu','vert','rouge','jaune'],
    answer:'rouge',
    hint:'C\'est la couleur du feu et des tomates.',
    explanation:'"<b>Rouge</b>" = red. Les couleurs : rouge (red), bleu/bleue (blue), vert/verte (green), jaune (yellow), noir/noire (black), blanc/blanche (white), orange (orange), rose (pink). Les couleurs s\'accordent avec le nom en genre et en nombre.' }),

  makeMCQ({ id:'g4fr-voc-004', chapterId:'g4fr-vocabulaire', difficulty:1,
    question:'Quel jour vient après "lundi" ?',
    options:['mercredi','dimanche','mardi','jeudi'],
    answer:'mardi',
    hint:'Mémorise l\'ordre : lundi, ___, mercredi, jeudi, vendredi, samedi, dimanche.',
    explanation:'L\'ordre des jours : lundi, <b>mardi</b>, mercredi, jeudi, vendredi, samedi, dimanche. En français, les jours ne commencent pas par une majuscule (sauf en début de phrase). La semaine commence par "lundi".' }),

  makeMCQ({ id:'g4fr-voc-005', chapterId:'g4fr-vocabulaire', difficulty:1,
    question:'Comment dit-on le nombre 8 en français ?',
    options:['six','sept','huit','neuf'],
    answer:'huit',
    hint:'6 = six, 7 = sept, 8 = ?, 9 = neuf.',
    explanation:'"<b>Huit</b>" = 8. Les nombres 1–10 : un, deux, trois, quatre, cinq, six, sept, <b>huit</b>, neuf, dix. Les nombres 11–20 : onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.' }),

  makeMCQ({ id:'g4fr-voc-006', chapterId:'g4fr-vocabulaire', difficulty:2,
    question:'Que signifie "la mère" en anglais ?',
    options:['The sister','The grandmother','The mother','The daughter'],
    answer:'The mother',
    hint:'La famille : le père, la mère, le frère, la sœur...',
    explanation:'"<b>La mère</b>" = the mother. La famille : le père (father), la mère (mother), le frère (brother), la sœur (sister), le fils (son), la fille (daughter), le grand-père (grandfather), la grand-mère (grandmother).' }),

  makeMCQ({ id:'g4fr-voc-007', chapterId:'g4fr-vocabulaire', difficulty:2,
    question:'Comment dit-on le nombre 15 en français ?',
    options:['cinquante','vingt','quinze','treize'],
    answer:'quinze',
    hint:'10 + 5 = ?',
    explanation:'"<b>Quinze</b>" = 15. Les nombres 11–20 : onze (11), douze (12), treize (13), quatorze (14), <b>quinze</b> (15), seize (16), dix-sept (17), dix-huit (18), dix-neuf (19), vingt (20).' }),

  makeMCQ({ id:'g4fr-voc-008', chapterId:'g4fr-vocabulaire', difficulty:2,
    question:'Quelle est la couleur "yellow" en français ?',
    options:['rose','jaune','vert','orange'],
    answer:'jaune',
    hint:'C\'est la couleur du soleil et des bananes.',
    explanation:'"<b>Jaune</b>" = yellow. "Jaune" does not change for feminine (une robe jaune, un pantalon jaune). Compare: rouge, vert/verte, bleu/bleue change for feminine. "Jaune" and "orange" are invariable (never add -e for feminine).' }),

  makeMCQ({ id:'g4fr-voc-009', chapterId:'g4fr-vocabulaire', difficulty:2,
    question:'Quel est le jour du week-end après "samedi" ?',
    options:['lundi','vendredi','jeudi','dimanche'],
    answer:'dimanche',
    hint:'Le week-end = samedi et ___.',
    explanation:'"<b>Dimanche</b>" = Sunday. C\'est le dernier jour de la semaine en français. Le week-end comprend le samedi et le dimanche. Les jours de l\'école : lundi, mardi, mercredi, jeudi, vendredi.' }),

  makeMCQ({ id:'g4fr-voc-010', chapterId:'g4fr-vocabulaire', difficulty:4,
    question:'Priya rencontre son professeur le matin. Elle dit : "___, Monsieur Sharma. Comment allez-vous ?" Quelle salutation doit-elle utiliser ?',
    options:['Au revoir','Bonne nuit','Bonjour','Bonsoir'],
    answer:'Bonjour',
    hint:'C\'est le matin. Quelle salutation est appropriée pour le matin ?',
    explanation:'"<b>Bonjour</b>" est correct — c\'est la salutation du matin et de l\'après-midi. "Bonsoir" s\'utilise le soir uniquement. "Au revoir" signifie goodbye. "Bonne nuit" s\'utilise avant de dormir. Il est aussi correct de dire "Bonjour" à un professeur car on le vouvoie (vous).' })

);
