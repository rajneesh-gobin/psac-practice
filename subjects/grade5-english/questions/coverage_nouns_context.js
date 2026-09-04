'use strict';
(function () {
  const add=(sub,id,question,options,answer,hint,explanation)=>STATIC_QUESTIONS.push(makeMCQ({
    id:`g5eng-context-${sub}-${id}`,chapterId:'eng-nouns',subsection:sub,difficulty:2,
    question,options,answer,hint,explanation}));
  const plurals=[
    ['The gardener planted six ___.','bush','bushes',['bushs','bushies','bush'],'Add -es after -sh.'],
    ['We packed our lunch in three ___.','box','boxes',['boxs','boxies','box'],'Add -es after -x.'],
    ['Two ___ stopped outside the school.','bus','buses',['buss','busies','bus'],'Add -es to bus.'],
    ['The cook washed the dirty ___.','dish','dishes',['dishs','dishies','dish'],'Add -es after -sh.'],
    ['Our team played four ___ in the tournament.','match','matches',['matchs','matchies','match'],'Add -es after -ch.'],
    ['Three ___ were asleep in their cots.','baby','babies',['babys','babyes','baby'],'After a consonant, change final y to ies.'],
    ['The pupils borrowed two adventure ___.','story','stories',['storys','storyes','story'],'The y follows a consonant: change y to ies.'],
    ['We visited two coastal ___ during the holidays.','city','cities',['citys','cityes','city'],'Change consonant + y to consonant + ies.'],
    ['Five ___ waved from the doorway.','lady','ladies',['ladys','ladyes','lady'],'The d before y is a consonant: use ies.'],
    ['The library has three English ___.','dictionary','dictionaries',['dictionarys','dictionaryes','dictionary'],'Change final y to ies after a consonant.'],
    ['The children put their ___ in a cupboard.','toy','toys',['toies','toyes','toy'],'Keep y after a vowel and add s.'],
    ['The caretaker carries several ___ on a ring.','key','keys',['keies','keyes','key'],'The e before y is a vowel: simply add s.'],
    ['Two ___ carried the heavy basket.','boy','boys',['boies','boyes','boy'],'Keep y after the vowel o and add s.'],
    ['The teacher took three ___ of the model.','photo','photos',['photoes','photoies','photo'],'Photo normally takes s, not es.'],
    ['There are two ___ in the music room.','piano','pianos',['pianoes','pianies','piano'],'Piano normally takes s.'],
    ['Six ___ waited for the school bus.','child','children',['childs','childes','childrens'],'Child has the irregular plural children.'],
    ['The dentist checked all of my ___.','tooth','teeth',['tooths','toothes','teeths'],'The vowel changes in this irregular plural.'],
    ['Both of my ___ were wet after the walk.','foot','feet',['foots','footes','feets'],'Foot changes to feet in the plural.'],
    ['The farmer counted three ___ beside the barn.','mouse','mice',['mouses','mousees','mices'],'Mouse has the irregular plural mice.'],
    ['Two ___ spoke to the headteacher.','woman','women',['womans','womanes','womens'],'Woman changes to women, without adding s.']
  ];
  plurals.forEach(([sentence,singular,answer,wrong,rule],i)=>add('plurals',i,
    `Choose the plural of <b>${singular}</b> to complete this sentence: “${sentence}”`,[answer,...wrong],answer,
    'The sentence refers to more than one. Check the spelling of the plural.',`${rule} The correct form is <b>${answer}</b>: “${sentence.replace('___',answer)}”`));
  const pronouns=[
    ['Maya is my sister. ___ enjoys drawing.','She',['Her','Hers','Herself'],'Use a subject pronoun for Maya.'],
    ['Ravi is my brother. I gave ___ a new pencil.','him',['he','his','himself'],'The pronoun receives the pencil, so use an object pronoun.'],
    ['The two puppies are hungry. ___ need food.','They',['Them','Their','Theirs'],'The puppies are doing the action; use a plural subject pronoun.'],
    ['These books belong to Sara. They are ___.','hers',['her','she','herself'],'Use a possessive pronoun without a noun after it.'],
    ['This bicycle belongs to me. It is ___.','mine',['my','me','myself'],'Mine can stand alone; my must be followed by a noun.'],
    ['The badges belong to us. They are ___.','ours',['our','us','ourselves'],'Use the possessive pronoun meaning belonging to us.'],
    ['The teacher spoke to Anil and me. She asked ___ to wait.','us',['we','our','ours'],'Anil and me are the people receiving the request.'],
    ['The twins made the paper boat by ___.','themselves',['them','their','theirs'],'The twins made it without help: use a plural reflexive pronoun.'],
    ['I tied my shoelaces by ___.','myself',['me','mine','my'],'The person doing the action is also the person helped.'],
    ['Please give the ruler to Leena. It belongs to ___.','her',['she','hers','herself'],'After belongs to, use an object pronoun.'],
    ['My brother and I are ready. ___ can leave now.','We',['Us','Our','Ours'],'My brother and I form the subject of the sentence.'],
    ['The kite is stuck in a tree. Can you see ___?','it',['its','itself','they'],'Use a singular object pronoun for the kite.'],
    ['Those pencils belong to you. Are these also ___?','yours',['your','you','yourself'],'The missing word stands alone and shows ownership.'],
    ['Ali bought the paint, but the brushes belong to Ben. The brushes are ___.','his',['he','him','himself'],'The brushes belong to Ben: use the possessive pronoun for a boy.'],
    ['My aunt baked the cake by ___, without help.','herself',['her','hers','she'],'Without help points to a reflexive pronoun.'],
    ['The boys are at the gate. Please call ___.','them',['they','their','theirs'],'The boys receive the action of calling.'],
    ['This lunchbox belongs to you and your sister. It is ___.','yours',['your','you','yourselves'],'Yours can refer to something belonging to one or several people addressed.'],
    ['We painted the classroom mural by ___.','ourselves',['us','our','ours'],'The subject we needs the matching reflexive pronoun.'],
    ['Mum asked my sister and me to help. ___ carried the bags together.','We',['Us','Our','Ours'],'In the new sentence, my sister and I are doing the action.'],
    ['You have a message, Sam. The teacher wants to speak to ___.','you',['your','yours','yourself'],'After speak to, use the object pronoun for the person being addressed.']
  ];
  pronouns.forEach(([sentence,answer,wrong,rule],i)=>add('pronouns',i,
    `Choose the pronoun that fits: “${sentence}”`,[answer,...wrong],answer,
    'Decide whether the word names the doer, receives the action, or shows ownership.',`${rule} Write <b>${answer}</b>: “${sentence.replace('___',answer)}”`));
})();
