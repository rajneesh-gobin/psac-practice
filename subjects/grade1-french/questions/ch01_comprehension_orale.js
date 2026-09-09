'use strict';
// Grade 1 French — Compréhension orale
// IDs: g1fr-co-001 … g1fr-co-075

(function () {

STATIC_QUESTIONS.push(

  // ── discrimination_sons ──────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-co-001', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/m/</b> ?',
    options:['maison','soleil','chat','pain'],
    answer:'maison',
    hint:'Le son /m/ est le son de "maman". (The /m/ sound is like "mummy".)',
    explanation:'<b>Maison</b> commence par le son /m/ — comme <i>maman, mouton, mer</i>. Bravo !' }),

  makeMCQ({ id:'g1fr-co-002', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/s/</b> ?',
    options:['soleil','ballon','chien','poule'],
    answer:'soleil',
    hint:'Le son /s/ est le son de "serpent". (The /s/ sound is like "serpent".)',
    explanation:'<b>Soleil</b> commence par le son /s/ — comme <i>sac, sucre, soupe</i>. Super !' }),

  makeMCQ({ id:'g1fr-co-003', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/p/</b> ?',
    options:['papa','lune','fleur','mer'],
    answer:'papa',
    hint:'Le son /p/ est le son de "pain". (The /p/ sound is like "pain".)',
    explanation:'<b>Papa</b> commence par le son /p/ — comme <i>pomme, poule, pied</i>. Excellent !' }),

  makeMCQ({ id:'g1fr-co-004', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/l/</b> ?',
    options:['lapin','cheval','oiseau','table'],
    answer:'lapin',
    hint:'Le son /l/ est le son de "lune". (The /l/ sound is like "moon".)',
    explanation:'<b>Lapin</b> commence par le son /l/ — comme <i>lait, lune, livre</i>. Très bien !' }),

  makeMCQ({ id:'g1fr-co-005', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/b/</b> ?',
    options:['ballon','maison','riz','sel'],
    answer:'ballon',
    hint:'Le son /b/ est le son de "bébé". (The /b/ sound is like "baby".)',
    explanation:'<b>Ballon</b> commence par le son /b/ — comme <i>bateau, bras, bête</i>. Bravo !' }),

  makeMCQ({ id:'g1fr-co-006', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/f/</b> ?',
    options:['fleur','jardin','canard','robe'],
    answer:'fleur',
    hint:'Le son /f/ est le son de "feu". (The /f/ sound is like "fire".)',
    explanation:'<b>Fleur</b> commence par le son /f/ — comme <i>fille, four, forêt</i>. Bien joué !' }),

  makeMCQ({ id:'g1fr-co-007', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/v/</b> ?',
    options:['vache','table','pluie','nuit'],
    answer:'vache',
    hint:'Le son /v/ est le son de "voiture". (The /v/ sound is like "car".)',
    explanation:'<b>Vache</b> commence par le son /v/ — comme <i>vent, verre, ville</i>. Excellent !' }),

  makeMCQ({ id:'g1fr-co-008', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/r/</b> ?',
    options:['rose','lait','boire','fête'],
    answer:'rose',
    hint:'Le son /r/ est le son de "rue". (The /r/ sound is like "road".)',
    explanation:'<b>Rose</b> commence par le son /r/ — comme <i>rue, rat, rivière</i>. Super !' }),

  makeMCQ({ id:'g1fr-co-009', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/n/</b> ?',
    options:['nager','poisson','chat','verre'],
    answer:'nager',
    hint:'Le son /n/ est le son de "nuit". (The /n/ sound is like "night".)',
    explanation:'<b>Nager</b> commence par le son /n/ — comme <i>nuit, nez, nuage</i>. Très bien !' }),

  makeMCQ({ id:'g1fr-co-010', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot commence par le son <b>/d/</b> ?',
    options:['dormir','girafe','mouton','sable'],
    answer:'dormir',
    hint:'Le son /d/ est le son de "dent". (The /d/ sound is like "tooth".)',
    explanation:'<b>Dormir</b> commence par le son /d/ — comme <i>dent, doux, dos</i>. Bravo !' }),

  makeMCQ({ id:'g1fr-co-011', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot finit par le son <b>/a/</b> ?',
    options:['ananas','chien','livre','bol'],
    answer:'ananas',
    hint:'Écoute bien la fin du mot. (Listen carefully to the end of the word.)',
    explanation:'<b>Ananas</b> finit par le son /a/. C\'est un fruit délicieux ! Bien joué !' }),

  makeMCQ({ id:'g1fr-co-012', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'discrimination_sons',
    question:'Quel mot contient le son <b>/ou/</b> ?',
    options:['ours','chat','sel','riz'],
    answer:'ours',
    hint:'Le son /ou/ est dans "mouton" et "boule". (The /ou/ sound is like "oo" in "cool".)',
    explanation:'<b>Ours</b> contient le son /ou/. C\'est un grand animal ! Super !' }),

  // ── comprehension_messages ───────────────────────────────────────────────

  makeMCQ({ id:'g1fr-co-013', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Émile dit : <i>"J\'ai faim !"</i> Qu\'est-ce qu\'il veut ?',
    options:['manger','dormir','jouer','lire'],
    answer:'manger',
    hint:'Avoir faim = vouloir de la nourriture. (Being hungry = wanting food.)',
    explanation:'Quand on dit <b>"j\'ai faim"</b>, on veut <b>manger</b>. C\'est comme "I am hungry" en anglais. Bravo !' }),

  makeMCQ({ id:'g1fr-co-014', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Léa dit : <i>"J\'ai soif !"</i> Qu\'est-ce qu\'elle veut ?',
    options:['boire de l\'eau','manger du pain','jouer dehors','dormir'],
    answer:'boire de l\'eau',
    hint:'Avoir soif = vouloir boire. (Being thirsty = wanting to drink.)',
    explanation:'Quand on dit <b>"j\'ai soif"</b>, on veut <b>boire</b>. Léa veut probablement boire de l\'eau ! Bien joué !' }),

  makeMCQ({ id:'g1fr-co-015', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'La maîtresse dit : <i>"Asseyez-vous !"</i> Que font les élèves ?',
    options:['ils s\'assoient','ils courent','ils mangent','ils chantent'],
    answer:'ils s\'assoient',
    hint:'"Asseyez-vous" = sit down! (It is a command to sit.)',
    explanation:'<b>"Asseyez-vous"</b> veut dire de s\'asseoir. Les élèves obéissent à leur maîtresse. Excellent !' }),

  makeMCQ({ id:'g1fr-co-016', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Tom dit : <i>"Je suis fatigué."</i> De quoi Tom a-t-il besoin ?',
    options:['de dormir','de manger','de jouer','de chanter'],
    answer:'de dormir',
    hint:'Être fatigué = avoir besoin de repos. (Being tired = needing to rest.)',
    explanation:'Quand on est <b>fatigué</b>, on a besoin de <b>dormir</b> et de se reposer. Très bien !' }),

  makeMCQ({ id:'g1fr-co-017', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Maman dit : <i>"Ferme la fenêtre, il fait froid !"</i> Pourquoi ?',
    options:['parce qu\'il fait froid','parce qu\'il fait chaud','parce qu\'il pleut','parce qu\'il fait nuit'],
    answer:'parce qu\'il fait froid',
    hint:'Le message dit pourquoi fermer la fenêtre. (The message says why to close the window.)',
    explanation:'Maman dit de fermer la fenêtre <b>parce qu\'il fait froid</b>. Ça veut dire qu\'il fait froid dehors ! Bravo !' }),

  makeMCQ({ id:'g1fr-co-018', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Papa dit : <i>"Brosse tes dents avant de dormir !"</i> Quand est-ce ?',
    options:['le soir','le matin','l\'après-midi','le midi'],
    answer:'le soir',
    hint:'On dort la nuit. Avant la nuit, c\'est le soir. (We sleep at night. Before night is evening.)',
    explanation:'On brosse ses dents <b>avant de dormir</b>, donc <b>le soir</b>. C\'est important pour avoir de belles dents ! Excellent !' }),

  makeMCQ({ id:'g1fr-co-019', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Le professeur dit : <i>"Ouvrez votre livre à la page 5 !"</i> Que font les élèves ?',
    options:['ils ouvrent leur livre','ils ferment leur livre','ils posent leur livre','ils perdent leur livre'],
    answer:'ils ouvrent leur livre',
    hint:'"Ouvrez" = open! C\'est une instruction. (It is an instruction to open.)',
    explanation:'<b>"Ouvrez votre livre"</b> veut dire d\'ouvrir le livre. Les élèves obéissent. Très bien !' }),

  makeMCQ({ id:'g1fr-co-020', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Zoé dit : <i>"Je suis content !"</i> Comment se sent Zoé ?',
    options:['heureux','triste','en colère','fatigué'],
    answer:'heureux',
    hint:'"Content" veut dire happy en anglais. (Content means happy.)',
    explanation:'"<b>Content</b>" veut dire <b>heureux</b> (happy). Zoé est heureuse ! On dit "content" pour un garçon et "contente" pour une fille. Bravo !' }),

  makeMCQ({ id:'g1fr-co-021', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Marc dit : <i>"Il y a un chien !"</i> Qu\'est-ce que Marc voit ?',
    options:['un chien','un chat','un lapin','un oiseau'],
    answer:'un chien',
    hint:'Marc dit exactement ce qu\'il voit. (Marc says exactly what he sees.)',
    explanation:'Marc dit <b>"un chien"</b>, donc il voit <b>un chien</b>. Un chien est le meilleur ami de l\'homme ! Super !' }),

  makeMCQ({ id:'g1fr-co-022', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'La maîtresse dit : <i>"Écoutez bien !"</i> Que font les élèves ?',
    options:['ils écoutent','ils parlent','ils courent','ils dessinent'],
    answer:'ils écoutent',
    hint:'"Écoutez" = listen! C\'est une instruction. (Listen is the instruction.)',
    explanation:'<b>"Écoutez bien"</b> veut dire d\'écouter avec attention. Les bons élèves écoutent leur maîtresse ! Excellent !' }),

  makeMCQ({ id:'g1fr-co-023', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Mia dit : <i>"Je veux jouer dehors !"</i> Où veut-elle aller ?',
    options:['dehors','dans la cuisine','dans la chambre','à l\'école'],
    answer:'dehors',
    hint:'"Dehors" veut dire outside en anglais. (Dehors means outside.)',
    explanation:'Mia veut jouer <b>dehors</b> — outside ! C\'est agréable de jouer en plein air. Très bien !' }),

  makeMCQ({ id:'g1fr-co-024', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'Papa dit : <i>"Ne touche pas au feu !"</i> Pourquoi dit-il ça ?',
    options:['parce que le feu est dangereux','parce que le feu est beau','parce que le feu est froid','parce que le feu est petit'],
    answer:'parce que le feu est dangereux',
    hint:'Papa dit cela pour nous protéger. (Dad says this to protect us.)',
    explanation:'Papa dit de ne pas toucher le feu parce que <b>le feu est dangereux</b>. Il peut brûler ! On doit toujours faire attention. Bravo !' }),

  makeMCQ({ id:'g1fr-co-025', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'comprehension_messages',
    question:'La maîtresse dit : <i>"Bravo, tu as bien travaillé !"</i> Comment l\'élève a-t-il travaillé ?',
    options:['bien','mal','vite','lentement'],
    answer:'bien',
    hint:'"Bravo" = well done! La maîtresse est contente. (The teacher is pleased.)',
    explanation:'La maîtresse dit <b>"bravo"</b> et <b>"bien travaillé"</b> — l\'élève a fait du bon travail ! C\'est super d\'être félicité. Excellent !' }),

  // ── vocabulaire_oral ─────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-co-026', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel animal fait <b>"miaou"</b> ?',
    options:['le chat','le chien','la vache','le canard'],
    answer:'le chat',
    hint:'Cet animal aime le lait et ronronne. (This animal likes milk and purrs.)',
    explanation:'<b>Le chat</b> fait "miaou". Le chien fait "ouaf", la vache fait "meuh", le canard fait "coin coin". Bravo !' }),

  makeMCQ({ id:'g1fr-co-027', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel animal fait <b>"ouaf ouaf"</b> ?',
    options:['le chien','le chat','le lapin','le poisson'],
    answer:'le chien',
    hint:'Cet animal est le meilleur ami de l\'homme. (This animal is man\'s best friend.)',
    explanation:'<b>Le chien</b> fait "ouaf ouaf". C\'est l\'animal de compagnie le plus populaire ! Super !' }),

  makeMCQ({ id:'g1fr-co-028', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'De quelle couleur est le soleil ?',
    options:['jaune','rouge','bleu','vert'],
    answer:'jaune',
    hint:'Le soleil brille dans le ciel. (The sun shines in the sky.)',
    explanation:'Le soleil est <b>jaune</b> (et parfois orange). Il nous donne de la lumière et de la chaleur. Excellent !' }),

  makeMCQ({ id:'g1fr-co-029', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'De quelle couleur est le ciel par beau temps ?',
    options:['bleu','noir','rouge','vert'],
    answer:'bleu',
    hint:'Regarde en haut quand il fait beau ! (Look up when the weather is nice!)',
    explanation:'Le ciel est <b>bleu</b> quand il fait beau. Quand il pleut, le ciel devient gris. Très bien !' }),

  makeMCQ({ id:'g1fr-co-030', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel fruit est rouge ?',
    options:['la pomme','la banane','le citron','le raisin'],
    answer:'la pomme',
    hint:'Ce fruit est rouge et il grandit sur un arbre. (This fruit is red and grows on a tree.)',
    explanation:'<b>La pomme</b> est souvent rouge. La banane est jaune, le citron est jaune, le raisin peut être vert ou violet. Bravo !' }),

  makeMCQ({ id:'g1fr-co-031', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel fruit est jaune et long ?',
    options:['la banane','l\'orange','la fraise','la mangue'],
    answer:'la banane',
    hint:'Ce fruit est courbé et jaune. (This fruit is curved and yellow.)',
    explanation:'<b>La banane</b> est jaune et longue. Les singes adorent les bananes ! Super !' }),

  makeMCQ({ id:'g1fr-co-032', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel membre de la famille est la maman de ta maman ?',
    options:['la grand-mère','la tante','la sœur','la cousine'],
    answer:'la grand-mère',
    hint:'C\'est la maman de ta maman ou de ton papa. (She is your mum\'s or dad\'s mum.)',
    explanation:'La <b>grand-mère</b> est la maman de ta maman ou de ton papa. On dit aussi "mamie". Excellent !' }),

  makeMCQ({ id:'g1fr-co-033', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quelle partie du corps utilise-t-on pour voir ?',
    options:['les yeux','les oreilles','le nez','la bouche'],
    answer:'les yeux',
    hint:'On ferme cette partie du corps pour dormir. (We close this part of our body to sleep.)',
    explanation:'On utilise <b>les yeux</b> pour voir. Les oreilles pour entendre, le nez pour sentir, la bouche pour parler et manger. Très bien !' }),

  makeMCQ({ id:'g1fr-co-034', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quelle partie du corps utilise-t-on pour entendre ?',
    options:['les oreilles','les yeux','la main','le pied'],
    answer:'les oreilles',
    hint:'Cette partie du corps est de chaque côté de la tête. (This part is on each side of the head.)',
    explanation:'On utilise <b>les oreilles</b> pour entendre les sons et la musique. Bravo !' }),

  makeMCQ({ id:'g1fr-co-035', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Comment dit-on <b>tree</b> en français ?',
    options:['arbre','maison','table','fleur'],
    answer:'arbre',
    hint:'C\'est grand, vert, et il a des branches. (It is tall, green, and has branches.)',
    explanation:'<b>Arbre</b> veut dire tree. Les arbres nous donnent de l\'ombre et de l\'oxygène. Super !' }),

  makeMCQ({ id:'g1fr-co-036', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Comment dit-on <b>water</b> en français ?',
    options:['eau','lait','jus','soupe'],
    answer:'eau',
    hint:'C\'est un liquide qu\'on boit tous les jours. (It is a liquid we drink every day.)',
    explanation:'<b>Eau</b> veut dire water. Il faut boire de l\'eau tous les jours pour rester en bonne santé ! Excellent !' }),

  makeMCQ({ id:'g1fr-co-037', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel est le contraire de <b>grand</b> ?',
    options:['petit','beau','gros','vieux'],
    answer:'petit',
    hint:'Le contraire de big est small. (The opposite of big is small.)',
    explanation:'Le contraire de <b>grand</b> est <b>petit</b>. Par exemple : un éléphant est grand, une souris est petite. Très bien !' }),

  makeMCQ({ id:'g1fr-co-038', chapterId:'g1fr-comprehension-orale', difficulty:1, subsection:'vocabulaire_oral',
    question:'Quel est le contraire de <b>chaud</b> ?',
    options:['froid','doux','grand','vieux'],
    answer:'froid',
    hint:'Hot et cold sont les contraires en anglais. (Hot and cold are opposites.)',
    explanation:'Le contraire de <b>chaud</b> est <b>froid</b>. La glace est froide, le feu est chaud. Bravo !' })

);

})();
