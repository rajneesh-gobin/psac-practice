'use strict';
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-listening-012', chapterId:'g8eng-listening', difficulty:2,
    subsection:'fact_opinion',
    question:'A speaker on the radio says: <i>"Nine out of ten pupils in Mauritius would rather learn online than in a classroom."</i><br>Why should a careful listener <b>not</b> accept this as a fact yet?',
    options:['No source is given for the figure','The figure is a very large number','The speaker is talking on radio','The sentence contains no verb'],
    answer:'No source is given for the figure',
    hint:'A number sounds solid, but ask yourself who counted, and when.',
    explanation:'A statistic becomes a fact only once it can be traced to a survey someone else could check. The size of the number tells you nothing about its truth, the medium is irrelevant, and the sentence does contain a verb.' }),

  makeMCQ({ id:'g8eng-listening-013', chapterId:'g8eng-listening', difficulty:3,
    subsection:'fact_opinion',
    question:'A councillor says: <i>"The new bus route will cut the journey from Rose Hill to Curepipe by half."</i><br>What kind of statement is this?',
    options:['A prediction, not yet checkable','A fact recorded in a timetable','An instruction given to drivers','A summary of the whole debate'],
    answer:'A prediction, not yet checkable',
    hint:'Has the thing being described already happened?',
    explanation:'The route has not run yet, so there is nothing to measure it against: a claim about the future is a prediction. No timetable records it, it tells nobody to do anything, and it condenses no earlier talk.' }),

  makeText({ id:'g8eng-listening-014', chapterId:'g8eng-listening', difficulty:3,
    subsection:'fact_opinion',
    question:'A speaker says: <i>"Rodrigues is part of the Republic of Mauritius, and it is the loveliest island on earth."</i><br>Write the <b>one word</b> from the extract that most clearly marks the opinion.',
    answer:'loveliest', alsoAccept:['the loveliest','loveliest island'],
    hint:'Look for the word another person could argue with.',
    explanation:'"Loveliest" is a judgement — someone could rate a different island higher. Every other word states something a map or a law would confirm, so the opinion sits in that single superlative.' }),

  makeMCQ({ id:'g8eng-listening-015', chapterId:'g8eng-listening', difficulty:2,
    subsection:'summarising',
    question:'A speaker describes how her school built a vegetable garden, and mentions in passing that it rained on the opening day.<br>Which detail should a <b>summary</b> leave out?',
    options:['That it rained on opening day','That the school built a garden','That the garden grows vegetables','That the garden was opened'],
    answer:'That it rained on opening day',
    hint:'Which detail changes nothing if you remove it?',
    explanation:'The weather is an aside: drop it and the account still makes sense. The other three carry the main idea — who did it, what was grown and that it opened — so losing any of them would leave the summary incomplete.' }),

  makeMCQ({ id:'g8eng-listening-016', chapterId:'g8eng-listening', difficulty:3,
    subsection:'summarising',
    question:'Ravi argues that the school day should start later. Kavi argues it should start earlier so that pupils finish before the heat.<br>Which summary of the exchange is <b>best</b>?',
    options:['The two disagree on start time','Ravi and Kavi discussed school','Kavi wants to avoid the hot sun','Ravi made the stronger argument'],
    answer:'The two disagree on start time',
    hint:'A summary of a discussion must carry what BOTH speakers said.',
    explanation:'Only this option reports both positions and what divides them. "Discussed school" is too vague to be useful, the third keeps one speaker and loses the other, and the fourth adds a judgement the listener has invented.' }),

  makeMCQ({ id:'g8eng-listening-017', chapterId:'g8eng-listening', difficulty:3,
    subsection:'summarising',
    question:'A pupil is asked to summarise a five-minute talk and writes twelve sentences, repeating each of the speaker\'s examples in turn.<br>What is wrong with this?',
    options:['It retells rather than condenses','It uses the wrong tense throughout','It leaves out the speaker\'s name','It contains far too many opinions'],
    answer:'It retells rather than condenses',
    hint:'How long should a summary be next to the original?',
    explanation:'A summary must be shorter than what it summarises, so keeping every example makes it a retelling. No tense error is described, a summary need not name the speaker, and repeating someone faithfully adds no opinion.' }),

  makeMCQ({ id:'g8eng-listening-018', chapterId:'g8eng-listening', difficulty:4,
    subsection:'summarising',
    question:'Speaker A: <i>"Free tablets would help every pupil study at home."</i><br>Speaker B: <i>"Tablets help only if the family has data."</i><br>What is the <b>point of disagreement</b>?',
    options:['Whether tablets alone are enough','Whether pupils should study home','Whether tablets cost too much money','Whether every school has a library'],
    answer:'Whether tablets alone are enough',
    hint:'B does not say tablets are useless — read carefully what B adds.',
    explanation:'B accepts that tablets can help but makes that help conditional on data, so the dispute is about sufficiency, not usefulness. Cost and libraries are never mentioned, and both speakers take home study for granted.' }),

  makeMCQ({ id:'g8eng-listening-019', chapterId:'g8eng-listening', difficulty:2,
    subsection:'summarising',
    question:'A pupil summarises a talk on plastic waste and ends: <i>"…and I think the speaker was completely right."</i><br>Why does this spoil the summary?',
    options:['It adds the listener\'s own view','It repeats the speaker word for word','It uses a sentence that is too short','It names the topic a second time'],
    answer:'It adds the listener\'s own view',
    hint:'A summary reports; it does not judge.',
    explanation:'A summary must carry only what the speaker said. Agreeing is the listener\'s opinion and belongs in a response instead. Nothing here is quoted word for word, the sentence is a normal length, and the topic is named once.' })

);
