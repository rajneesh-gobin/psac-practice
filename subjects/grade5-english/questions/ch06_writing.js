'use strict';
// Grade 5 English — Chapter: Creative Writing
// IDs format: g5eng-writ-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-writ-001', chapterId:'eng-writing', difficulty:1,
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

  makeMCQ({ id:'g5eng-writ-002', chapterId:'eng-writing', difficulty:2,
    question:'Which sentence SHOWS rather than TELLS that a character is nervous?',
    options:[
      'He was very nervous.',
      'He felt nervous about the exam.',
      'His hands trembled and his heart pounded as he read the question.',
      'Nervousness took over him.'
    ],
    answer:'His hands trembled and his heart pounded as he read the question.',
    hint:'"Show don\'t tell" means describing physical actions and sensations instead of just naming the emotion.',
    explanation:'"<b>His hands trembled and his heart pounded</b>" shows nervousness through physical description — the reader feels it rather than being told about it. "He was very nervous" simply tells us. Good writers use sensory details and actions to convey emotions.' }),

  makeMCQ({ id:'g5eng-writ-003', chapterId:'eng-writing', difficulty:1,
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

  makeMCQ({ id:'g5eng-writ-004', chapterId:'eng-writing', difficulty:2,
    question:'Which of these is an example of a SIMILE?',
    options:[
      'The wind howled through the trees.',
      'She is a shining star.',
      'He ran as fast as a cheetah.',
      'The angry sky roared.'
    ],
    answer:'He ran as fast as a cheetah.',
    hint:'A simile compares two things using "like" or "as".',
    explanation:'"<b>He ran as fast as a cheetah</b>" is a simile — it uses "<b>as...as</b>" to compare. "She is a shining star" is a metaphor (no like/as). "The wind howled" and "the angry sky" are personification.' }),

  makeMCQ({ id:'g5eng-writ-005', chapterId:'eng-writing', difficulty:2,
    question:'What is PERSONIFICATION?',
    options:[
      'Giving human qualities or feelings to non-human things',
      'Repeating sounds at the start of words',
      'Comparing two things using "like"',
      'Exaggerating for effect'
    ],
    answer:'Giving human qualities or feelings to non-human things',
    hint:'The word person is inside personification — think of treating a thing as if it were a person.',
    explanation:'<b>Personification</b> gives human qualities to non-human things. Examples: "The sun smiled down on us." / "The waves whispered secrets." / "The trees danced in the wind." It makes writing more vivid and engaging.' }),

  makeMCQ({ id:'g5eng-writ-006', chapterId:'eng-writing', difficulty:1,
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

  makeMCQ({ id:'g5eng-writ-007', chapterId:'eng-writing', difficulty:2,
    question:'Which is the BEST opening sentence for an exciting story?',
    options:[
      'My story is about a boy called Max who goes on an adventure.',
      'In this story I will tell you about what happened one day.',
      'The cave was silent — until the moment the torchlight flickered and went out.',
      'There was a boy. He was ten years old. He lived in a house.'
    ],
    answer:'The cave was silent — until the moment the torchlight flickered and went out.',
    hint:'A good opening grabs the reader immediately — it creates atmosphere or raises a question.',
    explanation:'"<b>The cave was silent — until the moment the torchlight flickered and went out.</b>" immediately creates suspense and atmosphere. The other openings are weak: they tell instead of show, or simply introduce facts without engaging the reader.' }),

  makeTF({ id:'g5eng-writ-008', chapterId:'eng-writing', difficulty:1,
    question:'Using a variety of sentence lengths (short and long) makes creative writing more interesting to read.',
    answer:true,
    hint:'Think about rhythm in writing — what happens if all sentences are the same length?',
    explanation:'<b>True.</b> Mixing short sentences (for impact: "She fell.") and longer, descriptive sentences creates <b>rhythm and variety</b>. Short sentences build tension. Longer sentences develop description or action. Sameness makes writing monotonous.' }),

  makeMCQ({ id:'g5eng-writ-009', chapterId:'eng-writing', difficulty:2,
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

  makeMCQ({ id:'g5eng-writ-010', chapterId:'eng-writing', difficulty:2,
    question:'Which technique is used in: "The ancient, angry ocean attacked the shore again and again."',
    options:[
      'Simile only',
      'Alliteration and personification',
      'Rhyme and metaphor',
      'Onomatopoeia only'
    ],
    answer:'Alliteration and personification',
    hint:'Look at the starting sounds AND whether the ocean is being given a human quality.',
    explanation:'<b>Alliteration</b>: "ancient, <b>a</b>ngry ocean <b>a</b>ttacked" — repeated "a" sounds. <b>Personification</b>: "angry ocean attacked" — the ocean is given the human emotion of anger and the human action of attacking.' })

);
