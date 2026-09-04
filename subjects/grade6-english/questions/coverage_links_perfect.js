'use strict';
(function () {
  const add=(chapter,sub,id,question,answer,wrong,hint,explanation)=>STATIC_QUESTIONS.push(makeMCQ({
    id:`g6eng-context-${sub}-${id}`,chapterId:chapter,subsection:sub,difficulty:3,
    question,options:[answer,...wrong],answer,hint,explanation}));
  const links=[
    ['The match continued ___ the rain was heavy.','although',['because','so that','unless'],'contrast','The match continuing is unexpected in heavy rain.'],
    ['The seedlings died ___ nobody watered them.','because',['although','unless','so that'],'reason','The lack of water explains why the seedlings died.'],
    ['Take a torch ___ you can see the path after sunset.','so that',['although','because','unless'],'purpose','Seeing the path is the purpose of taking a torch.'],
    ['You cannot borrow the book ___ you return the overdue one.','unless',['because','although','so that'],'condition meaning “except if”','Returning the overdue book is the condition for borrowing another.'],
    ['Wash the fruit ___ you eat it.','before',['although','because','unless'],'time: washing must happen first','Before puts washing earlier than eating.'],
    ['We waited inside ___ the storm ended.','until',['because','although','so that'],'time: waiting ended at that point','Until marks the point when the waiting stopped.'],
    ['___ the bus was late, the pupils arrived before the bell.','Although',['Because','Unless','So that'],'contrast','Arriving before the bell is unexpected when the bus is late.'],
    ['The floor was wet, ___ the caretaker put up a warning sign.','so',['although','unless','before'],'result','The warning sign was a result of the wet floor.'],
    ['___ the rain stops, we will begin the outdoor activity.','If',['Although','Because','So that'],'a possible condition, not a definite reason','If makes the outdoor activity depend on the rain stopping.'],
    ['Leena read the instructions ___ she assembled the model.','before',['although','unless','because'],'time: reading happened first','Before places reading ahead of assembly.'],
    ['The pupils spoke softly ___ the baby would not wake up.','so that',['although','unless','because'],'purpose','Keeping the baby asleep was the purpose of speaking softly.'],
    ['We could not use the computer ___ the electricity supply had failed.','because',['although','unless','so that'],'reason','The power failure explains why the computer could not be used.'],
    ['___ the bag looked small, it held all the equipment.','Although',['Because','Unless','So that'],'contrast','Holding all the equipment contrasts with looking small.'],
    ['You will miss the rehearsal ___ you leave now.','unless',['because','although','so that'],'condition meaning “if you do not”','Unless you leave now means if you do not leave now.'],
    ['The class checked every window ___ they locked the room.','before',['although','unless','because'],'time: checking came first','Before shows that checking the windows preceded locking the room.'],
    ['The road was blocked, ___ the driver chose another route.','so',['although','unless','until'],'result','Choosing another route resulted from the blocked road.'],
    ['I will keep your painting safe ___ you collect it.','until',['although','because','so that'],'time: keeping it safe continues up to collection','Until links the action to the time when you collect it.'],
    ['The team practised daily ___ it wanted to improve its passing.','because',['although','unless','so that'],'reason','Wanting to improve explains why the team practised.'],
    ['___ you need assistance, raise your hand.','If',['Although','Because','So that'],'condition for raising your hand','Raise your hand on the condition that you need assistance.'],
    ['Amir labelled each container ___ the younger pupils could sort the materials.','so that',['although','unless','because'],'purpose','Helping the younger pupils sort materials was the purpose of the labels.']
  ];
  links.forEach(([sentence,answer,wrong,relation,why],i)=>add('g6eng-clauses','conjunctions',i,
    `Choose the linking word or phrase that expresses <b>${relation}</b>: “${sentence}”`,answer,wrong,
    `Look for a link expressing ${relation}.`,`${why} Use <b>${answer}</b>: “${sentence.replace('___',answer)}”`));
  const perfect=[
    ['By the time the visitors arrived, the pupils had ___ their display.','finish','finished',['finish','finishing','finishes'],'past','The display was completed before the visitors arrived.'],
    ['Rina has already ___ the invitation to her aunt.','write','written',['wrote','writing','writes'],'present','Already describes a completed action connected with the present.'],
    ['Before the lesson began, the caretaker had ___ the windows.','open','opened',['open','opening','opens'],'past','Opening happened before the lesson began.'],
    ['The children have ___ all the ripe mangoes from the basket.','eat','eaten',['ate','eating','eats'],'present','The completed action has a present result: the ripe mangoes are gone.'],
    ['By noon yesterday, our group had ___ the missing labels.','find','found',['find','finding','finds'],'past','Finding the labels was completed before a stated past time.'],
    ['I have never ___ such a tall waterfall before.','see','seen',['saw','seeing','sees'],'present','Never before describes experience up to now.'],
    ['When the teacher checked, Ali had already ___ the broken ruler away.','throw','thrown',['threw','throwing','throws'],'past','Throwing the ruler away happened before the teacher checked.'],
    ['The school has ___ a new reading club this term.','start','started',['start','starting','starts'],'present','This term connects the completed action to the current period.'],
    ['The bus had ___ before we reached the stop.','leave','left',['leave','leaving','leaves'],'past','The departure happened before our arrival at the stop.'],
    ['Our team has ___ three matches so far this season.','win','won',['win','winning','wins'],'present','So far refers to achievements up to the present.'],
    ['Before the race began, the runners had ___ some water.','drink','drunk',['drank','drinking','drinks'],'past','Drinking happened before another past action.'],
    ['Meera has ___ her library book back today.','bring','brought',['bring','bringing','brings'],'present','The book is now back: this is a present result.'],
    ['The flowers had ___ before the gardener returned.','grow','grown',['grew','growing','grows'],'past','The growth happened before the gardener returned.'],
    ['We have ___ the same science experiment twice this week.','do','done',['did','doing','does'],'present','Twice this week counts completed actions in the current period.'],
    ['By the time Mum called, I had ___ my muddy shoes.','remove','removed',['remove','removing','removes'],'past','Removing the shoes happened before Mum called.'],
    ['The artist has ___ a bright mural on the school wall.','paint','painted',['paint','painting','paints'],'present','The finished mural can now be seen on the wall.'],
    ['Before the storm struck, the family had ___ all the loose chairs indoors.','take','taken',['took','taking','takes'],'past','Moving the chairs happened before the storm struck.'],
    ['The pupils have ___ a new ending for the story.','choose','chosen',['chose','choosing','chooses'],'present','The choice has been made and the new ending is now available.'],
    ['When the alarm rang, the caretaker had already ___ the main gate.','shut','shut',['shutted','shutting','shuts'],'past','Closing the gate happened before the alarm rang.'],
    ['I have ___ my spelling list, so I can practise without looking.','learn','learned',['learn','learning','learns'],'present','Learning the list has a present result. Learnt is also a standard participle, but is not one of these options.']
  ];
  perfect.forEach(([sentence,verb,answer,wrong,tense,why],i)=>add('g6eng-verbs','perfect',i,
    `Complete the ${tense} perfect verb phrase using the correct form of <b>${verb}</b>: “${sentence}”`,answer,wrong,
    'After has, have or had, use the past participle, not the -ing form or a simple-past form that differs from it.',
    `${why} The ${tense} perfect uses ${tense==='past'?'had':'has or have'} + past participle. The participle of ${verb} is <b>${answer}</b>.`));
})();
