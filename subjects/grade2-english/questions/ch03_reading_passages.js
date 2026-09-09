'use strict';
// Grade 2 English — Reading: longer comprehension passages.
// IDs: g2eng-pass-001 … g2eng-pass-032
//
// WHY THIS FILE EXISTS
// Measured in ch03_reading.js: the 25 reading_comprehension items (g2eng-rdr-051…075)
// each embed their own passage inline, and those passages run 22–25 words — three
// short sentences, one question, then a new passage. A child never reads the same
// text twice, so nothing there asks them to hold a story in their head or to look
// back for evidence. These 8 passages are 36–39 words and carry 4 questions each:
// literal, inference, word-in-context, then main idea or sequence. Same reading
// level, four times the thinking per passage.

(function () {
  const P = {
    market: 'On Saturday, Amir went to the market with his mother. They bought red tomatoes, green beans and a big pumpkin. The bags were heavy, so Amir carried the small one. At home, his mother made a hot soup.',
    rain: 'Big drops of rain fell on the school roof at playtime. The children ran inside and sat down quietly. Miss Rita opened a book and read them a funny story. Soon everyone forgot about the rain and laughed.',
    crab: 'Leela and her brother walked along the beach one hot morning. Under a flat stone they found a tiny crab. It waved its claws at them, so they put the stone back gently and went home.',
    cakes: 'Every Sunday, Nita helps her grandmother make cakes. First they mix flour, sugar and eggs in a big bowl. Then Grandmother puts the bowl in the oven. The whole house smells sweet, and the neighbours always smile.',
    dog: 'A thin brown dog sat outside the shop every day. Sam gave him bread and water after school. One morning the dog was gone. Then Sam saw him running in the yard of a kind neighbour.',
    pencil: 'Rohan looked in his bag for his blue pencil, but it was not there. He looked under his desk and on the floor. At last his friend Zoe held it up. It had rolled behind her chair.',
    bus: 'The bus to town was very full. Priya found the last seat near the door. Then an old lady got on with two heavy baskets. Priya stood up and gave her the seat. The lady said thank you.',
    garden: 'After the rain, Ravi went out to the garden. The soil was soft and dark. He saw small green shoots pushing up where he had planted seeds last month. Ravi ran to call his father to look.',
  };
  const ask = (n, key, sub, diff, q, opts, ans, hint, exp) => STATIC_QUESTIONS.push(
    makeMCQ({ id: `g2eng-pass-${String(n).padStart(3, '0')}`, chapterId: 'g2eng-reading',
      difficulty: diff, subsection: sub,
      question: `Read: "${P[key]}"<br><br>${q}`,
      options: opts, answer: ans, hint, explanation: exp }));

  // Passage 1: the market
  ask(1, 'market', 'reading_comprehension', 1,
    'What did they buy that was big?',
    ['A pumpkin', 'A cabbage', 'A carrot', 'A melon'],
    'A pumpkin',
    'Look for the words that come just after "a big".',
    '<b>A pumpkin</b> — the passage says they bought a big pumpkin.');

  ask(2, 'market', 'reading_comprehension', 2,
    'What can you tell about Amir\'s mother?',
    ['She likes to cook', 'She works at a school', 'She lives near the sea', 'She has a red car'],
    'She likes to cook',
    'Think about what she did with the vegetables when they got home.',
    '<b>She likes to cook</b> — she turned the vegetables into a hot soup.');

  ask(3, 'market', 'reading_comprehension', 2,
    'In this passage, "heavy" tells you the bags were...',
    ['hard to lift', 'easy to carry', 'very colourful', 'nearly empty'],
    'hard to lift',
    'Think how a bag full of vegetables feels in your hand.',
    '<b>Hard to lift</b> — a heavy thing takes strength to carry.');

  ask(4, 'market', 'reading_comprehension', 2,
    'What is this passage MAINLY about?',
    ['A trip to the market', 'A day at the beach', 'A walk in the park', 'A game after school'],
    'A trip to the market',
    'Ask yourself where the whole story happens.',
    '<b>A trip to the market</b> — buying, carrying and cooking are all one shopping trip.');

  // Passage 2: rain at school
  ask(5, 'rain', 'reading_comprehension', 1,
    'Where did the big drops of rain fall?',
    ['On the school roof', 'On the market road', 'On the sandy beach', 'On the green field'],
    'On the school roof',
    'The first sentence tells you exactly where the rain fell.',
    '<b>On the school roof</b> — the passage says so in the first sentence.');

  ask(6, 'rain', 'reading_comprehension', 2,
    'Why did the children run inside?',
    ['They did not want to get wet', 'They had finished all their work', 'They were called in for lunch', 'They wanted to find their bags'],
    'They did not want to get wet',
    'The passage does not say why — think about what rain does to you.',
    '<b>They did not want to get wet</b> — it was raining, so inside was dry.');

  ask(7, 'rain', 'sight_words', 2,
    'The passage says "Soon everyone forgot about the rain." What does "soon" mean here?',
    ['a short time later', 'a long time before', 'every single day', 'once again today'],
    'a short time later',
    '"Soon" is about time. Did it happen quickly or slowly?',
    '<b>A short time later</b> — "soon" means not long afterwards.');

  ask(8, 'rain', 'reading_comprehension', 1,
    'What happened LAST in this passage?',
    ['The children laughed', 'The rain stopped falling', 'Miss Rita rang a bell', 'The children ran outside'],
    'The children laughed',
    'Read the very last sentence again.',
    '<b>The children laughed</b> — that is how the passage ends.');

  // Passage 3: the crab
  ask(9, 'crab', 'reading_comprehension', 1,
    'What did they find under the flat stone?',
    ['A tiny crab', 'A small fish', 'A red shell', 'A grey bird'],
    'A tiny crab',
    'The middle sentence names what was under the stone.',
    '<b>A tiny crab</b> — the passage says they found a tiny crab.');

  ask(10, 'crab', 'reading_comprehension', 2,
    'Why did they put the stone back?',
    ['So the crab would be safe', 'So they could sit on it', 'So the sand would stay dry', 'So the sea would not rise'],
    'So the crab would be safe',
    'The stone was the crab\'s home. What happens if you leave it open?',
    '<b>So the crab would be safe</b> — they covered its home again before leaving.');

  ask(11, 'crab', 'reading_comprehension', 2,
    'In this passage, "gently" means they moved the stone...',
    ['in a soft way', 'in a loud way', 'in a fast way', 'in a cold way'],
    'in a soft way',
    'Think how you touch something small that could be hurt.',
    '<b>In a soft way</b> — gently means carefully and softly.');

  ask(12, 'crab', 'reading_comprehension', 2,
    'What is the BEST title for this passage?',
    ['Two children find a crab', 'Two children build a boat', 'Two children lose a shoe', 'Two children swim at sea'],
    'Two children find a crab',
    'A good title tells you the main thing that happened.',
    '<b>Two children find a crab</b> — the whole passage is about that one find.');

  // Passage 4: baking with Grandmother
  ask(13, 'cakes', 'reading_comprehension', 1,
    'What goes into the big bowl?',
    ['Flour, sugar and eggs', 'Rice, salt and fish', 'Milk, tea and bread', 'Beans, oil and corn'],
    'Flour, sugar and eggs',
    'The second sentence lists the three things.',
    '<b>Flour, sugar and eggs</b> — the passage names all three.');

  ask(14, 'cakes', 'reading_comprehension', 2,
    'Why do the neighbours always smile?',
    ['They can smell the cakes', 'They can hear the radio', 'They can see the bowl', 'They can taste the tea'],
    'They can smell the cakes',
    'The passage says the whole house smells sweet. Smells travel.',
    '<b>They can smell the cakes</b> — the sweet smell reaches them too.');

  ask(15, 'cakes', 'reading_comprehension', 2,
    'In this passage, "mix" means to...',
    ['stir them together', 'wash them again', 'cut them apart', 'count them twice'],
    'stir them together',
    'What do you do to flour, sugar and eggs in one bowl?',
    '<b>Stir them together</b> — mixing joins things into one.');

  ask(16, 'cakes', 'reading_comprehension', 1,
    'What do they do FIRST?',
    ['Mix the flour and eggs', 'Put the bowl in the oven', 'Smell the sweet house', 'Wave to the neighbours'],
    'Mix the flour and eggs',
    'Look for the word "First" in the passage.',
    '<b>Mix the flour and eggs</b> — the passage starts that step with "First".');

  // Passage 5: the stray dog
  ask(17, 'dog', 'reading_comprehension', 1,
    'What did Sam give the dog after school?',
    ['Bread and water', 'Rice and milk', 'Fish and bones', 'Cake and juice'],
    'Bread and water',
    'The second sentence tells you what Sam brought.',
    '<b>Bread and water</b> — that is what Sam gave him each day.');

  ask(18, 'dog', 'reading_comprehension', 2,
    'What most likely happened to the dog?',
    ['A neighbour took him in', 'A truck carried him away', 'He ran back to the shop', 'He went to look for Sam'],
    'A neighbour took him in',
    'Where was the dog running when Sam saw him again?',
    '<b>A neighbour took him in</b> — he was in a kind neighbour\'s yard.');

  ask(19, 'dog', 'reading_comprehension', 2,
    'In this passage, "thin" tells you the dog was...',
    ['not fat', 'not old', 'not wet', 'not new'],
    'not fat',
    'Thin is the opposite of one of these words.',
    '<b>Not fat</b> — a thin dog has very little fat on it.');

  ask(20, 'dog', 'reading_comprehension', 2,
    'What is this passage MAINLY about?',
    ['A boy helps a stray dog', 'A boy loses his school bag', 'A boy opens a small shop', 'A boy builds a wooden yard'],
    'A boy helps a stray dog',
    'Who does Sam care for all through the passage?',
    '<b>A boy helps a stray dog</b> — feeding him is the whole story.');

  // Passage 6: the missing pencil
  ask(21, 'pencil', 'reading_comprehension', 1,
    'Where had the blue pencil rolled?',
    ['Behind her chair', 'Under his desk', 'Inside his bag', 'Near the door'],
    'Behind her chair',
    'The last sentence tells you exactly where it was.',
    '<b>Behind her chair</b> — it had rolled behind Zoe\'s chair.');

  ask(22, 'pencil', 'reading_comprehension', 2,
    'How did Rohan most likely feel when Zoe held up the pencil?',
    ['Glad', 'Angry', 'Sleepy', 'Hungry'],
    'Glad',
    'The passage never says how he felt. Think how you feel when something lost is found.',
    '<b>Glad</b> — his pencil was found at last.');

  ask(23, 'pencil', 'sight_words', 2,
    'Rohan looked "under" his desk. The word "under" means...',
    ['below something', 'beside a wall', 'behind a door', 'above a shelf'],
    'below something',
    'Point to the floor: that is under your desk.',
    '<b>Below something</b> — under means lower down than a thing.');

  ask(24, 'pencil', 'reading_comprehension', 2,
    'What is the BEST title for this passage?',
    ['The missing pencil', 'The noisy classroom', 'The broken window', 'The rainy morning'],
    'The missing pencil',
    'Which thing does everyone in the passage look for?',
    '<b>The missing pencil</b> — the whole passage is the search for it.');

  // Passage 7: the crowded bus
  ask(25, 'bus', 'reading_comprehension', 1,
    'What was the old lady carrying?',
    ['Two heavy baskets', 'Two small boxes', 'Two long sticks', 'Two blue bags'],
    'Two heavy baskets',
    'The passage says what she got on the bus with.',
    '<b>Two heavy baskets</b> — the passage says so.');

  ask(26, 'bus', 'reading_comprehension', 2,
    'Why did Priya stand up?',
    ['She wanted to help the lady', 'She was getting off the bus', 'She had dropped her ticket', 'She wanted to see the road'],
    'She wanted to help the lady',
    'The passage does not say why. Who needed the seat more?',
    '<b>She wanted to help the lady</b> — the old lady had heavy baskets to hold.');

  ask(27, 'bus', 'sight_words', 2,
    'The lady "said" thank you. Which word could take the place of "said"?',
    ['told', 'took', 'made', 'kept'],
    'told',
    'Which one of these words is about speaking?',
    '<b>Told</b> — said and told are both about speaking.');

  ask(28, 'bus', 'reading_comprehension', 2,
    'What is this passage MAINLY about?',
    ['A girl is kind on a bus', 'A girl buys a new basket', 'A girl walks home alone', 'A girl waits for a train'],
    'A girl is kind on a bus',
    'Think about the one thing Priya chose to do.',
    '<b>A girl is kind on a bus</b> — she gave up her seat for someone else.');

  // Passage 8: after the rain
  ask(29, 'garden', 'reading_comprehension', 1,
    'What had Ravi planted last month?',
    ['Some seeds', 'Some stones', 'Some sticks', 'Some shells'],
    'Some seeds',
    'The passage tells you what he put in the soil.',
    '<b>Some seeds</b> — he had planted seeds a month before.');

  ask(30, 'garden', 'reading_comprehension', 2,
    'Why did Ravi run to call his father?',
    ['He was excited about the shoots', 'He was afraid of the dark soil', 'He was late for his dinner', 'He was looking for a spade'],
    'He was excited about the shoots',
    'The passage never says why. What good news had he just seen?',
    '<b>He was excited about the shoots</b> — his seeds had begun to grow.');

  ask(31, 'garden', 'reading_comprehension', 2,
    'In this passage, "shoots" means...',
    ['new baby plants', 'small round stones', 'long garden tools', 'wet brown leaves'],
    'new baby plants',
    'They were green and pushing up where seeds were planted.',
    '<b>New baby plants</b> — shoots are the first green parts to appear.');

  ask(32, 'garden', 'reading_comprehension', 2,
    'What is this passage MAINLY about?',
    ['Seeds start to grow', 'A boy finds a bird', 'Rain fills a bucket', 'A man digs a hole'],
    'Seeds start to grow',
    'What made this morning different from other mornings?',
    '<b>Seeds start to grow</b> — the shoots showed the seeds had come up.');
})();
