'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT 1 - Grade 5 English, first passage at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  ⚠ REGISTER PASS APPLIED. Written before drafts 2 and 3 existed, this came out
//    at 17.5% long words and 13.5-word sentences - denser than the real papers
//    on both counts (targets: 413-447 words, 12-16% of words 7+ letters,
//    sentences averaging 10.9-11.8). The pass swaps about fifteen heavy words
//    for plainer ones and splits four long sentences.
//
//  ⚠ EVERY PHRASE A QUESTION QUOTES WAS LEFT ALONE - "wrestled", "shoved back
//    against them", "unfamiliar", "wavering light", "shadows seemed too tall",
//    "never the part about the rice", "being frightened is not the same as being
//    alone", "climbing poles in the dark", and the closing two lines. An
//    explanation that cites text no longer in the passage is a silent defect:
//    the question still marks correctly, so nothing fails, and the child is the
//    only one who notices.
//
//  WHAT TO COPY WHEN WRITING MORE
//    · One text, many questions - the passage const is shared, because practice
//      and exam mode both serve single questions at random.
//    · Span the skills the paper does: literal retrieval, inference about motive
//      and feeling, vocabulary in context, and one evaluative judgement.
//    · Keep the four options within a few characters of each other, or
//      floor-check's `answer-stands-out` rule fires.
//    · Put the demand in the QUESTIONS, not in hard words.
// ══════════════════════════════════════════════════════════════════════════

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_CYCLONE = _g5psgBox(`
<b style="color:#7c2d12">Read the passage, then answer the question.</b><br><br>
<b>The Night the Lights Went Out</b><br><br>
By four o'clock the sky above Quatre Bornes had turned the colour of wet slate.
Rajesh stood at the window. The coconut palms were bending, their leaves tossing
like live things. On the radio the announcer said the same words every few
minutes: <i>Class III cyclone warning remains in force.</i><br><br>
"Help me with the shutters," his grandmother called from the veranda.<br><br>
Rajesh did not move at once. He had spent three weeks building a model boat out
of matches for the school show. It stood finished on the table by the window,
every sail glued, every rope tied. Once the shutters were closed the room would
be dark, and he wanted to look at it a little longer.<br><br>
"Rajesh." Her voice was patient, but it did not invite an argument.<br><br>
Together they wrestled the heavy wooden panels across the windows while the wind
shoved back against them. By the time the last catch clicked shut, the rain had
come. It drummed on the tin roof so loudly that Rajesh had to shout to be
heard.<br><br>
At half past six the lights blinked twice and died.<br><br>
His grandmother lit two candles and stood them on saucers. In the wavering light
the kitchen looked unfamiliar. The shadows seemed too tall. Rajesh listened to
the storm and thought about the men out in it, climbing poles in the dark so that
other people's houses could be bright.<br><br>
"Come," his grandmother said. "We will eat, and I will tell you about the cyclone
of 1975."<br><br>
She talked for a long time. She told of a roof that lifted away like the lid of a
pot, and a river that took a bridge, and neighbours who shared one pot of rice
between eleven people for two days. Rajesh had heard parts of the story before,
but never the part about the rice.<br><br>
"Were you frightened?" he asked.<br><br>
"Of course," she said. "But being frightened is not the same as being
alone."<br><br>
The wind dropped soon after midnight. In the morning the garden was covered with
torn leaves and green mangoes knocked down before their time. The air smelled
scrubbed and new. Rajesh went straight to the table by the window.<br><br>
The boat was safe. Rain had seeped under the shutter and stained one sail brown,
but the hull was whole.<br><br>
He carried it out to his grandmother. She was already sweeping the veranda.<br><br>
"It's spoilt," he said, holding out the marked sail.<br><br>
She looked at it for a moment, then went on sweeping. "It came through a
cyclone," she said. "Now it has a story."
`, '#ea580c');

STATIC_QUESTIONS.push(

  // ── literal retrieval ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-022', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_CYCLONE + '<p>What warning did the radio announcer keep repeating?</p>',
    options: ['That a Class III cyclone warning was in force',
              'That the electricity would be cut off at six',
              'That the school show had been put off',
              'That heavy rain was expected after midnight'],
    answer: 'That a Class III cyclone warning was in force',
    hint: 'Look at the sentence printed in italics near the start.',
    explanation: 'The announcer repeated that a <b>Class III cyclone warning</b> remained in force. The other options describe things that happen later in the passage, or never happen at all.' }),

  makeMCQ({ id: 'g5eng-psg-023', chapterId: 'eng-passages', subsection: 'story', difficulty: 1,
    question: _G5PSG_CYCLONE + '<p>At what time did the electricity fail?</p>',
    options: ['At half past six in the evening',
              'At four o\'clock in the afternoon',
              'Soon after midnight that night',
              'Early the following morning'],
    answer: 'At half past six in the evening',
    hint: 'One short paragraph in the middle gives the exact time.',
    explanation: 'The lights blinked twice and died at <b>half past six</b>. Four o\'clock is when the sky darkened, and the wind dropped after midnight.' }),

  // ── inference: motive ────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-024', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_CYCLONE + '<p>Why did Rajesh not move at once when he was called?</p>',
    options: ['He wanted to keep looking at the boat he had built',
              'He had not heard his grandmother calling him',
              'He was afraid to go out onto the open veranda',
              'He thought the shutters were already fastened'],
    answer: 'He wanted to keep looking at the boat he had built',
    hint: 'The sentence after his hesitation explains what was on his mind.',
    explanation: 'He knew that closing the shutters would darken the room, and he <b>wanted to look at his model boat a little longer</b>. The passage never suggests he did not hear her or was afraid.' }),

  makeMCQ({ id: 'g5eng-psg-025', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_CYCLONE + '<p>Why does Rajesh think about the men working outside?</p>',
    options: ['He realises others are out in the storm so homes can have light',
              'He hopes they will repair the line before the school show',
              'He remembers that his grandmother once worked with them',
              'He wonders whether they had been warned about the storm'],
    answer: 'He realises others are out in the storm so homes can have light',
    hint: 'Ask what the thought shows about Rajesh, not about the men.',
    explanation: 'Sitting safely by candlelight, he pictures men <b>climbing poles in the dark</b> for other people\'s houses. It is a moment of thinking beyond himself, which prepares the reader for the ending.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-026', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_CYCLONE + '<p>The word <b>wrestled</b> shows that closing the shutters was</p>',
    options: ['a struggle that took real effort',
              'a task they finished very quickly',
              'a game the two of them played',
              'a job that had to be done quietly'],
    answer: 'a struggle that took real effort',
    hint: 'Think about what wrestling involves, then look at what the wind was doing.',
    explanation: '<b>Wrestled</b> suggests a physical struggle, and the passage adds that the wind <i>shoved back against them</i>. The word choice makes the storm feel like an opponent.' }),

  makeMCQ({ id: 'g5eng-psg-027', chapterId: 'eng-passages', subsection: 'story', difficulty: 2,
    question: _G5PSG_CYCLONE + '<p>The kitchen looked <b>unfamiliar</b> in the candlelight because</p>',
    options: ['the weak light changed how the room appeared',
              'the storm had moved the furniture about',
              'they were eating in a different room',
              'his grandmother had tidied the kitchen'],
    answer: 'the weak light changed how the room appeared',
    hint: 'Nothing in the room itself had changed. What had?',
    explanation: 'In the <i>wavering light</i> the <i>shadows seemed too tall</i>. The room was the same; the <b>light</b> was different, so it looked strange.' }),

  // ── inference: theme and character ───────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-028', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_CYCLONE + '<p>Which detail from the 1975 story was new to Rajesh?</p>',
    options: ['That neighbours shared one pot of rice between them',
              'That a roof had lifted away during the storm',
              'That a swollen river had carried off a bridge',
              'That his grandmother had been frightened too'],
    answer: 'That neighbours shared one pot of rice between them',
    hint: 'The passage says directly which part he had not heard before.',
    explanation: 'He had heard parts of the story before, <b>but never the part about the rice</b>. That is the detail about people helping each other, which is what the story is really about.' }),

  makeMCQ({ id: 'g5eng-psg-029', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_CYCLONE + '<p>What does his grandmother mean by "being frightened is not the same as being alone"?</p>',
    options: ['Fear is easier to bear when people face it together',
              'Brave people never admit that they feel afraid',
              'It is safer to stay indoors during a bad storm',
              'Children are frightened more often than adults'],
    answer: 'Fear is easier to bear when people face it together',
    hint: 'She has just described neighbours sharing food. Connect the two.',
    explanation: 'She admits she was afraid, then separates fear from loneliness: <b>you can be frightened and still not be alone</b>. It answers the story of the shared rice she has just told.' }),

  makeMCQ({ id: 'g5eng-psg-030', chapterId: 'eng-passages', subsection: 'story', difficulty: 4,
    question: _G5PSG_CYCLONE + '<p>Rajesh calls the boat "spoilt", but his grandmother disagrees. What is she telling him?</p>',
    options: ['That what a thing has come through can add to its value',
              'That the stain will fade away once the sail has dried',
              'That the judges at the show will not notice the mark',
              'That he still has enough time to build a second boat'],
    answer: 'That what a thing has come through can add to its value',
    hint: 'She does not offer to fix the sail or to replace the boat.',
    explanation: 'She does not deny the mark. She reframes it: <i>"It came through a cyclone. Now it has a story."</i> The damage becomes <b>part of what makes the boat worth something</b>.' }),

  // ── evaluative judgement ─────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-psg-031', chapterId: 'eng-passages', subsection: 'story', difficulty: 3,
    question: _G5PSG_CYCLONE + '<p>Which word best describes the grandmother throughout the passage?</p>',
    options: ['Steady', 'Anxious', 'Impatient', 'Boastful'],
    answer: 'Steady',
    hint: 'Consider how she speaks and what she does at each point in the storm.',
    explanation: '<b>Steady</b> fits: she is patient but firm about the shutters, lights candles without fuss, tells a calm story, and is sweeping the veranda by morning. She admits fear, so she is not boastful, and she never rushes Rajesh.' })

);
