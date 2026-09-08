'use strict';
// Grade 5 English - Chapter: Passages & Text Types
// IDs format: g5eng-psg-NNN
//
// ⚠ IDS ARE PRESERVED, CONTENT IS REPLACED. netlify/import-questions.js upserts
//   and never deletes, so a question dropped from source would linger in the
//   Supabase `questions` table forever. Every id below (001-021) is the same id
//   it has always been; only the stimulus, options and difficulty changed.
//   Do not renumber these.
//
// ⚠ WHAT CHANGED AND WHY. All 21 were flagged by scripts/floor-check.js: the
//   four texts they hung off ran 102-188 words, against 413-447 in the MES
//   Grade 5 English papers 2023-2025, and five of the questions sat at L1 on
//   content a Grade 3 would answer. The four texts are now full length and the
//   difficulty starts at L2 - the easier rungs of this chapter are carried by
//   passages_full_01..05, which were written to the same measured band.
//
// TEXT TYPES, and their subsection ids, are unchanged: letter, story, recount,
// poem. The ids declared in G5ENG_SYLLABUS and the ids tagged here must stay
// identical, or a tagged-but-undeclared subsection hides its own questions.
//
// ⚠ The poem and the recount are deliberately shorter than 413 words. Verse and
//   a short factual retelling are not prose narratives, and padding them to
//   match Question 1 would make them worse, not more exam-like. Both clear
//   floor-check's 250-word stimulus floor.

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ TEXT 1 · informal letter ══════════════════════════════════════════════
const _G5PSG_LETTER = _g5psgBox(`
<b style="color:#1e40af">Read the letter, then answer the question.</b><br><br>
<div style="text-align:right">14, Camp Fouquereaux Road<br>Vacoas<br>18 August</div><br>
Dear Nishal,<br><br>
Thank you for the birthday card. It arrived three weeks late, which Mum says is
normal for airmail from Australia, so do not feel bad about it.<br><br>
I have some news. Aunty Devi has gone to live in Curepipe, which means Grandma
has come to live with us instead. She arrived on Sunday with two suitcases and a
sewing machine, and she has taken my room. I am sharing with Priya now.<br><br>
Before you write back saying "poor you", I should tell you that it is not as bad
as I expected, and this is the part I actually wanted to write about.<br><br>
Priya snores. That is true and I am not going to pretend otherwise. But Grandma
gets up at half past five, and last Tuesday I woke early and went out to the
kitchen and she was already there making tea. She gave me some, and we sat on the
back step until it got light. She told me that our grandfather used to keep
pigeons on the roof of the old house in Rose Hill, and that one of them once flew
all the way to Port Louis and came back the same afternoon. I have known Grandma
my whole life and nobody has ever told me that.<br><br>
Now I get up early on purpose. Do not tell Mum, because she believes I am being
helpful.<br><br>
School is the same. Mrs Beeharry has given us a project on the water cycle and I
have to draw a diagram, which you know I am bad at. Priya says she will help me if
I do her share of the washing-up for a week, which I think is daylight robbery,
but I have agreed.<br><br>
Please write back properly this time, not just a card. You always say you are
busy, and I believe you, but a letter takes ten minutes and I have written you
four since March.<br><br>
How is the swimming? Have you been in the sea yet, or is it still too cold there?
It is winter here as well, but our winter is only cold in the morning, and
everybody complains about it anyway.<br><br>
Say hello to Uncle Raj.<br><br>
Your cousin,<br>
Anisha<br><br>
P.S. Grandma has offered to shorten my school skirt on the sewing machine. I said
yes before Mum could say no.
`, '#3b82f6');

// ══ TEXT 2 · story ════════════════════════════════════════════════════════
const _G5PSG_STORY = _g5psgBox(`
<b style="color:#166534">Read the passage, then answer the question.</b><br><br>
<b>The Relay</b><br><br>
There were four of them in the team, and Sanjay ran third.<br><br>
He had asked to run third. The first leg goes to whoever starts well, and the
last goes to whoever is fastest, and the third leg goes to somebody steady. Mr
Curpen had said the word "steady" as though it were a compliment, and Sanjay had
taken it as one.<br><br>
On the morning of the sports day the field had been cut, and the white lines were
so new that they smelled of paint. Sanjay's mother had come. She was standing
near the flagpole with her handbag held in front of her with both hands, the way
she stood in church.<br><br>
The race began well. By the time the baton reached him their team was second and
closing, and Sanjay felt the whole thing arrive in his hand exactly as he had
practised it, and he ran.<br><br>
He was still ahead of the boy from Beau Vallon when he reached Yannick at the
changeover. He put the baton out. Yannick's hand came back. And somewhere between
the two of them the baton met nothing at all, and Sanjay heard it hit the grass
behind him, and the sound was very small.<br><br>
He turned. He picked it up. By the time Yannick was running again, three teams
had gone past, and the shouting from the far side of the field had changed into a
different kind of noise.<br><br>
They finished fifth out of six.<br><br>
Nobody said anything unkind. That was the strange part. Yannick said "it was
both of us" and went off to get water, and the two others said nothing at all,
which was worse, and Mr Curpen said "next year" and wrote something on his
clipboard.<br><br>
Sanjay went to find his mother. She had not moved from the flagpole. He had
prepared several things to say on the way over, and in the end he did not say any
of them.<br><br>
"You picked it up," she said.<br><br>
"We came fifth."<br><br>
"I saw where it fell," she said, "and I saw you turn round. There were a hundred
people watching and you turned round."<br><br>
On the bus home the others talked about the football. Sanjay looked out of the
window and thought that his mother had watched a different race from everybody
else, and that hers was the one he wanted to remember.
`, '#16a34a');

// ══ TEXT 3 · recount ══════════════════════════════════════════════════════
const _G5PSG_RECOUNT = _g5psgBox(`
<b style="color:#7c2d12">Read the recount, then answer the question.</b><br><br>
<b>Our Visit to the Sugar Museum</b> - by Yashvin, Grade 5B<br><br>
On Thursday 12 June our class went to L'Aventure du Sucre at Beau Plan. We left
school at eight o'clock and reached the museum at about a quarter to nine.<br><br>
First, a guide named Mrs Appavoo took us into the old factory building. She told
us that the factory worked for one hundred and eighty years and closed in 1999.
The machines are still standing where they stopped. Some of them are taller than
our classroom.<br><br>
Next, we followed the path that the cane itself used to follow. We saw the huge
rollers that crushed the cane, and the pans where the juice was boiled, and the
place where the sugar was dried. I had not known that one tonne of cane makes
only about one hundred kilograms of sugar.<br><br>
After that we went upstairs to the part about slavery and indenture. It was
quieter up there. Our guide did not hurry us, and nobody in our class talked. We
read the names of ships and the years they arrived.<br><br>
Finally we were allowed to taste fifteen kinds of unrefined sugar. My favourite
was the dark one that tasted almost like liquorice. Kavish said he liked all of
them, which cannot be true.<br><br>
We ate our lunch under the trees and got back to school at ten past two.<br><br>
I enjoyed the machines most, but the part I have thought about since is the room
upstairs. Before Thursday, sugar was just something we put in tea.
`, '#ea580c');

// ══ TEXT 4 · poem ═════════════════════════════════════════════════════════
const _G5PSG_POEM = _g5psgBox(`
<b style="color:#6d28d9">Read the poem, then answer the question.</b><br><br>
<b>The Fisherman's Wife</b><br><br>
<div style="font-style:italic;line-height:1.9">
She wakes before the roosters do<br>
and stands beside the door,<br>
and reads the colour of the sky<br>
the way she read before.<br><br>
Grey means he will be home by ten.<br>
White means the wind is high.<br>
The colour that she does not name<br>
she watches, passing by.<br><br>
Her mother stood beside this door.<br>
Her mother's mother too.<br>
They taught her every shade of grey<br>
and what each grey can do.<br><br>
At noon she mends the second net,<br>
at three she sweeps the floor,<br>
at five she does not look at all,<br>
at six she checks once more.<br><br>
The neighbours say she worries less<br>
than any wife they know.<br>
They see her hanging out the wash.<br>
They do not see her go<br><br>
down to the corner every hour<br>
where nothing blocks the bay,<br>
and stand there for a count of ten,<br>
and turn, and walk away.<br><br>
Tonight the sea is flat and kind,<br>
the boats come in a row.<br>
She counts them twice. She counts them twice.<br>
And only then, hello.
</div>
`, '#7c3aed');

STATIC_QUESTIONS.push(

  // ══ LETTER · 10 questions ═══════════════════════════════════════════════
  makeMCQ({ id:'g5eng-psg-001', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:_G5PSG_LETTER + '<p>Why has Grandma come to live with Anisha\'s family?</p>',
    options:['Aunty Devi, who she lived with, has moved to Curepipe',
             'She wanted to be closer to Anisha and to Priya',
             'Her own house in Rose Hill was sold last Sunday',
             'She has come to help with the school water project'],
    answer:'Aunty Devi, who she lived with, has moved to Curepipe',
    hint:'Anisha gives the reason and the result in a single sentence.',
    explanation:'<i>"Aunty Devi has gone to live in Curepipe, which means Grandma has come to live with us instead."</i> The Rose Hill house belonged to her grandfather and is mentioned only in the pigeon story.' }),

  makeMCQ({ id:'g5eng-psg-002', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:_G5PSG_LETTER + '<p>What has Anisha given up since Grandma arrived?</p>',
    options:['Her own bedroom', 'Her school skirt', 'Her early mornings', 'Her share of the washing-up'],
    answer:'Her own bedroom',
    hint:'Grandma arrived with two suitcases and a sewing machine, and took something.',
    explanation:'Grandma <i>has taken my room</i>, so Anisha now shares with Priya. The washing-up is a deal she made with Priya, not something she lost.' }),

  makeMCQ({ id:'g5eng-psg-003', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:_G5PSG_LETTER + '<p>Why does Anisha write "Before you write back saying \'poor you\'"?</p>',
    options:['She expects sympathy and wants to head it off',
             'She is worried that Nishal will not reply again',
             'She wants Nishal to feel sorry about the late card',
             'She is complaining about having to share a room'],
    answer:'She expects sympathy and wants to head it off',
    hint:'What would a reader assume after being told she lost her bedroom?',
    explanation:'She has just described losing her room, so sympathy is the obvious response. She <b>stops it in advance</b> because the good part is what she actually wants to tell him.' }),

  makeMCQ({ id:'g5eng-psg-004', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:_G5PSG_LETTER + '<p>Anisha calls Priya\'s offer "daylight robbery". She means the deal is</p>',
    options:['very unfair to her', 'against the school rules',
             'a secret from her mother', 'impossible to carry out'],
    answer:'very unfair to her',
    hint:'Compare what Priya gives with what Priya gets.',
    explanation:'Priya helps with one diagram; Anisha does a whole week of Priya\'s washing-up. <b>Daylight robbery</b> means being charged far too much - though Anisha agrees anyway, which is part of the joke.' }),

  makeMCQ({ id:'g5eng-psg-005', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:_G5PSG_LETTER + '<p>Why does Anisha now get up early "on purpose"?</p>',
    options:['She wants more of Grandma\'s stories and company',
             'She cannot sleep because of Priya\'s snoring',
             'She has to finish her water cycle diagram',
             'Her mother expects her to help in the kitchen'],
    answer:'She wants more of Grandma\'s stories and company',
    hint:'What happened the one time she woke early by accident?',
    explanation:'The first early morning gave her tea on the back step and a story she had never heard. She now <b>seeks that out</b> - the snoring woke her once, but it is not why she keeps doing it.' }),

  makeMCQ({ id:'g5eng-psg-006', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:_G5PSG_LETTER + '<p>Why does Anisha ask Nishal not to tell her mother?</p>',
    options:['Her mother has misunderstood why she gets up early',
             'Her mother does not allow her to get up before six',
             'She has been getting up early without finishing her work',
             'Her mother would stop her from drinking tea in the morning'],
    answer:'Her mother has misunderstood why she gets up early',
    hint:'What does the letter say her mother believes?',
    explanation:'Her mother <i>believes I am being helpful</i>. Anisha is enjoying herself, not helping, and would rather keep the credit - a small, honest piece of mischief.' }),

  makeMCQ({ id:'g5eng-psg-007', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:_G5PSG_LETTER + '<p>Why does the story about the pigeons matter so much to Anisha?</p>',
    options:['It showed her there was a great deal she did not know about her family',
             'It proved that her grandfather had been a very unusual man',
             'It explained why Grandma had brought a sewing machine with her',
             'It gave her an idea for the school project she has to finish'],
    answer:'It showed her there was a great deal she did not know about her family',
    hint:'Read the sentence she adds straight after telling the story.',
    explanation:'She adds: <i>I have known Grandma my whole life and nobody has ever told me that.</i> The pigeon is not the point - <b>the discovery that Grandma holds things she has never heard</b> is.' }),

  makeMCQ({ id:'g5eng-psg-008', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:_G5PSG_LETTER + '<p>What does Anisha most want Nishal to do?</p>',
    options:['Write her a proper letter rather than a card',
             'Send her another birthday card by airmail',
             'Come and visit Mauritius during the winter',
             'Help her with the water cycle diagram'],
    answer:'Write her a proper letter rather than a card',
    hint:'She asks for it directly, and then supports the request with a number.',
    explanation:'<i>Please write back properly this time, not just a card.</i> She backs it up by counting: four letters since March.' }),

  makeMCQ({ id:'g5eng-psg-009', chapterId:'eng-passages', subsection:'letter', difficulty:4,
    question:_G5PSG_LETTER + '<p>"You always say you are busy, and I believe you, but a letter takes ten minutes." What is Anisha doing here?</p>',
    options:['Complaining, while being careful not to start a quarrel',
             'Apologising for having written to him so many times',
             'Explaining why she has not written since March',
             'Agreeing that Nishal has too little time to write'],
    answer:'Complaining, while being careful not to start a quarrel',
    hint:'Look at what she concedes before the word "but".',
    explanation:'She accepts his excuse (<i>I believe you</i>) and then removes it (<i>a letter takes ten minutes</i>). It is a complaint <b>wrapped in politeness</b> - she wants a reply, not an argument.' }),

  makeMCQ({ id:'g5eng-psg-010', chapterId:'eng-passages', subsection:'letter', difficulty:4,
    question:_G5PSG_LETTER + '<p>What does the P.S. suggest about Grandma\'s arrival in the house?</p>',
    options:['She has quietly given Anisha an ally against her mother',
             'She is trying to buy Anisha\'s friendship with favours',
             'She has taken over the running of the household',
             'She does not understand the school uniform rules'],
    answer:'She has quietly given Anisha an ally against her mother',
    hint:'Why does Anisha say yes "before Mum could say no"?',
    explanation:'Anisha accepts fast precisely because she expects her mother to object. Grandma offered anyway - the P.S. is a joke that shows <b>the two of them are now on the same side</b>, which is the letter\'s real news.' }),

  // ══ STORY · 8 questions ═════════════════════════════════════════════════
  makeMCQ({ id:'g5eng-psg-011', chapterId:'eng-passages', subsection:'story', difficulty:2,
    question:_G5PSG_STORY + '<p>Why had Sanjay asked to run the third leg?</p>',
    options:['It is the leg given to a steady runner', 'It is the leg given to the fastest runner',
             'It is the easiest leg of the whole race', 'It is the leg his mother could see best'],
    answer:'It is the leg given to a steady runner',
    hint:'The passage explains what each leg is for.',
    explanation:'First goes to a good starter, last to the fastest, and third to <i>somebody steady</i>. Mr Curpen meant it as a compliment and Sanjay took it as one - which is what makes the drop hurt.' }),

  makeMCQ({ id:'g5eng-psg-012', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:_G5PSG_STORY + '<p>Why does the writer mention how Sanjay\'s mother held her handbag?</p>',
    options:['It shows she was nervous for him', 'It shows she had come straight from work',
             'It shows she did not want to lose it', 'It shows she was ready to leave early'],
    answer:'It shows she was nervous for him',
    hint:'The comparison the writer chooses tells you how she was standing.',
    explanation:'She holds it <i>with both hands, the way she stood in church</i> - formal, still, tense. The writer <b>shows her nerves</b> instead of stating them.' }),

  makeMCQ({ id:'g5eng-psg-013', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:_G5PSG_STORY + '<p>"The sound was very small." Why does the writer describe the falling baton this way?</p>',
    options:['A tiny sound caused something that felt enormous',
             'The crowd was too loud for anyone else to hear it',
             'The baton was lighter than Sanjay had expected',
             'Sanjay could barely hear anything while running'],
    answer:'A tiny sound caused something that felt enormous',
    hint:'Compare the size of the sound with the size of what follows it.',
    explanation:'The noise is nothing; the consequence fills the rest of the story. Setting a <i>very small</i> sound against a disaster is how the writer <b>measures the gap between the two</b>.' }),

  makeMCQ({ id:'g5eng-psg-014', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:_G5PSG_STORY + '<p>Why was it "worse" that the two other boys said nothing?</p>',
    options:['Silence left him to imagine what they were thinking',
             'They were the fastest runners in the whole team',
             'They had been unkind to him earlier that morning',
             'Mr Curpen had told them not to speak to Sanjay'],
    answer:'Silence left him to imagine what they were thinking',
    hint:'Yannick said something and it helped. What does saying nothing do?',
    explanation:'Yannick shared the blame out loud, which was bearable. Silence gives Sanjay <b>nothing to answer and everything to imagine</b>, so it presses harder than anything they could have said.' }),

  makeMCQ({ id:'g5eng-psg-016', chapterId:'eng-passages', subsection:'story', difficulty:2,
    question:_G5PSG_STORY + '<p>Where was Sanjay\'s mother when he came to find her after the race?</p>',
    options:['Exactly where she had been standing before',
             'Waiting for him beside the school bus',
             'Talking to Mr Curpen near the finish line',
             'Walking across the field towards him'],
    answer:'Exactly where she had been standing before',
    hint:'The passage says it in four words.',
    explanation:'<i>She had not moved from the flagpole.</i> Her stillness matters: she was watching him, not the race.' }),

  makeMCQ({ id:'g5eng-psg-017', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:_G5PSG_STORY + '<p>Sanjay "had prepared several things to say... and in the end he did not say any of them." Why not?</p>',
    options:['His mother spoke first, about something he had not expected',
             'He was too ashamed to speak to his mother at all',
             'He had forgotten every one of them on the way over',
             'The other boys were standing close enough to hear'],
    answer:'His mother spoke first, about something he had not expected',
    hint:'What are the first words she says to him?',
    explanation:'He arrives braced to explain or apologise, and she says <i>"You picked it up."</i> She has changed the subject entirely, so <b>none of his prepared words fits any more</b>.' }),

  makeMCQ({ id:'g5eng-psg-018', chapterId:'eng-passages', subsection:'story', difficulty:4,
    question:_G5PSG_STORY + '<p>What is his mother telling him when she says, "There were a hundred people watching and you turned round"?</p>',
    options:['Going back for the baton took more courage than winning would have',
             'She was proud that he had finished the race at all',
             'The other runners should have helped him to recover it',
             'He should not worry about what the crowd was thinking'],
    answer:'Going back for the baton took more courage than winning would have',
    hint:'She names the audience deliberately. Why does that detail belong in her point?',
    explanation:'She names the hundred watchers to measure what turning round cost him. Anyone can run when it is going well; <b>going back in front of everyone, after failing, is the harder thing</b> - and it is the only part of the race she mentions.' }),

  makeMCQ({ id:'g5eng-psg-019', chapterId:'eng-passages', subsection:'story', difficulty:4,
    question:_G5PSG_STORY + '<p>What does Sanjay mean by thinking that his mother "had watched a different race"?</p>',
    options:['She judged him by how he behaved, not by where he finished',
             'She had been looking away when the baton was dropped',
             'She did not understand the rules of a relay race',
             'She had been watching one of the other teams instead'],
    answer:'She judged him by how he behaved, not by where he finished',
    hint:'Everyone else is talking about the result. What is she talking about?',
    explanation:'The others saw a team come fifth. She saw a boy turn round in front of a hundred people. <b>Same race, different thing measured</b> - and the writer ends by having Sanjay choose her version.' }),

  // ══ RECOUNT · 1 question ════════════════════════════════════════════════
  makeMCQ({ id:'g5eng-psg-015', chapterId:'eng-passages', subsection:'recount', difficulty:4,
    question:_G5PSG_RECOUNT + '<p>Yashvin writes that he enjoyed the machines most, "but the part I have thought about since is the room upstairs." What does this tell us about the visit?</p>',
    options:['What impressed him at the time and what stayed with him were different',
             'He found the upstairs room more interesting than the machines',
             'He did not enjoy the tasting of the fifteen kinds of sugar',
             'He wishes the guide had spent longer in the old factory'],
    answer:'What impressed him at the time and what stayed with him were different',
    hint:'He gives two answers, and separates them with the word "but". What is each one about?',
    explanation:'He is honest that the machines were the fun part, then separates that from what has <b>stayed with him afterwards</b>. His last line explains why: <i>Before Thursday, sugar was just something we put in tea.</i> The quiet room changed a thing he thought he already understood.' }),

  // ══ POEM · 2 questions ══════════════════════════════════════════════════
  makeMCQ({ id:'g5eng-psg-020', chapterId:'eng-passages', subsection:'poem', difficulty:3,
    question:_G5PSG_POEM + '<p>"The colour that she does not name / she watches, passing by." Why does she not name that colour?</p>',
    options:['It is the sky that means real danger for him',
             'She has never learned the word for that shade',
             'It is a colour that appears only very rarely',
             'Her mother never taught her what it means'],
    answer:'It is the sky that means real danger for him',
    hint:'The two skies she does name have safe, practical meanings. What is left?',
    explanation:'Grey means home by ten and white means high wind - both spoken. The third is <b>the one she will not say aloud</b>, and refusing to name it is how the poem shows her fear without ever using the word.' }),

  makeMCQ({ id:'g5eng-psg-021', chapterId:'eng-passages', subsection:'poem', difficulty:4,
    question:_G5PSG_POEM + '<p>The neighbours think she worries less than other wives. Why is the poem telling us they are wrong?</p>',
    options:['They only see what she does where they can see her',
             'They are not close enough friends to ask her properly',
             'They have never had a husband who goes out to sea',
             'She has told them that she does not worry about him'],
    answer:'They only see what she does where they can see her',
    hint:'The poem sets one word against another: they "see" the washing, but they do not see something else.',
    explanation:'<i>They see her hanging out the wash. / They do not see her go</i> - down to the corner every hour to look at the bay. Her calm is <b>a performance for the street</b>, and the poem shows us the part the street misses.' })

);
