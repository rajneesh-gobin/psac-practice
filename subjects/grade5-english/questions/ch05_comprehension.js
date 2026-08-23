'use strict';
// Grade 5 English — Chapter: Reading Comprehension
// IDs format: g5eng-comp-NNN
// Passage is embedded as HTML — renders via innerHTML in both practice and exam modes.

const _PASSAGE_A = `<div style="background:#f8fafc;border-left:4px solid #3b82f6;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65">
<b style="color:#1e40af">Read the passage carefully, then answer the question.</b><br><br>
<b>The Dodo — Mauritius's Lost Bird</b><br><br>
The dodo was a large, flightless bird that lived only on the island of Mauritius. It stood about one metre tall and weighed roughly 10 to 18 kilograms. Because it had evolved on an island with no natural predators, the dodo had no fear of humans and could not fly to escape danger.<br><br>
When Dutch sailors arrived in Mauritius in 1598, they found the dodo easy to catch. The sailors hunted the birds for food, and the animals they brought with them — such as rats, pigs and monkeys — destroyed the dodo's nests and eggs. Within less than a century, by around 1680, the dodo had become completely extinct.<br><br>
Today, the dodo is a national symbol of Mauritius. Its image appears on the Coat of Arms of the country. Scientists have studied dodo bones found on the island to learn more about this remarkable bird. Although it is gone forever, the dodo serves as a powerful reminder of how human activity can threaten wildlife.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-comp-001', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_A}Where did the dodo live?`,
    options:['On every island in the Indian Ocean','Only on the island of Mauritius','In the forests of Africa','On the island of Rodrigues'],
    answer:'Only on the island of Mauritius',
    hint:'The answer is in the very first sentence of the passage.',
    explanation:'The passage states: "The dodo was a large, flightless bird that lived <b>only on the island of Mauritius</b>." It was found nowhere else in the world.' }),

  makeMCQ({ id:'g5eng-comp-002', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_A}Why was the dodo easy to catch?`,
    options:[
      'It was very slow at running.',
      'It had no fear of humans because it had no natural predators.',
      'It was too fat to move quickly.',
      'It always slept during the day.'
    ],
    answer:'It had no fear of humans because it had no natural predators.',
    hint:'Look at what the passage says about predators and fear.',
    explanation:'The passage explains: "Because it had evolved on an island with <b>no natural predators</b>, the dodo had <b>no fear of humans</b> and could not fly to escape danger." It was unfamiliarity with danger — not slowness — that made it easy to catch.' }),

  makeMCQ({ id:'g5eng-comp-003', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}Name TWO ways the dodo became extinct, according to the passage.`,
    options:[
      'Disease and drought',
      'Hunting by sailors AND destruction of nests by introduced animals',
      'Volcanic eruptions and flooding',
      'Competition with other birds and lack of food'
    ],
    answer:'Hunting by sailors AND destruction of nests by introduced animals',
    hint:'Look at the second paragraph for two distinct causes.',
    explanation:'The passage gives two causes: (1) "<b>The sailors hunted the birds for food</b>" and (2) "<b>the animals they brought with them</b> — such as rats, pigs and monkeys — <b>destroyed the dodo\'s nests and eggs</b>."' }),

  makeMCQ({ id:'g5eng-comp-004', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_A}Approximately when did the dodo become extinct?`,
    options:['Around 1598','Around 1650','Around 1680','Around 1700'],
    answer:'Around 1680',
    hint:'The passage mentions a specific date in the second paragraph.',
    explanation:'The passage states: "by around <b>1680</b>, the dodo had become completely extinct." Dutch sailors arrived in 1598 — so the dodo survived less than a century after first human contact.' }),

  makeMCQ({ id:'g5eng-comp-005', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}What does the word "extinct" mean as used in the passage?`,
    options:[
      'Endangered and nearly dying out',
      'No longer existing anywhere — all members of the species have died',
      'Living in a different place',
      'Sleeping for a very long time'
    ],
    answer:'No longer existing anywhere — all members of the species have died',
    hint:'Look at the context: "the dodo had become completely extinct" — is it still alive anywhere?',
    explanation:'"<b>Extinct</b>" means a species no longer exists anywhere in the world — every individual has died. The passage confirms this: "Although it is <b>gone forever</b>..." An endangered species is threatened but still alive.' }),

  makeMCQ({ id:'g5eng-comp-006', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}How does the dodo continue to be remembered in Mauritius today?`,
    options:[
      'There is a museum dedicated only to the dodo.',
      'Its image appears on the Coat of Arms of Mauritius.',
      'Live dodos are kept in the national zoo.',
      'The dodo\'s name is given to the national currency.'
    ],
    answer:'Its image appears on the Coat of Arms of Mauritius.',
    hint:'The last paragraph explains the dodo\'s current significance.',
    explanation:'The passage states: "<b>Its image appears on the Coat of Arms</b> of the country." The dodo is also described as "a national symbol of Mauritius".' }),

  makeMCQ({ id:'g5eng-comp-007', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}What is the main MESSAGE of this passage?`,
    options:[
      'The dodo tasted delicious and that is why sailors ate it.',
      'Human activity can have a devastating impact on wildlife.',
      'Scientists should try to bring the dodo back to life.',
      'Mauritius had many types of flightless birds.'
    ],
    answer:'Human activity can have a devastating impact on wildlife.',
    hint:'Look at the final sentence of the passage — it usually contains the author\'s main point.',
    explanation:'The passage ends with: "the dodo serves as a powerful reminder of how <b>human activity can threaten wildlife</b>." This is the main theme — the dodo\'s extinction was caused entirely by human action (hunting, introduced predators).' }),

  makeTF({ id:'g5eng-comp-008', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_A}True or False: The dodo could fly short distances to escape predators.`,
    answer:false,
    hint:'Look for the word "flightless" in the passage.',
    explanation:'<b>False.</b> The passage clearly calls the dodo a "<b>flightless bird</b>" and states it "could <b>not fly</b> to escape danger". It was unable to fly at all.' }),

  makeMCQ({ id:'g5eng-comp-009', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}The author describes the dodo as a "remarkable bird". What does remarkable most likely mean here?`,
    options:['very ordinary and common','extraordinary and worth noting','ugly and unpleasant','dangerous and fierce'],
    answer:'extraordinary and worth noting',
    hint:'The whole passage is dedicated to the dodo — would the author write so much about an ordinary bird?',
    explanation:'"<b>Remarkable</b>" means extraordinary, noteworthy or deserving of attention. The context — a whole passage celebrating the dodo — shows the author finds it exceptional, not ordinary.' }),

  makeMCQ({ id:'g5eng-comp-010', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_A}Which paragraph explains what scientists do to study the dodo today?`,
    options:['Paragraph 1','Paragraph 2','Paragraph 3','There is no such information in the passage.'],
    answer:'Paragraph 3',
    hint:'Scan each paragraph for mentions of scientists.',
    explanation:'<b>Paragraph 3</b> (the last paragraph) states: "Scientists have studied <b>dodo bones</b> found on the island to learn more about this remarkable bird." Studying fossilised bones (fossil record) is how we know about extinct species.' })

);
