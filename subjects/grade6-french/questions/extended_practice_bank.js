'use strict';
// Grade 6 French — revision questions kept at Grade 6 difficulty.
// Each verb carries its own completions so every generated sentence reads as
// real French. Tense questions offer the SAME verb with different endings, so
// they test conjugation rather than verb recognition.
(function () {
  let id = 0;
  const add = (chapterId, subsection, difficulty, question, options, answer, hint, explanation) => {
    id += 1;
    STATIC_QUESTIONS.push(makeMCQ({ id:`g6fr-plus-${String(id).padStart(4,'0')}`, chapterId, subsection, difficulty, question, options, answer, hint, explanation }));
  };
  const opts = (answer, values) => {
    const u = [answer];
    for (const v of values) if (!u.includes(v)) u.push(v);
    return u.slice(0, 4);
  };
  const subj = (person, form) => person === 'je' && /^[aàâeéèêiîouhy]/i.test(form) ? 'j’' : `${person} `;
  const people = ['je','tu','il','nous','vous','ils'];
  const futureEnds = ['ai','as','a','ons','ez','ont'];
  const condEnds = ['ais','ais','ait','ions','iez','aient'];
  const refl = ['me','te','se','nous','vous','se'];
  const fitComp = (comp, pi) => comp.startsWith('se ') ? `${refl[pi]} ${comp.slice(3)}` : comp;

  // Future simple: 15 verbs × 6 people × 5 per-verb completions = 450.
  const future = [
    ['parler','parler',['au directeur demain','de la sortie lundi','français pendant le voyage','au téléphone ce soir','du projet à la classe']],
    ['jouer','jouer',['au football samedi','dans l’équipe de l’école','aux dominos dimanche','avec les voisins demain','au badminton après la classe']],
    ['finir','finir',['les devoirs avant le dîner','le projet vendredi','la lecture ce soir','les exercices demain','le dessin après la classe']],
    ['choisir','choisir',['un livre à la bibliothèque','un cadeau pour la fête','une chanson pour le spectacle','un fruit au marché','une couleur pour l’affiche']],
    ['vendre','vendr',['des gâteaux à la fête','des billets de tombola','des fruits au marché','des cartes samedi','des fleurs pour l’école']],
    ['prendre','prendr',['le bus de sept heures','une photo du spectacle','le petit déjeuner tôt','la route de Curepipe','un parapluie demain']],
    ['venir','viendr',['à la fête samedi','à l’école à vélo','au match dimanche','avec la classe au musée','à la maison après le match']],
    ['voir','verr',['un film samedi','le spectacle vendredi','les dauphins à Tamarin','la mer pendant les vacances','le résultat demain']],
    ['faire','fer',['du sport mercredi','un gâteau dimanche','les devoirs ce soir','un exposé vendredi','une sortie avec la classe']],
    ['être','ser',['à l’heure demain','en vacances lundi','à la plage dimanche','en classe à huit heures','au marché samedi']],
    ['avoir','aur',['une bonne note','un nouveau cahier','du temps libre dimanche','une surprise demain','des invités samedi']],
    ['aller','ir',['à Rodrigues en décembre','au musée avec la classe','à la bibliothèque demain','chez le dentiste lundi','à la plage dimanche']],
    ['pouvoir','pourr',['venir à la fête','jouer après les devoirs','se reposer dimanche','choisir une activité','aider à la maison']],
    ['vouloir','voudr',['visiter le musée','revoir ce film','goûter ce gâteau','apprendre la guitare','participer au concours']],
    ['devoir','devr',['réviser ce soir','se lever tôt demain','ranger la classe','rendre le livre lundi','finir le projet vendredi']]
  ];
  future.forEach(([verb, stem, comps], vi) => people.forEach((person, pi) => comps.forEach((comp, ci) => {
    const form = stem + futureEnds[pi];
    add('g6fr-futur', ['prendre','venir','voir','faire','être','avoir','aller','pouvoir','vouloir','devoir'].includes(verb) ? 'irreguliers' : 'formation', 1 + ((vi + pi + ci) % 4), `Complète : « ${subj(person, form)}___ ${fitComp(comp, pi)}. » (${verb}, futur simple)`, opts(form, futureEnds.map(e => stem + e)), form,
      'Le futur simple utilise le radical du verbe et la terminaison qui correspond au sujet.', `Au futur simple, on écrit <b>${subj(person, form)}${form}</b>. Le radical de « ${verb} » est suivi de la bonne terminaison.`);
  })));

  // Conditional: 12 verbs × 6 people × 5 completions = 360.
  const futComps = Object.fromEntries(future.map(([v, , c]) => [v, c]));
  const conditional = [['parler','parler'],['finir','finir'],['choisir','choisir'],['prendre','prendr'],['venir','viendr'],['faire','fer'],['être','ser'],['avoir','aur'],['aller','ir'],['pouvoir','pourr'],['vouloir','voudr'],['devoir','devr']];
  conditional.forEach(([verb, stem], vi) => people.forEach((person, pi) => futComps[verb].forEach((comp, ci) => {
    const form = stem + condEnds[pi];
    add('g6fr-conditionnel', ['être','avoir','aller','pouvoir','vouloir','devoir','prendre','venir','faire'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + pi + ci) % 3), `Complète la phrase polie ou imaginaire : « ${subj(person, form)}___ ${fitComp(comp, pi)} si c’était possible. » (${verb}, conditionnel)`, opts(form, condEnds.map(e => stem + e)), form,
      'Le conditionnel exprime souvent un souhait, une possibilité ou une demande polie.', `La forme correcte est <b>${subj(person, form)}${form}</b>. Ici, le conditionnel montre que l’action dépend d’une condition.`);
  })));

  // Plus-que-parfait: 12 verbs × 6 people × 5 contexts = 360.
  const pqp = [
    ['manger','mangé','le goûter'],['jouer','joué','deux parties'],['finir','fini','les exercices'],['choisir','choisi','un livre'],
    ['prendre','pris','les affaires de sport'],['voir','vu','la consigne au tableau'],['faire','fait','le travail demandé'],['dire','dit','la réponse'],
    ['lire','lu','deux chapitres'],['mettre','mis','les cahiers dans le sac'],['écrire','écrit','trois phrases'],['vendre','vendu','tous les billets']
  ];
  const pqpContexts = ['depuis longtemps','depuis dix minutes','sans perdre de temps','avant tout le monde','bien avant la fin'];
  const imperfectAvoir = ['avais','avais','avait','avions','aviez','avaient'];
  pqp.forEach(([verb, part, obj], vi) => people.forEach((person, pi) => pqpContexts.forEach((context, ci) => {
    const helper = imperfectAvoir[pi];
    add('g6fr-pqp', vi % 3 ? 'formation' : 'concordance', 2 + ((vi + pi + ci) % 3), `Complète : « Quand la cloche a sonné, ${subj(person, helper)}___ déjà ${part} ${obj} ${context}. » (${verb}, plus-que-parfait)`, opts(helper, imperfectAvoir), helper,
      'Le plus-que-parfait utilise « avoir » ou « être » à l’imparfait, puis le participe passé.', `On écrit <b>${subj(person, helper)}${helper} ${part}</b>. Cette action s’était passée avant un autre moment du passé.`);
  })));

  // Subjunctive: 10 verbs × 5 triggers × 3 completions = 150.
  const subjonctif = [
    ['parler','parles',['au professeur','plus fort en classe','de ton projet']],
    ['finir','finisses',['tes devoirs ce soir','le travail à temps','ta lecture']],
    ['faire','fasses',['un effort en maths','attention en classe','tes devoirs maintenant']],
    ['aller','ailles',['à la bibliothèque','au lit plus tôt','à l’école à l’heure']],
    ['venir','viennes',['à la réunion','avec nous samedi','à l’école demain']],
    ['être','sois',['à l’heure demain','en classe à huit heures','au rendez-vous']],
    ['avoir','aies',['de bonnes notes','du courage','un peu de patience']],
    ['prendre','prennes',['le bus de sept heures','ton cahier','le temps de relire']],
    ['pouvoir','puisses',['venir à la fête','te reposer','participer au concours']],
    ['savoir','saches',['la leçon par cœur','nager avant les vacances','répondre poliment']]
  ];
  const triggers = ['Il faut que','Il vaut mieux que','Le professeur veut que','Je souhaite que','Il est nécessaire que'];
  subjonctif.forEach(([verb, form, comps], vi) => triggers.forEach((trigger, ti) => comps.forEach((comp, ci) => {
    add('g6fr-subjunctif', ['faire','aller','venir','être','avoir','pouvoir','savoir'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ti + ci) % 3), `Complète : « ${trigger} tu ___ ${comp}. » (${verb}, subjonctif)`, opts(form, subjonctif.map(v => v[1])), form,
      'Après cette expression, choisis la forme « tu » au subjonctif.', `Après « ${trigger} », on utilise le subjonctif. La forme attendue de « ${verb} » pour « tu » est <b>${form}</b>.`);
  })));

  // Subordinate clauses and connectors: 6 connectors × 5 real sentences = 30.
  // « parce que »/« puisque » and « lorsque »/« si » can both fit some frames,
  // so each question\'s options exclude the connector\'s rival.
  const connect = [
    ['parce que','la cause','puisque',[
      'Nous sommes restés à la maison ___ la pluie était trop forte.',
      'Le match a été annulé ___ le terrain était mouillé.',
      'Sara est contente ___ son équipe a gagné.',
      'Les élèves révisent ___ les examens approchent.',
      'Tom met un pull ___ le vent est frais.']],
    ['bien que','une opposition',null,[
      '___ la mer soit agitée, les pêcheurs sortent du port.',
      '___ le devoir soit difficile, Mia ne se décourage pas.',
      '___ la route soit longue, nous continuons à marcher.',
      '___ le temps soit beau, la mer reste froide.',
      '___ les élèves aient sommeil, la leçon continue.']],
    ['lorsque','le moment','si',[
      '___ la cloche sonne, les élèves rentrent en classe.',
      '___ la nuit tombe, les rues s’allument.',
      '___ le bus arrive, tout le monde monte vite.',
      '___ les vacances commencent, la famille part à Rodrigues.',
      '___ la pluie s’arrête, les enfants sortent jouer.']],
    ['si','une condition','lorsque',[
      '___ tu révises régulièrement, tu réussiras l’examen.',
      '___ le temps est beau, nous irons à la plage.',
      '___ vous finissez tôt, vous pourrez jouer dehors.',
      '___ la mer est calme, le bateau partira à l’heure.',
      '___ tu manges équilibré, tu resteras en bonne santé.']],
    ['afin que','le but',null,[
      'Le professeur explique lentement ___ tous les élèves comprennent.',
      'Maman parle doucement ___ le bébé reste endormi.',
      'Nous rangeons la classe ___ la salle reste propre.',
      'Le guide répète la consigne ___ personne ne se perde.',
      'Papa se lève tôt ___ la famille parte à l’heure.']],
    ['puisque','une justification','parce que',[
      '___ tu connais le chemin, passe devant.',
      '___ la bibliothèque est ouverte, allons rendre les livres.',
      '___ vous êtes prêts, nous pouvons commencer.',
      '___ le gâteau est fini, partageons les fruits.',
      '___ tu as fini tes devoirs, tu peux aller jouer.']]
  ];
  const connectWords = connect.map(x => x[0]);
  const clausesOf = (word, sentence) => {
    const [before, after] = sentence.replace(/\.$/, '').split('___');
    if (before.trim()) return { main: before.trim(), subordinate: word + ' ' + after.trim() };
    const comma = after.indexOf(',');
    return { main: after.slice(comma + 1).trim(), subordinate: word + ' ' + after.slice(0, comma).trim() };
  };
  const allClauses = connect.flatMap(([word, role, rival, sentences]) => sentences.map(sentence => clausesOf(word, sentence)));
  // Keep all 150 existing IDs: five distinct reading/grammar tasks per sentence,
  // rather than dropping IDs that would remain unchanged in the live database.
  connect.forEach(([word, role, rival, sentences], wi) => sentences.forEach((sentence, ci) => {
    const full = sentence.replace('___', word);
    const clauses = clausesOf(word, sentence);
    const relation = connect.filter(x => x[0] !== rival).map(x => x[1]);
    const tasks = [
      [`Quel connecteur convient pour exprimer ${role} : « ${sentence} »`, word, connectWords.filter(w => w !== rival), 'Observe le lien logique entre les deux propositions.', `Le connecteur « ${word} » exprime ${role}.`],
      [`Quel lien logique « ${word} » exprime-t-il dans : « ${full} » ?`, role, relation, 'Cherche si la proposition indique une cause, une opposition, un moment, une condition ou un but.', `Dans cette phrase, « ${word} » exprime ${role}.`],
      [`Quel connecteur relie les deux propositions dans : « ${full} » ?`, word, connectWords, 'Repère le mot ou le groupe de mots qui introduit la proposition subordonnée.', `Le connecteur est « ${word} ». Il introduit « ${clauses.subordinate} ».`],
      [`Quelle est la proposition subordonnée introduite par « ${word} » dans : « ${full} » ?`, clauses.subordinate, [clauses.main, ...allClauses.map(c => c.subordinate)], 'La proposition subordonnée commence ici par le connecteur indiqué.', `La proposition subordonnée est « ${clauses.subordinate} ». Elle dépend de la proposition principale.`],
      [`Quelle est la proposition principale dans : « ${full} » ?`, clauses.main, [clauses.subordinate, ...allClauses.map(c => c.main)], 'Cherche la proposition qui ne commence pas par le connecteur de subordination.', `La proposition principale est « ${clauses.main} ». L’autre proposition apporte une précision.`]
    ];
    tasks.forEach(([question, answer, alternatives, hint, explanation], ti) => {
      add('g6fr-subordonnees', word === 'si' ? 'conjonctions' : 'analyse', 2 + ((wi + ci + ti) % 3), question, opts(answer, alternatives), answer, hint, explanation);
    });
  }));
})();
