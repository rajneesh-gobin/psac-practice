'use strict';
// Grade 7 English — Reading & Comprehension, batch 2 (013–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-reading-013', chapterId:'g7eng-reading', difficulty:2,
    subsection:'main_idea_details',
    question:'Read: <i>"Mauritius became independent on 12 March 1968. In my view, it is the most beautiful island in the Indian Ocean. Its area is 2,040 square kilometres."</i><br>Which sentence is an OPINION?',
    options:['The second sentence','The first sentence','The third sentence','All three sentences'],
    answer:'The second sentence',
    hint:'An opinion cannot be checked in an atlas. One sentence even signals itself.',
    explanation:'Only the second sentence gives a judgement, and "In my view" signals it. The date and the area can both be checked against records, so they are facts — which is also why "all three" cannot be right.' }),

  makeMCQ({ id:'g7eng-reading-014', chapterId:'g7eng-reading', difficulty:2,
    subsection:'main_idea_details',
    question:'A pupil writes a paragraph about the low cost, the exercise and the cleaner air of cycling to school, but has not yet written the first sentence. Which TOPIC sentence fits best?',
    options:['Cycling to school brings several benefits.','Cycling to school is cheaper than the bus.','Cycling to school is popular in Rose Hill.','Cycling to school takes about twenty minutes.'],
    answer:'Cycling to school brings several benefits.',
    hint:'A topic sentence must cover every idea in the paragraph, not just one of them.',
    explanation:'Only "several benefits" covers cost, exercise and cleaner air together. "Cheaper than the bus" names one benefit and leaves the other two homeless, while popularity and journey time are never discussed in the paragraph at all.' }),

  makeMCQ({ id:'g7eng-reading-015', chapterId:'g7eng-reading', difficulty:2,
    subsection:'main_idea_details',
    question:'Read: <i>"The dodo lived only in Mauritius. Sailors hunted it, and the pigs they brought ashore ate its eggs. It disappeared within a century."</i><br>What does <b>they</b> refer to?',
    options:['the sailors','the pigs','the eggs','the dodos'],
    answer:'the sailors',
    hint:'Ask who did the bringing. Pigs do not carry themselves ashore.',
    explanation:'"They" must name whoever brought the pigs, and that is the sailors. The pigs are what was brought, the eggs are what was eaten, and the dodos are the victims — none of them can be the subject of "brought".' }),

  makeMCQ({ id:'g7eng-reading-016', chapterId:'g7eng-reading', difficulty:2,
    subsection:'inferring_vocabulary',
    question:'Read: <i>"The speaker\'s microphone failed and his voice was inaudible at the back of the hall."</i><br>What does <b>inaudible</b> mean?',
    options:['not able to be heard','not able to be seen','too loud to bear','clear and steady'],
    answer:'not able to be heard',
    hint:'Split the word up: "in-" reverses the meaning, and "audi-" is about hearing.',
    explanation:'The prefix "in-" means "not" and "audi-" concerns hearing, so an inaudible voice cannot be heard — which is exactly what a failed microphone causes. Seeing is the wrong sense, and a broken microphone makes a voice fainter, not louder or clearer.' }),

  makeMCQ({ id:'g7eng-reading-017', chapterId:'g7eng-reading', difficulty:3,
    subsection:'inferring_vocabulary',
    question:'Read: <i>"As the final whistle came closer, the crowd at the stadium swelled until latecomers had to stand."</i><br>What does <b>swelled</b> mean here?',
    options:['grew larger in number','became sore and puffy','shouted more loudly','moved towards the exit'],
    answer:'grew larger in number',
    hint:'Latecomers had to stand. What had happened to the number of people?',
    explanation:'"Swelled" here means the crowd grew in size, which is why no seats were left. The medical sense, "sore and puffy", fits an injured ankle rather than a crowd, and neither extra noise nor people leaving would use up the seats.' }),

  makeText({ id:'g7eng-reading-018', chapterId:'g7eng-reading', difficulty:2,
    subsection:'inferring_vocabulary',
    question:'Read: <i>"Rain was falling, the bus was late and his shoes were soaked, yet Yash remained cheerful all the way to school."</i><br>Write ONE word that means the OPPOSITE of <b>cheerful</b>.',
    answer:'miserable',
    alsoAccept:['sad','unhappy','gloomy','glum','grumpy','downcast','upset','depressed'],
    hint:'Think how most people would feel on a morning like Yash\'s.',
    explanation:'"Cheerful" means happy, so its opposite is <b>miserable</b> (sad, gloomy, unhappy). The word "yet" is your clue: it tells you Yash did NOT feel the way a wet, late morning would normally make someone feel.' }),

  makeMCQ({ id:'g7eng-reading-019', chapterId:'g7eng-reading', difficulty:3,
    subsection:'main_idea_details',
    question:'Read: <i>"Mrs Appadu unlocked the shop at half past five, swept the pavement and had the bread on the shelves before the first customer arrived at six."</i><br>What can you CONCLUDE about Mrs Appadu?',
    options:['She prepares before opening','She sells only fresh bread','She lives above the shop','She has one customer daily'],
    answer:'She prepares before opening',
    hint:'Everything in the sentence happens before six o\'clock. Why would that be?',
    explanation:'The sweeping and the stocking are all finished before the first customer arrives, so she clearly prepares in advance — that is what the passage lets you conclude. It never says bread is her only stock, where she lives, or how many customers come in a day.' }),

  makeMCQ({ id:'g7eng-reading-020', chapterId:'g7eng-reading', difficulty:3,
    subsection:'main_idea_details',
    question:'Read: <i>"Preheat the oven. Sift the flour into a bowl. Add the sugar slowly, then beat for two minutes."</i><br>What TYPE of text is this?',
    options:['A set of instructions','A newspaper report','A personal diary','A short story'],
    answer:'A set of instructions',
    hint:'Look at the verbs and ask who they are addressed to.',
    explanation:'Every sentence begins with a command verb and the steps come in order, which is the shape of instructions or a recipe. A report would tell you what happened, a diary would use "I", and a story would give you characters and events.' })

);
