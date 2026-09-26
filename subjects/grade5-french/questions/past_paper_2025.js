'use strict';
// PSAC Grade 5 French 2025 – past-paper questions adapted to MCQ format.
// Q1B comprehension (Sanjeev & Marcelin : partie de pêche) items 1-10 → makeMCQ.
// Q1A lecture image, Q2 conjugaison, Q3 vocabulaire/grammaire, Q4 formation de mots,
// Q5 texte à trous, Q6 description d'images, Q7 chasse aux erreurs,
// Q8 rédaction → window.PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5fr-pp25-001', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Sanjeev est ________.',
    options:['le cousin de Marcelin','le voisin de Marcelin','le camarade de Marcelin','le frère de Marcelin'],
    answer:'le camarade de Marcelin',
    hint:'Quel est le lien entre Sanjeev et Marcelin ?',
    explanation:'Sanjeev est le camarade (ami d\'école) de Marcelin ; les deux enfants partent ensemble à la pêche. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-002', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Au début de la journée, tout semble parfait parce que ________.',
    options:['le temps est beau','ils ont beaucoup de poissons','leurs parents sont avec eux','ils ont un bateau neuf'],
    answer:'le temps est beau',
    hint:'Qu\'est-ce qui décrit bien la météo au début de la sortie ?',
    explanation:'Le texte décrit une belle journée au départ : le soleil brille et la mer est calme, tout semble parfait. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-003', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Les garçons mettent leurs poissons dans ________.',
    options:['un filet','un sac','un seau','une boîte'],
    answer:'un seau',
    hint:'Dans quel récipient gardent-ils leur prise ?',
    explanation:'Les garçons conservent les poissons qu\'ils attrapent dans un seau. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-004', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Les garçons veulent revenir car ________.',
    options:['ils ont faim','ils se sont bien amusés','il est tard','le vent est fort'],
    answer:'ils se sont bien amusés',
    hint:'Pourquoi les garçons décident-ils de rentrer à ce moment-là ?',
    explanation:'Satisfaits de leur pêche et de leur journée, les garçons décident de rentrer car ils se sont bien amusés. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-005', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Le ciel devient sombre parce que ________.',
    options:['la nuit tombe','il y a de gros nuages gris','le soleil est caché par des arbres','ils sont dans une grotte'],
    answer:'il y a de gros nuages gris',
    hint:'Qu\'est-ce qui change dans le ciel et annonce le mauvais temps ?',
    explanation:'De gros nuages gris envahissent le ciel, obscurcissant le soleil et annonçant la tempête. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-006', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Qui vient aider les garçons en difficulté ?',
    options:['Un bateau de pêcheurs','Leurs parents','Les gens sur la plage','Les gardiens du port'],
    answer:'Les gens sur la plage',
    hint:'Vers qui les garçons ont-ils pu appeler à l\'aide ?',
    explanation:'Les gens présents sur la plage entendent les appels de détresse des garçons et viennent les secourir. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-007', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'On donne des couvertures aux garçons parce qu\'ils ________.',
    options:['sont blessés','ont faim','ont froid','sont mouillés uniquement'],
    answer:'ont froid',
    hint:'Quelle est la principale raison pour laquelle on leur donne des couvertures ?',
    explanation:'Après leur épreuve en mer, les garçons sont mouillés et ont froid, c\'est pourquoi on leur remet des couvertures chaudes. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-008', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:'Les parents des garçons se sentent ________.',
    options:['soulagés','en colère','indifférents','tristes'],
    answer:'soulagés',
    hint:'Quel sentiment ressent-on quand quelqu\'un qu\'on aime est en danger puis retrouvé sain et sauf ?',
    explanation:'Après avoir su leurs enfants en danger, les parents ressentent un grand soulagement en les retrouvant sains et saufs. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-009', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'«Sains et saufs» signifie qu\'ils ________.',
    options:['ont mangé','sont propres','sont en bonne santé','sont revenus rapidement'],
    answer:'sont en bonne santé',
    hint:'Quelle est la signification de l\'expression «sains et saufs» ?',
    explanation:'«Sains et saufs» est une expression qui signifie «en bonne santé, sans blessure» – les garçons n\'ont rien de grave. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g5fr-pp25-010', chapterId:'fr-lecture', subsection:'idee_principale', difficulty:2,
    question:'Cette histoire parle ________.',
    options:['d\'une promenade en forêt','d\'un accident en voiture','d\'une partie de pêche qui a mal tourné','d\'un voyage en bateau'],
    answer:'d\'une partie de pêche qui a mal tourné',
    hint:'Quel est le thème principal de cette histoire ?',
    explanation:'L\'histoire raconte une sortie de pêche qui commence bien mais qui tourne mal à cause d\'une tempête. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5fr-pp25-pdf-001', chapterId:'fr-images', marks:6, year:2025, grade:5, subject:'French',
    question:'Q1A – Regardez les images et répondez aux questions. (3 images liées au thème de la pêche et de la tempête.)', type:'write' },
  { id:'g5fr-pp25-pdf-002', chapterId:'fr-verbes-present', marks:10, year:2025, grade:5, subject:'French',
    question:'Q2 – Conjuguez les verbes entre parenthèses au temps et à la personne indiqués. (10 items : présent, passé composé, futur simple, imparfait, conditionnel.)', type:'write' },
  { id:'g5fr-pp25-pdf-003', chapterId:'fr-grammaire', marks:10, year:2025, grade:5, subject:'French',
    question:'Q3 – Questions de grammaire et de vocabulaire : articles, accords, pronoms, prépositions, synonymes, antonymes. (10 items variés.)', type:'write' },
  { id:'g5fr-pp25-pdf-004', chapterId:'g5fr-formation', marks:6, year:2025, grade:5, subject:'French',
    question:'Q4 – Formation des mots : transformez le mot donné en un nom, un adjectif, un verbe ou un adverbe selon la consigne. (6 items.)', type:'write' },
  { id:'g5fr-pp25-pdf-005', chapterId:'g5fr-textes-trous', marks:6, year:2025, grade:5, subject:'French',
    question:'Q5 – Texte à trous sur le thème de la mer et des activités nautiques. Complétez avec les mots de la liste (un mot en trop). (6 blancs.)', type:'cloze' },
  { id:'g5fr-pp25-pdf-006', chapterId:'fr-images', marks:8, year:2025, grade:5, subject:'French',
    question:'Q6 – Description d\'images : décrivez la scène illustrée en 8–10 lignes, en utilisant un vocabulaire varié.', type:'write' },
  { id:'g5fr-pp25-pdf-007', chapterId:'g5fr-chasse-erreurs', marks:6, year:2025, grade:5, subject:'French',
    question:'Q7 – Chasse aux erreurs : repérez et corrigez les 6 erreurs dans le texte donné (fautes d\'orthographe, de conjugaison, d\'accord ou de grammaire).', type:'write' },
  { id:'g5fr-pp25-pdf-008', chapterId:'fr-textes', marks:8, year:2025, grade:5, subject:'French',
    question:'Q8 – Rédaction guidée : rédigez un texte d\'environ 10 lignes à partir des images données. (Mots suggérés fournis.)', type:'write' }
);
