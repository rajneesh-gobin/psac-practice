'use strict';
// PSAC Grade 4 French 2025 – passage: Reza, Sara et la soucoupe volante.
// Q1B (5 MCQs) → STATIC_QUESTIONS; everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4fr-pp25-001', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'L\'école termine à ___ de l\'après-midi.',
    options:['trois heures','trois heures trente','quatre heures'],
    answer:'trois heures trente',
    hint:'À quelle heure la cloche sonne-t-elle ?',
    explanation:'D\'après le texte, l\'école se termine à trois heures trente de l\'après-midi. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4fr-pp25-002', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Les gens avancent ___ dans la rue.',
    options:['lentement','pas à pas','rapidement'],
    answer:'rapidement',
    hint:'Comment les gens marchent-ils dans la rue ?',
    explanation:'Le texte dit que les gens avancent rapidement dans la rue. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4fr-pp25-003', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'En entendant un ronflement au-dessus d\'elle, Sara ___.',
    options:['a mal','a peur','est fatiguée'],
    answer:'a peur',
    hint:'Quelle est la réaction de Sara quand elle entend le bruit ?',
    explanation:'Sara a peur en entendant le ronflement au-dessus d\'elle. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4fr-pp25-004', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'La soucoupe disparaît dans ___.',
    options:['le ciel','les champs','la ville'],
    answer:'le ciel',
    hint:'Vers où disparaît la soucoupe volante ?',
    explanation:'La soucoupe disparaît dans le ciel à la fin de la scène. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4fr-pp25-005', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:'Le lendemain, les deux enfants iront ___.',
    options:['dans les champs de cannes','voir la soucoupe','à l\'école'],
    answer:'à l\'école',
    hint:'Que feront Reza et Sara le lendemain matin ?',
    explanation:'Le lendemain, les deux enfants iront à l\'école comme d\'habitude. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4fr-pp25-pdf-001', chapterId:'g4fr-lecture', marks:4, year:2025, grade:4, subject:'French',
    question:'Q1A: Réponds aux questions par des phrases complètes. (i) Qui sont les deux personnages principaux ? (ii) Qu\'ont-ils vu dans le ciel ? (iii) Quelle est la réaction de Sara ? (iv) Que décident-ils de faire le lendemain ?', type:'write' },
  { id:'g4fr-pp25-pdf-002', chapterId:'g4fr-verbes', marks:4, year:2025, grade:4, subject:'French',
    question:'Q2: Conjugue les verbes au futur simple. (i) Reza ___ (aller) à l\'école. (ii) Ils ___ (parler) de la soucoupe. (iii) Sara ___ (raconter) l\'histoire. (iv) Les enfants ___ (être) en retard.', type:'write' },
  { id:'g4fr-pp25-pdf-003', chapterId:'g4fr-adjectifs', marks:3, year:2025, grade:4, subject:'French',
    question:'Q3: Accorde l\'adjectif entre parenthèses. (i) une soucoupe ___ (brillant) (ii) des enfants ___ (effrayé) (iii) un ciel ___ (sombre)', type:'write' },
  { id:'g4fr-pp25-pdf-004', chapterId:'g4fr-vocabulaire', marks:3, year:2025, grade:4, subject:'French',
    question:'Q4: Donne le synonyme de chaque mot. (i) rapidement → (ii) disparaître → (iii) étrange →', type:'write' },
  { id:'g4fr-pp25-pdf-005', chapterId:'g4fr-textes', marks:6, year:2025, grade:4, subject:'French',
    question:'Q5: Rédige 6 à 8 phrases sur le thème : « Une chose étrange que j\'ai vue ». Dis où tu étais, ce que tu as vu et ce que tu as ressenti.', type:'write' }
);
