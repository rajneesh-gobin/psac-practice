'use strict';
// Grade 1 French — Grammaire
// IDs: g1fr-grm-001 … g1fr-grm-075

(function () {

STATIC_QUESTIONS.push(

  // ── noms_communs ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-grm-001', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom</b> ?',
    options:['chien','rouge','sauter','grand'],
    answer:'chien',
    hint:'Un nom désigne une chose, une personne ou un animal. (A noun names a thing, a person or an animal.)',
    explanation:'<b>Chien</b> est un nom — il désigne un animal. "Rouge" est une couleur, "sauter" est une action, "grand" est une description. Bravo !' }),

  makeMCQ({ id:'g1fr-grm-002', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom</b> ?',
    options:['maison','courir','bleu','joyeux'],
    answer:'maison',
    hint:'Un nom désigne un endroit, une chose ou une personne. (A noun names a place, a thing or a person.)',
    explanation:'<b>Maison</b> est un nom — il désigne un endroit. "Courir" est une action, "bleu" est une couleur, "joyeux" est une description. Super !' }),

  makeMCQ({ id:'g1fr-grm-003', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom</b> ?',
    options:['fleur','beau','danser','petit'],
    answer:'fleur',
    hint:'Un nom peut être précédé de "le", "la" ou "les". (A noun can come after "le", "la" or "les".)',
    explanation:'<b>Fleur</b> est un nom — on peut dire "la fleur". "Beau" est une description, "danser" est une action, "petit" est une description. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-004', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Un nom commun désigne ...',
    options:['une chose, une personne ou un animal','une couleur','une action','une description'],
    answer:'une chose, une personne ou un animal',
    hint:'Il peut être précédé de "le", "la", "un" ou "une". (It can come after "le", "la", "un" or "une".)',
    explanation:'Un <b>nom commun</b> désigne <b>une chose, une personne ou un animal</b>. Exemples : chien, maison, fille, soleil, eau. Très bien !' }),

  makeMCQ({ id:'g1fr-grm-005', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Combien y a-t-il de noms dans la phrase : <i>"Le chat et le chien jouent."</i> ?',
    options:['2','1','3','0'],
    answer:'2',
    hint:'Cherche les mots qui désignent des animaux ou des choses. (Find the words that name animals or things.)',
    explanation:'Il y a <b>2 noms</b> : <b>chat</b> et <b>chien</b>. "Le" est un article, "jouent" est un verbe. Bravo !' }),

  makeMCQ({ id:'g1fr-grm-006', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un nom qui désigne une <b>personne</b> ?',
    options:['fille','maison','ballon','fleur'],
    answer:'fille',
    hint:'Une personne est un être humain. (A person is a human being.)',
    explanation:'<b>Fille</b> est un nom qui désigne une personne. Les autres noms désignent des choses et des objets. Super !' }),

  makeMCQ({ id:'g1fr-grm-007', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un nom qui désigne un <b>animal</b> ?',
    options:['lapin','école','chanter','vert'],
    answer:'lapin',
    hint:'Un animal est un être vivant qui n\'est pas une plante. (An animal is a living being that is not a plant.)',
    explanation:'<b>Lapin</b> est un nom qui désigne un animal. "École" est un endroit, "chanter" est une action, "vert" est une couleur. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-008', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom</b> ?',
    options:['soleil','chaud','briller','beau'],
    answer:'soleil',
    hint:'"Le soleil" — le mot après "le" est souvent un nom. (The word after "le" is often a noun.)',
    explanation:'<b>Soleil</b> est un nom — on dit "le soleil". "Chaud" et "beau" sont des adjectifs, "briller" est un verbe. Très bien !' }),

  makeMCQ({ id:'g1fr-grm-009', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Dans la phrase <i>"La petite fille mange une pomme"</i>, quel mot est un nom ?',
    options:['fille','petite','mange','une'],
    answer:'fille',
    hint:'Le nom désigne qui fait l\'action. (The noun names who does the action.)',
    explanation:'"<b>Fille</b>" est un nom (et "pomme" est aussi un nom !). "Petite" est un adjectif, "mange" est un verbe. Bravo !' }),

  makeMCQ({ id:'g1fr-grm-010', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces groupes contient <b>seulement</b> des noms ?',
    options:[
      'chien, maison, fleur',
      'grand, bleu, joli',
      'courir, manger, dormir',
      'le, la, les',
    ],
    answer:'chien, maison, fleur',
    hint:'Tous les mots doivent désigner des êtres ou des choses. (All words should name beings or things.)',
    explanation:'"<b>Chien, maison, fleur</b>" — ce sont tous des noms ! Les autres groupes contiennent des adjectifs, des verbes et des articles. Super !' }),

  makeMCQ({ id:'g1fr-grm-011', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom</b> ?',
    options:['livre','lire','vieux','rapidement'],
    answer:'livre',
    hint:'"Le livre" — le mot après "le" est souvent un nom. (The word after "le" is often a noun.)',
    explanation:'<b>Livre</b> est un nom — on dit "le livre". "Lire" est un verbe, "vieux" est un adjectif, "rapidement" est un adverbe. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-012', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Lequel de ces mots est un nom qui désigne un <b>endroit</b> ?',
    options:['jardin','beau','jouer','vite'],
    answer:'jardin',
    hint:'Un endroit est un lieu, un espace. (A place is a location, a space.)',
    explanation:'<b>Jardin</b> est un nom qui désigne un endroit. On joue dans le jardin ! Très bien !' }),

  makeMCQ({ id:'g1fr-grm-013', chapterId:'g1fr-grammaire', difficulty:1, subsection:'noms_communs',
    question:'Combien y a-t-il de noms dans la phrase : <i>"La fille mange une pomme rouge."</i> ?',
    options:['2','1','3','0'],
    answer:'2',
    hint:'Cherche les mots qui désignent des êtres ou des choses : "fille" et ...? (Find words that name beings or things: "fille" and ...?)',
    explanation:'Il y a <b>2 noms</b> : <b>fille</b> et <b>pomme</b>. "Rouge" est un adjectif, "mange" est un verbe. Bravo !' }),

  // ── determinants_le_la_les ───────────────────────────────────────────────

  makeMCQ({ id:'g1fr-grm-014', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On dit ...',
    options:['le chat','la chat','les chat','un chats'],
    answer:'le chat',
    hint:'"Chat" est un nom masculin — on utilise "le". (Chat is a masculine noun — we use "le".)',
    explanation:'On dit <b>"le chat"</b> parce que "chat" est un nom <b>masculin</b>. Pour les noms féminins, on dit "la". Super !' }),

  makeMCQ({ id:'g1fr-grm-015', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On dit ...',
    options:['la maison','le maison','les maison','un maisons'],
    answer:'la maison',
    hint:'"Maison" est un nom féminin — on utilise "la". (Maison is a feminine noun — we use "la".)',
    explanation:'On dit <b>"la maison"</b> parce que "maison" est un nom <b>féminin</b>. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-016', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On dit ...',
    options:['les chiens','le chiens','la chiens','un chiens'],
    answer:'les chiens',
    hint:'"Chiens" est un nom pluriel — on utilise "les". (Chiens is a plural noun — we use "les".)',
    explanation:'On dit <b>"les chiens"</b> parce que "chiens" est au <b>pluriel</b> (il y en a plusieurs). "Les" s\'utilise pour les noms masculins et féminins au pluriel ! Très bien !' }),

  makeMCQ({ id:'g1fr-grm-017', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On utilise <b>"le"</b> devant ...',
    options:['un nom masculin singulier','un nom féminin singulier','un nom pluriel','un verbe'],
    answer:'un nom masculin singulier',
    hint:'"Le" remplace "un" quand on parle d\'une chose précise. (Le replaces "un" for a specific masculine thing.)',
    explanation:'On utilise <b>"le"</b> devant un <b>nom masculin singulier</b> : le chat, le chien, le livre, le soleil. Bravo !' }),

  makeMCQ({ id:'g1fr-grm-018', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On utilise <b>"la"</b> devant ...',
    options:['un nom féminin singulier','un nom masculin singulier','un nom pluriel','un adjectif'],
    answer:'un nom féminin singulier',
    hint:'"La" remplace "une" quand on parle d\'une chose précise. (La replaces "une" for a specific feminine thing.)',
    explanation:'On utilise <b>"la"</b> devant un <b>nom féminin singulier</b> : la maison, la fleur, la fille, la lune. Super !' }),

  makeMCQ({ id:'g1fr-grm-019', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'On utilise <b>"les"</b> devant ...',
    options:['un nom pluriel','un nom masculin','un nom féminin','un verbe'],
    answer:'un nom pluriel',
    hint:'"Les" s\'utilise quand il y en a plusieurs. (Les is used when there are several.)',
    explanation:'On utilise <b>"les"</b> devant un <b>nom pluriel</b> : les chats, les maisons, les enfants. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-020', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quel article convient pour "soleil" ? <br>"___ soleil est jaune."',
    options:['Le','La','Les','Une'],
    answer:'Le',
    hint:'"Soleil" est un nom masculin. (Soleil is a masculine noun.)',
    explanation:'On dit <b>"Le soleil"</b> — "soleil" est masculin. <b>Le</b> soleil est jaune ! Très bien !' }),

  makeMCQ({ id:'g1fr-grm-021', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quel article convient pour "fleur" ? <br>"___ fleur est rouge."',
    options:['La','Le','Les','Un'],
    answer:'La',
    hint:'"Fleur" est un nom féminin. (Fleur is a feminine noun.)',
    explanation:'On dit <b>"La fleur"</b> — "fleur" est féminin. <b>La</b> fleur est rouge et belle ! Bravo !' }),

  makeMCQ({ id:'g1fr-grm-022', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quel article convient ? <br>"___ enfants jouent dans le jardin."',
    options:['Les','Le','La','Un'],
    answer:'Les',
    hint:'"Enfants" est un nom pluriel — il y en a plusieurs. (Enfants is a plural noun — there are several.)',
    explanation:'On dit <b>"Les enfants"</b> parce qu\'il y a plusieurs enfants. <b>Les</b> s\'utilise pour tous les noms pluriels ! Super !' }),

  makeMCQ({ id:'g1fr-grm-023', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quel article convient pour "chien" ? <br>"___ chien est grand."',
    options:['Le','La','Les','Une'],
    answer:'Le',
    hint:'"Chien" est un nom masculin. (Chien is a masculine noun.)',
    explanation:'On dit <b>"Le chien"</b> — "chien" est masculin. <b>Le</b> chien est grand et fidèle ! Excellent !' }),

  makeMCQ({ id:'g1fr-grm-024', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quelle phrase est <b>correcte</b> ?',
    options:['La fille est petite.','Le fille est petite.','Les fille est petite.','Un fille est petite.'],
    answer:'La fille est petite.',
    hint:'"Fille" est un nom féminin singulier. (Fille is a singular feminine noun.)',
    explanation:'"<b>La fille est petite.</b>" est correcte. "Fille" est féminin, donc on utilise <b>"la"</b>. Très bien !' }),

  makeMCQ({ id:'g1fr-grm-025', chapterId:'g1fr-grammaire', difficulty:1, subsection:'determinants_le_la_les',
    question:'Quelle phrase est <b>correcte</b> ?',
    options:['Les ballons sont rouges.','Le ballons sont rouges.','La ballons sont rouges.','Un ballons sont rouges.'],
    answer:'Les ballons sont rouges.',
    hint:'"Ballons" est un nom pluriel. (Ballons is a plural noun.)',
    explanation:'"<b>Les ballons sont rouges.</b>" est correcte. "Ballons" est pluriel, donc on utilise <b>"les"</b>. Bravo !' }),

  // ── phrases_simples_grm ──────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-grm-026', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase est <b>grammaticalement correcte</b> ?',
    options:[
      'Le chien joue dans le jardin.',
      'Chien le joue jardin le dans.',
      'Joue chien le jardin dans le.',
      'Dans le jardin chien joue le.',
    ],
    answer:'Le chien joue dans le jardin.',
    hint:'En français, le sujet vient avant le verbe. (In French, the subject comes before the verb.)',
    explanation:'"<b>Le chien joue dans le jardin.</b>" est correcte — sujet (le chien) + verbe (joue) + lieu (dans le jardin). Super !' }),

  makeMCQ({ id:'g1fr-grm-027', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Complète la phrase : <i>"La fille ___ une pomme."</i>',
    options:['mange','mange mange','la mange','un mange'],
    answer:'mange',
    hint:'Cherche le verbe qui dit ce que fait la fille. (Find the verb that says what the girl does.)',
    explanation:'"La fille <b>mange</b> une pomme." — <b>mange</b> est le verbe qui dit ce que fait la fille. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-028', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Complète la phrase : <i>"Le soleil ___ jaune."</i>',
    options:['est','sont','es','être'],
    answer:'est',
    hint:'"Être" au présent pour "il/elle" = "est". (The verb "to be" in present tense for "il/elle" = "est".)',
    explanation:'"Le soleil <b>est</b> jaune." — on utilise <b>est</b> (= is en anglais) pour "il" ou "elle". Très bien !' }),

  makeMCQ({ id:'g1fr-grm-029', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase parle d\'une <b>action</b> ?',
    options:['Le chat court.','Le chat est grand.','Le chat est blanc.','Le chat est beau.'],
    answer:'Le chat court.',
    hint:'Une action est quelque chose qu\'on fait : courir, manger, jouer... (An action is something we do: run, eat, play...)',
    explanation:'"<b>Le chat court.</b>" parle d\'une action — courir. Les autres phrases décrivent le chat (grand, blanc, beau). Bravo !' }),

  makeMCQ({ id:'g1fr-grm-030', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase est sur <b>deux</b> personnes ?',
    options:['Léa et Tom jouent.','Léa joue.','Tom joue.','Le chat joue.'],
    answer:'Léa et Tom jouent.',
    hint:'Cherche la phrase avec deux noms de personnes. (Find the sentence with two people\'s names.)',
    explanation:'"<b>Léa et Tom jouent.</b>" parle de deux personnes — Léa <b>et</b> Tom. Le mot "et" (and) relie les deux noms. Super !' }),

  makeMCQ({ id:'g1fr-grm-031', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Remets dans le bon ordre : <b>rouge / est / La / pomme</b>',
    options:['La pomme est rouge.','Rouge est la pomme.','La rouge pomme est.','Est la pomme rouge.'],
    answer:'La pomme est rouge.',
    hint:'L\'article (la) vient en premier, puis le nom (pomme), puis le verbe (est). (Article, then noun, then verb.)',
    explanation:'"<b>La pomme est rouge.</b>" est la bonne phrase. Article + nom + verbe + adjectif. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-032', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase est une <b>question</b> ?',
    options:['Est-ce que tu aimes les pommes ?','Je mange une pomme.','La pomme est rouge.','Les enfants jouent.'],
    answer:'Est-ce que tu aimes les pommes ?',
    hint:'Une question se termine par un point d\'interrogation (?). (A question ends with a question mark.)',
    explanation:'"<b>Est-ce que tu aimes les pommes ?</b>" est une question — elle se termine par <b>?</b>. Les questions cherchent une réponse. Très bien !' }),

  makeMCQ({ id:'g1fr-grm-033', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Complète la phrase : <i>"Les enfants ___ dans le jardin."</i>',
    options:['jouent','joue','jouer','joués'],
    answer:'jouent',
    hint:'"Les enfants" = plusieurs personnes → verbe avec "ent" à la fin. (With plural subject, verb ends in "ent".)',
    explanation:'"Les enfants <b>jouent</b> dans le jardin." — avec "les enfants" (pluriel), on dit <b>jouent</b>. Bravo !' }),

  makeMCQ({ id:'g1fr-grm-034', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase est <b>correcte</b> ?',
    options:[
      'Mon frère aime le football.',
      'Mon frère aimer le football.',
      'Mon frère aiment le football.',
      'Mon frère aimes le football.',
    ],
    answer:'Mon frère aime le football.',
    hint:'"Mon frère" = une seule personne (il). Utilise la bonne forme du verbe. (Mon frère = one person (he). Use the correct verb form.)',
    explanation:'"<b>Mon frère aime le football.</b>" est correcte. Avec "il/elle/mon frère", on dit <b>aime</b> (sans "s" à la fin). Super !' }),

  makeMCQ({ id:'g1fr-grm-035', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle est la bonne phrase pour dire que tu t\'appelles Shanvi ?',
    options:['Je m\'appelle Shanvi.','Tu t\'appelles Shanvi.','Il s\'appelle Shanvi.','Nous appelons Shanvi.'],
    answer:'Je m\'appelle Shanvi.',
    hint:'"Je" = I (moi). (Je = I.)',
    explanation:'"<b>Je m\'appelle Shanvi.</b>" — on utilise <b>je</b> (I) pour parler de soi-même. Excellent !' }),

  makeMCQ({ id:'g1fr-grm-036', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Complète : <i>"___ suis à l\'école."</i>',
    options:['Je','Tu','Il','Nous'],
    answer:'Je',
    hint:'Qui parle ici ? Moi ! Utilise "Je". (Who is speaking here? Me! Use "Je".)',
    explanation:'On dit "<b>Je</b> suis à l\'école." — <b>Je</b> (= I) est le pronom qu\'on utilise pour parler de soi-même. Très bien !' }),

  makeMCQ({ id:'g1fr-grm-037', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Remets dans le bon ordre : <b>dans / joue / la cour / L\'enfant</b>',
    options:[
      'L\'enfant joue dans la cour.',
      'Joue l\'enfant dans la cour.',
      'Dans la cour joue l\'enfant.',
      'L\'enfant dans la cour joue.',
    ],
    answer:'L\'enfant joue dans la cour.',
    hint:'Sujet + verbe + lieu — c\'est l\'ordre naturel en français. (Subject + verb + place is the natural order in French.)',
    explanation:'"<b>L\'enfant joue dans la cour.</b>" — sujet (L\'enfant) + verbe (joue) + lieu (dans la cour). Bravo !' }),

  makeMCQ({ id:'g1fr-grm-038', chapterId:'g1fr-grammaire', difficulty:1, subsection:'phrases_simples_grm',
    question:'Quelle phrase dit que quelque chose est <b>beau</b> ?',
    options:['La fleur est belle.','La fleur mange.','La fleur court.','La fleur boit.'],
    answer:'La fleur est belle.',
    hint:'"Belle" est le mot pour "beautiful" en français. (Belle means beautiful.)',
    explanation:'"<b>La fleur est belle.</b>" dit que la fleur est belle. "Belle" est l\'adjectif, "est" est le verbe. Super !' })

);

})();
