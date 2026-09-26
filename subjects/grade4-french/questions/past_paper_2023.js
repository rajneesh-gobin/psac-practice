'use strict';
// PSAC Grade 4 French 2023 – passage: les vacances chez Raj (Sam, Vick, Raj).
// Q1B (5 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4fr-pp23-001', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'La première semaine, les enfants passent la journée ___.',
    options:['chez Vick','chez Raj','chez Sam','à l\'école'],
    answer:'chez Raj',
    hint:'Lis le début du texte pour savoir où les enfants passent la première semaine.',
    explanation:'Le texte nous dit que la première semaine, les enfants passent la journée chez Raj. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4fr-pp23-002', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Le matin, les enfants ___.',
    options:['cuisinent','jouent','font leurs devoirs','prennent le goûter'],
    answer:'font leurs devoirs',
    hint:'Cherche dans le texte ce que les enfants font le matin.',
    explanation:'D\'après le texte, le matin les enfants font leurs devoirs. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4fr-pp23-003', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'___ mettent le couvert.',
    options:['Les enfants','Grand-mère','Sam et Raj','Les parents'],
    answer:'Les enfants',
    hint:'Qui aide à mettre la table avant le repas ?',
    explanation:'Selon le texte, ce sont les enfants qui mettent le couvert. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4fr-pp23-004', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Les enfants préfèrent le moment ___.',
    options:['de la sieste','du déjeuner','des devoirs','du goûter'],
    answer:'du goûter',
    hint:'Quel moment de la journée les enfants aiment-ils le plus ?',
    explanation:'Le texte dit que les enfants préfèrent le moment du goûter. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4fr-pp23-005', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Vick et Sam rentrent ___ à la fin de la journée.',
    options:['en colère','tristes','heureux','fatigués'],
    answer:'heureux',
    hint:'Comment sont Vick et Sam quand ils rentrent chez eux ?',
    explanation:'D\'après le texte, Vick et Sam rentrent heureux à la fin de la journée. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4fr-pp23-pdf-001', chapterId:'g4fr-lecture', marks:4, year:2023, grade:4, subject:'French',
    question:'Q1A: Réponds aux questions par des phrases complètes. (i) Qui sont les trois amis du texte ? (ii) Que font-ils pendant les vacances ? (iii) À quelle heure déjeunent-ils ? (iv) Pourquoi aiment-ils les vacances chez Raj ?', type:'write' },
  { id:'g4fr-pp23-pdf-002', chapterId:'g4fr-verbes', marks:4, year:2023, grade:4, subject:'French',
    question:'Q2: Conjugue les verbes au présent. (i) Les enfants ___ (jouer) dans le jardin. (ii) Grand-mère ___ (préparer) le repas. (iii) Nous ___ (faire) nos devoirs. (iv) Tu ___ (manger) le goûter.', type:'write' },
  { id:'g4fr-pp23-pdf-003', chapterId:'g4fr-noms', marks:3, year:2023, grade:4, subject:'French',
    question:'Q3: Écris le pluriel des noms suivants. (i) un ami → (ii) le jardin → (iii) la journée →', type:'write' },
  { id:'g4fr-pp23-pdf-004', chapterId:'g4fr-adjectifs', marks:3, year:2023, grade:4, subject:'French',
    question:'Q4: Accorde l\'adjectif. (i) une fille ___ (heureux) (ii) des garçons ___ (petit) (iii) une maison ___ (grand)', type:'write' },
  { id:'g4fr-pp23-pdf-005', chapterId:'g4fr-textes', marks:6, year:2023, grade:4, subject:'French',
    question:'Q5: Rédige 6 à 8 phrases sur le thème : « Mes vacances préférées ». Dis où tu vas, avec qui et ce que tu fais.', type:'write' }
);
