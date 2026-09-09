'use strict';
// Grade 1 French — Expression orale
// IDs: g1fr-eo-001 … g1fr-eo-075

(function () {

STATIC_QUESTIONS.push(

  // ── comptines_chansons ───────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-eo-001', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"chat"</b> ?',
    options:['rat','bus','sel','fleur'],
    answer:'rat',
    hint:'Cherche un mot avec le même son à la fin : "-a". (Find a word with the same ending sound.)',
    explanation:'<b>Rat</b> rime avec <b>chat</b> — les deux finissent par le son "-a". Bravo !' }),

  makeMCQ({ id:'g1fr-eo-002', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"maison"</b> ?',
    options:['saison','chat','soleil','ballon'],
    answer:'saison',
    hint:'Cherche le même son à la fin : "-on". (Find the same ending sound "-on".)',
    explanation:'<b>Saison</b> rime avec <b>maison</b> — les deux finissent par "-on". Super !' }),

  makeMCQ({ id:'g1fr-eo-003', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"soleil"</b> ?',
    options:['réveil','maison','canard','livre'],
    answer:'réveil',
    hint:'Cherche le même son à la fin : "-eil". (Find the same ending "-eil".)',
    explanation:'<b>Réveil</b> rime avec <b>soleil</b> — les deux finissent par "-eil". Excellent !' }),

  makeMCQ({ id:'g1fr-eo-004', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"ballon"</b> ?',
    options:['mouton','chat','fleur','arbre'],
    answer:'mouton',
    hint:'Cherche le même son à la fin : "-on". (Find the same ending "-on".)',
    explanation:'<b>Mouton</b> rime avec <b>ballon</b> — les deux finissent par "-on". Très bien !' }),

  makeMCQ({ id:'g1fr-eo-005', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"fleur"</b> ?',
    options:['cœur','maison','rat','soleil'],
    answer:'cœur',
    hint:'Cherche le même son à la fin : "-eur". (Find the same ending "-eur".)',
    explanation:'<b>Cœur</b> rime avec <b>fleur</b> — les deux finissent par "-eur". Bravo !' }),

  makeMCQ({ id:'g1fr-eo-006', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"nuit"</b> ?',
    options:['pluie','soleil','chat','pain'],
    answer:'pluie',
    hint:'Cherche le même son à la fin : "-i". (Find the same ending "-i".)',
    explanation:'<b>Pluie</b> rime avec <b>nuit</b> — les deux finissent par le son "-i". Super !' }),

  makeMCQ({ id:'g1fr-eo-007', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"pain"</b> ?',
    options:['main','chat','ballon','soleil'],
    answer:'main',
    hint:'Cherche le même son à la fin : "-in". (Find the same ending "-in".)',
    explanation:'<b>Main</b> rime avec <b>pain</b> — les deux finissent par "-in". Excellent !' }),

  makeMCQ({ id:'g1fr-eo-008', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Dans une comptine, les mots à la fin des lignes ...',
    options:['riment','bougent','grandissent','disparaissent'],
    answer:'riment',
    hint:'C\'est ce qui rend une comptine musicale et amusante. (This makes a rhyme musical and fun.)',
    explanation:'Dans une comptine, les mots à la fin des lignes <b>riment</b> — ils ont le même son. C\'est ce qui rend la comptine belle et facile à retenir ! Très bien !' }),

  makeMCQ({ id:'g1fr-eo-009', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"école"</b> ?',
    options:['drôle','maison','livre','chat'],
    answer:'drôle',
    hint:'Cherche le même son à la fin : "-ole". (Find the same ending "-ole".)',
    explanation:'<b>Drôle</b> rime avec <b>école</b> — les deux finissent par "-ole". Bravo !' }),

  makeMCQ({ id:'g1fr-eo-010', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"chien"</b> ?',
    options:['bien','ballon','chat','fleur'],
    answer:'bien',
    hint:'Cherche le même son à la fin : "-ien". (Find the same ending "-ien".)',
    explanation:'<b>Bien</b> rime avec <b>chien</b> — les deux finissent par le son "-ien". Super !' }),

  makeMCQ({ id:'g1fr-eo-011', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"mer"</b> ?',
    options:['aimer','maison','chat','nuit'],
    answer:'aimer',
    hint:'Cherche le même son à la fin : "-er". (Find the same ending "-er".)',
    explanation:'<b>Aimer</b> rime avec <b>mer</b> — les deux finissent par le son "-er". Excellent !' }),

  makeMCQ({ id:'g1fr-eo-012', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Quel mot rime avec <b>"livre"</b> ?',
    options:['vivre','maison','ballon','soleil'],
    answer:'vivre',
    hint:'Cherche le même son à la fin : "-ivre". (Find the same ending "-ivre".)',
    explanation:'<b>Vivre</b> rime avec <b>livre</b> — les deux finissent par "-ivre". Très bien !' }),

  makeMCQ({ id:'g1fr-eo-013', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'comptines_chansons',
    question:'Complète la comptine : <i>"Une, deux, trois, allons dans les ___"</i>',
    options:['bois','rats','fleurs','maisons'],
    answer:'bois',
    hint:'Ce mot doit rimer avec "trois". (This word should rhyme with "trois".)',
    explanation:'"Une, deux, trois, allons dans les <b>bois</b>" — <b>bois</b> rime avec <b>trois</b> ! C\'est une célèbre comptine française. Bravo !' }),

  // ── conversation_simple ──────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-eo-014', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Le matin, quand tu arrives à l\'école, tu dis ...',
    options:['Bonjour !','Bonsoir !','Bonne nuit !','Au revoir !'],
    answer:'Bonjour !',
    hint:'"Bonjour" = Good morning / Hello. (It is used in the morning and daytime.)',
    explanation:'On dit <b>"Bonjour"</b> le matin et pendant la journée. "Bonsoir" c\'est le soir, "Bonne nuit" avant de dormir, et "Au revoir" quand on part. Bien joué !' }),

  makeMCQ({ id:'g1fr-eo-015', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Le soir, avant d\'aller dormir, tu dis ...',
    options:['Bonne nuit !','Bonjour !','Salut !','À bientôt !'],
    answer:'Bonne nuit !',
    hint:'"Bonne nuit" = Good night. (We say this before sleeping.)',
    explanation:'On dit <b>"Bonne nuit"</b> avant d\'aller dormir. Dors bien ! Super !' }),

  makeMCQ({ id:'g1fr-eo-016', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Quand tu quittes l\'école, tu dis ...',
    options:['Au revoir !','Bonjour !','Merci !','S\'il vous plaît !'],
    answer:'Au revoir !',
    hint:'"Au revoir" = Goodbye. (We say this when leaving.)',
    explanation:'On dit <b>"Au revoir"</b> quand on part. C\'est poli de dire au revoir à ses amis et à la maîtresse ! Excellent !' }),

  makeMCQ({ id:'g1fr-eo-017', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Quelqu\'un te donne un cadeau. Tu dis ...',
    options:['Merci !','Bonjour !','Pardon !','Au revoir !'],
    answer:'Merci !',
    hint:'"Merci" = Thank you. (We say this to show gratitude.)',
    explanation:'On dit <b>"Merci"</b> quand quelqu\'un nous aide ou nous donne quelque chose. C\'est très poli ! Très bien !' }),

  makeMCQ({ id:'g1fr-eo-018', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Tu veux un biscuit. Tu dis à maman ...',
    options:['S\'il te plaît, maman.','Non merci, maman.','Bonjour, maman.','Bonsoir, maman.'],
    answer:'S\'il te plaît, maman.',
    hint:'"S\'il te plaît" = Please. (We say this to ask politely.)',
    explanation:'Pour demander quelque chose poliment, on dit <b>"s\'il te plaît"</b> (to someone you know) ou "s\'il vous plaît" (to adults you don\'t know well). Bravo !' }),

  makeMCQ({ id:'g1fr-eo-019', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Tu marches sur le pied de quelqu\'un par accident. Tu dis ...',
    options:['Pardon !','Bonjour !','Merci !','Salut !'],
    answer:'Pardon !',
    hint:'"Pardon" = Sorry / Excuse me. (We say this when we make a mistake.)',
    explanation:'On dit <b>"Pardon"</b> ou <b>"Excuse-moi"</b> quand on fait une erreur par accident. C\'est important d\'être poli ! Super !' }),

  makeMCQ({ id:'g1fr-eo-020', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'La maîtresse demande : <i>"Comment tu t\'appelles ?"</i> Tu réponds ...',
    options:['Je m\'appelle [ton prénom].','J\'ai [ton âge] ans.','Je vais bien, merci.','Je suis à l\'école.'],
    answer:'Je m\'appelle [ton prénom].',
    hint:'"Je m\'appelle..." = My name is... (This is how we introduce ourselves.)',
    explanation:'Pour dire son nom, on dit <b>"Je m\'appelle..."</b> suivi de son prénom. Par exemple : "Je m\'appelle Shanvi." Excellent !' }),

  makeMCQ({ id:'g1fr-eo-021', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'La maîtresse demande : <i>"Quel âge as-tu ?"</i> Tu réponds ...',
    options:['J\'ai six ans.','Je m\'appelle Léa.','Je vais bien.','J\'aime jouer.'],
    answer:'J\'ai six ans.',
    hint:'"J\'ai ... ans" = I am ... years old. (This is how we tell our age.)',
    explanation:'Pour dire son âge, on dit <b>"J\'ai ... ans."</b> Par exemple : "J\'ai six ans." Très bien !' }),

  makeMCQ({ id:'g1fr-eo-022', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Un ami demande : <i>"Ça va ?"</i> Tu réponds ...',
    options:['Ça va bien, merci !','Bonjour !','Au revoir !','Bonne nuit !'],
    answer:'Ça va bien, merci !',
    hint:'"Ça va ?" = How are you? "Ça va bien" = I am fine. (This is a common greeting.)',
    explanation:'Quand quelqu\'un dit <b>"Ça va ?"</b>, on répond <b>"Ça va bien, merci !"</b> ou simplement "Ça va". C\'est une salutation courante en français ! Bravo !' }),

  makeMCQ({ id:'g1fr-eo-023', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Tu présentes ton ami. Tu dis ...',
    options:['Voici mon ami Paul.','Merci beaucoup.','Au revoir Paul.','Bonsoir Paul.'],
    answer:'Voici mon ami Paul.',
    hint:'"Voici" = This is / Here is. (We use this to introduce someone.)',
    explanation:'Pour présenter quelqu\'un, on dit <b>"Voici mon ami..."</b> ou "Voici ma camarade..." Très poli et agréable ! Super !' }),

  makeMCQ({ id:'g1fr-eo-024', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'La maîtresse demande : <i>"Tu aimes l\'école ?"</i> Tu réponds ...',
    options:['Oui, j\'aime l\'école !','Je suis grand.','Mon chien est beau.','Il fait chaud.'],
    answer:'Oui, j\'aime l\'école !',
    hint:'La question demande si tu aimes l\'école. Réponds avec "Oui" ou "Non". (Answer with yes or no.)',
    explanation:'Pour répondre à cette question, on dit <b>"Oui, j\'aime l\'école !"</b> ou "Non, je n\'aime pas l\'école." Mais j\'espère que tu aimes l\'école ! Excellent !' }),

  makeMCQ({ id:'g1fr-eo-025', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Comment dit-on <b>"Hello"</b> de manière informelle en français ?',
    options:['Salut !','Bonjour !','Bonsoir !','Au revoir !'],
    answer:'Salut !',
    hint:'"Salut" est utilisé entre amis — c\'est informel. (Salut is used between friends — it is informal.)',
    explanation:'<b>"Salut !"</b> est comme "Hi!" en anglais — on l\'utilise avec ses amis. "Bonjour" est plus formel, pour les adultes et les inconnus. Très bien !' }),

  makeMCQ({ id:'g1fr-eo-026', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'conversation_simple',
    question:'Tu ne comprends pas ce que dit la maîtresse. Tu dis ...',
    options:['Pardon, pouvez-vous répéter ?','Au revoir !','Merci beaucoup !','Bonsoir !'],
    answer:'Pardon, pouvez-vous répéter ?',
    hint:'On demande de répéter quand on n\'a pas compris. (We ask to repeat when we did not understand.)',
    explanation:'Quand on ne comprend pas, on dit <b>"Pardon, pouvez-vous répéter ?"</b> — Excuse me, could you repeat please? C\'est toujours bon de demander ! Bravo !' }),

  // ── description_images ───────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-eo-027', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Une pomme est de quelle couleur ?',
    options:['rouge','bleu','noir','gris'],
    answer:'rouge',
    hint:'La pomme est le fruit rouge que tu manges souvent. (The apple is the red fruit you often eat.)',
    explanation:'<b>La pomme</b> est <b>rouge</b> (ou parfois verte ou jaune). On dit : "La pomme est rouge." Super !' }),

  makeMCQ({ id:'g1fr-eo-028', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Comment est un éléphant ?',
    options:['grand et gris','petit et rouge','mince et bleu','court et vert'],
    answer:'grand et gris',
    hint:'L\'éléphant est le plus grand animal de la terre. (The elephant is the largest land animal.)',
    explanation:'L\'éléphant est <b>grand et gris</b>. Il a de grandes oreilles et une longue trompe. Excellent !' }),

  makeMCQ({ id:'g1fr-eo-029', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Le ciel la nuit est de quelle couleur ?',
    options:['noir','bleu','rouge','jaune'],
    answer:'noir',
    hint:'La nuit, on voit les étoiles dans le ciel. (At night, we see stars in the sky.)',
    explanation:'La nuit, le ciel est <b>noir</b> et on y voit les étoiles. La lune brille aussi dans le ciel noir. Très bien !' }),

  makeMCQ({ id:'g1fr-eo-030', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'L\'herbe est de quelle couleur ?',
    options:['verte','rouge','bleue','noire'],
    answer:'verte',
    hint:'L\'herbe pousse dans le jardin et dans les parcs. (Grass grows in the garden and parks.)',
    explanation:'L\'herbe est <b>verte</b>. On joue sur l\'herbe verte dans le jardin ! Bravo !' }),

  makeMCQ({ id:'g1fr-eo-031', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Un nuage dans le ciel est de quelle couleur ?',
    options:['blanc','rouge','vert','bleu'],
    answer:'blanc',
    hint:'Les nuages ressemblent à du coton. (Clouds look like cotton.)',
    explanation:'Les nuages sont <b>blancs</b> quand il fait beau, et gris quand il va pleuvoir. Super !' }),

  makeMCQ({ id:'g1fr-eo-032', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Un lapin est de quelle couleur le plus souvent ?',
    options:['blanc','rouge','bleu','jaune'],
    answer:'blanc',
    hint:'Cet animal est tout doux avec de longues oreilles. (This fluffy animal has long ears.)',
    explanation:'Les lapins sont souvent <b>blancs</b>, mais ils peuvent aussi être marron ou gris. Ils ont de longues oreilles et un petit nez qui bouge ! Excellent !' }),

  makeMCQ({ id:'g1fr-eo-033', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Pour décrire un objet, on dit sa couleur et ...',
    options:['sa taille','son prix','son poids','son âge'],
    answer:'sa taille',
    hint:'On dit si l\'objet est grand ou petit. (We say if the object is big or small.)',
    explanation:'Pour bien décrire un objet, on dit sa <b>couleur</b> et sa <b>taille</b>. Par exemple : "C\'est un grand ballon rouge." Très bien !' }),

  makeMCQ({ id:'g1fr-eo-034', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Comment décrit-on une tomate ?',
    options:['rouge et ronde','bleue et carrée','verte et longue','noire et triangulaire'],
    answer:'rouge et ronde',
    hint:'La tomate est un légume rouge de forme ronde. (A tomato is a round red vegetable.)',
    explanation:'Une tomate est <b>rouge et ronde</b>. On l\'utilise pour faire des sauces et des salades. Bravo !' }),

  makeMCQ({ id:'g1fr-eo-035', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Une banane a quelle forme ?',
    options:['longue et courbée','ronde','carrée','triangulaire'],
    answer:'longue et courbée',
    hint:'La banane n\'est pas droite — elle est un peu courbée. (A banana is not straight — it is curved.)',
    explanation:'Une banane est <b>longue et courbée</b>. Elle est jaune et sucrée. C\'est un fruit délicieux ! Super !' }),

  makeMCQ({ id:'g1fr-eo-036', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Laquelle de ces phrases décrit bien un chien ?',
    options:['Le chien est petit et brun.','Le chien est froid et silencieux.','Le chien est carré et jaune.','Le chien est une fleur rouge.'],
    answer:'Le chien est petit et brun.',
    hint:'Une bonne description parle de la couleur et de la taille de l\'animal. (A good description mentions colour and size.)',
    explanation:'"Le chien est <b>petit et brun</b>" est une bonne description — elle donne la taille et la couleur. C\'est comme ça qu\'on décrit les animaux ! Excellent !' }),

  makeMCQ({ id:'g1fr-eo-037', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Comment décrit-on une orange ?',
    options:['orange et ronde','bleue et longue','verte et carrée','rouge et triangulaire'],
    answer:'orange et ronde',
    hint:'Ce fruit donne son nom à une couleur ! (This fruit gave its name to a colour.)',
    explanation:'Une orange est <b>orange et ronde</b>. C\'est un fruit délicieux plein de vitamine C ! Très bien !' }),

  makeMCQ({ id:'g1fr-eo-038', chapterId:'g1fr-expression-orale', difficulty:1, subsection:'description_images',
    question:'Laquelle de ces phrases est une bonne description ?',
    options:[
      'Le ballon est rouge et grand.',
      'Le ballon mange.',
      'Le ballon est heureux.',
      'Le ballon va à l\'école.',
    ],
    answer:'Le ballon est rouge et grand.',
    hint:'Une description parle de l\'apparence — couleur, taille, forme. (A description talks about appearance.)',
    explanation:'"Le ballon est <b>rouge et grand</b>" est une bonne description — elle dit la couleur et la taille. Les autres phrases décrivent des actions ou des sentiments, pas l\'apparence. Bravo !' })

);

})();
