'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade7-english — reading comprehension: 6 original passages, 10 questions
//  each (5 makeMCQ + 5 makeText).  IDs: g7eng-rcp-001-m1 … g7eng-rcp-006-o5
//
//  WHY THIS FILE EXISTS
//    g7eng-reading held no passage at all. Its longest reading stem was 52
//    words, so "reading comprehension" in this pack meant answering one
//    question about a snippet. A comprehension is a TEXT read once and then
//    questioned several times over; that is what a block of ten is.
//
//  ⚠ EVERY PASSAGE IS ORIGINAL. Nothing here is copied from a paper, a
//    textbook or a website. Six different TEXT TYPES, because a pack that is
//    six stories teaches one skill:
//      1 narrative story   2 formal letter   3 newspaper report
//      4 information article   5 diary/recount   6 interview
//
//  ⚠ THE PASSAGE IS REPEATED ON ALL TEN QUESTIONS, on purpose — practice and
//    exam mode both serve single questions at random, so a child must never
//    have to scroll back to a text they have left.
//
//  ⚠ EVERY PHRASE A QUESTION OR EXPLANATION QUOTES IS IN THE PASSAGE
//    VERBATIM. An explanation citing text that is no longer there still marks
//    correctly, so nothing fails and the child is the only one who notices.
//
//  ⚠ Only the two DECLARED subsections are used — main_idea_details and
//    inferring_vocabulary, five and five in every block. A third would hide
//    the questions from the syllabus screen and fail the invariant test.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g7eng-reading';

// Both `background` and `color` are set explicitly and must stay that way: the
// app has a dark theme, and a box with only one of them is either white text
// on white or invisible ink on the dark ground.
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · narrative story · first term at a new college ═════════════
const _P1 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>The Longest Corridor</b><br><br>
Anjali had walked past the college gates a hundred times, always on her way to
somewhere else. On Monday morning she walked through them, and everything looked
different from the inside.<br><br>
Her uniform was still stiff from the shop. The skirt had been bought two sizes
too big so that it would last until Form III, and the belt gathered it into
awkward folds. Her bag held six new exercise books, a geometry set she did not
yet know how to use, and a box of dholl puri that her mother had packed at half
past five.<br><br>
The corridor on the first floor seemed to go on forever. Older pupils moved
along it easily, the way people move in a place they have known for years.
Anjali counted the doors as she passed them: 1A, 1B, 1C. Her admission slip said
1D. At the end of the corridor there was a staircase, a noticeboard and a locked
store room, but no 1D at all.<br><br>
She read the slip again, as though the letter on it might change. Somewhere
below her a bell rang, and the corridor emptied in under a minute. Anjali stayed
where she was, holding her bag against her chest with both arms.<br><br>
"You are looking for 1D."<br><br>
The woman who had spoken was carrying a stack of registers under one arm. She
did not sound surprised, and she did not sound impatient either.<br><br>
"It is not here, Madam," Anjali said.<br><br>
"It is behind the science block. They ran out of rooms in this building the year
I started teaching, and they have been running out ever since." She shifted the
registers to her other arm. "Walk with me. I am going that way."<br><br>
They crossed a courtyard where the tarmac was still wet from the night's rain.
The teacher asked where Anjali had come from, and Anjali said the primary school
at Camp Fouquereaux, and the teacher said she had taught two pupils from there
who were now doctors, which was probably not true but was kind.<br><br>
Room 1D turned out to be a long room with high windows and a ceiling fan that
ticked as it turned. Thirty-one faces looked round when the door opened. Anjali
took the only free desk, in the second row, beside a girl who moved her pencil
case along without being asked.<br><br>
By November, Anjali knew the way to every room in the college, including the two
that nobody could ever find. On the last Friday of term she came out of the
library and saw a small boy in a stiff new uniform standing at the end of the
first-floor corridor, reading a slip of paper as though the letter on it might
change.<br><br>
She did not walk past him.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P1 + '<p>Where was Room 1D?</p>',
    options:['Behind the science block',
             'Beside the locked store room',
             'Next to the college library',
             'Upstairs above the courtyard'],
    answer:'Behind the science block',
    hint:'The teacher answers this in her first reply to Anjali.',
    explanation:'The teacher says plainly: <i>"It is behind the science block."</i> The store room, the library and the courtyard are all mentioned, which is exactly why they make tempting wrong answers.' }),

  makeMCQ({ id:'g7eng-rcp-001-m2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P1 + '<p>What did Anjali do when the bell rang and the corridor emptied?</p>',
    options:['She stayed where she was',
             'She followed the older pupils',
             'She went back to the gates',
             'She knocked on door 1C'],
    answer:'She stayed where she was',
    hint:'Read the sentence immediately after the bell is mentioned.',
    explanation:'The text says <i>"Anjali stayed where she was, holding her bag against her chest with both arms."</i> She does not move until the teacher speaks to her.' }),

  makeMCQ({ id:'g7eng-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P1 + '<p>Which sentence best states what the passage is mainly about?</p>',
    options:['A new pupil is lost and later helps another',
             'A teacher shows a pupil round a large college',
             'A college has too few rooms for its pupils',
             'A girl dislikes her new school uniform'],
    answer:'A new pupil is lost and later helps another',
    hint:'The main idea has to cover the LAST paragraph as well as the first.',
    explanation:'The shortage of rooms and the uniform are details along the way. The passage begins with Anjali lost in the corridor and ends with her seeing a boy in the same position: <i>"She did not walk past him."</i>' }),

  makeMCQ({ id:'g7eng-rcp-001-m4', chapterId:CH, difficulty:2, subsection:'inferring_vocabulary',
    question:_P1 + '<p>The uniform is described as <b>stiff</b>. This suggests that it was</p>',
    options:['brand new and never worn',
             'washed far too many times',
             'much too small for Anjali',
             'made of very cheap cloth'],
    answer:'brand new and never worn',
    hint:'What else does the passage say about where the uniform came from?',
    explanation:'The uniform was <i>"still stiff from the shop"</i>, and at the end the small boy wears <i>"a stiff new uniform"</i> too. Cloth softens with washing and wearing, so stiffness here means newness.' }),

  makeMCQ({ id:'g7eng-rcp-001-m5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P1 + '<p>The narrator says the teacher\'s remark about the two doctors was "probably not true but was kind". What does this show?</p>',
    options:['The teacher spoke to put Anjali at ease',
             'The teacher was boasting about her career',
             'The teacher had forgotten those two pupils',
             'The teacher wanted Anjali to study medicine'],
    answer:'The teacher spoke to put Anjali at ease',
    hint:'Ask what the remark was FOR, not whether it was accurate.',
    explanation:'The narrator judges the remark twice over: it was <i>"probably not true"</i>, and it was <i>"kind"</i>. The teacher is filling the walk with something friendly for a frightened first-day pupil, which matters more than whether the doctors exist.' }),

  makeText({ id:'g7eng-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P1 + '<p>In which month did Anjali know her way to every room in the college? (One word.)</p>',
    answer:'November', alsoAccept:['in November','by November','Nov'],
    hint:'The last part of the passage jumps forward in time. Look for the month.',
    explanation:'<i>"By November, Anjali knew the way to every room in the college."</i> The story opens in the first week of term and closes on the last Friday of that term.' }),

  makeText({ id:'g7eng-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P1 + '<p>Which class was Anjali in, according to her admission slip? (Write it exactly.)</p>',
    answer:'1D', alsoAccept:['D','Class 1D','Form 1D','1 D'],
    hint:'She counts the doors 1A, 1B, 1C — and then looks for one more.',
    explanation:'<i>"Her admission slip said 1D."</i> The other rooms are on the first floor; 1D is the one behind the science block.' }),

  makeText({ id:'g7eng-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P1 + '<p>In one word, how does Anjali feel while she stands alone at the end of the empty corridor?</p>',
    answer:'lost', alsoAccept:['anxious','worried','nervous','afraid','scared','frightened','confused','alone','uneasy'],
    hint:'Look at what she does with her bag, not at what she says.',
    explanation:'The passage never names the feeling. It shows it: she reads the slip again <i>"as though the letter on it might change"</i> and holds her bag <i>"against her chest with both arms"</i> — the posture of somebody lost and anxious.' }),

  makeText({ id:'g7eng-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P1 + '<p>The girl in the second row "moved her pencil case along without being asked". In one word, what does this show she was being?</p>',
    answer:'kind', alsoAccept:['welcoming','friendly','thoughtful','considerate','helpful','polite','generous'],
    hint:'The important words are "without being asked".',
    explanation:'Nobody told her to make room. A small act done before it is requested is the passage\'s way of showing kindness — the same quality Anjali shows the boy in the final line.' }),

  makeText({ id:'g7eng-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P1 + '<p>The passage ends "She did not walk past him." In one word, what is Anjali about to give the boy?</p>',
    answer:'help', alsoAccept:['kindness','directions','assistance','support','attention','guidance'],
    hint:'Think about what Anjali herself needed at the same spot in September.',
    explanation:'The last line is written as a negative — she does <b>not</b> walk past — so the reader supplies the positive. She will do for him what the teacher with the registers did for her: give help, and the directions that go with it.' }),

);

// ══ PASSAGE 2 · formal letter · the 6.40 bus to Curepipe ══════════════════
const _P2 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
28, Avenue des Filaos<br>
Camp Fouquereaux<br>
9 February 2026<br><br>
The Manager<br>
Southern Coaches Ltd<br>
Curepipe<br><br>
Dear Sir or Madam,<br><br>
<b>Subject: The 6.40 a.m. service from Camp Fouquereaux to Curepipe</b><br><br>
I am writing on behalf of the twenty-eight pupils of Form 1D at Vacoas College,
all of whom travel to Curepipe on your 6.40 a.m. service every school
morning. We should like to bring three difficulties to your attention, and to
suggest one solution.<br><br>
First, the bus is usually full before it reaches our stop. Last week our class
kept a record of what happened each morning. On three of the five mornings the
bus did not stop at all, because there was no room for anyone to board. On the
other two mornings, eleven of us stood in the gangway for the whole journey,
holding our bags above our heads so that the doors could close.<br><br>
Second, the next service is at 7.15. Our first lesson begins at 7.30, and the
journey takes at least twenty-five minutes even when the road is clear. Ten
pupils in our class have been marked late this term through no fault of their
own. Two of them were kept in after school as a result. Their parents did not
think that was fair, and neither do we.<br><br>
Third, there is no shelter at the Camp Fouquereaux stop. In January we waited on
three mornings in heavy rain and reached school with wet books. A pupil cannot
sit a test on paper that has dried into waves.<br><br>
We understand that a bus company cannot simply buy another vehicle, and that
your drivers are not to blame for a bus that has filled at Quatre Bornes. That
is why our suggestion is a small one. Could one extra bus run at 6.50, on school
mornings only, between February and November? On Wednesday we counted forty-one
pupils in uniform waiting at our stop, from three different colleges. A single
bus would carry all of them and would run only two hundred days a year.<br><br>
We should be glad to show you the record we kept. It is one page of dates, times
and numbers, and it took us five mornings to make. If a member of your staff
could come to the stop one morning at twenty to seven, we would meet him there
and hand it to him. He is welcome to keep the page, because we have copied it
into the back of my exercise book and can make another.<br><br>
We are grateful for the service you provide in all weather, and we hope that you
will consider our request.<br><br>
Yours faithfully,<br><br>
<b>Nyansha Ramdin</b><br>
Class Secretary, Form 1D
`, '#0d9488');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P2 + '<p>Why is Nyansha writing to the bus company?</p>',
    options:['To report problems with the 6.40 service',
             'To thank the drivers for their patience',
             'To ask for cheaper fares for pupils',
             'To complain about a rude conductor'],
    answer:'To report problems with the 6.40 service',
    hint:'The subject line and the first paragraph together give the purpose.',
    explanation:'She writes to <i>"bring three difficulties to your attention, and to suggest one solution"</i>, all of them about the 6.40 a.m. service. She does thank the company at the end, but that is not why she wrote.' }),

  makeMCQ({ id:'g7eng-rcp-002-m2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P2 + '<p>On how many of the five mornings did the bus fail to stop at all?</p>',
    options:['Three', 'Two', 'Four', 'Five'],
    answer:'Three',
    hint:'The second paragraph splits the five mornings into two groups.',
    explanation:'<i>"On three of the five mornings the bus did not stop at all."</i> On the other two it stopped, and eleven pupils stood in the gangway.' }),

  makeMCQ({ id:'g7eng-rcp-002-m3', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P2 + '<p>What solution does the class suggest?</p>',
    options:['An extra bus at 6.50 on school days',
             'A later start to the school day',
             'A shelter built at their bus stop',
             'A fine for drivers who do not stop'],
    answer:'An extra bus at 6.50 on school days',
    hint:'She promises one solution at the start. Find where she keeps that promise.',
    explanation:'<i>"Could one extra bus run at 6.50, on school mornings only, between February and November?"</i> The missing shelter is listed as a difficulty, not offered as the solution.' }),

  makeMCQ({ id:'g7eng-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P2 + '<p>The phrase <b>on behalf of</b> in the first paragraph shows that Nyansha is writing</p>',
    options:['for the whole class, not just herself',
             'without telling her classmates first',
             'because a teacher ordered her to do it',
             'to defend herself against a complaint'],
    answer:'for the whole class, not just herself',
    hint:'Look at how she signs the letter as well as how she opens it.',
    explanation:'She writes <i>"on behalf of the twenty-eight pupils of Form 1D"</i> and signs as <i>"Class Secretary"</i>. To act on behalf of a group is to speak for it.' }),

  makeMCQ({ id:'g7eng-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P2 + '<p>The letter closes "Yours faithfully" rather than "Yours sincerely". What does that tell you?</p>',
    options:['The writer does not know the manager by name',
             'The writer has met the manager before',
             'The writer is angry with the manager',
             'The writer expects no reply at all'],
    answer:'The writer does not know the manager by name',
    hint:'Look back at the greeting at the top of the letter.',
    explanation:'The letter opens <i>"Dear Sir or Madam"</i> — the greeting used when the writer does not know the reader\'s name — and English letter-writing pairs that opening with <b>Yours faithfully</b>. A named reader would take "Dear Mr…" and "Yours sincerely".' }),

  makeText({ id:'g7eng-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P2 + '<p>At what time does the next service leave after the 6.40 bus? (Write the time.)</p>',
    answer:'7.15', alsoAccept:['7:15','7.15 a.m.','7:15 a.m.','7.15am','quarter past seven'],
    hint:'The second difficulty begins with this time.',
    explanation:'<i>"Second, the next service is at 7.15."</i> That is the whole problem: the first lesson begins at 7.30 and the journey takes at least twenty-five minutes.' }),

  makeText({ id:'g7eng-rcp-002-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P2 + '<p>How many pupils are there in Form 1D? (Write the number.)</p>',
    answer:'twenty-eight', alsoAccept:['28','twenty eight'],
    hint:'The number is in the very first sentence of the letter.',
    explanation:'She writes <i>"on behalf of the twenty-eight pupils of Form 1D"</i>. The forty-one pupils counted on Wednesday came from three different colleges, not from her class.' }),

  makeText({ id:'g7eng-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P2 + '<p>In one word, how would you describe the TONE of this letter?</p>',
    answer:'polite', alsoAccept:['formal','respectful','courteous','reasonable','calm','firm','businesslike'],
    hint:'Notice that she blames nobody, yet still asks for something.',
    explanation:'She excuses the drivers, admits a company <i>"cannot simply buy another vehicle"</i>, and still asks clearly for the 6.50 bus. That mixture — respectful but firm — is the register a formal letter of complaint should keep.' }),

  makeText({ id:'g7eng-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P2 + '<p>What does the word <b>gangway</b> mean here? Answer in one or two words.</p>',
    answer:'the aisle', alsoAccept:['aisle','passage','the passage','walkway','passageway','corridor','the corridor'],
    hint:'Eleven pupils stood in it, and the doors still had to close.',
    explanation:'They <i>"stood in the gangway for the whole journey"</i>: the gangway is the narrow walking space between the seats of a bus — the aisle.' }),

  makeText({ id:'g7eng-rcp-002-o5', chapterId:CH, difficulty:2, subsection:'inferring_vocabulary',
    question:_P2 + '<p>What does the word <b>grateful</b> mean in the last paragraph? Give one word.</p>',
    answer:'thankful', alsoAccept:['pleased','appreciative','glad','happy','thankfull'],
    hint:'Look at what she is grateful FOR: the service in all weather.',
    explanation:'<i>"We are grateful for the service you provide in all weather."</i> To be grateful is to be thankful — and ending a complaint with thanks is what keeps the letter polite.' }),

);

// ══ PASSAGE 3 · newspaper report · beach clean-up at Flic en Flac ═════════
const _P3 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>Volunteers Take 340 Bags Off Flic en Flac Beach</b><br>
<i>By our reporter · Flic en Flac · Sunday</i><br><br>
More than two hundred volunteers cleared 340 bags of waste from a two-kilometre
stretch of the public beach at Flic en Flac yesterday, working from six in the
morning until eleven.<br><br>
The clean-up was organised by a group of Form 1 pupils from a college in Quatre
Bornes. They wrote to the village council in November and were lent a lorry, a
weighing scale and forty pairs of gloves.<br><br>
Everything collected was sorted before it was carried away. The volunteers
counted 1,220 plastic bottles, 986 bottle caps and just over 4,000 drinking
straws. They pulled 240 metres of fishing line out of the vacoas roots at the
northern end and, to everybody's surprise, the door of a refrigerator. The lorry
made three journeys. Weighed at the tip, the load came to just under one
tonne.<br><br>
The sorting took almost as long as the collecting. Volunteers worked in lines of
six along the sand, with one sack for glass, one for plastic and one for
everything that nobody could put a name to. The youngest helpers were each given
a counting sheet and a pencil, which is why yesterday's totals are exact numbers
and not estimates.<br><br>
"We expected bottles," said Mrs Veeren, the teacher who walked the beach with
the pupils. "What none of us expected was the straws. They weigh almost nothing,
so nobody notices them, and they were the biggest number on our list by
far."<br><br>
A marine biologist from the university, who joined the group at eight o'clock,
said the fishing line and the straws worried her most. A turtle cannot tell a
floating straw from the small fish it hunts, she explained, and line that is
caught in coral goes on catching for years after the boat that lost it has gone
home.<br><br>
Half of the waste, she added, had not been dropped by people using the beach at
all. It had come in on the tide, from boats and from drains along the coast. "The
sea gave most of it back to us," she said. "It always does, and it always
will."<br><br>
"I have swum here all my life," said Kervin, who is twelve and helped to count
the caps. "I never once looked at the line where the sand meets the
vacoas."<br><br>
The council has since installed twelve new bins along the road behind the beach
and has agreed to empty them twice a week during the summer months.<br><br>
A second clean-up is planned for the last Sunday in April. Anyone who wishes to
help is asked to bring gloves, a hat and drinking water, and to arrive before
seven, while the sand is still cool.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P3 + '<p>How many bags of waste were collected?</p>',
    options:['340', '240', '986', '1,220'],
    answer:'340',
    hint:'The headline and the first sentence agree on this number.',
    explanation:'<i>"…volunteers cleared 340 bags of waste"</i>. 240 is the metres of fishing line, 986 the bottle caps and 1,220 the plastic bottles.' }),

  makeMCQ({ id:'g7eng-rcp-003-m2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P3 + '<p>Who organised the clean-up?</p>',
    options:['A group of Form 1 pupils',
             'The village council office',
             'A team of local fishermen',
             'A hotel next to the beach'],
    answer:'A group of Form 1 pupils',
    hint:'The council lent things. That is not the same as organising.',
    explanation:'<i>"The clean-up was organised by a group of Form 1 pupils from a college in Quatre Bornes."</i> The council supplied a lorry, a scale and gloves after the pupils wrote to it.' }),

  makeMCQ({ id:'g7eng-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P3 + '<p>What is this report mainly about?</p>',
    options:['A clean-up and what it found',
             'A new law against plastic bags',
             'A turtle rescued from the reef',
             'A quarrel over beach parking'],
    answer:'A clean-up and what it found',
    hint:'A main idea must cover the counting paragraphs as well as the quotations.',
    explanation:'The report gives who cleaned, when, and — at length — exactly what came off the beach. The turtle appears only in the biologist\'s explanation of why straws matter.' }),

  makeMCQ({ id:'g7eng-rcp-003-m4', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P3 + '<p>The biologist says, "The sea gave most of it back to us." What does she mean?</p>',
    options:['Much of the rubbish had washed ashore',
             'The tide carried the bags out again',
             'Swimmers had dropped it in the water',
             'The sea is cleaner than the beach is'],
    answer:'Much of the rubbish had washed ashore',
    hint:'Read the sentence just before the quotation.',
    explanation:'She has just said that half the waste <i>"had come in on the tide, from boats and from drains along the coast"</i>. Her sentence turns that into an image: rubbish thrown into the sea is not gone, it is only returned later.' }),

  makeMCQ({ id:'g7eng-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P3 + '<p>A two-kilometre <b>stretch</b> of beach means</p>',
    options:['a length of the shore',
             'a rope pulled tight',
             'a deep part of the lagoon',
             'a path behind the trees'],
    answer:'a length of the shore',
    hint:'The word is measured in kilometres, which tells you what kind of thing it is.',
    explanation:'A <b>stretch</b> of something is a continuous length of it, so <i>"a two-kilometre stretch of the public beach"</i> is two kilometres of shore. The verb "stretch" (to pull tight) is a different use of the same word.' }),

  makeText({ id:'g7eng-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P3 + '<p>At what time did the volunteers stop work? (One word or a number.)</p>',
    answer:'eleven', alsoAccept:['11','11 a.m.','eleven o\'clock','11am','at eleven'],
    hint:'The first sentence gives both the start and the finish.',
    explanation:'They worked <i>"from six in the morning until eleven"</i>. Eight o\'clock is when the marine biologist joined them, and seven is the start time asked for in April.' }),

  makeText({ id:'g7eng-rcp-003-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P3 + '<p>How many drinking straws did the volunteers count? (Write the number.)</p>',
    answer:'4,000', alsoAccept:['4000','four thousand','over 4,000','just over 4,000','4 000'],
    hint:'Look at the paragraph that lists everything they sorted.',
    explanation:'They counted <i>"just over 4,000 drinking straws"</i> — the biggest number on the list, and the one Mrs Veeren says nobody expected.' }),

  makeText({ id:'g7eng-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P3 + '<p>In one word, which item surprised the organisers most?</p>',
    answer:'straws', alsoAccept:['the straws','drinking straws','straw','plastic straws'],
    hint:'Mrs Veeren says what they expected and then what they did not.',
    explanation:'<i>"We expected bottles… What none of us expected was the straws."</i> The refrigerator door surprised everyone too, but only as one odd object; the straws changed what the whole count meant.' }),

  makeText({ id:'g7eng-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P3 + '<p>What does the word <b>volunteers</b> mean? Answer in up to four words.</p>',
    answer:'unpaid helpers', alsoAccept:['people who help freely','helpers','people who help','unpaid workers','willing helpers','people who volunteer'],
    hint:'Nobody in the report is described as being paid or ordered to come.',
    explanation:'The two hundred people came because they chose to, brought their own gloves and water, and were asked rather than employed. A volunteer is someone who helps without being paid or made to.' }),

  makeText({ id:'g7eng-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P3 + '<p>Twelve new bins went up after the clean-up. Did the council IGNORE the volunteers\' work or RESPOND to it? (One word.)</p>',
    answer:'respond', alsoAccept:['responded','it responded','reacted','acted','listened'],
    hint:'Notice the words "has since" at the start of that paragraph.',
    explanation:'<i>"The council has since installed twelve new bins… and has agreed to empty them twice a week."</i> "Since" means after, and because of: the council answered what the count showed.' }),

);

// ══ PASSAGE 4 · information article · litchi season ═══════════════════════
const _P4 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>Six Weeks in December</b><br><br>
For most of the year the litchi tree is an ordinary dark green tree standing in
the corner of a yard. For about six weeks it is the most watched tree in
Mauritius.<br><br>
The litchi is not a Mauritian plant. It was carried here by ship from southern
China more than two hundred years ago, and it settled into the island so
comfortably that many families now think of it as their own. The tree flowers at
the end of the cool season, in August and September. Small green fruit follow.
The first bunches reach the market in late November, and by the middle of
January the season is finished for another year.<br><br>
A ripe litchi is food for more than people. The Mauritian fruit bat and several
birds find the fruit before the grower does, and a loaded tree can be stripped
in two nights. Growers throw nets over the branches, tie the heaviest bunches
into cloth bags, and some sit up with a torch in the week the fruit turns.<br><br>
The litchi is a perishable fruit. It will not go on ripening after it is picked,
as a banana will: whatever sweetness it has when it leaves the tree is all the
sweetness it will ever have. That is why the picker must judge ripeness on the
branch, by the colour of the skin and by the way the small bumps flatten as the
fruit fills out. Pick a day early and the bunch is sour; pick a day late and the
bats have made the decision.<br><br>
Colour is the other trap, and it catches buyers rather than growers. Within
about three days of picking, the bright pink skin darkens to brown. The flesh
inside is unchanged and stays good for several days more. A brown litchi is not
a bad litchi, but stalls that sell them cheaply know that most shoppers reach for
the pink ones first.<br><br>
Price tells the story of the season in numbers. On the first day a small bunch
may cost several times what the same bunch costs three weeks later. Nothing has
gone wrong with the fruit. Every tree on the island ripens within the same few
weeks, so all the growers pick at once, the market fills, and the price falls
until the last trees are bare.<br><br>
A litchi grown from a seed may take eight or ten years to bear, and the fruit
can disappoint. Growers therefore take a branch from a tree they trust and root
it, so that the young plant is a copy of the parent. Such a tree fruits in three
or four years, and the grower knows in advance what he will be selling.<br><br>
Keep them wrapped in newspaper in the coolest part of the fridge, and eat them
soon. The season is short by nature, and being short is part of why it is
welcome.
`, '#ea580c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-004-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P4 + '<p>How long does the litchi season in Mauritius last?</p>',
    options:['About six weeks',
             'About three months',
             'About two weeks',
             'Almost all year'],
    answer:'About six weeks',
    hint:'The opening paragraph says it, and the dates later confirm it.',
    explanation:'<i>"For about six weeks it is the most watched tree in Mauritius"</i> — late November to the middle of January. August and September are when the tree flowers, not when it fruits.' }),

  makeMCQ({ id:'g7eng-rcp-004-m2', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P4 + '<p>Why do growers throw nets over the branches?</p>',
    options:['To keep bats and birds away',
             'To shade the fruit from the sun',
             'To hold heavy branches upright',
             'To keep the rain off the fruit'],
    answer:'To keep bats and birds away',
    hint:'The sentence before the nets says who else eats litchis.',
    explanation:'<i>"The Mauritian fruit bat and several birds find the fruit before the grower does, and a loaded tree can be stripped in two nights."</i> The nets, the cloth bags and the torch are all answers to that one problem.' }),

  makeMCQ({ id:'g7eng-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P4 + '<p>What is the main purpose of this article?</p>',
    options:['To explain how litchis grow and sell',
             'To persuade readers to plant a litchi',
             'To tell the story of one grower\'s year',
             'To compare litchis with other fruits'],
    answer:'To explain how litchis grow and sell',
    hint:'Is the writer telling a story, arguing a case, or giving information?',
    explanation:'Every paragraph gives facts and reasons — flowering, bats, ripeness, colour, price, propagation, storage. There is no character and no argument, which is what makes this an information article rather than a story or an advert.' }),

  makeMCQ({ id:'g7eng-rcp-004-m4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P4 + '<p>The article calls the litchi a <b>perishable</b> fruit. This means it</p>',
    options:['spoils quickly after picking',
             'is grown only in warm places',
             'is picked before it is ripe',
             'grows on a very tall tree'],
    answer:'spoils quickly after picking',
    hint:'The sentences that follow the word explain it. So does the advice at the end.',
    explanation:'The article says a litchi will not go on ripening once picked and tells the reader to keep them cold and <i>"eat them soon"</i>. Perishable food is food that goes bad quickly.' }),

  makeMCQ({ id:'g7eng-rcp-004-m5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P4 + '<p>Why does the price fall sharply as the season goes on?</p>',
    options:['Every tree ripens at the same time',
             'The fruit loses its bright colour',
             'Buyers grow tired of the taste',
             'The bats take most of the crop'],
    answer:'Every tree ripens at the same time',
    hint:'The article says plainly that nothing has gone wrong with the fruit.',
    explanation:'<i>"Every tree on the island ripens within the same few weeks, so all the growers pick at once, the market fills, and the price falls."</i> The browning skin changes what shoppers choose, but the price collapse is caused by supply.' }),

  makeText({ id:'g7eng-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P4 + '<p>In which month do the first bunches reach the market? (One word.)</p>',
    answer:'November', alsoAccept:['late November','in November','Nov'],
    hint:'The second paragraph follows the year round: flowers, then fruit, then market.',
    explanation:'<i>"The first bunches reach the market in late November, and by the middle of January the season is finished."</i>' }),

  makeText({ id:'g7eng-rcp-004-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P4 + '<p>From which country was the litchi tree first brought to Mauritius? (One word.)</p>',
    answer:'China', alsoAccept:['southern China','south China','from China'],
    hint:'The article says at once that the litchi is not a Mauritian plant.',
    explanation:'<i>"It was carried here by ship from southern China more than two hundred years ago."</i>' }),

  makeText({ id:'g7eng-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P4 + '<p>A rooted branch fruits in three or four years instead of eight or ten. In one word, what does the grower save?</p>',
    answer:'time', alsoAccept:['years','waiting','six years','money'],
    hint:'Compare the two numbers of years given in that paragraph.',
    explanation:'A seedling takes <i>"eight or ten years to bear"</i>; a rooted branch <i>"fruits in three or four years"</i>. The grower saves years of waiting — and also the risk, because he knows what the fruit will be like.' }),

  makeText({ id:'g7eng-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P4 + '<p>When a litchi turns brown, which part has changed — the SKIN or the FLESH? (One word.)</p>',
    answer:'skin', alsoAccept:['the skin','its skin','skin only','the colour'],
    hint:'The article says exactly what is happening inside at the same time.',
    explanation:'<i>"…the bright pink skin darkens to brown. The flesh inside is unchanged and stays good for several days more."</i> That is why the article insists a brown litchi is not a bad litchi.' }),

  makeText({ id:'g7eng-rcp-004-o5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P4 + '<p>A litchi will not sweeten after picking, unlike a banana. In one word, what must the picker judge correctly?</p>',
    answer:'ripeness', alsoAccept:['the ripeness','timing','the timing','when to pick','the right day'],
    hint:'The article gives the picker two signs to read on the branch.',
    explanation:'<i>"…the picker must judge ripeness on the branch, by the colour of the skin and by the way the small bumps flatten"</i>. There is no second chance: <i>"Pick a day early and the bunch is sour"</i>.' }),

);

// ══ PASSAGE 5 · diary / recount · a cyclone week ══════════════════════════
const _P5 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>Cyclone Week — from my diary</b><br><br>
<b>Thursday</b><br>
Class I at midday. The radio says the system is still far away, south-east of
Rodrigues, and may or may not turn towards us. Papa came home early all the same
and we took the bus to the Central Market for provisions: candles, matches,
dried beans, two loaves and a tin of powdered milk. The queue in the shop at the
corner reached the door. Mama filled every bucket, both basins and the old drum
behind the kitchen with water. Nothing happened.<br><br>
<b>Friday</b><br>
Class II at four in the morning, so no school. We spent the day getting ready.
Papa nailed the shutters to their frames and cut down the mango branch that hangs
over the roof, because in 2019 a branch like that took away half of Mr
Sooprayen's gutter. The green mangoes it dropped went into a basin; Mama says
nothing is wasted in a cyclone. We carried the chairs, the bicycle and the tools
inside. By evening the wind had a hum in it that I have not heard before.
Nothing happened.<br><br>
<b>Saturday</b><br>
Class III at half past one in the morning. The rain came in long pushes, like
somebody throwing gravel at the tin roof. At 8.20 in the evening the lights went
out. We played cards by candlelight until my sister accused me of cheating,
which I was, and after that Grandmother told us about the cyclone of 1975 and the
year the water was carried up the hill in buckets. Mr Sooprayen's shed door
banged all night and was the loudest thing in the village. Twelve hours of
sitting still. Nothing happened.<br><br>
<b>Sunday</b><br>
The warning came down to Class I at seven in the morning and the all clear was
given at noon. We opened the shutters and the light in the house looked
strange, like light in somebody else's kitchen. The garden was covered in torn
leaves. The litchi tree lost one big branch, and the green mangoes were all over
the yard, so Mama spent the afternoon making achard with them and gave two jars
to Mr Sooprayen, whose shed door has now fallen off completely. The electricity
came back at ten to eight. Papa walked down to the corner shop in the afternoon
and found it open, sweeping out water, with everything on the shelves except
bread. School reopens on Tuesday.<br><br>
I have written <i>nothing happened</i> at the end of three days out of four this
week, and I meant it as a complaint each time. Grandmother read the page over my
shoulder this evening and laughed at me. She says that is what a good cyclone
looks like: everybody bored, and everybody safe.
`, '#b45309');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-005-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P5 + '<p>Which warning was in force at midday on Thursday?</p>',
    options:['Class I', 'Class II', 'Class III', 'Class IV'],
    answer:'Class I',
    hint:'Each entry begins with the warning and the time it was announced.',
    explanation:'<i>"Class I at midday."</i> Class II came on Friday at four in the morning, and Class III at half past one on Saturday morning.' }),

  makeMCQ({ id:'g7eng-rcp-005-m2', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P5 + '<p>Which of these happened LAST?</p>',
    options:['The electricity came back on',
             'The shutters were nailed shut',
             'The lights went out at 8.20',
             'The family bought provisions'],
    answer:'The electricity came back on',
    hint:'Put the four events into the four days before you choose.',
    explanation:'Provisions on Thursday, shutters on Friday, the power cut on Saturday at 8.20 p.m., and the current back on Sunday <i>"at ten to eight"</i> — the last of the four.' }),

  makeMCQ({ id:'g7eng-rcp-005-m3', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P5 + '<p>Why did Papa cut down the mango branch?</p>',
    options:['It hung over the roof',
             'It carried no fruit',
             'It blocked the gate',
             'It was already dead'],
    answer:'It hung over the roof',
    hint:'The writer gives a reason from 2019 in the same sentence.',
    explanation:'He <i>"cut down the mango branch that hangs over the roof, because in 2019 a branch like that took away half of Mr Sooprayen\'s gutter."</i> The fruit it dropped was a by-product — and became achard.' }),

  makeMCQ({ id:'g7eng-rcp-005-m4', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P5 + '<p>What does Grandmother mean by "that is what a good cyclone looks like"?</p>',
    options:['A cyclone is good when nobody is hurt',
             'Cyclones are better than ordinary days',
             'A strong cyclone makes a better story',
             'Waiting is the worst part of a cyclone'],
    answer:'A cyclone is good when nobody is hurt',
    hint:'She is answering the writer\'s complaint, so read what the complaint was.',
    explanation:'The writer wrote <i>nothing happened</i> three times as a complaint. Grandmother turns it round: <i>"everybody bored, and everybody safe."</i> Boredom is the sign that the preparations worked.' }),

  makeMCQ({ id:'g7eng-rcp-005-m5', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P5 + '<p>The queue in the corner shop "reached the door". This suggests that</p>',
    options:['many people were buying at once',
             'the shop had closed for the day',
             'the door had been propped open',
             'the shop was holding a big sale'],
    answer:'many people were buying at once',
    hint:'Think about what everybody in the village heard on the radio that midday.',
    explanation:'A queue long enough to reach the door is the writer\'s way of showing a rush. The whole village heard the same Class I warning and went out for provisions on the same afternoon.' }),

  makeText({ id:'g7eng-rcp-005-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P5 + '<p>At what time did the lights go out? (Write the time.)</p>',
    answer:'8.20', alsoAccept:['8:20','8.20 p.m.','8:20 p.m.','8.20pm','twenty past eight'],
    hint:'Saturday\'s entry gives the exact minute.',
    explanation:'<i>"At 8.20 in the evening the lights went out."</i> The power returned on Sunday at ten to eight.' }),

  makeText({ id:'g7eng-rcp-005-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P5 + '<p>Which fruit did Mama turn into achard after the storm? (One word.)</p>',
    answer:'mangoes', alsoAccept:['mango','green mangoes','green mango','the mangoes'],
    hint:'They fell on Friday and were still in the yard on Sunday.',
    explanation:'The branch dropped green mangoes on Friday, and on Sunday <i>"Mama spent the afternoon making achard with them"</i>. The litchi tree lost a branch, but no litchis are mentioned.' }),

  makeText({ id:'g7eng-rcp-005-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P5 + '<p>In one word, how does the writer feel during the long hours of Saturday?</p>',
    answer:'bored', alsoAccept:['boredom','restless','impatient','fed up','frustrated','tired'],
    hint:'Count the cards, the stories, and the phrase repeated at the end of each entry.',
    explanation:'<i>"Twelve hours of sitting still. Nothing happened."</i> Grandmother names the feeling for us at the end: <i>"everybody bored, and everybody safe."</i>' }),

  makeText({ id:'g7eng-rcp-005-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P5 + '<p>What does the word <b>provisions</b> mean in Thursday\'s entry? Answer in one or two words.</p>',
    answer:'supplies', alsoAccept:['food supplies','food','stores','food and stores','goods','groceries'],
    hint:'The list that follows the word tells you what kind of thing it is.',
    explanation:'The colon introduces the list: <i>"candles, matches, dried beans, two loaves and a tin of powdered milk."</i> Provisions are supplies of food and other necessities laid in for a time ahead.' }),

  makeText({ id:'g7eng-rcp-005-o5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P5 + '<p>The banging shed door was "the loudest thing in the village". Was the rest of the village NOISY or QUIET that night? (One word.)</p>',
    answer:'quiet', alsoAccept:['silent','still','calm','quiet.','very quiet'],
    hint:'Ask what has to be true for one door to win that comparison.',
    explanation:'A single door can only be the loudest thing if everything else has stopped — no traffic, no neighbours outside, no radios, and no electricity since 8.20. The detail measures the silence rather than the noise.' }),

);

// ══ PASSAGE 6 · interview · a grandmother's sega records ══════════════════
const _P6 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>"Listen to them, do not only own them"</b><br>
<i>Our magazine visits Mrs Marie-Ange Louis, 74, of Rose Hill, who keeps
sixty-three sega records in a wooden cupboard in her front room.</i><br><br>
<b>How did the collection begin?</b><br>
With one record, in 1968. I was sixteen and I sewed for the neighbours — hems,
buttons, school skirts — and I kept the coins in a tobacco tin. There was a shop
in Port Louis where you could ask them to play a record before you bought it. I
listened to that one twice, standing up, and then I gave the man everything in
the tin.<br><br>
<b>What was sega like when you were young?</b><br>
It was in the yard, not on the radio. Somebody warmed the ravanne over a fire of
coconut husks until the skin tightened and the note came up, and the singing
started when the work was finished. You must understand that in those days people
did not put sega on a form when they were asked what music they liked. It was
ours, but it was not respectable. That took years, and it took people making
recordings like these.<br><br>
<b>Do you still play the records?</b><br>
Every Sunday. The player is older than my son. There is one man in Beau Bassin
who can still repair it, and when he retires I shall have a cupboard of music and
no way of hearing it. I have told him he is not allowed to retire.<br><br>
<b>Your grandson has put some of the songs on his phone. What did you think?</b><br>
The first time I saw him do it I was angry, and I could not have told you why.
Then he played one in the kitchen while I was cooking and I heard my own
Sunday afternoon coming out of a telephone, and my sister sang along from the
other room. A song that nobody plays is just a piece of plastic. He is keeping
them alive better than my cupboard is.<br><br>
<b>Are the records valuable?</b><br>
A dealer came here last year and offered me a price for eleven of them. I said no,
and afterwards I could not sleep, thinking about it. Not because of the money. It
was that he wanted to take them away and not play them. He never once asked me
what was on them.<br><br>
<b>What would you say to a young person starting a collection?</b><br>
Keep them standing upright, out of the sun, and away from the window when the
rain comes in sideways. And listen to them, do not only own them. A collection
you are proud of and never hear is a shelf, not a collection.
`, '#be185d');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-rcp-006-m1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P6 + '<p>In which year did Mrs Louis buy her first record?</p>',
    options:['1968', '1958', '1978', '1986'],
    answer:'1968',
    hint:'Her first answer gives the year and her age in the same breath.',
    explanation:'<i>"With one record, in 1968. I was sixteen."</i>' }),

  makeMCQ({ id:'g7eng-rcp-006-m2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P6 + '<p>How did she earn the money for that first record?</p>',
    options:['By sewing for the neighbours',
             'By selling fruit at a market',
             'By minding small children',
             'By washing clothes for pay'],
    answer:'By sewing for the neighbours',
    hint:'She names the exact jobs she did and where she kept the money.',
    explanation:'<i>"I sewed for the neighbours — hems, buttons, school skirts — and I kept the coins in a tobacco tin."</i>' }),

  makeMCQ({ id:'g7eng-rcp-006-m3', chapterId:CH, difficulty:3, subsection:'main_idea_details',
    question:_P6 + '<p>What is the main purpose of this interview?</p>',
    options:['To share one woman\'s life with sega',
             'To teach readers to play the ravanne',
             'To advertise a record shop in the town',
             'To argue that old records sound better'],
    answer:'To share one woman\'s life with sega',
    hint:'Look at the range of the questions the magazine asks her.',
    explanation:'The questions move from her first record to the music of her youth, her Sunday player, her grandson and her advice. The ravanne and the shop are details inside that life, not the subject of the piece.' }),

  makeMCQ({ id:'g7eng-rcp-006-m4', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P6 + '<p>"A song that nobody plays is just a piece of plastic." What does she mean?</p>',
    options:['Music matters only when it is heard',
             'Old records are worth little money',
             'Plastic records break far too easily',
             'Her grandson should buy his own'],
    answer:'Music matters only when it is heard',
    hint:'She says it just after hearing a song come out of a telephone.',
    explanation:'The record is only the object; the song is what happens when it is played. She proves the point twice — she forgives the phone <i>"He is keeping them alive"</i>, and refuses the dealer who <i>"wanted to take them away and not play them."</i>' }),

  makeMCQ({ id:'g7eng-rcp-006-m5', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P6 + '<p>What does Mrs Louis suggest about how sega was seen when she was young?</p>',
    options:['It was not fully respected then',
             'It was played on every radio',
             'It was taught in the schools',
             'It was sung only at weddings'],
    answer:'It was not fully respected then',
    hint:'She says what people did NOT write down when they were asked.',
    explanation:'<i>"…people did not put sega on a form when they were asked what music they liked. It was ours, but it was not respectable."</i> She adds that changing this <i>"took years"</i>.' }),

  makeText({ id:'g7eng-rcp-006-o1', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P6 + '<p>How many records does Mrs Louis keep? (Write the number.)</p>',
    answer:'sixty-three', alsoAccept:['63','sixty three'],
    hint:'The italic introduction above the first question gives the number.',
    explanation:'She <i>"keeps sixty-three sega records in a wooden cupboard in her front room"</i>. Eleven is only the number the dealer wanted to buy.' }),

  makeText({ id:'g7eng-rcp-006-o2', chapterId:CH, difficulty:2, subsection:'main_idea_details',
    question:_P6 + '<p>In which town does the man who repairs her record player work? (Two words.)</p>',
    answer:'Beau Bassin', alsoAccept:['Beau-Bassin','in Beau Bassin','beau bassin'],
    hint:'She mentions him when she says how often she plays the records.',
    explanation:'<i>"There is one man in Beau Bassin who can still repair it."</i> Mrs Louis herself lives in Rose Hill, and the shop she bought from was in Port Louis.' }),

  makeText({ id:'g7eng-rcp-006-o3', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P6 + '<p>The ravanne is warmed over a fire. According to Mrs Louis, what does the heat do to the skin? (One or two words.)</p>',
    answer:'tightens it', alsoAccept:['tightens','it tightens','tightens the skin','makes it tight','tightness'],
    hint:'She explains the reason in the same sentence as the coconut husks.',
    explanation:'<i>"Somebody warmed the ravanne over a fire of coconut husks until the skin tightened and the note came up."</i> A tighter drum skin gives a higher, clearer note.' }),

  makeText({ id:'g7eng-rcp-006-o4', chapterId:CH, difficulty:3, subsection:'inferring_vocabulary',
    question:_P6 + '<p>In one word, how does Mrs Louis feel NOW about her grandson keeping the songs on his phone?</p>',
    answer:'pleased', alsoAccept:['happy','glad','proud','grateful','delighted','accepting','positive'],
    hint:'She describes two different feelings. The question asks about the second.',
    explanation:'She was angry the first time, but after hearing the song in the kitchen she says <i>"He is keeping them alive better than my cupboard is."</i> That is approval, not complaint.' }),

  makeText({ id:'g7eng-rcp-006-o5', chapterId:CH, difficulty:4, subsection:'inferring_vocabulary',
    question:_P6 + '<p>She advises collectors to "listen to them, do not only own them". In one word, what does she value more than owning?</p>',
    answer:'listening', alsoAccept:['listening to them','playing','hearing','sharing','music','playing them'],
    hint:'Her last sentence says what a collection becomes without it.',
    explanation:'<i>"A collection you are proud of and never hear is a shelf, not a collection."</i> Listening is the whole point of owning, which is also why she refused the dealer who never asked what was on the records.' }),

);

})();
