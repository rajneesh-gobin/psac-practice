'use strict';
// PSAC Grade 5 French 2024 – past-paper questions adapted to MCQ format.
// Q1B comprehension (Magali et la poupée Gaminou) items 1-10 → makeMCQ.
// Q1A lecture image, Q2 conjugaison, Q3 vocabulaire/grammaire, Q4 formation de mots,
// Q5 texte à trous, Q6 description d'images, Q7 chasse aux erreurs,
// Q8 rédaction → window.PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5fr-pp24-001', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Dans le texte, Magali a ________.',
    options:['trois ans','quatre ans','cinq ans','six ans'],
    answer:'cinq ans',
    hint:'Quel âge a Magali au début de l\'histoire ?',
    explanation:'Le texte précise que Magali a cinq ans quand ses parents lui offrent la poupée Gaminou. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-002', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Magali reçoit une poupée garçon parce que ________.',
    options:['ses parents se sont trompés','elle voulait un garçon','le magasin n\'avait plus de poupées filles','c\'était moins cher'],
    answer:'ses parents se sont trompés',
    hint:'Pourquoi Magali n\'a-t-elle pas reçu la poupée qu\'elle voulait ?',
    explanation:'Les parents de Magali se sont trompés en achetant la poupée – ils ont pris une poupée garçon au lieu d\'une poupée fille. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-003', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Julien est ________.',
    options:['l\'ami d\'Arnaud','le frère d\'Arnaud','le voisin d\'Arnaud','le cousin d\'Arnaud'],
    answer:'le frère d\'Arnaud',
    hint:'Qui est Julien dans la famille ?',
    explanation:'Julien est le frère d\'Arnaud, l\'un des garçons de la maternelle. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-004', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Qu\'est-ce qu\'Arnaud fait au supermarché ?',
    options:['lit les bandes dessinées','joue avec des jouets','achète des bonbons','parle avec ses amis'],
    answer:'lit les bandes dessinées',
    hint:'Que fait Arnaud pendant que sa maman fait ses courses ?',
    explanation:'Pendant que sa maman fait les courses, Arnaud lit les bandes dessinées au rayon livres du supermarché. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-005', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Gaminou se retrouve dans le congélateur parce que ________.',
    options:['Magali était en colère','Magali était distraite','son frère l\'a mis là','ses parents ont plaisanté'],
    answer:'Magali était distraite',
    hint:'Pourquoi Gaminou finit-il dans un endroit inattendu ?',
    explanation:'Magali était distraite en aidant à ranger les provisions – elle a mis Gaminou dans le congélateur sans s\'en rendre compte. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-006', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Magali s\'aperçoit ________.',
    options:['qu\'elle a faim','que Gaminou a disparu','que ses parents sont partis','que sa chambre est en désordre'],
    answer:'que Gaminou a disparu',
    hint:'Quelle est la grande découverte de Magali ?',
    explanation:'En rentrant dans sa chambre pour jouer, Magali réalise que Gaminou n\'est plus là – il a disparu. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-007', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Corentin a deviné que la poupée appartenait à Magali parce que ________.',
    options:['il la connaissait bien','c\'était écrit «Magali» sur sa salopette','Gaminou lui ressemblait','il avait vu une photo'],
    answer:'c\'était écrit «Magali» sur sa salopette',
    hint:'Comment Corentin a-t-il pu identifier la propriétaire de la poupée ?',
    explanation:'Le prénom «Magali» était écrit sur la salopette de la poupée Gaminou, ce qui a permis à Corentin d\'identifier sa propriétaire. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-008', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Les garçons vont à la maternelle pour ________.',
    options:['rendre la poupée à Magali','jouer avec leurs amis','raconter une histoire','montrer la poupée à la maîtresse'],
    answer:'rendre la poupée à Magali',
    hint:'Pourquoi Arnaud et Corentin se rendent-ils à la maternelle ?',
    explanation:'Arnaud et Corentin vont à la maternelle de Magali spécialement pour lui rendre sa poupée Gaminou. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-009', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Quand Magali revoit Gaminou, elle ________.',
    options:['crie de joie','le cache vite','le prend dans ses bras','appelle sa maman'],
    answer:'le prend dans ses bras',
    hint:'Quel est le premier geste de Magali quand elle récupère Gaminou ?',
    explanation:'Dès qu\'elle revoit Gaminou, Magali le prend tendrement dans ses bras. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g5fr-pp24-010', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:'Magali pleure parce qu\'elle ________.',
    options:['a mal','a peur','est déçue','est heureuse de retrouver Gaminou'],
    answer:'est heureuse de retrouver Gaminou',
    hint:'Pourquoi peut-on pleurer de bonheur ?',
    explanation:'Magali pleure de joie – ce sont des larmes de bonheur causées par le soulagement et la joie de retrouver sa poupée adorée. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5fr-pp24-pdf-001', chapterId:'fr-images', marks:6, year:2024, grade:5, subject:'French',
    question:'Q1A – Regardez les images et répondez aux questions. (3 images liées au thème de la poupée et du supermarché.)', type:'write' },
  { id:'g5fr-pp24-pdf-002', chapterId:'fr-verbes-present', marks:10, year:2024, grade:5, subject:'French',
    question:'Q2 – Conjuguez les verbes entre parenthèses au temps et à la personne indiqués. (10 items : présent, passé composé, futur simple, imparfait.)', type:'write' },
  { id:'g5fr-pp24-pdf-003', chapterId:'fr-grammaire', marks:10, year:2024, grade:5, subject:'French',
    question:'Q3 – Questions de grammaire et de vocabulaire : articles, accords, prépositions, synonymes, antonymes, sens des mots. (10 items variés.)', type:'write' },
  { id:'g5fr-pp24-pdf-004', chapterId:'g5fr-formation', marks:6, year:2024, grade:5, subject:'French',
    question:'Q4 – Formation des mots : formez un nom, un adjectif, un verbe ou un adverbe à partir du mot donné. (6 items.)', type:'write' },
  { id:'g5fr-pp24-pdf-005', chapterId:'g5fr-textes-trous', marks:6, year:2024, grade:5, subject:'French',
    question:'Q5 – Texte à trous sur le thème du marché. Complétez avec les mots donnés (un mot en trop). (6 blancs.)', type:'cloze' },
  { id:'g5fr-pp24-pdf-006', chapterId:'fr-images', marks:8, year:2024, grade:5, subject:'French',
    question:'Q6 – Description d\'images : décrivez la scène en 8–10 lignes à partir des images données.', type:'write' },
  { id:'g5fr-pp24-pdf-007', chapterId:'g5fr-chasse-erreurs', marks:6, year:2024, grade:5, subject:'French',
    question:'Q7 – Chasse aux erreurs : repérez et corrigez les 6 erreurs dans le texte (orthographe, conjugaison, accord, grammaire).', type:'write' },
  { id:'g5fr-pp24-pdf-008', chapterId:'fr-textes', marks:8, year:2024, grade:5, subject:'French',
    question:'Q8 – Rédaction : écrivez un texte d\'environ 10 lignes à partir des images données. (Mots suggérés fournis.)', type:'write' }
);
