'use strict';
// Grade 6 English - mixed verb cloze and continuous-tense reasoning.
(function () {
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-vcc-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-verbs', subsection: section, difficulty: 3,
    question: r[0], options: r[1], answer: r[2], hint: r[3], explanation: r[4]
  })));

  add('continuous', [
    ['Choose the correct form: “Please be quiet; the baby ___.”',['is sleeping','sleeps yesterday','was sleep','has sleeping'],'is sleeping','The action is happening at this moment.','<b>Is sleeping</b> is the present continuous form.'],
    ['Choose the correct form: “At eight last night, we ___ dinner.”',['were eating','are eating','have ate','will eating'],'were eating','The action was in progress at a stated past time.','<b>Were eating</b> is past continuous and agrees with “we”.'],
    ['Choose the correct form: “This time tomorrow, I ___ my final test.”',['will be taking','was taking','have taken','will taking'],'will be taking','The action will be in progress at a future time.','<b>Will be taking</b> is future continuous.'],
    ['Choose the correct form: “While Mina was cooking, her brother ___ the table.”',['was setting','is setting','has set tomorrow','were setting'],'was setting','Two background actions were happening at the same time.','<b>Was setting</b> matches the singular subject and ongoing past context.'],
    ['Choose the correct form: “Look! The tide ___ quickly.”',['is rising','rises yesterday','was risen','has rise'],'is rising','“Look!” signals a changing action happening now.','<b>Is rising</b> is present continuous.'],
    ['Choose the correct form: “When the teacher entered, the pupils ___.”',['were talking','are talking','have talk','will talked'],'were talking','The conversation was already in progress.','<b>Were talking</b> is past continuous for the interrupted action.'],
    ['Choose the correct question: “___ you waiting for the bus now?”',['Are','Do being','Have be','Were tomorrow'],'Are','Present continuous questions begin with the correct form of “be”.','<b>Are you waiting?</b> has the correct auxiliary and order.'],
    ['Choose the correct negative form: “She ___ today because she is ill.”',['is not working','does not working','not is work','was not work'],'is not working','Use is not + verb-ing for a temporary present situation.','<b>Is not working</b> is the correct present-continuous negative.'],
    ['Choose the correct form: “At noon yesterday, the rain ___ heavily.”',['was falling','is falling','has fell','were falling'],'was falling','A singular mass noun takes “was” in past continuous.','<b>Was falling</b> agrees with “rain” and shows an ongoing past action.'],
    ['Choose the correct form: “During next week’s trip, we ___ at a guesthouse.”',['will be staying','were staying','have stay','will stayed'],'will be staying','The stay will continue over a future period.','<b>Will be staying</b> expresses an ongoing future arrangement.'],
    ['Which sentence describes a temporary situation?',['I am staying with my aunt this week.','I stay with my aunt every July.','I stayed with my aunt last year.','I have stayed there twice.'],'I am staying with my aunt this week.','Present continuous often marks a temporary situation around now.','<b>Am staying</b> plus “this week” describes a temporary arrangement.'],
    ['Choose the correct form: “The students ___ more confident as the course continues.”',['are becoming','becomes yesterday','has became','were become'],'are becoming','The change is developing over time now.','<b>Are becoming</b> expresses a gradual present change.'],
    ['Choose the correct form: “I ___ when the alarm interrupted me.”',['was studying','am studying','have study','will studied'],'was studying','The longer background action was interrupted.','<b>Was studying</b> is past continuous.'],
    ['Choose the correct form: “At this hour next Monday, the team ___ to Rodrigues.”',['will be flying','was flying','has flown yesterday','will flying'],'will be flying','The flight will be in progress at a stated future moment.','<b>Will be flying</b> is the future continuous form.'],
    ['Choose the correct form: “Why ___ the children laughing when you arrived?”',['were','was','are tomorrow','have be'],'were','The plural action was ongoing when another past event occurred.','<b>Were</b> correctly begins the past-continuous question.'],
    ['Choose the sentence with a correct continuous tense.',['The mechanic is repairing the bicycle now.','The mechanic is repair the bicycle now.','The mechanic repairing the bicycle now.','The mechanic does repairing the bicycle now.'],'The mechanic is repairing the bicycle now.','Continuous tense requires be + verb-ing.','<b>Is repairing</b> has the correct present-continuous structure.'],
    ['Choose the correct form: “From two until four yesterday, they ___ the hall.”',['were decorating','are decorating','have decorated tomorrow','was decorating'],'were decorating','The activity continued through a past time period.','<b>Were decorating</b> agrees with “they” in past continuous.'],
    ['Choose the correct form: “Do not phone at nine; we ___ the performance.”',['will be watching','watched','have watched yesterday','will watching'],'will be watching','The activity will be underway at nine.','<b>Will be watching</b> is future continuous.']
  ]);

  add('cloze', [
    ['Complete the sentence: “If you heat ice, it ___.”',['melts','melted tomorrow','will melted','is melt'],'melts','A zero conditional states a general result in simple present.','<b>Melts</b> states the general scientific result.'],
    ['Complete the sentence: “By the time we arrived, the show ___.”',['had begun','has begin','was began','begins'],'had begun','The show started before another past action.','<b>Had begun</b> marks the earlier past event.'],
    ['Complete the sentence: “Neither the coach nor the players ___ ready.”',['were','was','is','has'],'were','With “neither…nor”, the verb commonly agrees with the nearer subject.','<b>Were</b> agrees with the nearer plural noun “players”.'],
    ['Complete the sentence: “The equipment ___ checked every morning.”',['is','are','have','do'],'is','“Equipment” is an uncountable singular noun in a passive sentence.','<b>Is checked</b> correctly agrees with “equipment”.'],
    ['Complete the sentence: “She would have joined us if she ___ about the trip.”',['had known','has knew','would know','was knowing'],'had known','A past unreal condition uses past perfect after “if”.','<b>Had known</b> correctly forms the third conditional.'],
    ['Complete the sentence: “The principal asked whether we ___ the notice.”',['had read','have read tomorrow','are read','will reading'],'had read','The reading happened before the past act of asking.','<b>Had read</b> shows the earlier past action.'],
    ['Complete the sentence: “Each of the boxes ___ a different label.”',['has','have','are having always','were have'],'has','The true subject is the singular word “each”.','<b>Has</b> agrees with “each”.'],
    ['Complete the sentence: “Unless the rain stops, the match ___ cancelled.”',['will be','will being','is been','was be'],'will be','“Unless” introduces the condition; use a future passive result.','<b>Will be cancelled</b> is the correct future passive form.'],
    ['Complete the sentence: “I wish I ___ the answer.”',['knew','know tomorrow','will knew','am knowing'],'knew','After “wish” about a present unreal situation, use a past form.','<b>Knew</b> expresses the unreal present wish.']
  ]);
})();
