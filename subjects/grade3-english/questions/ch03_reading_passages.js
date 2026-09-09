'use strict';
// Grade 3 English — Reading: longer comprehension passages.
// IDs: g3eng-pass-001 … g3eng-pass-048
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09: g3eng-reading held 75 items over 44 passages, and those
// passages ran 9 to 37 words — the longest was two sentences. A Grade 3 child
// sitting a comprehension exercise reads a paragraph and holds it in their head
// while answering several questions about it, which is a different skill from
// finding a fact in one sentence.
//
// TWELVE passages of 55-85 words, FOUR questions each, and the four are
// deliberately different kinds of work:
//   1. LITERAL      — the answer is in the text, stated
//   2. INFERENCE    — the answer is implied; the text never says it
//   3. VOCABULARY   — a word's meaning decided by its context, not a definition
//   4. MAIN IDEA / SEQUENCE — what the whole passage is about, or what order
//
// ⚠ The passage is repeated in every question that uses it, matching
//   ch03_reading.js. The child must be able to see the text while answering,
//   and there is no passage-header mechanism in the renderer.
//
// ⚠ makeMCQ SHUFFLES its options, so authoring answer-first positions nothing.
//   What matters is that all four stay the same grammatical shape and a similar
//   length — `scripts/test-option-parity.js` catches length leaks, and a child
//   who spots the long option is not reading. This pack carries pre-existing
//   length debt in its listening and speaking chapters; these items were
//   written to sit inside the limit so they do not add to it.
//
// ⚠ Settings are Mauritian and everyday on purpose: a market in Port Louis, a
//   cyclone warning, sega drums, a bus to Curepipe. A child should not have to
//   decode an unfamiliar world before they can decode the sentence.
//
// ⚠ Difficulty stays 1-2, matching the rest of this pack. grade3-english is a
//   `noDifficulty: true` pack, so no level is ever shown — but the labels stay
//   honest anyway rather than being set to whatever looks impressive.

(function () {

  const P = {
    market: 'Every Saturday, Aashi goes to the market in Port Louis with her grandmother. The stalls are piled high with mangoes, lychees and pineapples. Her grandmother always stops at the same fruit seller, an old man called Mr Rama, who saves the sweetest pineapples for her. Aashi carries the basket home, though it grows heavier with every step. She never complains, because she knows there will be fresh juice at lunch.',
    cyclone: 'On Thursday the radio announced a Class 3 cyclone warning. Devan helped his father tape the windows and carry the garden chairs inside. His mother filled every bottle in the house with water and checked that the torch still worked. By evening the wind was howling and the rain hammered on the roof. Devan could not sleep, but he felt safe, because the family had prepared together all afternoon.',
    sega: 'The drums began just after sunset. Neha watched her aunt tie a bright red skirt and step into the circle of dancers. The ravanne, a flat round drum made of goatskin, set the rhythm, and soon everybody was clapping. Neha was too shy to dance at first. Then her aunt reached out a hand, and before she knew it Neha was in the middle of the circle, laughing.',
    bus: 'The bus to Curepipe was already full when Rohan climbed on. He squeezed into a corner near the window and held his school bag on his lap. An elderly woman got on two stops later, carrying two heavy bags. Nobody moved. Rohan stood up and offered her his seat, even though the journey was long and his legs ached by the end of it. The woman thanked him at every stop.',
    dodo: 'The dodo was a large bird that once lived only in Mauritius. It could not fly, because it had no need to escape from anything: for thousands of years the island had no cats, dogs or rats. When sailors arrived, they brought those animals with them. The dodo had never learned to hide or run, and within a hundred years not a single one was left alive.',
    garden: 'Kavi planted three tomato seedlings behind the kitchen. He watered them every morning before school and pulled out the weeds that crowded around their stems. For two weeks nothing seemed to happen. Kavi grew impatient and almost gave up. Then, one Sunday, he found tiny yellow flowers on the tallest plant, and he understood that the growing had been happening all along, under the soil where he could not see it.',
    reef: 'A coral reef looks like a rock, but it is alive. It is built by thousands of tiny animals called polyps, each no bigger than a grain of rice. Together, over hundreds of years, they build the walls that shelter fish, crabs and turtles. If the sea grows too warm, the coral turns white and stops growing. Many people in Mauritius now work to keep the water around the reefs clean.',
    library: 'The new library opened in the village on a Monday. Priya was the first child through the door. She had expected a small room with a few shelves, but the ceiling was high and the shelves ran all the way to the back wall. A librarian showed her how to use the catalogue to find a book by its subject. Priya borrowed three books and read the first one before dinner.',
    rain: 'It had not rained for six weeks. The sugar cane in the fields had turned pale and the stream behind the school was almost dry. Farmers watched the sky every evening. On the first day of December the clouds finally gathered, dark and low, and the rain came down so hard that the children ran outside to stand in it. Nobody minded getting wet.',
    bake: 'Mrs Appadoo teaches baking at the community centre every Wednesday. First she weighs the flour and the sugar. Next she shows the children how to rub the butter in with their fingertips until the mixture looks like breadcrumbs. Only then does she add the milk. She says the order matters more than the speed, and that a cake rushed is a cake ruined. Her students always leave with something to carry home.',
    turtle: 'Every year, green turtles swim thousands of kilometres to lay their eggs on the beach where they were born. The female digs a deep hole in the sand at night, lays her eggs and covers them carefully before returning to the sea. She never sees her young. When the baby turtles hatch, they must find their own way down the sand to the water, and very few of them survive the journey.',
    football: 'Yusuf had practised his free kicks every evening for a month. On the day of the match, his team was losing by one goal with five minutes left. The referee awarded a free kick just outside the box. Yusuf placed the ball, stepped back and struck it exactly as he had practised. It curved over the wall and into the net. His team still lost, but nobody stopped talking about that kick.',
  };

  const ask = (n, key, sub, diff, q, opts, ans, hint, exp) => STATIC_QUESTIONS.push(
    makeMCQ({ id: `g3eng-pass-${String(n).padStart(3, '0')}`, chapterId: 'g3eng-reading',
      difficulty: diff, subsection: sub,
      question: `Read: "${P[key]}"<br><br>${q}`,
      options: opts, answer: ans, hint, explanation: exp }));

  // ── 1. The market ─────────────────────────────────────────────────────────
  ask(1, 'market', 'reading_comprehension', 1, 'Who saves the sweetest pineapples for Aashi\'s grandmother?',
    ['Mr Rama, the fruit seller', 'Aashi, the granddaughter', 'A woman at the bus stop', 'The man selling lychees'],
    'Mr Rama, the fruit seller', 'The passage names him.',
    '<b>Mr Rama, the fruit seller</b> — the passage says her grandmother always stops at the same fruit seller, "an old man called Mr Rama, who saves the sweetest pineapples for her".');
  ask(2, 'market', 'reading_comprehension', 2, 'Why does the basket grow heavier with every step?',
    ['Because Aashi is getting tired', 'Because more fruit is added', 'Because the basket is broken', 'Because her grandmother helps'],
    'Because Aashi is getting tired', 'The passage does not say this directly — think about what carrying something does to your arms.',
    '<b>Because Aashi is getting tired</b> — the basket does not change weight. It only feels heavier as she tires, which is why she "never complains" even though it is hard.');
  ask(3, 'market', 'vocabulary_context', 2, 'In this passage, "piled high" tells you the stalls were ___.',
    ['stacked full of fruit', 'built to be very tall', 'placed up on a hill', 'painted a bright colour'],
    'stacked full of fruit', 'Look at what the stalls are piled high WITH.',
    '<b>Stacked full of fruit</b> — "piled high with mangoes, lychees and pineapples" describes how much fruit is heaped on the stalls, not how tall the stalls are.');
  ask(4, 'market', 'reading_comprehension', 2, 'What is this passage MOSTLY about?',
    ['A Saturday trip with her grandmother', 'How to choose a ripe pineapple', 'The history of the fruit market', 'Why fresh juice is good for you'],
    'A Saturday trip with her grandmother', 'Ask what the whole passage is about, not one detail in it.',
    '<b>A Saturday trip with her grandmother</b> — every sentence is part of that one outing. The juice and the pineapples are details inside it.');

  // ── 2. The cyclone ────────────────────────────────────────────────────────
  ask(5, 'cyclone', 'reading_comprehension', 1, 'What did Devan\'s mother do to prepare?',
    ['Filled the bottles and checked the torch', 'Taped the windows and moved the chairs', 'Listened to the radio all afternoon', 'Went out to buy a brand new torch'],
    'Filled the bottles and checked the torch', 'One sentence lists exactly what she did.',
    '<b>Filled the bottles and checked the torch</b> — the passage gives this as her two jobs. Taping the windows was Devan and his father.');
  ask(6, 'cyclone', 'reading_comprehension', 2, 'Why did Devan feel safe even though he could not sleep?',
    ['Because the family had prepared together', 'Because the cyclone had passed by then', 'Because the radio said it was over', 'Because the rain had finally stopped'],
    'Because the family had prepared together', 'The last sentence explains his feeling.',
    '<b>Because the family had prepared together</b> — the passage links the two directly: he felt safe "because the family had prepared together all afternoon".');
  ask(7, 'cyclone', 'vocabulary_context', 2, 'As used here, "hammered" means the rain ___.',
    ['hit the roof hard and loudly', 'fixed a hole in the roof', 'fell in a gentle drizzle', 'stopped for a short while'],
    'hit the roof hard and loudly', 'A hammer hits something hard. What is the rain doing to the roof?',
    '<b>Hit the roof hard and loudly</b> — "hammered" is used to describe heavy rain striking the roof, matching the howling wind in the same sentence.');
  ask(8, 'cyclone', 'reading_comprehension', 2, 'Which happened FIRST in the passage?',
    ['The radio announced the warning', 'The wind began to howl loudly', 'The garden chairs came inside', 'The bottles were filled with water'],
    'The radio announced the warning', 'Look for the event the others follow from.',
    '<b>The radio announced the warning</b> — it comes on Thursday, and everything else in the passage happens because of it.');

  // ── 3. The sega ───────────────────────────────────────────────────────────
  ask(9, 'sega', 'reading_comprehension', 1, 'What is the ravanne?',
    ['A flat round drum of goatskin', 'A bright red skirt for dancing', 'A circle drawn on the ground', 'A song sung after sunset'],
    'A flat round drum of goatskin', 'The passage explains the word for you.',
    '<b>A flat round drum of goatskin</b> — the passage defines it in the same sentence it is named.');
  ask(10, 'sega', 'reading_comprehension', 2, 'How did Neha\'s feelings change during the evening?',
    ['From shy to joyful', 'From bored to sleepy', 'From angry to calm', 'From frightened to shy'],
    'From shy to joyful', 'Compare how she is at the start with how she is at the end.',
    '<b>From shy to joyful</b> — she is "too shy to dance at first" and ends up "in the middle of the circle, laughing".');
  ask(11, 'sega', 'vocabulary_context', 2, 'In this passage, "set the rhythm" means the drum ___.',
    ['gave everyone a beat to follow', 'was placed down on the ground', 'was tuned before the dancing', 'stopped the dancers from moving'],
    'gave everyone a beat to follow', 'What happens right after the drum does it?',
    '<b>Gave everyone a beat to follow</b> — "soon everybody was clapping" tells you the drum was leading the beat.');
  ask(12, 'sega', 'reading_comprehension', 2, 'What made Neha finally join the dancing?',
    ['Her aunt reached out a hand', 'The drums grew much louder', 'The other children laughed at her', 'Her aunt gave her a red skirt'],
    'Her aunt reached out a hand', 'One small action changes everything.',
    '<b>Her aunt reached out a hand</b> — the passage puts this immediately before "before she knew it Neha was in the middle of the circle".');

  // ── 4. The bus ────────────────────────────────────────────────────────────
  ask(13, 'bus', 'reading_comprehension', 1, 'Where did Rohan sit when he first got on?',
    ['In a corner near the window', 'Next to the elderly woman', 'At the very back of the bus', 'Beside the driver at the front'],
    'In a corner near the window', 'The second sentence says where he squeezed in.',
    '<b>In a corner near the window</b> — "He squeezed into a corner near the window and held his school bag on his lap."');
  ask(14, 'bus', 'reading_comprehension', 2, 'What does Rohan\'s action tell you about him?',
    ['He is thoughtful towards others', 'He does not like sitting down', 'He was getting off very soon', 'He wanted to see out of the window'],
    'He is thoughtful towards others', 'The passage never uses a word for his character. Work it out from what he does.',
    '<b>He is thoughtful towards others</b> — he gives up his seat although "the journey was long and his legs ached by the end of it", so it cost him something.');
  ask(15, 'bus', 'vocabulary_context', 2, 'As used here, "squeezed" tells you there was ___.',
    ['very little space on the bus', 'juice being made at the back', 'a tight grip on his school bag', 'a loud noise from the engine'],
    'very little space on the bus', 'The sentence before it describes how full the bus was.',
    '<b>Very little space on the bus</b> — the bus "was already full", so Rohan had to press into a small gap.');
  ask(16, 'bus', 'reading_comprehension', 2, 'What is the BEST title for this passage?',
    ['A Kind Act on a Crowded Bus', 'The Long Road to Curepipe', 'How to Carry Two Heavy Bags', 'Rohan Misses His School Bus'],
    'A Kind Act on a Crowded Bus', 'A good title covers the whole passage, not one detail.',
    '<b>A Kind Act on a Crowded Bus</b> — the crowd and the kindness together are what the passage is about.');

  // ── 5. The dodo ───────────────────────────────────────────────────────────
  ask(17, 'dodo', 'reading_comprehension', 1, 'Where did the dodo live?',
    ['Only in Mauritius', 'On many nearby islands', 'On ships from Europe', 'In the forests of Africa'],
    'Only in Mauritius', 'The first sentence tells you.',
    '<b>Only in Mauritius</b> — "The dodo was a large bird that once lived only in Mauritius."');
  ask(18, 'dodo', 'reading_comprehension', 2, 'Why was being unable to fly NOT a problem at first?',
    ['Nothing on the island hunted it', 'It could swim instead of flying', 'It was too large to be caught', 'It ran faster than the sailors'],
    'Nothing on the island hunted it', 'The passage gives a reason in the same sentence.',
    '<b>Nothing on the island hunted it</b> — "it had no need to escape from anything: for thousands of years the island had no cats, dogs or rats".');
  ask(19, 'dodo', 'vocabulary_context', 2, 'Here, "not a single one was left alive" means the dodo ___.',
    ['had died out completely', 'had moved to another island', 'was very hard to find', 'lived alone from then on'],
    'had died out completely', 'Think about what "not a single one" means.',
    '<b>Had died out completely</b> — none at all remained, which is what it means for a kind of animal to die out.');
  ask(20, 'dodo', 'reading_comprehension', 2, 'What does the passage suggest caused the dodo to disappear?',
    ['Animals brought by the sailors', 'A long period without any rain', 'The birds flying off the island', 'A change in the island plants'],
    'Animals brought by the sailors', 'Look at what changed on the island.',
    '<b>Animals brought by the sailors</b> — the sailors "brought those animals with them" and the dodo "had never learned to hide or run".');

  // ── 6. The garden ─────────────────────────────────────────────────────────
  ask(21, 'garden', 'reading_comprehension', 1, 'What did Kavi do every morning before school?',
    ['Watered the plants and weeded them', 'Counted the flowers on each plant', 'Planted a new row of tomatoes', 'Moved the plants into the sunshine'],
    'Watered the plants and weeded them', 'One sentence lists both jobs.',
    '<b>Watered the plants and weeded them</b> — "He watered them every morning before school and pulled out the weeds that crowded around their stems."');
  ask(22, 'garden', 'reading_comprehension', 2, 'What did Kavi learn at the end of the passage?',
    ['Growth happens where you cannot see', 'Tomatoes need much less water', 'Weeds help young plants grow tall', 'Sunday is the best day to garden'],
    'Growth happens where you cannot see', 'The last sentence tells you what he understood.',
    '<b>Growth happens where you cannot see</b> — "the growing had been happening all along, under the soil where he could not see it".');
  ask(23, 'garden', 'vocabulary_context', 2, 'As used here, "impatient" means Kavi ___.',
    ['was tired of waiting', 'was working very hard', 'was pleased with the plants', 'was careful with the weeds'],
    'was tired of waiting', 'Look at what had been happening for two weeks.',
    '<b>Was tired of waiting</b> — nothing had seemed to happen for two weeks, so he "almost gave up".');
  ask(24, 'garden', 'reading_comprehension', 2, 'Which happened LAST in the passage?',
    ['Kavi found tiny yellow flowers', 'Kavi planted three seedlings', 'Kavi almost gave up hope', 'Kavi pulled out the weeds'],
    'Kavi found tiny yellow flowers', 'Follow the order the passage tells the story in.',
    '<b>Kavi found tiny yellow flowers</b> — this comes on "one Sunday", after the two weeks of waiting and nearly giving up.');

  // ── 7. The reef ───────────────────────────────────────────────────────────
  ask(25, 'reef', 'reading_comprehension', 1, 'What are polyps?',
    ['Tiny animals that build the reef', 'Small fish that live in the reef', 'Grains of sand around the coral', 'Warm currents moving in the sea'],
    'Tiny animals that build the reef', 'The passage explains the word where it first appears.',
    '<b>Tiny animals that build the reef</b> — "built by thousands of tiny animals called polyps, each no bigger than a grain of rice".');
  ask(26, 'reef', 'reading_comprehension', 2, 'Why does the passage say a reef "looks like a rock, but it is alive"?',
    ['Living animals built it and live in it', 'It is made of very hard stone', 'It moves slowly across the sea floor', 'It changes its colour every year'],
    'Living animals built it and live in it', 'The sentences after it explain the contrast.',
    '<b>Living animals built it and live in it</b> — polyps build the walls, and fish, crabs and turtles shelter there.');
  ask(27, 'reef', 'vocabulary_context', 2, 'In this passage, "shelter" means the walls ___.',
    ['keep the animals safe', 'block the sunlight out', 'grow taller each year', 'cool the sea water down'],
    'keep the animals safe', 'Think about what walls do for the fish, crabs and turtles.',
    '<b>Keep the animals safe</b> — the reef gives them a protected place to live.');
  ask(28, 'reef', 'reading_comprehension', 2, 'What happens to coral if the sea grows too warm?',
    ['It turns white and stops growing', 'It grows much faster than usual', 'It sinks to the bottom of the sea', 'It turns into an ordinary rock'],
    'It turns white and stops growing', 'One sentence states the result exactly.',
    '<b>It turns white and stops growing</b> — the passage states this directly, which is why people work to keep the water clean.');

  // ── 8. The library ────────────────────────────────────────────────────────
  ask(29, 'library', 'reading_comprehension', 1, 'How many books did Priya borrow?',
    ['Three', 'One', 'Two', 'Four'],
    'Three', 'The last sentence tells you.',
    '<b>Three</b> — "Priya borrowed three books and read the first one before dinner."');
  ask(30, 'library', 'reading_comprehension', 2, 'How was the library different from what Priya expected?',
    ['It was much bigger than she thought', 'It opened later than she had hoped', 'It had fewer books than her school', 'It was closed on the day she went'],
    'It was much bigger than she thought', 'Compare what she expected with what she found.',
    '<b>It was much bigger than she thought</b> — she expected "a small room with a few shelves" but the ceiling was high and the shelves ran to the back wall.');
  ask(31, 'library', 'vocabulary_context', 2, 'A "catalogue" in this passage is used to ___.',
    ['find a book by its subject', 'borrow a book for two weeks', 'record who joined the library', 'show which books are the newest'],
    'find a book by its subject', 'The sentence says what the librarian showed her how to do with it.',
    '<b>Find a book by its subject</b> — "A librarian showed her how to use the catalogue to find a book by its subject."');
  ask(32, 'library', 'reading_comprehension', 2, 'What is this passage MOSTLY about?',
    ['Priya\'s first visit to the library', 'How a library catalogue works', 'Why villages need more books', 'A librarian\'s working day'],
    'Priya\'s first visit to the library', 'Choose what covers the whole passage.',
    '<b>Priya\'s first visit to the library</b> — the opening, the surprise and the borrowing are all part of that one visit.');

  // ── 9. The rain ───────────────────────────────────────────────────────────
  ask(33, 'rain', 'reading_comprehension', 1, 'How long had it not rained?',
    ['Six weeks', 'Six days', 'Two months', 'One year'],
    'Six weeks', 'The very first sentence says.',
    '<b>Six weeks</b> — "It had not rained for six weeks."');
  ask(34, 'rain', 'reading_comprehension', 2, 'Why did the farmers watch the sky every evening?',
    ['They were hoping for rain', 'They were counting the birds', 'They were checking the time', 'They were afraid of a cyclone'],
    'They were hoping for rain', 'The passage does not say why. Think about what the farmers needed.',
    '<b>They were hoping for rain</b> — the cane had turned pale and the stream was nearly dry, so rain was what their fields needed.');
  ask(35, 'rain', 'vocabulary_context', 2, 'As used here, "pale" tells you the sugar cane was ___.',
    ['losing its healthy colour', 'growing taller than usual', 'ready to be harvested now', 'covered in small white flowers'],
    'losing its healthy colour', 'What would six weeks without rain do to a plant?',
    '<b>Losing its healthy colour</b> — the drought had drained the colour from the cane, a sign the plants were suffering.');
  ask(36, 'rain', 'reading_comprehension', 2, 'Why did nobody mind getting wet?',
    ['The rain was badly needed', 'The water was pleasantly warm', 'School had finished for the day', 'They were all wearing raincoats'],
    'The rain was badly needed', 'Think about how long they had waited.',
    '<b>The rain was badly needed</b> — after six dry weeks the rain was welcome, so being soaked did not matter.');

  // ── 10. The baking class ──────────────────────────────────────────────────
  ask(37, 'bake', 'reading_comprehension', 1, 'What does Mrs Appadoo do FIRST?',
    ['Weighs the flour and the sugar', 'Rubs the butter in with fingertips', 'Adds the milk to the mixture', 'Sends the children home with cake'],
    'Weighs the flour and the sugar', 'The passage uses the word "First".',
    '<b>Weighs the flour and the sugar</b> — "First she weighs the flour and the sugar."');
  ask(38, 'bake', 'reading_comprehension', 2, 'What does Mrs Appadoo believe matters most?',
    ['Doing each step in the right order', 'Finishing the baking very quickly', 'Using the most expensive butter', 'Letting the children work alone'],
    'Doing each step in the right order', 'She says it herself, near the end.',
    '<b>Doing each step in the right order</b> — "the order matters more than the speed, and a cake rushed is a cake ruined".');
  ask(39, 'bake', 'vocabulary_context', 2, 'Here, "until the mixture looks like breadcrumbs" tells the children ___.',
    ['when to stop rubbing the butter', 'which mixing bowl they should use', 'how much milk they should pour', 'where to put the finished cake'],
    'when to stop rubbing the butter', 'It describes what the mixture should look like at that moment.',
    '<b>When to stop rubbing the butter</b> — the look of the mixture is the sign that the step is done.');
  ask(40, 'bake', 'reading_comprehension', 2, 'What happens AFTER the butter is rubbed in?',
    ['The milk is added', 'The sugar is weighed', 'The flour is measured', 'The cake is decorated'],
    'The milk is added', 'Follow the order of the steps given.',
    '<b>The milk is added</b> — "Only then does she add the milk," meaning after the butter step.');

  // ── 11. The turtles ───────────────────────────────────────────────────────
  ask(41, 'turtle', 'reading_comprehension', 1, 'When does the female turtle dig her hole?',
    ['At night', 'At sunrise', 'In the afternoon', 'During a storm'],
    'At night', 'One sentence gives the time exactly.',
    '<b>At night</b> — "The female digs a deep hole in the sand at night."');
  ask(42, 'turtle', 'reading_comprehension', 2, 'Why does the mother turtle never see her young?',
    ['She goes back to sea before they hatch', 'She lays her eggs in the wrong place', 'The baby turtles hatch during the night', 'She swims to a completely different beach'],
    'She goes back to sea before they hatch', 'Look at what she does after covering the eggs.',
    '<b>She goes back to sea before they hatch</b> — she covers the eggs and returns to the water, so she is gone when they hatch.');
  ask(43, 'turtle', 'vocabulary_context', 2, 'As used here, "hatch" means the baby turtles ___.',
    ['come out of their eggs', 'dig a hole in the sand', 'swim back to the beach', 'grow their first shell'],
    'come out of their eggs', 'The eggs were laid earlier in the passage.',
    '<b>Come out of their eggs</b> — hatching is the moment the young break out of the eggs the mother buried.');
  ask(44, 'turtle', 'reading_comprehension', 2, 'What does the passage suggest about the young turtles\' journey?',
    ['It is dangerous for most of them', 'It is short and easily done', 'Their mother guides them down', 'They travel it in the daytime'],
    'It is dangerous for most of them', 'The last few words tell you how many survive.',
    '<b>It is dangerous for most of them</b> — "very few of them survive the journey" down the sand to the water.');

  // ── 12. The free kick ─────────────────────────────────────────────────────
  ask(45, 'football', 'reading_comprehension', 1, 'How long had Yusuf practised his free kicks?',
    ['Every evening for a month', 'Every morning for a week', 'Only on the match days', 'For five minutes each day'],
    'Every evening for a month', 'The first sentence tells you.',
    '<b>Every evening for a month</b> — "Yusuf had practised his free kicks every evening for a month."');
  ask(46, 'football', 'reading_comprehension', 2, 'Why does the passage mention the month of practice first?',
    ['To explain why the kick went in', 'To show he was tired before it', 'To explain why his team lost', 'To show the match was important'],
    'To explain why the kick went in', 'Think about why the writer tells you this before the match.',
    '<b>To explain why the kick went in</b> — he "struck it exactly as he had practised", so the practice is what made the kick possible.');
  ask(47, 'football', 'vocabulary_context', 2, 'In this passage, "curved" describes how the ball ___.',
    ['bent through the air', 'bounced off the ground', 'rolled along the grass', 'stopped before the net'],
    'bent through the air', 'It had to get past a wall of players.',
    '<b>Bent through the air</b> — the ball travelled in a curve "over the wall and into the net".');
  ask(48, 'football', 'reading_comprehension', 2, 'What is surprising about the ending?',
    ['They lost but the kick was remembered', 'Yusuf scored from outside the box', 'The referee awarded a free kick', 'The match lasted only five minutes'],
    'They lost but the kick was remembered', 'Compare the result with how people reacted.',
    '<b>They lost but the kick was remembered</b> — "His team still lost, but nobody stopped talking about that kick."');

})();
