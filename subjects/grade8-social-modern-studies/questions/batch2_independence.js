'use strict';

(function () {

const CH = 'g8sms-independence';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8sms-independence-016', chapterId: CH, difficulty: 2, subsection: 'mauritius_independence',
    question: 'Mauritius became independent in 1968 and became a republic in 1992. How many years passed between the two events?',
    answer: 24,
    hint: 'Subtract the earlier year from the later one.',
    explanation: '1992 &minus; 1968 = 24 years, during which the British monarch was still Head of State, represented by a Governor-General. Answering 1992 or 1968 gives a date rather than a length of time.'
  }),

  makeMCQ({
    id: 'g8sms-independence-017', chapterId: CH, difficulty: 2, subsection: 'mauritius_independence',
    question: 'Who became the first Prime Minister of independent Mauritius in 1968?',
    options: ['Seewoosagur Ramgoolam', 'Sookdeo Bissoondoyal', 'Gaëtan Duval', 'Guy Rozemont'],
    answer: 'Seewoosagur Ramgoolam',
    hint: 'The national airport at Plaisance carries his name.',
    explanation: 'Sir Seewoosagur Ramgoolam led the Labour Party to independence and became the first Prime Minister. Gaëtan Duval led the PMSD, which had campaigned against independence; Sookdeo Bissoondoyal led the IFB; and Guy Rozemont, an earlier Labour leader, had died in 1956.'
  }),

  makeText({
    id: 'g8sms-independence-018', chapterId: CH, difficulty: 2, subsection: 'mauritius_independence',
    question: 'Name the document adopted in 1968 that sets out the rights of Mauritian citizens and the powers of the government, and that no ordinary law may contradict.',
    answer: 'the Constitution',
    alsoAccept: ['constitution', 'constitution of mauritius', 'the constitution of mauritius', 'mauritian constitution'],
    hint: 'It is the supreme law, and the Supreme Court measures every other law against it.',
    explanation: 'The Constitution of 1968 is the supreme law of Mauritius: it protects fundamental rights and divides power between Parliament, the government and the courts. The Lancaster House agreements were the negotiations that led to it, and an Act of Parliament is an ordinary law that the Constitution outranks.'
  }),

  makeMCQ({
    id: 'g8sms-independence-019', chapterId: CH, difficulty: 2, subsection: 'empires_colonies',
    question: 'Three European powers ruled Mauritius one after another. Which of them ruled it last?',
    options: ['Britain', 'France', 'Portugal', 'The Netherlands'],
    answer: 'Britain',
    hint: 'Ask which country Mauritius became independent FROM.',
    explanation: 'The Dutch came first, the French took over in 1715 and the British captured the island in 1810 and held it until 1968. Portuguese sailors visited early on but never settled and never governed the island.'
  }),

  makeMCQ({
    id: 'g8sms-independence-020', chapterId: CH, difficulty: 3, subsection: 'decolonisation',
    question: 'After 1945 Britain gave up colony after colony within about twenty-five years. What best explains the change?',
    options: ['It was weakened by war', 'It had won the war easily', 'Its colonies were empty', 'It had no navy left'],
    answer: 'It was weakened by war',
    hint: 'Consider the cost of six years of world war to the country doing the governing.',
    explanation: 'Britain came out of the Second World War deeply in debt and could no longer afford to govern and defend a worldwide empire, while independence movements grew stronger and the new United Nations backed self-determination. The war was hugely costly rather than easy, the colonies were densely populated, and Britain still had a navy — just not the money to use it everywhere.'
  })

);

})();
