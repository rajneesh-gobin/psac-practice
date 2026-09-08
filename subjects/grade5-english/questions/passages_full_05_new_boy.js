'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT 5 - Grade 5 English, fifth passage at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  SHAPE: the only one of the five where the pressure is social rather than
//  physical, and where the main character is not admirable throughout - Meera
//  watches for two weeks before she does anything. That is what gives the
//  evaluative question something real to weigh: the reader has to judge a
//  character who is neither cruel nor brave.
//
//  ⚠ Two questions turn on what the writer LEAVES OUT - the laugh whose owner
//    Meera never checks, and the fact that someone else, not Meera, ends up
//    sitting beside Joel. Neither is explained in the text.
//
//  THE FIVE TOGETHER cover: an object surviving a storm (1), a moral choice
//  under temptation (2), a rash decision and its consequences (3), a private
//  fear (4), and belonging (5). All are child-centred third-person narratives,
//  which is what the Question 1 stimulus is in every paper checked.
// ══════════════════════════════════════════════════════════════════════════

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_NEWBOY = _g5psgBox(`
<b style="color:#6d28d9">Read the passage, then answer the question.</b><br><br>
<b>The New Boy</b><br><br>
The new boy arrived on a Wednesday, in the middle of the term, which was the
wrong way to arrive.<br><br>
Mr Lutchmun wrote his name on the board: JOEL. He had come from Rodrigues, and
when he said good morning the class noticed the difference immediately, and somebody at
the back laughed.<br><br>
Meera did not laugh. She also did not turn round to see who had.<br><br>
For two weeks Joel sat at the end of the third row with an empty chair beside
him. During break he stood near the wall beside the water tap, not quite watching the
football, holding his sandwich in both hands. He was there every single day. Meera noticed
him the way you notice a chair that has been moved.<br><br>
She had her own worries to think about. The Grade 5 tests were in March.<br><br>
On the Friday of the second week it rained, so break was held indoors. Forty
children sat in a classroom built for thirty-five. Somebody crumpled a ball of paper.
Somebody threw it across the room. It landed on Joel's desk, and everyone waited to discover what he
would do.<br><br>
He put it in the bin.<br><br>
That was all. He did not throw it back and he did not complain, and after a
moment the noise started up again somewhere different.<br><br>
Meera thought about it all through the afternoon lesson.<br><br>
She was not brave. She knew she was not brave. But at the end of the day, while
everyone was crowding towards the doorway, she stopped at the third row.<br><br>
"We have the tests in March," she said. "Do you have the revision book?"<br><br>
Joel looked up.<br><br>
"No," he said.<br><br>
"I have two," said Meera, which was true, because her cousin had left one at
their house in December and nobody had ever asked for its return.<br><br>
She put it on his desk and left before he could say anything, because she did not
want anyone to make a thing of it.<br><br>
On Monday the empty chair beside Joel had somebody in it, and it was not Meera.
It was a boy called Sanjay, who had never spoken to Joel either.<br><br>
Meera saw it from the doorway. She went to her own seat and said nothing at
all.<br><br>
But she thought about it for the rest of the week, and it made her feel strange
and light, as though she had got away with something good.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  // ── literal retrieval ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-062', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_NEWBOY + '<p>Where had Joel come from?</p>',
    options: ['Rodrigues', 'Mauritius', 'Madagascar', 'Seychelles'],
    answer: 'Rodrigues',
    hint: 'The teacher writes his name, and the next line says where he is from.',
    explanation: 'Joel had come from <b>Rodrigues</b>. That is why the class hears a difference when he speaks.' }),

  makeMCQ({ id: 'g5eng-psg-063', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_NEWBOY + '<p>What did Joel do when the ball of paper landed on his desk?</p>',
    options: ['He put it in the bin', 'He threw it back at once',
              'He told Mr Lutchmun about it', 'He left it where it had landed'],
    answer: 'He put it in the bin',
    hint: 'His response is one short sentence on a line of its own.',
    explanation: 'He <b>put it in the bin</b>. He did not throw it back and he did not complain, which is what makes the whole class lose interest.' }),

  // ── inference ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-064', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_NEWBOY + '<p>Why does the writer say that Wednesday in mid-term "was the wrong way to arrive"?</p>',
    options: ['Friendships in the class had already been formed',
              'Wednesday was the busiest school day of the week',
              'The tests in March were already very close',
              'Mr Lutchmun did not like new pupils joining late'],
    answer: 'Friendships in the class had already been formed',
    hint: 'Think about what has happened in a class by the middle of a term.',
    explanation: 'By mid-term everyone has settled and paired off, so a newcomer arrives <b>after the places have been taken</b> - which the empty chair beside him then shows for two weeks.' }),

  makeMCQ({ id: 'g5eng-psg-065', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_NEWBOY + '<p>"Meera did not laugh. She also did not turn round to see who had." What does the second sentence tell us?</p>',
    options: ['She avoided getting involved in any way at all',
              'She already knew exactly who had laughed',
              'She was concentrating hard on the lesson',
              'She could not hear where the laugh came from'],
    answer: 'She avoided getting involved in any way at all',
    hint: 'Ask why the writer bothers to tell us about something Meera did NOT do.',
    explanation: 'Not laughing is to her credit; not looking is not. The writer adds it to show she <b>chose not to know</b>, which keeps her out of it - and sets up the two weeks in which she does nothing.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-066', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_NEWBOY + '<p>Meera "noticed him the way you notice a chair that has been moved". This means she</p>',
    options: ['was aware of him but thought little about it',
              'found him annoying and rather in her way',
              'watched him closely almost every single day',
              'kept forgetting that he was there at all'],
    answer: 'was aware of him but thought little about it',
    hint: 'How much attention do you really give a chair in the wrong place?',
    explanation: 'You register a moved chair and then carry on. The comparison says she <b>saw him without thinking about him</b>, which is exactly the distance the story then closes.' }),

  makeMCQ({ id: 'g5eng-psg-067', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_NEWBOY + '<p>Why did Meera leave "before he could say anything"?</p>',
    options: ['She did not want to be thanked in front of others',
              'She was in a hurry to catch her bus home',
              'She was afraid Joel would refuse the book',
              'She had remembered she needed the book herself'],
    answer: 'She did not want to be thanked in front of others',
    hint: 'The rest of the sentence gives her reason directly.',
    explanation: 'The passage says she <i>did not want anyone to make a thing of it</i>. Being thanked publicly would have turned a private kindness into a performance.' }),

  // ── judgement ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-068', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_NEWBOY + '<p>Why does Meera mention that nobody had asked for the second book back?</p>',
    options: ['To show she was not giving up anything she needed',
              'To explain why the book was in poor condition',
              'To suggest that her cousin had forgotten about it',
              'To prove to Joel that the book really was hers'],
    answer: 'To show she was not giving up anything she needed',
    hint: 'She is careful to tell us the "I have two" was true. Why does that matter to her?',
    explanation: 'The detail keeps her honest with herself: the gift cost her almost nothing. The writer <b>refuses to make her a hero</b>, which is what makes what she does believable.' }),

  makeMCQ({ id: 'g5eng-psg-069', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_NEWBOY + '<p>On Monday it is Sanjay, not Meera, who sits beside Joel. Why is this a good ending?</p>',
    options: ['One small act had made it easier for others to follow',
              'It shows that Meera had already changed her mind',
              'It proves that Sanjay had always wanted to be friends',
              'It means Joel no longer needed Meera\'s help at all'],
    answer: 'One small act had made it easier for others to follow',
    hint: 'Sanjay had never spoken to Joel before either. What has changed in the room?',
    explanation: 'Sanjay had <i>never spoken to Joel either</i>, so something shifted between Friday and Monday. Meera changed what the class thought was allowed, and the ending is stronger because <b>she gets no credit for it</b>.' }),

  makeMCQ({ id: 'g5eng-psg-070', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_NEWBOY + '<p>What does Meera mean by feeling "as though she had got away with something good"?</p>',
    options: ['She had done a kind thing without anybody noticing',
              'She was worried that she might still be found out',
              'She had escaped a punishment she deserved',
              'She was pleased that the book had not been missed'],
    answer: 'She had done a kind thing without anybody noticing',
    hint: 'Usually you "get away with" something bad. Why has the writer swapped the word?',
    explanation: 'You normally get away with something wrong. Turning the phrase around catches a private, slightly guilty pleasure: <b>she did good and nobody saw</b>, which is exactly how she wanted it.' }),

  // ── evaluative judgement ─────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-071', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_NEWBOY + '<p>Which of these is the fairest description of Meera?</p>',
    options: ['Ordinary, but willing to act in the end',
              'Brave and confident from the beginning',
              'Unkind towards Joel for two whole weeks',
              'Only interested in her own test results'],
    answer: 'Ordinary, but willing to act in the end',
    hint: 'The passage twice tells you what Meera is not. Take it at its word.',
    explanation: 'She says of herself: <i>She was not brave. She knew she was not brave.</i> She watches for two weeks, which is not kind - but she is not unkind either, and eventually she <b>acts anyway</b>. That is the honest middle description.' })

);
