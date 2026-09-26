'use strict';
// NCE 2024 Grade 9 French — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9fr-pp24-001', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:2,
    question:'Les chats .... sont dans l\'arbre.',
    options:['noir','noirs','noire','noires'], answer:'noirs',
    hint:'«Les chats» est masculin pluriel — l\'adjectif doit s\'accorder.',
    explanation:'<b>Noirs</b> s\'accorde avec «les chats» : masculin pluriel. «Noir» est masculin singulier, «noire» féminin singulier, «noires» féminin pluriel. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-002', chapterId:'g9fr-grammaire', subsection:'pronoms', difficulty:2,
    question:'Les fruits .... j\'ai mangés sont amers.',
    options:['qui','dont','quoi','que'], answer:'que',
    hint:'Le pronom remplace «les fruits» et est COD du verbe «manger» — quel pronom relatif remplit cette fonction ?',
    explanation:'<b>Que</b> est pronom relatif COD (j\'ai mangé les fruits → les fruits que j\'ai mangés). «Qui» est sujet, «dont» complète un nom ou verbe avec «de», «quoi» s\'utilise après préposition. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-003', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Il faut que tu .... tes devoirs.',
    options:['fais','faire','fasses','fait'], answer:'fasses',
    hint:'«Il faut que» est suivi d\'un mode particulier — lequel ?',
    explanation:'<b>Fasses</b> est le subjonctif présent de «faire». «Il faut que» exige le subjonctif. «Fais» = indicatif présent, «faire» = infinitif, «fait» = participe passé. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-004', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'Toto ne veut pas sortir. Mais son père lui demande d\'aller au supermarché .... Toto est fatigué.',
    options:['puisque','comme','pour que','même si'], answer:'même si',
    hint:'Le père insiste malgré la fatigue de Toto — quel connecteur exprime la concession ?',
    explanation:'<b>Même si</b> exprime la concession : le père demande cela en dépit de la fatigue. «Puisque» et «comme» expriment la cause, «pour que» le but. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-005', chapterId:'g9fr-grammaire', subsection:'interrogatifs', difficulty:2,
    question:'La chaise sur .... tu es assis est sale.',
    options:['laquelle','lequel','lesquelles','lesquels'], answer:'laquelle',
    hint:'«La chaise» est féminin singulier — quel pronom relatif s\'accorde ?',
    explanation:'<b>Laquelle</b> s\'accorde avec «la chaise» : féminin singulier. «Lequel» = masculin singulier, «lesquelles» = féminin pluriel, «lesquels» = masculin pluriel. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-006', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Autrefois, nous .... à la plage pendant les vacances.',
    options:['allons','irons','allions','iront'], answer:'allions',
    hint:'«Autrefois» indique un passé révolu — quel temps décrit une habitude dans le passé ?',
    explanation:'<b>Allions</b> (imparfait) décrit une habitude ou une action répétée dans le passé. «Allons» = présent, «irons/iront» = futur. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-007', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'Pascal avait mal à la cheville. ...., il a annulé sa séance de sport.',
    options:['Or','Alors','Ou','Ni'], answer:'Alors',
    hint:'La douleur de la cheville est la cause — quelle conséquence en tire-t-il ?',
    explanation:'<b>Alors</b> exprime la conséquence logique : à cause de la douleur, il a annulé. «Or» introduit un fait nouveau, «ou» est disjonctif, «ni» est négatif. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-008', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'Il ne faut jamais .... C\'est un vilain défaut.',
    options:['mentir','grandir','agir','dormir'], answer:'mentir',
    hint:'Quel verbe décrit un acte moralement condamnable qu\'on qualifie de «vilain défaut» ?',
    explanation:'<b>Mentir</b> est un défaut moral — dire ce qui est faux. «Grandir», «agir» et «dormir» ne sont pas des défauts en eux-mêmes. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-009', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'L\'éducation est essentielle pour .... notre connaissance.',
    options:['cacher','secourir','accroître','perdre'], answer:'accroître',
    hint:'L\'éducation fait grandir notre savoir — quel verbe exprime cette idée ?',
    explanation:'<b>Accroître</b> = augmenter, développer. L\'éducation développe la connaissance. «Cacher» et «perdre» sont négatifs, «secourir» = aider en cas de danger. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-010', chapterId:'g9fr-vocabulaire', subsection:'traits_caractere', difficulty:2,
    question:'Pour réussir dans la vie, il faut être ....',
    options:['persévérant','impatient','distrait','paresseux'], answer:'persévérant',
    hint:'Quelle qualité permet de continuer malgré les difficultés ?',
    explanation:'<b>Persévérant</b> = qui continue malgré les obstacles. «Impatient», «distrait» et «paresseux» sont des traits négatifs qui nuisent à la réussite. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-011', chapterId:'g9fr-vocabulaire', subsection:'noms_concrets', difficulty:2,
    question:'Il est important de respecter le .... de la route pour éviter les accidents.',
    options:['numéro','chiffre','calendrier','code'], answer:'code',
    hint:'Les règles de circulation forment un ensemble — lequel ?',
    explanation:'<b>Le code de la route</b> est l\'ensemble des règles de circulation. «Numéro» et «chiffre» sont des valeurs numériques, «calendrier» indique les dates. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-012', chapterId:'g9fr-vocabulaire', subsection:'notions_abstraites', difficulty:2,
    question:'Riyona a fait preuve de .... en partageant sa nourriture avec les autres.',
    options:['courage','confiance','détermination','générosité'], answer:'générosité',
    hint:'Partager avec les autres montre qu\'on est...',
    explanation:'<b>Générosité</b> = qualité de celui qui donne, partage. «Courage» = bravoure face au danger, «confiance» = foi en quelqu\'un, «détermination» = résolution. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-013', chapterId:'g9fr-oeuvres', subsection:'papa_simon_personnages', difficulty:2,
    question:'Qui sont les «galopins qui applaudissaient» ?',
    options:['Philippe Remy et la Blanchotte.','Les forgerons.','Les papas des enfants.','Les élèves de l\'école.'], answer:'Les élèves de l\'école.',
    hint:'Les galopins sont les camarades de Simon — où sont-ils ?',
    explanation:'<b>Les élèves de l\'école</b> sont les «galopins» qui regardent et applaudissent la bagarre. Ce sont les camarades qui se moquaient de Simon. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-014', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:2,
    question:'D\'après toi, que ressent Simon dans cet extrait ?',
    options:['Le désespoir.','Le soulagement.','La joie.','La patience.'], answer:'Le désespoir.',
    hint:'Simon est battu et humilié par ses camarades — quel sentiment domine ?',
    explanation:'<b>Le désespoir</b> domine : Simon est battu, humilié, sans père pour le défendre. C\'est dans cet état de désespoir qu\'il rencontrera Philippe. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-015', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:2,
    question:'Les autres se moquent de Simon parce qu\'il est ....',
    options:['heureux','insouciant','différent','riche'], answer:'différent',
    hint:'Pourquoi Simon est-il la cible des moqueries ?',
    explanation:'Simon est moqué parce qu\'il est <b>différent</b> — il n\'a pas de père, contrairement aux autres enfants. Cette différence le rend vulnérable aux brimades. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-016', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:2,
    question:'«... d\'une jeune fille de bonne famille.» De qui s\'agit-il ?',
    options:['De la fille de Tamise.','De la fille de Muche.','De la fille de Topaze.','De la fille de la Baronne.'], answer:'De la fille de Muche.',
    hint:'Muche parle de sa propre fille à Tamise.',
    explanation:'Il s\'agit <b>de la fille de Muche</b> (Ernestine). Muche vante sa fille à Tamise dans le contexte d\'un projet de mariage. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-017', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:2,
    question:'Pourquoi Tamise rend-il visite à Muche ?',
    options:['Pour lui parler d\'un mariage.','Pour lui demander une augmentation.','Pour payer sa facture d\'électricité.','Pour corriger des devoirs.'], answer:'Pour lui parler d\'un mariage.',
    hint:'Quelle est la vraie raison de la visite de Tamise ?',
    explanation:'Tamise vient <b>parler d\'un mariage</b> — Muche espère marier sa fille Ernestine à Tamise. C\'est l\'objet de la visite. 📄 NCE 2024 French exam.' }),

  makeMCQ({ id:'g9fr-pp24-018', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:2,
    question:'Pour avoir laissé quatre lampes allumées, combien Tamise devra-t-il payer comme amende ?',
    options:['10 francs.','15 francs.','4 francs.','25 francs.'], answer:'10 francs.',
    hint:'Muche retient un montant sur le salaire de Tamise — lequel est l\'amende ?',
    explanation:'Muche dit : «je vous retiendrai quinze francs, plus <b>dix francs d\'amende</b>.» L\'amende elle-même est de 10 francs. 📄 NCE 2024 French exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9fr-pp24-pdf-001', chapterId:'g9fr-transformation', marks:8, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 1, exercices 8 à 15. Réécris chaque phrase selon la consigne. (8) Ajoute le signe de ponctuation qui convient. (9) Mets à la forme négative. (10) Mets au passé composé. (11) Mets au féminin. (12) Place l\'adjectif correctement dans la phrase. (13) Remplace le groupe nominal souligné par un pronom. (14) Change le temps verbal selon la consigne. (15) Joins les deux phrases avec le mot de liaison indiqué.',
    markScheme:'1 mark per correct transformation. Mark the sense not the spelling unless the spelling error changes the meaning. Accept all grammatically valid variants.' },

  { id:'g9fr-pp24-pdf-002', chapterId:'g9fr-doc-authentique', marks:10, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 3. Lis le document authentique (courriel, fiche ou infographie) et réponds aux questions. (1) Quel est l\'objet du document ? [1] (2) Qui est l\'émetteur et qui est le destinataire ? [2] (3) Donne deux informations précises tirées du document. [2] (4) Repère deux données chiffrées. [2] (5) Explique en tes propres mots le message principal du document. [2] (6) Quel est le but de ce document ? Justifie. [1]',
    markScheme:'(1) Correct identification of the document\'s subject. (2) 1 mark each for correct emetteur and destinataire. (3) Any two accurate facts from the document. (4) Any two correct figures. (5) A paraphrase capturing a main idea, 0–2 for accuracy and clarity. (6) A valid purpose (informer/persuader) with justification.' },

  { id:'g9fr-pp24-pdf-003', chapterId:'g9fr-formation-mots', marks:5, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 4. Complète le texte avec le mot dérivé correct formé à partir du mot entre parenthèses. Texte sur la nature et l\'environnement. Exemple : Les (maladie) malades consultent le médecin. Cinq mots à dériver — noms, adjectifs, adverbes ou verbes selon le contexte.',
    markScheme:'1 mark per correct derived form. Accept minor spelling variants if the correct form is clear. No mark if the wrong word class is used.' },

  { id:'g9fr-pp24-pdf-004', chapterId:'g9fr-correction', marks:5, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 5. Corrige l\'erreur soulignée dans chaque phrase. Un exemple est donné. Cinq phrases, une erreur soulignée par phrase (homophones, accords, participe passé vs infinitif, orthographe, déterminants).',
    markScheme:'1 mark per correct correction. The corrected word must be given explicitly. Accept all valid corrections that make the sentence grammatically correct.' },

  { id:'g9fr-pp24-pdf-005', chapterId:'g9fr-textes-trous', marks:5, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 6. Complète le texte avec les mots appropriés. Un exemple est donné. Cinq blancs — prépositions, pronoms relatifs, déterminants, conjonctions, adverbes ou verbes selon le contexte du texte.',
    markScheme:'1 mark per correct answer. Accept all grammatically valid words that fit the context. No mark for answers that alter the meaning of the sentence.' },

  { id:'g9fr-pp24-pdf-006', chapterId:'g9fr-ecrit-guide', marks:10, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 7. Rédige une lettre amicale ou une invitation de 50 à 75 mots en respectant les trois points imposés indiqués dans la consigne. Commence et termine avec les formules appropriées.',
    markScheme:'Expression (E) /5 : Les trois points imposés présents et développés. 1 mark déduit par point manquant. Langue (TL) /3 : Grammaire et vocabulaire corrects, phrases bien construites. Communication effective (CE) /2 : Formules d\'ouverture et de clôture présentes, longueur 50–75 mots, registre amical.' },

  { id:'g9fr-pp24-pdf-007', chapterId:'g9fr-comprehension', marks:20, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 8. Lis le texte long proposé et réponds aux questions. Les questions couvrent : repérage d\'informations explicites par paragraphe, inférence (d\'après toi, pourquoi…), compréhension d\'expressions imagées, recherche de synonymes dans le texte, avis personnel justifié et questions à réponses multiples.',
    markScheme:'Mark each sub-question according to its allocated mark. Repérage : accept correct quote or paraphrase. Inférence : logical deduction supported by the text. Expressions imagées : accurate explanation in own words. Synonymes : exact word from the text. Avis : any opinion with a relevant justification from the text.' },

  { id:'g9fr-pp24-pdf-008', chapterId:'g9fr-redaction', marks:15, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 9. Choisis un des trois sujets proposés et rédige un texte d\'environ 200 mots. Les sujets proposent un récit, une description et un texte d\'opinion.',
    markScheme:'Expression (E) /7 : Idées pertinentes, organisées, développées avec introduction, développement et conclusion. Langue (TL) /5 : Vocabulaire varié, grammaire et orthographe correctes, phrases bien construites. Communication effective (CE) /3 : ~200 mots, cohérence et cohésion, registre adapté.' },

  { id:'g9fr-pp24-pdf-009', chapterId:'g9fr-oeuvres', marks:5, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 10A. Le Papa de Simon, Guy de Maupassant. Extrait : Simon se bat contre ses camarades. Réponds aux questions écrites. (3) Décris le comportement des enfants envers Simon dans cet extrait. [1] (4) Que ressent Simon ? Justifie ta réponse avec un exemple du texte. [2] (5) En t\'appuyant sur la nouvelle, explique ce que Philippe représente pour Simon. [2]',
    markScheme:'(3) Les enfants sont cruels, se moquent, applaudissent la bagarre. 1 mark for any valid description. (4) 1 mark for the feeling (désespoir, honte, douleur) + 1 mark for a textual justification. (5) Philippe = espoir d\'avoir un père, protection, compassion — award 2 marks for a developed response using the novel.' },

  { id:'g9fr-pp24-pdf-010', chapterId:'g9fr-oeuvres', marks:5, year:2024, grade:9, subject:'Français', type:'written',
    question:'Question 10B. Topaze, Marcel Pagnol. Acte I Scène II (Muche et Tamise). Réponds aux questions écrites. (3) Quel est le vrai but de la visite de Tamise à Muche ? [1] (4) Comment Muche essaie-t-il de profiter de la situation ? Donne un exemple du texte. [2] (5) En t\'appuyant sur la pièce, explique en quoi Topaze est un personnage qui croit en l\'honnêteté. [2]',
    markScheme:'(3) Muche espère marier sa fille Ernestine à Tamise. (4) 1 mark for identifying Muche\'s manipulation (using the lights fine, the marriage proposal, the pressure) + 1 mark for a textual example. (5) Award 2 marks for a developed explanation showing Topaze values honesty, refuses to compromise, and is naïve in a corrupt environment.' }
);
