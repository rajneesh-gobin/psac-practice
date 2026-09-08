'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  DRAFT - Grade 5 English, eng-comprehension at full exam length.
//
//  WIRED IN. Registered in LOCAL_FILES (engine/question_loader.js) for file://
//    dev; production auto-discovers this directory. _CACHE_VERSION was bumped
//    when this landed - without that, a child keeps the old question set for up
//    to seven days and nothing in the UI explains why.
//
//  ⚠ THIS CHAPTER'S PROBLEM IS NOT THE ONE eng-passages HAD.
//    Measured on the current bundle: 50 questions spread across 23 different
//    texts, of which NINETEEN carry a single question each. Median text length
//    is 30 words; the longest is 177. Not one text reaches exam length.
//      · eng-passages had the right shape at a third of the scale - five texts,
//        four or five questions each.
//      · eng-comprehension has the wrong shape as well: a 30-word text with one
//        question attached is a sentence with a question after it, not
//        comprehension practice.
//    The exam hangs about ten items off ONE passage, spanning retrieval,
//    vocabulary, inference, main idea and the writer's viewpoint - which are
//    exactly this chapter's five subsections. So the subsections are right and
//    worth keeping; the texts are what has to change.
//
//  ⚠ SUBSECTION IDS ARE REUSED, NOT INVENTED. All five below already exist in
//    this chapter. A declared subsection id with no questions behind it opens
//    an empty topic, and a tagged id that is not declared hides its questions -
//    the two lists have to match exactly per chapter.
//
//  REGISTER: 413-447 words, 12-16% of words 7+ letters, sentences averaging
//  10.9-11.8 - measured from the MES papers 2023-2025. The reading demand sits
//  in the questions, not in hard words.
// ══════════════════════════════════════════════════════════════════════════

function _g5compBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5COMP_TABLA = _g5compBox(`
<b style="color:#9a3412">Read the passage, then answer the question.</b><br><br>
<b>The Tabla Lesson</b><br><br>
Vikram had decided to stop.<br><br>
He had been going to Mr Ramdin's house every Saturday for two years, and for two
years he had played the same twelve beats. Last week his cousin had laughed at
him about it in front of everybody.<br><br>
His mother said he should tell Mr Ramdin himself, which Vikram thought was
unfair, because it is much easier to stop something than to explain it.<br><br>
Mr Ramdin's front room smelled of dust and old paper. There were two tablas on a
mat, and nothing else in the room except a photograph of a man Vikram had never
asked about.<br><br>
"Play," said Mr Ramdin.<br><br>
Vikram played the twelve beats, and he played them well. He had played them so
many times that his hands did not need him any more.<br><br>
Mr Ramdin listened with his eyes closed. When it was finished he said nothing for
a while.<br><br>
"Again," he said. "But slower."<br><br>
Vikram wanted to explain about his cousin, and about the other boys playing
football on Saturdays. Instead he played it again, slowly.<br><br>
It was harder slowly, which surprised him. Going slowly left a space after every
beat, and in the space he could hear whether the beat had been clean, and several
of them were not.<br><br>
"Again."<br><br>
The third time, something happened that Vikram could not have described. The
twelve beats stopped being twelve separate things. They became one thing, with a
shape.<br><br>
He stopped and looked up.<br><br>
Mr Ramdin was smiling at the wall. He did not look at Vikram at all.<br><br>
"Two years," the old man said. "Most boys leave at eighteen months."<br><br>
Vikram did not answer. He was still listening to something that had happened a
moment earlier.<br><br>
"That photograph is my teacher. I studied with him for nine years before he
allowed me to play in front of anybody." Mr Ramdin stood up slowly and put the
kettle on, which meant the lesson was finished. "You may tell your mother
whatever you have decided."<br><br>
Vikram walked home the long way, past the football ground, where the game had
ended already and the goalposts stood empty in the late afternoon sunshine.<br><br>
He thought about the space after every beat.<br><br>
That evening his mother asked whether he had spoken to Mr Ramdin.<br><br>
"Yes," Vikram said.<br><br>
"And?"<br><br>
Vikram thought about how to explain it. There was no good way, and in the end he
said the true thing, which was: "He knew before I did."
`, '#c2410c');

STATIC_QUESTIONS.push(

  // ── retrieval ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-comp-062', chapterId: 'eng-comprehension', subsection: 'retrieval', difficulty: 1,
    question: _G5COMP_TABLA + '<p>How long had Vikram been going to Mr Ramdin\'s house?</p>',
    options: ['Two years', 'Nine years', 'Eighteen months', 'Every Saturday'],
    answer: 'Two years',
    hint: 'The same length of time is given twice, and Mr Ramdin repeats it later.',
    explanation: '<b>Two years</b>. Nine years is how long Mr Ramdin studied with his own teacher, and eighteen months is when most boys give up.' }),

  makeMCQ({ id: 'g5eng-comp-063', chapterId: 'eng-comprehension', subsection: 'retrieval', difficulty: 1,
    question: _G5COMP_TABLA + '<p>What did Mr Ramdin ask Vikram to do after he had played the first time?</p>',
    options: ['Play the beats again, more slowly', 'Explain why he wanted to give up',
              'Learn a new set of twelve beats', 'Listen to a recording of his teacher'],
    answer: 'Play the beats again, more slowly',
    hint: 'His instruction is only three words long.',
    explanation: 'He said, <i>"Again. But slower."</i> He never asks Vikram to explain anything - that is the point of the lesson.' }),

  // ── vocabulary in context ────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-comp-064', chapterId: 'eng-comprehension', subsection: 'vocabulary', difficulty: 2,
    question: _G5COMP_TABLA + '<p>"His hands did not need him any more." This means Vikram</p>',
    options: ['could play the beats without thinking', 'had grown tired of playing the tabla',
              'was no longer able to play them well', 'had hurt his hands during practice'],
    answer: 'could play the beats without thinking',
    hint: 'The sentence before it says he had played them very many times.',
    explanation: 'After enough repetition the hands act on their own, so he <b>played without thinking</b>. The phrase also hints at the problem: he had stopped paying attention.' }),

  makeMCQ({ id: 'g5eng-comp-065', chapterId: 'eng-comprehension', subsection: 'vocabulary', difficulty: 2,
    question: _G5COMP_TABLA + '<p>Mr Ramdin put the kettle on, "which meant the lesson was finished". This tells us that</p>',
    options: ['the two of them understood each other\'s habits',
              'Mr Ramdin was thirsty after the long lesson',
              'the lesson had ended earlier than it should',
              'Vikram was expected to leave the house at once'],
    answer: 'the two of them understood each other\'s habits',
    hint: 'Nobody announces the end. How does Vikram know?',
    explanation: 'No one says the lesson is over; the kettle says it. After two years <b>they share a routine</b> that needs no words - which is itself a reason the lessons have mattered.' }),

  // ── inference ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-comp-066', chapterId: 'eng-comprehension', subsection: 'inference', difficulty: 3,
    question: _G5COMP_TABLA + '<p>Why did playing slowly turn out to be harder?</p>',
    options: ['The gaps let him hear his own mistakes', 'His hands were used to a faster speed',
              'He had never practised the beats slowly', 'The room was too quiet to concentrate'],
    answer: 'The gaps let him hear his own mistakes',
    hint: 'The passage says what appeared in the space after each beat.',
    explanation: 'Slowing down <i>left a space after every beat</i>, and in that space he could hear <b>whether the beat was clean - and several were not</b>. Speed had been hiding the faults.' }),

  makeMCQ({ id: 'g5eng-comp-067', chapterId: 'eng-comprehension', subsection: 'inference', difficulty: 3,
    question: _G5COMP_TABLA + '<p>Why does Mr Ramdin mention that he studied for nine years before being allowed to perform?</p>',
    options: ['To show Vikram that two years is only the beginning',
              'To boast about how skilful a player he once was',
              'To explain why the photograph hangs in his room',
              'To warn Vikram that he is learning far too slowly'],
    answer: 'To show Vikram that two years is only the beginning',
    hint: 'He says it straight after telling Vikram that most boys leave at eighteen months.',
    explanation: 'He sets two years beside nine, without instructing Vikram to stay. It says <b>this takes a long time and you have barely started</b> - and he leaves the decision alone.' }),

  makeMCQ({ id: 'g5eng-comp-068', chapterId: 'eng-comprehension', subsection: 'inference', difficulty: 4,
    question: _G5COMP_TABLA + '<p>What does Vikram mean at the end when he says, "He knew before I did"?</p>',
    options: ['Mr Ramdin saw that Vikram would stay before Vikram did',
              'Mr Ramdin had guessed that Vikram intended to give up',
              'Vikram\'s mother had already spoken to Mr Ramdin about it',
              'Mr Ramdin had known that his cousin was laughing at him'],
    answer: 'Mr Ramdin saw that Vikram would stay before Vikram did',
    hint: 'What had Mr Ramdin been smiling at, and when?',
    explanation: 'Mr Ramdin smiled at the wall the moment the beats <i>became one thing, with a shape</i>. He saw what that would mean to Vikram, and said <i>"you may tell your mother whatever you have decided"</i> - <b>already certain of the answer</b>.' }),

  // ── main idea ────────────────────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-comp-069', chapterId: 'eng-comprehension', subsection: 'main_idea', difficulty: 3,
    question: _G5COMP_TABLA + '<p>What is the passage mainly about?</p>',
    options: ['A boy discovering why the thing he wanted to quit is worth doing',
              'A strict teacher forcing a boy to continue his music lessons',
              'A boy choosing between playing music and playing football',
              'An old man remembering the teacher he studied under'],
    answer: 'A boy discovering why the thing he wanted to quit is worth doing',
    hint: 'Ask what has changed by the end, and inside whom.',
    explanation: 'Vikram arrives meaning to stop and leaves meaning to continue, and nothing outside him changed. Mr Ramdin <b>never forces him</b> - the football and the photograph are details, not the subject.' }),

  // ── the writer's viewpoint ───────────────────────────────────────────────
  makeMCQ({ id: 'g5eng-comp-070', chapterId: 'eng-comprehension', subsection: 'authors_view', difficulty: 3,
    question: _G5COMP_TABLA + '<p>How does the writer want us to see Mr Ramdin?</p>',
    options: ['As patient, and content to let Vikram choose', 'As stern and rather difficult to please',
              'As disappointed that Vikram plays so poorly', 'As anxious about losing another pupil'],
    answer: 'As patient, and content to let Vikram choose',
    hint: 'Count how many times he tells Vikram what to decide.',
    explanation: 'He gives one-word instructions, listens with his eyes closed, and hands the decision back: <i>"whatever you have decided"</i>. He is <b>patient rather than stern</b>, and never pleads.' }),

  makeMCQ({ id: 'g5eng-comp-071', chapterId: 'eng-comprehension', subsection: 'authors_view', difficulty: 4,
    question: _G5COMP_TABLA + '<p>The writer describes the empty goalposts as Vikram walks home. Why is this detail included?</p>',
    options: ['The football he was missing had turned out to matter less',
              'It shows how late in the evening the lesson had ended',
              'It suggests Vikram was sorry to have missed the game',
              'It explains why the other boys had stopped waiting for him'],
    answer: 'The football he was missing had turned out to matter less',
    hint: 'Football was one of his reasons for stopping. What is left of it now?',
    explanation: 'Football was an argument for quitting. He walks past it <i>already ended</i>, with <i>empty</i> goalposts, and thinks instead about the space after every beat - the writer <b>quietly retires the excuse</b> without ever saying so.' })

);
