'use strict';
// Grade 6 English — Chapter: Reading & Critical Thinking
// IDs format: g6eng-comp-NNN

const _PASSAGE_G6 = `<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65">
<b style="color:#0e7490">Read the passage carefully, then answer the question.</b><br><br>
<b>Plastic — A Modern Menace</b><br><br>
Every year, over eight million tonnes of plastic waste enter the world's oceans. Marine creatures such as sea turtles, dolphins and seabirds often mistake plastic bags for food. When they swallow plastic, it blocks their digestive systems and can be fatal. Tiny fragments called microplastics have been found in fish that humans eat, raising serious concerns about the food chain.<br><br>
Plastic is inexpensive to produce and incredibly versatile, which explains why it is used in almost every industry. However, most plastic is designed for single use — a straw used for five minutes may take five hundred years to decompose. Unlike organic materials, plastic does not biodegrade; it merely breaks into smaller and smaller fragments.<br><br>
Governments worldwide are beginning to act. Several countries have banned single-use plastics such as straws, bags and cutlery. Mauritius introduced a ban on single-use plastic bags in 2020. Environmental groups urge individuals to adopt the three Rs: Reduce, Reuse and Recycle. Yet campaigners warn that individual action alone is not enough — systemic change from manufacturers and policymakers is essential.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-comp-001', chapterId:'g6eng-comprehension', difficulty:1,
    question:`${_PASSAGE_G6}According to the passage, how much plastic waste enters the oceans every year?`,
    options:['Eight thousand tonnes','Eight hundred thousand tonnes','Over eight million tonnes','Eight billion tonnes'],
    answer:'Over eight million tonnes',
    hint:'The exact figure is in the first sentence.',
    explanation:'"<b>Over eight million tonnes</b>" — the passage states: "Every year, over <b>eight million tonnes</b> of plastic waste enter the world\'s oceans."' }),

  makeMCQ({ id:'g6eng-comp-002', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}What are "microplastics" and why are they concerning?`,
    options:[
      'Large plastic bottles that clog ocean drains',
      'Tiny plastic fragments found in fish that humans eat, raising food chain concerns',
      'Plastic bags used by microbreweries',
      'A type of biodegradable plastic'
    ],
    answer:'Tiny plastic fragments found in fish that humans eat, raising food chain concerns',
    hint:'The word "micro" means very small. Read the last sentence of paragraph one.',
    explanation:'The passage explains: "Tiny fragments called <b>microplastics</b> have been found in fish that humans eat, raising serious concerns about the food chain." They enter our food supply — a human health concern.' }),

  makeMCQ({ id:'g6eng-comp-003', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}What does the word "versatile" mean as used in paragraph 2?`,
    options:['expensive','dangerous','able to be used in many different ways','biodegradable'],
    answer:'able to be used in many different ways',
    hint:'The passage says plastic is used in "almost every industry" — what quality allows this?',
    explanation:'"<b>Versatile</b>" means able to be used for many different purposes. The context — "used in almost every industry" — confirms this meaning. A versatile material adapts to many needs.' }),

  makeMCQ({ id:'g6eng-comp-004', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}The author describes plastic as "A Modern Menace". What does "menace" suggest about the author's attitude?`,
    options:[
      'The author is neutral and presents only facts.',
      'The author views plastic as a serious threat or danger.',
      'The author supports the plastic industry.',
      'The author believes plastic is no longer a problem.'
    ],
    answer:'The author views plastic as a serious threat or danger.',
    hint:'"Menace" — think about what word the title uses to describe plastic.',
    explanation:'A "<b>menace</b>" is a serious threat or danger. By calling plastic a "modern menace", the author has a <b>concerned/critical tone</b> — they view plastic as harmful and dangerous. The title signals the author\'s purpose: to raise alarm and persuade readers to act.' }),

  makeMCQ({ id:'g6eng-comp-005', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}Which literary device is used in "a straw used for five minutes may take five hundred years to decompose"?`,
    options:['alliteration','simile','contrast/juxtaposition','personification'],
    answer:'contrast/juxtaposition',
    hint:'The author is placing two very different numbers — five minutes and five hundred years — side by side for effect.',
    explanation:'The author uses <b>contrast / juxtaposition</b> — placing "five minutes" (how briefly we use a straw) against "five hundred years" (how long it lasts). This dramatic comparison highlights the absurdity of single-use plastics and makes the environmental impact feel immediate and shocking.' }),

  makeMCQ({ id:'g6eng-comp-006', chapterId:'g6eng-comprehension', difficulty:1,
    question:`${_PASSAGE_G6}What action did Mauritius take in 2020?`,
    options:[
      'Mauritius banned all plastic production.',
      'Mauritius introduced a ban on single-use plastic bags.',
      'Mauritius started recycling all ocean plastic.',
      'Mauritius built a new plastic recycling plant.'
    ],
    answer:'Mauritius introduced a ban on single-use plastic bags.',
    hint:'Look for "Mauritius" in the third paragraph.',
    explanation:'"<b>Mauritius introduced a ban on single-use plastic bags in 2020.</b>" This is stated directly in paragraph 3, as part of the wider global response to the plastic crisis.' }),

  makeMCQ({ id:'g6eng-comp-007', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}What is the author's MAIN PURPOSE in writing this passage?`,
    options:[
      'To entertain readers with a story about ocean animals',
      'To inform and persuade readers about the dangers of plastic and the need for action',
      'To advertise biodegradable alternatives to plastic',
      'To explain how plastic is manufactured'
    ],
    answer:'To inform and persuade readers about the dangers of plastic and the need for action',
    hint:'Consider the overall content, tone and conclusion. Does the author simply report, or do they urge action?',
    explanation:'The author both <b>informs</b> (facts about ocean plastic, microplastics, decomposition rates) and <b>persuades</b> (governments and individuals must act). The final call to action — "systemic change... is essential" — confirms the persuasive purpose.' }),

  makeMCQ({ id:'g6eng-comp-008', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}Using PEE structure: what evidence from the passage supports the claim that plastic is dangerous to marine life?`,
    options:[
      '"plastic is inexpensive to produce"',
      '"sea turtles, dolphins and seabirds often mistake plastic bags for food... it blocks their digestive systems and can be fatal"',
      '"Several countries have banned single-use plastics"',
      '"most plastic is designed for single use"'
    ],
    answer:'"sea turtles, dolphins and seabirds often mistake plastic bags for food... it blocks their digestive systems and can be fatal"',
    hint:'Find a quotation (Evidence) from the passage that directly shows danger to marine animals.',
    explanation:'The <b>Evidence</b> (E in PEE): "sea turtles, dolphins and seabirds often mistake plastic bags for food... it blocks their digestive systems and can be fatal." This directly supports the point that plastic is dangerous to marine life by showing a concrete mechanism of harm.' }),

  makeTF({ id:'g6eng-comp-009', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}True or False: The passage argues that individual action (such as recycling) is sufficient to solve the plastic crisis.`,
    answer:false,
    hint:'Read the very last sentence of the passage carefully.',
    explanation:'<b>False.</b> The passage explicitly states: "campaigners warn that individual action alone is <b>not enough</b> — <b>systemic change from manufacturers and policymakers is essential</b>." Individual action matters, but it is not sufficient on its own.' }),

  makeMCQ({ id:'g6eng-comp-010', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_G6}What does "biodegrade" mean, as implied by the passage?`,
    options:[
      'To become a bio-hazard',
      'To break down naturally into harmless substances',
      'To become plastic again',
      'To be recycled in a factory'
    ],
    answer:'To break down naturally into harmless substances',
    hint:'The passage says plastic does NOT biodegrade — it "merely breaks into smaller and smaller fragments." What would the opposite mean?',
    explanation:'"<b>Biodegrade</b>" means to break down naturally through the action of bacteria and other organisms into harmless substances. The passage contrasts organic materials (which biodegrade) with plastic (which does not — it only fragments into microplastics).' })

);
