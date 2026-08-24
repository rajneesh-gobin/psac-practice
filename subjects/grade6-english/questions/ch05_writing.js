'use strict';
// Grade 6 English - Chapter: Essay & Formal Writing
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
    explanation:'"<b>In conclusion</b>" signals the final paragraph. Other concluding phrases: To summarise, In summary, To conclude, Therefore, Ultimately, To sum up. A conclusion should restate the thesis and leave the reader with a final thought - not introduce new information.' }),

  makeMCQ({ id:'g6eng-writ-008', chapterId:'g6eng-writing', difficulty:2,
    question:'A descriptive paragraph about a beach should primarily appeal to:',
    options:['logic and statistics','the five senses (sight, sound, smell, touch, taste)','dates and historical facts','technical specifications'],
    answer:'the five senses (sight, sound, smell, touch, taste)',
    hint:'Descriptive writing aims to make the reader FEEL as if they are there.',
    explanation:'Effective descriptive writing engages all <b>five senses</b>: sight (sparkling turquoise water), sound (waves crashing), smell (salt air and sunscreen), touch (warm sand between fingers), taste (salt on lips). Sensory language is the hallmark of excellent descriptive writing.' }),

  makeTF({ id:'g6eng-writ-009', chapterId:'g6eng-writing', difficulty:1,
    question:'In a formal letter, contractions such as "don\'t" and "can\'t" should be avoided.',
    answer:true,
    hint:'Formal writing uses full forms - "do not", "cannot".',
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
    hint:'The hook is the very first sentence - it must make the reader want to continue.',
    explanation:'A <b>hook</b> is the opening sentence designed to immediately engage the reader. Effective hooks include: a striking statistic ("Over 8 million tonnes of plastic enter our oceans each year."), a rhetorical question, a vivid description, or a bold statement. It draws the reader in before the thesis is stated.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-writ-011', chapterId:'g6eng-writing', difficulty:2,
    question:'What is the correct format for the OPENING of a formal letter when you know the recipient\'s name?',
    options:[
      '"Dear Sir/Madam" … "Yours faithfully"',
      '"Dear Mr/Ms [Name]" … "Yours sincerely"',
      '"Hello [Name]" … "Best wishes"',
      '"Dear Mr/Ms [Name]" … "Yours faithfully"'
    ],
    answer:'"Dear Mr/Ms [Name]" … "Yours sincerely"',
    hint:'Sincerely when you know the name. Faithfully when you write "Sir/Madam".',
    explanation:'MIE Grade 6 formal letter rules: If you <b>know</b> the recipient\'s name → "Dear Mr/Ms [Name]" → close with "<b>Yours sincerely</b>". If you do <b>not know</b> the name → "Dear Sir/Madam" → close with "<b>Yours faithfully</b>". Memory trick: <b>S</b>ir/Madam → <b>F</b>aithfully (both formal, no connection). <b>N</b>ame known → <b>S</b>incerely (you\'re personally connected).' }),

  makeMCQ({ id:'g6eng-writ-012', chapterId:'g6eng-writing', difficulty:1,
    question:'What are the THREE main parts of a well-structured essay?',
    options:[
      'Title, body, references',
      'Introduction, body paragraphs, conclusion',
      'Hook, argument, summary',
      'Topic sentence, evidence, closing sentence'
    ],
    answer:'Introduction, body paragraphs, conclusion',
    hint:'Think of an essay like a sandwich - what are the three layers?',
    explanation:'The MIE Grade 6 English textbook teaches the three-part essay structure: (1) <b>Introduction</b>: hook + background + thesis statement (your main argument). (2) <b>Body paragraphs</b>: each paragraph has one main idea (topic sentence) + evidence + explanation (PEE). (3) <b>Conclusion</b>: restate the thesis in different words + final thought/call to action. Never introduce new arguments in the conclusion.' }),

  makeMCQ({ id:'g6eng-writ-013', chapterId:'g6eng-writing', difficulty:2,
    question:'Punctuating DIRECT SPEECH - which sentence is correctly punctuated?',
    options:[
      '"Come here" said the teacher.',
      '"Come here," said the teacher.',
      '"Come here". Said the teacher.',
      '"Come here" Said the teacher.'
    ],
    answer:'"Come here," said the teacher.',
    hint:'The comma (or full stop/exclamation mark) goes INSIDE the closing quotation marks.',
    explanation:'"<b>Come here," said the teacher.</b>" - Rules for direct speech from MIE Grade 6: (1) Opening speech: capital letter after opening quote: <b>"Come here"</b>. (2) Comma/full stop INSIDE the closing quote: <b>"Come here,"</b>. (3) Reporting verb starts with lowercase: <b>said</b>. (4) Full stop at the very end of the sentence. Exception: if the speech is a question: "Are you ready?" asked the teacher.' }),

  makeTF({ id:'g6eng-writ-014', chapterId:'g6eng-writing', difficulty:1,
    question:'A narrative essay tells a story and is usually written in the first person (I).',
    answer:true,
    hint:'Think about what "narrative" means - it is a type of storytelling.',
    explanation:'<b>True.</b> A <b>narrative essay</b> tells a story (real or imaginary) and is typically written in the <b>first person (I, we)</b>. It follows a story structure: <b>setting → rising action → climax → falling action → resolution</b>. The MIE Grade 6 textbook distinguishes between narrative (story), descriptive (sensory details), expository (information) and argumentative (persuasive) writing types.' }),

  makeMCQ({ id:'g6eng-writ-015', chapterId:'g6eng-writing', difficulty:2,
    question:'Which sentence best opens a BODY PARAGRAPH in an argumentative essay?',
    options:[
      '"In this essay I will discuss why..."',
      '"In conclusion, it is clear that..."',
      '"One compelling reason why school uniforms should be compulsory is that they promote equality."',
      '"Some people think school uniforms are nice."'
    ],
    answer:'"One compelling reason why school uniforms should be compulsory is that they promote equality."',
    hint:'A body paragraph must start with a clear TOPIC SENTENCE that states one main argument.',
    explanation:'"<b>One compelling reason why school uniforms should be compulsory is that they promote equality.</b>" - This is an effective <b>topic sentence</b>: it (1) states one clear argument, (2) is specific, (3) links directly to the thesis. The MIE Grade 6 writing framework: Topic Sentence → Evidence/Example → Explanation → Linking sentence to the next paragraph.' }),

  makeMCQ({ id:'g6eng-writ-016', chapterId:'g6eng-writing', difficulty:2,
    question:'Which LINKING WORD correctly shows that the second idea contrasts with the first?',
    options:['Furthermore','Therefore','Nevertheless','In addition'],
    answer:'Nevertheless',
    hint:'"Nevertheless" means "in spite of that" - it introduces a contrasting or unexpected idea.',
    explanation:'"<b>Nevertheless</b>" shows contrast or concession: "The weather was terrible. <b>Nevertheless</b>, we enjoyed the trip." Linking words by function: <b>Adding</b>: Furthermore, In addition, Moreover, Also. <b>Contrast</b>: However, Nevertheless, On the other hand, Yet, Despite this. <b>Consequence</b>: Therefore, As a result, Consequently. <b>Conclusion</b>: In conclusion, To summarise.' }),

  makeMCQ({ id:'g6eng-writ-017', chapterId:'g6eng-writing', difficulty:2,
    question:'In a formal letter of COMPLAINT, what should the first paragraph do?',
    options:[
      'Apologise immediately for the inconvenience',
      'Clearly state the reason for writing and identify the problem',
      'List all your demands immediately',
      'Thank the reader for reading the letter'
    ],
    answer:'Clearly state the reason for writing and identify the problem',
    hint:'The first paragraph of any formal letter must state its PURPOSE clearly.',
    explanation:'MIE Grade 6 formal letter structure: (1) <b>First paragraph</b>: state the purpose ("I am writing to complain about...") and identify the specific problem. (2) <b>Middle paragraphs</b>: give details - what happened, when, where, how it affected you. (3) <b>Final paragraph</b>: state what action you expect. (4) <b>Close</b>: Yours faithfully/sincerely + full name.' }),

  makeMCQ({ id:'g6eng-writ-018', chapterId:'g6eng-writing', difficulty:3,
    question:'Which is an example of EFFECTIVE DESCRIPTIVE WRITING?',
    options:[
      '"The beach was nice and the water was blue."',
      '"The beach was good. Many people were there."',
      '"The turquoise lagoon shimmered like glass, while the warm salt breeze carried the scent of frangipani."',
      '"The beach had sand and waves."'
    ],
    answer:'"The turquoise lagoon shimmered like glass, while the warm salt breeze carried the scent of frangipani."',
    hint:'Effective descriptive writing appeals to the senses and uses vivid, specific language.',
    explanation:'"The turquoise lagoon <b>shimmered like glass</b>, while the warm salt breeze <b>carried the scent of frangipani</b>." - This uses: (1) <b>vivid adjectives</b>: turquoise, warm; (2) <b>a simile</b>: like glass; (3) <b>sensory language</b>: sight (shimmered), touch (warm), smell (scent of frangipani). The MIE Grade 6 textbook teaches descriptive writing using Mauritius\'s natural environment as inspiration.' }),

  makeMCQ({ id:'g6eng-writ-019', chapterId:'g6eng-writing', difficulty:4,
    question:'In an ARGUMENTATIVE ESSAY, a student writes: "Some argue that social media is harmful to young people. However, when used responsibly, it can build communication skills and connect communities." What technique is being used?',
    options:[
      'A simile comparing social media to something harmful',
      'A counterargument followed by a rebuttal',
      'A definition of social media',
      'A statistic supporting the argument against social media'
    ],
    answer:'A counterargument followed by a rebuttal',
    hint:'The writer first acknowledges the opposing view, then argues against it.',
    explanation:'This is a <b>counterargument + rebuttal</b> technique: (1) <b>Counterargument</b>: "Some argue that social media is harmful" - acknowledging the opposing view. (2) <b>Rebuttal</b>: "However, when used responsibly, it can build communication skills" - refuting the opposing view. The MIE Grade 6 textbook teaches this technique as essential for strong argumentative essays because it demonstrates balanced thinking.' })

);
