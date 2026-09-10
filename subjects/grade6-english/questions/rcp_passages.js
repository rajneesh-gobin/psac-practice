'use strict';
// grade6-english — reading comprehension: 4 original passages, 10 questions each.
// IDs: g6eng-rcp-001-m1 … g6eng-rcp-004-o5
//
// All four texts are ORIGINAL and Mauritian. Contexts were checked against the
// pack's existing comprehension files first (ocean plastic, the dodo, the bins
// letter, the Rodrigues tortoise count, the tablet advert, Pieter Both, the
// rainfall table, the kestrel, Riya in the storm, Pointe Sable, the library
// blackout) — none is reused here.
//
// ⚠ These are the pack's FULL-LENGTH texts. The existing comprehension texts
// measure 138-246 words; MES Grade 6 Question 1 runs to well over 400. Each
// passage below is 400-470 words.
//
// Text types: feature article · diary · interview · instructions — four shapes
// the pack did not have, and each chosen because it has enough CRAFT in it to
// carry the `evidence` and `language` subsections honestly.
(function () {
const CH = 'g6eng-comprehension';
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · feature article · ~440 words ═══════════════════════════════
const _P1 = box(`
<b style="color:#1e40af">Read the article, then answer the question.</b><br><br>
<b>The woman who keeps the records</b><br>
<i>A feature from Rose Hill</i><br><br>
There is a wardrobe in Yolande Cadinouche's front room that she will not let
anybody move. It is not the wardrobe that matters. It is the six hundred and
forty records standing upright inside it, in paper sleeves, in the order she
decided on in 1974 and has never once changed.<br><br>
They are sega records. Ti-Frère, Serge Lebrasse, and dozens of singers whose
names are now printed nowhere else at all. Some were pressed here in Mauritius
in runs of two hundred. Madame Cadinouche is seventy-nine. She began buying them
at fifteen, from a shop on Royal Road that shut before her own children were
born.<br><br>
She does not sell them.<br><br>
That has to be written plainly, because she says it plainly, and because in
three years she has said it to a dealer from Réunion, to two collectors from
Europe, and to a man who telephoned four times from South Africa and would not
give his name.<br><br>
"They ask me what my price is," she says. "It is not a price question."<br><br>
Ask her instead about one particular record and the afternoon changes shape. She
gets up. She finds it without reading a single label — her hand goes to the
right place the way yours goes to a light switch in the dark — and she puts it
on, and she does not talk over it.<br><br>
Her nephew Bruno, who is forty-one and works with computers, has spent two years
copying the collection onto a hard disk, one side at a time, in real time. There
is no faster way. A three-minute song takes three minutes.<br><br>
"I told her a machine could do it quicker," he says. "She said the machine would
not notice if the needle jumped."<br><br>
Nine of the recordings, checked against the national archive, exist in no other
copy that anyone has yet been able to find. A student came from Réunion in March
to hear one of them. She had been writing about that song for two years and had
never once heard it. Madame Cadinouche made her tea first and played it
afterwards.<br><br>
The wardrobe has one problem, and its owner names it before a visitor can. Rose
Hill is damp. Paper sleeves grow spots. She has lost four sleeves already,
though not the discs inside them.<br><br>
She would like the collection to go somewhere dry, one day, with every name
spelt correctly on the cards.<br><br>
"Not a museum," she says. "Museums are for things that have stopped. These have
not stopped."
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-rcp-001-m1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P1 + '<p>How many of the recordings appear to exist in no other copy?</p>',
    options:['Nine of them', 'Four of them', 'Forty of them', 'Two hundred'],
    answer:'Nine of them',
    hint:'One paragraph compares the collection with the national archive.',
    explanation:'"<b>Nine</b> of the recordings, checked against the national archive, exist in no other copy." Four is the number of damaged sleeves, and two hundred is the size of some pressing runs.' }),

  makeMCQ({ id:'g6eng-rcp-001-m2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P1 + '<p>"Some were <b>pressed</b> here in Mauritius in runs of two hundred." Pressed here means</p>',
    options:['manufactured', 'squeezed flat', 'advertised', 'transported'],
    answer:'manufactured',
    hint:'Think about what "a run of two hundred" describes.',
    explanation:'Vinyl records are made by pressing the sound into a disc, so "pressed" means <b>manufactured</b>. "A run of two hundred" is a production term — it is the number of copies made.' }),

  makeMCQ({ id:'g6eng-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P1 + '<p>Why does Bruno copy each record in real time rather than faster?</p>',
    options:['Because he must hear if the needle jumps', 'Because his computer is very old and slow', 'Because his aunt refuses to lend him two', 'Because each record has to be played twice'],
    answer:'Because he must hear if the needle jumps',
    hint:'His aunt\'s reply is the reason, even though she never gives an order.',
    explanation:'"She said the machine would not notice if the <b>needle jumped</b>." A faster machine cannot listen; a person copying in real time hears the fault and can copy that side again.' }),

  makeMCQ({ id:'g6eng-rcp-001-m4', chapterId:CH, difficulty:4, subsection:'evidence',
    question:_P1 + '<p>Which detail best proves that Madame Cadinouche knows her collection by heart?</p>',
    options:['Her hand finds a record without reading the labels', 'She has kept them in the same order since 1974', 'She began buying records at the age of fifteen', 'She has refused offers from four different buyers'],
    answer:'Her hand finds a record without reading the labels',
    hint:'Look for the sentence with the comparison about a dark room in it.',
    explanation:'"She finds it <b>without reading a single label</b> — her hand goes to the right place the way yours goes to a light switch in the dark." Keeping an order, or owning records for a long time, does not by itself prove she knows where each one is.' }),

  makeMCQ({ id:'g6eng-rcp-001-m5', chapterId:CH, difficulty:4, subsection:'language',
    question:_P1 + '<p>The writer puts "She does not sell them." on a line of its own. Why?</p>',
    options:['To give the flat refusal its full weight', 'To show that she is unsure about offers', 'To warn the reader that she can be rude', 'To suggest the records are worth little'],
    answer:'To give the flat refusal its full weight',
    hint:'Compare the length of that sentence with the paragraph that follows it.',
    explanation:'A five-word sentence standing alone between two long paragraphs stops the reader, and the next line explains the choice: "That has to be <b>written plainly, because she says it plainly</b>." The form of the sentence copies her tone.' }),

  makeText({ id:'g6eng-rcp-001-o1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P1 + '<p>How many records stand in the wardrobe? Give the figure in digits.</p>',
    answer:'640', alsoAccept:['six hundred and forty','six hundred forty'],
    hint:'The number is in the first paragraph, written out in words.',
    explanation:'"the <b>six hundred and forty</b> records standing upright inside it" — 640. Two hundred is the size of some pressing runs, not the collection.' }),

  makeText({ id:'g6eng-rcp-001-o2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P1 + '<p>Find the ONE word the article uses for the paper covers that protect the records.</p>',
    answer:'sleeves', alsoAccept:['sleeve','paper sleeves'],
    hint:'It appears twice — once in the first paragraph and once near the end.',
    explanation:'The records stand "in paper <b>sleeves</b>", and later "paper sleeves grow spots… she has lost four sleeves already, though not the discs inside them".' }),

  makeText({ id:'g6eng-rcp-001-o3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P1 + '<p>The student had written about a song for two years without ever hearing it. In one word, how would she most likely have felt when it was played: bored, amazed, annoyed or afraid?</p>',
    answer:'amazed', alsoAccept:['moved','thrilled','overwhelmed'],
    hint:'She travelled from another island for three minutes of music.',
    explanation:'She "had been writing about that song for two years and had never once heard it", then crossed the sea to hear it. Hearing it at last would leave her <b>amazed</b>, which is why the writer mentions the tea made beforehand — the moment needed preparing for.' }),

  makeText({ id:'g6eng-rcp-001-o4', chapterId:CH, difficulty:4, subsection:'authors_view',
    question:_P1 + '<p>In one word, what is the writer\'s attitude towards Madame Cadinouche: mocking, admiring, pitying or angry?</p>',
    answer:'admiring', alsoAccept:['admiration','respectful','respect'],
    hint:'Notice what the writer chooses to report, and what is never once criticised.',
    explanation:'The article reports her refusals without calling them stubborn, gives her the last word, and lets her correct the visitor: "Museums are for things that have stopped." Every choice is <b>admiring</b>, although the writer never says so.' }),

  makeText({ id:'g6eng-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'language',
    question:_P1 + '<p>The writer compares her hand finding a record to reaching for one everyday object in the dark. Name that object.</p>',
    answer:'light switch', alsoAccept:['a light switch','switch','the light switch'],
    hint:'The comparison is inside the dashes, and it speaks directly to "you".',
    explanation:'"her hand goes to the right place the way yours goes to a <b>light switch</b> in the dark." The comparison works because it uses something the reader also does without looking.' })

);

// ══ PASSAGE 2 · diary · ~440 words ═════════════════════════════════════════
const _P2 = box(`
<b style="color:#166534">Read the diary, then answer the question.</b><br><br>
<b>From the diary of Krishen R.</b><br><br>
<b>Monday 9 January</b><br>
Today I took the bus by myself for the first time. Mum walked me to the stop at
Camp Fouquereaux and then went to work, and I stood there with my bag held in
front of me instead of on my back, because she said that is what you do.<br><br>
The bus came at ten past six. It was full. I stood the whole way to Curepipe,
holding the bar with both hands, watching for the sign for the church at Forest
Side, because that is one stop before mine.<br><br>
I saw the sign. I did not get off.<br><br>
There were three people between me and the door, and the bell was too far, and I
did not want to say excuse me in front of everybody. So I went one stop too far
and walked back up the hill and was seven minutes late, and Mrs Nunkoo said
nothing at all, which was worse than if she had.<br><br>
<b>Tuesday 10 January</b><br>
The same bus. The same bar. I made myself stand near the door this time.<br><br>
At Forest Side I pressed the bell. It made a noise like a small angry insect and
everybody looked, and then nobody looked, because a bell on a bus is not
interesting to anyone except the person who has just pressed it for the first
time.<br><br>
I got off. I was nine minutes early.<br><br>
<b>Friday 20 January</b><br>
Eleven days now. I know things I did not know eleven days ago: that the bus is
emptier if you take the one at ten past rather than the one at half past; that
the woman with the blue basket gets on at Trèfles and always gives her seat to
somebody older than her, which cannot be easy for her either; that the driver on
Thursdays lets the schoolchildren on first and pretends he is not doing it.<br><br>
Today the bus stopped for a long time near La Louise, and a man behind me said
something about the traffic, and I answered him. I said the road is always like
this after the market lorries have come through. He said yes, that is true.<br><br>
That was the whole conversation. I have written it down because eleven days ago
I would have looked at the floor.<br><br>
Mum asked tonight whether I still wanted her to come to the stop with me on
Monday. I said no.<br><br>
Then I said, but you can if you want to.
`, '#16a34a');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-rcp-002-m1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P2 + '<p>How late was Krishen on his first morning?</p>',
    options:['Seven minutes late', 'Three minutes late', 'Nine minutes late', 'Eleven minutes late'],
    answer:'Seven minutes late',
    hint:'The Monday entry gives the exact number after he walks back up the hill.',
    explanation:'He "went one stop too far and walked back up the hill and was <b>seven minutes late</b>". Nine minutes is how early he was on Tuesday, and eleven is the number of days by the last entry.' }),

  makeMCQ({ id:'g6eng-rcp-002-m2', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P2 + '<p>Why did Krishen fail to get off at his stop on Monday?</p>',
    options:['He was too shy to ask people to move', 'He had missed the sign for the church', 'He had fallen asleep against the bar', 'He wanted to see the end of the route'],
    answer:'He was too shy to ask people to move',
    hint:'He tells you plainly what he did not want to do in front of everybody.',
    explanation:'"I did not want to <b>say excuse me in front of everybody</b>." He states that he saw the sign, so he had not missed it — the problem was the three people and the two words.' }),

  makeMCQ({ id:'g6eng-rcp-002-m3', chapterId:CH, difficulty:4, subsection:'language',
    question:_P2 + '<p>Tuesday opens "The same bus. The same bar." Why does Krishen use two short sentences there?</p>',
    options:['To show the day starting exactly as before', 'To show he was too tired to write more', 'To show the bus was quieter that morning', 'To show how fast the journey went by'],
    answer:'To show the day starting exactly as before',
    hint:'Read the third sentence of that entry, which begins with a change.',
    explanation:'The two clipped, matching sentences set up the sameness so that the next sentence can break it: "<b>I made myself</b> stand near the door <b>this time</b>." The repetition is there to make the change visible.' }),

  makeMCQ({ id:'g6eng-rcp-002-m4', chapterId:CH, difficulty:4, subsection:'evidence',
    question:_P2 + '<p>Which detail best proves that Krishen has grown more confident?</p>',
    options:['He answers a stranger who speaks to him', 'He stands near the door on the second day', 'He knows which bus is emptier in the morning', 'He carries his bag in front of him on the bus'],
    answer:'He answers a stranger who speaks to him',
    hint:'Krishen himself explains why one small event was worth writing down.',
    explanation:'He records the conversation and then says why: "<b>eleven days ago I would have looked at the floor</b>." He measures the change himself, which no other detail does — the bag was his mother\'s instruction, not his choice.' }),

  makeMCQ({ id:'g6eng-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'authors_view',
    question:_P2 + '<p>What does the last line — "Then I said, but you can if you want to" — show about Krishen?</p>',
    options:['He is growing up without pushing her away', 'He has changed his mind about the bus', 'He is frightened of travelling alone again', 'He wants his mother to stop worrying'],
    answer:'He is growing up without pushing her away',
    hint:'He has already said no. Ask why he then adds a second sentence.',
    explanation:'The "no" is real — he can manage the journey. The line he adds afterwards leaves the door open for her, which is why it is a separate sentence and the last thing in the diary. He is <b>independent and still kind</b>.' }),

  makeText({ id:'g6eng-rcp-002-o1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P2 + '<p>At which stop should Krishen get off? Give the two-word place name.</p>',
    answer:'Forest Side', alsoAccept:['forest side','the church at Forest Side'],
    hint:'It is the stop after the church sign he watches for.',
    explanation:'He watches "for the sign for the church at <b>Forest Side</b>, because that is one stop before mine", and on Tuesday: "At Forest Side I pressed the bell."' }),

  makeText({ id:'g6eng-rcp-002-o2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P2 + '<p>The bell "made a noise like a small angry insect". In one word, what kind of sound is that: a bang, a buzz, a boom or a hiss?</p>',
    answer:'buzz', alsoAccept:['a buzz','buzzing','whine'],
    hint:'Think about the sound the insect itself makes, not the size of it.',
    explanation:'A small angry insect <b>buzzes</b>. The comparison tells you the bell was thin and irritating rather than loud, which is why he felt everybody had heard it.' }),

  makeText({ id:'g6eng-rcp-002-o3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P2 + '<p>In one word, how did Krishen feel when Mrs Nunkoo said nothing at all: relieved, ashamed, delighted or bored?</p>',
    answer:'ashamed', alsoAccept:['guilty','embarrassed','uncomfortable'],
    hint:'He tells you it was worse than the alternative. Ask why silence could be worse.',
    explanation:'"Mrs Nunkoo said nothing at all, <b>which was worse than if she had</b>." A telling-off would have settled the matter; her silence left him to judge himself, so he feels <b>ashamed</b>.' }),

  makeText({ id:'g6eng-rcp-002-o4', chapterId:CH, difficulty:4, subsection:'language',
    question:_P2 + '<p>Which TWO words does Krishen use to begin both of the first two sentences of the Tuesday entry?</p>',
    answer:'The same', alsoAccept:['the same','same'],
    hint:'Look at the two very short sentences that open Tuesday.',
    explanation:'"<b>The same</b> bus. <b>The same</b> bar." Repeating the opening of a sentence is called anaphora, and here it makes the morning feel identical to Monday\'s — until he changes one thing.' }),

  makeText({ id:'g6eng-rcp-002-o5', chapterId:CH, difficulty:4, subsection:'evidence',
    question:_P2 + '<p>Copy the ONE word from the Friday entry that shows what Krishen used to look at instead of speaking to people.</p>',
    answer:'floor', alsoAccept:['the floor','ground'],
    hint:'It is in the sentence explaining why the conversation was worth writing down.',
    explanation:'"eleven days ago I would have looked at the <b>floor</b>." That single word is the evidence that the short exchange with the man was a real change in him.' })

);

// ══ PASSAGE 3 · interview · ~440 words ═════════════════════════════════════
const _P3 = box(`
<b style="color:#7c2d12">Read the interview, then answer the question.</b><br><br>
<b>Five minutes with Shalini Runghen, 12</b><br>
<i>Shalini kept goal for the Bambous Rovers under-13s on Saturday, in her first
competitive match. The interviewer's questions are in bold.</i><br><br>
<b>Rovers lost 2-1. How do you feel about your first match?</b><br>
It was fine.<br><br>
<b>Only fine?</b><br>
The second goal was mine. I came out for the ball, I did not get it, and it went
in behind me. So: fine.<br><br>
<b>Your coach says the save you made in the first half was the best thing on the
pitch all afternoon.</b><br>
He says that to everybody.<br><br>
<b>He says it to everybody who stops a shot from six metres with one hand?</b><br>
[silence] All right. That one was good.<br><br>
<b>You are the only girl in the squad. Was that difficult?</b><br>
On Saturday, no. In October, yes. In October I had to ask three times before
anybody would put me in goal in training, and they only did it in the end
because Yannick had a cold. Then I stopped four out of five, and after that
nobody asked me anything again. It is easier to be argued with about football
than about being a girl. Football you can answer.<br><br>
<b>Where did the gloves come from?</b><br>
My brother's. They are two sizes too big. My mother put a stitch across each
finger so that they stay on, and she is not somebody who sews, so it took her a
whole Sunday evening.<br><br>
<b>Are you going to ask for a pair of your own?</b><br>
No. Those ones are lucky now.<br><br>
<b>What is the hardest part of playing in goal?</b><br>
Waiting. When the ball is up at the other end for ten minutes you get cold, and
you start thinking about your shoes, and then the ball comes back very fast.
Everybody thinks the hard part is the diving. The hard part is the ten
minutes.<br><br>
<b>Was your mother at the ground?</b><br>
She does not watch. She waits at the gate with the car and asks me the score
before I have the bag off my shoulder. On Saturday she asked twice, because the
first time I told her the score and nothing else.<br><br>
<b>What did your father say afterwards?</b><br>
Nothing at the ground. In the car he said my angles were wrong for the second
goal, and he was right. Then at home he put the match ball on top of the fridge,
where the cups go.<br><br>
<b>Where do you want to be at eighteen?</b><br>
In goal.<br><br>
<b>That is all?</b><br>
That is all. People ask that question as though you have to name a country. I
want to go on being the person they put in goal.
`, '#ea580c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-rcp-003-m1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P3 + '<p>Whose gloves does Shalini wear in goal?</p>',
    options:['Her brother\'s', 'Her father\'s', 'Her mother\'s', 'Her cousin\'s'],
    answer:'Her brother\'s',
    hint:'Her mother altered them, but did not own them.',
    explanation:'"My <b>brother\'s</b>. They are two sizes too big." Her mother is the one who put a stitch across each finger so that they would stay on.' }),

  makeMCQ({ id:'g6eng-rcp-003-m2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P3 + '<p>Shalini says the gloves "are lucky now". She means that she</p>',
    options:['has grown fond of the pair she owns', 'believes they were expensive to buy', 'thinks the stitches have worn away', 'wants a newer pair before next week'],
    answer:'has grown fond of the pair she owns',
    hint:'She says it in answer to a question about buying new ones.',
    explanation:'She is asked whether she will ask for her own pair and answers "No. Those ones are lucky now." Calling them lucky is her way of saying she is <b>attached</b> to them — to the Sunday evening of stitching as much as to the saves.' }),

  makeMCQ({ id:'g6eng-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P3 + '<p>Why did the squad stop questioning Shalini after October?</p>',
    options:['She had proved she could do the job', 'The coach had ordered them to stop', 'Yannick had recovered from his cold', 'Her brother had spoken to the team'],
    answer:'She had proved she could do the job',
    hint:'Something happened in that training session that could not be argued with.',
    explanation:'"Then I <b>stopped four out of five</b>, and after that nobody asked me anything again." Her own line explains it: "It is easier to be argued with about football than about being a girl. Football you can answer."' }),

  makeMCQ({ id:'g6eng-rcp-003-m4', chapterId:CH, difficulty:4, subsection:'evidence',
    question:_P3 + '<p>Which answer best shows that Shalini judges her own play strictly?</p>',
    options:['She calls the second goal her own mistake', 'She says her first save was a good one', 'She keeps the gloves that her brother wore', 'She wants to be in goal when she is older'],
    answer:'She calls the second goal her own mistake',
    hint:'Look at the first thing she volunteers when pressed on "only fine".',
    explanation:'"<b>The second goal was mine.</b> I came out for the ball, I did not get it, and it went in behind me." She names her own error before anyone asks about it, and she agrees with her father in the car afterwards.' }),

  makeMCQ({ id:'g6eng-rcp-003-m5', chapterId:CH, difficulty:4, subsection:'language',
    question:_P3 + '<p>The interviewer prints "[silence]" instead of words. What does this add?</p>',
    options:['It shows her pause before she admits it', 'It shows the recorder had a fault', 'It shows she had not heard the question', 'It shows she refused to answer at all'],
    answer:'It shows her pause before she admits it',
    hint:'Read what she says immediately after the bracket.',
    explanation:'The pause is followed by "<b>All right. That one was good.</b>" Printing the silence lets the reader feel her giving way — a description such as "she thought for a moment" would have been slower and told us less.' }),

  makeText({ id:'g6eng-rcp-003-o1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P3 + '<p>What was the final score of the match? Write it in the form 3-0.</p>',
    answer:'2-1', alsoAccept:['2 - 1','two-one','2 1'],
    hint:'It is in the interviewer\'s very first question.',
    explanation:'"Rovers lost <b>2-1</b>." Shalini goes on to explain that the second of those two goals was her own error.' }),

  makeText({ id:'g6eng-rcp-003-o2', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P3 + '<p>In one word, what does putting the match ball on top of the fridge show her father was: angry, proud, worried or amused?</p>',
    answer:'proud', alsoAccept:['pleased','delighted','happy'],
    hint:'She tells you what is usually kept in that place.',
    explanation:'He puts it "on top of the fridge, <b>where the cups go</b>" — the shelf the family keeps its trophies on. He never says a word of praise, so the writer lets the shelf say it.' }),

  makeText({ id:'g6eng-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P3 + '<p>Her father said her "angles were wrong". In one word, what does angle mean here: her position, her speed, her voice or her luck?</p>',
    answer:'position', alsoAccept:['positioning','placing','stance'],
    hint:'She had come out for the ball and had not reached it.',
    explanation:'A goalkeeper\'s angle is where she stands in relation to the ball and the goal, so "my angles were wrong" means her <b>position</b> was wrong when she came out.' }),

  makeText({ id:'g6eng-rcp-003-o4', chapterId:CH, difficulty:4, subsection:'authors_view',
    question:_P3 + '<p>In one word, what does the interviewer clearly think of Shalini: impressed, bored, doubtful or annoyed?</p>',
    answer:'impressed', alsoAccept:['admiring','interested','respectful'],
    hint:'Consider why the interviewer refuses to accept her first answer.',
    explanation:'The interviewer pushes back — "Only fine?" and "He says it to everybody who stops a shot from six metres with one hand?" — because he will not let her dismiss what she did. That pressure is <b>admiration</b>, not doubt.' }),

  makeText({ id:'g6eng-rcp-003-o5', chapterId:CH, difficulty:4, subsection:'language',
    question:_P3 + '<p>Shalini answers the first question with three words. Copy them exactly.</p>',
    answer:'It was fine', alsoAccept:['it was fine.','fine'],
    hint:'It is the shortest reply in the whole interview but one.',
    explanation:'"<b>It was fine.</b>" The flat, three-word answer to a big question is the interview\'s method: she keeps understating, and the interviewer keeps opening the answers back up.' })

);

// ══ PASSAGE 4 · instructions · ~430 words ══════════════════════════════════
const _P4 = box(`
<b style="color:#6d28d9">Read the instructions, then answer the question.</b><br><br>
<b>How to Make a Kite for the August Wind</b><br>
<i>Written down by Uncle Vinod for anyone in the family who asks, so that he does
not have to explain it all again.</i><br><br>
<b>You will need:</b> two lengths of dry bamboo, one about 70 cm and one about
50 cm; a large sheet of thin paper; string; glue; a strip of old cloth for the
tail.<br><br>
<b>1.</b> Choose your bamboo in the morning, while it is dry. Bend each stick a
little between your hands. If it creaks, put it down and choose another one. A
stick that creaks in your hands will break in the sky, and it always breaks over
the one tree in the field.<br><br>
<b>2.</b> Lay the short stick across the long one, a third of the way down. A
third. Not the middle. Nearly everybody puts it in the middle the first time and
then wonders why the kite spins.<br><br>
<b>3.</b> Tie the two sticks together where they cross. Wind the string one way,
then across, then the other way, and finish with a knot you can see. Never use
wire.<br><br>
<b>4.</b> Run a loop of string around the four ends to make the frame. Keep it
just tight enough to hum when you flick it, and no tighter, or the frame will
bend out of shape.<br><br>
<b>5.</b> Lay the frame on the paper and cut around it, leaving two fingers of
paper all the way round. Fold that edge over the string and glue it down a
little at a time, working from the top.<br><br>
<b>6.</b> Make the tail from cloth, not from paper. Start with a tail about six
times the length of the kite. If the kite dives, add to the tail. If it will not
rise at all, cut a piece off. You cannot get this right on the ground, so do not
try to.<br><br>
<b>7.</b> Go to open ground. Not the road. Not near the electricity lines, ever,
and not on a day after rain, when the string will hold water.<br><br>
<b>8.</b> Stand with your back to the wind. Let out about ten metres of string,
hold the kite up and let go of it. Do not run. Running is what people do when
they have made the tail too short.<br><br>
One last thing. If you have borrowed your grandmother's broom for the tail
cloth, put the broom back before she asks for it, and do not put back the piece
you have already cut off. Cut that from something of your own next time.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-rcp-004-m1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P4 + '<p>Where should the short stick be laid across the long one?</p>',
    options:['A third of the way down', 'Exactly across the middle', 'At the very top corner', 'Two fingers from the end'],
    answer:'A third of the way down',
    hint:'Step 2 gives the measurement twice, and then says what it is not.',
    explanation:'"Lay the short stick across the long one, <b>a third of the way down</b>. A third. Not the middle." The middle is named only as the mistake nearly everybody makes.' }),

  makeMCQ({ id:'g6eng-rcp-004-m2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P4 + '<p>The writer says a stick that <b>creaks</b> should be put down. A creak is</p>',
    options:['a dry cracking sound', 'a smooth green bend', 'a small dark mark', 'a sharp new smell'],
    answer:'a dry cracking sound',
    hint:'It is what you hear when you bend the stick, not what you see on it.',
    explanation:'A <b>creak</b> is the dry cracking noise old wood makes under strain — the warning that the fibres are already giving way, which is why "a stick that creaks in your hands will break in the sky".' }),

  makeMCQ({ id:'g6eng-rcp-004-m3', chapterId:CH, difficulty:4, subsection:'evidence',
    question:_P4 + '<p>Which detail best proves that the writer has made a great many kites?</p>',
    options:['That it always breaks over the one tree', 'That the tail should be made of cloth', 'That bamboo is chosen in the morning', 'That you stand with your back to the wind'],
    answer:'That it always breaks over the one tree',
    hint:'Three of these could be copied out of any book. One could not.',
    explanation:'"and it <b>always</b> breaks over the one tree in the field" is not a rule — it is a complaint, and only somebody who has lost several kites over that particular tree would write it. The other three are ordinary instructions.' }),

  makeMCQ({ id:'g6eng-rcp-004-m4', chapterId:CH, difficulty:4, subsection:'language',
    question:_P4 + '<p>Why is "Never use wire." written as a short sentence of its own?</p>',
    options:['To make the warning impossible to miss', 'To show the writer has run out of string', 'To keep the whole list short and simple', 'To suggest wire is hard to find nearby'],
    answer:'To make the warning impossible to miss',
    hint:'Compare its length with the long instruction that comes before it.',
    explanation:'Step 3 is one long winding sentence about knots, and then three blunt words stop it dead. A wire kite line near electricity lines can kill, so the writer gives the warning the <b>shortest, hardest form</b> he has.' }),

  makeMCQ({ id:'g6eng-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P4 + '<p>Why does the writer tell you not to run with the kite?</p>',
    options:['Running only hides a fault in the tail', 'Running will tire you out too quickly', 'Running is not allowed on open ground', 'Running may snap the string in two'],
    answer:'Running only hides a fault in the tail',
    hint:'The sentence after the instruction says what running really means.',
    explanation:'"Running is what people do <b>when they have made the tail too short</b>." A kite with the right tail rises on the wind alone, so running is treating the symptom instead of the fault.' }),

  makeText({ id:'g6eng-rcp-004-o1', chapterId:CH, difficulty:3, subsection:'retrieval',
    question:_P4 + '<p>How long should the tail be to start with? Complete: about ___ times the length of the kite.</p>',
    answer:'six', alsoAccept:['6','six times'],
    hint:'The figure is in step 6, in the sentence that begins "Start with".',
    explanation:'"Start with a tail about <b>six</b> times the length of the kite." It is a starting point only — step 6 then tells you to add to it or cut it once the kite is flying.' }),

  makeText({ id:'g6eng-rcp-004-o2', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P4 + '<p>In one word, what must you do to the tail if the kite keeps diving: shorten, lengthen, wet or remove?</p>',
    answer:'lengthen', alsoAccept:['add','extend','make it longer'],
    hint:'Step 6 pairs two opposite faults with two opposite cures.',
    explanation:'"If the kite dives, <b>add to the tail</b>. If it will not rise at all, cut a piece off." A diving kite needs more weight and drag behind it, so you lengthen the tail.' }),

  makeText({ id:'g6eng-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P4 + '<p>The frame string should be tight enough to <b>hum</b> when flicked. In one word, hum describes a: sound, colour, smell or weight?</p>',
    answer:'sound', alsoAccept:['a sound','noise','tone'],
    hint:'Think about what a plucked guitar string does.',
    explanation:'To <b>hum</b> is to make a low steady note, so the writer is giving you a test you can hear: a string tight enough to sing is tight enough, and any tighter will bend the frame.' }),

  makeText({ id:'g6eng-rcp-004-o4', chapterId:CH, difficulty:4, subsection:'authors_view',
    question:_P4 + '<p>In one word, how does Uncle Vinod expect you to behave about the borrowed broom: honestly, secretly, rudely or carelessly?</p>',
    answer:'honestly', alsoAccept:['honest','honesty','truthfully'],
    hint:'He tells you to return it before you are asked for it.',
    explanation:'"put the broom back <b>before she asks for it</b>, and do not put back the piece you have already cut off." He expects the borrowing to be owned up to, not hidden — the joke carries a real rule about <b>honesty</b>.' }),

  makeText({ id:'g6eng-rcp-004-o5', chapterId:CH, difficulty:4, subsection:'language',
    question:_P4 + '<p>In step 7 the writer begins two warnings with the same single word. Copy that word.</p>',
    answer:'Not', alsoAccept:['not','the word not'],
    hint:'Look at the two short phrases that follow "Go to open ground."',
    explanation:'"<b>Not</b> the road. <b>Not</b> near the electricity lines, ever." Beginning both warnings with the same word turns a list of places into a drumbeat of refusals, which is far harder to skim past than "you should avoid…".' })

);

})();
