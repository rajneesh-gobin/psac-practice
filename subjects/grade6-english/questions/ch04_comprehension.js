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

const _PASSAGE_DODO = `<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65">
<b style="color:#0e7490">Read the passage carefully, then answer the questions.</b><br><br>
<b>The Dodo — Mauritius's Lost Bird</b><br><br>
The dodo was a large, flightless bird that lived only on the island of Mauritius. Standing nearly a metre tall and weighing up to twenty-three kilograms, it had short, stubby wings that were completely useless for flight. Its rounded body and peculiar beak gave it an appearance unlike any other bird on Earth. Scientists believe the dodo evolved without the ability to fly because Mauritius had no land predators — there was simply no need to escape from danger by air.<br><br>
When Dutch sailors arrived in Mauritius in the late 1600s, the dodo's fate was sealed. The birds were easy to catch because they had no fear of humans — they had never learned to run from predators. Sailors hunted them for food, but the greater threat came from the animals the settlers brought with them: rats, pigs and monkeys that raided dodo nests and ate the eggs. Within less than eighty years of human arrival, the dodo was extinct.<br><br>
Today, the dodo has become a powerful symbol. Scientists use the phrase "dead as a dodo" to describe anything completely and irreversibly gone. Yet the dodo's story is also a warning: the same combination of hunting, habitat destruction and introduced species continues to drive other animals to extinction today. In Mauritius, conservation efforts now protect surviving endemic species such as the Pink Pigeon and the Echo Parakeet, determined that history shall not repeat itself.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-comp-011', chapterId:'g6eng-comprehension', difficulty:1,
    question:`${_PASSAGE_DODO}According to the passage, approximately how tall was the dodo?`,
    options:['About half a metre','Nearly a metre tall','Over two metres','About thirty centimetres'],
    answer:'Nearly a metre tall',
    hint:'Look in the first paragraph for the dodo\'s physical description.',
    explanation:'"<b>Nearly a metre tall</b>" — the passage states: "Standing <b>nearly a metre tall</b> and weighing up to twenty-three kilograms." This is a direct retrieval question — the answer is stated explicitly in the text.' }),

  makeMCQ({ id:'g6eng-comp-012', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_DODO}Why did the dodo evolve without the ability to fly, according to the passage?`,
    options:[
      'Because its wings were injured by sailors',
      'Because it was too heavy to take off',
      'Because Mauritius had no land predators, so there was no need to escape by air',
      'Because it preferred swimming to flying'
    ],
    answer:'Because Mauritius had no land predators, so there was no need to escape by air',
    hint:'The passage gives a clear scientific explanation in paragraph one.',
    explanation:'The passage explains: "Scientists believe the dodo evolved without the ability to fly because Mauritius had <b>no land predators</b> — there was simply no need to escape from danger by air." This is an example of <b>evolutionary adaptation</b>: species develop (or lose) features based on what helps them survive in their environment.' }),

  makeMCQ({ id:'g6eng-comp-013', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_DODO}What does the word "peculiar" mean as used in paragraph one?`,
    options:['beautiful','ordinary','strange and unusual','broken'],
    answer:'strange and unusual',
    hint:'The context suggests the dodo looked unlike any other bird — what quality does "peculiar" describe?',
    explanation:'"<b>Peculiar</b>" means strange, unusual or distinctive in an odd way. The context — "gave it an appearance unlike any other bird on Earth" — confirms the unusual quality. The MIE Grade 6 comprehension technique: use surrounding context clues to deduce the meaning of unfamiliar vocabulary words.' }),

  makeTF({ id:'g6eng-comp-014', chapterId:'g6eng-comprehension', difficulty:1,
    question:`${_PASSAGE_DODO}True or False: The main reason the dodo became extinct was that sailors hunted it for food.`,
    answer:false,
    hint:'Re-read paragraph two carefully — which threat does the author say was GREATER?',
    explanation:'<b>False.</b> The passage states: "The birds were easy to catch... Sailors hunted them for food, <b>but the greater threat</b> came from the animals the settlers brought with them: <b>rats, pigs and monkeys</b> that raided dodo nests and ate the eggs." The introduced animals (invasive species) were the bigger cause of extinction.' }),

  makeMCQ({ id:'g6eng-comp-015', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_DODO}What does the phrase "dead as a dodo" mean, according to the passage?`,
    options:[
      'Extinct and gone forever',
      'Completely and irreversibly gone',
      'Something that has been hunted to near extinction',
      'A bird that cannot fly'
    ],
    answer:'Completely and irreversibly gone',
    hint:'The passage gives the exact meaning of this phrase.',
    explanation:'The passage states: "Scientists use the phrase \'dead as a dodo\' to describe anything <b>completely and irreversibly gone</b>." An idiom whose meaning is explained in the text itself — always read carefully for such definitions. "Irreversibly" means it cannot be undone or brought back.' }),

  makeMCQ({ id:'g6eng-comp-016', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_DODO}What literary technique is used in "determined that history shall not repeat itself" (paragraph 3)?`,
    options:['simile','alliteration','personification','idiom/figurative language'],
    answer:'idiom/figurative language',
    hint:'"History repeating itself" — can history literally repeat? This is a common English expression.',
    explanation:'"History shall not repeat itself" is an <b>idiom / figurative expression</b> — history cannot literally repeat; the phrase means "the same mistake (extinction) should not happen again." Recognising figurative language is a key comprehension skill in MIE Grade 6. Contrast: a <b>simile</b> uses "like/as"; a <b>metaphor</b> states something IS something else; <b>alliteration</b> repeats consonant sounds.' }),

  makeMCQ({ id:'g6eng-comp-017', chapterId:'g6eng-comprehension', difficulty:2,
    question:`${_PASSAGE_DODO}Why were dodo birds "easy to catch" when sailors arrived?`,
    options:[
      'Because they were very slow runners',
      'Because they had no fear of humans — they had never encountered predators before',
      'Because they were asleep during the day',
      'Because they were attracted to the sailors\' food'
    ],
    answer:'Because they had no fear of humans — they had never encountered predators before',
    hint:'Paragraph two explains exactly why dodos were easy to catch.',
    explanation:'The passage says the dodo had "<b>no fear of humans</b> — they had never learned to run from predators." Because Mauritius had no land predators before human arrival, dodos had never developed the instinct to flee. This made them tragically vulnerable when hunters arrived.' }),

  makeMCQ({ id:'g6eng-comp-018', chapterId:'g6eng-comprehension', difficulty:3,
    question:`${_PASSAGE_DODO}What is the AUTHOR'S PURPOSE in paragraph three?`,
    options:[
      'To entertain readers with facts about a famous extinct bird',
      'To use the dodo\'s story as a warning about current extinction threats and inspire conservation',
      'To explain the scientific process of evolution',
      'To describe what Mauritius looks like today'
    ],
    answer:'To use the dodo\'s story as a warning about current extinction threats and inspire conservation',
    hint:'What does the author want the reader to take away from the dodo\'s story?',
    explanation:'Paragraph three shifts from history to <b>warning and call to action</b>: "the dodo\'s story is also a warning" — hunting, habitat loss and invasive species still threaten animals today. The author then shows hope: Mauritius is now actively protecting surviving species. This combines <b>informing</b> (facts about dodo), <b>warning</b> (extinction is still happening) and <b>inspiring</b> (conservation is working).' }),

  makeMCQ({ id:'g6eng-comp-019', chapterId:'g6eng-comprehension', difficulty:4,
    question:`${_PASSAGE_DODO}Using PEE structure: which evidence from the passage BEST supports the claim "Introduced species were the greatest threat to the dodo"?`,
    options:[
      '"Sailors hunted them for food"',
      '"rats, pigs and monkeys that raided dodo nests and ate the eggs"',
      '"the dodo was extinct"',
      '"Standing nearly a metre tall"'
    ],
    answer:'"rats, pigs and monkeys that raided dodo nests and ate the eggs"',
    hint:'Find the quotation that most directly shows HOW introduced species threatened the dodo.',
    explanation:'The best <b>Evidence</b> (E in PEE): "rats, pigs and monkeys <b>that raided dodo nests and ate the eggs</b>." This directly proves the claim — it explains the specific mechanism of harm (nest raiding, egg destruction). The <b>Explanation</b> (second E): This shows introduced species attacked dodos at the reproductive stage, preventing new dodos from being born, which was more devastating than hunting adult birds.' })

);
