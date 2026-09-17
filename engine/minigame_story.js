'use strict';
// Story Sprint — original mini-passages with comprehension questions.
//
// ⚠ ORIGINAL, AND NOT EXTRACTED FROM THE QUESTION BANK. The design note says
//   so and the reason is structural: comprehension items in the bank embed
//   their passage as stimulus HTML inside the question, so they do not split
//   into "passage" and "question" cleanly. Anything pulled out would arrive
//   with half its context missing.
//
// ⚠ EVERY QUESTION MUST BE ANSWERABLE FROM THE PASSAGE ALONE. A comprehension
//   game that rewards knowing about Mauritius rather than reading carefully is
//   a general-knowledge quiz wearing a passage, and it punishes exactly the
//   child who read properly but has not been to Chamarel.
// ⚠ And the answer must not simply be the one option whose words appear in the
//   text — that is a word-search, not comprehension. Each passage mixes
//   literal recall with one question that needs the child to join two
//   sentences together.
//
// ⚠ `inference: true` marks a question whose answer is NOT stated in the
//   passage's own words — the child has to join two sentences ("school was
//   closed, but nobody felt as if it were a holiday" + the father taping the
//   window). These are the best comprehension questions and the hardest to
//   check automatically, so they are flagged rather than avoided:
//   test-story-sprint.js skips the lexical-support check for them and caps
//   them at ONE per passage, so the check still catches an answer that
//   wandered in from nowhere.
//
// Shape: { id, band, lang:'en'|'fr', title, text, questions:[{q, inference?, options:[4], answer}] }
// ⚠ `lang` picks the passage against the child's enabled subjects: a child
//   whose parent switched French off never meets a French passage.
window.MINIGAME_STORY = [

  // ── Band 1 — Grades 1-4 ───────────────────────────────────────────────────
  {
    id: 'st1-dodo', band: 1, lang: 'en', title: 'The Bird That Could Not Fly',
    text: 'Long ago, a large grey bird lived on our island. It was called the dodo. '
      + 'The dodo had small wings, so it could not fly. It did not need to. There were '
      + 'no cats and no dogs on the island, and nothing chased it. The dodo walked '
      + 'slowly through the forest and ate fallen fruit. Today there are no dodos left, '
      + 'but you can see a picture of one on our coat of arms.',
    questions: [
      { q: 'Why did the dodo not need to fly?', options: ['Its wings were too heavy', 'Nothing chased it on the island', 'It preferred to swim', 'The forest was too thick'], answer: 'Nothing chased it on the island' },
      { q: 'What did the dodo eat?', options: ['Fish from the sea', 'Fallen fruit', 'Small insects', 'Leaves from tall trees'], answer: 'Fallen fruit' },
      { q: 'Where can you still see a dodo today?', options: ['In the forest', 'At the beach', 'On our coat of arms', 'In a cage at the zoo'], answer: 'On our coat of arms' },
    ],
  },
  {
    id: 'st1-market', band: 1, lang: 'en', title: 'Market Day',
    text: 'Every Saturday, Rani goes to the market with her grandmother. They leave the '
      + 'house early, while the road is still quiet. The market is loud and full of colour. '
      + 'Rani likes the pile of red tomatoes best. Her grandmother buys brèdes, two mangoes '
      + 'and a bag of onions. On the way home Rani carries the lightest bag, and her '
      + 'grandmother carries the rest.',
    questions: [
      { q: 'When does Rani go to the market?', options: ['Every Saturday', 'Every Sunday', 'Every morning', 'Once a month'], answer: 'Every Saturday' },
      { q: 'Why is the road quiet when they leave?', options: ['It is raining', 'They leave early', 'The market is closed', 'It is a holiday'], answer: 'They leave early' },
      { q: 'Who carries the heaviest bags home?', options: ['Rani', 'Her grandmother', 'A neighbour', 'The shopkeeper'], answer: 'Her grandmother' },
    ],
  },
  {
    id: 'st1-rain', band: 1, lang: 'en', title: 'The Rain Came',
    text: 'The sky went dark at four o\'clock. Sam was playing football in the yard with '
      + 'his cousin. First there was one heavy drop, then ten, then too many to count. '
      + 'The boys ran inside, laughing. They watched the rain from the window. The mango '
      + 'tree bent in the wind, and water ran down the road like a little river. After '
      + 'twenty minutes the sun came back out.',
    questions: [
      { q: 'What were the boys doing before the rain?', options: ['Watching television', 'Playing football', 'Doing homework', 'Walking to school'], answer: 'Playing football' },
      { q: 'What did the water in the road look like?', options: ['A little river', 'A big lake', 'A waterfall', 'The sea'], answer: 'A little river' },
      { q: 'How long did the rain last?', options: ['All night', 'About twenty minutes', 'Two hours', 'Until the morning'], answer: 'About twenty minutes' },
    ],
  },
  {
    id: 'st1-plage', band: 1, lang: 'fr', title: 'Une journée à la plage',
    text: 'Dimanche, la famille de Léa va à la plage. Le sable est chaud et la mer est '
      + 'calme. Léa nage un peu, puis elle construit un château de sable avec son petit '
      + 'frère. Leur père prépare le déjeuner sous un grand arbre. À midi, tout le monde '
      + 'mange à l\'ombre, parce que le soleil est très fort.',
    questions: [
      { q: 'Quel jour la famille va-t-elle à la plage ?', options: ['Samedi', 'Dimanche', 'Lundi', 'Vendredi'], answer: 'Dimanche' },
      { q: 'Que fait Léa après avoir nagé ?', options: ['Elle dort', 'Elle construit un château de sable', 'Elle rentre à la maison', 'Elle pêche'], answer: 'Elle construit un château de sable' },
      { q: 'Pourquoi mangent-ils à l\'ombre ?', options: ['Il pleut', 'Le soleil est très fort', 'Il fait froid', 'La plage est pleine'], answer: 'Le soleil est très fort' },
    ],
  },
  {
    id: 'st1-chat', band: 1, lang: 'fr', title: 'Le chat de la voisine',
    text: 'La voisine de Karim a un chat noir. Il s\'appelle Minou. Chaque matin, Minou '
      + 'saute sur le mur du jardin et regarde les oiseaux. Il ne les attrape jamais : '
      + 'il est trop lent. Karim lui donne parfois un peu de lait. Le soir, Minou dort '
      + 'sous la voiture, là où il fait encore chaud.',
    questions: [
      { q: 'De quelle couleur est Minou ?', options: ['Blanc', 'Gris', 'Noir', 'Roux'], answer: 'Noir' },
      { q: 'Pourquoi Minou n\'attrape-t-il jamais les oiseaux ?', options: ['Il est trop lent', 'Il a peur', 'Il n\'a pas faim', 'Il dort le matin'], answer: 'Il est trop lent' },
      { q: 'Où dort Minou le soir ?', options: ['Sur le mur', 'Sous la voiture', 'Dans la maison de Karim', 'Dans le jardin'], answer: 'Sous la voiture' },
    ],
  },

  // ── Band 2 — Grades 5-6 ───────────────────────────────────────────────────
  {
    id: 'st2-cyclone', band: 2, lang: 'en', title: 'Class III',
    text: 'The warning went up on Tuesday evening. By Wednesday morning it was Class III, '
      + 'and the radio repeated the same message every half hour. Ravi\'s father filled '
      + 'every bottle in the house with water and taped a cross on the largest window. '
      + 'School was closed, but nobody felt as if it were a holiday. The wind arrived in '
      + 'the afternoon. It did not howl, as Ravi had expected; it pushed steadily against '
      + 'the walls, hour after hour, like something patient. The electricity went at six. '
      + 'They ate bread and cheese by candlelight and listened.',
    questions: [
      { q: 'What did Ravi\'s father do with the bottles?', options: ['Filled them with water', 'Put them outside', 'Taped them to the window', 'Gave them to a neighbour'], answer: 'Filled them with water' },
      { q: 'How was the wind different from what Ravi expected?', options: ['It was much louder', 'It pushed steadily instead of howling', 'It came at night', 'It stopped quickly'], answer: 'It pushed steadily instead of howling' },
      { q: 'Why did the closed school not feel like a holiday?', inference: true, options: ['There was homework to finish', 'Everyone was preparing for the cyclone', 'It was raining', 'The radio was broken'], answer: 'Everyone was preparing for the cyclone' },
    ],
  },
  {
    id: 'st2-fisher', band: 2, lang: 'en', title: 'Before the Sun',
    text: 'Mr Louis has fished the lagoon at Mahébourg for thirty-one years. He leaves '
      + 'before the sun, because the fish come close to the shore while the water is still '
      + 'cool. He reads the sea the way other people read a newspaper: a change in the '
      + 'colour of the water tells him where the sand ends and the coral begins. He says '
      + 'the lagoon is not as full as it was when he started. Younger men buy bigger '
      + 'engines and go further out. Mr Louis stays where he is. He says a man who knows '
      + 'one place well will always eat.',
    questions: [
      { q: 'Why does Mr Louis leave before sunrise?', options: ['The wind is calmer then', 'The fish come close while the water is cool', 'The market opens early', 'There are fewer boats'], answer: 'The fish come close while the water is cool' },
      { q: 'What does a change in the water\'s colour tell him?', options: ['A storm is coming', 'Where the sand ends and the coral begins', 'How deep the lagoon is', 'That fish are nearby'], answer: 'Where the sand ends and the coral begins' },
      { q: 'What does Mr Louis mean by "a man who knows one place well will always eat"?', options: ['Deep knowledge of one area is worth more than a bigger boat', 'Fishermen should share their catch', 'The lagoon will always be full', 'Young men waste their money'], answer: 'Deep knowledge of one area is worth more than a bigger boat' },
    ],
  },
  {
    id: 'st2-bagasse', band: 2, lang: 'en', title: 'What Is Left Over',
    text: 'When sugar cane is crushed, the juice runs out and a dry fibre is left behind. '
      + 'That fibre is called bagasse. For a long time it was simply a nuisance, piled up '
      + 'beside the mill. Then someone noticed that it burns well. Today several mills in '
      + 'Mauritius burn bagasse to make steam, and the steam turns turbines that make '
      + 'electricity. The cane grows again each year, so the fuel grows back with it. A '
      + 'waste product became part of how the island keeps its lights on.',
    questions: [
      { q: 'What is bagasse?', options: ['The juice from the cane', 'The dry fibre left after crushing', 'A kind of sugar', 'The root of the cane plant'], answer: 'The dry fibre left after crushing' },
      { q: 'What turns the turbines?', options: ['Wind', 'Steam', 'Falling water', 'The mill wheel'], answer: 'Steam' },
      { q: 'Why is bagasse called a renewable fuel in this passage?', options: ['It never runs out once burned', 'The cane grows again each year', 'It is cheap to buy', 'It makes very little smoke'], answer: 'The cane grows again each year' },
    ],
  },
  {
    id: 'st2-sega', band: 2, lang: 'fr', title: 'Le soir du séga',
    text: 'Le samedi soir, sur la plage de Flic-en-Flac, on entend la ravanne avant de '
      + 'voir les musiciens. Le tambour est chauffé au-dessus d\'un petit feu : la peau '
      + 'devient plus tendue et le son plus clair. Les gens arrivent lentement, s\'assoient '
      + 'sur le sable, puis quelqu\'un se lève et danse. Personne n\'a répété. La grand-mère '
      + 'de Sarah dit que le séga se transmet comme une langue : on l\'apprend en écoutant, '
      + 'pas dans un livre.',
    questions: [
      { q: 'Pourquoi chauffe-t-on la ravanne au-dessus du feu ?', options: ['Pour la sécher après la pluie', 'Pour tendre la peau et avoir un son plus clair', 'Pour la nettoyer', 'Pour éloigner les insectes'], answer: 'Pour tendre la peau et avoir un son plus clair' },
      { q: 'Qu\'entend-on en premier ?', options: ['Les chanteurs', 'La ravanne', 'La mer', 'Les danseurs'], answer: 'La ravanne' },
      { q: 'Que veut dire la grand-mère de Sarah ?', options: ['Le séga s\'apprend en écoutant les autres', 'Le séga est difficile à danser', 'Il faut un livre pour apprendre le séga', 'Le séga vient d\'un autre pays'], answer: 'Le séga s\'apprend en écoutant les autres' },
    ],
  },
  {
    id: 'st2-jardin', band: 2, lang: 'fr', title: 'Le jardin de mon grand-père',
    text: 'Derrière la maison, mon grand-père cultive un petit jardin. Il ne plante jamais '
      + 'tout au même endroit : cette année les tomates sont là où il y avait des haricots, '
      + 'et les haricots sont à la place des tomates. Il dit que la terre se fatigue si on '
      + 'lui demande toujours la même chose. Il garde aussi les épluchures de légumes dans '
      + 'un grand seau ; au bout de quelques mois, elles deviennent une terre noire et '
      + 'riche qu\'il remet au pied des plantes.',
    questions: [
      { q: 'Pourquoi change-t-il les plantes de place ?', options: ['Pour avoir plus de soleil', 'Parce que la terre se fatigue', 'Pour faire joli', 'Parce qu\'il manque de place'], answer: 'Parce que la terre se fatigue' },
      { q: 'Que deviennent les épluchures après quelques mois ?', options: ['Une terre noire et riche', 'De la nourriture pour les poules', 'Des graines', 'Rien du tout'], answer: 'Une terre noire et riche' },
      { q: 'Où sont les haricots cette année ?', options: ['À la place des tomates', 'Au même endroit que l\'an dernier', 'Devant la maison', 'Dans un seau'], answer: 'À la place des tomates' },
    ],
  },

  // ── Band 3 — Grades 7-9 ───────────────────────────────────────────────────
  {
    id: 'st3-filao', band: 3, lang: 'en', title: 'The Trees on the Sand',
    text: 'Walk along almost any public beach in Mauritius and you will pass under filao '
      + 'trees. They are not native. They were planted, in large numbers, because they grow '
      + 'quickly in poor sandy soil and their roots hold the sand in place when the sea '
      + 'pushes at it. For decades that seemed like an unmixed good. More recently, '
      + 'botanists have pointed out a cost: filao needles fall in a thick mat that few '
      + 'other plants can grow through, so a filao beach is often a beach with filao and '
      + 'very little else. The argument now is not whether the trees are useful — they '
      + 'plainly are — but whether a coastline should be held together by a single species.',
    questions: [
      { q: 'Why were filao trees planted on beaches?', options: ['They are native to Mauritius', 'Their roots hold the sand in place', 'They provide fruit', 'They grow slowly and last long'], answer: 'Their roots hold the sand in place' },
      { q: 'What problem do botanists point out?', options: ['The trees die in salt water', 'Their fallen needles stop other plants growing', 'They attract insects', 'They block the view of the sea'], answer: 'Their fallen needles stop other plants growing' },
      { q: 'What is the argument actually about, according to the passage?', options: ['Whether filao trees are useful at all', 'Whether a coast should depend on one species', 'Whether beaches should be public', 'Whether to plant more trees'], answer: 'Whether a coast should depend on one species' },
    ],
  },
  {
    id: 'st3-water', band: 3, lang: 'en', title: 'A Dry Month',
    text: 'Mauritius receives a great deal of rain — more than two metres a year in the '
      + 'centre of the island. It is therefore surprising to hear of water cuts. The '
      + 'difficulty is not how much falls but when, and what happens next. Most of the '
      + 'rain arrives in a few summer months. The island is small and steep, so water that '
      + 'is not captured quickly reaches the sea within hours. Reservoirs hold what they '
      + 'can. Older pipes lose a share of what is stored before it ever reaches a tap. A '
      + 'dry September, then, is less a shortage of rain than a shortage of storage and of '
      + 'pipes that do not leak.',
    questions: [
      { q: 'Why is it surprising that Mauritius has water cuts?', options: ['It has many rivers', 'It receives a great deal of rain', 'It is surrounded by sea', 'It has many reservoirs'], answer: 'It receives a great deal of rain' },
      { q: 'Why does rainwater reach the sea so quickly?', options: ['The island is small and steep', 'The soil cannot absorb it', 'The rivers are straight', 'It falls mostly at night'], answer: 'The island is small and steep' },
      { q: 'What does the writer suggest the real problem is?', options: ['Too little rainfall', 'Storage and leaking pipes', 'Too many people', 'Dry summers'], answer: 'Storage and leaking pipes' },
    ],
  },
  {
    id: 'st3-creole', band: 3, lang: 'en', title: 'Three Languages Before Breakfast',
    text: 'A Mauritian child may speak Kreol at home, study in English, and learn French '
      + 'as a subject, all before the age of seven. To a visitor this sounds like a burden. '
      + 'Research on multilingual classrooms suggests something more interesting: children '
      + 'who move between languages early are often quicker to notice how language itself '
      + 'works — that a word is a choice, not a fact. The difficulty is rarely the number '
      + 'of languages. It is when a child is taught to read in a language they do not yet '
      + 'speak well, and is judged on the reading rather than on the understanding.',
    questions: [
      { q: 'What does the research suggest about multilingual children?', options: ['They learn to read more slowly', 'They notice how language itself works', 'They forget their home language', 'They prefer one language over the others'], answer: 'They notice how language itself works' },
      { q: 'What does the writer say the real difficulty is?', options: ['Learning three languages at once', 'Being taught to read in a language not yet spoken well', 'Speaking Kreol at home', 'Starting school before seven'], answer: 'Being taught to read in a language not yet spoken well' },
      { q: 'What does "a word is a choice, not a fact" suggest?', options: ['Words can be spelled in several ways', 'The same idea can be said in different languages', 'Some words are more correct than others', 'Children invent their own words'], answer: 'The same idea can be said in different languages' },
    ],
  },
  {
    id: 'st3-tortue', band: 3, lang: 'fr', title: 'Les tortues de Rodrigues',
    text: 'Il y a quatre cents ans, les tortues géantes couvraient Rodrigues. Les marins '
      + 'qui s\'arrêtaient sur l\'île en emportaient des centaines : la viande se conservait '
      + 'vivante à bord pendant des mois, ce qui était précieux avant l\'invention du froid. '
      + 'En moins de deux siècles, l\'espèce locale avait disparu. Aujourd\'hui, une réserve '
      + 'de l\'île élève des tortues venues d\'Aldabra, une espèce cousine. Elles ne '
      + 'remplacent pas celles qu\'on a perdues, mais elles mangent les mêmes plantes et '
      + 'dispersent les mêmes graines : la forêt, elle, retrouve une partie de ce qui lui '
      + 'manquait.',
    questions: [
      { q: 'Pourquoi les marins emportaient-ils des tortues ?', options: ['Pour les vendre en Europe', 'Parce que la viande se conservait vivante à bord', 'Pour les offrir en cadeau', 'Parce qu\'elles étaient faciles à dresser'], answer: 'Parce que la viande se conservait vivante à bord' },
      { q: 'D\'où viennent les tortues de la réserve aujourd\'hui ?', options: ['De Rodrigues', 'D\'Aldabra', 'De Maurice', 'De Madagascar'], answer: 'D\'Aldabra' },
      { q: 'Pourquoi ces tortues aident-elles la forêt ?', options: ['Elles éloignent les autres animaux', 'Elles dispersent les mêmes graines', 'Elles creusent la terre', 'Elles attirent les visiteurs'], answer: 'Elles dispersent les mêmes graines' },
    ],
  },
  {
    id: 'st3-usine', band: 3, lang: 'fr', title: 'L\'usine fermée',
    text: 'L\'usine sucrière du village a fermé il y a douze ans. Pendant longtemps, le '
      + 'bâtiment est resté vide, avec sa haute cheminée que tout le monde voyait depuis la '
      + 'route. Les anciens ouvriers en parlaient peu. Puis la commune a décidé de ne pas '
      + 'la démolir : on a gardé la cheminée et les murs, et on a installé à l\'intérieur '
      + 'une bibliothèque et une salle pour les associations. Le grand-père de Yann, qui y '
      + 'a travaillé vingt-huit ans, y emmène maintenant sa petite-fille lire le mercredi. '
      + 'Il dit que c\'est étrange, mais que c\'est mieux qu\'une ruine.',
    questions: [
      { q: 'Qu\'a décidé la commune ?', options: ['De démolir l\'usine', 'De ne pas la démolir et de la transformer', 'De la vendre', 'De la rouvrir'], answer: 'De ne pas la démolir et de la transformer' },
      { q: 'Qu\'y a-t-il aujourd\'hui à l\'intérieur du bâtiment ?', options: ['Une bibliothèque et une salle pour les associations', 'Un musée du sucre', 'Des logements', 'Un marché'], answer: 'Une bibliothèque et une salle pour les associations' },
      { q: 'Que ressent le grand-père de Yann ?', inference: true, options: ['De la colère', 'Un mélange d\'étrangeté et de satisfaction', 'De l\'indifférence', 'De la tristesse seulement'], answer: 'Un mélange d\'étrangeté et de satisfaction' },
    ],
  },
];
