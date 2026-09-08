'use strict';
// @enrichment - Bonus chapter "Joining Sentences". DERIVED from the syllabus
// (conjunctions, relative pronouns, sentence types), NOT a direct MIE chapter.
// DO NOT remove during syllabus alignment audits.
//
// Grade 5 level: adds "whose" and "that", "although", "while", "since",
// "so that", and the comma rule that separates a fronted clause from the main
// clause. Grade 4 stays on who/which/where; Grade 6 adds non-defining clauses,
// "whereas", "despite" and participle joining.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'eng-enr-joining';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5eng-join-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Join the two sentences using « <b>${given}</b> ». `
        + `Make any changes that are needed.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · RELATIVE PRONOUNS ───────────────────────────────────────────────
  J('relative', 2, 'who', 'I thanked the woman.', 'The woman found my wallet.',
    'I thanked the woman who found my wallet.',
    ['I thanked the woman which found my wallet.',
     'I thanked the woman whose found my wallet.',
     'I thanked the woman who she found my wallet.'],
    '"who" replaces the subject and is used for people.',
    '<b>who</b> stands for the woman, who does the finding. Never add "she" after it.');

  J('relative', 3, 'whose', 'I met a boy.', 'The boy’s father is a fisherman.',
    'I met a boy whose father is a fisherman.',
    ['I met a boy who his father is a fisherman.',
     'I met a boy which father is a fisherman.',
     'I met a boy whose his father is a fisherman.'],
    '"whose" shows belonging.',
    '<b>whose</b> replaces "the boy’s" - the possessive. ⚠ We do not keep "his" as well.');

  J('relative', 3, 'that', 'The book was fascinating.', 'You lent me the book.',
    'The book that you lent me was fascinating.',
    ['The book who you lent me was fascinating.',
     'The book whose you lent me was fascinating.',
     'The book that you lent me the book was fascinating.'],
    '"that" can replace "which" for things.',
    '<b>that</b> works for things in a defining clause. The repeated noun is dropped.');

  J('relative', 2, 'where', 'This is the village.', 'My grandmother grew up in this village.',
    'This is the village where my grandmother grew up.',
    ['This is the village which my grandmother grew up.',
     'This is the village that my grandmother grew up.',
     'This is the village where my grandmother grew up in this village.'],
    'A place → "where", and the preposition goes too.',
    '<b>where</b> already contains the idea of "in", so "in this village" disappears.');

  J('relative', 3, 'which', 'The bridge was built in 1970.', 'We crossed the bridge.',
    'The bridge which we crossed was built in 1970.',
    ['The bridge who we crossed was built in 1970.',
     'The bridge whose we crossed was built in 1970.',
     'The bridge which we crossed the bridge was built in 1970.'],
    'The clause slots in before the main verb.',
    '"<b>which we crossed</b>" describes the bridge and sits between the noun and "was built".');

  J('relative', 3, 'whose', 'That is the girl.', 'The girl’s painting won the prize.',
    'That is the girl whose painting won the prize.',
    ['That is the girl who painting won the prize.',
     'That is the girl whose her painting won the prize.',
     'That is the girl which painting won the prize.'],
    'Something belongs to the girl.',
    '<b>whose</b> is the possessive relative pronoun: "the girl’s painting" → "the girl <b>whose</b> painting".');

  J('relative', 4, 'who', 'The pupils were praised.', 'The pupils had finished their work.',
    'The pupils who had finished their work were praised.',
    ['The pupils which had finished their work were praised.',
     'The pupils who they had finished their work were praised.',
     'The pupils were praised who had finished their work the pupils.'],
    'Only some pupils were praised - the clause must define which ones.',
    'The defining clause goes <b>immediately after</b> "the pupils", before the main verb "were praised".');

  J('relative', 3, 'that', 'I still use the dictionary.', 'My aunt gave me the dictionary.',
    'I still use the dictionary that my aunt gave me.',
    ['I still use the dictionary who my aunt gave me.',
     'I still use the dictionary whose my aunt gave me.',
     'I still use the dictionary that my aunt gave me the dictionary.'],
    'The dictionary is the object of "gave".',
    '<b>that</b> replaces the object, and the noun is not repeated.');

  J('relative', 2, 'where', 'I will show you the room.', 'We keep the books in that room.',
    'I will show you the room where we keep the books.',
    ['I will show you the room which we keep the books.',
     'I will show you the room whose we keep the books.',
     'I will show you the room where we keep the books in that room.'],
    'A room is a place.',
    '<b>where</b> replaces "in that room" completely.');

  J('relative', 4, 'whose', 'We visited a farmer.', 'The farmer’s fields were flooded.',
    'We visited a farmer whose fields were flooded.',
    ['We visited a farmer who fields were flooded.',
     'We visited a farmer which fields were flooded.',
     'We visited a farmer whose the fields were flooded.'],
    'The fields belong to the farmer.',
    '<b>whose</b> shows possession and is followed straight by the noun - no "the" in between.');

  // ── 2 · CAUSE & REASON ──────────────────────────────────────────────────
  J('cause', 2, 'because', 'The match was postponed.', 'The pitch was waterlogged.',
    'The match was postponed because the pitch was waterlogged.',
    ['Because the match was postponed, the pitch was waterlogged.',
     'The match was postponed, the pitch because was waterlogged.',
     'The pitch was waterlogged because the match was postponed.'],
    'Which fact explains the other?',
    'The waterlogged pitch is the <b>reason</b>, so it follows "because".');

  J('cause', 3, 'since', 'You already know the way.', 'You can lead us.',
    'Since you already know the way, you can lead us.',
    ['You can lead us since, you already know the way.',
     'Since you can lead us, you already know the way.',
     'You already know since the way, you can lead us.'],
    '"since" here means "as we both know…".',
    'When <b>since</b> gives a reason, it usually opens the sentence and is followed by a comma.');

  J('cause', 2, 'as', 'The roads were empty.', 'It was very early.',
    'The roads were empty as it was very early.',
    ['As the roads were empty, it was very early.',
     'The roads as were empty it was very early.',
     'It was very early as the roads were empty.'],
    'The early hour explains the empty roads.',
    '<b>as</b> introduces the reason, just like "because" but slightly more formal.');

  J('cause', 2, 'because', 'The museum is closed today.', 'A new exhibition is being installed.',
    'The museum is closed today because a new exhibition is being installed.',
    ['Because the museum is closed today, a new exhibition is being installed.',
     'The museum because is closed today a new exhibition is being installed.',
     'A new exhibition is being installed because the museum is closed today.'],
    'The exhibition is the reason.',
    'The reason follows <b>because</b>; the closure is the effect, not the cause.');

  J('cause', 3, 'since', 'Everyone has arrived.', 'We can begin the meeting.',
    'Since everyone has arrived, we can begin the meeting.',
    ['We can begin the meeting since, everyone has arrived.',
     'Since we can begin the meeting, everyone has arrived.',
     'Everyone has since arrived, we can begin the meeting.'],
    'A reason both people can see.',
    '<b>Since</b> opens with the known fact, then the conclusion follows after the comma.');

  J('cause', 3, 'as', 'We took a different route.', 'The main road was blocked.',
    'We took a different route as the main road was blocked.',
    ['As we took a different route, the main road was blocked.',
     'We took as a different route the main road was blocked.',
     'The main road was blocked as we took a different route.'],
    'The blockage came first.',
    'The blocked road is the <b>cause</b> of the detour, so it follows "as".');

  J('cause', 2, 'because', 'I could not phone you.', 'My battery was flat.',
    'I could not phone you because my battery was flat.',
    ['Because I could not phone you, my battery was flat.',
     'I could not because phone you my battery was flat.',
     'My battery was flat because I could not phone you.'],
    'A flat battery stops a phone call, not the other way round.',
    'The flat battery is the <b>reason</b> and follows "because".');

  J('cause', 3, 'since', 'You have finished your work.', 'You may go outside.',
    'Since you have finished your work, you may go outside.',
    ['You may go outside since, you have finished your work.',
     'Since you may go outside, you have finished your work.',
     'You have since finished your work, you may go outside.'],
    'The known fact opens the sentence.',
    '<b>Since</b> + known reason, comma, then the permission that follows from it.');

  J('cause', 2, 'because', 'The plants died.', 'Nobody watered them.',
    'The plants died because nobody watered them.',
    ['Because the plants died, nobody watered them.',
     'The plants because died nobody watered them.',
     'Nobody watered them because the plants died.'],
    'What caused what?',
    'The lack of water killed the plants: it is the <b>cause</b> and follows "because".');

  J('cause', 3, 'as', 'We set off early.', 'The journey was long.',
    'We set off early as the journey was long.',
    ['As we set off early, the journey was long.',
     'We set off as early the journey was long.',
     'The journey was long as we set off early.'],
    'The long journey is the reason.',
    '<b>as</b> introduces the reason for setting off early.');

  // ── 3 · CONTRAST ────────────────────────────────────────────────────────
  J('contrast', 3, 'although', 'It was raining.', 'They played outside.',
    'Although it was raining, they played outside.',
    ['Although it was raining they played outside although.',
     'It was raining although, they played outside.',
     'Although they played outside, it was raining.'],
    '"Although" opens the surprising fact, then a comma.',
    '<b>Although</b> introduces the idea we expect to stop the action; the comma separates the two clauses.');

  J('contrast', 3, 'although', 'The question looked easy.', 'Nobody answered it correctly.',
    'Although the question looked easy, nobody answered it correctly.',
    ['The question looked easy although, nobody answered it correctly.',
     'Although nobody answered it correctly, the question looked easy.',
     'The question looked although easy, nobody answered it correctly.'],
    'Which fact is the surprising one?',
    'The easy-looking question should have been answered: <b>although</b> marks that contrast.');

  J('contrast', 2, 'but', 'The gardener is tired.', 'He wants to finish his work.',
    'The gardener is tired, but he wants to finish his work.',
    ['But the gardener is tired, he wants to finish his work.',
     'The gardener but is tired he wants to finish his work.',
     'The gardener is tired, he wants but to finish his work.'],
    'Comma, then "but".',
    '<b>but</b> joins two contrasting ideas and never opens the sentence.');

  J('contrast', 4, 'however', 'She revised for weeks.', 'She did not pass the test.',
    'She revised for weeks; however, she did not pass the test.',
    ['However she revised for weeks she did not pass the test.',
     'She revised however for weeks, she did not pass however the test.',
     'She revised for weeks, however she did not pass the test however.'],
    '"however" needs a semicolon before it and a comma after it.',
    '⚠ <b>however</b> is not a conjunction like "but". It follows a semicolon (or a full stop) and takes a comma after it.');

  J('contrast', 3, 'although', 'The bag was small.', 'It held all my books.',
    'Although the bag was small, it held all my books.',
    ['The bag was small although, it held all my books.',
     'Although it held all my books, the bag was small.',
     'The bag was although small, it held all my books.'],
    'Small bags do not usually hold much.',
    '<b>Although</b> introduces the fact that makes the result surprising.');

  J('contrast', 3, 'while', 'My sister enjoys mathematics.', 'I prefer history.',
    'My sister enjoys mathematics, while I prefer history.',
    ['While my sister enjoys mathematics while I prefer history.',
     'My sister while enjoys mathematics, I prefer history.',
     'My sister enjoys mathematics, I prefer while history.'],
    'Here "while" contrasts two people.',
    '<b>while</b> can show contrast as well as time: one likes maths, the other history.');

  J('contrast', 2, 'but', 'The path looked short.', 'It took us an hour.',
    'The path looked short, but it took us an hour.',
    ['But the path looked short, it took us an hour.',
     'The path but looked short it took us an hour.',
     'The path looked short, it took but us an hour.'],
    'The result contradicts the appearance.',
    '<b>but</b> links the expectation and the reality.');

  J('contrast', 4, 'however', 'The bus was late.', 'We still arrived on time.',
    'The bus was late; however, we still arrived on time.',
    ['However the bus was late we still arrived on time.',
     'The bus was however late, we still arrived however on time.',
     'The bus was late, however we still arrived on time however.'],
    'Semicolon before, comma after.',
    '<b>however</b> is a linking adverb: "The bus was late<b>; however,</b> we still arrived on time."');

  J('contrast', 3, 'although', 'He knew the answer.', 'He said nothing.',
    'Although he knew the answer, he said nothing.',
    ['He knew the answer although, he said nothing.',
     'Although he said nothing, he knew the answer.',
     'He knew although the answer, he said nothing.'],
    'Knowing usually leads to answering.',
    '<b>Although</b> opens the clause that makes the silence unexpected.');

  J('contrast', 3, 'while', 'Some pupils prefer the sea.', 'Others prefer the mountains.',
    'Some pupils prefer the sea, while others prefer the mountains.',
    ['While some pupils prefer the sea while others prefer the mountains.',
     'Some pupils while prefer the sea, others prefer the mountains.',
     'Some pupils prefer the sea, others prefer while the mountains.'],
    'Two groups, two preferences.',
    '<b>while</b> sets the two groups side by side in contrast.');

  // ── 4 · TIME ────────────────────────────────────────────────────────────
  J('time', 2, 'when', 'The bell rang.', 'The pupils returned to class.',
    'When the bell rang, the pupils returned to class.',
    ['The bell rang when, the pupils returned to class.',
     'When the pupils returned to class, the bell rang.',
     'The bell when rang the pupils returned to class.'],
    'The time comes first, then the action.',
    '<b>When</b> opens the sentence and a comma separates the two clauses.');

  J('time', 3, 'as soon as', 'The train stopped.', 'The passengers got off.',
    'As soon as the train stopped, the passengers got off.',
    ['The passengers got off as soon as, the train stopped.',
     'As soon as the passengers got off, the train stopped.',
     'The train as soon as stopped, the passengers got off.'],
    '"as soon as" means with no delay at all.',
    '<b>As soon as</b> stresses that the second action followed immediately.');

  J('time', 3, 'while', 'We were waiting at the stop.', 'It began to rain.',
    'While we were waiting at the stop, it began to rain.',
    ['We were waiting at the stop while, it began to rain.',
     'While it began to rain while we were waiting at the stop.',
     'We were while waiting at the stop, it began to rain.'],
    'The waiting lasted; the rain started during it.',
    '<b>While</b> puts the shorter event inside the longer one.');

  J('time', 3, 'before', 'Read the instructions.', 'You start the exercise.',
    'Read the instructions before you start the exercise.',
    ['Before read the instructions, you start the exercise.',
     'Read the instructions before, you start the exercise you.',
     'Read before the instructions you start the exercise.'],
    'Which action should come first?',
    '<b>before</b> puts the reading first and the exercise second.');

  J('time', 3, 'after', 'We cleared the tables.', 'Everyone had eaten.',
    'We cleared the tables after everyone had eaten.',
    ['After we cleared the tables, everyone had eaten.',
     'We cleared the tables after, everyone had eaten.',
     'We after cleared the tables everyone had eaten.'],
    'Eating happened first.',
    'The earlier action follows <b>after</b>; the past perfect "had eaten" shows it came first.');

  J('time', 4, 'when', 'You will read this book.', 'You will understand the ending.',
    'When you read this book, you will understand the ending.',
    ['When you will read this book, you will understand the ending.',
     'When you read this book, you understand the ending.',
     'You will understand the ending when, you will read this book.'],
    'What tense goes after "when" in English?',
    '⚠ After <b>when</b>, English uses the <b>present</b> for a future action: "When you <b>read</b>… you <b>will understand</b>…" (French uses the future here - do not copy it across).');

  J('time', 3, 'until', 'Wait here.', 'I come back.',
    'Wait here until I come back.',
    ['Until wait here, I come back.',
     'Wait here until, I come back I.',
     'Wait until here I come back.'],
    '"until" marks the end point.',
    '<b>until</b> shows how long the waiting lasts.');

  J('time', 3, 'as soon as', 'The results are published.', 'I will call you.',
    'As soon as the results are published, I will call you.',
    ['As soon as the results will be published, I will call you.',
     'I will call you as soon as, the results are published.',
     'As soon as I will call you, the results are published.'],
    'Present tense after "as soon as".',
    'Like "when", <b>as soon as</b> takes the <b>present</b> even for a future event.');

  J('time', 3, 'while', 'The choir was singing.', 'The audience listened in silence.',
    'While the choir was singing, the audience listened in silence.',
    ['The choir was singing while, the audience listened in silence.',
     'While the audience listened in silence while the choir was singing.',
     'The choir while was singing, the audience listened in silence.'],
    'Both happened together.',
    '<b>While</b> joins two actions happening at the same moment.');

  J('time', 2, 'before', 'Switch off the lights.', 'You leave the room.',
    'Switch off the lights before you leave the room.',
    ['Before switch off the lights, you leave the room.',
     'Switch off the lights before, you leave the room you.',
     'Switch before off the lights you leave the room.'],
    'Lights first, then leaving.',
    '<b>before</b> orders the two actions correctly.');

  // ── 5 · PURPOSE & RESULT ────────────────────────────────────────────────
  J('purpose_result', 4, 'so that', 'The teacher speaks slowly.', 'Everyone can follow the lesson.',
    'The teacher speaks slowly so that everyone can follow the lesson.',
    ['The teacher speaks slowly so that everyone can follow the lesson everyone.',
     'So that the teacher speaks slowly, everyone can follow the lesson.',
     'The teacher speaks slowly so everyone can follow so that the lesson.'],
    'Two different subjects → "so that".',
    'The teacher and "everyone" are different subjects, so we need <b>so that</b> + a full clause, not "to + verb".');

  J('purpose_result', 4, 'to', 'I am saving my pocket money.', 'I want to buy a bicycle.',
    'I am saving my pocket money to buy a bicycle.',
    ['I am saving my pocket money so that I buy a bicycle.',
     'I am saving my pocket money to I want to buy a bicycle.',
     'To buy a bicycle I am saving to my pocket money.'],
    'Is the subject the same in both sentences?',
    '⚠ Same subject (I / I) → <b>to + verb</b>. "so that" is for two <b>different</b> subjects.');

  J('purpose_result', 3, 'so', 'The river burst its banks.', 'The village was flooded.',
    'The river burst its banks, so the village was flooded.',
    ['So the river burst its banks, the village was flooded.',
     'The river so burst its banks the village was flooded.',
     'The village was flooded, so the river burst its banks.'],
    'Which is the result?',
    'The flood is the <b>result</b>: it follows "so".');

  J('purpose_result', 4, 'so that', 'Dad leaves home early.', 'The family arrives on time.',
    'Dad leaves home early so that the family arrives on time.',
    ['Dad leaves home early to the family arrives on time.',
     'So that Dad leaves home early, the family arrives on time.',
     'Dad leaves home early so that the family to arrive on time.'],
    'Dad and the family are different subjects.',
    'Different subjects → <b>so that</b> + clause. "to arrive" would wrongly suggest Dad arrives.');

  J('purpose_result', 3, 'so', 'I left my umbrella at home.', 'I got soaked.',
    'I left my umbrella at home, so I got soaked.',
    ['So I left my umbrella at home, I got soaked.',
     'I left so my umbrella at home I got soaked.',
     'I got soaked, so I left my umbrella at home.'],
    'The forgetting came first.',
    'Getting soaked is the <b>consequence</b> and follows "so".');

  J('purpose_result', 4, 'to', 'She reads her essay again.', 'She wants to correct her mistakes.',
    'She reads her essay again to correct her mistakes.',
    ['She reads her essay again so that she corrects her mistakes.',
     'She reads her essay again to she wants to correct her mistakes.',
     'To correct her mistakes she reads to her essay again.'],
    'One subject does both things.',
    'Same subject → <b>to + verb</b>: "reads her essay again <b>to correct</b> her mistakes".');

  J('purpose_result', 3, 'so', 'The wind blew all night.', 'Several branches fell.',
    'The wind blew all night, so several branches fell.',
    ['So the wind blew all night, several branches fell.',
     'The wind so blew all night several branches fell.',
     'Several branches fell, so the wind blew all night.'],
    'Cause first, result second.',
    'The fallen branches are the <b>result</b> of the wind.');

  J('purpose_result', 4, 'so that', 'The guide repeats the instructions.', 'Nobody gets lost.',
    'The guide repeats the instructions so that nobody gets lost.',
    ['The guide repeats the instructions to nobody gets lost.',
     'So that the guide repeats the instructions, nobody gets lost.',
     'The guide repeats so that the instructions nobody gets lost.'],
    'The guide and "nobody" are different subjects.',
    'Different subjects → <b>so that</b> + clause.');

  J('purpose_result', 3, 'so', 'The shop had run out of milk.', 'We bought juice instead.',
    'The shop had run out of milk, so we bought juice instead.',
    ['So the shop had run out of milk, we bought juice instead.',
     'The shop had so run out of milk we bought juice instead.',
     'We bought juice instead, so the shop had run out of milk.'],
    'What did we do as a result?',
    'Buying juice is the <b>result</b> of the shop running out.');

  J('purpose_result', 4, 'to', 'We set off at dawn.', 'We wanted to avoid the traffic.',
    'We set off at dawn to avoid the traffic.',
    ['We set off at dawn so that we avoid the traffic.',
     'We set off at dawn to we wanted to avoid the traffic.',
     'To avoid the traffic we set off to at dawn.'],
    'Same subject in both sentences.',
    'Same subject (we / we) → <b>to + verb</b> is the natural way to give the purpose.');
})();
