'use strict';
// PSAC Grade 4 French 2024 – passage: Matéo et la grenouille blessée.
// Q1B (5 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4fr-pp24-001', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Quand Matéo a vu la grenouille pour la première fois, il est devenu ___.',
    options:['heureux','excité','triste'],
    answer:'triste',
    hint:'Comment Matéo se sentait-il quand il a trouvé la grenouille ?',
    explanation:'Matéo est devenu triste quand il a vu la grenouille blessée. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4fr-pp24-002', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Matéo ramène la grenouille chez lui pour ___.',
    options:['jouer avec elle','la soigner','lui apprendre à sauter'],
    answer:'la soigner',
    hint:'Pourquoi Matéo a-t-il emporté la grenouille chez lui ?',
    explanation:'Matéo a ramené la grenouille pour la soigner car elle était blessée. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4fr-pp24-003', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'À la maison, Matéo garde la grenouille dans ___.',
    options:['un aquarium','le pré','une boîte'],
    answer:'un aquarium',
    hint:'Où Matéo a-t-il mis la grenouille à la maison ?',
    explanation:'Matéo garde la grenouille dans un aquarium à la maison. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4fr-pp24-004', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'À la fin, la grenouille est ___.',
    options:['morte','guérie','blessée'],
    answer:'guérie',
    hint:'Que lui arrive-t-il à la fin de l\'histoire ?',
    explanation:'À la fin du texte, la grenouille est guérie grâce aux soins de Matéo. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4fr-pp24-005', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Ce qui rend Matéo heureux, c\'est ___.',
    options:['d\'aider les animaux','de casser les jambes des grenouilles','de nourrir des insectes'],
    answer:'d\'aider les animaux',
    hint:'Qu\'est-ce qui rend Matéo heureux dans cette histoire ?',
    explanation:'Matéo est heureux d\'aider les animaux en difficulté. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4fr-pp24-pdf-001', chapterId:'g4fr-lecture', marks:4, year:2024, grade:4, subject:'French',
    question:'Q1A: Réponds aux questions par des phrases complètes. (i) Où Matéo a-t-il trouvé la grenouille ? (ii) Qu\'avait-elle ? (iii) Comment Matéo s\'est-il occupé d\'elle ? (iv) Que fait-il après sa guérison ?', type:'write' },
  { id:'g4fr-pp24-pdf-002', chapterId:'g4fr-passe-comp', marks:4, year:2024, grade:4, subject:'French',
    question:'Q2: Conjugue les verbes au passé composé. (i) Matéo ___ (trouver) une grenouille. (ii) Il ___ (ramener) l\'animal chez lui. (iii) La grenouille ___ (guérir). (iv) Ils ___ (aller) dans le pré.', type:'write' },
  { id:'g4fr-pp24-pdf-003', chapterId:'g4fr-noms', marks:3, year:2024, grade:4, subject:'French',
    question:'Q3: Donne le féminin des noms ou adjectifs suivants. (i) un ami → (ii) blessé → (iii) heureux →', type:'write' },
  { id:'g4fr-pp24-pdf-004', chapterId:'g4fr-adjectifs', marks:3, year:2024, grade:4, subject:'French',
    question:'Q4: Écris l\'adjectif contraire. (i) grand → (ii) heureux → (iii) blessé →', type:'write' },
  { id:'g4fr-pp24-pdf-005', chapterId:'g4fr-textes', marks:6, year:2024, grade:4, subject:'French',
    question:'Q5: Rédige 6 à 8 phrases sur le thème : « Un animal que j\'aime ». Décris l\'animal, où il vit et pourquoi tu l\'aimes.', type:'write' }
);
