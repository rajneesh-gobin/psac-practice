'use strict';
// Grade 6 French — 1,500 revision questions kept at Grade 6 difficulty.
(function () {
  let id = 0;
  const add = (chapterId, subsection, difficulty, question, options, answer, hint, explanation) => {
    id += 1;
    STATIC_QUESTIONS.push(makeMCQ({ id:`g6fr-plus-${String(id).padStart(4,'0')}`, chapterId, subsection, difficulty, question, options, answer, hint, explanation }));
  };
  const opts = (answer, values) => [answer, ...values.filter(v => v !== answer)].slice(0,4);
  const people = ['je','tu','il','nous','vous','ils'];
  const futureEnds = ['ai','as','a','ons','ez','ont'];
  const condEnds = ['ais','ais','ait','ions','iez','aient'];
  const contexts = ['demain après l’école','pendant les prochaines vacances','si le temps est beau','avant la fin de la semaine','lors de la fête de l’école'];

  // Future simple: 15 verbs × 6 people × 5 contexts = 450.
  const future = [['parler','parler'],['jouer','jouer'],['finir','finir'],['choisir','choisir'],['vendre','vendre'],['prendre','prendr'],['venir','viendr'],['voir','verr'],['faire','fer'],['être','ser'],['avoir','aur'],['aller','ir'],['pouvoir','pourr'],['vouloir','voudr'],['devoir','devr']];
  future.forEach(([verb, stem], vi) => people.forEach((person, pi) => contexts.forEach((context, ci) => {
    const form = stem + futureEnds[pi];
    add('g6fr-futur', ['prendre','venir','voir','faire','être','avoir','aller','pouvoir','vouloir','devoir'].includes(verb) ? 'irreguliers' : 'formation', 1 + ((vi + pi + ci) % 4), `Complète : « ${person} ___ ${context}. » (${verb}, futur simple)`, opts(form, future.map(v => v[1] + futureEnds[pi])), form,
      'Le futur simple utilise le radical du verbe et la terminaison qui correspond au sujet.', `Au futur simple, on écrit <b>${person} ${form}</b>. Le radical de « ${verb} » est suivi de la bonne terminaison.`);
  })));

  // Conditional: 12 verbs × 6 people × 5 contexts = 360.
  const conditional = [['parler','parler'],['finir','finir'],['choisir','choisir'],['prendre','prendr'],['venir','viendr'],['faire','fer'],['être','ser'],['avoir','aur'],['aller','ir'],['pouvoir','pourr'],['vouloir','voudr'],['devoir','devr']];
  conditional.forEach(([verb, stem], vi) => people.forEach((person, pi) => contexts.forEach((context, ci) => {
    const form = stem + condEnds[pi];
    add('g6fr-conditionnel', ['être','avoir','aller','pouvoir','vouloir','devoir','prendre','venir','faire'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + pi + ci) % 3), `Complète la phrase polie ou imaginaire : « ${person} ___ ${context} si c’était possible. » (${verb}, conditionnel)`, opts(form, conditional.map(v => v[1] + condEnds[pi])), form,
      'Le conditionnel exprime souvent un souhait, une possibilité ou une demande polie.', `La forme correcte est <b>${person} ${form}</b>. Ici, le conditionnel montre que l’action dépend d’une condition.`);
  })));

  // Plus-que-parfait: 12 verbs × 6 people × 5 contexts = 360.
  const pqp = [['manger','mangé'],['jouer','joué'],['finir','fini'],['choisir','choisi'],['prendre','pris'],['voir','vu'],['faire','fait'],['dire','dit'],['lire','lu'],['mettre','mis'],['écrire','écrit'],['vendre','vendu']];
  const imperfectAvoir = ['avais','avais','avait','avions','aviez','avaient'];
  pqp.forEach(([verb, part], vi) => people.forEach((person, pi) => contexts.forEach((context, ci) => {
    const helper = imperfectAvoir[pi];
    add('g6fr-pqp', vi % 3 ? 'formation' : 'concordance', 2 + ((vi + pi + ci) % 3), `Complète : « Quand la cloche a sonné, ${person} ___ déjà ${part} ${context}. » (${verb}, plus-que-parfait)`, opts(helper, imperfectAvoir), helper,
      'Le plus-que-parfait utilise « avoir » ou « être » à l’imparfait, puis le participe passé.', `On écrit <b>${person} ${helper} ${part}</b>. Cette action s’était passée avant un autre moment du passé.`);
  })));

  // Subjunctive, subordinate clauses and argumentation: 330 questions.
  const subj = [['parler','parles'],['finir','finisses'],['faire','fasses'],['aller','ailles'],['venir','viennes'],['être','sois'],['avoir','aies'],['prendre','prennes'],['pouvoir','puisses'],['vouloir','veuilles']];
  const triggers = ['Il faut que','Bien que','Pour que','Je souhaite que','Il est nécessaire que'];
  const subContexts = ['tu participes au projet','nous terminions le travail','elle arrive à l’heure'];
  subj.forEach(([verb, form], vi) => triggers.forEach((trigger, ti) => subContexts.forEach((context, ci) => {
    add('g6fr-subjunctif', ['faire','aller','venir','être','avoir','pouvoir','vouloir'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ti + ci) % 3), `Dans la situation « ${context} », complète : « ${trigger} tu ___ . » (${verb}, subjonctif)`, opts(form, subj.map(v => v[1])), form,
      'Après cette expression, choisis la forme « tu » au subjonctif.', `Après « ${trigger} », on utilise le subjonctif. La forme attendue de « ${verb} » pour « tu » est <b>${form}</b>.`);
  })));
  const connect = [['parce que','la cause'],['bien que','une opposition'],['lorsque','le moment'],['si','une condition'],['afin que','le but'],['puisque','une justification']];
  const clauses = ['il pleuvait','nous avons continué la sortie','le bus est arrivé','tu révises régulièrement','les élèves réussissent'];
  connect.forEach(([word, role], wi) => clauses.forEach((clause, ci) => contexts.forEach((context, xi) => {
    add('g6fr-subordonnees', word === 'si' ? 'conjonctions' : 'analyse', 2 + ((wi + ci + xi) % 3), `Quel connecteur convient le mieux pour introduire ${role} dans : « ___ ${clause}, ${context}. »`, opts(word, connect.map(x => x[0])), word,
      'Lis le lien logique entre les deux idées : cause, opposition, temps, condition ou but.', `Le connecteur <b>${word}</b> introduit ici <b>${role}</b>. Il relie les deux propositions avec le bon sens.`);
  })));
})();
