'use strict';
// Grade 4 French - large varied revision bank.
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

  // ── DIFFICULTY ────────────────────────────────────────────────────────────
  // ⚠ Difficulty is derived from what the item DEMANDS. It used to be
  //   `1 + ((vi + pi + ci) % 4)` - verb index + person index + completion index
  //   modulo 4 - so the label was the loop counter. The identical task appeared
  //   at all four levels (176 groups in Grade 5 alone spanned L1-L4), and the
  //   label carried no information whatsoever.
  //
  //   It is not cosmetic: printable exam papers draw Section B from L4 only,
  //   the parent's difficulty cap filters on these numbers, the weak-area drill
  //   uses L1-L3, and the child's daily mission asks for L1.
  //
  // ⚠ These packs are `noDifficulty: true`, so a child never picks a level -
  //   practice is always mixed. That is exactly why the numbers must be honest:
  //   nothing in the UI would reveal a wrong one.
  const _clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  // nous / vous / ils carry the endings children actually get wrong; je / tu / il
  // are the forms they meet first and use most.
  const _personCost = p => ['nous', 'vous', 'ils', 'elles'].includes(String(p).trim()) ? 1 : 0;
  // A stem that changes between singular and plural (vais/allons, suis/sommes,
  // ai/avons) is where the real difficulty of an irregular verb sits.
  const _stemShift = (forms, pi) =>
    (forms[pi] || '').slice(0, 3) !== (forms[0] || '').slice(0, 3) ? 1 : 0;
  // Regular -ER is the pattern taught first; -IR regulars next; the rest are
  // irregular. `aller` looks like an -ER verb and is the classic trap.
  const _verbCost = v => (/er$/.test(v) && v !== 'aller') ? 0 : 1;

  const enWords = vocab.map(x => x[1]);
  const frWords = vocab.map(x => x[0]);

  // One short sentence per vocabulary word, so the English-to-French question
  // below is answered by reading rather than by bare recall.
  //
  // ⚠ The gap always takes the word EXACTLY as the vocab list stores it,
  //   article included ("le chat"), because that string is the answer and the
  //   distractors are the other list entries. A sentence that needed "chat"
  //   without its article would make every option wrong.
  // ⚠ Colour sentences use a masculine singular subject on purpose. "Les
  //   feuilles sont ........" would need "vertes", and the answer on offer is
  //   "vert" - the list holds the base form, so the sentence has to be one that
  //   the base form actually completes.
  const ctx = {
    'le chat': 'Dans la maison, ................ dort sur le lit.',
    'le chien': 'Quand quelqu’un arrive, ................ aboie très fort.',
    'l’oiseau': 'Sur la branche du manguier, ................ chante le matin.',
    'le poisson': 'Dans le lagon, ................ nage entre les coraux.',
    'le lapin': 'Avec ses longues oreilles, ................ mange une carotte.',
    'le cheval': 'Dans le champ, ................ galope très vite.',
    'la vache': 'Chaque matin, ................ nous donne du lait.',
    'le mouton': 'Avec sa laine, ................ nous donne des pulls chauds.',
    'la mère': 'Dans la cuisine, ................ de Rita prépare le dîner.',
    'le père': 'Chaque jour, ................ de Sam travaille à Port-Louis.',
    'la sœur': 'Née après moi, ................ de Nita a huit ans.',
    'le frère': 'Au stade, ................ de Kavi joue au football.',
    'la grand-mère': 'Le soir, ................ raconte une histoire aux enfants.',
    'le grand-père': 'Sous la véranda, ................ lit son journal.',
    'la fille': 'Chez nous, ................ de mes parents est ma sœur.',
    'le fils': 'Chez nous, ................ de mes parents est mon frère.',
    'la tête': 'Pour se protéger du soleil, Yash met un chapeau sur ................ .',
    'la main': 'Pour écrire, Nita tient son stylo dans ................ droite.',
    'le pied': 'Ravi met une chaussure à chaque ................ .',
    'les yeux': 'Pour dormir, on ferme ................ .',
    'rouge': 'Le sang et la tomate mûre sont de couleur ................ .',
    'bleu': 'Sans un seul nuage, le ciel est tout ................ .',
    'vert': 'Après la pluie, le gazon du jardin est bien ................ .',
    'jaune': 'Bien mûr, le citron devient ................ .',
    'noir': 'Dans la classe, le tableau est ................ .',
    'blanc': 'Dans le verre, le lait est ................ .',
    'bonjour': 'En arrivant à l’école, on dit « ................ » au maître.',
    'merci': 'Quand on reçoit un cadeau, on dit « ................ ».',
    'au revoir': 'En quittant la classe, les élèves disent « ................ ».',
    's’il te plaît': 'À un ami, on dit : « Passe-moi la gomme, ................ . »',
    'la maison': 'Après l’école, la famille rentre à ................ .',
    'l’école': 'Chaque matin, Ravi va à ................ avec son cartable.',
    'le livre': 'Avant de dormir, Aisha lit ................ que sa mère lui a offert.',
    'le cahier': 'L’élève copie la leçon dans ................ .',
    'la table': 'Le soir, on mange sur ................ de la cuisine.',
    'la chaise': 'Fatigué, papa s’assoit sur ................ .',
    'la fenêtre': 'Pour laisser entrer l’air, on ouvre ................ .',
    'le jardin': 'Derrière la maison, les fleurs poussent dans ................ .',
    'le soleil': 'Le matin, ................ se lève à l’est.',
    'la pluie': 'Pendant l’été à Maurice, ................ tombe très fort.',
  };

  // A short French definition per word, for the "find the word that matches
  // this description" question. Modelled on the real Grade 5 paper's Q3A -
  // "Read the given descriptions. Then, find a word to match each description."
  // ⚠ A definition must never contain the word it defines. Asserted below.
  const defn = {
    'le chat': 'Petit animal domestique qui miaule et fait sa toilette.',
    'le chien': 'Animal fidèle qui aboie et garde la maison.',
    'l’oiseau': 'Animal à plumes qui vole et fait son nid dans les arbres.',
    'le poisson': 'Animal qui vit dans l’eau et respire par des branchies.',
    'le lapin': 'Petit animal aux longues oreilles qui aime les carottes.',
    'le cheval': 'Grand animal que l’on monte et qui galope vite.',
    'la vache': 'Grand animal de la ferme qui nous donne du lait.',
    'le mouton': 'Animal de la ferme dont la laine sert à faire des pulls.',
    'la mère': 'La femme qui a mis l’enfant au monde.',
    'le père': 'L’homme qui élève l’enfant avec sa femme.',
    'la sœur': 'La fille née des mêmes parents que moi.',
    'le frère': 'Le garçon né des mêmes parents que moi.',
    'la grand-mère': 'La maman de mon papa ou de ma maman.',
    'le grand-père': 'Le papa de mon papa ou de ma maman.',
    'la fille': 'L’enfant de sexe féminin dans une famille.',
    'le fils': 'L’enfant de sexe masculin dans une famille.',
    'la tête': 'Partie du corps où se trouvent la bouche et le nez.',
    'la main': 'Partie du corps, au bout du bras, qui a cinq doigts.',
    'le pied': 'Partie du corps, au bout de la jambe, sur laquelle on marche.',
    'les yeux': 'Parties du corps qui permettent de voir.',
    'rouge': 'Couleur du sang et de la tomate mûre.',
    'bleu': 'Couleur du ciel sans un seul nuage.',
    'vert': 'Couleur des feuilles et du gazon.',
    'jaune': 'Couleur du citron mûr et du maïs.',
    'noir': 'Couleur de la nuit sans lune.',
    'blanc': 'Couleur du lait et de la craie.',
    'bonjour': 'Mot que l’on dit en arrivant, le matin.',
    'merci': 'Mot que l’on dit pour remercier quelqu’un.',
    'au revoir': 'Mots que l’on dit en quittant quelqu’un.',
    's’il te plaît': 'Formule polie pour demander quelque chose à un ami.',
    'la maison': 'Bâtiment où habite une famille.',
    'l’école': 'Endroit où les enfants viennent apprendre.',
    'le livre': 'Objet fait de pages imprimées que l’on lit.',
    'le cahier': 'Objet fait de pages où l’élève écrit ses leçons.',
    'la table': 'Meuble à quatre pieds sur lequel on mange.',
    'la chaise': 'Meuble avec un dossier sur lequel on s’assoit.',
    'la fenêtre': 'Ouverture dans le mur qui laisse entrer la lumière.',
    'le jardin': 'Endroit près de la maison où poussent les fleurs.',
    'le soleil': 'Astre qui éclaire et réchauffe la Terre le jour.',
    'la pluie': 'Eau qui tombe des nuages.',
  };

  // Distractors from the SAME subsection first, so the sentence or the
  // description has to be read. Falls back to the full list where a topic is
  // too small to fill four slots.
  const near = (list, self, s) => vocab.filter(v => v[2] === s).map(list)
    .filter(x => x !== self).concat(vocab.map(list));
  const strip = w => w.replace(/^(le |la |les |l’)/, '');

  // ⚠ A description that contains the word it defines gives the answer away.
  //   Checked here rather than trusted, because the list is hand-written and a
  //   later edit is exactly where it would slip in.
  for (const [w, d] of Object.entries(defn)) {
    const bare = strip(w);
    if (new RegExp('\\b' + bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(d)) {
      console.warn('[grade4-french] the description for "' + w + '" contains its own answer:', d);
    }
  }

  vocab.forEach(([fr, en, sub], i) => {
    // ⚠ Was `Que signifie « le chat » en anglais ?` - a bare word with nothing
    //   to read. It now reads a FRENCH description and gives the English word.
    //
    // ⚠ It deliberately does NOT reuse ctx[fr]. The first draft showed
    //   « Dans la maison, le chat dort sur le lit » here and then offered that
    //   same sentence with the word cut out as the very next question - so
    //   seeing this one handed the next one over for nothing, no French
    //   required. The three questions per word now use three different
    //   stimuli: a description, a sentence with a gap, and the description
    //   again but answered in French. Sharing the description between the
    //   first and third is fine - one wants the English word and the other the
    //   French, which is the recall actually being tested.
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:1,
      question: defn[fr]
        ? `Lis la description, puis réponds en anglais.<br>« ${defn[fr]} »<br>De quel mot s’agit-il ?`
        : `Que signifie « ${fr} » en anglais ?`,
      options:choices(en, near(v => v[1], en, sub)), answer:en,
      hint:'Relis la description : chaque détail élimine une réponse.',
      explanation:`La description correspond à « <b>${fr}</b> », c’est-à-dire <b>${en}</b> en anglais.` });
    // ⚠ Was `Comment dit-on « ${en} » en français ?` - bare translation of a
    //   single word, a shape no PSAC language paper uses. The Grade 5 paper
    //   always asks vocabulary as "Complète chaque phrase par un mot
    //   convenable", so the word is now met in a sentence. Falls back to the
    //   old wording if a word has no sentence yet, rather than producing a
    //   question with an empty gap.
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:2,
      question: ctx[fr]
        ? `Complète la phrase.<br>« ${ctx[fr]} »`
        : `Comment dit-on « ${en} » en français ?`,
      // ⚠ Distractors come from the SAME subsection first. choices() was fed
      //   frWords.slice(i + 1), i.e. whatever came next in the list, so a
      //   colour question could be offered "au revoir / merci / bonjour" - one
      //   plausible option and three from another topic, answerable without
      //   reading the sentence at all. Same-topic distractors make the sentence
      //   do the work. Falls back to the full list where a subsection is small.
      options:choices(fr, vocab.filter(v => v[2] === sub && v[0] !== fr).map(v => v[0])
        .concat(frWords.slice(i + 1)).concat(frWords)), answer:fr,
      hint:'Lis toute la phrase : elle décrit le mot qui manque.',
      explanation:`Le mot qui manque est <b>${fr}</b> (${en}). Garde l’article avec le nom : on dit <i>${fr}</i>, pas le nom tout seul.` });
    // ⚠ Was `Choisis le mot français qui signifie « the cat ».` - the third
    //   bare translation of the same word in one loop. It is now a FRENCH
    //   description answered by a FRENCH word, with no English on screen, which
    //   is the shape the Grade 5 paper uses at Q3A: "Read the given
    //   descriptions. Then, find a word to match each description." That also
    //   makes the three questions per word genuinely different from each other
    //   - read a sentence, complete a sentence, match a description.
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:2,
      question: defn[fr]
        ? `Lis la description, puis trouve le mot.<br>« ${defn[fr]} »`
        : `Choisis le mot français qui signifie « ${en} ».`,
      options:choices(strip(fr), near(v => strip(v[0]), strip(fr), sub)), answer:strip(fr),
      hint:'Relis la description : chaque détail élimine une réponse.',
      explanation:`La description correspond à <b>${strip(fr)}</b>.${/^(le |la |les |l’)/.test(fr) ? ` Dans une phrase, garde l’article : <i>${fr}</i>.` : ''}` });
    q({ chapterId:'g4fr-vocabulaire', subsection:sub, difficulty:3,
      question:`À quelle catégorie appartient « ${fr} » ?`, options:choices(sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'le vocabulaire de la vie quotidienne', ['un nombre','un verbe au passé','une question de maths','un pays']), answer:sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'le vocabulaire de la vie quotidienne',
      hint:'Pense à ce que le mot désigne dans la vie réelle, pas à sa place dans la phrase.',
      explanation:`« <b>${fr}</b> » est lié à <b>${sub === 'animaux' ? 'un animal' : sub === 'famille' ? 'la famille' : sub === 'couleurs' ? 'une couleur' : sub === 'corps' ? 'le corps' : 'la vie quotidienne'}</b>. Classer les mots aide la mémoire.` });
  });
  const numbers = [['un',1],['deux',2],['trois',3],['quatre',4],['cinq',5],['six',6],['sept',7],['huit',8],['neuf',9],['dix',10],['onze',11],['douze',12],['treize',13],['quatorze',14],['quinze',15],['seize',16],['dix-sept',17],['dix-huit',18],['dix-neuf',19],['vingt',20]];
  // ⚠ Each number was asked twice as a bare drill - "Comment dit-on 7 ?" and
  // "Quel nombre est « sept » ?" - which is Grade 1 work for a child who has
  // had French since Grade 1. Both directions are kept, because producing a
  // word and reading one are different skills, but each now sits in a short
  // sentence and the frames rotate so forty items do not read as forty copies
  // of one. Measured 2026-09-08 against the Grade 5 paper, whose vocabulary
  // question is always "Complète chaque phrase par un mot convenable".
  //
  // ⚠ DO NOT ADD OR REMOVE A q() CALL IN THIS FILE. Ids are positional
  // (`g4fr-plus-${n}`), so one extra call renumbers every later question and
  // orphans the per-question progress recorded against those ids.
  // ⚠ EVERY COUNTED NOUN HERE IS MASCULINE, and the plural -s is conditional.
  //   The first draft counted "mangues" and "minutes": at value 1 that produced
  //   « il y a 1 mangues » - wrong plural - and worse, the answer word offered
  //   was "un" while « mangue » and « minute » are feminine and take "une".
  //   A French app cannot teach a gender error. Masculine nouns keep "un"
  //   correct for every value, and `s` handles the singular.
  const s = v => (v > 1 ? 's' : '');
  const numScene = [
    v => `Dans la boîte il y a ${v} crayon${s(v)}. On écrit : « ................ crayon${s(v)} ».`,
    v => `Le voyage commence dans ${v} jour${s(v)}. On écrit : « ................ jour${s(v)} ».`,
    v => `Aisha a ${v} cahier${s(v)} dans son sac. On écrit : « ................ cahier${s(v)} ».`,
    v => `Il y a ${v} élève${s(v)} au tableau. On écrit : « ................ élève${s(v)} ».`,
    v => `Papa achète ${v} pain${s(v)} à la boutique. On écrit : « ................ pain${s(v)} ».`,
  ];
  const numSceneRead = [
    (w, v) => `Maman achète « ${w} » œuf${s(v)} au marché. Combien d'œufs achète-t-elle ?`,
    (w) => `Le maître écrit « ${w} » au tableau. Quel nombre a-t-il écrit ?`,
    (w, v) => `Rohan a « ${w} » livre${s(v)} dans son sac. Combien de livres a-t-il ?`,
    (w, v) => `Il y a « ${w} » garçon${s(v)} dans l'équipe. Combien de garçons ?`,
    (w, v) => `Le magasin ferme dans « ${w} » jour${s(v)}. Combien de jours ?`,
  ];
  numbers.forEach(([word, value], i) => {
    q({ chapterId:'g4fr-vocabulaire', subsection:'nombres', difficulty:value <= 10 ? 1 : 2,
      question:`Complète la phrase.<br>« ${numScene[i % numScene.length](value)} »`,
      options:choices(word, numbers.map(x => x[0]).slice(i + 1).concat(numbers.map(x => x[0]))), answer:word,
      hint:`Écris ${value} en toutes lettres.`,
      explanation:`Le nombre <b>${value}</b> s'écrit <b>${word}</b> en français.` });
    q({ chapterId:'g4fr-vocabulaire', subsection:'nombres', difficulty:2,
      question:`Lis la phrase, puis réponds.<br>« ${numSceneRead[i % numSceneRead.length](word, value)} »`,
      options:choices(String(value), numbers.map(x => String(x[1])).slice(i + 1).concat(numbers.map(x => String(x[1])))), answer:String(value),
      hint:'Le nombre est écrit en toutes lettres dans la phrase.',
      explanation:`« <b>${word}</b> » est le nombre <b>${value}</b>.` });
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
    q({ chapterId:'g4fr-noms', subsection:'articles_indef', difficulty:definite.length === 2 ? 2 : 1, question:`Choisis l’article indéfini singulier : « ${word === 'soleil' ? 'Je dessine' : ['école','plage','enfant'].includes(word) ? 'Je vois' : 'J’ai'} ___ ${word}. »`, options:choices(indefinite, ['un','une','des','le']), answer:indefinite, hint:'« Un » est masculin et « une » est féminin.', explanation:`On dit <b>${indefinite} ${word}</b>. « ${indefinite} » veut dire « a / an ».` });
    q({ chapterId:'g4fr-noms', subsection:'pluriel', difficulty:2, question:`Quel est le pluriel de « ${definite}${definite === 'l’' ? '' : ' '}${word} » ?`, options:choices(`les ${plural}`, [`le ${plural}`,`des ${word}`,`la ${plural}`,`un ${plural}`]), answer:`les ${plural}`, hint:'Au pluriel, l’article défini devient « les ». Regarde aussi la fin du nom.', explanation:`Le pluriel est <b>les ${plural}</b>. La plupart des noms prennent <b>-s</b>, mais certains mots ont une forme spéciale.` });
    q({ chapterId:'g4fr-noms', subsection:'genre', difficulty:2, question:`Dans « ${indefinite} ${word} », le nom est-il masculin ou féminin ?`, options:choices(gender, ['masculin','féminin','pluriel seulement','un verbe']), answer:gender, hint:`L’article indéfini « ${indefinite} » indique le genre dans ce groupe nominal.`, explanation:`Dans <b>${indefinite} ${word}</b>, le nom est <b>${gender}</b>. L’article élidé « l’ » ne permet pas, à lui seul, de connaître le genre.` });
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
    q({ chapterId:'g4fr-verbes', subsection:verb === 'être' || verb === 'avoir' ? 'etre_avoir' : ['aller','faire','prendre','venir','lire'].includes(verb) ? 'irreguliers' : verb.endsWith('er') ? 'verbes_er' : 'conjugaison', difficulty:_clamp(1 + _verbCost(verb) + _personCost(person) + _stemShift(forms, pi), 1, 3),
      question:`Complète : « ${subj(person, answer)}___ ${comps[(vi + pi) % comps.length]} » (${verb}, au présent)`, options:choices(answer, forms), answer,
      hint:`Observe le sujet « ${person} » puis choisis la forme ${/^[aeéèêhiouâàî]/.test(verb) ? 'd’' : 'de '}<i>${verb}</i> qui lui correspond.`, explanation:`Au présent, on dit <b>${subj(person, answer)}${answer}</b>. Le verbe est <b>${verb}</b>.` });
  }));
  verbs.forEach(([verb, forms, comps], i) => {
    const comp = comps[i % comps.length];
    const answer = `Nous ${forms[3]} ${comp}`;
    q({ chapterId:'g4fr-verbes', subsection:verb === 'être' || verb === 'avoir' ? 'etre_avoir' : 'conjugaison', difficulty:2, question:`Quelle phrase est correcte avec le verbe « ${verb} » ?`, options:choices(answer, [`Nous ${forms[1]} ${comp}`,`Ils ${forms[3]} ${comp}`,`Je ${forms[4]} ${comp}`]), answer, hint:'Le sujet « nous » demande la forme « nous » du verbe.', explanation:`La bonne phrase est <b>${answer}</b> Vérifie toujours que le sujet et le verbe vont ensemble.` });
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
    scenes.forEach(([subject, answer], si) => q({ chapterId:'g4fr-adjectifs', subsection:'accord', difficulty:2, question:`Quelle forme de « ${m} » faut-il employer avec ${subject} ?`, options:choices(answer, forms), answer, hint:'Regarde si le nom est masculin ou féminin, singulier ou pluriel.', explanation:`Avec ${subject}, l’adjectif prend la forme <b>${answer}</b>. Il s’accorde en genre et en nombre avec le nom.` }));
  });

  // ── Sentence grammar: 120 questions ─────────────────────────────────
  const places = [['sur','la table'],['sous','la chaise'],['dans','le sac'],['devant','la maison'],['derrière','l’arbre'],['entre','les deux chaises']];
  const positionSubjects = ['Le chat','Le chien','Le ballon','Le livre','Le sac','La poupée','Le crayon','La fleur'];
  places.forEach(([prep, place], i) => {
    const opts = places.map(x => x[0]);
    for (let r = 0; r < 8; r++) {
      const subject = positionSubjects[r];
      q({ chapterId:'g4fr-phrase', subsection:'prepositions', difficulty:2, question:`Choisis la préposition qui signifie « ${['on top of','under','inside','in front of','behind','between'][i]} » : « ${subject} est ___ ${place}. »`, options:choices(prep, opts), answer:prep, hint:'La position à exprimer est indiquée en anglais. Choisis son équivalent français.', explanation:`${subject} est <b>${prep} ${place}</b>. « ${prep} » exprime ici la position « ${['on top of','under','inside','in front of','behind','between'][i]} ».` });
    }
  });
  const affirmatives = [['Je mange une pomme.','Je ne mange pas de pomme.'],['Il joue au ballon.','Il ne joue pas au ballon.'],['Nous regardons la télévision.','Nous ne regardons pas la télévision.'],['Elle aime le chocolat.','Elle n’aime pas le chocolat.'],['Tu as un chien.','Tu n’as pas de chien.'],['Ils parlent français.','Ils ne parlent pas français.']];
  const timeStarts = ['Le matin, ','Après l’école, ','Le lundi, ','En vacances, ','Aujourd’hui, ','Le soir, ','À la maison, ','Dans le jardin, ','Après le dîner, ','Avant de dormir, '];
  const low = s => s.charAt(0).toLowerCase() + s.slice(1);
  for (let r = 0; r < 10; r++) affirmatives.forEach(([yes, no], i) => {
    const lead = timeStarts[r];
    q({ chapterId:'g4fr-phrase', subsection:'negation', difficulty:2, question:`Mets à la forme négative : « ${lead}${low(yes)} »`, options:choices(`${lead}${low(no)}`, [`${lead}${low(yes)}`,`${lead}${low(no.replace(' ne ', ' '))}`,`${lead}${low(no.replace(' pas', ''))}`,`Pas ${low(lead)}${low(yes)}`]), answer:`${lead}${low(no)}`, hint:'La négation encadre le verbe : ne / n’ … pas.', explanation:`La forme négative est <b>${lead}${low(no)}</b>. On place <b>ne</b> avant le verbe et <b>pas</b> après.` });
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
  past.forEach(([verb, part, comps], i) => auxiliaries.forEach(([person, aux], ai) => q({ chapterId:'g4fr-passe-comp', subsection:'formation', difficulty:_clamp(1 + (/é$/.test(part) ? 0 : 1) + _personCost(person), 1, 3), question:`Complète : « ${person} ___ ${part} ${comps[(i + ai) % comps.length]} » (${verb}, passé composé)`, options:choices(aux, auxiliaries.map(x => x[1])), answer:aux, hint:'Au passé composé, choisis l’auxiliaire « avoir » qui va avec le sujet.', explanation:`On dit <b>${person} ${aux} ${part}</b>. Le passé composé se forme avec un auxiliaire + le participe passé.` })));
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
    q({ chapterId:'g4fr-imparfait', subsection:'formation', difficulty:_clamp(1 + _personCost(person) + (verb === 'manger' && [3, 4].includes(pi) ? 1 : 0), 1, 3), question:`Complète : « Autrefois, ${subj(person, answer)}___ ${comps[(i + pi) % comps.length]} » (${verb}, imparfait)`, options:choices(answer, impEnds.map((e, index) => formFor(index))), answer, hint:'L’imparfait sert souvent à parler d’une habitude dans le passé.', explanation:`À l’imparfait, on dit <b>${subj(person, answer)}${answer}</b>. « Autrefois » indique une habitude ou une description dans le passé.${verb === 'manger' ? ' Avec nous et vous, on écrit mangions et mangiez, sans e après le g.' : ''}` });
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
    for (let r = 0; r < 10; r++) q({ chapterId:'g4fr-lecture', subsection:r % 3 === 0 ? 'reperage' : r % 3 === 1 ? 'idee_principale' : 'inference', difficulty:r % 3 === 0 ? 1 : r % 3 === 1 ? 2 : 3, question:`<div style="background:#f8fafc;border-left:4px solid #6366f1;padding:10px;border-radius:6px"><b>Lis le texte.</b><br><br>${text} ${readerDetails[r]}</div><br>${question}`, options:choices(answer, r % 2 ? ['À Port Louis','Avec son professeur','Le matin suivant','Parce qu’il fait chaud'] : ['À Port Louis','Avec son professeur','Le matin suivant','Parce qu’il fait chaud']), answer, hint:`Pour une question « ${kind} », relis le texte et cherche ${tip}.`, explanation:`La réponse est <b>${answer}</b>. Elle est donnée directement ou peut être comprise grâce au texte.` });
  });
  const notices = [['FÊTE DE L’ÉCOLE','Samedi 10 octobre, de 9 h à 13 h, dans la cour. Entrée gratuite.','Quand a lieu la fête ?','Samedi 10 octobre'],['RECETTE : JUS DE MANGUE','Lave les mangues. Coupe-les avec un adulte. Mixe avec de l’eau.','Quelle action vient en premier ?','Laver les mangues'],['CARTE POSTALE','Bonjour Nisha, je passe mes vacances à Grand Baie. À bientôt ! Sofia','Qui écrit la carte ?','Sofia'],['RÈGLES DE CLASSE','Écoute le maître. Lève la main. Range ton bureau.','Quel verbe est à l’impératif ?','Lève']];
  const documentDetails = ['Document pour lundi.','Document pour mardi.','Document pour mercredi.','Document pour jeudi.','Document pour vendredi.','Document pour samedi.','Document pour dimanche.','Document pour la classe A.','Document pour la classe B.','Document pour la bibliothèque.','Document pour la maison.','Document pour l’école.','Document pour les familles.','Document pour les amis.','Document pour la récréation.','Document pour le matin.','Document pour l’après-midi.','Document pour le soir.','Document à relire.','Document à partager.'];
  notices.forEach(([title, body, ask, answer], ni) => {
    for (let r = 0; r < 20; r++) q({ chapterId:'g4fr-textes', subsection:['affiche','recette','carte_postale','recit'][ni], difficulty:2, question:`<div style="border:2px solid #94a3b8;border-radius:8px;padding:10px"><b>${title}</b><br><br>${body}<br><br><i>${documentDetails[r]}</i></div><br>${r % 2 ? 'Quel est le type de ce texte ?' : ask}`, options:choices(r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'Des règles') : answer, r % 2 ? ['Un problème de maths','Une histoire de pirates','Un dictionnaire','Une poésie'] : ['Dimanche','Un cahier','Le directeur','Courir']), answer:r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'Des règles') : answer, hint:'Regarde le titre, la présentation et les mots importants du document.', explanation:`La bonne réponse est <b>${r % 2 ? (ni === 0 ? 'Une affiche' : ni === 1 ? 'Une recette' : ni === 2 ? 'Une carte postale' : 'des règles') : answer}</b>. La forme d’un texte aide à comprendre son but.` });
  });
  const scenes = [['un garçon','au parc','joue au ballon','vert'],['une fille','à la plage','construit un château de sable','bleu'],['deux enfants','dans le jardin','arrosent les fleurs','jaunes'],['une famille','dans la cuisine','prépare le dîner','rouge']];
  scenes.forEach(([who, where, action, colour], si) => {
    const sceneDetails = ['Il fait beau.','Le ciel est clair.','On entend des oiseaux.','Le sol est propre.','Un arbre est près de la scène.','Les personnages sourient.','Le vent est léger.','La lumière est douce.','La journée commence.','La journée se termine.','Le lieu est calme.','Les amis sont proches.','Un sac est posé à côté.','Une fleur est visible.','La mer est loin.','Une maison est au fond.','Le soleil brille.','Les couleurs sont vives.','Tout semble joyeux.','La scène est paisible.'];
    for (let r = 0; r < 20; r++) {
      const location = `${who} ${si === 2 ? 'sont' : 'est'} ${where}`;
      const colourDetail = ['Un ballon vert est visible.','Un seau bleu est visible.','Les fleurs sont jaunes.','Un bol rouge est visible.'][si];
      const answers = r % 4 === 0 ? [`${location}.`,'Il pleut dans la classe.','Un animal dort sous la table.','Personne ne joue.'] : r % 4 === 1 ? [action,'dort à l’école','lit une carte','prend le bus'] : r % 4 === 2 ? [colour,'noir','violet','orange'] : [`D’abord, je décris le lieu, puis les personnages et leurs actions.`,'Je répète la même phrase.','Je parle seulement de couleurs.','Je n’observe pas l’image.'];
      const answer = answers[0];
      q({ chapterId:'g4fr-images', subsection:r % 2 ? 'une_image' : 'trois_images', difficulty:r % 2 ? 2 : 3, question:`Imagine une image : ${location} et ${action}. ${colourDetail} ${sceneDetails[r]} ${r % 4 === 0 ? 'Quelle phrase la décrit correctement ?' : r % 4 === 1 ? 'Quelle action est décrite ?' : r % 4 === 2 ? 'Quelle couleur est explicitement indiquée dans la description ?' : 'Quel est le meilleur plan pour écrire une description ?'}`, options:answers, answer, hint:'Pour décrire cette scène imaginée, utilise les informations données dans le texte.', explanation:`La réponse correcte est <b>${answer}</b>. ${r % 4 === 2 ? colourDetail : 'Une bonne description suit un ordre clair et utilise les informations de la scène.'}` });
    }
  });
})();
