'use strict';
// @enrichment - Bonus chapter "Joining Sentences". DERIVED from the syllabus
// (conjunctions, relative pronouns, sentence types), NOT a direct MIE chapter.
// DO NOT remove during syllabus alignment audits.
//
// Grade 4 level: who / which / where, and the everyday conjunctions. "whose",
// "although" and non-defining clauses arrive in Grade 5 and Grade 6, which
// carry the same five subsections so the same five ideas come back harder.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'g4eng-enr-joining';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g4eng-join-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Join the two sentences using « <b>${given}</b> ». `
        + `Make any changes that are needed.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · RELATIVE PRONOUNS ───────────────────────────────────────────────
  J('relative', 1, 'who', 'I know the boy.', 'The boy won the race.',
    'I know the boy who won the race.',
    ['I know the boy which won the race.',
     'I know the boy where won the race.',
     'I know the boy who he won the race.'],
    'Use "who" for people.',
    '<b>who</b> is used for people and replaces the subject. We do not add "he" after it.');

  J('relative', 2, 'which', 'The bag is heavy.', 'The bag is on the table.',
    'The bag which is on the table is heavy.',
    ['The bag who is on the table is heavy.',
     'The bag where is on the table is heavy.',
     'The bag which the bag is on the table is heavy.'],
    'Use "which" for things.',
    '<b>which</b> is used for things. The relative clause sits right after the noun it describes.');

  J('relative', 2, 'where', 'This is the shop.', 'We buy our bread at this shop.',
    'This is the shop where we buy our bread.',
    ['This is the shop which we buy our bread.',
     'This is the shop who we buy our bread.',
     'This is the shop where we buy our bread at this shop.'],
    'A place → "where".',
    '<b>where</b> replaces a phrase about a place. The repeated words disappear.');

  J('relative', 1, 'who', 'I have a friend.', 'My friend lives in Rose Hill.',
    'I have a friend who lives in Rose Hill.',
    ['I have a friend which lives in Rose Hill.',
     'I have a friend where lives in Rose Hill.',
     'I have a friend who my friend lives in Rose Hill.'],
    'The friend does the living.',
    'The friend is the subject of "lives", so we use <b>who</b>, followed straight by the verb.');

  J('relative', 2, 'which', 'The film was funny.', 'We watched the film.',
    'The film which we watched was funny.',
    ['The film who we watched was funny.',
     'The film where we watched was funny.',
     'The film which we watched the film was funny.'],
    'The relative clause goes right after the noun.',
    '"The film" is the object of "watched", so <b>which</b> replaces it and the noun is not repeated.');

  J('relative', 2, 'where', 'That is the beach.', 'We swam at that beach.',
    'That is the beach where we swam.',
    ['That is the beach which we swam.',
     'That is the beach who we swam.',
     'That is the beach where we swam at that beach.'],
    'We are talking about a place.',
    'For a place we use <b>where</b>, and we drop "at that beach".');

  J('relative', 3, 'who', 'The lady is my teacher.', 'The lady is wearing a blue dress.',
    'The lady who is wearing a blue dress is my teacher.',
    ['The lady which is wearing a blue dress is my teacher.',
     'The lady who she is wearing a blue dress is my teacher.',
     'The lady is my teacher who is wearing a blue dress the lady.'],
    'The description slots in before the main verb.',
    'The clause "<b>who is wearing a blue dress</b>" describes the lady and goes between the noun and "is my teacher".');

  J('relative', 2, 'which', 'I lost the pen.', 'My uncle gave me the pen.',
    'I lost the pen which my uncle gave me.',
    ['I lost the pen who my uncle gave me.',
     'I lost the pen where my uncle gave me.',
     'I lost the pen which my uncle gave me the pen.'],
    'A pen is a thing.',
    '<b>which</b> is used for things, and the repeated "the pen" is removed.');

  J('relative', 3, 'who', 'The men are fishermen.', 'The men are mending the nets.',
    'The men who are mending the nets are fishermen.',
    ['The men which are mending the nets are fishermen.',
     'The men where are mending the nets are fishermen.',
     'The men who they are mending the nets are fishermen.'],
    'Put the clause straight after "the men".',
    'The relative clause describes the men and must come before the main verb "are fishermen".');

  J('relative', 4, 'where', 'I remember the classroom.', 'I learnt to read in that classroom.',
    'I remember the classroom where I learnt to read.',
    ['I remember the classroom which I learnt to read.',
     'I remember the classroom who I learnt to read.',
     'I remember the classroom where I learnt to read in that classroom.'],
    'A room is a place.',
    '<b>where</b> replaces "in that classroom" - the preposition goes too.');

  // ── 2 · CAUSE & REASON ──────────────────────────────────────────────────
  J('cause', 1, 'because', 'I wore my raincoat.', 'It was raining.',
    'I wore my raincoat because it was raining.',
    ['Because I wore my raincoat, it was raining.',
     'I wore because my raincoat it was raining.',
     'It was raining because I wore my raincoat.'],
    '"because" comes before the REASON.',
    'The rain is the reason for the raincoat, so it goes after <b>because</b>.');

  J('cause', 1, 'because', 'The dog is barking.', 'It heard a noise.',
    'The dog is barking because it heard a noise.',
    ['Because the dog is barking, it heard a noise.',
     'The dog because is barking it heard a noise.',
     'It heard a noise because the dog is barking.'],
    'Which sentence explains the other?',
    'The noise explains the barking, so it is the <b>reason</b> and follows "because".');

  J('cause', 2, 'so', 'The shop was closed.', 'We went home.',
    'The shop was closed, so we went home.',
    ['So the shop was closed, we went home.',
     'The shop so was closed we went home.',
     'We went home, so the shop was closed.'],
    '"so" introduces the RESULT.',
    'Going home is the <b>result</b> of the shop being closed, so it follows "so".');

  J('cause', 2, 'because', 'We stayed indoors.', 'The sun was too hot.',
    'We stayed indoors because the sun was too hot.',
    ['Because we stayed indoors, the sun was too hot.',
     'We stayed because indoors the sun was too hot.',
     'The sun was too hot because we stayed indoors.'],
    'The heat is the reason.',
    'The reason always follows <b>because</b> - the sun did not get hot because we stayed in!');

  J('cause', 2, 'so', 'It started to rain.', 'We opened our umbrellas.',
    'It started to rain, so we opened our umbrellas.',
    ['So it started to rain, we opened our umbrellas.',
     'It started so to rain we opened our umbrellas.',
     'We opened our umbrellas, so it started to rain.'],
    'What happened as a result?',
    'Opening the umbrellas is the <b>result</b>, so it comes after "so".');

  J('cause', 2, 'because', 'Ravi was late for school.', 'He missed the bus.',
    'Ravi was late for school because he missed the bus.',
    ['Because Ravi was late for school, he missed the bus.',
     'Ravi was because late for school he missed the bus.',
     'He missed the bus because Ravi was late for school.'],
    'Missing the bus came first.',
    'The missed bus is the <b>reason</b> for being late, so it follows "because".');

  J('cause', 2, 'so', 'My pencil broke.', 'I borrowed one from Anya.',
    'My pencil broke, so I borrowed one from Anya.',
    ['So my pencil broke, I borrowed one from Anya.',
     'My pencil so broke I borrowed one from Anya.',
     'I borrowed one from Anya, so my pencil broke.'],
    'Comma, then "so", then the result.',
    'Borrowing a pencil is what happened <b>as a result</b> of the break.');

  J('cause', 2, 'because', 'The plants are growing well.', 'We water them every day.',
    'The plants are growing well because we water them every day.',
    ['Because the plants are growing well, we water them every day.',
     'The plants because are growing well we water them every day.',
     'We water them every day because the plants are growing well.'],
    'Watering explains the growing.',
    'The watering is the <b>reason</b>, so it comes after "because".');

  J('cause', 3, 'because', 'The beach was empty.', 'The weather was cold.',
    'The beach was empty because the weather was cold.',
    ['Because the beach was empty, the weather was cold.',
     'The beach was empty, the weather because was cold.',
     'The weather was cold because the beach was empty.'],
    'Weather does not depend on beaches.',
    'The cold weather is the <b>cause</b>; the empty beach is the effect.');

  J('cause', 2, 'so', 'I finished my homework early.', 'I watched television.',
    'I finished my homework early, so I watched television.',
    ['So I finished my homework early, I watched television.',
     'I finished so my homework early I watched television.',
     'I watched television, so I finished my homework early.'],
    'Which one happened second?',
    'Watching television is the <b>result</b> of finishing early.');

  // ── 3 · CONTRAST ────────────────────────────────────────────────────────
  J('contrast', 1, 'but', 'The bag was heavy.', 'I carried it home.',
    'The bag was heavy, but I carried it home.',
    ['But the bag was heavy, I carried it home.',
     'The bag but was heavy I carried it home.',
     'The bag was heavy I carried but it home.'],
    '"but" goes after the comma, in the middle.',
    '<b>but</b> joins two opposite ideas and does not begin the sentence.');

  J('contrast', 1, 'but', 'The cake was small.', 'It tasted delicious.',
    'The cake was small, but it tasted delicious.',
    ['But the cake was small, it tasted delicious.',
     'The cake but was small it tasted delicious.',
     'The cake was small, it but tasted delicious.'],
    'Comma, then "but".',
    'The second idea corrects the first: small<b>, but</b> delicious.');

  J('contrast', 2, 'but', 'I looked everywhere.', 'I could not find my key.',
    'I looked everywhere, but I could not find my key.',
    ['But I looked everywhere, I could not find my key.',
     'I looked but everywhere I could not find my key.',
     'I looked everywhere, I could but not find my key.'],
    'The result is the opposite of the effort.',
    'Looking everywhere should have worked; <b>but</b> signals the surprise.');

  J('contrast', 2, 'but', 'The sea looked calm.', 'The waves were strong.',
    'The sea looked calm, but the waves were strong.',
    ['But the sea looked calm, the waves were strong.',
     'The sea but looked calm the waves were strong.',
     'The sea looked calm, the waves but were strong.'],
    'Two facts that do not match.',
    'A calm sea suggests gentle waves; <b>but</b> shows the opposite was true.');

  J('contrast', 2, 'but', 'Leela is afraid of water.', 'She wants to learn to swim.',
    'Leela is afraid of water, but she wants to learn to swim.',
    ['But Leela is afraid of water, she wants to learn to swim.',
     'Leela but is afraid of water she wants to learn to swim.',
     'Leela is afraid of water, she but wants to learn to swim.'],
    'Fear and wanting pull in opposite directions.',
    'The two ideas contrast, and <b>but</b> is the word that links them.');

  J('contrast', 2, 'but', 'The lesson was long.', 'It was interesting.',
    'The lesson was long, but it was interesting.',
    ['But the lesson was long, it was interesting.',
     'The lesson but was long it was interesting.',
     'The lesson was long, it was but interesting.'],
    'Comma + "but" + second idea.',
    'A long lesson sounds boring; <b>but</b> corrects that impression.');

  J('contrast', 3, 'but', 'Sami got up early.', 'He still missed the bus.',
    'Sami got up early, but he still missed the bus.',
    ['But Sami got up early, he still missed the bus.',
     'Sami but got up early he still missed the bus.',
     'Sami got up early, he still but missed the bus.'],
    'Getting up early should have prevented it.',
    'The result is the opposite of what we expect: that is the job of <b>but</b>.');

  J('contrast', 2, 'but', 'The box was small.', 'It was very heavy.',
    'The box was small, but it was very heavy.',
    ['But the box was small, it was very heavy.',
     'The box but was small it was very heavy.',
     'The box was small, it was very but heavy.'],
    'Small things are usually light.',
    'The second idea surprises us after the first, so we join them with <b>but</b>.');

  J('contrast', 3, 'but', 'We waited for an hour.', 'Nobody came.',
    'We waited for an hour, but nobody came.',
    ['But we waited for an hour, nobody came.',
     'We waited but for an hour nobody came.',
     'We waited for an hour, nobody but came.'],
    'The waiting did not work.',
    '<b>but</b> introduces the disappointing result.');

  J('contrast', 2, 'but', 'My brother likes mangoes.', 'I prefer bananas.',
    'My brother likes mangoes, but I prefer bananas.',
    ['But my brother likes mangoes, I prefer bananas.',
     'My brother but likes mangoes I prefer bananas.',
     'My brother likes mangoes, I but prefer bananas.'],
    'Two different tastes.',
    '<b>but</b> contrasts what two people like.');

  // ── 4 · TIME ────────────────────────────────────────────────────────────
  J('time', 1, 'when', 'The bell rings.', 'The pupils go out to play.',
    'When the bell rings, the pupils go out to play.',
    ['The bell rings when, the pupils go out to play.',
     'When the pupils go out to play, the bell rings.',
     'The bell when rings the pupils go out to play.'],
    'The time comes first, then what happens.',
    '<b>When</b> opens the sentence and a comma separates the two parts.');

  J('time', 1, 'when', 'I get home from school.', 'I have a snack.',
    'When I get home from school, I have a snack.',
    ['I get home from school when, I have a snack.',
     'When I have a snack, I get home from school.',
     'I when get home from school I have a snack.'],
    'Which happens first?',
    'Getting home comes before the snack, so it follows <b>when</b>.');

  J('time', 2, 'while', 'Mum was cooking.', 'Dad set the table.',
    'While Mum was cooking, Dad set the table.',
    ['Mum was cooking while, Dad set the table.',
     'While Dad set the table while Mum was cooking.',
     'Mum while was cooking Dad set the table.'],
    'Both things happen at the same time.',
    '<b>While</b> shows two actions happening <b>together</b>.');

  J('time', 2, 'when', 'The sun rises.', 'The birds start singing.',
    'When the sun rises, the birds start singing.',
    ['The sun rises when, the birds start singing.',
     'When the birds start singing, the sun rises.',
     'The sun when rises the birds start singing.'],
    'Sunrise gives the time.',
    'The time goes after <b>when</b>, then comes what happens.');

  J('time', 2, 'before', 'Wash your hands.', 'You eat your lunch.',
    'Wash your hands before you eat your lunch.',
    ['Before wash your hands, you eat your lunch.',
     'Wash your hands before, you eat your lunch you.',
     'Wash before your hands you eat your lunch.'],
    'Which action must come first?',
    '<b>before</b> shows that washing comes first and eating second.');

  J('time', 2, 'after', 'We tidied the classroom.', 'The lesson ended.',
    'We tidied the classroom after the lesson ended.',
    ['After we tidied the classroom, the lesson ended.',
     'We tidied the classroom after, the lesson ended.',
     'We after tidied the classroom the lesson ended.'],
    'The lesson ended first.',
    '<b>after</b> is followed by the thing that happened <b>earlier</b>.');

  J('time', 3, 'while', 'The teacher was explaining.', 'The pupils took notes.',
    'While the teacher was explaining, the pupils took notes.',
    ['The teacher was explaining while, the pupils took notes.',
     'While the pupils took notes while the teacher was explaining.',
     'The teacher while was explaining the pupils took notes.'],
    'Two things at once.',
    'Explaining and note-taking happen together, so <b>while</b> is right.');

  J('time', 2, 'when', 'It rains.', 'We play indoors.',
    'When it rains, we play indoors.',
    ['It rains when, we play indoors.',
     'When we play indoors, it rains.',
     'It when rains we play indoors.'],
    'The rain gives the time.',
    '"<b>When</b> it rains" tells us in which case we play inside.');

  J('time', 3, 'before', 'Close the windows.', 'The storm arrives.',
    'Close the windows before the storm arrives.',
    ['Before close the windows, the storm arrives.',
     'Close the windows before, the storm arrives the storm.',
     'Close before the windows the storm arrives.'],
    'Do this first, then the storm comes.',
    '<b>before</b> puts the two actions in order: windows first, storm second.');

  J('time', 2, 'after', 'We went home.', 'The match finished.',
    'We went home after the match finished.',
    ['After we went home, the match finished.',
     'We went home after, the match finished.',
     'We after went home the match finished.'],
    'The match finished first.',
    'The earlier action follows <b>after</b>.');

  // ── 5 · PURPOSE & RESULT ────────────────────────────────────────────────
  J('purpose_result', 2, 'so', 'There was no bread left.', 'I went to the shop.',
    'There was no bread left, so I went to the shop.',
    ['So there was no bread left, I went to the shop.',
     'There was so no bread left I went to the shop.',
     'I went to the shop, so there was no bread left.'],
    '"so" introduces the result.',
    'Going to the shop is the <b>result</b> of having no bread.');

  J('purpose_result', 3, 'to', 'I hurried.', 'I wanted to catch the bus.',
    'I hurried to catch the bus.',
    ['I hurried to I wanted to catch the bus.',
     'I hurried so that I wanted to catch the bus.',
     'To catch the bus I hurried to.'],
    'The same person does both actions.',
    'When the subject is the same, we use <b>to + verb</b> to give the purpose: "hurried <b>to catch</b> the bus".');

  J('purpose_result', 2, 'so', 'The road was flooded.', 'The bus could not pass.',
    'The road was flooded, so the bus could not pass.',
    ['So the road was flooded, the bus could not pass.',
     'The road was so flooded the bus could not pass.',
     'The bus could not pass, so the road was flooded.'],
    'Which one is the result?',
    'The bus being stuck is the <b>result</b> of the flood.');

  J('purpose_result', 4, 'to', 'Lina is saving her money.', 'She wants to buy a book.',
    'Lina is saving her money to buy a book.',
    ['Lina is saving her money to she wants to buy a book.',
     'Lina is saving her money so that she wants to buy a book.',
     'To buy a book Lina is saving to her money.'],
    'Lina does the saving and the buying.',
    'One subject → <b>to + verb</b> for the purpose: "saving her money <b>to buy</b> a book".');

  J('purpose_result', 2, 'so', 'I forgot my umbrella.', 'I got wet.',
    'I forgot my umbrella, so I got wet.',
    ['So I forgot my umbrella, I got wet.',
     'I forgot so my umbrella I got wet.',
     'I got wet, so I forgot my umbrella.'],
    'The forgetting came first.',
    'Getting wet is the <b>result</b> of forgetting the umbrella.');

  J('purpose_result', 3, 'to', 'We tidied the classroom.', 'We wanted to please our teacher.',
    'We tidied the classroom to please our teacher.',
    ['We tidied the classroom to we wanted to please our teacher.',
     'We tidied the classroom so that we wanted to please our teacher.',
     'To please our teacher we tidied to the classroom.'],
    'Same subject in both sentences.',
    'Same subject (we / we) → <b>to + verb</b>.');

  J('purpose_result', 2, 'so', 'The bus was full.', 'We waited for the next one.',
    'The bus was full, so we waited for the next one.',
    ['So the bus was full, we waited for the next one.',
     'The bus was so full we waited for the next one.',
     'We waited for the next one, so the bus was full.'],
    'What happened next?',
    'Waiting is what followed <b>as a result</b> of the full bus.');

  J('purpose_result', 4, 'to', 'Dad wakes up early.', 'He wants to prepare breakfast.',
    'Dad wakes up early to prepare breakfast.',
    ['Dad wakes up early to he wants to prepare breakfast.',
     'Dad wakes up early so that he wants to prepare breakfast.',
     'To prepare breakfast Dad wakes to up early.'],
    'Dad does both actions.',
    'Same subject → <b>to + verb</b>: "wakes up early <b>to prepare</b> breakfast".');

  J('purpose_result', 2, 'so', 'It is very hot today.', 'We are drinking a lot of water.',
    'It is very hot today, so we are drinking a lot of water.',
    ['So it is very hot today, we are drinking a lot of water.',
     'It is so very hot today we are drinking a lot of water.',
     'We are drinking a lot of water, so it is very hot today.'],
    'The heat explains the drinking.',
    'Drinking water is the <b>result</b> of the heat.');

  J('purpose_result', 4, 'to', 'She switched on the lamp.', 'She wanted to read her book.',
    'She switched on the lamp to read her book.',
    ['She switched on the lamp to she wanted to read her book.',
     'She switched on the lamp so that she wanted to read her book.',
     'To read her book she switched to on the lamp.'],
    'One person, two actions.',
    'Same subject → <b>to + verb</b> gives the purpose neatly.');
})();
