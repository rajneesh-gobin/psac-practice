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

// Second passage — Nico and Tony (based on Grade 5 End of Year Assessment 2023)
const _PASSAGE_B = `<div style="background:#f8fafc;border-left:4px solid #10b981;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65">
<b style="color:#065f46">Read the passage carefully, then answer the question.</b><br><br>
<b>The Fishing Trip</b><br><br>
One Saturday morning, Nico and Tony, two good friends, decided to go fishing at a nearby pond. They got their fishing lines and bait ready and also packed utensils and ingredients, as they wanted to have fresh fish for lunch.<br><br>
Once they arrived at the pond, they sat far from each other to fish from different areas. Within a few minutes, Nico caught a big and beautiful fish. He was overjoyed. He placed the fish in a bucket and continued fishing to bring some home for dinner.<br><br>
On the other side, Tony's bucket was empty. Nico offered to help Tony, but Tony politely refused. He said, "Don't worry, Nico! I will soon catch the kind of fish I need. I just need to be patient." Some minutes later, Tony managed to catch a large fish — but to Nico's surprise, Tony threw it back into the pond. Nico watched in silence as Tony caught many big fish and threw them all back.<br><br>
After a while, Nico got annoyed and asked, "Why are you throwing the fish back? They were big and beautiful!" Tony calmly replied, "I know they were big. Unfortunately, I did not bring a big pan, so I am looking for a smaller fish to fit my cooking pan." Nico laughed, then advised his friend, "You just have to cut the big fish into smaller pieces!"
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-comp-011', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_B}When did Nico and Tony go fishing?`,
    options:['On a Sunday afternoon','On a Saturday morning','On a weekday evening','On a Friday at lunchtime'],
    answer:'On a Saturday morning',
    hint:'The answer is in the very first sentence.',
    explanation:'The passage begins: "One <b>Saturday morning</b>, Nico and Tony... decided to go fishing." Always check the first paragraph for basic facts about time and place.' }),

  makeMCQ({ id:'g5eng-comp-012', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_B}Why did Nico and Tony pack utensils and ingredients?`,
    options:[
      'To sell them at the market',
      'To give to other fishermen',
      'Because they wanted to cook and eat fresh fish for lunch',
      'Because they forgot to leave them at home'
    ],
    answer:'Because they wanted to cook and eat fresh fish for lunch',
    hint:'Look at the reason given in the first paragraph.',
    explanation:'The passage says they packed utensils and ingredients "as they wanted to have <b>fresh fish for lunch</b> on that day." They planned to cook the fish they caught right there.' }),

  makeMCQ({ id:'g5eng-comp-013', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_B}What does "overjoyed" mean in the passage?`,
    options:['very tired','very angry','very worried','very happy'],
    answer:'very happy',
    hint:'Nico had just caught a big, beautiful fish — how would he feel?',
    explanation:'"<b>Overjoyed</b>" means <b>extremely happy or delighted</b>. The prefix "over-" here means "to an extreme degree". Context: Nico had just caught a big beautiful fish — a great success that would naturally make him very happy.' }),

  makeMCQ({ id:'g5eng-comp-014', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_B}Why did Tony throw the big fish back into the pond?`,
    options:[
      'He was being kind to the fish',
      'The fish were too ugly to eat',
      'He had not brought a big enough pan to cook large fish',
      'He wanted to keep fishing for sport'
    ],
    answer:'He had not brought a big enough pan to cook large fish',
    hint:'Tony explains his reason directly to Nico — find that explanation.',
    explanation:'Tony explains: "I did not bring a big pan, so I am looking for a <b>smaller fish to fit my cooking pan</b>." He needed a fish small enough to fit the pan he had brought.' }),

  makeMCQ({ id:'g5eng-comp-015', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_B}What advice did Nico give Tony at the end?`,
    options:[
      'To bring a bigger fishing rod next time',
      'To cut the big fish into smaller pieces to fit the pan',
      'To go home and come back with a bigger pan',
      'To stop fishing and just eat sandwiches'
    ],
    answer:'To cut the big fish into smaller pieces to fit the pan',
    hint:'Nico laughed and then offered a practical solution.',
    explanation:'Nico advised: "You just have to <b>cut the big fish into smaller pieces</b> to fit them into your pan." This was the practical solution Tony had not thought of.' }),

  makeTF({ id:'g5eng-comp-016', chapterId:'eng-comprehension', difficulty:1,
    question:`${_PASSAGE_B}True or False: Tony accepted Nico's offer to help him fish.`,
    answer:false,
    hint:'Look at what Tony said when Nico offered to help.',
    explanation:'<b>False.</b> The passage says Tony "<b>politely refused</b>" Nico\'s offer to help. He said "Don\'t worry, Nico!" and insisted he just needed to be patient.' }),

  makeMCQ({ id:'g5eng-comp-017', chapterId:'eng-comprehension', difficulty:2,
    question:`${_PASSAGE_B}What does the word "patient" mean as used by Tony in the passage?`,
    options:[
      'a person receiving medical treatment',
      'able to wait calmly without becoming annoyed or upset',
      'very fast and energetic',
      'very strong and powerful'
    ],
    answer:'able to wait calmly without becoming annoyed or upset',
    hint:'Tony says he needs to be patient while waiting for the right fish to come.',
    explanation:'In this context, "<b>patient</b>" means <b>able to wait calmly</b> without frustration. Tony was waiting for a small fish — he needed to stay calm. (Note: "patient" also means someone receiving medical treatment — this is a multiple-meaning word; context tells us which meaning is correct here.)' }),

  makeMCQ({ id:'g5eng-comp-018', chapterId:'eng-comprehension', difficulty:3,
    question:`${_PASSAGE_B}What does this story suggest about problem-solving?`,
    options:[
      'If you fail, you should give up and ask for help',
      'Sometimes we miss a simple solution because we think too narrowly — a fresh perspective (like Nico\'s advice) can reveal an easy answer',
      'Fishing is the best way to solve problems',
      'You should always bring extra equipment in case something goes wrong'
    ],
    answer:'Sometimes we miss a simple solution because we think too narrowly — a fresh perspective (like Nico\'s advice) can reveal an easy answer',
    hint:'Tony had a problem, and Nico found the solution immediately. Why could Tony not see it himself?',
    explanation:'Tony was so focused on finding a small fish that he could not see the obvious solution: cut the big fish into smaller pieces. The story illustrates how a <b>different perspective</b> — in this case from a friend — can reveal a simple answer that we miss when we are too close to the problem.' }),

  makeMCQ({ id:'g5eng-comp-019', chapterId:'eng-comprehension', difficulty:3,
    question:`${_PASSAGE_B}Which word from the passage is a synonym of "unfortunately"?`,
    options:['overjoyed','politely','unluckily','calmly'],
    answer:'unluckily',
    hint:'Look for a word in Tony\'s speech that means "sadly" or "what a pity".',
    explanation:'"<b>Unluckily</b>" is used by Tony: "Unluckily, I did not bring a big pan." In the full past paper text, Tony says "Unluckily" — it is a synonym of "unfortunately", both meaning "sadly" or "it is a pity that". Synonyms: unfortunately, unluckily, regrettably, sadly.' })

);
