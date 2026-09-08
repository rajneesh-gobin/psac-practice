'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT 4 - Grade 5 English, fourth passage at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  SHAPE: the quietest of the five, and deliberately so. Nothing is lost, found
//  or damaged - the whole event is internal, and the "action" at the climax is
//  a girl standing still in chest-deep water. It gives the chapter a text where
//  almost every question has to be inferred, since there is very little plot to
//  retrieve. The 2025 paper works the same way: a girl looking at a shop window.
//
//  ⚠ The ending is deliberately unresolved - she does not swim. A passage whose
//    last line solves everything gives the evaluative question nothing to do.
// ══════════════════════════════════════════════════════════════════════════

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_POOL = _g5psgBox(`
<b style="color:#1e3a8a">Read the passage, then answer the question.</b><br><br>
<b>The Deep End</b><br><br>
Every Thursday the Grade 5 class walked to the public swimming pool at Beau Bassin, and
every Thursday Anjali stayed in the shallow end.<br><br>
She had her own reasons. She had never explained them to anybody.<br><br>
The shallow end was safe. The water reached her waist. The tiles were rough and
warm underneath her feet, and if she stood still she could see her own toes. At the
far end the water turned a darker blue, and the floor of the pool dropped away,
and you could see nothing whatever down there.<br><br>
"You could try the middle," said Mrs Appadoo, the swimming teacher. She said it
every week. She repeated it in the same easy voice each time, and she never
waited for an answer.<br><br>
Anjali always shook her head and stayed exactly where she was.<br><br>
The others had stopped asking months ago. They swam races, dived for rings and shouted across
the water, while Anjali stood in the shallow end and practised her arm movements, over
and over, the way she had been shown.<br><br>
That Thursday, Kavita came and stood beside her.<br><br>
Kavita was the fastest swimmer in the class. Anjali expected her to say something
about the middle, and she got ready to shake her head.<br><br>
"My cousin drowned," Kavita said. "In Rodrigues. Before I was born."<br><br>
Anjali did not know what to say.<br><br>
"That is why my mother made me learn." Kavita wiped the water from her face. "I hated it for
about a year."<br><br>
Then she pushed off and swam away, and that was all.<br><br>
Anjali stood where she was for a long time.<br><br>
At the end of the lesson, when the others were climbing out and the water had
gone quiet, she walked slowly along the edge until the tiles under her feet began
to slope downwards. The water rose to her chest. She stopped. It rose no further, because
she had stopped.<br><br>
She stood there while the sky turned pink above the changing rooms. She counted to sixty. Then
she counted to sixty again.<br><br>
That was all she did. She did not swim. She did not go any deeper.<br><br>
Mrs Appadoo was coiling a rope at the opposite side. She looked up once, then looked
away again without saying anything, and Anjali was grateful for it.<br><br>
On the bus home Kavita sat two seats in front and did not turn around.<br><br>
Anjali watched the back of her head and thought: next Thursday.
`, '#2563eb');

STATIC_QUESTIONS.push(

  // ── literal retrieval ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-052', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_POOL + '<p>What did Anjali do during every swimming lesson?</p>',
    options: ['She stayed in the shallow end', 'She dived for rings with the others',
              'She sat at the edge of the pool', 'She swam races against Kavita'],
    answer: 'She stayed in the shallow end',
    hint: 'The very first sentence tells you.',
    explanation: 'Every Thursday she <b>stayed in the shallow end</b> and practised her arms. Diving for rings and swimming races is what the others did.' }),

  makeMCQ({ id: 'g5eng-psg-053', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_POOL + '<p>Who told Anjali about a cousin who had drowned?</p>',
    options: ['Kavita', 'Mrs Appadoo', 'Her mother', 'Anjali\'s cousin'],
    answer: 'Kavita',
    hint: 'Someone comes and stands beside her in the shallow end.',
    explanation: '<b>Kavita</b>, the fastest swimmer in the class, tells her. It is Kavita\'s own mother who made her learn after it happened.' }),

  // ── inference ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-054', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_POOL + '<p>Why does Mrs Appadoo never wait for an answer?</p>',
    options: ['She is leaving the choice entirely to Anjali',
              'She is too busy watching the other children',
              'She has given up hope that Anjali will swim',
              'She already knows Anjali cannot hear her'],
    answer: 'She is leaving the choice entirely to Anjali',
    hint: 'She keeps offering every week, but never pushes. What does that combination show?',
    explanation: 'She offers <i>every week</i> in the <i>same easy voice</i> and never presses. She has not given up - she keeps asking - but she <b>refuses to push</b>, which is why Anjali is grateful to her at the end.' }),

  makeMCQ({ id: 'g5eng-psg-055', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_POOL + '<p>Why does Kavita tell Anjali about her cousin?</p>',
    options: ['To show Anjali that fear of water can make sense',
              'To warn Anjali that the deep end is dangerous',
              'To explain why she is the fastest in the class',
              'To persuade Anjali to join the swimming races'],
    answer: 'To show Anjali that fear of water can make sense',
    hint: 'Kavita then adds that she hated swimming for a year. Why mention that?',
    explanation: 'Kavita does not tell Anjali to swim. She says her own family had a real reason to fear water, and that <i>she hated it for about a year</i> - she is saying <b>the fear is reasonable and it passes</b>.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-056', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_POOL + '<p>"The floor of the pool dropped away." This means the bottom</p>',
    options: ['sloped down suddenly', 'had cracked and broken',
              'was covered in dark tiles', 'was too slippery to stand on'],
    answer: 'sloped down suddenly',
    hint: 'It is contrasted with the shallow end, where she can see her toes.',
    explanation: 'To <b>drop away</b> is to fall steeply out of reach. The passage adds that <i>you could see nothing down there at all</i>, which is what makes it frightening.' }),

  makeMCQ({ id: 'g5eng-psg-057', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_POOL + '<p>Anjali was <b>grateful</b> to Mrs Appadoo at the end because the teacher</p>',
    options: ['said nothing about what she had done',
              'praised her in front of the whole class',
              'came over to help her out of the water',
              'let the class leave the pool early'],
    answer: 'said nothing about what she had done',
    hint: 'The teacher looks up, and then does something. What?',
    explanation: 'Mrs Appadoo <i>looked up once, then looked away again without saying anything</i>. Making a fuss would have turned a private moment into a public one, and <b>the silence is the kindness</b>.' }),

  // ── the writer's craft ───────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-058', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_POOL + '<p>"It rose no further, because she had stopped." Why does the writer add these words?</p>',
    options: ['To show Anjali was in control of how far she went',
              'To explain that the pool was not very deep there',
              'To suggest that the water level had gone down',
              'To show that she was too frightened to move'],
    answer: 'To show Anjali was in control of how far she went',
    hint: 'The water did not decide anything. Who did?',
    explanation: 'The water only rose because she walked into it, so it <b>stopped when she stopped</b>. The sentence quietly hands her the control that fear had taken away.' }),

  makeMCQ({ id: 'g5eng-psg-059', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_POOL + '<p>The writer says: "That was all she did. She did not swim." Why does this make her achievement seem bigger, not smaller?</p>',
    options: ['Because it cost her far more than anyone watching could see',
              'Because the other children had already left the pool by then',
              'Because she had promised Kavita that she would try it once',
              'Because Mrs Appadoo had been asking her to do it every week'],
    answer: 'Because it cost her far more than anyone watching could see',
    hint: 'Compare what it cost Anjali with what it would cost Kavita.',
    explanation: 'To anyone watching, nothing happened. The writer states the smallness plainly so the reader supplies the rest: for a girl who has not left the shallow end all year, <b>chest-deep water and counting to sixty twice is enormous</b>.' }),

  makeMCQ({ id: 'g5eng-psg-060', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_POOL + '<p>The story ends with Anjali thinking "next Thursday". What does this suggest?</p>',
    options: ['She intends to go a little further the following week',
              'She is dreading having to return to the pool again',
              'She plans to ask Kavita to teach her to swim',
              'She has decided to tell her mother what happened'],
    answer: 'She intends to go a little further the following week',
    hint: 'She has just proved to herself that she can stop wherever she chooses.',
    explanation: 'Nothing is solved - she still cannot swim. But <i>next Thursday</i> is a plan rather than a dread, and the reader understands she will <b>go on in small steps of her own choosing</b>.' }),

  // ── evaluative judgement ─────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-061', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_POOL + '<p>Which word best describes the way Kavita helped Anjali?</p>',
    options: ['Quietly', 'Loudly', 'Unwillingly', 'Impatiently'],
    answer: 'Quietly',
    hint: 'Think about how much Kavita says, and what she does straight afterwards.',
    explanation: '<b>Quietly</b>: she says three short things, swims away without waiting for a reply, and on the bus she does not even turn round. She never mentions the deep end at all.' })

);
