'use strict';
// Grade 6 English enrichment - joining ideas with precise logical links.
(function () {
  const hints = {
    relative: 'Use a relative clause to identify or add information about a noun.',
    cause: 'Show clearly which event is the reason and which is the result.',
    contrast: 'Preserve the unexpected contrast between the two ideas.',
    time: 'Choose a connector that preserves the order or timing of events.',
    purpose_result: 'Decide whether the second idea is an intention or a consequence.'
  };
  const explanations = {
    relative: 'The relative clause joins the information without repeating the noun.',
    cause: 'The connector expresses the cause-and-effect relationship accurately.',
    contrast: 'The connector shows that the second fact contrasts with the first.',
    time: 'The time connector preserves when the two actions happen.',
    purpose_result: 'The connector correctly marks the intended purpose or resulting effect.'
  };
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-joinx-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-enr-joining', subsection: section, difficulty: 3,
    question: `Join the ideas accurately: “${r[0]}” + “${r[1]}”`,
    options: [r[2], ...r[3]], answer: r[2], hint: hints[section],
    explanation: explanations[section]
  })));

  add('relative', [
    ['The pupil won the science prize.','She designed a water filter.','The pupil who designed a water filter won the science prize.',['The pupil which designed a water filter won the science prize.','The pupil won the science prize who she designed a water filter.','The pupil whose designed a water filter won the science prize.']],
    ['We visited a lighthouse.','The lighthouse was built in the nineteenth century.','We visited a lighthouse that was built in the nineteenth century.',['We visited a lighthouse who was built in the nineteenth century.','We visited a lighthouse where was built in the nineteenth century.','We visited a lighthouse that it was built in the nineteenth century.']],
    ['The author spoke to our class.','Her novel won an award.','The author whose novel won an award spoke to our class.',['The author who novel won an award spoke to our class.','The author which her novel won an award spoke to our class.','The author whose she won an award spoke to our class.']],
    ['This is the beach.','The turtles nested there.','This is the beach where the turtles nested.',['This is the beach who the turtles nested.','This is the beach where the turtles nested there.','This is the beach whose turtles nested.']],
    ['The bicycle needs repair.','I borrowed it from my cousin.','The bicycle that I borrowed from my cousin needs repair.',['The bicycle who I borrowed from my cousin needs repair.','The bicycle that I borrowed it from my cousin needs repair.','The bicycle whose I borrowed from my cousin needs repair.']],
    ['The guide thanked the volunteers.','They had cleared the path.','The guide thanked the volunteers who had cleared the path.',['The guide thanked the volunteers which had cleared the path.','The guide thanked the volunteers who they had cleared the path.','The guide thanked the volunteers whose had cleared the path.']],
    ['July was the month.','The project began then.','July was the month when the project began.',['July was the month where the project began then.','July was the month who the project began.','July was the month when the project began then.']],
    ['The museum displayed the compass.','The explorer had used it.','The museum displayed the compass which the explorer had used.',['The museum displayed the compass who the explorer had used.','The museum displayed the compass which the explorer had used it.','The museum displayed the compass whose the explorer had used.']],
    ['I met the engineer.','You recommended her.','I met the engineer whom you recommended.',['I met the engineer which you recommended.','I met the engineer whom you recommended her.','I met the engineer whose you recommended.']],
    ['The village has changed greatly.','My grandfather grew up there.','The village where my grandfather grew up has changed greatly.',['The village which my grandfather grew up there has changed greatly.','The village who my grandfather grew up has changed greatly.','The village where my grandfather grew up there has changed greatly.']]
  ]);

  add('cause', [
    ['The road was flooded.','The bus turned back.','The bus turned back because the road was flooded.',['The road was flooded although the bus turned back.','The bus turned back unless the road was flooded.','The road was flooded so that the bus turned back on purpose.']],
    ['The alarm did not ring.','Mina arrived late.','Mina arrived late because the alarm did not ring.',['Mina arrived late although the alarm did not ring.','The alarm did not ring unless Mina arrived late.','Mina arrived late so that the alarm did not ring.']],
    ['The soil was very dry.','The seedlings wilted.','The seedlings wilted because the soil was very dry.',['The seedlings wilted despite the soil was very dry.','The soil was very dry unless the seedlings wilted.','The seedlings wilted so that the soil was very dry.']],
    ['The evidence was incomplete.','The committee delayed its decision.','The committee delayed its decision because the evidence was incomplete.',['The committee delayed its decision although the evidence was incomplete.','The evidence was incomplete so that the committee intended a delay.','The committee delayed its decision unless the evidence was incomplete.']],
    ['The path was slippery.','We walked slowly.','We walked slowly since the path was slippery.',['We walked slowly although the path was slippery.','We walked slowly so that the path was slippery.','We walked slowly unless the path was slippery.']],
    ['The battery was flat.','The torch did not work.','The torch did not work because the battery was flat.',['The battery was flat although the torch did not work.','The torch did not work so that the battery was flat.','The torch did not work unless the battery was flat.']],
    ['The team practised regularly.','Its performance improved.','The team’s performance improved because it practised regularly.',['The team practised regularly although its performance improved.','The performance improved so that the team practised regularly.','The performance improved unless the team practised regularly.']],
    ['The tide was rising quickly.','The swimmers returned to shore.','The swimmers returned to shore because the tide was rising quickly.',['The swimmers returned to shore although the tide was rising quickly.','The tide was rising quickly so that the swimmers returned by intention.','The swimmers returned to shore unless the tide was rising quickly.']],
    ['The instructions were unclear.','Several groups made the same mistake.','Several groups made the same mistake because the instructions were unclear.',['Several groups made the same mistake although the instructions were unclear.','The instructions were unclear so that several groups made the mistake.','Several groups made the same mistake unless the instructions were unclear.']],
    ['Strong winds damaged the power lines.','Electricity was interrupted.','Electricity was interrupted because strong winds damaged the power lines.',['Electricity was interrupted although strong winds damaged the lines.','Strong winds damaged the lines unless electricity was interrupted.','Electricity was interrupted so that strong winds damaged the lines.']]
  ]);

  add('contrast', [
    ['The task was difficult.','Everyone completed it.','Although the task was difficult, everyone completed it.',['Because the task was difficult, everyone completed it.','The task was difficult so that everyone completed it.','Unless the task was difficult, everyone completed it.']],
    ['The sky was clear.','A strong wind was blowing.','The sky was clear, yet a strong wind was blowing.',['The sky was clear because a strong wind was blowing.','The sky was clear so that a strong wind was blowing.','The sky was clear unless a strong wind was blowing.']],
    ['The bag looked small.','It held all the equipment.','Although the bag looked small, it held all the equipment.',['Because the bag looked small, it held all the equipment.','The bag looked small so that it held all the equipment.','Unless the bag looked small, it held all the equipment.']],
    ['Ravi had revised carefully.','He still felt nervous.','Ravi had revised carefully; nevertheless, he still felt nervous.',['Ravi felt nervous because he had revised carefully.','Ravi revised carefully so that he would feel nervous.','Unless Ravi revised carefully, he felt nervous.']],
    ['The route was longer.','It was much safer.','The route was longer but much safer.',['The route was longer because it was much safer.','The route was longer so that it was safer.','The route was longer unless it was safer.']],
    ['The sun was shining.','The air remained cold.','Even though the sun was shining, the air remained cold.',['Because the sun was shining, the air remained cold.','The sun was shining so that the air remained cold.','Unless the sun was shining, the air remained cold.']],
    ['The first experiment failed.','The pupils did not give up.','Although the first experiment failed, the pupils did not give up.',['Because the first experiment failed, the pupils did not give up.','The experiment failed so that the pupils did not give up.','Unless the experiment failed, the pupils did not give up.']],
    ['The restaurant was crowded.','Service was quick.','The restaurant was crowded; however, service was quick.',['Service was quick because the restaurant was crowded.','The restaurant was crowded so that service was quick.','Unless the restaurant was crowded, service was quick.']],
    ['Maya is quiet in class.','She speaks confidently on stage.','Maya is quiet in class, whereas she speaks confidently on stage.',['Maya is quiet because she speaks confidently on stage.','Maya is quiet so that she speaks confidently on stage.','Unless Maya is quiet, she speaks confidently on stage.']],
    ['The old map was faded.','We could still read the labels.','Despite the faded map, we could still read the labels.',['Because of the faded map, we could still read the labels.','The map was faded so that we could read the labels.','Unless the map was faded, we could read the labels.']]
  ]);

  add('time', [
    ['The bell rang.','The pupils entered the hall.','When the bell rang, the pupils entered the hall.',['Because the bell rang, the pupils had already entered yesterday.','Unless the bell rang, the pupils entered the hall.','The pupils entered so that the bell rang.']],
    ['We checked the weather forecast.','We left for the hike.','Before we left for the hike, we checked the weather forecast.',['After we left for the hike, we checked the forecast beforehand.','Unless we left, we checked the forecast.','We checked the forecast so that we had left.']],
    ['The rain stopped.','The match resumed immediately.','As soon as the rain stopped, the match resumed.',['Until the rain stopped, the match immediately resumed afterwards.','Because the match resumed, the rain stopped.','Unless the rain stopped, the match resumed immediately.']],
    ['Mina prepared the labels.','Her partner arranged the samples.','While Mina prepared the labels, her partner arranged the samples.',['Before Mina prepared the labels, her partner arranged them at the same time.','Because Mina prepared labels, her partner had to arrange samples.','Unless Mina prepared labels, her partner arranged samples.']],
    ['The guide finished the safety talk.','The group boarded the boat.','After the guide finished the safety talk, the group boarded the boat.',['Before the guide finished the talk, the group boarded afterwards.','While the guide finished the talk later, the group had boarded.','The guide finished the talk so that the group had already boarded.']],
    ['Keep stirring the mixture.','It becomes smooth.','Keep stirring the mixture until it becomes smooth.',['Keep stirring after it becomes smooth before stopping.','Keep stirring because it becomes smooth earlier.','Keep stirring unless it ever becomes smooth.']],
    ['The lights went out.','We were watching the film.','The lights went out while we were watching the film.',['The lights went out after we had not yet watched the film.','We watched the film so that the lights went out.','Unless we watched the film, the lights went out.']],
    ['I reach the library.','I will return your book.','When I reach the library, I will return your book.',['When I will reach the library, I return your book yesterday.','I reach the library because I will return your book.','Unless I reach the library, I will have returned it there.']],
    ['The seedlings grew taller.','We recorded their height each week.','As the seedlings grew taller, we recorded their height each week.',['After the seedlings had stopped growing, we recorded them each week during growth.','The seedlings grew so that we had recorded them earlier.','Unless the seedlings grew, we recorded their taller height.']],
    ['The final guest arrived.','The host served dinner.','Once the final guest had arrived, the host served dinner.',['Before the final guest arrived, the host served dinner afterwards.','While the guest had not arrived, the host served after arrival.','The guest arrived because the host had served dinner.']]
  ]);

  add('purpose_result', [
    ['We labelled every sample.','Nobody would confuse them.','We labelled every sample so that nobody would confuse them.',['We labelled every sample because nobody confused them earlier.','Although we labelled every sample, nobody intended confusion.','We labelled every sample unless nobody confused them.']],
    ['The road was badly flooded.','Traffic could not pass.','The road was so badly flooded that traffic could not pass.',['The road was flooded so that traffic chose not to pass.','The road was flooded because traffic could not pass first.','Although the road was flooded, traffic could not pass as a purpose.']],
    ['Speak slowly.','The younger pupils can follow the instructions.','Speak slowly so that the younger pupils can follow the instructions.',['Speak slowly because the younger pupils followed the instructions yesterday.','Speak slowly although the younger pupils can follow the instructions.','Speak slowly unless the younger pupils can follow the instructions.']],
    ['The box was very heavy.','Ravi could not lift it alone.','The box was so heavy that Ravi could not lift it alone.',['The box was heavy so that Ravi intended not to lift it.','The box was heavy because Ravi could not lift it first.','Although the box was heavy, Ravi could not lift it as a purpose.']],
    ['Mina set an alarm.','She would wake before sunrise.','Mina set an alarm so that she would wake before sunrise.',['Mina set an alarm because she had woken before sunrise later.','Mina set an alarm although she wanted to wake.','Mina set an alarm unless she would wake.']],
    ['The explanation was very clear.','Everyone understood the process.','The explanation was so clear that everyone understood the process.',['The explanation was clear so that it intended everyone to understand itself.','Everyone understood because they made the explanation clear afterwards.','Although the explanation was clear, everyone understood as its purpose.']],
    ['We left home early.','We could avoid the traffic.','We left home early in order to avoid the traffic.',['We left early because we had already avoided the traffic later.','We left early although we intended to avoid traffic.','We left early unless we could avoid traffic.']],
    ['The wind became extremely strong.','The organisers cancelled the race.','The wind became so strong that the organisers cancelled the race.',['The wind became strong so that it intended the cancellation.','The organisers cancelled the race because the wind became strong afterwards.','Although the wind was strong, cancellation was its purpose.']],
    ['The teacher enlarged the diagram.','Pupils at the back could see it.','The teacher enlarged the diagram so that pupils at the back could see it.',['The teacher enlarged it because pupils had seen it afterwards.','The teacher enlarged it although the pupils needed to see.','The teacher enlarged it unless pupils could see.']],
    ['The instructions were too vague.','The group could not begin the task.','The instructions were too vague for the group to begin the task.',['The instructions were vague so that the group chose not to begin.','The group could not begin because it made the instructions vague later.','Although the instructions were vague, not beginning was their purpose.']]
  ]);
})();
