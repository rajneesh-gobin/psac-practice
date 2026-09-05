'use strict';
// Grade 4 French — large varied revision bank.
//
// These are deliberately generated from carefully curated Grade 4 language
// sets, not copies of one question. Every generated item has a unique ID,
// answer, hint and explanation. This keeps everyday practice fresh while
// staying inside the grammar and vocabulary taught by this pack.

(function () {
  let n = 0;
  const q = ({ chapterId, subsection, difficulty, question, options, answer, hint, explanation }) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g4fr-plus-${String(n).padStart(4, '0')}`,
      chapterId, subsection, difficulty, question, options, answer, hint, explanation
    }));
  };
  const choices = (answer, pool) => {
    const u = [answer];
    for (const x of pool) if (!u.includes(x)) u.push(x);
    return u.slice(0, 4);
  };
  const subj = (person, form) => person === 'je' && /^[aàâeéèêiîouhy]/i.test(form) ? 'j’' : `${person} `;

  // ── Vocabulary: 200 questions ────────────────────────────────────────
  const vocab = [
    ['le chat','the cat','animaux'], ['le chien','the dog','animaux'], ['l’oiseau','the bird','animaux'], ['le poisson','the fish','animaux'],
    ['le lapin','the rabbit','animaux'], ['le cheval','the horse','animaux'], ['la vache','the cow','animaux'], ['le mouton','the sheep','animaux'],
    ['la mère','the mother','famille'], ['le père','the father','famille'], ['la sœur','the sister','famille'], ['le frère','the brother','famille'],
    ['la grand-mère','the grandmother','famille'], ['le grand-père','the grandfather','famille'], ['la fille','the daughter','famille'], ['le fils','the son','famille'],
    ['la tête','the head','corps'], ['la main','the hand','corps'], ['le pied','the foot','corps'], ['les yeux','the eyes','corps'],
    ['rouge','red','couleurs'], ['bleu','blue','couleurs'], ['vert','green','couleurs'], ['jaune','yellow','couleurs'], ['noir','black','couleurs'], ['blanc','white','couleurs'],
    ['bonjour','hello / good morning','politesse'], ['merci','thank you','politesse'], ['au revoir','goodbye','politesse'], ['s’il te plaît','please','politesse'],
    ['la maison','the house','traduction'], ['l’école','the school','traduction'], ['le livre','the book','traduction'], ['le cahier','the exercise book','traduction'],
    ['la table','the table','traduction'], ['la chaise','the chair','traduction'], ['la fenêtre','the window','traduction'], ['le jardin','the garden','traduction'],
    ['le soleil','the sun','traduction'], ['la pluie','the rain','traduction']
  ];
  const enWords = vocab.map(x => x[1]);
  const frWords = vocab.map(x => x[0]);
  vocab.forEach(([fr, en, sub], i) => {
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:1 + (i % 3),
      question:`Que signifie « ${fr} » en anglais ?`, options:choices(en, enWords.slice(i + 1).concat(enWords)), answer:en,
      hint:'Lis le mot lentement et pense à un objet, une personne, un animal ou une couleur que tu connais.',
      explanation:`« <b>${fr}</b> » signifie <b>${en}</b>. Répète le mot à voix haute, puis essaie de l’employer dans une petite phrase.` });
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:1 + ((i + 1) % 3),
      question:`Comment dit-on « ${en} » en français ?`, options:choices(fr, frWords.slice(i + 1).concat(frWords)), answer:fr,
      hint:'Cherche le mot français que tu as déjà rencontré dans tes leçons.',
      explanation:`En français, <b>${en}</b> se dit <b>${fr}</b>. Apprendre les deux sens de traduction aide à mieux parler et comprendre.` });
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:2,
      question:`Choisis le mot français qui signifie « ${en} ».`, options:choices(fr.replace(/^(le |la |les |l’)/, ''), frWords.map(x => x.replace(/^(le |la |les |l’)/, ''))), answer:fr.replace(/^(le |la |les |l’)/, ''),
      hint:'Cherche le mot français appris qui correspond au mot anglais.',
      explanation:`Le mot correct est <b>${fr}</b>.${/^(le |la |les |l’)/.test(fr) ? ` Dans une phrase, garde l’article avec le nom : <i>${fr}</i>.` : ''}` });
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:3,
      question:`À quelle catégorie appartient « ${fr} » ?`, options:choices(sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'le vocabulaire de la vie quotidienne', ['un nombre','un verbe au passé','une question de maths','un pays']), answer:sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'le vocabulaire de la vie quotidienne',
      hint:'Demande-toi ce que représente le mot : une personne, un objet, une couleur ou un animal.',
      explanation:`« <b>${fr}</b> » est lié à <b>${sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'la vie quotidienne'}</b>. Classer les mots aide la mémoire.` });
  });
  const numbers = [['un',1],['deux',2],['trois',3],['quatre',4],['cinq',5],['six',6],['sept',7],['huit',8],['neuf',9],['dix',10],['onze',11],['douze',12],['treize',13],['quatorze',14],['quinze',15],['seize',16],['dix-sept',17],['dix-huit',18],['dix-neuf',19],['vingt',20]];
  numbers.forEach(([word, value], i) => {
    q({ chapterId:'g4fr-vocabulaire', subsection:'nombres', difficulty:1 + (i % 2), question:`Comment dit-on ${value} en français ?`, options:choices(word, numbers.map(x => x[0]).slice(i + 1).concat(numbers.map(x => x[0]))), answer:word, hint:'Compte lentement dans ta tête en français.', explanation:`Le nombre <b>${value}</b> se dit <b>${word}</b> en français.` });
    q({ chapterId:'g4fr-vocabulaire', subsection:'nombres', difficulty:2, question:`Quel nombre est « ${word} » ?`, options:choices(String(value), numbers.map(x => String(x[1])).slice(i + 1).concat(numbers.map(x => String(x[1])))), answer:String(value), hint:'Prononce le nombre français, puis associe-le au chiffre.', explanation:`« <b>${word}</b> » correspond au nombre <b>${value}</b>.` });
  });

  // ── Nouns and articles: 120 questions ───────────────────────────────
  const nouns = [
    ['chat','le','un','chats'],['chien','le','un','chiens'],['livre','le','un','livres'],['cahier','le','un','cahiers'],['stylo','le','un','stylos'],
    ['ballon','le','un','ballons'],['jardin','le','un','jardins'],['soleil','le','un','soleils'],['père','le','un','pères'],['frère','le','un','frères'],
    ['fille','la','une','filles'],['maison','la','une','maisons'],['table','la','une','tables'],['chaise','la','une','chaises'],['fenêtre','la','une','fenêtres'],
    ['école','l’','une','écoles'],['amie','l’','une','amies'],['mère','la','une','mères'],['sœur','la','une','sœurs'],['plage','la','une','plages'],
    ['orange','l’','une','oranges'],['image','l’','une','images'],['fleur','la','une','fleurs'],['banane','la','une','bananes'],['voiture','la','une','voitures'],
    ['oiseau','l’','un','oiseaux'],['animal','l’','un','animaux'],['enfant','l’','un','enfants'],['crayon','le','un','crayons'],['sac','le','un','sacs']
  ];
  nouns.forEach(([word, definite, indefinite, plural], i) => {
    const gender = indefinite === 'un' ? 'masculin' : 'féminin';
    q({ chapterId:'g4fr-noms', subsection:'articles_def', difficulty:1, question:`Choisis l’article défini : « ___ ${word} »`, options:choices(definite, ['le','la','les','un']), answer:definite, hint:'Regarde si le nom est masculin, féminin ou commence par une voyelle.', explanation:`On dit <b>${definite}${definite === 'l’' ? '' : ' '}${word}</b>. L’article défini veut dire « the ».` });
    q({ chapterId:'g4fr-noms', subsection:'articles_indef', difficulty:1 + (i % 2), question:`Choisis l’article indéfini singulier : « ${word === 'soleil' ? 'Je dessine' : ['école','plage','enfant'].includes(word) ? 'Je vois' : 'J’ai'} ___ ${word}. »`, options:choices(indefinite, ['un','une','des','le']), answer:indefinite, hint:'« Un » est masculin et « une » est féminin.', explanation:`On dit <b>${indefinite} ${word}</b>. « ${indefinite} » veut dire « a / an ».` });
    q({ chapterId:'g4fr-noms', subsection:'pluriel', difficulty:2, question:`Quel est le pluriel de « ${definite}${definite === 'l’' ? '' : ' '}${word} » ?`, options:choices(`les ${plural}`, [`le ${plural}`,`des ${word}`,`la ${plural}`,`un ${plural}`]), answer:`les ${plural}`, hint:'Au pluriel, l’article défini devient « les ». Regarde aussi la fin du nom.', explanation:`Le pluriel est <b>les ${plural}</b>. La plupart des noms prennent <b>-s</b>, mais certains mots ont une forme spéciale.` });
    q({ chapterId:'g4fr-noms', subsection:'genre', difficulty:2 + (i % 2), question:`Dans « ${indefinite} ${word} », le nom est-il masculin ou féminin ?`, options:choices(gender, ['masculin','féminin','pluriel seulement','un verbe']), answer:gender, hint:`L’article indéfini « ${indefinite} » indique le genre dans ce groupe nominal.`, explanation:`Dans <b>${indefinite} ${word}</b>, le nom est <b>${gender}</b>. L’article élidé « l’ » ne permet pas, à lui seul, de connaître le genre.` });
  });

  // ── Present tense verbs: 160 questions ──────────────────────────────
  // Each verb carries its own completions so the sentence always makes sense
  // (« aimer » gets an object, « être » gets a place, etc.).
  const verbs = [
    ['parler',['parle','parles','parle','parlons','parlez','parlent'],['avec des amis.','à la maîtresse.','français à l’école.']],
    ['jouer',['joue','joues','joue','jouons','jouez','jouent'],['dans le jardin.','au football le samedi.','avec le chien.']],
    ['aimer',['aime','aimes','aime','aimons','aimez','aiment'],['les mangues.','la musique.','le chocolat.']],
    ['regarder',['regarde','regardes','regarde','regardons','regardez','regardent'],['la télévision le soir.','les oiseaux.','un dessin animé.']],
    ['habiter',['habite','habites','habite','habitons','habitez','habitent'],['à Rose Hill.','près de l’école.','dans une grande maison.']],
    ['manger',['mange','manges','mange','mangeons','mangez','mangent'],['une pomme.','du riz à midi.','du pain le matin.']],
    ['chanter',['chante','chantes','chante','chantons','chantez','chantent'],['une jolie chanson.','à la fête.','en classe.']],
    ['marcher',['marche','marches','marche','marchons','marchez','marchent'],['vers l’école.','dans le jardin.','sur la plage.']],
    ['être',['suis','es','est','sommes','êtes','sont'],['à l’école.','dans le jardin.','à la maison le soir.']],
    ['avoir',['ai','as','a','avons','avez','ont'],['un chien à la maison.','deux cahiers.','un vélo rouge.']],
    ['aller',['vais','vas','va','allons','allez','vont'],['à l’école le matin.','au marché le samedi.','à la plage.']],
    ['faire',['fais','fais','fait','faisons','faites','font'],['les devoirs le soir.','un dessin.','un gâteau le dimanche.']],
    ['finir',['finis','finis','finit','finissons','finissez','finissent'],['les devoirs.','le repas à midi.','la lecture.']],
    ['prendre',['prends','prends','prend','prenons','prenez','prennent'],['le bus le matin.','un cahier.','le petit déjeuner.']],
    ['venir',['viens','viens','vient','venons','venez','viennent'],['à l’école à pied.','au marché.','à la fête.']],
    ['lire',['lis','lis','lit','lisons','lisez','lisent'],['un livre le soir.','une histoire.','une bande dessinée.']]
  ];
  const people = ['je','tu','il','nous','vous','ils'];
  verbs.forEach(([verb, forms, comps], vi) => people.forEach((person, pi) => {
    const answer = forms[pi];
    q({ chapterId:'g4fr-verbes', subsection:verb === 'être' || verb === 'avoir' ? 'etre_avoir' : ['aller','faire','prendre','venir','lire'].includes(verb) ? 'irreguliers' : verb.endsWith('er') ? 'verbes_er' : 'conjugaison', difficulty:1 + ((vi + pi) % 4),
      question:`Complète : « ${subj(person, answer)}___ ${comps[(vi + pi) % comps.length]} » (${verb}, au présent)`, options:choices(answer, forms), answer,
      hint:`Observe le sujet « ${person} » puis choisis la forme ${/^[aeéèêhiouâàî]/.test(verb) ? 'd’' : 'de '}<i>${verb}</i> qui lui correspond.`, explanation:`Au présent, on dit <b>${subj(person, answer)}${answer}</b>. Le verbe est <b>${verb}</b>.` });
  }));
  verbs.forEach(([verb, forms, comps], i) => {
    const comp = comps[i % comps.length];
    const answer = `Nous ${forms[3]} ${comp}`;
    q({ chapterId:'g4fr-verbes', subsection:verb === 'être' || verb === 'avoir' ? 'etre_avoir' : 'conjugaison', difficulty:2 + (i % 3), question:`Quelle phrase est correcte avec le verbe « ${verb} » ?`, options:choices(answer, [`Nous ${forms[1]} ${comp}`,`Ils ${forms[3]} ${comp}`,`Je ${forms[4]} ${comp}`]), answer, hint:'Le sujet « nous » demande la forme « nous » du verbe.', explanation:`La bonne phrase est <b>${answer}</b> Vérifie toujours que le sujet et le verbe vont ensemble.` });
  });

  // ── Adjectives and agreement: 120 questions ─────────────────────────
  const adjectives = [
    ['petit','petite','petits','petites'],['grand','grande','grands','grandes'],['vert','verte','verts','vertes'],['noir','noire','noirs','noires'],
    ['blanc','blanche','blancs','blanches'],['rouge','rouge','rouges','rouges'],['bleu','bleue','bleus','bleues'],['jaune','jaune','jaunes','jaunes'],
    ['content','contente','contents','contentes'],['gentil','gentille','gentils','gentilles'],['joli','jolie','jolis','jolies'],['fort','forte','forts','fortes'],
    ['chaud','chaude','chauds','chaudes'],['froid','froide','froids','froides'],['jeune','jeune','jeunes','jeunes'],['long','longue','longs','longues'],
    ['heureux','heureuse','heureux','heureuses'],['curieux','curieuse','curieux','curieuses'],['sportif','sportive','sportifs','sportives'],['fatigué','fatiguée','fatigués','fatiguées']
  ];
  adjectives.forEach(([m, f, mp, fp], i) => {
    // Adjectives like « rouge » only have two real forms; pad the pool with the
    // regular-ending mistakes a child actually makes so there are still four
    // distinct options.
    const forms = [m, f, mp, fp, `${m}e`, `${m}s`, `${m}es`];
    const scenes = [['un nom masculin singulier',m],['un nom féminin singulier',f],['un nom masculin pluriel',mp],['un nom féminin pluriel',fp],['un nom féminin précédé de « une »',f],['un nom masculin précédé de « les »',mp]];
    scenes.forEach(([subject, answer], si) => q({ chapterId:'g4fr-adjectifs', subsection:'accord', difficulty:1 + ((i + si) % 4), question:`Quelle forme de « ${m} » faut-il employer avec ${subject} ?`, options:choices(answer, forms), answer, hint:'Regarde si le nom est masculin ou féminin, singulier ou pluriel.', explanation:`Avec ${subject}, l’adjectif prend la forme <b>${answer}</b>. Il s’accorde en genre et en nombre avec le nom.` }));
  });

  // ── Sentence grammar: 120 questions ─────────────────────────────────
  const places = [['sur','la table'],['sous','la chaise'],['dans','le sac'],['devant','la maison'],['derrière','l’arbre'],['entre','les deux chaises']];
  const positionSubjects = ['Le chat','Le chien','Le ballon','Le livre','Le sac','La poupée','Le crayon','La fleur'];
  places.forEach(([prep, place], i) => {
    const opts = places.map(x => x[0]);
    for (let r = 0; r < 8; r++) {
      const subject = positionSubjects[r];
      q({ chapterId:'g4fr-phrase', subsection:'prepositions', difficulty:1 + ((i + r) % 3), question:`Choisis la préposition qui signifie « ${['on top of','under','inside','in front of','behind','between'][i]} » : « ${subject} est ___ ${place}. »`, options:choices(prep, opts), answer:prep, hint:'La position à exprimer est indiquée en anglais. Choisis son équivalent français.', explanation:`${subject} est <b>${prep} ${place}</b>. « ${prep} » exprime ici la position « ${['on top of','under','inside','in front of','behind','between'][i]} ».` });
    }
  });
  const affirmatives = [['Je mange une pomme.','Je ne mange pas de pomme.'],['Il joue au ballon.','Il ne joue pas au ballon.'],['Nous regardons la télévision.','Nous ne regardons pas la télévision.'],['Elle aime le chocolat.','Elle n’aime pas le chocolat.'],['Tu as un chien.','Tu n’as pas de chien.'],['Ils parlent français.','Ils ne parlent pas français.']];
  const timeStarts = ['Le matin, ','Après l’école, ','Le lundi, ','En vacances, ','Aujourd’hui, ','Le soir, ','À la maison, ','Dans le jardin, ','Après le dîner, ','Avant de dormir, '];
  const low = s => s.charAt(0).toLowerCase() + s.slice(1);
  for (let r = 0; r < 10; r++) affirmatives.forEach(([yes, no], i) => {
    const lead = timeStarts[r];
    q({ chapterId:'g4fr-phrase', subsection:'negation', difficulty:1 + ((i + r) % 4), question:`Mets à la forme négative : « ${lead}${low(yes)} »`, options:choices(`${lead}${low(no)}`, [`${lead}${low(yes)}`,`${lead}${low(no.replace(' ne ', ' '))}`,`${lead}${low(no.replace(' pas', ''))}`,`Pas ${low(lead)}${low(yes)}`]), answer:`${lead}${low(no)}`, hint:'La négation encadre le verbe : ne / n’ … pas.', explanation:`La forme négative est <b>${lead}${low(no)}</b>. On place <b>ne</b> avant le verbe et <b>pas</b> après.` });
  });

  // ── Past tenses: 192 questions ──────────────────────────────────────
  // These verbs use avoir. Aller and venir are intentionally excluded here:
  // they take être in the passé composé and are already practised separately.
  const past = [
    ['manger','mangé',['une pomme hier.','du riz à midi.','un gâteau à la fête.']],
    ['jouer','joué',['au football hier.','dans le jardin.','aux cartes samedi.']],
    ['parler','parlé',['à la maîtresse.','avec des amis.','au téléphone hier.']],
    ['regarder','regardé',['un film hier soir.','les photos.','un match samedi.']],
    ['aimer','aimé',['le gâteau.','la chanson.','la sortie à la plage.']],
    ['finir','fini',['les devoirs.','le repas.','la lecture hier soir.']],
    ['choisir','choisi',['un livre.','une couleur.','un fruit au marché.']],
    ['prendre','pris',['le bus ce matin.','une photo.','le petit déjeuner.']],
    ['voir','vu',['un bel oiseau.','un arc-en-ciel.','un film samedi.']],
    ['faire','fait',['les devoirs hier.','un dessin.','un gâteau dimanche.']],
    ['dire','dit',['bonjour à la maîtresse.','merci à papa.','la réponse en classe.']],
    ['lire','lu',['un livre hier.','une histoire.','une carte postale.']],
    ['avoir','eu',['un beau cadeau.','une bonne note.','de la chance hier.']],
    ['être','été',['à la plage dimanche.','à l’école hier.','au marché samedi.']]
  ];
  const auxiliaries = [['j’','ai'],['tu','as'],['il','a'],['nous','avons'],['vous','avez'],['ils','ont']];
  past.forEach(([verb, part, comps], i) => auxiliaries.forEach(([person, aux], ai) => q({ chapterId:'g4fr-passe-comp', subsection:'formation', difficulty:1 + ((i + ai) % 4), question:`Complète : « ${person} ___ ${part} ${comps[(i + ai) % comps.length]} » (${verb}, passé composé)`, options:choices(aux, auxiliaries.map(x => x[1])), answer:aux, hint:'Au passé composé, choisis l’auxiliaire « avoir » qui va avec le sujet.', explanation:`On dit <b>${person} ${aux} ${part}</b>. Le passé composé se forme avec un auxiliaire + le participe passé.` })));
  const imperfect = [
    ['parler','parl',['souvent avec les voisins.','souvent à la maîtresse.','souvent des vacances.']],
    ['jouer','jou',['souvent dans le jardin.','souvent au football.','souvent avec le chien.']],
    ['regarder','regard',['souvent les étoiles.','la télévision le soir.','les bateaux au port.']],
    ['habiter','habit',['à Rose Hill.','près de la plage.','dans une petite maison.']],
    ['manger','mange',['souvent des mangues.','du riz à midi.','du pain le matin.']],
    ['aimer','aim',['les histoires.','la musique.','les gâteaux.']],
    ['finir','finiss',['souvent les devoirs tôt.','toujours le repas.','la lecture le soir.']],
    ['choisir','choisiss',['souvent un livre d’images.','toujours une place devant.','un fruit au marché.']],
    ['avoir','av',['peur du noir.','un petit vélo.','beaucoup de jouets.']],
    ['être','ét',['souvent à l’école tôt.','à la maison le soir.','au jardin le samedi.']],
    ['aller','all',['souvent à la plage.','au marché le samedi.','chez grand-mère.']],
    ['faire','fais',['souvent des dessins.','des gâteaux le dimanche.','du vélo.']],
    ['venir','ven',['à pied à l’école.','souvent à la fête du village.','à la maison le soir.']],
    ['prendre','pren',['le bus le matin.','le petit déjeuner tôt.','un goûter à quatre heures.']],
    ['lire','lis',['souvent des histoires.','des bandes dessinées.','un livre le soir.']],
    ['grandir','grandiss',['vite chaque année.','un peu chaque mois.','beaucoup pendant les vacances.']]
  ];
  const impEnds = ['ais','ais','ait','ions','iez','aient'];
  imperfect.forEach(([verb, stem, comps], i) => people.forEach((person, pi) => {
    const formFor = index => (verb === 'manger' && [3,4].includes(index) ? 'mang' : stem) + impEnds[index];
    const answer = formFor(pi);
    q({ chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1 + ((i + pi) % 4), question:`Complète : « Autrefois, ${subj(person, answer)}___ ${comps[(i + pi) % comps.length]} » (${verb}, imparfait)`, options:choices(answer, impEnds.map((e, index) => formFor(index))), answer, hint:'L’imparfait sert souvent à parler d’une habitude dans le passé.', explanation:`À l’imparfait, on dit <b>${subj(person, answer)}${answer}</b>. « Autrefois » indique une habitude ou une description dans le passé.${verb === 'manger' ? ' Avec nous et vous, on écrit mangions et mangiez, sans e après le g.' : ''}` });
  }));

  // ── Reading, text types and picture-language: 200 questions ─────────
  const readers = [
    ['Amina habite à Rose Hill. Chaque matin, elle marche à l’école avec son frère. Elle aime lire pendant la récréation.','Où habite Amina ?','À Rose Hill','Où','qui, où et quand'],
    ['Kevin prépare son sac le soir. Il y met ses cahiers, un livre et une bouteille d’eau. Le lendemain, il prend le bus à sept heures.','Que prépare Kevin le soir ?','Son sac','Que','les actions du personnage'],
    ['Samedi, Ravi va au marché avec sa grand-mère. Ils achètent des mangues et des tomates. Puis ils rentrent préparer le déjeuner.','Avec qui Ravi va-t-il au marché ?','Avec sa grand-mère','Avec qui','les personnes dans le texte'],
    ['Il pleut beaucoup ce matin. Lina prend son parapluie avant de sortir. Elle ne veut pas être mouillée.','Pourquoi Lina prend-elle son parapluie ?','Parce qu’il pleut','Pourquoi','la cause'],
    ['Après l’école, Noah joue au football dans le jardin. Son chien court derrière le ballon. À six heures, Noah rentre à la maison.','À quelle heure Noah rentre-t-il ?','À six heures','Quand','les heures et les moments'],
    ['Maya reçoit une carte postale de Rodrigues. Son cousin écrit que la mer est bleue et que les plages sont calmes.','D’où vient la carte postale ?','De Rodrigues','D’où','le lieu']
  ];
  const readerDetails = ['La rue est calme.','Son sac est prêt.','La journée commence bien.','Tout le monde est content.','Le trajet est court.','La famille sourit.','Le vent souffle doucement.','Le quartier est calme.','Les enfants parlent ensemble.','La journée finit bientôt.'];
  readers.forEach(([text, question, answer, kind, tip], ri) => {
    for (let r = 0; r < 10; r++) q({ chapterId:'g4fr-lecture', subsection:r % 3 === 0 ? 'reperage' : r % 3 === 1 ? 'idee_principale' : 'inference', difficulty:1 + ((ri + r) % 4), question:`<div style="background:#f8fafc;border-left:4px solid #6366f1;padding:10px;border-radius:6px"><b>Lis le texte.</b><br><br>${text} ${readerDetails[r]}</div><br>${question}`, options:choices(answer, r % 2 ? ['À Port Louis','Avec son professeur','Le matin suivant','Parce qu’il fait chaud'] : ['À Port Louis','Avec son professeur','Le matin suivant','Parce qu’il fait chaud']), answer, hint:`Pour une question « ${kind} », relis le texte et cherche ${tip}.`, explanation:`La réponse est <b>${answer}</b>. Elle est donnée directement ou peut être comprise grâce au texte.` });
  });
  const notices = [['FÊTE DE L’ÉCOLE','Samedi 10 octobre, de 9 h à 13 h, dans la cour. Entrée gratuite.','Quand a lieu la fête ?','Samedi 10 octobre'],['RECETTE : JUS DE MANGUE','Lave les mangues. Coupe-les avec un adulte. Mixe avec de l’eau.','Quelle action vient en premier ?','Laver les mangues'],['CARTE POSTALE','Bonjour Nisha, je passe mes vacances à Grand Baie. À bientôt ! Sofia','Qui écrit la carte ?','Sofia'],['RÈGLES DE CLASSE','Écoute le maître. Lève la main. Range ton bureau.','Quel verbe est à l’impératif ?','Lève']];
  const documentDetails = ['Document pour lundi.','Document pour mardi.','Document pour mercredi.','Document pour jeudi.','Document pour vendredi.','Document pour samedi.','Document pour dimanche.','Document pour la classe A.','Document pour la classe B.','Document pour la bibliothèque.','Document pour la maison.','Document pour l’école.','Document pour les familles.','Document pour les amis.','Document pour la récréation.','Document pour le matin.','Document pour l’après-midi.','Document pour le soir.','Document à relire.','Document à partager.'];
  notices.forEach(([title, body, ask, answer], ni) => {
    for (let r = 0; r < 20; r++) q({ chapterId:'g4fr-textes', subsection:['affiche','recette','carte_postale','recit'][ni], difficulty:1 + ((ni + r) % 4), question:`<div style="border:2px solid #94a3b8;border-radius:8px;padding:10px"><b>${title}</b><br><br>${body}<br><br><i>${documentDetails[r]}</i></div><br>${r % 2 ? 'Quel est le type de ce texte ?' : ask}`, options:choices(r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'Des règles') : answer, r % 2 ? ['Un problème de maths','Une histoire de pirates','Un dictionnaire','Une poésie'] : ['Dimanche','Un cahier','Le directeur','Courir']), answer:r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'Des règles') : answer, hint:'Regarde le titre, la présentation et les mots importants du document.', explanation:`La bonne réponse est <b>${r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'des règles') : answer}</b>. La forme d’un texte aide à comprendre son but.` });
  });
  const scenes = [['un garçon','au parc','joue au ballon','vert'],['une fille','à la plage','construit un château de sable','bleu'],['deux enfants','dans le jardin','arrosent les fleurs','jaunes'],['une famille','dans la cuisine','prépare le dîner','rouge']];
  scenes.forEach(([who, where, action, colour], si) => {
    const sceneDetails = ['Il fait beau.','Le ciel est clair.','On entend des oiseaux.','Le sol est propre.','Un arbre est près de la scène.','Les personnages sourient.','Le vent est léger.','La lumière est douce.','La journée commence.','La journée se termine.','Le lieu est calme.','Les amis sont proches.','Un sac est posé à côté.','Une fleur est visible.','La mer est loin.','Une maison est au fond.','Le soleil brille.','Les couleurs sont vives.','Tout semble joyeux.','La scène est paisible.'];
    for (let r = 0; r < 20; r++) {
      const location = `${who} ${si === 2 ? 'sont' : 'est'} ${where}`;
      const colourDetail = ['Un ballon vert est visible.','Un seau bleu est visible.','Les fleurs sont jaunes.','Un bol rouge est visible.'][si];
      const answers = r % 4 === 0 ? [`${location}.`,'Il pleut dans la classe.','Un animal dort sous la table.','Personne ne joue.'] : r % 4 === 1 ? [action,'dort à l’école','lit une carte','prend le bus'] : r % 4 === 2 ? [colour,'noir','violet','orange'] : [`D’abord, je décris le lieu, puis les personnages et leurs actions.`,'Je répète la même phrase.','Je parle seulement de couleurs.','Je n’observe pas l’image.'];
      const answer = answers[0];
      q({ chapterId:'g4fr-images', subsection:r % 2 ? 'une_image' : 'trois_images', difficulty:1 + ((si + r) % 4), question:`Imagine une image : ${location} et ${action}. ${colourDetail} ${sceneDetails[r]} ${r % 4 === 0 ? 'Quelle phrase la décrit correctement ?' : r % 4 === 1 ? 'Quelle action est décrite ?' : r % 4 === 2 ? 'Quelle couleur est explicitement indiquée dans la description ?' : 'Quel est le meilleur plan pour écrire une description ?'}`, options:answers, answer, hint:'Pour décrire cette scène imaginée, utilise les informations données dans le texte.', explanation:`La réponse correcte est <b>${answer}</b>. ${r % 4 === 2 ? colourDetail : 'Une bonne description suit un ordre clair et utilise les informations de la scène.'}` });
    }
  });
})();
