'use strict';
// @enrichment - Bonus chapter "Joining Sentences". DERIVED from the syllabus
// (conjunctions, relative clauses, sentence structure), NOT a direct MIE
// chapter. DO NOT remove during syllabus alignment audits.
//
// Grade 6 level, the hardest of the three: non-defining relative clauses and
// the commas they need, "whom" after a preposition, participle phrases as a way
// of joining, "whereas", "despite" + noun vs "although" + clause, and the
// linking adverbs that take a semicolon rather than a comma.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'g6eng-enr-joining';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6eng-join-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Join the two sentences using « <b>${given}</b> ». `
        + `Make any changes that are needed.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · RELATIVE CLAUSES ────────────────────────────────────────────────
  J('relative', 4, 'who', 'Mr Ramdin teaches us history.', 'Mr Ramdin has just retired.',
    'Mr Ramdin, who has just retired, taught us history.',
    ['Mr Ramdin who has just retired taught us history.',
     'Mr Ramdin, that has just retired, taught us history.',
     'Mr Ramdin, who he has just retired, taught us history.'],
    'There is only one Mr Ramdin - the clause adds extra information.',
    '⚠ A <b>non-defining</b> clause (extra information about someone already identified) is fenced off by <b>two commas</b>, and "that" can never introduce one.');

  J('relative', 4, 'which', 'The old sugar mill is now a museum.', 'The mill was built in 1820.',
    'The old sugar mill, which was built in 1820, is now a museum.',
    ['The old sugar mill which was built in 1820 is now a museum.',
     'The old sugar mill, that was built in 1820, is now a museum.',
     'The old sugar mill, which it was built in 1820, is now a museum.'],
    'The mill is already identified, so the clause is extra.',
    'Non-defining clauses take <b>commas on both sides</b> and use "which", never "that".');

  J('relative', 4, 'whom', 'The author signed my copy.', 'I had written to the author.',
    'The author to whom I had written signed my copy.',
    ['The author to who I had written signed my copy.',
     'The author whom I had written to him signed my copy.',
     'The author to whose I had written signed my copy.'],
    'After a preposition, "who" becomes "whom".',
    '⚠ After a preposition we use <b>whom</b>: "to whom I had written". The preposition moves in front of it and is not repeated at the end.');

  J('relative', 3, 'whose', 'We interviewed a farmer.', 'The farmer’s crops had been destroyed.',
    'We interviewed a farmer whose crops had been destroyed.',
    ['We interviewed a farmer who crops had been destroyed.',
     'We interviewed a farmer whose the crops had been destroyed.',
     'We interviewed a farmer whose his crops had been destroyed.'],
    '"whose" replaces the possessive.',
    '<b>whose</b> is followed directly by the noun - no article, and no second possessive.');

  J('relative', 4, 'which', 'The ceremony lasted three hours.', 'Nobody had expected this.',
    'The ceremony lasted three hours, which nobody had expected.',
    ['The ceremony lasted three hours which nobody had expected.',
     'The ceremony lasted three hours, that nobody had expected.',
     'The ceremony lasted three hours, which nobody had expected it.'],
    '"which" can refer back to the WHOLE idea, not just a noun.',
    'Here <b>which</b> refers to the entire first clause. It needs a comma before it, and "it" must not be repeated.');

  J('relative', 3, 'that', 'I have finally found the notebook.', 'I lost the notebook last term.',
    'I have finally found the notebook that I lost last term.',
    ['I have finally found the notebook, that I lost last term.',
     'I have finally found the notebook whom I lost last term.',
     'I have finally found the notebook that I lost it last term.'],
    'This clause identifies WHICH notebook.',
    'A <b>defining</b> clause takes <b>no comma</b>, and "that" is correct because it tells us which notebook is meant.');

  J('relative', 4, 'where', 'Port Louis has a busy harbour.', 'Most of our goods arrive there.',
    'Port Louis, where most of our goods arrive, has a busy harbour.',
    ['Port Louis where most of our goods arrive has a busy harbour.',
     'Port Louis, which most of our goods arrive, has a busy harbour.',
     'Port Louis, where most of our goods arrive there, has a busy harbour.'],
    'There is only one Port Louis.',
    'A proper noun is already identified, so the clause is <b>non-defining</b> and needs commas. "there" is dropped.');

  J('relative', 3, 'who', 'The candidates will be interviewed.', 'The candidates applied before Friday.',
    'The candidates who applied before Friday will be interviewed.',
    ['The candidates, who applied before Friday, will be interviewed.',
     'The candidates whom applied before Friday will be interviewed.',
     'The candidates who they applied before Friday will be interviewed.'],
    'Only SOME candidates will be interviewed.',
    'The clause defines which candidates, so it is <b>defining</b> - no commas. Commas would mean all of them applied early.');

  J('relative', 4, 'whom', 'The doctor was very kind.', 'My mother spoke to the doctor.',
    'The doctor to whom my mother spoke was very kind.',
    ['The doctor to who my mother spoke was very kind.',
     'The doctor whom my mother spoke to him was very kind.',
     'The doctor to whom my mother spoke to was very kind.'],
    'The preposition "to" moves in front.',
    'In formal English the preposition goes before <b>whom</b> and is not repeated afterwards.');

  J('relative', 4, 'which', 'The results were announced late.', 'This annoyed the parents.',
    'The results were announced late, which annoyed the parents.',
    ['The results were announced late which annoyed the parents.',
     'The results were announced late, that annoyed the parents.',
     'The results were announced late, which it annoyed the parents.'],
    'What annoyed the parents - a noun, or the whole situation?',
    '<b>which</b> refers back to the whole first clause and must be preceded by a comma.');

  // ── 2 · CAUSE & REASON ──────────────────────────────────────────────────
  J('cause', 3, 'since', 'The bridge is under repair.', 'All traffic is being diverted.',
    'Since the bridge is under repair, all traffic is being diverted.',
    ['All traffic is being diverted since, the bridge is under repair.',
     'Since all traffic is being diverted, the bridge is under repair.',
     'The bridge is since under repair, all traffic is being diverted.'],
    'A reason presented as already known.',
    '<b>Since</b> opens with the known reason, followed by a comma and then the consequence.');

  J('cause', 4, 'because of', 'The flight was cancelled.', 'There was a violent storm.',
    'The flight was cancelled because of a violent storm.',
    ['The flight was cancelled because of there was a violent storm.',
     'The flight was cancelled because of a violent storm was there.',
     'Because of the flight was cancelled, there was a violent storm.'],
    '"because of" is followed by a NOUN, not a clause.',
    '⚠ <b>because of</b> + noun phrase ("a violent storm"). Use plain "because" when a full clause follows.');

  J('cause', 3, 'as', 'We postponed the trip.', 'The forecast was poor.',
    'We postponed the trip as the forecast was poor.',
    ['As we postponed the trip, the forecast was poor.',
     'We postponed as the trip the forecast was poor.',
     'The forecast was poor as we postponed the trip.'],
    'The forecast came first.',
    '<b>as</b> introduces the reason, in a slightly more formal register than "because".');

  J('cause', 4, 'owing to', 'The match was abandoned.', 'The pitch was waterlogged.',
    'The match was abandoned owing to the waterlogged pitch.',
    ['The match was abandoned owing to the pitch was waterlogged.',
     'Owing to the match was abandoned, the pitch was waterlogged.',
     'The match was abandoned owing to that the pitch was waterlogged.'],
    '"owing to" behaves like "because of".',
    '<b>owing to</b> is followed by a <b>noun phrase</b>, so the clause must be rewritten as "the waterlogged pitch".');

  J('cause', 3, 'because', 'The library closes early on Fridays.', 'Fewer pupils come then.',
    'The library closes early on Fridays because fewer pupils come then.',
    ['Because the library closes early on Fridays, fewer pupils come then.',
     'The library because closes early on Fridays fewer pupils come then.',
     'Fewer pupils come then because the library closes early on Fridays.'],
    'Careful: which one explains which?',
    'Low attendance is the <b>reason</b> for the early closing, so it follows "because".');

  J('cause', 3, 'since', 'You have already read the report.', 'You can summarise it for us.',
    'Since you have already read the report, you can summarise it for us.',
    ['You can summarise it for us since, you have already read the report.',
     'Since you can summarise it for us, you have already read the report.',
     'You have since already read the report, you can summarise it for us.'],
    'The reason is shared knowledge.',
    '<b>Since</b> + known fact, comma, then what follows from it.');

  J('cause', 4, 'because of', 'The road was closed.', 'There had been a landslide.',
    'The road was closed because of a landslide.',
    ['The road was closed because of there had been a landslide.',
     'The road was closed because of a landslide had been there.',
     'Because of the road was closed, there had been a landslide.'],
    'Turn the clause into a noun phrase.',
    '<b>because of</b> takes a noun: "because of <b>a landslide</b>", not "because of there had been…".');

  J('cause', 3, 'as', 'The shop closed at noon.', 'It was a public holiday.',
    'The shop closed at noon as it was a public holiday.',
    ['As the shop closed at noon, it was a public holiday.',
     'The shop closed as at noon it was a public holiday.',
     'It was a public holiday as the shop closed at noon.'],
    'The holiday explains the early closing.',
    'The holiday is the <b>cause</b> and follows "as".');

  J('cause', 4, 'owing to', 'Several lessons were cancelled.', 'Many teachers were absent.',
    'Several lessons were cancelled owing to the absence of many teachers.',
    ['Several lessons were cancelled owing to many teachers were absent.',
     'Owing to several lessons were cancelled, many teachers were absent.',
     'Several lessons were cancelled owing to that many teachers were absent.'],
    'A noun phrase must follow "owing to".',
    'The clause becomes a noun phrase: "the <b>absence</b> of many teachers".');

  J('cause', 3, 'because', 'The experiment failed.', 'The container was not sealed properly.',
    'The experiment failed because the container was not sealed properly.',
    ['Because the experiment failed, the container was not sealed properly.',
     'The experiment because failed the container was not sealed properly.',
     'The container was not sealed properly because the experiment failed.'],
    'The seal came first.',
    'The unsealed container is the <b>cause</b> of the failure.');

  // ── 3 · CONTRAST ────────────────────────────────────────────────────────
  J('contrast', 4, 'despite', 'He passed the examination.', 'He was very tired.',
    'Despite his tiredness, he passed the examination.',
    ['Despite he was very tired, he passed the examination.',
     'Despite of his tiredness, he passed the examination.',
     'Despite that he was very tired, he passed the examination.'],
    '"despite" is followed by a NOUN or an -ing form.',
    '⚠ <b>despite</b> + noun ("his tiredness"). There is no "of" after it, and it can never be followed by a clause - that is "although".');

  J('contrast', 4, 'whereas', 'The north of the island is dry.', 'The central plateau is very wet.',
    'The north of the island is dry, whereas the central plateau is very wet.',
    ['Whereas the north of the island is dry whereas the central plateau is very wet.',
     'The north of the island whereas is dry, the central plateau is very wet.',
     'The north of the island is dry, the central plateau whereas is very wet.'],
    '"whereas" sets two facts directly against each other.',
    '<b>whereas</b> introduces the contrasting clause and is preceded by a comma.');

  J('contrast', 4, 'however', 'The team trained hard all season.', 'They finished last.',
    'The team trained hard all season; however, they finished last.',
    ['However the team trained hard all season they finished last.',
     'The team trained hard all season, however they finished last.',
     'The team however trained hard all season, they finished however last.'],
    'A semicolon before, a comma after.',
    '⚠ <b>however</b> is a linking adverb, not a conjunction: "…all season<b>; however,</b> they finished last."');

  J('contrast', 3, 'although', 'The instructions were clear.', 'Several pupils made the same mistake.',
    'Although the instructions were clear, several pupils made the same mistake.',
    ['The instructions were clear although, several pupils made the same mistake.',
     'Although several pupils made the same mistake, the instructions were clear.',
     'The instructions were although clear, several pupils made the same mistake.'],
    'Which fact makes the other surprising?',
    '<b>Although</b> introduces the clause we expect to prevent the mistakes.');

  J('contrast', 4, 'in spite of', 'The rescue team continued searching.', 'The weather was appalling.',
    'In spite of the appalling weather, the rescue team continued searching.',
    ['In spite of the weather was appalling, the rescue team continued searching.',
     'In spite the appalling weather, the rescue team continued searching.',
     'In spite of that the weather was appalling, the rescue team continued searching.'],
    '"in spite of" takes a noun phrase.',
    '<b>in spite of</b> + noun ("the appalling weather"). Note it is three words, and "of" is required.');

  J('contrast', 4, 'whereas', 'My brother spends his weekends reading.', 'I spend mine outdoors.',
    'My brother spends his weekends reading, whereas I spend mine outdoors.',
    ['Whereas my brother spends his weekends reading whereas I spend mine outdoors.',
     'My brother whereas spends his weekends reading, I spend mine outdoors.',
     'My brother spends his weekends reading, I spend whereas mine outdoors.'],
    'Two habits set against each other.',
    '<b>whereas</b> is used for a direct, balanced contrast between two facts.');

  J('contrast', 4, 'nevertheless', 'The evidence was weak.', 'The claim was widely believed.',
    'The evidence was weak; nevertheless, the claim was widely believed.',
    ['Nevertheless the evidence was weak the claim was widely believed.',
     'The evidence was weak, nevertheless the claim was widely believed.',
     'The evidence nevertheless was weak, the claim was nevertheless widely believed.'],
    'Punctuate it like "however".',
    '<b>nevertheless</b> is a linking adverb: semicolon before, comma after.');

  J('contrast', 3, 'although', 'She had rehearsed for weeks.', 'She forgot her lines.',
    'Although she had rehearsed for weeks, she forgot her lines.',
    ['She had rehearsed for weeks although, she forgot her lines.',
     'Although she forgot her lines, she had rehearsed for weeks.',
     'She had although rehearsed for weeks, she forgot her lines.'],
    'Rehearsing should have prevented it.',
    '<b>Although</b> opens the clause that makes the outcome unexpected.');

  J('contrast', 4, 'despite', 'The crops survived.', 'There was very little rain.',
    'Despite the lack of rain, the crops survived.',
    ['Despite there was very little rain, the crops survived.',
     'Despite of the lack of rain, the crops survived.',
     'Despite that there was very little rain, the crops survived.'],
    'Rewrite the clause as a noun phrase.',
    '<b>despite</b> + noun: the clause becomes "the <b>lack</b> of rain". No "of" after "despite".');

  J('contrast', 4, 'however', 'The scheme sounded promising.', 'It was never put into practice.',
    'The scheme sounded promising; however, it was never put into practice.',
    ['However the scheme sounded promising it was never put into practice.',
     'The scheme sounded promising, however it was never put into practice.',
     'The scheme sounded however promising, it was however never put into practice.'],
    'Semicolon, "however", comma.',
    'Joining two independent clauses with only a comma before "however" is a <b>comma splice</b>.');

  // ── 4 · TIME ────────────────────────────────────────────────────────────
  J('time', 4, 'by the time', 'We reached the station.', 'The train had already left.',
    'By the time we reached the station, the train had already left.',
    ['By the time we had reached the station, the train already left.',
     'The train had already left by the time, we reached the station.',
     'By the time the train had already left, we reached the station.'],
    'Which tense shows the earlier event?',
    'The <b>past perfect</b> ("had already left") marks the action completed first; "by the time" introduces the later one.');

  J('time', 4, 'no sooner', 'We sat down.', 'The rain started.',
    'No sooner had we sat down than the rain started.',
    ['No sooner we had sat down than the rain started.',
     'No sooner had we sat down when the rain started.',
     'No sooner did we sit down than the rain had started.'],
    'This structure needs inversion and "than".',
    '⚠ <b>No sooner</b> + <b>had</b> + subject + past participle + <b>than</b>… The verb and subject swap places, and it is "than", never "when".');

  J('time', 3, 'as soon as', 'The results are published.', 'The school will inform the parents.',
    'As soon as the results are published, the school will inform the parents.',
    ['As soon as the results will be published, the school will inform the parents.',
     'The school will inform the parents as soon as, the results are published.',
     'As soon as the school will inform the parents, the results are published.'],
    'Present tense after a time conjunction.',
    'After <b>as soon as</b>, English uses the <b>present</b> even for a future event.');

  J('time', 4, 'until', 'The pupils waited in the hall.', 'The examiner arrived.',
    'The pupils waited in the hall until the examiner arrived.',
    ['Until the pupils waited in the hall, the examiner arrived.',
     'The pupils waited in the hall until, the examiner arrived he.',
     'The pupils until waited in the hall the examiner arrived.'],
    '"until" marks the end of the waiting.',
    '<b>until</b> shows the point at which the first action stopped.');

  J('time', 4, 'having', 'We finished our work.', 'We went to the beach.',
    'Having finished our work, we went to the beach.',
    ['Having finished our work we went to the beach having.',
     'Having we finished our work, we went to the beach.',
     'Having finished our work, the beach was where we went to it.'],
    'A participle phrase can replace a whole time clause.',
    '⚠ <b>Having + past participle</b> joins two actions by the same subject: the first is completed, then the second follows. The subject must stay the same in both halves.');

  J('time', 3, 'while', 'The engineers inspected the bridge.', 'Traffic was diverted.',
    'While the engineers inspected the bridge, traffic was diverted.',
    ['The engineers inspected the bridge while, traffic was diverted.',
     'While traffic was diverted while the engineers inspected the bridge.',
     'The engineers while inspected the bridge, traffic was diverted.'],
    'Both lasted over the same period.',
    '<b>While</b> shows the two events running at the same time.');

  J('time', 4, 'by the time', 'The ambulance arrived.', 'The crowd had dispersed.',
    'By the time the ambulance arrived, the crowd had dispersed.',
    ['By the time the ambulance had arrived, the crowd dispersed.',
     'The crowd had dispersed by the time, the ambulance arrived.',
     'By the time the crowd had dispersed, the ambulance arrived.'],
    'Which action finished first?',
    'The crowd left first, so that clause takes the <b>past perfect</b>; "by the time" introduces the later arrival.');

  J('time', 4, 'having', 'She had read the report.', 'She wrote a detailed reply.',
    'Having read the report, she wrote a detailed reply.',
    ['Having read the report she wrote a detailed reply having.',
     'Having she read the report, she wrote a detailed reply.',
     'Having read the report, a detailed reply was written by her having.'],
    'Same subject in both halves.',
    '<b>Having read</b>… places the finished action first; the subject "she" must govern both parts.');

  J('time', 3, 'before', 'Check your answers carefully.', 'You hand in the paper.',
    'Check your answers carefully before you hand in the paper.',
    ['Before check your answers carefully, you hand in the paper.',
     'Check your answers carefully before, you hand in the paper you.',
     'Check before your answers carefully you hand in the paper.'],
    'Checking comes first.',
    '<b>before</b> puts the two actions in the right order.');

  J('time', 4, 'no sooner', 'The bell rang.', 'The corridor filled with pupils.',
    'No sooner had the bell rung than the corridor filled with pupils.',
    ['No sooner the bell had rung than the corridor filled with pupils.',
     'No sooner had the bell rung when the corridor filled with pupils.',
     'No sooner did the bell ring than the corridor had filled with pupils.'],
    'Inversion, past perfect, then "than".',
    'The pattern is <b>No sooner had</b> + subject + past participle + <b>than</b> + past simple.');

  // ── 5 · PURPOSE & RESULT ────────────────────────────────────────────────
  J('purpose_result', 4, 'so that', 'The committee published the timetable early.', 'Families could plan the holidays.',
    'The committee published the timetable early so that families could plan the holidays.',
    ['The committee published the timetable early to families could plan the holidays.',
     'So that the committee published the timetable early, families could plan the holidays.',
     'The committee published the timetable early so that families to plan the holidays.'],
    'Two different subjects.',
    'The committee and the families are different subjects, so <b>so that</b> + clause is required.');

  J('purpose_result', 4, 'in order to', 'The council widened the road.', 'It wanted to reduce congestion.',
    'The council widened the road in order to reduce congestion.',
    ['The council widened the road in order that it wanted to reduce congestion.',
     'The council widened the road in order to it wanted to reduce congestion.',
     'In order to reduce congestion the council widened in order the road.'],
    'Same subject in both sentences.',
    'Same subject → <b>in order to + verb</b>. Use "in order that" only when the subjects differ.');

  J('purpose_result', 4, 'such that', 'The noise was deafening.', 'We could not hear the announcement.',
    'The noise was such that we could not hear the announcement.',
    ['The noise was so that we could not hear the announcement.',
     'Such that the noise was deafening, we could not hear the announcement.',
     'The noise was such that deafening we could not hear the announcement.'],
    'The structure is "was such that…".',
    '<b>such that</b> introduces the result of an extreme degree: "The noise was <b>such that</b>…".');

  J('purpose_result', 4, 'so...that', 'The path was steep.', 'Several walkers turned back.',
    'The path was so steep that several walkers turned back.',
    ['The path was steep so that several walkers turned back.',
     'So that the path was steep, several walkers turned back.',
     'The path was so that steep several walkers turned back.'],
    '"so" goes before the adjective, "that" opens the result.',
    'The pattern is <b>so + adjective + that</b>: "so <b>steep that</b> several walkers turned back".');

  J('purpose_result', 4, 'therefore', 'The evidence was inconclusive.', 'The case was dismissed.',
    'The evidence was inconclusive; therefore, the case was dismissed.',
    ['Therefore the evidence was inconclusive the case was dismissed.',
     'The evidence was inconclusive, therefore the case was dismissed.',
     'The evidence therefore was inconclusive, the case was therefore dismissed.'],
    'Punctuate it like "however".',
    '<b>therefore</b> is a linking adverb: semicolon before, comma after. A single comma would be a comma splice.');

  J('purpose_result', 4, 'so that', 'The librarian labels every shelf.', 'Pupils find books quickly.',
    'The librarian labels every shelf so that pupils find books quickly.',
    ['The librarian labels every shelf to pupils find books quickly.',
     'So that the librarian labels every shelf, pupils find books quickly.',
     'The librarian labels so that every shelf pupils find books quickly.'],
    'The librarian and the pupils are different people.',
    'Different subjects → <b>so that</b> + a full clause.');

  J('purpose_result', 4, 'in order to', 'She revised every evening.', 'She wanted to improve her grades.',
    'She revised every evening in order to improve her grades.',
    ['She revised every evening in order that she wanted to improve her grades.',
     'She revised every evening in order to she wanted to improve her grades.',
     'In order to improve her grades she revised in order every evening.'],
    'One subject, two actions.',
    'Same subject → <b>in order to + verb</b>.');

  J('purpose_result', 4, 'so...that', 'The instructions were confusing.', 'Nobody knew where to start.',
    'The instructions were so confusing that nobody knew where to start.',
    ['The instructions were confusing so that nobody knew where to start.',
     'So that the instructions were confusing, nobody knew where to start.',
     'The instructions were so that confusing nobody knew where to start.'],
    'Adjective between "so" and "that".',
    'The pattern <b>so + adjective + that</b> links the degree to its result.');

  J('purpose_result', 4, 'therefore', 'The bridge had not been inspected for years.', 'It was declared unsafe.',
    'The bridge had not been inspected for years; therefore, it was declared unsafe.',
    ['Therefore the bridge had not been inspected for years it was declared unsafe.',
     'The bridge had not been inspected for years, therefore it was declared unsafe.',
     'The bridge had therefore not been inspected for years, it was therefore declared unsafe.'],
    'Semicolon, "therefore", comma.',
    '<b>therefore</b> needs a semicolon before it when it joins two independent clauses.');

  J('purpose_result', 4, 'such that', 'The damage was extensive.', 'The building had to be demolished.',
    'The damage was such that the building had to be demolished.',
    ['The damage was so that the building had to be demolished.',
     'Such that the damage was extensive, the building had to be demolished.',
     'The damage was such that extensive the building had to be demolished.'],
    '"was such that" + the result.',
    '<b>such that</b> follows the noun and its verb, then introduces the consequence.');
})();
