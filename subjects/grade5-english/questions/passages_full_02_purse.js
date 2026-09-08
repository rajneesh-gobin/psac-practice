'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT 2 - Grade 5 English, second passage at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  ⚠ WHY THIS IS A SECOND NARRATIVE, NOT A NEW TEXT TYPE
//    Checked against all three MES papers: the Question 1 stimulus is a
//    child-centred third-person narrative EVERY year - two boys on a fishing
//    trip (2023), a girl searching for a lost teddy bear (2024), a girl looking
//    at toys in a shop window (2025). No poem, email, advertisement or letter
//    is ever used for Q1. The chapter's five text types are worth keeping for
//    broader literacy, but the paper tests narrative, so that is where the
//    full-length texts belong.
//
//  ⚠ REGISTER, AND THE TWO CORRECTIONS IT TOOK
//    Target measured from the papers: 413-447 words, 12-16% of words 7+ letters,
//    sentences averaging 10.9-11.8 words.
//      · Draft 1 came out at 17.5% long words - denser than the real thing.
//      · Draft 2 was then written deliberately plainer and landed at 9.4% -
//        past the target the other way.
//    This is the vocabulary pass that brings it into band: about a dozen common
//    words carry a longer synonym, chosen where the sentence wanted the weight
//    anyway. Sentence rhythm was already right and is untouched. The reading
//    demand still sits in the QUESTIONS, not in hard words - which is how the
//    real papers work.
// ══════════════════════════════════════════════════════════════════════════

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_PURSE = _g5psgBox(`
<b style="color:#155e75">Read the passage, then answer the question.</b><br><br>
<b>The Purse on the Bench</b><br><br>
The bus to Rose Hill was late again.<br><br>
Sarita sat on the bench outside the school gate and counted the coins in her
hand. Twelve rupees. If she saved for four more days she would have enough for
the blue pencil case in the stationery shop window, the one with three zips and a
small mirror inside.<br><br>
She was putting the coins away when she noticed the purse.<br><br>
It lay in the corner of the bench, half hidden underneath her schoolbag. It was
brown, worn soft at the edges, and it was crammed with banknotes. Sarita looked
around. The other children had scattered. The road was deserted except for a
stray dog asleep in the shade.<br><br>
She opened it, only to look.<br><br>
Inside there were banknotes folded in half, a bus pass, and a photograph of two
small boys in school uniform. There was no name on the pass, only a number.<br><br>
Sarita thought about the pencil case. She thought about it for longer than she
liked.<br><br>
Then she closed the purse, held it in both hands, and waited.<br><br>
The bus came. She let it go.<br><br>
A second bus came. She let that one go too, and by then the shadows had stretched
long across the road, and she knew her mother would already be watching the clock
at home.<br><br>
She was standing up to leave when she heard quick footsteps.<br><br>
An old woman came hurrying along the pavement, searching the ground as she
walked, turning her head from side to side. Her hair had escaped from its clip.
She was breathing hard.<br><br>
"Madam," Sarita said. "Is this yours?"<br><br>
The woman stopped. She looked at the purse, and then at Sarita, and for a moment
she did not say anything at all.<br><br>
"My grandsons," she said at last. She opened the purse and took out the
photograph, not the money. "I carry them everywhere."<br><br>
She tried to press a fifty-rupee note into Sarita's hand. Sarita stepped back and
shook her head.<br><br>
"Then tell me your name," the woman said.<br><br>
The next morning the head teacher read Sarita's name out at assembly. Sarita
stood with her face burning while four hundred children applauded, and she wished
desperately that she could sit down.<br><br>
She still did not have the pencil case. She bought it eleven days later, and it
was exactly as nice as she had imagined.<br><br>
But it was not the thing she told her mother about that evening.
`, '#0891b2');

STATIC_QUESTIONS.push(

  // ── literal retrieval ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-032', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_PURSE + '<p>How much money did Sarita have when she sat down on the bench?</p>',
    options: ['Twelve rupees', 'Fifty rupees', 'Eleven rupees', 'Four rupees'],
    answer: 'Twelve rupees',
    hint: 'She counts her own coins in the second paragraph.',
    explanation: 'Sarita counted <b>twelve rupees</b>. The fifty rupees is what the old woman later tries to give her, and the other numbers come from the days she had to save and the days she waited.' }),

  makeMCQ({ id: 'g5eng-psg-033', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_PURSE + '<p>Which of these was <b>not</b> inside the purse?</p>',
    options: ['A letter with an address on it',
              'A photograph of two young boys',
              'Some banknotes folded in half',
              'A bus pass with a number'],
    answer: 'A letter with an address on it',
    hint: 'The passage lists exactly three things. Find the one that is missing.',
    explanation: 'The purse held banknotes, a bus pass and a photograph. There was <b>no letter and no name</b> - only a number on the pass, which is why Sarita could not simply return it herself.' }),

  // ── inference: motive and feeling ────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-034', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_PURSE + '<p>Why did Sarita let two buses go past?</p>',
    options: ['She had decided to wait for the owner to come back',
              'She did not have the right coins for the bus fare',
              'She was still deciding whether to keep the money',
              'She was waiting for her mother to come and fetch her'],
    answer: 'She had decided to wait for the owner to come back',
    hint: 'Look at what she does immediately before the first bus arrives.',
    explanation: 'She <i>closed the purse, held it in both hands, and waited</i> - the choice is already made before the buses come. Letting them go is what the decision costs her.' }),

  makeMCQ({ id: 'g5eng-psg-035', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_PURSE + '<p>"She thought about it for longer than she liked." What does this tell us about Sarita?</p>',
    options: ['She was tempted, and it troubled her to be tempted',
              'She had completely forgotten about the pencil case',
              'She was annoyed that the purse had been left there',
              'She was certain from the start what she would do'],
    answer: 'She was tempted, and it troubled her to be tempted',
    hint: 'Ask why the writer says "longer than she liked" instead of just "for a long time".',
    explanation: '"Longer than she liked" shows she was <b>uncomfortable with her own thoughts</b>. The line makes her honest rather than perfect, which is what makes her choice mean something.' }),

  makeMCQ({ id: 'g5eng-psg-036', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_PURSE + '<p>How can we tell the old woman had been searching for some time?</p>',
    options: ['She was hurrying, out of breath, with her hair escaping',
              'She told Sarita that she had walked from Rose Hill',
              'She was carrying her shopping bags in both hands',
              'She had asked the other children at the school gate'],
    answer: 'She was hurrying, out of breath, with her hair escaping',
    hint: 'The writer never says she had been searching. How do we know?',
    explanation: 'The writer shows it instead of stating it: <i>hurrying</i>, <i>searching the ground</i>, <i>hair escaped from its clip</i>, <i>breathing hard</i>. Putting these details together is the reading skill being tested.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-037', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_PURSE + '<p>The purse was "worn soft at the edges". This suggests that it was</p>',
    options: ['old and used for many years', 'made of very cheap cloth',
              'damaged in an accident', 'newly bought from a shop'],
    answer: 'old and used for many years',
    hint: 'What makes leather go soft at the corners over time?',
    explanation: '<b>Worn</b> soft means softened by long use. The detail quietly tells us the purse matters to someone, before we ever meet its owner.' }),

  makeMCQ({ id: 'g5eng-psg-038', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_PURSE + '<p>At assembly, Sarita stood "with her face burning". This means she felt</p>',
    options: ['embarrassed by all the attention',
              'angry about being made to stand',
              'unwell and in need of some air',
              'proud of what she had managed'],
    answer: 'embarrassed by all the attention',
    hint: 'Read the rest of the same sentence before choosing.',
    explanation: 'A burning face means blushing. The rest of the sentence confirms it: she <i>wished desperately that she could sit down</i>. She is <b>embarrassed</b>, not proud.' }),

  // ── judgement and theme ──────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-039', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_PURSE + '<p>Why does the old woman take out the photograph rather than the money?</p>',
    options: ['The picture of her grandsons matters most to her',
              'She wants to prove that the purse belongs to her',
              'She is checking that the money is still all there',
              'She means to give the photograph to Sarita'],
    answer: 'The picture of her grandsons matters most to her',
    hint: 'The purse was crammed with banknotes, yet that is not what she reaches for.',
    explanation: 'She reaches past the money for the photograph and says <i>"I carry them everywhere"</i>. The purse was <b>never valuable because of the money</b> - which is the point Sarita nearly missed.' }),

  makeMCQ({ id: 'g5eng-psg-040', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_PURSE + '<p>Sarita refuses the fifty-rupee note even though she is saving for a pencil case. Why?</p>',
    options: ['Taking a reward would spoil what she had chosen to do',
              'She thinks fifty rupees is not enough for the case',
              'She is afraid her mother would ask where it came from',
              'She has already given up on buying the pencil case'],
    answer: 'Taking a reward would spoil what she had chosen to do',
    hint: 'She waited through two buses before there was any reward to expect.',
    explanation: 'She chose to wait when no reward existed. Accepting payment afterwards would <b>turn a kindness into a transaction</b>. Note that she does buy the case later, so she had not given up on it.' }),

  makeMCQ({ id: 'g5eng-psg-041', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_PURSE + '<p>The story ends: "But it was not the thing she told her mother about that evening." What is the writer suggesting?</p>',
    options: ['The afternoon at the bus stop mattered more than the pencil case',
              'Sarita had decided to keep the pencil case a secret at home',
              'Her mother was not interested in hearing about a pencil case',
              'Sarita was still upset about having to stand up at assembly'],
    answer: 'The afternoon at the bus stop mattered more than the pencil case',
    hint: 'The whole story has been building towards which of these two things matters.',
    explanation: 'She finally gets the case, and it is <i>exactly as nice as she had imagined</i> - yet it is not what she wants to talk about. The ending says, without stating it, that <b>what happened on the bench mattered more</b>.' })

);
