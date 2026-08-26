'use strict';
// Grade 5 English - Chapter: Creative Writing
// IDs format: g5eng-writ-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-writ-001', chapterId:'eng-writing', subsection:'planning', difficulty:1,
    question:'A good story is usually organised into three parts. What are they?',
    options:[
      'Introduction, characters, setting',
      'Beginning, middle and end',
      'Problem, solution, conclusion',
      'Title, paragraphs, punctuation'
    ],
    answer:'Beginning, middle and end',
    hint:'Think about the simplest structure of any story.',
    explanation:'Every good story has a <b>beginning</b> (introduces setting and characters), a <b>middle</b> (the main event or problem) and an <b>end</b> (the resolution or conclusion). Planning this structure before writing helps keep the story focused.' }),

  makeMCQ({ id:'g5eng-writ-002', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'Which sentence SHOWS rather than TELLS that a character is nervous?',
    options:[
      'He was very nervous.',
      'He felt nervous about the exam.',
      'His hands trembled and his heart pounded as he read the question.',
      'Nervousness took over him.'
    ],
    answer:'His hands trembled and his heart pounded as he read the question.',
    hint:'"Show don\'t tell" means describing physical actions and sensations instead of just naming the emotion.',
    explanation:'"<b>His hands trembled and his heart pounded</b>" shows nervousness through physical description - the reader feels it rather than being told about it. "He was very nervous" simply tells us. Good writers use sensory details and actions to convey emotions.' }),

  makeMCQ({ id:'g5eng-writ-003', chapterId:'eng-writing', subsection:'figurative', difficulty:1,
    question:'What is ALLITERATION?',
    options:[
      'Repeating the same idea twice',
      'The repetition of the same consonant sound at the start of nearby words',
      'Using a word that sounds like what it describes',
      'Comparing two things using "like" or "as"'
    ],
    answer:'The repetition of the same consonant sound at the start of nearby words',
    hint:'Example: "Peter Piper picked a peck of pickled pepper."',
    explanation:'<b>Alliteration</b> is repeating the same consonant sound at the start of nearby words. Examples: "slippery slopes", "furious flames", "the dark, deep sea". It creates a musical, memorable effect in writing.' }),

  makeMCQ({ id:'g5eng-writ-004', chapterId:'eng-writing', subsection:'figurative', difficulty:2,
    question:'Which of these is an example of a SIMILE?',
    options:[
      'The wind howled through the trees.',
      'She is a shining star.',
      'He ran as fast as a cheetah.',
      'The angry sky roared.'
    ],
    answer:'He ran as fast as a cheetah.',
    hint:'A simile compares two things using "like" or "as".',
    explanation:'"<b>He ran as fast as a cheetah</b>" is a simile - it uses "<b>as...as</b>" to compare. "She is a shining star" is a metaphor (no like/as). "The wind howled" and "the angry sky" are personification.' }),

  makeMCQ({ id:'g5eng-writ-005', chapterId:'eng-writing', subsection:'figurative', difficulty:2,
    question:'What is PERSONIFICATION?',
    options:[
      'Giving human qualities or feelings to non-human things',
      'Repeating sounds at the start of words',
      'Comparing two things using "like"',
      'Exaggerating for effect'
    ],
    answer:'Giving human qualities or feelings to non-human things',
    hint:'The word person is inside personification - think of treating a thing as if it were a person.',
    explanation:'<b>Personification</b> gives human qualities to non-human things. Examples: "The sun smiled down on us." / "The waves whispered secrets." / "The trees danced in the wind." It makes writing more vivid and engaging.' }),

  makeMCQ({ id:'g5eng-writ-006', chapterId:'eng-writing', subsection:'planning', difficulty:1,
    question:'When should you start a NEW paragraph in a story?',
    options:[
      'Every three sentences',
      'When you introduce a new idea, new time, new place or new speaker',
      'Only at the beginning and end of the story',
      'After every 50 words'
    ],
    answer:'When you introduce a new idea, new time, new place or new speaker',
    hint:'Think of the 4 Ts: Topic change, Time change, Text (new speaker), Territory (new place).',
    explanation:'Start a new paragraph when there is a change in: <b>topic/idea, time, place or speaker</b>. This organises writing clearly and makes it easier to read. In dialogue, each new speaker always starts a new paragraph.' }),

  makeMCQ({ id:'g5eng-writ-007', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'Which is the BEST opening sentence for an exciting story?',
    options:[
      'My story is about a boy called Max who goes on an adventure.',
      'In this story I will tell you about what happened one day.',
      'The cave was silent - until the moment the torchlight flickered and went out.',
      'There was a boy. He was ten years old. He lived in a house.'
    ],
    answer:'The cave was silent - until the moment the torchlight flickered and went out.',
    hint:'A good opening grabs the reader immediately - it creates atmosphere or raises a question.',
    explanation:'"<b>The cave was silent - until the moment the torchlight flickered and went out.</b>" immediately creates suspense and atmosphere. The other openings are weak: they tell instead of show, or simply introduce facts without engaging the reader.' }),

  makeTF({ id:'g5eng-writ-008', chapterId:'eng-writing', subsection:'planning', difficulty:1,
    question:'Using a variety of sentence lengths (short and long) makes creative writing more interesting to read.',
    answer:true,
    hint:'Think about rhythm in writing - what happens if all sentences are the same length?',
    explanation:'<b>True.</b> Mixing short sentences (for impact: "She fell.") and longer, descriptive sentences creates <b>rhythm and variety</b>. Short sentences build tension. Longer sentences develop description or action. Sameness makes writing monotonous.' }),

  makeMCQ({ id:'g5eng-writ-009', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'What does SPAG stand for in writing?',
    options:[
      'Spelling, Punctuation and Grammar',
      'Story, Plot and Good ending',
      'Sentences, Paragraphs and Good ideas',
      'Simile, Personification and Alliteration Grammar'
    ],
    answer:'Spelling, Punctuation and Grammar',
    hint:'SPAG is what you check at the END of your writing.',
    explanation:'<b>SPAG = Spelling, Punctuation and Grammar</b>. After finishing your writing, always check: are words spelled correctly? Is punctuation used correctly (full stops, capitals, commas, apostrophes)? Is the grammar correct (tenses, subject-verb agreement)?' }),

  makeMCQ({ id:'g5eng-writ-010', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'Which technique is used in: "The ancient, angry ocean attacked the shore again and again."',
    options:[
      'Simile only',
      'Alliteration and personification',
      'Rhyme and metaphor',
      'Onomatopoeia only'
    ],
    answer:'Alliteration and personification',
    hint:'Look at the starting sounds AND whether the ocean is being given a human quality.',
    explanation:'<b>Alliteration</b>: "ancient, <b>a</b>ngry ocean <b>a</b>ttacked" - repeated "a" sounds. <b>Personification</b>: "angry ocean attacked" - the ocean is given the human emotion of anger and the human action of attacking.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-writ-011', chapterId:'eng-writing', subsection:'figurative', difficulty:1,
    question:'What is a METAPHOR?',
    options:[
      'A comparison using "like" or "as"',
      'A direct comparison that says one thing IS another, without using "like" or "as"',
      'Giving human qualities to a non-human thing',
      'Repeating the same sound at the start of words'
    ],
    answer:'A direct comparison that says one thing IS another, without using "like" or "as"',
    hint:'Example: "Life is a journey." No "like" or "as" is used.',
    explanation:'A <b>metaphor</b> says one thing IS another directly: "Life is a journey." / "He is a lion on the field." Compare with a simile: "He ran <b>like</b> a lion." A metaphor does not use "like" or "as" - it makes the comparison direct and stronger.' }),

  makeMCQ({ id:'g5eng-writ-012', chapterId:'eng-writing', subsection:'figurative', difficulty:1,
    question:'Which of the following is an example of ONOMATOPOEIA?',
    options:[
      '"The old house stood alone."',
      '"The bees buzzed around the flowers."',
      '"She was as quick as a flash."',
      '"The brave knight fought the dragon."'
    ],
    answer:'"The bees buzzed around the flowers."',
    hint:'Onomatopoeia uses words that sound like the sound they describe.',
    explanation:'"<b>Buzzed</b>" is onomatopoeia - it sounds like the noise bees make. Other examples: crash, hiss, splash, sizzle, crunch, murmur, roar. Using onomatopoeia makes writing more vivid and brings sounds to life for the reader.' }),

  makeMCQ({ id:'g5eng-writ-013', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'What is a RHETORICAL QUESTION in persuasive writing?',
    options:[
      'A question the writer genuinely does not know the answer to',
      'A question asked for effect - the writer does not expect an answer, but it makes the reader think',
      'A question that starts a new paragraph',
      'A question that only teachers can answer'
    ],
    answer:'A question asked for effect - the writer does not expect an answer, but it makes the reader think',
    hint:'Example in persuasive writing: "Would you want your children to breathe dirty air?" No answer is expected.',
    explanation:'A <b>rhetorical question</b> is asked to create an effect, not to get an answer. It makes the reader think and often draws them into the argument. Example: "How can we call ourselves civilised if we destroy our own planet?" The writer already knows the audience\'s emotional response.' }),

  makeMCQ({ id:'g5eng-writ-014', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'Which is a better way to say "He said" in a story to show the character spoke quietly?',
    options:['He said loudly','He whispered','He said quietly quietly','He talked'],
    answer:'He whispered',
    hint:'Precise vocabulary replaces weak phrases - instead of "said + adverb", use a specific verb.',
    explanation:'"<b>He whispered</b>" is more precise and powerful than "he said quietly". Good writers replace weak verbs + adverbs with specific verbs that carry the meaning themselves. Other examples: shouted, muttered, exclaimed, announced, replied, gasped, snapped.' }),

  makeMCQ({ id:'g5eng-writ-015', chapterId:'eng-writing', subsection:'descriptive', difficulty:2,
    question:'Which sentence BEST uses sensory language to describe a beach?',
    options:[
      'The beach was nice.',
      'There was a beach.',
      'The waves crashed and hissed against the shore, and the salty breeze stung her cheeks.',
      'The beach had water and sand.'
    ],
    answer:'The waves crashed and hissed against the shore, and the salty breeze stung her cheeks.',
    hint:'Good descriptive writing appeals to the five senses - sound, sight, touch, smell, taste.',
    explanation:'"<b>The waves crashed and hissed</b> against the shore, and the salty breeze <b>stung</b> her cheeks" uses: <b>sound</b> (crashed, hissed - onomatopoeia), <b>touch</b> (stung her cheeks), and <b>taste/smell</b> (salty). This multi-sensory description makes the reader feel present at the scene.' }),

  makeMCQ({ id:'g5eng-writ-016', chapterId:'eng-writing', subsection:'planning', difficulty:3,
    question:'A student writes: "I got up. I ate breakfast. I went to school. I saw my friends." What is the MAIN weakness of this writing?',
    options:[
      'The tense is wrong',
      'All sentences begin with "I" and have the same structure - no variety, no description, no detail',
      'The sentences are too long',
      'There are spelling mistakes'
    ],
    answer:'All sentences begin with "I" and have the same structure - no variety, no description, no detail',
    hint:'Think about what makes writing interesting to read.',
    explanation:'The main weakness is <b>lack of variety and detail</b>: every sentence starts with "I" and follows the same simple structure. Good writing varies sentence starters, uses adjectives, adverbs, and figurative language, and builds atmosphere. Improved version: "After a quick breakfast, I dashed out into the cool morning air to meet my friends at the school gates."' }),

  makeMCQ({ id:'g5eng-writ-017', chapterId:'eng-writing', subsection:'planning', difficulty:3,
    question:'In a story, what is the purpose of the MIDDLE section (the main body)?',
    options:[
      'To introduce all the characters and setting at once',
      'To develop the problem or main event, building tension and showing how characters respond',
      'To end the story quickly',
      'To list all the things that happened in order without any detail'
    ],
    answer:'To develop the problem or main event, building tension and showing how characters respond',
    hint:'The beginning sets the scene; the end resolves it. What happens in between?',
    explanation:'The <b>middle</b> of a story develops the main conflict or event. It should: build tension, show characters reacting to challenges, include dialogue and description, and keep the reader engaged. Good middles use a problem-complication-near-resolution structure before the final ending.' }),

  makeMCQ({ id:'g5eng-writ-018', chapterId:'eng-writing', subsection:'planning', difficulty:2,
    question:'Which opening BEST creates atmosphere and grabs the reader\'s attention?',
    options:[
      'My name is Jake and I am going to tell you about my adventure.',
      'This story is about something that happened to me last summer.',
      'Darkness. The wind shrieked through the broken window and the candle went out.',
      'One day Jake went somewhere and something happened.'
    ],
    answer:'Darkness. The wind shrieked through the broken window and the candle went out.',
    hint:'A strong opening creates immediate atmosphere - it drops the reader INTO the moment.',
    explanation:'"<b>Darkness. The wind shrieked...</b>" is powerful: the single-word sentence "Darkness" creates instant impact; "shrieked" (personification/onomatopoeia) and the dramatic event (candle going out) immediately build tension and make the reader want to continue. The other openings tell rather than show, and fail to create atmosphere.' }),

  makeMCQ({ id:'g5eng-writ-019', chapterId:'eng-writing', subsection:'planning', difficulty:4,
    question:'A student is writing a persuasive letter about protecting Mauritius\'s coral reef. Which paragraph BEST uses AFOREST techniques?',
    options:[
      '"Dear Sir/Madam, I am writing about the coral reef. It is nice. Please protect it."',
      '"Imagine a Mauritius without its coral reef - no turquoise lagoons, no colourful fish, no tourists, no future. Every year, 30% of our reef is damaged by pollution and climate change. Are we really willing to let this natural treasure disappear forever? We must act now."',
      '"The reef has coral and fish. Some people damage it. This is bad. The end."',
      '"I think the reef is important because my teacher said so and I agree with her."'
    ],
    answer:'"Imagine a Mauritius without its coral reef - no turquoise lagoons, no colourful fish, no tourists, no future. Every year, 30% of our reef is damaged by pollution and climate change. Are we really willing to let this natural treasure disappear forever? We must act now."',
    hint:'AFOREST = Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triples.',
    explanation:'The second option uses multiple AFOREST techniques: <b>Emotive language</b> ("let this natural treasure disappear"); <b>Statistics</b> ("30% of our reef"); <b>Rhetorical question</b> ("Are we really willing...?"); <b>Triple</b> ("no turquoise lagoons, no colourful fish, no tourists"). These techniques together make the argument persuasive and powerful.' })

);
