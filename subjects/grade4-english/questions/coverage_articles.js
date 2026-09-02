'use strict';
// Grade 4 English coverage batch: articles. Twenty distinct, contextual items.
(function () {
  const words = [
    ['apple','an'],['umbrella','an'],['elephant','an'],['hour','an'],['orange','an'],
    ['book','a'],['pencil','a'],['unicorn','a'],['teacher','a'],['mountain','a']
  ];
  const places = ['on the table','in the bag','at the zoo','near the gate','after school','in the garden','at the market','by the window','during the trip','before lunch'];
  const qs = [];
  words.forEach(([word, article], i) => {
    qs.push({ question:`Choose the correct article: “I can see ___ ${word} ${places[i]}.”`, answer:article,
      hint:`Listen to the first sound in “${word}”.`, explanation:`We say <b>${article} ${word}</b>. Use <b>an</b> before a vowel sound and <b>a</b> before a consonant sound.` });
    qs.push({ question:`Which phrase is correct before the word “${word}”?`, answer:`${article} ${word}`,
      options:[`${article} ${word}`, article === 'a' ? `an ${word}` : `a ${word}`, `the ${word} always`, `some ${word}`],
      hint:'Say both articles aloud before the word.', explanation:`The correct phrase is <b>${article} ${word}</b>. The choice depends on the sound at the beginning of the word, not only the first letter.` });
  });
  STATIC_QUESTIONS.push(...qs.map((q, i) => makeMCQ({
    id:`g4eng-cover-art-${String(i + 1).padStart(2,'0')}`, chapterId:'g4eng-nouns', subsection:'articles', difficulty:1 + (i % 3),
    question:q.question, options:q.options || [q.answer, q.answer === 'a' ? 'an' : 'a', 'the', 'some'], answer:q.answer, hint:q.hint, explanation:q.explanation
  })));
})();
