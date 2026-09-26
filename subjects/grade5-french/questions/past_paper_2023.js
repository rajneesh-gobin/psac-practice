'use strict';
// PSAC Grade 5 French 2023 – past-paper questions adapted to MCQ format.
// Q1B comprehension (Raoul, la souris et la dent) items 1-10 → makeMCQ.
// Q1A lecture image, Q2 conjugaison, Q3 vocabulaire/grammaire, Q4 formation de mots,
// Q5 texte à trous (exercice), Q6 description d'images, Q7 chasse aux erreurs,
// Q8 rédaction → window.PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5fr-pp23-001', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Dans le texte, Raoul ________.',
    options:['a mal aux dents','a perdu sa dent','a cassé sa dent','a une belle dent'],
    answer:'a perdu sa dent',
    hint:'Lisez le début du texte pour savoir pourquoi Raoul est triste.',
    explanation:'Le texte nous dit que Raoul a perdu une dent, et c\'est pour cela qu\'il espère une visite de la souris. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-002', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'La souris vient chercher la dent ________.',
    options:['dans le salon','dans la poche de Raoul','sous l\'oreiller','dans la boîte à jouets'],
    answer:'sous l\'oreiller',
    hint:'Où met-on sa dent pour attirer la souris selon la tradition ?',
    explanation:'Selon la tradition et le texte, Raoul met sa dent sous l\'oreiller pour que la souris vienne la récupérer pendant la nuit. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-003', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Raoul veut ________.',
    options:['rester éveillé pour surveiller la souris','dormir toute la nuit','aller chercher la souris lui-même','appeler sa maman'],
    answer:'rester éveillé pour surveiller la souris',
    hint:'Que décide de faire Raoul pendant la nuit ?',
    explanation:'Raoul décide de rester éveillé pour voir la souris arriver et prendre sa dent. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-004', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Boule, le chien, téléphone à ________.',
    options:['la maman de Raoul','une souris chercheuse de dents','un autre chien','le dentiste'],
    answer:'une souris chercheuse de dents',
    hint:'Boule veut aider Raoul – à qui appelle-t-il ?',
    explanation:'Boule le chien téléphone à une souris spécialisée dans la collecte des dents pour aider Raoul. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-005', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Tina est ________.',
    options:['la sœur de Raoul','la maîtresse de Raoul','le chien de Raoul','une souris'],
    answer:'une souris',
    hint:'Tina vient répondre à l\'appel de Boule.',
    explanation:'Tina est une souris chercheuse de dents qui répond à l\'appel téléphonique de Boule. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-006', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Tina voyage ________.',
    options:['en voiture','à pied','en avion','sur le dos de Jules'],
    answer:'sur le dos de Jules',
    hint:'Comment Tina arrive-t-elle chez Raoul ?',
    explanation:'Tina voyage sur le dos de Jules (probablement un oiseau ou un autre animal) pour arriver chez Raoul. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-007', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Avant de repartir, la souris laisse ________.',
    options:['un cadeau','un message','la dent','de l\'argent'],
    answer:'un cadeau',
    hint:'Que fait la souris en remerciement ?',
    explanation:'Selon la tradition, la souris prend la dent et laisse un cadeau (ou de l\'argent) en échange. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-008', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Raoul n\'a pas vu la souris parce qu\'il ________.',
    options:['avait peur','regardait par la fenêtre','s\'était caché','dormait'],
    answer:'dormait',
    hint:'Malgré ses plans, qu\'est-ce qui est arrivé à Raoul pendant la nuit ?',
    explanation:'Même si Raoul voulait rester éveillé, il s\'est endormi, ce qui explique pourquoi il n\'a pas vu la souris. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-009', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Avant de partir, la souris ________.',
    options:['remercie Raoul','réveille Raoul','appelle Boule','prend une photo'],
    answer:'remercie Raoul',
    hint:'Quelle est la dernière action de la souris dans l\'histoire ?',
    explanation:'Avant de quitter la chambre, la souris remercie Raoul (ou lui laisse un signe de remerciement). 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g5fr-pp23-010', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:'Raoul sera content parce qu\'il ________.',
    options:['a vu la souris','a eu un cadeau','a retrouvé sa dent','a pu dormir'],
    answer:'a eu un cadeau',
    hint:'Même sans voir la souris, qu\'est-ce qui rend Raoul heureux le lendemain matin ?',
    explanation:'En se réveillant, Raoul trouve le cadeau laissé par la souris, ce qui le rend heureux malgré ne pas avoir vu la souris. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5fr-pp23-pdf-001', chapterId:'fr-images', marks:6, year:2023, grade:5, subject:'French',
    question:'Q1A – Regardez les images et répondez aux questions. (Série de 3 images liées au thème de la dent/souris – décrire ce que vous voyez et répondre à des questions de compréhension sur les images.)', type:'write' },
  { id:'g5fr-pp23-pdf-002', chapterId:'fr-verbes-present', marks:10, year:2023, grade:5, subject:'French',
    question:'Q2 – Conjuguez les verbes entre parenthèses au temps et à la personne indiqués. (10 items : présent, passé composé, imparfait, futur simple – verbes réguliers et irréguliers.)', type:'write' },
  { id:'g5fr-pp23-pdf-003', chapterId:'fr-grammaire', marks:10, year:2023, grade:5, subject:'French',
    question:'Q3 – Questions de grammaire et de vocabulaire : choisir le bon mot, accords, prépositions, synonymes, antonymes. (10 items variés.)', type:'write' },
  { id:'g5fr-pp23-pdf-004', chapterId:'g5fr-formation', marks:6, year:2023, grade:5, subject:'French',
    question:'Q4 – Formation des mots : formez un nom à partir d\'un verbe, un adjectif à partir d\'un nom, un adverbe à partir d\'un adjectif, etc. (6 items.)', type:'write' },
  { id:'g5fr-pp23-pdf-005', chapterId:'g5fr-textes-trous', marks:6, year:2023, grade:5, subject:'French',
    question:'Q5 – Texte à trous : complétez le texte avec les mots donnés dans la liste. (6 mots à placer dans les trous, un mot en trop.)', type:'cloze' },
  { id:'g5fr-pp23-pdf-006', chapterId:'fr-images', marks:8, year:2023, grade:5, subject:'French',
    question:'Q6 – Description d\'images : décrivez la scène illustrée dans les images en quelques phrases (8–10 lignes).', type:'write' },
  { id:'g5fr-pp23-pdf-007', chapterId:'g5fr-chasse-erreurs', marks:6, year:2023, grade:5, subject:'French',
    question:'Q7 – Chasse aux erreurs : trouvez et corrigez les 6 erreurs dans le texte donné (orthographe, grammaire, conjugaison, accord).', type:'write' },
  { id:'g5fr-pp23-pdf-008', chapterId:'fr-textes', marks:8, year:2023, grade:5, subject:'French',
    question:'Q8 – Rédaction guidée : écrivez un texte d\'environ 10 lignes à partir des images données. (Mots suggérés fournis.)', type:'write' }
);
