'use strict';
(function () {

// Multi-year (2021-2024) NCE English inspired questions — g9eng-my-001 to 040

// --- g9eng-gr-determiners: superlatives & quantifiers (NO subsection field) ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-001', chapterId: 'g9eng-gr-determiners', difficulty: 2,
  question: 'Jane is the _____________ girl in her class.',
  options: ['tallest', 'taller', 'as tall', 'more tall'],
  answer: 'tallest',
  explanation: 'Superlative of tall uses -est: tallest.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-002', chapterId: 'g9eng-gr-determiners', difficulty: 2,
  question: 'There is not _____________ milk left in the fridge.',
  options: ['much', 'many', 'plenty', 'lots'],
  answer: 'much',
  explanation: '"Much" is used with uncountable nouns like milk.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-003', chapterId: 'g9eng-gr-determiners', difficulty: 2,
  question: 'Sahil is the _____________ boy on the football team.',
  options: ['strongest', 'stronger', 'as strong', 'more strong'],
  answer: 'strongest',
  explanation: 'One-syllable adjectives form the superlative with -est.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-004', chapterId: 'g9eng-gr-determiners', difficulty: 2,
  question: 'There is too _____________ sugar in this tea.',
  options: ['much', 'many', 'lots', 'plenty'],
  answer: 'much',
  explanation: '"Much" modifies uncountable nouns; sugar is uncountable.'
}));

// --- g9eng-gr-pronouns ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-005', chapterId: 'g9eng-gr-pronouns', difficulty: 2,
  subsection: 'reflexive',
  question: 'Kevin and his brother make their bed _____________.',
  options: ['themselves', 'himself', 'herself', 'ourselves'],
  answer: 'themselves',
  explanation: '"They" (Kevin and his brother) → reflexive is "themselves".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-006', chapterId: 'g9eng-gr-pronouns', difficulty: 2,
  subsection: 'reflexive',
  question: 'Sarah and her friend cleaned their room _____________.',
  options: ['themselves', 'herself', 'himself', 'ourselves'],
  answer: 'themselves',
  explanation: 'Two people (they) → reflexive pronoun is "themselves".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-007', chapterId: 'g9eng-gr-pronouns', difficulty: 2,
  subsection: 'relative',
  question: 'The book _____________ I borrowed from the library is very interesting.',
  options: ['which', 'who', 'whom', 'where'],
  answer: 'which',
  explanation: '"Which" introduces a relative clause referring to a thing (book).'
}));

// --- g9eng-gr-prepositions ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-008', chapterId: 'g9eng-gr-prepositions', difficulty: 2,
  subsection: 'prepositions',
  question: 'We stayed _____________ my uncle\'s place during the holidays.',
  options: ['at', 'in', 'by', 'for'],
  answer: 'at',
  explanation: '"Stay at" a place — at is used for specific locations.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-009', chapterId: 'g9eng-gr-prepositions', difficulty: 2,
  subsection: 'prepositions',
  question: 'The film will start _____________ half an hour.',
  options: ['in', 'on', 'at', 'by'],
  answer: 'in',
  explanation: '"In" expresses a future period of time: in half an hour.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-010', chapterId: 'g9eng-gr-prepositions', difficulty: 2,
  subsection: 'prepositions',
  question: 'We went _____________ the park for a picnic on Sunday.',
  options: ['to', 'at', 'for', 'under'],
  answer: 'to',
  explanation: '"Go to" a place — "to" expresses direction or destination.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-011', chapterId: 'g9eng-gr-prepositions', difficulty: 2,
  subsection: 'prepositions',
  question: 'The train will arrive _____________ ten minutes.',
  options: ['in', 'on', 'at', 'to'],
  answer: 'in',
  explanation: '"In ten minutes" — "in" is used for future durations.'
}));

// --- g9eng-gr-verbs: tenses and conditionals ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-012', chapterId: 'g9eng-gr-verbs', difficulty: 2,
  subsection: 'tense_consistency',
  question: 'Yesterday, my cousins _____________ to visit me after school.',
  options: ['came', 'come', 'are coming', 'have come'],
  answer: 'came',
  explanation: '"Yesterday" signals simple past tense.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-013', chapterId: 'g9eng-gr-verbs', difficulty: 2,
  subsection: 'tense_consistency',
  question: 'Devika _____________ to visit me tomorrow morning.',
  options: ['will come', 'was coming', 'had come', 'has come'],
  answer: 'will come',
  explanation: '"Tomorrow" signals simple future; will + base verb.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-014', chapterId: 'g9eng-gr-verbs', difficulty: 2,
  subsection: 'tense_consistency',
  question: 'If I eat fruits and vegetables every day, I _____________ healthy.',
  options: ['will be', 'was', 'were', 'was being'],
  answer: 'will be',
  explanation: 'First conditional (real/possible): if + present → will + base verb.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-015', chapterId: 'g9eng-gr-verbs', difficulty: 2,
  subsection: 'tense_consistency',
  question: 'If I study hard, I _____________ pass the examination.',
  options: ['will', 'was', 'am', 'would'],
  answer: 'will',
  explanation: 'First conditional with a real future outcome uses "will".'
}));

// --- g9eng-gr-sentence: passive voice & reported speech ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-016', chapterId: 'g9eng-gr-sentence', difficulty: 3,
  subsection: 'voice',
  question: 'Which is the correct passive form of: "The teacher praised the students"?',
  options: [
    'The students were praised by the teacher.',
    'The students are praised by the teacher.',
    'The students had been praised by the teacher.',
    'The students have praised the teacher.'
  ],
  answer: 'The students were praised by the teacher.',
  explanation: 'Simple past passive: subject + was/were + past participle + by + agent.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-017', chapterId: 'g9eng-gr-sentence', difficulty: 3,
  subsection: 'voice',
  question: 'Which is the correct passive form of: "Riva left a bag on the train"?',
  options: [
    'A bag was left by Riva on the train.',
    'A bag is left by Riva on the train.',
    'A bag had left on the train by Riva.',
    'A bag left by Riva on the train.'
  ],
  answer: 'A bag was left by Riva on the train.',
  explanation: 'Past passive: object becomes subject + was + past participle.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-018', chapterId: 'g9eng-gr-sentence', difficulty: 3,
  subsection: 'direct_speech',
  question: 'Choose the correct direct speech for: "The teacher asked us if we were hungry."',
  options: [
    '"Are you hungry?" the teacher asked.',
    '"Were you hungry?" the teacher asked.',
    '"Are we hungry?" the teacher asked.',
    '"Am I hungry?" the teacher asked.'
  ],
  answer: '"Are you hungry?" the teacher asked.',
  explanation: 'Indirect "if we were hungry" → direct "Are you hungry?" (present tense, second person).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-019', chapterId: 'g9eng-gr-sentence', difficulty: 3,
  subsection: 'direct_speech',
  question: 'Choose the correct indirect speech for: "Did you see the accident?" the policeman asked him.',
  options: [
    'The policeman asked him if he had seen the accident.',
    'The policeman asked him if he saw the accident.',
    'The policeman asked him if you had seen the accident.',
    'The policeman asked him did he see the accident.'
  ],
  answer: 'The policeman asked him if he had seen the accident.',
  explanation: 'Questions in indirect speech use "if/whether" and backshift tenses: did see → had seen.'
}));

// --- g9eng-gr-punctuation ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-020', chapterId: 'g9eng-gr-punctuation', difficulty: 2,
  subsection: 'non_defining_comma',
  question: 'Which version correctly punctuates the list: "Tim bought three apples two oranges and one kiwi"?',
  options: [
    'Tim bought three apples, two oranges and one kiwi.',
    'Tim bought three apples two oranges, and one kiwi.',
    'Tim bought, three apples, two oranges, and one kiwi.',
    'Tim bought three apples; two oranges; and one kiwi.'
  ],
  answer: 'Tim bought three apples, two oranges and one kiwi.',
  explanation: 'Commas separate items in a list; no comma before the final "and".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-021', chapterId: 'g9eng-gr-punctuation', difficulty: 2,
  subsection: 'quotation_marks',
  question: 'Which sentence uses capital letters correctly?',
  options: [
    'Mary has gone to England.',
    'mary has gone to england.',
    'Mary has gone to england.',
    'mary has gone to England.'
  ],
  answer: 'Mary has gone to England.',
  explanation: 'Names (Mary) and proper nouns (England — a country) begin with a capital letter.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-022', chapterId: 'g9eng-gr-punctuation', difficulty: 2,
  subsection: 'quotation_marks',
  question: 'Which sentence uses capital letters correctly?',
  options: [
    'Anne went out with her friends on Thursday.',
    'Anne went out with her friends on thursday.',
    'anne went out with her friends on Thursday.',
    'anne went out with her Friends on Thursday.'
  ],
  answer: 'Anne went out with her friends on Thursday.',
  explanation: 'Names and days of the week (Thursday) are proper nouns — they start with a capital.'
}));

// --- g9eng-vocabulary: context-based word choice ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-023', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'His bag is too _____________. He cannot carry it alone.',
  options: ['heavy', 'hot', 'difficult', 'expensive'],
  answer: 'heavy',
  explanation: '"Heavy" describes the weight of the bag, which is why it cannot be carried alone.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-024', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'There\'s a wedding in my family. I need to buy some _____________ clothes.',
  options: ['new', 'torn', 'dirty', 'ugly'],
  answer: 'new',
  explanation: 'A wedding is a formal occasion, so buying new clothes is appropriate.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-025', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'I am very _____________. My father is ill.',
  options: ['worried', 'hungry', 'excited', 'shy'],
  answer: 'worried',
  explanation: 'A sick parent causes anxiety; "worried" fits this emotional context.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-026', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'James has been _____________ permission to go home early.',
  options: ['given', 'sold', 'put', 'said'],
  answer: 'given',
  explanation: '"Given permission" is the correct collocation — you give or grant permission.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-027', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'It is very _____________ today. Make sure you wear warm clothes.',
  options: ['cold', 'sunny', 'dry', 'wet'],
  answer: 'cold',
  explanation: 'Wearing warm clothes is a response to cold weather.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-028', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'The students _____________ that the school was dirty and needed cleaning.',
  options: ['complained', 'contributed', 'congratulated', 'consoled'],
  answer: 'complained',
  explanation: '"Complained" means to express dissatisfaction — appropriate here.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-029', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'vocabulary_in_context',
  question: 'I\'m _____________. I will do well in my test. I have revised well.',
  options: ['confident', 'doubtful', 'unsure', 'surprised'],
  answer: 'confident',
  explanation: 'Having revised well leads to confidence about performance.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-030', chapterId: 'g9eng-vocabulary', difficulty: 2,
  subsection: 'word_choice',
  question: 'The _____________ in this orchestra are all very young but exceptionally talented.',
  options: ['musicians', 'officers', 'barbers', 'drivers'],
  answer: 'musicians',
  explanation: 'An orchestra is made up of musicians who play instruments.'
}));

// --- g9eng-word-formation ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-031', chapterId: 'g9eng-word-formation', difficulty: 2,
  subsection: 'adverb_formation',
  question: 'Choose the correct adverb form of "usual": She is _____________ late for class.',
  options: ['usually', 'usual', 'unusually', 'usualness'],
  answer: 'usually',
  explanation: 'Adverbs are formed by adding -ly to adjectives: usual → usually.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-032', chapterId: 'g9eng-word-formation', difficulty: 2,
  subsection: 'adjective_formation',
  question: 'Choose the correct adjective form of "health": Eating vegetables keeps you _____________.',
  options: ['healthy', 'health', 'healthily', 'healthiness'],
  answer: 'healthy',
  explanation: 'The adjective is formed by adding -y to the noun: health → healthy.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-033', chapterId: 'g9eng-word-formation', difficulty: 2,
  subsection: 'verb_formation',
  question: 'The correct simple past tense of the irregular verb "fly" is:',
  options: ['flew', 'flied', 'flown', 'fly'],
  answer: 'flew',
  explanation: '"Fly" is irregular: fly → flew → flown. "Flied" is a common error.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-034', chapterId: 'g9eng-word-formation', difficulty: 2,
  subsection: 'verb_formation',
  question: 'The correct past participle of "eat" in the sentence "The food had been _____________ before we arrived" is:',
  options: ['eaten', 'ate', 'eat', 'eated'],
  answer: 'eaten',
  explanation: '"Eat" is irregular: eat → ate → eaten. Past participle is "eaten".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-035', chapterId: 'g9eng-word-formation', difficulty: 2,
  subsection: 'noun_formation',
  question: 'Choose the correct noun form of "originate": Scientists studied the _____________ of the disease.',
  options: ['origin', 'originate', 'originally', 'origination'],
  answer: 'origin',
  explanation: 'The root noun is "origin"; "origination" also works but "origin" is simpler and more natural here.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-036', chapterId: 'g9eng-word-formation', difficulty: 3,
  subsection: 'root_and_affix',
  question: 'Which word is formed correctly using the prefix meaning "not"?',
  options: ['unhappy', 'dishappy', 'inhappy', 'nonhappy'],
  answer: 'unhappy',
  explanation: 'The prefix "un-" added to "happy" gives "unhappy" — meaning not happy.'
}));

// --- g9eng-literature ---

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-037', chapterId: 'g9eng-literature', difficulty: 3,
  subsection: 'figurative_devices',
  question: 'Read the line: "The wind howled through the empty streets." What figurative device is used?',
  options: ['Personification', 'Simile', 'Metaphor', 'Alliteration'],
  answer: 'Personification',
  explanation: 'Personification gives a non-human thing (wind) a human action (howling).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-038', chapterId: 'g9eng-literature', difficulty: 3,
  subsection: 'figurative_devices',
  question: 'Which of the following is an example of a simile?',
  options: [
    'She ran like the wind.',
    'She was a cheetah.',
    'The flowers danced in the breeze.',
    'The thunder roared angrily.'
  ],
  answer: 'She ran like the wind.',
  explanation: 'A simile makes a comparison using "like" or "as".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-039', chapterId: 'g9eng-literature', difficulty: 3,
  subsection: 'effect_of_device',
  question: 'What is the main effect of personification in the line: "The old house groaned under the weight of its secrets"?',
  options: [
    'It makes the house seem alive and mysterious.',
    'It compares the house directly to a person.',
    'It tells us the house is very noisy.',
    'It explains why the house is old.'
  ],
  answer: 'It makes the house seem alive and mysterious.',
  explanation: 'Personification creates atmosphere by giving the house human qualities — making it feel living and eerie.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9eng-my-040', chapterId: 'g9eng-literature', difficulty: 2,
  subsection: 'narrative_voice',
  question: 'In a first-person narrative, the story is told using which pronouns?',
  options: ['I / we', 'he / she / they', 'you', 'one'],
  answer: 'I / we',
  explanation: 'First-person narrators refer to themselves as "I" (singular) or "we" (plural).'
}));

})();
