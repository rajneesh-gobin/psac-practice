'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT 3 - Grade 5 English, third passage at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  SHAPE: closest of the three to the 2023 paper, where two boys set off on an
//  outing together and it goes wrong. Two characters means the questions can
//  test motive separately for each - Yash decides, Dev goes along, and only one
//  of them has been told to stay on the road.
//
//  REGISTER (targets measured from the 2023-25 papers: 413-447 words, 12-16% of
//  words 7+ letters, sentences averaging 10.9-11.8 words). Draft 1 ran dense at
//  17.5%, draft 2 ran thin at 9.4% before its vocabulary pass. This one was
//  written to the band from the start rather than corrected into it.
//
//  ⚠ The reading demand belongs in the QUESTIONS, not in hard words. Four of
//    the ten below cannot be answered by locating a sentence: they need the
//    reader to assemble scattered detail, or to read a line the writer has
//    deliberately left unstated.
// ══════════════════════════════════════════════════════════════════════════

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_SHORTCUT = _g5psgBox(`
<b style="color:#3f6212">Read the passage, then answer the question.</b><br><br>
<b>The Shortcut</b><br><br>
The first drops fell as Yash and Dev came out of the school gate.<br><br>
"We will never make it," Dev said, looking up. The clouds above Curepipe had
turned the colour of an old coin.<br><br>
Yash pointed across the road to where the sugarcane began. "Through the
plantation. It comes out behind the temple. Ten minutes."<br><br>
Dev hesitated. His mother had told him many times to stay on the road. But the
rain was already tapping harder on the pavement, and his schoolbag was not
waterproof, and ten minutes sounded like nothing at all.<br><br>
They climbed the low wall and went in.<br><br>
The cane was taller than either of them. The leaves met above their heads, so the
light turned green and the noise of the traffic disappeared almost at once. It
was warmer inside, and the earth between the rows was soft and red.<br><br>
For a while it was an adventure. They walked quickly, shoulder to shoulder,
complaining about the geography test.<br><br>
Then the rows stopped running straight.<br><br>
Yash stopped too. He turned around slowly. Every direction looked exactly the
same: green walls, red earth, and a narrow strip of grey sky far above.<br><br>
"Which way did we come?" Dev asked, and his voice had changed.<br><br>
They tried one line of cane, and then another. The rain arrived properly now,
drumming on the leaves, and the soft ground turned to mud that dragged at their
shoes. Yash's shirt was sticking to his back. Neither of them said the word
"lost", although both of them were thinking it.<br><br>
It was Dev who thought of shouting.<br><br>
They shouted together, over and over, until their throats hurt, and for a long
time nothing answered except the rain.<br><br>
Then, quite close, a man's voice called back.<br><br>
He was a field worker in a torn plastic coat, and he did not seem surprised to
discover two boys standing in the mud. He looked at them for a moment. Then he
turned and set off, and they followed him along a line they would never have
chosen, and within four minutes they were standing on the road beside the
temple.<br><br>
"Thank you," Yash said.<br><br>
The man wiped the rain out of his eyes. "Every year," he said, "somebody's
children." Then he walked back into the cane.<br><br>
Dev reached home twenty minutes late, soaked through, with red mud to his
knees.<br><br>
His mother asked him what had happened.<br><br>
He could have said the rain. He thought about saying the rain.<br><br>
"We went through the plantation," he said.
`, '#65a30d');

STATIC_QUESTIONS.push(

  // ── literal retrieval ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-042', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_SHORTCUT + '<p>How long did Yash say the shortcut would take?</p>',
    options: ['Ten minutes', 'Four minutes', 'Twenty minutes', 'Half an hour'],
    answer: 'Ten minutes',
    hint: 'Yash says it twice - once himself, and once inside Dev\'s thoughts.',
    explanation: 'Yash promised <b>ten minutes</b>. Four minutes is how long the field worker took to lead them out, and twenty minutes is how late Dev finally reached home.' }),

  makeMCQ({ id: 'g5eng-psg-043', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_SHORTCUT + '<p>Who first suggested going through the sugarcane?</p>',
    options: ['Yash', 'Dev', 'The field worker', 'Dev\'s mother'],
    answer: 'Yash',
    hint: 'Look at who is pointing across the road.',
    explanation: '<b>Yash</b> points across the road and suggests it. Dev only hesitates and then follows - a difference the later questions depend on.' }),

  // ── inference: motive ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-044', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_SHORTCUT + '<p>Why did Dev hesitate before climbing the wall?</p>',
    options: ['He had been told many times to stay on the road',
              'He did not believe the shortcut would be quicker',
              'He was worried about getting his shoes muddy',
              'He wanted to wait and see if the rain stopped'],
    answer: 'He had been told many times to stay on the road',
    hint: 'The reason is given in the same sentence as his hesitation.',
    explanation: 'His mother had told him <b>many times to stay on the road</b>. Everything after that sentence is the excuse he builds for going anyway.' }),

  makeMCQ({ id: 'g5eng-psg-045', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_SHORTCUT + '<p>"His voice had changed." What had happened to Dev?</p>',
    options: ['He had begun to feel frightened', 'He had grown angry with Yash',
              'He had become short of breath', 'He had started to feel unwell'],
    answer: 'He had begun to feel frightened',
    hint: 'Consider what he has just realised when he asks the question.',
    explanation: 'He asks which way they came just as they realise they cannot tell. The changed voice is <b>fear</b>, shown rather than named - the writer never uses the word.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-046', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_SHORTCUT + '<p>The clouds "had turned the colour of an old coin". This tells us the sky was</p>',
    options: ['a dull, dark grey', 'a warm golden yellow',
              'a bright silver white', 'a deep evening blue'],
    answer: 'a dull, dark grey',
    hint: 'Think about what an old coin looks like once it has lost its shine.',
    explanation: 'An old coin is <b>dull and dark grey</b>, not shiny. The comparison warns us about the storm before the writer describes any rain.' }),

  makeMCQ({ id: 'g5eng-psg-047', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_SHORTCUT + '<p>The mud "dragged at their shoes". This suggests that walking became</p>',
    options: ['slow and tiring', 'noisy and slippery',
              'cold and painful', 'quick and easy'],
    answer: 'slow and tiring',
    hint: 'What does it feel like when something drags you back at every step?',
    explanation: 'To drag is to pull backwards, so every step cost them effort - walking became <b>slow and tiring</b>. It is part of a group of details showing conditions getting worse.' }),

  // ── inference: assembling scattered detail ───────────────────────────────
  makeMCQ({ id: 'g5eng-psg-048', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_SHORTCUT + '<p>Why does the writer say that neither boy said the word "lost"?</p>',
    options: ['Saying it aloud would have made it feel real',
              'Neither of them had realised they were lost',
              'They were too out of breath to speak at all',
              'They did not want to blame each other'],
    answer: 'Saying it aloud would have made it feel real',
    hint: 'The writer adds that both of them were thinking it.',
    explanation: 'The line says they were <i>both thinking it</i> - so they knew. Not saying it is how people <b>hold off admitting</b> something frightening. Nothing suggests they could not speak.' }),

  makeMCQ({ id: 'g5eng-psg-049', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_SHORTCUT + '<p>The field worker says, "Every year, somebody\'s children." What does this suggest?</p>',
    options: ['Children get lost in the cane fields regularly',
              'He has met these two particular boys before',
              'He believes the boys should be punished',
              'He is annoyed at being called away from work'],
    answer: 'Children get lost in the cane fields regularly',
    hint: 'He was not surprised to find them. Connect that to what he says.',
    explanation: '"Every year" means this happens often, and it explains why he <i>did not seem surprised</i>. He says it without scolding them, which is what makes the remark land.' }),

  // ── judgement and theme ──────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-050', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_SHORTCUT + '<p>At the end, Dev tells his mother the truth. Why is this a difficult thing for him to do?</p>',
    options: ['He had disobeyed her, and the rain was a ready excuse',
              'He was afraid the field worker would be blamed',
              'He had promised Yash that he would say nothing',
              'He could not remember clearly what had happened'],
    answer: 'He had disobeyed her, and the rain was a ready excuse',
    hint: 'The two short sentences before his answer show him weighing it up.',
    explanation: '<i>He could have said the rain. He thought about saying the rain.</i> The excuse was true and would have been believed - which is exactly why <b>choosing the truth costs him something</b>.' }),

  makeMCQ({ id: 'g5eng-psg-051', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_SHORTCUT + '<p>Which word best describes the boys\' decision to enter the plantation?</p>',
    options: ['Hasty', 'Cruel', 'Generous', 'Dishonest'],
    answer: 'Hasty',
    hint: 'They made the choice while standing in the first few drops of rain.',
    explanation: '<b>Hasty</b> means done in a hurry without enough thought, which is exactly it - they decided in seconds to avoid a soaking. They were not being cruel or dishonest at that point; the dishonesty is only the temptation Dev resists at the end.' })

);
