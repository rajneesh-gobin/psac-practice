'use strict';
// Grade 6 English — Chapter: Essay & Formal Writing
// IDs format: g6eng-writ-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-writ-001', chapterId:'g6eng-writing', difficulty:2,
    question:'What is the correct layout for a FORMAL LETTER salutation and closing?',
    options:[
      '"Dear John" … "Yours sincerely"',
      '"Dear Sir/Madam" … "Yours faithfully"',
      '"Hello" … "Bye"',
      '"Dear Sir/Madam" … "Yours sincerely"'
    ],
    answer:'"Dear Sir/Madam" … "Yours faithfully"',
    hint:'"Faithfully" when you don\'t know the name. "Sincerely" when you do.',
    explanation:'Rule: <b>Dear Sir/Madam</b> (unknown recipient) → <b>Yours faithfully</b>. <b>Dear Mr/Ms [Name]</b> (known recipient) → <b>Yours sincerely</b>. Never mix these. Formal letters also include: sender\'s address (top right), date, recipient\'s address (left), subject line.' }),

  makeMCQ({ id:'g6eng-writ-002', chapterId:'g6eng-writing', difficulty:2,
    question:'Which transition word signals CONTRAST?',
    options:['Furthermore','In addition','However','Therefore'],
    answer:'However',
    hint:'This word introduces an idea that contradicts or limits the previous one.',
    explanation:'"<b>However</b>" signals contrast: "The plan seemed good. <b>However</b>, it had one major flaw." Other contrast transitions: Nevertheless, On the other hand, In contrast, Yet, Despite this. "Furthermore/In addition" = adding ideas. "Therefore" = consequence.' }),

  makeMCQ({ id:'g6eng-writ-003', chapterId:'g6eng-writing', difficulty:2,
    question:'In a PEE paragraph, what does the second E stand for?',
    options:['Example','Evidence','Explanation','Effect'],
    answer:'Explanation',
    hint:'PEE = Point, Evidence, ___',
    explanation:'PEE = <b>Point</b> (state your main idea), <b>Evidence</b> (quote or specific example from the text), <b>Explanation</b> (explain HOW or WHY the evidence supports your point and what effect it has on the reader).' }),

  makeMCQ({ id:'g6eng-writ-004', chapterId:'g6eng-writing', difficulty:2,
    question:'Which is the BEST thesis statement for an essay arguing that school uniforms should be compulsory?',
    options:[
      'School uniforms are a type of clothing.',
      'Some people like uniforms and some people don\'t.',
      'School uniforms should be compulsory because they promote equality, reduce bullying and create a focused learning environment.',
      'I am going to talk about school uniforms in my essay.'
    ],
    answer:'School uniforms should be compulsory because they promote equality, reduce bullying and create a focused learning environment.',
    hint:'A thesis statement takes a clear position and outlines the main supporting reasons.',
    explanation:'A strong <b>thesis statement</b>: (1) states a clear position, (2) gives 2–3 reasons. "School uniforms should be compulsory <b>because</b> they promote equality, reduce bullying and create a focused learning environment." The other options are vague or merely state a topic.' }),

  makeMCQ({ id:'g6eng-writ-005', chapterId:'g6eng-writing', difficulty:2,
    question:'Which sentence is written in a FORMAL register?',
    options:[
      'Hey, I wanna know about the job.',
      'I am writing to enquire about the vacancy advertised.',
      'Can you tell me if the job is still up for grabs?',
      'The job sounds pretty cool, can I apply?'
    ],
    answer:'I am writing to enquire about the vacancy advertised.',
    hint:'Formal writing avoids contractions, slang and informal expressions.',
    explanation:'"<b>I am writing to enquire about the vacancy advertised.</b>" uses formal vocabulary (enquire, vacancy, advertised), avoids contractions (I am, not I\'m) and slang. Formal register is required in letters of application, complaint letters and reports.' }),

  makeTF({ id:'g6eng-writ-006', chapterId:'g6eng-writing', difficulty:2,
    question:'In an argumentative essay, it is good practice to address and refute the opposing viewpoint.',
    answer:true,
    hint:'This technique is called a "counterargument + rebuttal".',
    explanation:'<b>True.</b> Acknowledging and then refuting the opposing view (<b>counterargument + rebuttal</b>) makes an argument stronger, not weaker. It shows the writer has considered all angles. Example: "Some argue that uniforms restrict self-expression. However, they ensure no student is judged by their clothing."' }),

  makeMCQ({ id:'g6eng-writ-007', chapterId:'g6eng-writing', difficulty:2,
    question:'Which transition word signals a CONCLUSION or summary?',
    options:['Furthermore','In contrast','In conclusion','However'],
    answer:'In conclusion',
    hint:'This phrase signals you are wrapping up all the ideas in your essay.',
    explanation:'"<b>In conclusion</b>" signals the final paragraph. Other concluding phrases: To summarise, In summary, To conclude, Therefore, Ultimately, To sum up. A conclusion should restate the thesis and leave the reader with a final thought — not introduce new information.' }),

  makeMCQ({ id:'g6eng-writ-008', chapterId:'g6eng-writing', difficulty:2,
    question:'A descriptive paragraph about a beach should primarily appeal to:',
    options:['logic and statistics','the five senses (sight, sound, smell, touch, taste)','dates and historical facts','technical specifications'],
    answer:'the five senses (sight, sound, smell, touch, taste)',
    hint:'Descriptive writing aims to make the reader FEEL as if they are there.',
    explanation:'Effective descriptive writing engages all <b>five senses</b>: sight (sparkling turquoise water), sound (waves crashing), smell (salt air and sunscreen), touch (warm sand between fingers), taste (salt on lips). Sensory language is the hallmark of excellent descriptive writing.' }),

  makeTF({ id:'g6eng-writ-009', chapterId:'g6eng-writing', difficulty:1,
    question:'In a formal letter, contractions such as "don\'t" and "can\'t" should be avoided.',
    answer:true,
    hint:'Formal writing uses full forms — "do not", "cannot".',
    explanation:'<b>True.</b> Formal letters avoid contractions. Write "I do not agree" not "I don\'t agree". "It is not possible" not "It\'s not possible". Contractions are acceptable in informal writing (emails to friends, personal diaries) but not in formal contexts.' }),

  makeMCQ({ id:'g6eng-writ-010', chapterId:'g6eng-writing', difficulty:2,
    question:'What is the purpose of a HOOK in an essay introduction?',
    options:[
      'To summarise all the main points of the essay',
      'To grab the reader\'s attention at the very start',
      'To list all the arguments against your thesis',
      'To provide a definition of all key terms'
    ],
    answer:"To grab the reader's attention at the very start",
    hint:'The hook is the very first sentence — it must make the reader want to continue.',
    explanation:'A <b>hook</b> is the opening sentence designed to immediately engage the reader. Effective hooks include: a striking statistic ("Over 8 million tonnes of plastic enter our oceans each year."), a rhetorical question, a vivid description, or a bold statement. It draws the reader in before the thesis is stated.' })

);
