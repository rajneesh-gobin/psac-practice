'use strict';
// Grade 5 French — varied, syllabus-aligned revision questions.
// Generated from validated Grade 5 forms with per-verb completions so every
// sentence reads as real French (a verb like « aimer » always gets an object,
// « être » always gets a place). Practice stays fresh without introducing
// Grade 6 grammar.
(function () {
  let id = 0;
  const add = (chapterId, subsection, difficulty, question, options, answer, hint, explanation) => {
    id += 1;
    STATIC_QUESTIONS.push(makeMCQ({ id:`g5fr-plus-${String(id).padStart(4,'0')}`, chapterId, subsection, difficulty, question, options, answer, hint, explanation }));
  };
  const opts = (answer, values) => {
    const u = [answer];
    for (const v of values) if (!u.includes(v)) u.push(v);
    return u.slice(0, 4);
  };
  const subjText = (person, form) => person === 'je' && /^[aàâeéèêiîouhy]/i.test(form) ? 'j’' : `${person} `;

  // Present tense: 16 verbs × 6 people × 5 per-verb completions = 480.
  const present = [
    ['parler',['parle','parles','parle','parlons','parlez','parlent'],['français à l’école','doucement en classe','avec le professeur','au téléphone le soir','de la fête avec des amis']],
    ['jouer',['joue','joues','joue','jouons','jouez','jouent'],['au football le samedi','dans le jardin','aux cartes avant le dîner','à la marelle pendant la récréation','avec le petit chien']],
    ['regarder',['regarde','regardes','regarde','regardons','regardez','regardent'],['la télévision le soir','un film le samedi','les oiseaux dans le jardin','le tableau en classe','les étoiles avant de dormir']],
    ['aimer',['aime','aimes','aime','aimons','aimez','aiment'],['les mangues bien mûres','la musique mauricienne','les histoires drôles','le chocolat chaud','la mer à Grand Baie']],
    ['manger',['mange','manges','mange','mangeons','mangez','mangent'],['du riz à midi','une pomme après la classe','des légumes au dîner','du pain le matin','un gâteau à la fête']],
    ['finir',['finis','finis','finit','finissons','finissez','finissent'],['les devoirs avant le dîner','le repas à midi','la lecture avant de dormir','le dessin en classe','les exercices de maths']],
    ['choisir',['choisis','choisis','choisit','choisissons','choisissez','choisissent'],['un livre à la bibliothèque','une couleur pour le dessin','un fruit au marché','une chanson pour la fête','un cadeau pour la fête']],
    ['prendre',['prends','prends','prend','prenons','prenez','prennent'],['le bus le matin','un cahier dans le sac','le petit déjeuner à sept heures','un parapluie avant de sortir','la route de l’école']],
    ['venir',['viens','viens','vient','venons','venez','viennent'],['à l’école à pied','au marché le samedi','à la fête dimanche','de Port Louis en bus','à la maison après la classe']],
    ['lire',['lis','lis','lit','lisons','lisez','lisent'],['un livre le soir','une histoire à la bibliothèque','une bande dessinée','la consigne en classe','une carte postale']],
    ['faire',['fais','fais','fait','faisons','faites','font'],['les devoirs après la classe','un gâteau le dimanche','du sport le mercredi','un dessin en classe','une promenade le soir']],
    ['aller',['vais','vas','va','allons','allez','vont'],['à l’école chaque matin','au marché le samedi','à la plage pendant les vacances','à la bibliothèque après la classe','à la fête dimanche']],
    ['être',['suis','es','est','sommes','êtes','sont'],['à l’école chaque matin','dans le jardin le samedi','à la maison le soir','en classe à huit heures','à la plage pendant les vacances']],
    ['avoir',['ai','as','a','avons','avez','ont'],['un chien à la maison','deux cahiers dans le sac','un vélo rouge','beaucoup d’amis à l’école','une belle mangue']],
    ['mettre',['mets','mets','met','mettons','mettez','mettent'],['un pull le matin','les cahiers dans le sac','la table pour le dîner','les chaussures avant de sortir','un chapeau au soleil']],
    ['écrire',['écris','écris','écrit','écrivons','écrivez','écrivent'],['une lettre le dimanche','la date au tableau','une carte postale pendant les vacances','les réponses dans le cahier','une petite histoire']]
  ];
  const people = ['je','tu','il','nous','vous','ils'];
  present.forEach(([verb, forms, completions], vi) => people.forEach((person, pi) => completions.forEach((completion, ci) => {
    const form = forms[pi];
    const sub = ['être','avoir'].includes(verb) ? 'etre_avoir' : ['aller','faire','prendre','venir','lire','mettre','écrire'].includes(verb) ? 'irreguliers' : verb.endsWith('er') ? 'verbes_er' : 'conjugaison';
    add('fr-verbes-present', sub, 1 + ((vi + pi + ci) % 4), `Complète : « ${subjText(person, form)}___ ${completion}. » (${verb}, au présent)`, opts(form, forms), form,
      `Repère le sujet « ${person} », puis choisis la forme de « ${verb} » qui lui correspond.`, `Au présent, on écrit <b>${subjText(person, form)}${form}</b>. Le sujet et le verbe doivent toujours s’accorder.`);
  })));

  // Passé composé with avoir: 14 verbs × 6 people × 5 per-verb completions = 420.
  const participles = [
    ['manger','mangé',['une pomme hier','du riz à midi','un gâteau à la fête','des letchis dimanche','une glace à la plage']],
    ['jouer','joué',['au football hier','aux dominos samedi','dans le jardin ce matin','aux cartes avec des amis','à la marelle à la récréation']],
    ['parler','parlé',['au professeur ce matin','de la sortie scolaire','au téléphone hier soir','français toute la journée','de la fête avec des amis']],
    ['regarder','regardé',['un film hier soir','les photos des vacances','un match à la télévision','le défilé du 12 mars','les vagues à la plage']],
    ['aimer','aimé',['la visite du musée','le gâteau d’anniversaire','cette chanson','le voyage à Rodrigues','la fête de l’école']],
    ['finir','fini',['les devoirs avant le dîner','le repas à midi','la lecture hier soir','le dessin en classe','les exercices de maths']],
    ['choisir','choisi',['un livre à la bibliothèque','une couleur pour le dessin','un gâteau au marché','une chanson pour le spectacle','un cadeau pour la fête']],
    ['prendre','pris',['le bus ce matin','une photo à la plage','le petit déjeuner à sept heures','un parapluie avant de sortir','la route du village']],
    ['voir','vu',['un arc-en-ciel hier','des dauphins à Tamarin','un beau film samedi','un oiseau rare dans le jardin','le spectacle de l’école']],
    ['faire','fait',['les devoirs hier soir','un gâteau dimanche','du sport mercredi','un dessin en classe','une promenade à la plage']],
    ['dire','dit',['bonjour au professeur','merci à la dame','la réponse en classe','au revoir aux amis','un secret à voix basse']],
    ['lire','lu',['un livre pendant les vacances','une histoire hier soir','la consigne en classe','une bande dessinée dimanche','une carte postale de Rodrigues']],
    ['mettre','mis',['un pull ce matin','la table pour le dîner','les cahiers dans le sac','un chapeau à la plage','les chaussures avant de sortir']],
    ['écrire','écrit',['une lettre hier','la date au tableau','une carte postale pendant les vacances','les réponses dans le cahier','une petite histoire en classe']]
  ];
  const aux = [['j’','ai'],['tu','as'],['il','a'],['nous','avons'],['vous','avez'],['ils','ont']];
  participles.forEach(([verb, part, completions], vi) => aux.forEach(([person, helper], pi) => completions.forEach((completion, ci) => {
    add('fr-passe-compose', vi < 7 ? 'formation' : 'participe', 1 + ((vi + pi + ci) % 4), `Complète : « ${person} ___ ${part} ${completion}. » (${verb}, passé composé)`, opts(helper, aux.map(a => a[1])), helper,
      'Au passé composé, commence par choisir la forme de « avoir » qui va avec le sujet.', `La bonne forme est <b>${person.endsWith('’') ? person + helper : person + ' ' + helper} ${part}</b>. Le passé composé = auxiliaire + participe passé.`);
  })));

  // Pronouns: 10 nouns × 5 actions × 5 contexts = 250 varied application questions.
  const pronouns = [['Marie','elle'],['Paul','il'],['Marie et Amina','elles'],['Paul et Ravi','ils'],['Ma sœur et moi','nous'],['Toi et moi','nous'],['le livre','le'],['la chanson','la'],['les fleurs','les'],['à Port Louis','y']];
  const subjectActions = [
    { sg:'regarde le tableau', pl:'regardent le tableau', nous:'regardons le tableau', je:'Je regarde' },
    { sg:'aime la musique', pl:'aiment la musique', nous:'aimons la musique', je:'J’aime' },
    { sg:'prend le bus', pl:'prennent le bus', nous:'prenons le bus', je:'Je prends' },
    { sg:'apporte un gâteau', pl:'apportent un gâteau', nous:'apportons un gâteau', je:'J’apporte' },
    { sg:'explique la leçon', pl:'expliquent la leçon', nous:'expliquons la leçon', je:'J’explique' }
  ];
  const proContexts = ['à l’école','le samedi','après la classe','pendant les vacances','le soir'];
  const travelExtras = ['en bus','en voiture','avec la classe','pour le marché','pour la fête'];
  const travelTimes = ['ce lundi','mardi prochain','mercredi matin','jeudi après-midi','vendredi soir'];
  const objectVerbs = {
    'le livre':['Je lis','J’aime','Je prends','J’apporte','Je choisis'],
    'la chanson':['J’écoute','J’aime','Je chante','J’apprends','Je choisis'],
    'les fleurs':['Je regarde','J’aime','Je cueille','J’apporte','J’arrose']
  };
  pronouns.forEach(([noun, pro], ni) => subjectActions.forEach((action, ai) => proContexts.forEach((context, ci) => {
    const object = ['le','la','les'].includes(pro);
    const sentence = pro === 'y' ? `Je vais ${noun} ${travelExtras[ai]} ${travelTimes[ci]}.`
      : object ? `${objectVerbs[noun][ai]} ${noun} ${context}.`
      : `${noun} ${pro === 'nous' ? action.nous : ['ils','elles'].includes(pro) ? action.pl : action.sg} ${context}.`;
    add('fr-pronoms', pro === 'y' ? 'personnels' : object ? 'cod_coi' : 'personnels', 1 + ((ni + ai + ci) % 4), `Remplace « ${noun} » par le bon pronom dans : « ${sentence} »`, opts(pro, ['il','elle','ils','elles','nous','le','la','les','y']), pro,
      'Demande-toi si le mot remplacé est le sujet, une chose, plusieurs personnes ou un lieu.', `Le bon pronom est <b>${pro}</b> pour remplacer « ${noun} ». Les pronoms évitent de répéter le même nom.`);
  })));

  // Literary past and subjunctive: 300 questions at Grade 5 level.
  const simple = [
    ['parler','parla',['au vieux jardinier','d’une voix douce','de son long voyage','aux enfants du village','avec le pêcheur']],
    ['jouer','joua',['près de la rivière','avec le chien du voisin','sous le grand arbre','dans la cour du château','au bord de la mer']],
    ['marcher','marcha',['vers le vieux pont','le long de la rivière','jusqu’au village','dans la forêt sombre','sur le chemin de pierres']],
    ['regarder','regarda',['le ciel étoilé','la mer au loin','le vieux portail','la carte au trésor','les lumières du village']],
    ['aimer','aima',['ce jardin secret','ce lieu tranquille','cette histoire étrange','ce petit village','cette musique douce']],
    ['finir','finit',['son long voyage','la lecture du message','le travail du jour','son repas en silence','la traversée du pont']],
    ['prendre','prit',['le chemin du village','la vieille clé dorée','son sac de voyage','la lanterne du grenier','la main de sa sœur']],
    ['venir','vint',['frapper à la porte','jusqu’à la rivière','s’asseoir près du feu','chercher de l’aide','saluer le vieux pêcheur']],
    ['faire','fit',['un grand feu','un pas en arrière','signe de la main','le tour du jardin','une découverte étonnante']],
    ['être','fut',['devant le vieux château','au milieu de la forêt','seul sur le chemin','près de la cascade','face à la mer']]
  ];
  const openers = ['Soudain','Ce jour-là','Alors'];
  simple.forEach(([verb, form, completions], vi) => completions.forEach((completion, ci) => openers.forEach((opener, di) => {
    add('g5fr-passe-simple', ['prendre','venir','faire','être'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ci + di) % 3), `Dans un récit, complète : « ${opener}, il ___ ${completion}. » (${verb}, passé simple)`, opts(form, simple.map(x => x[1])), form,
      'Le passé simple est utilisé dans les récits pour raconter une action importante et terminée.', `Dans un récit, on écrit <b>il ${form}</b>. C’est le passé simple du verbe « ${verb} ».`);
  })));
  const subj = [
    ['parler','parle',['plus fort en classe','avec le professeur','poliment à tout le monde']],
    ['finir','finisse',['les devoirs ce soir','le repas à midi','la lecture avant de dormir']],
    ['faire','fasse',['attention en classe','du sport le mercredi','un effort en maths']],
    ['aller','aille',['à l’école à l’heure','chez le docteur demain','au lit avant neuf heures']],
    ['venir','vienne',['à la fête samedi','à l’école demain','au marché avec nous']],
    ['être','soit',['à l’heure le matin','sage en classe','prête avant huit heures']],
    ['avoir','ait',['de bonnes notes','du courage demain','un peu de patience']],
    ['prendre','prenne',['le bus de sept heures','un parapluie demain','le temps de relire']],
    ['pouvoir','puisse',['venir à la fête','jouer après les devoirs','se reposer un peu']],
    ['savoir','sache',['la leçon par cœur','compter jusqu’à cent','nager avant les vacances']]
  ];
  const triggers = ['Il faut que','Je veux que','Il vaut mieux que','Maman souhaite que','Il est important que'];
  subj.forEach(([verb, form, completions], vi) => triggers.forEach((trigger, ti) => completions.forEach((completion, ci) => {
    add('g5fr-subjonctif', ['être','avoir','aller','faire','venir','pouvoir','savoir'].includes(verb) ? 'irreguliers' : 'formation', 2 + ((vi + ti + ci) % 3), `Complète : « ${trigger} Léa ___ ${completion}. » (${verb}, subjonctif)`, opts(form, subj.map(x => x[1])), form,
      'Après cette expression, on emploie le subjonctif. Cherche la forme qui va avec « Léa » (elle).', `On écrit : « ${trigger} Léa <b>${form}</b> ${completion}. » C’est le subjonctif du verbe « ${verb} ».`);
  })));
})();
