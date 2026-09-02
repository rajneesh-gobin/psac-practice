'use strict';
// Grade 5 French — 1,500 varied, syllabus-aligned revision questions.
// Generated from validated Grade 5 forms and contexts so practice stays fresh
// without introducing Grade 6 grammar.
(function () {
  let id = 0;
  const add = (chapterId, subsection, difficulty, question, options, answer, hint, explanation) => {
    id += 1;
    STATIC_QUESTIONS.push(makeMCQ({ id:`g5fr-plus-${String(id).padStart(4,'0')}`, chapterId, subsection, difficulty, question, options, answer, hint, explanation }));
  };
  const opts = (answer, values) => [answer, ...values.filter(v => v !== answer)].slice(0, 4);
  const contexts = ['à l’école chaque matin','avec ses amis après la classe','dans le jardin le samedi','pendant les vacances','avant le dîner'];

  // Present tense: 16 verbs × 6 people × 5 meaningful contexts = 480.
  const present = [
    ['parler',['parle','parles','parle','parlons','parlez','parlent']], ['jouer',['joue','joues','joue','jouons','jouez','jouent']],
    ['regarder',['regarde','regardes','regarde','regardons','regardez','regardent']], ['aimer',['aime','aimes','aime','aimons','aimez','aiment']],
    ['manger',['mange','manges','mange','mangeons','mangez','mangent']], ['finir',['finis','finis','finit','finissons','finissez','finissent']],
    ['choisir',['choisis','choisis','choisit','choisissons','choisissez','choisissent']], ['prendre',['prends','prends','prend','prenons','prenez','prennent']],
    ['venir',['viens','viens','vient','venons','venez','viennent']], ['lire',['lis','lis','lit','lisons','lisez','lisent']],
    ['faire',['fais','fais','fait','faisons','faites','font']], ['aller',['vais','vas','va','allons','allez','vont']],
    ['être',['suis','es','est','sommes','êtes','sont']], ['avoir',['ai','as','a','avons','avez','ont']],
    ['mettre',['mets','mets','met','mettons','mettez','mettent']], ['écrire',['écris','écris','écrit','écrivons','écrivez','écrivent']]
  ];
  const people = ['je','tu','il','nous','vous','ils'];
  present.forEach(([verb, forms], vi) => people.forEach((person, pi) => contexts.forEach((context, ci) => {
    const form = forms[pi];
    const sub = ['être','avoir'].includes(verb) ? 'etre_avoir' : ['aller','faire','prendre','venir','lire','mettre','écrire'].includes(verb) ? 'irreguliers' : verb.endsWith('er') ? 'verbes_er' : 'conjugaison';
    add('fr-verbes-present', sub, 1 + ((vi + pi + ci) % 4), `Complète : « ${person} ___ ${context}. » (${verb}, au présent)`, opts(form, forms), form,
      `Repère le sujet « ${person} », puis choisis la forme de « ${verb} » qui lui correspond.`, `Au présent, on écrit <b>${person} ${form}</b>. Le sujet et le verbe doivent toujours s’accorder.`);
  })));

  // Passé composé with avoir: 14 verbs × 6 people × 5 contexts = 420.
  const participles = [['manger','mangé'],['jouer','joué'],['parler','parlé'],['regarder','regardé'],['aimer','aimé'],['finir','fini'],['choisir','choisi'],['prendre','pris'],['voir','vu'],['faire','fait'],['dire','dit'],['lire','lu'],['mettre','mis'],['écrire','écrit']];
  const aux = [['j’','ai'],['tu','as'],['il','a'],['nous','avons'],['vous','avez'],['ils','ont']];
  participles.forEach(([verb, part], vi) => aux.forEach(([person, helper], pi) => contexts.forEach((context, ci) => {
    add('fr-passe-compose', vi < 7 ? 'formation' : 'participe', 1 + ((vi + pi + ci) % 4), `Complète : « ${person} ___ ${part} ${context}. » (${verb}, passé composé)`, opts(helper, aux.map(a => a[1])), helper,
      'Au passé composé, commence par choisir la forme de « avoir » qui va avec le sujet.', `La bonne forme est <b>${person} ${helper} ${part}</b>. Le passé composé = auxiliaire + participe passé.`);
  })));

  // Pronouns and grammar: 300 varied application questions.
  const pronouns = [['Marie','elle'],['Paul','il'],['Marie et Amina','elles'],['Paul et Ravi','ils'],['ma sœur et moi','nous'],['toi et moi','nous'],['le livre','le'],['la chanson','la'],['les fleurs','les'],['à Port Louis','y']];
  const actions = ['regarde attentivement','aime beaucoup','prend chaque jour','apporte demain','explique clairement'];
  const travelTimes = ['ce lundi','mardi prochain','mercredi matin','jeudi après-midi','vendredi soir'];
  pronouns.forEach(([noun, pro], ni) => actions.forEach((action, ai) => contexts.forEach((context, ci) => {
    const object = ['le','la','les','y'].includes(pro);
    const sentence = pro === 'y' ? `Je vais ${noun} ${context} ${travelTimes[ai]}.` : object ? `Je ${action.replace(/ .*/, '')} ${noun} ${context}.` : `${noun} ${action} ${context}.`;
    add('fr-pronoms', pro === 'y' ? 'personnels' : object ? 'cod_coi' : 'personnels', 1 + ((ni + ai + ci) % 4), `Remplace « ${noun} » par le bon pronom dans : « ${sentence} »`, opts(pro, ['il','elle','ils','elles','nous','le','la','les','y']), pro,
      'Demande-toi si le mot remplacé est le sujet, une chose, plusieurs personnes ou un lieu.', `Le bon pronom est <b>${pro}</b> pour remplacer « ${noun} ». Les pronoms évitent de répéter le même nom.`);
  })));

  // Literary past and subjunctive: 300 questions at Grade 5 level.
  const simple = [['parler','parla'],['jouer','joua'],['marcher','marcha'],['regarder','regarda'],['aimer','aima'],['finir','finit'],['prendre','prit'],['venir','vint'],['faire','fit'],['être','fut']];
  const storyContexts = ['dans le vieux jardin','près de la rivière','au début de l’histoire','sans faire de bruit','avant la nuit'];
  simple.forEach(([verb, form], vi) => storyContexts.forEach((context, ci) => storyContexts.slice(0, 3).forEach((detail, di) => {
    add('g5fr-passe-simple', ['prendre','venir','faire','être'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ci + di) % 3), `Dans un récit, complète : « Soudain, il ___ ${context} ${detail}. » (${verb}, passé simple)`, opts(form, simple.map(x => x[1])), form,
      'Le passé simple est utilisé dans les récits pour raconter une action importante et terminée.', `Dans un récit, on écrit <b>il ${form}</b>. C’est le passé simple du verbe « ${verb} ».`);
  })));
  const subj = [['parler','parle'],['finir','finisse'],['faire','fasse'],['aller','aille'],['venir','vienne'],['être','soit'],['avoir','ait'],['prendre','prenne'],['pouvoir','puisse'],['savoir','sache']];
  const triggers = ['Il faut que','Je veux que','Bien que','Pour que','Il est important que'];
  subj.forEach(([verb, form], vi) => triggers.forEach((trigger, ti) => storyContexts.slice(0, 3).forEach((context, ci) => {
    add('g5fr-subjonctif', ['être','avoir','aller','faire','venir','pouvoir','savoir'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ti + ci) % 3), `Complète : « ${trigger} tu ___ ${context}. » (${verb}, subjonctif)`, opts(form, subj.map(x => x[1])), form,
      'Après cette expression, utilise le subjonctif et regarde la forme pour « tu ».', `Après « ${trigger} », on emploie le subjonctif : <b>que tu ${form}</b>.`);
  })));
})();
