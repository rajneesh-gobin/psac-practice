'use strict';
// Grade 6 English - present and past verb forms chosen from sentence context.
(function () {
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-tense-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-verbs', subsection: `${section}_tense`, difficulty: 3,
    question: r[0], options: r[1], answer: r[2], hint: r[3], explanation: r[4]
  })));

  add('past', [
    ['Choose the correct past form: “Yesterday, the wind ___ several branches.”',['blew down','blows down','blown down','blow down'],'blew down','“Yesterday” requires a completed past action.','<b>Blew down</b> is the simple past of “blow down”.'],
    ['Choose the correct past form: “The bell ___ before we reached the gate.”',['had rung','has rang','was ring','rings'],'had rung','One past action happened before another past action.','<b>Had rung</b> is past perfect and marks the earlier event.'],
    ['Choose the correct past form: “While I ___, the lights went out.”',['was reading','read tomorrow','am reading','have read'],'was reading','The longer action was already in progress.','<b>Was reading</b> is past continuous for the interrupted action.'],
    ['Choose the correct past form: “The pupils ___ quietly when the visitor entered.”',['were working','was working','are working','have work'],'were working','The plural subject was doing an ongoing action.','<b>Were working</b> agrees with “pupils” in the past continuous.'],
    ['Choose the correct past form: “Mina ___ her keys, so she could not unlock the door.”',['had lost','has lose','loses','will lose'],'had lost','The loss happened before she tried the door.','<b>Had lost</b> clearly shows the earlier past event.'],
    ['Choose the correct past form: “Last Saturday, we ___ to Mahébourg.”',['drove','driven','drive','drives'],'drove','Use the irregular simple past of “drive”.','<b>Drove</b> is the simple past of “drive”.'],
    ['Choose the correct past form: “The athlete ___ the record in 2025.”',['broke','broken','breaks','was break'],'broke','A dated, completed event uses simple past.','<b>Broke</b> is the simple past of “break”.'],
    ['Choose the correct past form: “By noon, the volunteers ___ the beach clean-up.”',['had completed','have completing','were complete','complete'],'had completed','The task finished before a stated time in the past.','<b>Had completed</b> is past perfect.'],
    ['Choose the correct past form: “When the rain began, the children ___ football.”',['were playing','played tomorrow','are played','had play'],'were playing','An ongoing action was interrupted by the rain.','<b>Were playing</b> is the appropriate past continuous form.'],
    ['Choose the correct past form: “She ___ the answer but waited before speaking.”',['knew','known','knows yesterday','was know'],'knew','Use the irregular simple past of “know”.','<b>Knew</b> is the simple past of “know”.'],
    ['Choose the correct past form: “The ferry ___ ten minutes late this morning.”',['arrived','arrives','has arrive','was arriving tomorrow'],'arrived','A finished event at a definite past time uses simple past.','<b>Arrived</b> is the regular simple-past form.'],
    ['Choose the correct past form: “We ___ that film twice before the class discussed it.”',['had seen','have saw','were see','see'],'had seen','The viewing happened before the past discussion.','<b>Had seen</b> expresses the earlier past experience.'],
    ['Choose the correct past form: “As the guide spoke, I ___ notes.”',['was taking','took tomorrow','have taken','am taking'],'was taking','The note-taking continued during another past action.','<b>Was taking</b> is past continuous.'],
    ['Choose the correct past form: “The glass slipped and ___ on the floor.”',['broke','breaks','broken','was breaking always'],'broke','Both actions are completed events in sequence.','<b>Broke</b> is the simple past needed after “slipped”.'],
    ['Choose the correct past form: “They ___ the warning because the radio was off.”',['did not hear','did not heard','had not hear','do not heard'],'did not hear','After “did not”, use the base verb.','<b>Did not hear</b> correctly forms the simple-past negative.'],
    ['Choose the correct past question.',['Where did you find the shell?','Where did you found the shell?','Where you did find the shell?','Where do you found the shell?'],'Where did you find the shell?','Use did + subject + base verb.','<b>Did you find</b> has the correct question order and verb form.'],
    ['Choose the correct past form: “Neither team ___ a goal before half-time.”',['had scored','have scored','were score','scores'],'had scored','The scoring deadline is a time in the past.','<b>Had scored</b> means no goal was completed before half-time.'],
    ['Choose the sentence with consistent past tenses.',['The guide opened the gate and led us inside.','The guide opens the gate and led us inside.','The guide had open the gate and leads us inside.','The guide opening the gate and lead us inside.'],'The guide opened the gate and led us inside.','Both completed actions belong to the same past sequence.','<b>Opened</b> and <b>led</b> are consistent simple-past forms.']
  ]);

  add('present', [
    ['Choose the correct present form: “Water ___ at 100°C at sea level.”',['boils','is boiling yesterday','boil','has boiled tomorrow'],'boils','General scientific facts use the simple present.','<b>Boils</b> expresses a general fact and agrees with “water”.'],
    ['Choose the correct present form: “Listen! Someone ___ at the door.”',['is knocking','knocks yesterday','knocked tomorrow','has knock'],'is knocking','“Listen!” points to an action happening now.','<b>Is knocking</b> is present continuous.'],
    ['Choose the correct present form: “My cousins usually ___ us during the holidays.”',['visit','visits','are visit','has visited'],'visit','“Usually” signals a habit, and the subject is plural.','<b>Visit</b> is simple present and agrees with “cousins”.'],
    ['Choose the correct present form: “She ___ in this school since January.”',['has studied','studied tomorrow','is study','have studied'],'has studied','The action began in the past and continues now.','<b>Has studied</b> is present perfect with the singular subject “she”.'],
    ['Choose the correct present form: “The children ___ a model volcano at the moment.”',['are building','builds','has built yesterday','were build'],'are building','“At the moment” means the action is happening now.','<b>Are building</b> is present continuous and agrees with the plural subject.'],
    ['Choose the correct present form: “Neither of the answers ___ correct.”',['is','are','be','have'],'is','The subject “neither” is singular.','<b>Is</b> agrees with the singular subject “neither”.'],
    ['Choose the correct present form: “Every morning, Ravi ___ the plants.”',['waters','water','is water','have watered'],'waters','A repeated routine uses simple present.','<b>Waters</b> agrees with the singular subject “Ravi”.'],
    ['Choose the correct present form: “I ___ this book, so you may borrow it.”',['have finished','has finished','am finish','finished tomorrow'],'have finished','The completed action has a result now.','<b>Have finished</b> is present perfect with “I”.'],
    ['Choose the correct present form: “The bus ___ at seven every weekday.”',['leaves','leave','is leave','have left'],'leaves','A regular timetable uses simple present.','<b>Leaves</b> agrees with the singular subject “bus”.'],
    ['Choose the correct present form: “Why ___ you laughing?”',['are','is','do being','has'],'are','The -ing verb needs the correct form of “be”.','<b>Are you laughing?</b> is the correct present-continuous question.'],
    ['Choose the correct present form: “The news ___ surprising.”',['is','are','were always','have'],'is','“News” looks plural but is grammatically singular.','<b>Is</b> agrees with the singular mass noun “news”.'],
    ['Choose the correct present form: “We ___ three experiments so far today.”',['have completed','has completed','complete yesterday','are complete'],'have completed','“So far” links completed actions to the present.','<b>Have completed</b> is present perfect with “we”.'],
    ['Choose the correct present form: “This soup ___ delicious.”',['tastes','is tasting always','taste','have tasted'],'tastes','A linking verb describes the soup’s present quality.','<b>Tastes</b> is simple present and agrees with “soup”.'],
    ['Choose the correct present negative: “A compass ___ south by default.”',['does not point','does not points','is not point','not points'],'does not point','After “does not”, use the base form.','<b>Does not point</b> correctly forms the simple-present negative.'],
    ['Choose the sentence with consistent present tenses.',['The teacher explains the task while we listen.','The teacher explained the task while we listen tomorrow.','The teacher explain the task while we listens.','The teacher is explain the task while we listened.'],'The teacher explains the task while we listen.','Check agreement and keep the two simultaneous actions in one time frame.','<b>Explains</b> and <b>listen</b> are consistent present-tense forms.']
  ]);
})();
