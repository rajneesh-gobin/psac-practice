'use strict';
// Grade 5 English - depth for the chapters the real papers lean on hardest.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2023, 2024 and 2025 Grade 5 papers (see the
// block above `chapters:` in _manifest.js). Q4 alone is eight verb-form items
// every single year, so eng-verbs takes 23.5% of the paper and now supplies 9
// questions of every 40-question exam from a pool of 50 - five mock exams and
// the chapter was used up. Measured 2026-09-08.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.
//
// ⚠ The paper prints no mark allocation at all, so its "marks" are item counts.
//   Q4 is eight numbered blanks; that is where the 23.5% comes from.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5e-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  const P1 = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
Every Saturday, Yash helped his mother at the vegetable stall in the market at
Quatre Bornes.<br><br>
They arrived before six, while the tarpaulins were still being tied, and by seven
the aisle was so full that people had to turn sideways to pass one another. Yash
was good at counting change. He liked the noise and the colours: the pyramids of
tomatoes his mother built and rebuilt all morning, the coriander that made the
whole stall smell green, the shouting from the fish end that everybody had
stopped hearing years ago.<br><br>
His job was the money tin. His mother served, and Yash counted, and he had never
once been short.<br><br>
One morning an old lady bought a bag of tomatoes. She counted her coins slowly
onto the table, the way people do when their hands are not steady, and she talked
while she counted, about the rain and about somebody's grandson who had gone to
Australia. Yash's mother listened and said the right things. Then the old lady
picked up her bag and walked away without her purse.<br><br>
Yash saw it on the table. It was brown and flat and it had been lying under the
tomatoes.<br><br>
He could have said nothing. That is the truth of it, and he knew it even then.
The market was full. Nobody had seen her put the purse down and nobody had seen
him notice it. He stood with one hand on the money tin and thought about it for
exactly as long as it takes to think about a thing like that.<br><br>
Then he shouted to his mother and ran.<br><br>
The crowd was worst near the flower sellers. He went through it sideways, saying
pardon, pardon, holding the purse above his head so that it could not be knocked
out of his hand. He caught her at the bus stop on the corner, already reaching
for the rail, with one foot lifted.<br><br>
He put the purse into her hands.<br><br>
She said nothing at all. Yash had expected something, a thank you or a question
or the fuss that adults usually make. She only looked at the purse, and then at
him, and she held his hand for a moment before she got on the bus.<br><br>
He walked back slowly. His mother had served four customers while he was gone and
had made three mistakes with the change, which she blamed on him, and which he
did not argue about.<br><br>
That was a Saturday in June. Yash is grown up now and cannot remember the old
lady's face at all. He remembers her hand.</div>`;

  const P2 = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
The banyan tree in the school yard is older than the school itself.<br><br>
Nobody knows exactly how old. The oldest photograph in the head teacher's office
was taken in 1937, when the school was two wooden rooms and a bell on a post, and
the banyan is already large in it, already spreading further than the roof.<br><br>
A banyan does not grow the way other trees grow. Its branches send down roots
that reach the ground and thicken into new trunks, so that one tree slowly
becomes a small forest. If you walk into the middle of ours you can no longer
tell which trunk was the first one. Children told this for the first time always
go and look, and always come out again saying they think it is the fat one near
the gate, and they may be right, and nobody can prove it.<br><br>
Birds nest in it. There are always more birds than the noise suggests, because
they go quiet when children come close and start again the moment they
leave. At midday the whole of Standard Five sits in its shade, which is the
coolest place on the school grounds by several degrees, and which the teachers
pretend not to know is also where notes are passed.<br><br>
The tree has outlasted a great deal.<br><br>
When a cyclone tore the roof off the classroom block, the banyan lost only a few
branches. The workmen came the following week with sheets of corrugated iron.
They parked under the tree and ate their lunch under it, and one of them said
that his own father had sat under it as a boy. It was still standing when the
workmen came, and still standing when they returned eleven years later to do the
roof a second time.<br><br>
Twice, somebody has suggested cutting it down. Once because the roots were said
to be lifting the path, and once because a branch came down in the night and
nobody could agree whose fault that was. Both times the suggestion was made at a
meeting, and both times the room went quiet afterwards, and nothing
happened.<br><br>
The path is still lifted. Everyone steps over it without looking.<br><br>
There is no plaque on the banyan and nothing about it in the school rules. It is
simply the thing the school is arranged around, the way a house is arranged
around its staircase, and the pupils who sit under it every day would find it
very strange to be asked to explain why it matters.</div>`;

  // ══ eng-verbs (40) ══════════════════════════════════════════════════════
  // present tense (5)
  q('eng-verbs', 'present_tense', 1, 'Every morning, Emma ................ a cup of tea. (to drink)',
    ['drinks', 'drink', 'drank', 'drinking'],
    '"Every morning" means it happens regularly.',
    'A habit uses the simple present. With <i>Emma</i>, a singular subject, the verb takes -s: <b>drinks</b>.');
  q('eng-verbs', 'present_tense', 1, 'The children ................ football after school. (to play)',
    ['play', 'plays', 'played', 'playing'],
    'The subject is plural.',
    'With the plural subject <i>The children</i> the simple present has no -s: <b>play</b>.');
  q('eng-verbs', 'present_tense', 2, 'My sister ................ the piano very well. (to play)',
    ['plays', 'play', 'played', 'playing'],
    'One sister, so the verb needs -s.',
    '<i>My sister</i> is singular, so the simple present takes -s: <b>plays</b>.');
  q('eng-verbs', 'present_tense', 2, 'Water ................ at one hundred degrees Celsius. (to boil)',
    ['boils', 'boil', 'boiled', 'boiling'],
    'A fact that is always true.',
    'General truths take the simple present, and <i>Water</i> is singular: <b>boils</b>.');
  q('eng-verbs', 'present_tense', 2, 'The bus ................ at seven o\'clock every day. (to leave)',
    ['leaves', 'leave', 'left', 'leaving'],
    '"Every day" points to a timetable.',
    'A timetable uses the simple present, and <i>The bus</i> is singular: <b>leaves</b>.');

  // past tense (6)
  q('eng-verbs', 'past_tense', 1, 'My parents ................ a new house last year. (to buy)',
    ['bought', 'buy', 'buys', 'buying'],
    '"Last year" is finished time.',
    'A finished action in past time takes the simple past. The past of <i>buy</i> is <b>bought</b>.');
  q('eng-verbs', 'past_tense', 1, 'Yesterday the teacher ................ us a story. (to tell)',
    ['told', 'tells', 'tell', 'telling'],
    '"Yesterday" is finished time.',
    'The simple past of <i>tell</i> is <b>told</b>.');
  q('eng-verbs', 'past_tense', 2, 'When Rahul was younger, he ................ to be a pilot. (to want)',
    ['wanted', 'wants', 'want', 'wanting'],
    'The whole sentence is in past time.',
    '<i>Was</i> shows past time, so the second verb is also past: <b>wanted</b>.');
  q('eng-verbs', 'past_tense', 2, 'The boys ................ to school on foot this morning. (to go)',
    ['went', 'go', 'goes', 'going'],
    'This morning is already over.',
    'The simple past of <i>go</i> is <b>went</b>.');
  q('eng-verbs', 'past_tense', 2, 'She ................ her keys at the market last Saturday. (to lose)',
    ['lost', 'loses', 'lose', 'losing'],
    '"Last Saturday" is finished time.',
    'The simple past of <i>lose</i> is <b>lost</b>.');
  q('eng-verbs', 'past_tense', 3, 'The cyclone ................ many trees in the village. (to uproot)',
    ['uprooted', 'uproots', 'uproot', 'uprooting'],
    'The cyclone has already passed.',
    'A regular verb forms the simple past with -ed: <b>uprooted</b>.');

  // future tense (5)
  q('eng-verbs', 'future_tense', 1, 'Sam ................ a new course next month. (to start)',
    ['will start', 'starts', 'started', 'starting'],
    '"Next month" has not happened yet.',
    'Future time uses <i>will</i> and the plain verb: <b>will start</b>.');
  q('eng-verbs', 'future_tense', 2, 'We ................ our grandmother tomorrow. (to visit)',
    ['will visit', 'visited', 'visits', 'visiting'],
    '"Tomorrow" is future time.',
    'For a plan in future time we use <b>will visit</b>.');
  q('eng-verbs', 'future_tense', 2, 'If it rains, the match ................ be cancelled.',
    ['will', 'was', 'were', 'been'],
    'The result lies in the future.',
    'In a first conditional the result clause uses <b>will</b>: <i>If it rains, the match will be cancelled.</i>');
  q('eng-verbs', 'future_tense', 2, 'The plane ................ at nine o\'clock tonight. (to land)',
    ['will land', 'landed', 'lands', 'landing'],
    '"Tonight" has not come yet.',
    'Future time takes <b>will land</b>.');
  q('eng-verbs', 'future_tense', 3, 'Next year my brother ................ ten years old. (to be)',
    ['will be', 'was', 'is', 'been'],
    '"Next year" is future time.',
    'The future of <i>to be</i> is <b>will be</b>.');

  // continuous (6)
  q('eng-verbs', 'continuous', 1, 'Mary ................ to her favourite song right now. (to listen)',
    ['is listening', 'listens', 'listened', 'listen'],
    '"Right now" means it is happening as we speak.',
    'The present continuous uses <i>is</i> plus the -ing form: <b>is listening</b>.');
  q('eng-verbs', 'continuous', 2, 'Look! The baby ................ at us. (to smile)',
    ['is smiling', 'smiles', 'smiled', 'smile'],
    '"Look!" points to this very moment.',
    'An action happening now takes the present continuous: <b>is smiling</b>.');
  q('eng-verbs', 'continuous', 2, 'Leo ................ a letter when there was a power cut. (to write)',
    ['was writing', 'writes', 'wrote', 'is writing'],
    'One action was going on when another interrupted it.',
    'The past continuous shows an action in progress in the past: <b>was writing</b>.');
  q('eng-verbs', 'continuous', 2, 'While Myra ................ the yard, she found her ring. (to clean)',
    ['was cleaning', 'cleans', 'cleaned', 'is cleaning'],
    '"While" introduces a longer action.',
    'The longer action takes the past continuous: <b>was cleaning</b>.');
  q('eng-verbs', 'continuous', 3, 'The pupils ................ in the hall at this moment. (to sing)',
    ['are singing', 'is singing', 'sang', 'sing'],
    'The subject is plural and the time is now.',
    'A plural subject takes <i>are</i> in the present continuous: <b>are singing</b>.');
  q('eng-verbs', 'continuous', 3, 'It ................ heavily when we left the house. (to rain)',
    ['was raining', 'rains', 'rained', 'is raining'],
    'The rain was already falling.',
    'The past continuous shows the rain was in progress: <b>was raining</b>.');

  // perfect (5)
  q('eng-verbs', 'perfect', 2, 'Have you already ................ your work? (to finish)',
    ['finished', 'finish', 'finishes', 'finishing'],
    'After "have" comes the past participle.',
    'The present perfect is <i>have</i> plus the past participle: <b>have finished</b>.');
  q('eng-verbs', 'perfect', 2, 'I ................ never seen snow before.',
    ['have', 'has', 'had', 'having'],
    'The subject is "I".',
    'With <i>I</i> the present perfect uses <b>have</b>: <i>I have never seen snow.</i>');
  q('eng-verbs', 'perfect', 2, 'She ................ just eaten her lunch.',
    ['has', 'have', 'having', 'had been'],
    'The subject is singular.',
    'With <i>She</i> the present perfect uses <b>has</b>.');
  q('eng-verbs', 'perfect', 3, 'They ................ in this village since 2010. (to live)',
    ['have lived', 'lived', 'live', 'are living'],
    '"Since" points to something continuing from the past.',
    'An action beginning in the past and still true takes the present perfect: <b>have lived</b>.');
  q('eng-verbs', 'perfect', 3, 'By the time we arrived, the film ................ already started.',
    ['had', 'has', 'have', 'having'],
    'One past action happened before another.',
    'The past perfect uses <b>had</b> to show which past action came first.');

  // auxiliary verbs (5)
  q('eng-verbs', 'auxiliary', 1, '................ you like a glass of water?',
    ['Would', 'Are', 'Did', 'Have'],
    'It is a polite offer.',
    'A polite offer begins with <b>Would</b>: <i>Would you like a glass of water?</i>');
  q('eng-verbs', 'auxiliary', 2, 'You ................ wear a helmet when you ride a bike.',
    ['should', 'would', 'could', 'might'],
    'It is strong advice.',
    '<b>Should</b> gives advice about the right thing to do.');
  q('eng-verbs', 'auxiliary', 2, 'He completed the work, ................ he?',
    ['didn\'t', 'doesn\'t', 'isn\'t', 'hasn\'t'],
    'Match the tag to the tense of the main verb.',
    '<i>Completed</i> is simple past, so the question tag is <b>didn\'t he?</b>');
  q('eng-verbs', 'auxiliary', 2, 'Jack will go to school, ................ he?',
    ['won\'t', 'didn\'t', 'doesn\'t', 'isn\'t'],
    'A positive statement takes a negative tag in the same tense.',
    'The statement uses <i>will</i>, so the tag is <b>won\'t he?</b>');
  q('eng-verbs', 'auxiliary', 3, 'Pupils ................ not run in the corridor.',
    ['must', 'want', 'like', 'need to be'],
    'It is a rule, not a wish.',
    '<b>Must</b> expresses a rule or an obligation: <i>Pupils must not run in the corridor.</i>');

  // agreement (5)
  q('eng-verbs', 'agreement', 1, 'The dog ................ loudly at night.',
    ['barks', 'bark', 'barking', 'to bark'],
    'One dog.',
    'A singular subject takes a verb with -s: <b>barks</b>.');
  q('eng-verbs', 'agreement', 2, 'My shoes ................ too small for me now.',
    ['are', 'is', 'was', 'has'],
    '"Shoes" is plural.',
    'A plural subject takes <b>are</b>.');
  q('eng-verbs', 'agreement', 2, 'Neither of the boys ................ the answer.',
    ['knows', 'know', 'knowing', 'are knowing'],
    '"Neither" is treated as singular.',
    '<i>Neither</i> takes a singular verb: <b>knows</b>.');
  q('eng-verbs', 'agreement', 3, 'The box of pencils ................ on the table.',
    ['is', 'are', 'were', 'have'],
    'What exactly is on the table?',
    'The subject is <i>the box</i>, not <i>pencils</i>, so the verb is singular: <b>is</b>.');
  q('eng-verbs', 'agreement', 3, 'Everybody in the class ................ the new teacher.',
    ['likes', 'like', 'are liking', 'have liked'],
    '"Everybody" is singular.',
    '<i>Everybody</i> takes a singular verb: <b>likes</b>.');

  // verbs in context (8)
  q('eng-verbs', 'in_context', 2, 'I enjoy ................ in the rain. (to play)',
    ['playing', 'play', 'played', 'to play'],
    'After "enjoy" comes the -ing form.',
    'Some verbs, such as <i>enjoy</i>, are followed by the -ing form: <b>playing</b>.');
  q('eng-verbs', 'in_context', 2, 'She hurt her finger while ................ a carrot. (to cut)',
    ['cutting', 'cut', 'cuts', 'to cut'],
    'After "while" the -ing form is used.',
    '<i>While</i> is followed by the -ing form: <b>while cutting a carrot</b>.');
  q('eng-verbs', 'in_context', 2, 'He decided ................ his bicycle to school. (to ride)',
    ['to ride', 'riding', 'rode', 'rides'],
    'After "decided" comes the infinitive.',
    '<i>Decide</i> is followed by the infinitive: <b>to ride</b>.');
  q('eng-verbs', 'in_context', 2, 'The window ................ by the strong wind. (to break)',
    ['was broken', 'broke', 'breaks', 'breaking'],
    'The window did not do the action.',
    'The passive voice is <i>was</i> plus the past participle: <b>was broken</b>.');
  q('eng-verbs', 'in_context', 3, 'The letters ................ by the postman every morning.',
    ['are delivered', 'delivers', 'delivering', 'has delivered'],
    'The letters receive the action.',
    'The present passive is <i>are</i> plus the past participle: <b>are delivered</b>.');
  q('eng-verbs', 'in_context', 3, 'Change to the passive: "The cook prepared the meal."',
    ['The meal was prepared', 'The meal prepares', 'The meal is preparing', 'The cook was prepared'],
    'The object of the sentence becomes the subject.',
    'The object <i>the meal</i> becomes the subject: <b>The meal was prepared by the cook.</b>');
  q('eng-verbs', 'in_context', 3, 'Change to the active: "The song was sung by Anita."',
    ['Anita sang the song', 'The song sang Anita', 'Anita was singing', 'The song is sung'],
    'Who actually did the action?',
    'The doer becomes the subject: <b>Anita sang the song.</b>');
  q('eng-verbs', 'in_context', 3, 'She was tired because she ................ all day. (to work)',
    ['had worked', 'works', 'is working', 'will work'],
    'The working came before the tiredness.',
    'The past perfect shows the earlier of two past actions: <b>had worked</b>.');

  // ══ eng-sentences (14) ══════════════════════════════════════════════════
  // sentence types (5)
  q('eng-sentences', 'types', 1, 'Which sentence is a question?',
    ['Where do you live?', 'I live in Curepipe.', 'Close the door.', 'What a lovely day!'],
    'Look at the punctuation at the end.',
    '<b>Where do you live?</b> asks something and ends with a question mark. It is interrogative.');
  q('eng-sentences', 'types', 1, 'Which sentence gives a command?',
    ['Close the door.', 'The door is open.', 'Is the door open?', 'What a heavy door!'],
    'It tells somebody to do something.',
    '<b>Close the door.</b> is an imperative sentence: it gives an order or instruction.');
  q('eng-sentences', 'types', 2, 'Which sentence shows strong feeling?',
    ['What a beautiful garden!', 'The garden is beautiful.', 'Is the garden beautiful?', 'Water the garden.'],
    'Look for the exclamation mark.',
    '<b>What a beautiful garden!</b> is exclamatory and ends with an exclamation mark.');
  q('eng-sentences', 'types', 2, 'Which sentence simply states a fact?',
    ['The sun rises in the east.', 'Does the sun rise early?', 'Watch the sunrise.', 'How bright the sun is!'],
    'A statement ends with a full stop.',
    '<b>The sun rises in the east.</b> is a declarative sentence: it states something and ends with a full stop.');
  q('eng-sentences', 'types', 3, 'Rewrite as a question: "Rita is coming to the party."',
    ['Is Rita coming to the party?', 'Rita coming to the party?', 'Does Rita coming to party?', 'Rita is coming party?'],
    'Move the verb to the front.',
    'The verb <i>is</i> moves in front of the subject: <b>Is Rita coming to the party?</b>');

  // direct speech (5)
  q('eng-sentences', 'direct_speech', 2, 'Which sentence is punctuated correctly?',
    ['"Come here," said the teacher.', '"Come here" said the teacher.', '"Come here", said the teacher', 'Come here, "said the teacher."'],
    'The comma goes inside the closing marks.',
    'Direct speech ends with a comma inside the quotation marks: <b>"Come here," said the teacher.</b>');
  q('eng-sentences', 'direct_speech', 2, 'Which mark is used at the start and end of spoken words?',
    ['Quotation marks', 'Question marks', 'Brackets', 'Hyphens'],
    'They are sometimes called inverted commas.',
    '<b>Quotation marks</b> show exactly what a speaker said.');
  q('eng-sentences', 'direct_speech', 2, '"Start running when I blow the whistle!" ................ the teacher.',
    ['shouted', 'shout', 'shouting', 'shouts'],
    'The story is being told in past time.',
    'Reporting verbs in a narrative take the simple past: <b>shouted</b>.');
  q('eng-sentences', 'direct_speech', 3, 'Which sentence needs a capital letter after the opening quotation mark?',
    ['She said, "we are late."', 'She said, "We are late."', 'She said "We are late."', '"We are late," she said.'],
    'Spoken words begin like a new sentence.',
    'Spoken words start with a capital, so <b>She said, "we are late."</b> is the one that is wrong and needs correcting.');
  q('eng-sentences', 'direct_speech', 3, 'Report this speech: Ravi said, "I am tired."',
    ['Ravi said that he was tired.', 'Ravi said that I am tired.', 'Ravi said he is tired.', 'Ravi says that he was tired.'],
    'The pronoun and the tense both shift back.',
    'In reported speech <i>I</i> becomes <i>he</i> and <i>am</i> becomes <i>was</i>: <b>Ravi said that he was tired.</b>');

  // sentences in context (4)
  q('eng-sentences', 'in_context', 2, 'Which word joins these sentences? "It was raining ....... we stayed at home."',
    ['so', 'but', 'or', 'although'],
    'The second part is the result of the first.',
    '<b>So</b> shows a result: the rain caused them to stay at home.');
  q('eng-sentences', 'in_context', 2, 'Join: "Zarina went to wake her brother. He was already outside." (but)',
    ['She went to wake him, but he was already outside.', 'She went to wake him but, he was already outside.', 'But she went to wake him he was outside.', 'She went to wake him, he was but outside.'],
    'The comma goes before "but".',
    'Two complete ideas joined by <i>but</i> take a comma before it: <b>She went to wake him, but he was already outside.</b>');
  q('eng-sentences', 'in_context', 3, 'Join: "The monkey saw people coming. It ran away." (as)',
    ['As the monkey saw people coming, it ran away.', 'The monkey as saw people coming it ran.', 'The monkey ran away as saw people.', 'As it ran away the monkey saw people.'],
    '"As" begins the clause that came first.',
    '<b>As the monkey saw people coming, it ran away.</b> The clause with <i>as</i> is followed by a comma.');
  q('eng-sentences', 'in_context', 3, 'Which sentence is complete?',
    ['The rain stopped at noon.', 'Because the rain stopped.', 'Running down the hill.', 'After the long journey.'],
    'A complete sentence needs a subject and a verb.',
    '<b>The rain stopped at noon.</b> has a subject and a verb and makes sense on its own. The others are fragments.');

  // ══ eng-writing (17) ════════════════════════════════════════════════════
  q('eng-writing', 'planning', 2, 'Before writing a story, what should you do first?',
    ['Plan the events in order', 'Count all your words', 'Copy the title twice', 'Draw the margin lines'],
    'A story needs a shape before it has sentences.',
    '<b>Planning the events in order</b> keeps the story clear, so the reader can follow what happens.');
  q('eng-writing', 'planning', 2, 'A story should be divided into ...',
    ['paragraphs', 'columns', 'headings', 'footnotes'],
    'Each new part of the story starts a new one.',
    'A story is written in <b>paragraphs</b>, each dealing with one part of the events.');
  q('eng-writing', 'planning', 3, 'Which is the best opening sentence for a story about a lost dog?',
    ['Sanjay called, but no dog came.', 'This is a story about a dog.', 'I will now tell you a story.', 'Dogs are useful animals.'],
    'A good opening drops the reader into the action.',
    '<b>Sanjay called, but no dog came.</b> begins in the middle of the action and makes the reader want to know more.');
  q('eng-writing', 'informal', 2, 'How should a letter to a friend begin?',
    ['Dear Rahul,', 'Dear Sir,', 'To whom it may concern,', 'Respected Sir or Madam,'],
    'A friend is greeted by name.',
    'An informal letter begins <b>Dear Rahul,</b> using the friend\'s first name.');
  q('eng-writing', 'informal', 2, 'How should a letter to a friend end?',
    ['Love, Anita', 'Yours faithfully, Anita', 'Yours sincerely, Anita', 'Respectfully yours, Anita'],
    'It is warm, not formal.',
    'An informal letter ends with <b>Love,</b> or <i>Your friend,</i> before the writer\'s name.');
  q('eng-writing', 'informal', 3, 'Which sentence suits a letter to a friend?',
    ['Guess what happened on Saturday!', 'I am writing to inform you.', 'Kindly acknowledge receipt.', 'I look forward to your reply.'],
    'Write as you would speak to a friend.',
    '<b>Guess what happened on Saturday!</b> sounds natural and friendly. The others are formal expressions.');
  q('eng-writing', 'informal', 3, 'Which detail must appear at the top of any letter?',
    ['The date', 'The word count', 'The page number', 'The writer\'s age'],
    'The reader needs to know when it was written.',
    '<b>The date</b> is written at the top, under the address.');
  q('eng-writing', 'formal_letter', 2, 'How should a formal letter end if it begins "Dear Sir,"?',
    ['Yours faithfully,', 'Yours sincerely,', 'Love,', 'See you soon,'],
    'The rule depends on whether you named the person.',
    'If the name is not used, the letter ends <b>Yours faithfully,</b>. If it is, it ends <i>Yours sincerely,</i>.');
  q('eng-writing', 'formal_letter', 3, 'Which sentence belongs in a formal letter of complaint?',
    ['I wish to report a faulty radio.', 'The radio is totally useless!', 'Guess what, the radio broke.', 'You sold me a rubbish radio.'],
    'Formal writing stays polite and clear.',
    '<b>I wish to report a faulty radio.</b> is polite and factual, which is what a formal letter needs.');
  q('eng-writing', 'formal_letter', 3, 'Where is the writer\'s own address written in a formal letter?',
    ['At the top right', 'At the very bottom', 'In the middle', 'After the signature'],
    'It goes above the date.',
    'The writer\'s address goes <b>at the top right</b>, with the date underneath it.');
  q('eng-writing', 'descriptive', 2, 'Which sentence describes a beach most vividly?',
    ['Warm sand squeaked under our feet.', 'The beach was quite nice.', 'We went to the beach.', 'It was a beach day.'],
    'Look for a detail you can feel or hear.',
    '<b>Warm sand squeaked under our feet.</b> uses touch and sound, so the reader can picture it.');
  q('eng-writing', 'descriptive', 2, 'Which word best describes a very old house?',
    ['crumbling', 'lovely', 'nice', 'good'],
    'Choose the word that gives a picture.',
    '<b>Crumbling</b> tells the reader exactly what the house looks like; <i>nice</i> and <i>good</i> tell them nothing.');
  q('eng-writing', 'descriptive', 3, 'Which sentence uses the five senses best?',
    ['Hot oil hissed and the kitchen smelled of ginger.', 'The kitchen was busy that evening.', 'Mother was cooking in the kitchen.', 'It was time to eat the dinner.'],
    'Count how many senses the sentence uses.',
    '<b>Hot oil hissed and the kitchen smelled of ginger.</b> gives both sound and smell, which brings the scene alive.');
  q('eng-writing', 'descriptive', 3, 'A good description of a person should include ...',
    ['what they do, not only how they look', 'only the colour of their clothes', 'only their height in metres', 'only their date of birth'],
    'Actions reveal character.',
    'Showing <b>what a person does</b>, as well as how they look, tells the reader what they are like.');
  q('eng-writing', 'figurative', 2, 'Which sentence contains a simile?',
    ['The sea was as flat as glass.', 'The sea was very flat.', 'The sea lay flat and grey.', 'We swam in the flat sea.'],
    'A simile uses "like" or "as".',
    '<b>The sea was as flat as glass.</b> compares two things using <i>as</i>, which makes it a simile.');
  q('eng-writing', 'figurative', 3, 'Which sentence contains a metaphor?',
    ['The classroom was a beehive.', 'The classroom was like a beehive.', 'The classroom was very noisy.', 'The classroom buzzed loudly.'],
    'A metaphor says one thing IS another.',
    '<b>The classroom was a beehive.</b> calls it a beehive outright, with no <i>like</i> or <i>as</i>.');
  q('eng-writing', 'figurative', 3, 'What does "The wind whispered through the leaves" show?',
    ['Personification', 'Alliteration', 'A simile', 'A rhyme'],
    'Something not alive is given a human action.',
    'Giving the wind the human action of whispering is <b>personification</b>.');

  // ══ eng-comprehension (10) ══════════════════════════════════════════════
  q('eng-comprehension', 'retrieval', 2, 'Read the passage, then answer.' + P1 + 'What did Yash do at the market every Saturday?',
    ['He helped his mother', 'He sold his own fruit', 'He counted the stalls', 'He waited for the bus'],
    'The first sentence tells you.',
    'The passage opens: "Every Saturday, Yash <b>helped his mother</b> at the vegetable stall."');
  q('eng-comprehension', 'retrieval', 2, 'Read the passage, then answer.' + P1 + 'Where did Yash catch up with the old lady?',
    ['At the bus stop', 'At the vegetable stall', 'Outside her house', 'Inside the market office'],
    'Follow him through the crowd.',
    'He ran "all the way to <b>the bus stop</b>" before he could give her the purse.');
  q('eng-comprehension', 'inference', 3, 'Read the passage, then answer.' + P1 + 'Why does the writer say "He could have said nothing"?',
    ['To show Yash had a choice', 'To show Yash was very shy', 'To show Yash could not speak', 'To show Yash was in a hurry'],
    'Think about why that sentence is there at all.',
    'The line exists <b>to show Yash had a choice</b>: keeping quiet was easy, and he chose to act instead.');
  q('eng-comprehension', 'inference', 3, 'Read the passage, then answer.' + P1 + 'The old lady held his hand for a moment. This shows that she was ...',
    ['grateful', 'angry', 'frightened', 'amused'],
    'She said nothing, so look at what she did.',
    'She could not find words, so she showed she was <b>grateful</b> by holding his hand.');
  q('eng-comprehension', 'main_idea', 3, 'Read the passage, then answer.' + P1 + 'Which title suits this passage best?',
    ['An Honest Boy', 'A Busy Market Day', 'The Missing Tomatoes', 'A Ride on the Bus'],
    'A title should cover the whole passage.',
    '<b>An Honest Boy</b> covers the whole passage. The market and the bus are only the setting.');
  q('eng-comprehension', 'retrieval', 2, 'Read the passage, then answer.' + P2 + 'Where does the banyan tree grow?',
    ['In the school yard', 'Beside a main road', 'In a public garden', 'On a river bank'],
    'The first sentence tells you.',
    'The passage begins: "The banyan tree <b>in the school yard</b> is older than the school itself."');
  q('eng-comprehension', 'retrieval', 2, 'Read the passage, then answer.' + P2 + 'What do the branches of the banyan send down?',
    ['Roots', 'Seeds', 'Fruit', 'Leaves'],
    'Look at the second sentence.',
    '"Its branches send down <b>roots</b> that reach the ground and thicken into new trunks."');
  q('eng-comprehension', 'vocabulary', 2, 'Read the passage, then answer.' + P2 + 'In the passage, what does "thicken" mean?',
    ['Become wider', 'Become shorter', 'Become softer', 'Become darker'],
    'The roots are turning into trunks.',
    'The roots <b>become wider</b> until they are strong enough to be trunks of their own.');
  q('eng-comprehension', 'inference', 3, 'Read the passage, then answer.' + P2 + 'What does the passage suggest about the banyan tree?',
    ['It is very strong', 'It is nearly dead', 'It is newly planted', 'It is dangerous'],
    'Compare it with the classroom roof.',
    'The cyclone tore off a roof but the tree lost only a few branches, so <b>it is very strong</b>.');
  q('eng-comprehension', 'authors_view', 3, 'Read the passage, then answer.' + P2 + 'How does the writer seem to feel about the tree?',
    ['Admiring', 'Frightened', 'Bored', 'Annoyed'],
    'Look at what the writer chooses to tell us.',
    'The writer dwells on its age, its shade and its strength, which shows an <b>admiring</b> attitude.');

  // ══ eng-vocabulary (3) ══════════════════════════════════════════════════
  q('eng-vocabulary', 'synonyms', 2, 'Which word means the same as "delighted"?',
    ['Pleased', 'Annoyed', 'Worried', 'Puzzled'],
    'Think of a happy feeling.',
    '<b>Pleased</b> means the same as delighted. The others describe unhappy or confused feelings.');
  q('eng-vocabulary', 'antonyms', 2, 'Which word is the opposite of "ancient"?',
    ['Modern', 'Elderly', 'Historic', 'Antique'],
    'Look for the newest of these.',
    '<b>Modern</b> is the opposite of ancient. The other three all suggest something old.');
  q('eng-vocabulary', 'context_clues', 3, 'The shop was deserted, so Reena served herself. What does "deserted" mean here?',
    ['Empty of people', 'Full of shoppers', 'Newly painted', 'Closed for repairs'],
    'Use the second half of the sentence.',
    'She had to serve herself, so the shop was <b>empty of people</b>.');

})();
