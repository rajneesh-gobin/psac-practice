'use strict';
(function () {

  // Every stimulus below is original prose written for this bank. Each variant
  // reprints the whole text it questions, because a pupil can meet any single
  // variant first in mixed practice or in an exam paper.

  const P1 = '<em>Every night, long before the first bus leaves Rose Hill, the bakery on Ollier Street is already warm. Ashok has worked there for nineteen years. He arrives at half past ten and leaves when the sun is properly up, carrying the smell of hot flour home with him. He says the work is not difficult once your hands have learned it; what is difficult is sleeping in the afternoon while the street is awake. The bakery sells nothing at night. Everything it makes is for the morning &mdash; for people who will never see it made, who will queue at six o&rsquo;clock and complain if the bread is late.</em>';
  const R1 = 'Read the passage, then answer the question.<br><br>' + P1 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-001-a',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 1,
    question: R1 + 'For how many years has Ashok worked at the bakery? Write the number in figures.',
    answer: '19',
    alsoAccept: ['nineteen', '19 years', 'nineteen years'],
    hint: 'The number you need is written in words, not in figures.',
    explanation: 'The passage says he &ldquo;has worked there for nineteen years&rdquo;, so the answer is 19. Pupils who write 10 have taken the number from &ldquo;half past ten&rdquo;, which is a starting time, not a length of service. When a text holds several numbers, check what each one is counting before you copy it.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-001-b',
    chapterId: 'g9eng-reading',
    subsection: 'inference',
    difficulty: 2,
    question: R1 + 'The passage never says whether Ashok sees much of other people. Which detail most strongly suggests that his hours cut him off from them?',
    options: [
      'He is at work while the rest of the street sleeps',
      'He carries the smell of hot flour home with him',
      'He has been at the same bakery for nineteen years',
      'He says the work is not difficult for his hands'
    ],
    answer: 'He is at work while the rest of the street sleeps',
    hint: 'An inference is built from a detail the writer gives, not from a sentence the writer has already written for you.',
    explanation: 'Ashok works from half past ten at night until sunrise and then tries to sleep &ldquo;while the street is awake&rdquo;, so his waking hours and everyone else&rsquo;s barely overlap. The smell of flour is the passage&rsquo;s most memorable image, which is exactly why it is the tempting choice &mdash; but an image is not evidence. Ask what the detail proves, not how vivid it is.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-001-c',
    chapterId: 'g9eng-reading',
    subsection: 'vocabulary',
    difficulty: 2,
    question: R1 + 'Find and copy the ONE word in the passage that means &ldquo;wait in a line&rdquo;.',
    answer: 'queue',
    alsoAccept: ['will queue'],
    hint: 'The word is in the last sentence, and it is something the customers do.',
    explanation: '&ldquo;Queue&rdquo; means to wait in a line. Pupils often answer &ldquo;complain&rdquo;, because it sits in the same sentence and is the more familiar word &mdash; but it describes what the customers say, not how they wait. When a question asks for a word with a given meaning, test your choice by putting the meaning back into the sentence.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-001-d',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 3,
    question: R1 + 'What attitude does the writer take towards the customers in the final sentence?',
    options: [
      'Mild reproach: they judge the bread without knowing its cost',
      'Open contempt: they are shown as lazy and ungrateful people',
      'Warm approval: their early queueing is presented as loyalty',
      'Complete neutrality: they are a fact of trade and nothing more'
    ],
    answer: 'Mild reproach: they judge the bread without knowing its cost',
    hint: 'Look at what the writer places next to the complaint in the same sentence.',
    explanation: 'The writer sets &ldquo;will never see it made&rdquo; beside &ldquo;complain if the bread is late&rdquo;, which quietly criticises the customers. It is criticism, but it is gentle: nowhere are they called lazy or ungrateful. Treating any criticism as contempt is the common error &mdash; weigh the strength of the words the writer actually chose.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-001-e',
    chapterId: 'g9eng-reading',
    subsection: 'evidence',
    difficulty: 3,
    question: R1 + 'Which quotation best supports the idea that Ashok&rsquo;s job costs him something outside the bakery?',
    options: [
      '&ldquo;sleeping in the afternoon while the street is awake&rdquo;',
      '&ldquo;people who will never see it made, who will queue at six&rdquo;',
      '&ldquo;carrying the smell of hot flour home with him&rdquo;',
      '&ldquo;the bakery on Ollier Street is already warm&rdquo;'
    ],
    answer: '&ldquo;sleeping in the afternoon while the street is awake&rdquo;',
    hint: 'A cost is something he loses, not something he takes with him.',
    explanation: 'The passage calls the afternoon sleep the difficult part, and rest lost is a real cost. The smell of flour follows him home but takes nothing from him, and the other two quotations describe the bakery and the customers rather than Ashok. Choosing a quotation that merely mentions his home is the trap: evidence must support the exact claim, not just sit near it.'
  }));

  const P2 = '<em>Ban the phones, say the parents. Ban the ban, say the pupils. Both sides are certain, and both sides are arguing about the wrong thing. A phone in a pocket is not a problem; a phone in a hand during a lesson is. Our school tried a total ban for one term. The phones did not disappear. They moved to the toilets, where nobody could see them and nobody could teach with them either. What worked in the end was duller: a box by the door, one pupil to fill it and one to empty it, and a rule that the box travelled with the class. A rule people can follow beats a rule that only sounds firm.</em>';
  const R2 = 'Read this opinion column from a school magazine, then answer the question.<br><br>' + P2 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-002-a',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 1,
    question: R2 + 'How long did the school&rsquo;s total ban last? Answer in the words used in the passage.',
    answer: 'one term',
    alsoAccept: ['a term', 'term'],
    hint: 'The length is stated in the sentence that introduces the ban.',
    explanation: 'The passage says the school &ldquo;tried a total ban for one term&rdquo;. Pupils who answer &ldquo;one year&rdquo; or &ldquo;one lesson&rdquo; have supplied a length that feels right instead of the one printed. Retrieval questions are marked on what the text says, not on what is likely.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-002-b',
    chapterId: 'g9eng-reading',
    subsection: 'language',
    difficulty: 2,
    question: R2 + 'The column opens with two sentences built in the same shape: &ldquo;Ban the phones, say the parents. Ban the ban, say the pupils.&rdquo; What is the main effect of that repeated shape?',
    options: [
      'It sets the two demands against each other as equals',
      'It shows the writer agrees with the parents rather than the pupils',
      'It proves that most pupils in the school own a mobile phone',
      'It tells the reader that the ban was introduced by the parents'
    ],
    answer: 'It sets the two demands against each other as equals',
    hint: 'Ask what the matching shape does to the two groups, not what either group wants.',
    explanation: 'The matched sentences (parallel structure) give the two sides the same weight, which prepares the third sentence: both are wrong. Assuming that whoever is named first has the writer&rsquo;s support is the usual mistake; order of mention is not agreement.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-002-c',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 3,
    question: R2 + 'According to the writer, what are both sides getting wrong?',
    options: [
      'They argue about owning phones, not about using them in class',
      'They argue about a ban that the school has never actually tried',
      'They argue about lessons when the real problem is the toilets',
      'They argue about rules that the head teacher alone can decide'
    ],
    answer: 'They argue about owning phones, not about using them in class',
    hint: 'The sentence beginning &ldquo;A phone in a pocket&hellip;&rdquo; draws the distinction the writer wants.',
    explanation: 'The writer separates having a phone (&ldquo;in a pocket&rdquo;) from using one (&ldquo;in a hand during a lesson&rdquo;): possession is not the problem, use is. The toilets are where the failed ban sent the phones, which is a consequence in the argument, not the writer&rsquo;s point about it. Picking a detail from the middle of an argument as its conclusion is a common slip.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-002-d',
    chapterId: 'g9eng-reading',
    subsection: 'evidence',
    difficulty: 2,
    question: R2 + 'Copy the TWO words from the passage that name the place the phones moved to once the total ban began.',
    answer: 'the toilets',
    alsoAccept: ['toilets'],
    hint: 'Look for what happened immediately after &ldquo;The phones did not disappear.&rdquo;',
    explanation: 'The passage says &ldquo;They moved to the toilets&rdquo;. Pupils who answer &ldquo;the box&rdquo; have taken the solution that came afterwards: the box is what finally worked, not where phones went during the ban. When you quote as evidence, check the order of events as well as the words.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-002-e',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 4,
    question: R2 + 'A pupil writes: &ldquo;This writer is against school rules about phones.&rdquo; Judge that claim against the column as a whole.',
    options: [
      'It is wrong: the writer rejects one rule that failed and defends another that worked',
      'It is right: the writer says that a phone in a pocket is not a problem for anybody',
      'It is right: the writer blames parents and pupils alike for wanting any rule at all',
      'It is wrong: the writer wants the total ban brought back with much stricter checks'
    ],
    answer: 'It is wrong: the writer rejects one rule that failed and defends another that worked',
    hint: 'Follow the argument to its last sentence before deciding what the writer is against.',
    explanation: 'The column ends by praising a rule &mdash; the box by the door &mdash; and states that &ldquo;a rule people can follow beats a rule that only sounds firm&rdquo;. The writer is against one kind of rule, not rules. The trap is to lift the concession &ldquo;a phone in a pocket is not a problem&rdquo; out of the argument and treat it as the conclusion; a concession is what a writer grants before making the point, so always read on to the end.'
  }));

  const P3A = '<strong>Text A &mdash; council notice</strong><br><em>The Beau Vallon footpath reopened on Monday, six weeks after heavy rain brought part of the slope down onto the track. Contractors have cleared the debris, rebuilt forty metres of steps and fitted a new handrail. The council thanks residents for their patience and reminds walkers that the path is closed after dark.</em>';
  const P3B = '<strong>Text B &mdash; letter to a newspaper</strong><br><em>Sir &mdash; I am glad the steps are back. I am less glad that six weeks were needed to move what two men with shovels moved from my own yard in an afternoon. The new handrail stops at the bend, which is exactly where the drop is worst; below the bend there is nothing to hold on to. And nobody has touched the blocked drain above the slope, which is what sent the mud down in the first place. We will be doing all of this again after the next heavy rain.</em>';
  const R3 = 'Read both texts, then answer the question.<br><br>' + P3A + '<br><br>' + P3B + '<br><br>';

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-003-a',
    chapterId: 'g9eng-reading',
    subsection: 'across_texts',
    difficulty: 2,
    question: R3 + 'Which piece of information is given in BOTH texts?',
    options: [
      'The path was out of use for six weeks',
      'A drain above the slope is still blocked',
      'Forty metres of steps have been rebuilt',
      'Two men cleared a yard using shovels'
    ],
    answer: 'The path was out of use for six weeks',
    hint: 'Check each option against both texts before choosing, not just against the one you read last.',
    explanation: 'Text A gives &ldquo;six weeks after heavy rain&rdquo; and Text B gives &ldquo;six weeks were needed&rdquo;, so only that fact appears twice. The drain and the shovels are in Text B alone; the forty metres of steps are in Text A alone. A detail you remember clearly is not necessarily a detail both writers gave you.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-003-b',
    chapterId: 'g9eng-reading',
    subsection: 'across_texts',
    difficulty: 3,
    question: R3 + 'Text A states that contractors &ldquo;fitted a new handrail&rdquo;. What does Text B add about that handrail?',
    options: [
      'It ends at the bend, where the drop is worst',
      'It was fitted before the debris was cleared away',
      'It replaced a handrail that had been there before',
      'It is the only part of the work still left unfinished'
    ],
    answer: 'It ends at the bend, where the drop is worst',
    hint: 'Text B does not deny the handrail exists. Read what it says about where the handrail stops.',
    explanation: 'Text B says the rail &ldquo;stops at the bend, which is exactly where the drop is worst&rdquo;. It is not the only unfinished item, because the same letter names the untouched drain &mdash; a reader who assumes that a complaining text is complaining about one thing will choose that option. When two texts overlap, add what the second says; do not replace the first with a general impression of its tone.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-003-c',
    chapterId: 'g9eng-reading',
    subsection: 'across_texts',
    difficulty: 4,
    question: R3 + 'A reader says: &ldquo;These two texts contradict each other.&rdquo; Which response is the most accurate?',
    options: [
      'No &mdash; they report the same work; they disagree about whether it is enough',
      'Yes &mdash; Text A says the path is now open and Text B says it is still closed',
      'Yes &mdash; Text A says the job took six weeks and Text B says one afternoon',
      'No &mdash; Text B repeats the facts in Text A and adds no opinion of its own'
    ],
    answer: 'No &mdash; they report the same work; they disagree about whether it is enough',
    hint: 'A contradiction needs two statements that cannot both be true. Test each pair of statements you are offered.',
    explanation: 'Text B never denies that the path reopened, that the steps were rebuilt or that a handrail was fitted; it judges the same work incomplete because of the rail&rsquo;s length and the untouched drain. That is disagreement about sufficiency, not about fact. The six weeks and the afternoon are not a contradiction either: they describe two different jobs, a collapsed slope and a private yard. Treating any difference of tone as a contradiction is the misconception &mdash; name the two statements that clash before you use the word.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-003-d',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 3,
    question: R3 + 'Which best describes the difference in purpose between the two texts?',
    options: [
      'A informs residents of a decision; B presses for further work',
      'A explains why the rain fell; B explains how the steps were built',
      'A apologises for a long delay; B accepts that the delay was needed',
      'A warns walkers of a danger; B thanks the council for its patience'
    ],
    answer: 'A informs residents of a decision; B presses for further work',
    hint: 'Ask what each writer wants the reader to know or to do.',
    explanation: 'Text A announces the reopening and adds a rule about darkness: it informs. Text B accepts the reopening and argues that two jobs remain: it pushes for more. Reading &ldquo;thanks residents for their patience&rdquo; as an apology is the common slip &mdash; a council thanking people for waiting is not saying sorry for making them wait.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-003-e',
    chapterId: 'g9eng-reading',
    subsection: 'text_features',
    difficulty: 2,
    question: R3 + 'Text B opens with &ldquo;Sir&rdquo; and gives one resident&rsquo;s opinion. What kind of text is it? Give ONE word.',
    answer: 'letter',
    alsoAccept: ['a letter', 'letter to the editor', 'letter to a newspaper'],
    hint: 'Look at how it opens and who it is addressed to.',
    explanation: 'Opening with &ldquo;Sir&rdquo; and arguing one person&rsquo;s case is the shape of a letter to a newspaper. Pupils who answer &ldquo;notice&rdquo; or &ldquo;report&rdquo; have described Text A, which addresses everybody and states facts without an &ldquo;I&rdquo;. The opening line and the presence of a first-person voice are the two features that separate them.'
  }));

  const P4 = '<strong>READING WEEK &mdash; School Library</strong><br><br><strong>What is on</strong><br>&bull; Monday, 10:30 &mdash; Author visit (Hall)<br>&bull; Wednesday, 12:45 &mdash; Reading aloud in Kreol and English (Library)<br>&bull; Thursday, 12:45 &mdash; Book swap: bring one, take one (Library)<br>&bull; Friday, 14:00 &mdash; Quiz final (Hall)<br><br><strong>How to take part</strong><br>Put your name on the list outside the library office by Friday of this week. The hall holds 120 people.<br><br><strong>Note</strong><br>Books borrowed during Reading Week must be returned by 30 June, as usual.';
  const R4 = 'Read this leaflet, then answer the question.<br><br>' + P4 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-004-a',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 1,
    question: R4 + 'On which day is the book swap? Give the day.',
    answer: 'Thursday',
    alsoAccept: ['on Thursday'],
    hint: 'Two events start at 12:45. Read the description beside each one.',
    explanation: 'The book swap is listed for Thursday at 12:45. Wednesday shares the same time but is the reading-aloud session, so a pupil who searches for &ldquo;12:45&rdquo; and stops at the first match answers Wednesday. In a list, match the description first and the time second.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-004-b',
    chapterId: 'g9eng-reading',
    subsection: 'text_features',
    difficulty: 2,
    question: R4 + 'Why are the four events set out as a list with times, rather than written out as a paragraph?',
    options: [
      'So a reader can find one event without reading them all',
      'So the events look more important than the other notices',
      'So the writer can leave out the names of the places used',
      'So the reader knows which event the school would prefer'
    ],
    answer: 'So a reader can find one event without reading them all',
    hint: 'Think about how somebody uses a leaflet: do they read it through, or look something up?',
    explanation: 'A list lets a reader scan for the one line they need, which is how leaflets are actually used. The list does not hide the places (each has one in brackets) and it expresses no preference. Assuming that layout carries an opinion &mdash; bigger, bolder, therefore more important &mdash; is the misconception; layout usually serves how a text will be used.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-004-c',
    chapterId: 'g9eng-reading',
    subsection: 'text_features',
    difficulty: 3,
    question: R4 + 'The library wants to add this sentence: &ldquo;Pupils in Grades 7 to 9 may bring one guest.&rdquo; Under which heading does it belong, and why?',
    options: [
      'Under &ldquo;How to take part&rdquo;, because it is a rule about attending',
      'Under &ldquo;What is on&rdquo;, because it mentions the pupils who attend',
      'Under &ldquo;Note&rdquo;, because it was written after the leaflet was made',
      'Under a new heading, because guests are not mentioned anywhere yet'
    ],
    answer: 'Under &ldquo;How to take part&rdquo;, because it is a rule about attending',
    hint: 'Headings group sentences by what they do for the reader, not by which words they contain.',
    explanation: 'The new sentence tells a reader what they are allowed to do in order to attend, which is exactly the job of &ldquo;How to take part&rdquo;. Choosing &ldquo;What is on&rdquo; because the word &ldquo;pupils&rdquo; feels at home there is word-matching rather than reading for organisation, and a new heading for a single rule would break the structure the leaflet already has.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-004-d',
    chapterId: 'g9eng-reading',
    subsection: 'inference',
    difficulty: 3,
    question: R4 + 'The leaflet gives the size of the hall. What is a reader most likely meant to do with that number?',
    options: [
      'Sign up early, because places at hall events are limited',
      'Choose the library events, because the hall is often locked',
      'Expect the quiz final to be moved to a larger building',
      'Bring a chair, because the hall does not have enough seats'
    ],
    answer: 'Sign up early, because places at hall events are limited',
    hint: 'The capacity is printed directly after the instruction about the sign-up list. Why put the two together?',
    explanation: 'A capacity printed next to a sign-up instruction tells the reader that the list may fill, so it is a reason to put your name down early. The leaflet says nothing about the hall being locked, moved or short of chairs; those answers add information the text does not give. An inference must be built out of the text, not out of experience of other halls.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-004-e',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 4,
    question: R4 + 'A pupil says: &ldquo;This leaflet is written only for pupils who already enjoy reading.&rdquo; Judge that claim against the leaflet as a whole.',
    options: [
      'Wrong: the book swap and the quiz invite anyone who turns up',
      'Right: every event listed asks a pupil to read something aloud',
      'Right: the leaflet never explains what happens at any event',
      'Wrong: the leaflet is addressed to parents rather than to pupils'
    ],
    answer: 'Wrong: the book swap and the quiz invite anyone who turns up',
    hint: 'Go through the four events one at a time and ask what each one actually requires a pupil to do.',
    explanation: 'Only one of the four events &mdash; the Wednesday session &mdash; involves reading aloud. An author visit, a book swap and a quiz ask for attendance, curiosity or general knowledge, so the leaflet reaches beyond confident readers. The instruction to put your name on the list is addressed to pupils, not parents, and each event carries a short description. The misconception is judging a text&rsquo;s audience from its title (&ldquo;Reading Week&rdquo;) instead of from what it asks its readers to do.'
  }));

  const P5 = '<em>The classroom emptied in nine seconds. Miss Ramjuttun stood in the doorway and let the noise pour past her like water finding a drain, then turned back to a room that had gone suddenly enormous. Twenty-nine chairs, and under the twenty-ninth there was still a bag. She knew whose it was. She had known since September that Yash would rather leave the bag behind than carry it home and be asked what was inside it.</em>';
  const R5 = 'Read this extract from a story, then answer the question.<br><br>' + P5 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-005-a',
    chapterId: 'g9eng-reading',
    subsection: 'language',
    difficulty: 2,
    question: R5 + 'Name the device the writer uses in &ldquo;like water finding a drain&rdquo;. Give ONE word.',
    answer: 'simile',
    alsoAccept: ['a simile'],
    hint: 'Look at the small word that joins the noise to the water.',
    explanation: 'The comparison is made with &ldquo;like&rdquo;, which makes it a simile. Pupils who answer &ldquo;metaphor&rdquo; have spotted the comparison but not the signal word: a metaphor says one thing <em>is</em> another, with no &ldquo;like&rdquo; or &ldquo;as&rdquo;.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-005-b',
    chapterId: 'g9eng-reading',
    subsection: 'language',
    difficulty: 3,
    question: R5 + 'What does &ldquo;a room that had gone suddenly enormous&rdquo; suggest?',
    options: [
      'The room feels bigger because the noise and pupils have gone',
      'The room is larger than the other classrooms in the school',
      'The room is too big for a class of twenty-nine pupils',
      'The teacher wishes she taught in a smaller, quieter room'
    ],
    answer: 'The room feels bigger because the noise and pupils have gone',
    hint: 'Nothing about the building has changed in those nine seconds. What has changed?',
    explanation: 'The room cannot grow; what changes is that it is suddenly empty, and the emptiness is what the teacher feels. Reading a figurative statement as a literal measurement is the misconception, and it is easy to catch: if a sentence describes a physical change that could not really have happened in the time given, it is telling you about a feeling.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-005-c',
    chapterId: 'g9eng-reading',
    subsection: 'inference',
    difficulty: 3,
    question: R5 + 'What does the extract suggest about Yash?',
    options: [
      'He leaves the bag so that no one at home asks about it',
      'He forgot his bag because the class left the room quickly',
      'He has been told by his teacher to leave the bag at school',
      'He is the only pupil in the class who owns a school bag'
    ],
    answer: 'He leaves the bag so that no one at home asks about it',
    hint: 'The last sentence tells you how long the teacher has known. What does that length of time rule out?',
    explanation: 'The teacher has known &ldquo;since September&rdquo;, so this is a habit, not an accident &mdash; and the sentence says he would rather leave the bag than &ldquo;be asked what was inside it&rdquo;. The nine-second exit tempts a reader towards &ldquo;he forgot in the rush&rdquo;, but a detail that opens a passage is not automatically the cause of what closes it.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-005-d',
    chapterId: 'g9eng-reading',
    subsection: 'vocabulary',
    difficulty: 2,
    question: R5 + 'Find and copy the ONE word in the extract that means &ldquo;to flow steadily&rdquo;.',
    answer: 'pour',
    alsoAccept: ['pour past'],
    hint: 'The word is used about the noise, not about a liquid.',
    explanation: '&ldquo;Pour&rdquo; normally describes a liquid, and here the writer uses it for noise, which is why the simile about water follows so naturally. Pupils often answer &ldquo;finding&rdquo; because it sits inside the water image; check that your word carries the given meaning on its own.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-005-e',
    chapterId: 'g9eng-reading',
    subsection: 'evidence',
    difficulty: 3,
    question: R5 + 'Copy the TWO words from the extract that show Miss Ramjuttun has suspected this for a long time.',
    answer: 'since September',
    hint: 'You need the words that fix a point in time, not the words that describe the bag.',
    explanation: '&ldquo;She had known since September&rdquo; sets the knowledge months earlier, which is what makes it long-standing. Pupils who quote &ldquo;She knew&rdquo; have found that she knows but not that she has known for a long time &mdash; the evidence you quote has to carry the exact part of the claim you are making.'
  }));

  const P14 = '<strong>Bus times: Curepipe to Rose Hill</strong><br><table style="border-collapse:collapse;margin-top:6px"><tr><th style="border:1px solid #999;padding:4px 8px">Route</th><th style="border:1px solid #999;padding:4px 8px">Curepipe</th><th style="border:1px solid #999;padding:4px 8px">Phoenix</th><th style="border:1px solid #999;padding:4px 8px">Rose Hill</th></tr><tr><td style="border:1px solid #999;padding:4px 8px">198</td><td style="border:1px solid #999;padding:4px 8px">06:40</td><td style="border:1px solid #999;padding:4px 8px">06:58</td><td style="border:1px solid #999;padding:4px 8px">07:20</td></tr><tr><td style="border:1px solid #999;padding:4px 8px">22</td><td style="border:1px solid #999;padding:4px 8px">06:55</td><td style="border:1px solid #999;padding:4px 8px">07:18</td><td style="border:1px solid #999;padding:4px 8px">07:41</td></tr><tr><td style="border:1px solid #999;padding:4px 8px">198</td><td style="border:1px solid #999;padding:4px 8px">07:15</td><td style="border:1px solid #999;padding:4px 8px">07:33</td><td style="border:1px solid #999;padding:4px 8px">07:55</td></tr><tr><td style="border:1px solid #999;padding:4px 8px">22</td><td style="border:1px solid #999;padding:4px 8px">07:25</td><td style="border:1px solid #999;padding:4px 8px">07:48</td><td style="border:1px solid #999;padding:4px 8px">08:11</td></tr></table><em>Times shown are for Monday to Friday during school terms. Route 22 does not run on public holidays.</em>';
  const R14 = 'Read this timetable and the note under it, then answer the question.<br><br>' + P14 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-014-a',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 1,
    question: R14 + 'At what time does the 06:55 bus from Curepipe reach Rose Hill? Write the time as it appears in the table.',
    answer: '07:41',
    alsoAccept: ['7:41', '07.41', '7.41', '0741'],
    hint: 'Find the row that begins at 06:55, then read along to the last column.',
    explanation: 'The 06:55 departure is route 22, and its Rose Hill time is 07:41. Answering 07:18 reads the Phoenix column, which is the middle of the journey. In a table, fix the row first, then count the columns across.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-014-b',
    chapterId: 'g9eng-reading',
    subsection: 'text_features',
    difficulty: 2,
    question: R14 + 'Why is the note printed under the table rather than inside it?',
    options: [
      'It applies to the whole table, not to one time in it',
      'It was added after the timetable had been printed',
      'It is less important than any of the times above it',
      'It explains how the two routes differ in their prices'
    ],
    answer: 'It applies to the whole table, not to one time in it',
    hint: 'Ask which rows and columns the note is talking about.',
    explanation: 'The note covers every row (which days the service runs) so it cannot sit in one cell. Position on a page is not a ranking: a reader who assumes that anything printed underneath matters less will skip exactly the sentence that decides whether a bus runs at all.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-014-c',
    chapterId: 'g9eng-reading',
    subsection: 'inference',
    difficulty: 3,
    question: R14 + 'Devi must be in Rose Hill by 07:50 on a Wednesday during term. Which is the LATEST bus she can take from Curepipe?',
    options: [
      'The 06:55 on route 22, arriving 07:41',
      'The 07:15 on route 198, arriving 07:55',
      'The 06:40 on route 198, arriving 07:20',
      'The 07:25 on route 22, arriving 08:11'
    ],
    answer: 'The 06:55 on route 22, arriving 07:41',
    hint: 'Two buses arrive before 07:50. The question asks which of those two leaves later.',
    explanation: 'Only the 06:40 (arriving 07:20) and the 06:55 (arriving 07:41) reach Rose Hill before 07:50, and of those the 06:55 leaves later, so it is the latest she can take. Choosing the 07:15 or the 07:25 reads &ldquo;latest&rdquo; from the departure column and ignores the arrival, which is the condition that has to be met; choosing the 06:40 answers &ldquo;earliest safe bus&rdquo; instead of the question asked.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-014-d',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 3,
    question: R14 + 'Devi&rsquo;s cousin asks which of these buses he could take on a Sunday. What does this timetable NOT tell him?',
    options: [
      'Whether either route runs on a Sunday at all',
      'How long route 22 takes to reach Rose Hill',
      'Which route leaves Curepipe first each day',
      'How many stops route 198 makes on the way'
    ],
    answer: 'Whether either route runs on a Sunday at all',
    hint: 'Read the note again and list the days it actually covers.',
    explanation: 'The note covers Monday to Friday and rules out public holidays; Sundays are simply not mentioned, so the timetable cannot answer him. The trap is to treat a stated exception as a complete list &mdash; &ldquo;does not run on public holidays&rdquo; feels like it implies &ldquo;runs on every other day&rdquo;, but it does not. The journey time (46 minutes), the first departure and the intermediate stop are all readable from the table.'
  }));

  const P15 = '<em>Nobody planted the mango tree behind the science block. It arrived in a lunch box, was thrown out with the stone still in it, and grew where it landed. For eleven years it has done nothing the school asked of it: it drops fruit on the path, it shades the beds where the Grade 7s try to grow beans, and its roots have lifted two slabs of the walkway. Every year somebody suggests cutting it down. Every year, in the week before the examinations, forty pupils eat their lunch underneath it, and the suggestion is quietly forgotten.</em>';
  const R15 = 'Read the passage, then answer the question.<br><br>' + P15 + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-015-a',
    chapterId: 'g9eng-reading',
    subsection: 'retrieval',
    difficulty: 1,
    question: R15 + 'For how many years has the mango tree been growing behind the science block? Write the number in figures.',
    answer: '11',
    alsoAccept: ['eleven', '11 years', 'eleven years'],
    hint: 'The length of time is written in words, in the third sentence.',
    explanation: 'The passage says &ldquo;For eleven years&rdquo;, so the answer is 11. Pupils sometimes write 7, taking the number from &ldquo;the Grade 7s&rdquo;, or 2 from &ldquo;two slabs&rdquo;. When several numbers appear close together, check what each one counts before you copy it.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-015-b',
    chapterId: 'g9eng-reading',
    subsection: 'vocabulary',
    difficulty: 2,
    question: R15 + 'Find and copy the ONE word in the passage that means &ldquo;keeps the sunlight off&rdquo;.',
    answer: 'shades',
    alsoAccept: ['shade', 'it shades'],
    hint: 'The word describes what the tree does to the beans.',
    explanation: '&ldquo;Shades&rdquo; means to keep the sun off something, which is why the beans do badly. Pupils often answer &ldquo;drops&rdquo;, the neighbouring verb in the same list of complaints; test your choice by putting the given meaning back into the sentence and seeing whether it still makes sense.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-015-c',
    chapterId: 'g9eng-reading',
    subsection: 'inference',
    difficulty: 3,
    question: R15 + 'Why is the suggestion to cut the tree down &ldquo;quietly forgotten&rdquo; every year?',
    options: [
      'Because the tree is most useful at exactly the time it is judged',
      'Because the head teacher has refused permission to cut it down',
      'Because the roots have made the tree too dangerous to remove',
      'Because the Grade 7 beans depend on the shade that it gives'
    ],
    answer: 'Because the tree is most useful at exactly the time it is judged',
    hint: 'Look at when the suggestion is made and when the forty pupils are sitting under the tree.',
    explanation: 'The suggestion comes round each year, and each year the week before the examinations puts forty pupils in its shade &mdash; the tree earns its place at precisely the moment it is being condemned. The beans are harmed by the shade, not helped by it, so that option reverses the passage; the head teacher and any danger from the roots are additions the text never makes.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-015-d',
    chapterId: 'g9eng-reading',
    subsection: 'evidence',
    difficulty: 3,
    question: R15 + 'Which detail best supports the idea that nobody intended the tree to be there?',
    options: [
      'It arrived in a lunch box and grew where it landed',
      'Its roots have lifted two slabs of the walkway',
      'It drops fruit on the path throughout the year',
      'Nobody has cut it down in the past eleven years'
    ],
    answer: 'It arrived in a lunch box and grew where it landed',
    hint: 'Evidence about how the tree began, not about the trouble it causes now.',
    explanation: 'A stone thrown out with a lunch and left to grow where it fell is an accident, and that is exactly the claim. The lifted slabs and the fallen fruit show that the tree is inconvenient, which is a different point, and the fact that it survives eleven years shows tolerance rather than intention. Match your evidence to the exact claim, not to the general subject.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-015-e',
    chapterId: 'g9eng-reading',
    subsection: 'authors_view',
    difficulty: 4,
    question: R15 + 'A pupil says: &ldquo;The writer thinks the tree should be cut down.&rdquo; Judge that claim against the passage as a whole.',
    options: [
      'Wrong: the writer lists the tree&rsquo;s faults but ends on what it gives',
      'Right: the writer lists three separate problems the tree has caused',
      'Right: the writer says the tree has done nothing the school asked',
      'Wrong: the writer never mentions a problem that the tree has caused'
    ],
    answer: 'Wrong: the writer lists the tree&rsquo;s faults but ends on what it gives',
    hint: 'Count the complaints if you like, but read where the passage finally settles.',
    explanation: 'The complaints are real and there are three of them, but the passage is built to end elsewhere: the last sentence sets forty pupils under the tree in the hardest week of the year and lets the suggestion die. &ldquo;It has done nothing the school asked of it&rdquo; is a concession the writer grants before turning it round. Counting negative details instead of following the shape of the argument is the misconception &mdash; in this kind of passage the writer&rsquo;s position is usually where the text arrives, not where it starts.'
  }));

  const LETTER_CTX = 'You are writing a formal letter to your school&rsquo;s head teacher about a water fountain that has not worked since last term.<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-006-a',
    chapterId: 'g9eng-writing',
    subsection: 'formal_letter',
    difficulty: 2,
    question: LETTER_CTX + 'You do not know the head teacher&rsquo;s name. Write the greeting exactly as it should appear at the top of your letter.',
    answer: 'Dear Sir or Madam',
    alsoAccept: ['Dear Sir/Madam', 'Dear Madam or Sir'],
    hint: 'The greeting must name nobody, and it must still be formal.',
    explanation: 'When the reader is not named, a formal letter opens &ldquo;Dear Sir or Madam&rdquo;. &ldquo;Dear Head Teacher&rdquo; sounds respectful but uses a job title where English uses a name, and &ldquo;Hello&rdquo; or &ldquo;Hi&rdquo; belongs to a note between friends. Decide first whether you have a name; the greeting follows from that.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-006-b',
    chapterId: 'g9eng-writing',
    subsection: 'formal_letter',
    difficulty: 2,
    question: LETTER_CTX + 'Your letter begins &ldquo;Dear Sir or Madam&rdquo;. Write the TWO words that must appear immediately before your signature at the end.',
    answer: 'Yours faithfully',
    hint: 'The closing is decided by the greeting, not by how strongly you feel.',
    explanation: 'A letter that opens without a name closes &ldquo;Yours faithfully&rdquo;. Pupils reverse this pair more often than any other convention in letter writing, so read your own greeting before you write your closing: no name at the top means &ldquo;faithfully&rdquo; at the bottom.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-006-c',
    chapterId: 'g9eng-writing',
    subsection: 'formal_letter',
    difficulty: 3,
    question: 'A second formal letter, about the same water fountain, begins &ldquo;Dear Mrs Appadoo&rdquo;.<br><br>Write the TWO words that must appear immediately before your signature at the end of THIS letter.',
    answer: 'Yours sincerely',
    hint: 'One condition has changed from the usual practice question: you now know who you are writing to.',
    explanation: 'Because the greeting names the reader, this letter closes &ldquo;Yours sincerely&rdquo;. The subject of the letter makes no difference at all; only the greeting does. Pupils who close every formal letter &ldquo;Yours faithfully&rdquo; have learned one half of a pair as though it were a rule about formality.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-006-d',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 3,
    question: LETTER_CTX + 'Your draft contains this sentence: &ldquo;The water fountain near Room 12 has been busted since last term.&rdquo;<br><br>Write the ONE word that is too informal for a formal letter.',
    answer: 'busted',
    alsoAccept: ['"busted"'],
    hint: 'Three of the words name things. One of them judges how something works, in slang.',
    explanation: '&ldquo;Busted&rdquo; is slang; &ldquo;broken&rdquo; or &ldquo;out of order&rdquo; carries the same meaning in a formal register. Pupils often rewrite the whole sentence or point at &ldquo;fountain&rdquo;, which is the ordinary name for the object. Register lives in individual word choices far more often than in whole sentences.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-006-e',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 3,
    question: LETTER_CTX + 'Which sentence is written in the right register for a formal letter of complaint?',
    options: [
      'I should be grateful if the fountain could be repaired soon.',
      'I would be really glad if you could sort the fountain out.',
      'Please get somebody to fix this fountain as fast as you can.',
      'It is about time that somebody repaired the fountain again.'
    ],
    answer: 'I should be grateful if the fountain could be repaired soon.',
    hint: 'Formal is not the same as forceful, and &ldquo;please&rdquo; on its own does not make a sentence formal.',
    explanation: '&ldquo;I should be grateful if&hellip;&rdquo; is the standard formal request: polite, impersonal and specific. &ldquo;Sort out&rdquo; and &ldquo;really&rdquo; are conversational; &ldquo;get somebody to fix&rdquo; stays informal even with &ldquo;please&rdquo; in front of it; and &ldquo;It is about time&rdquo; is a rebuke, which is the commonest mistake &mdash; pupils write forcefully because they are annoyed and lose the register in the process.'
  }));

  const COH_PARA = '<em>(1) Our class collected 240 plastic bottles in one week. (2) We had expected about a hundred. (3) ______, we had to borrow a second sack from the office. (4) Two pupils counted the bottles at the end of each day. (5) They were taken to the recycling point in Quatre Bornes on Friday.</em><br><br>';
  const COH = 'A pupil has written this paragraph for the school magazine.<br><br>' + COH_PARA;

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-007-a',
    chapterId: 'g9eng-writing',
    subsection: 'cohesion',
    difficulty: 2,
    question: COH + 'Write ONE linking word to fill the gap in sentence 3.',
    answer: 'Therefore',
    alsoAccept: ['Consequently', 'So', 'Thus', 'Accordingly', 'As a result'],
    hint: 'Decide first what sentence 3 does: does it go against sentences 1 and 2, or follow from them?',
    explanation: 'Collecting far more than expected is the reason a second sack was needed, so sentence 3 states a result and needs a result connective: therefore, consequently, so. &ldquo;However&rdquo; is the answer pupils give most often, because the paragraph contains a surprise &mdash; but a surprise is not a contrast. Name the relationship before you choose the word.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-007-b',
    chapterId: 'g9eng-writing',
    subsection: 'cohesion',
    difficulty: 3,
    question: COH + 'Another pupil fills the gap with &ldquo;However&rdquo;. Why is that wrong here?',
    options: [
      'Sentence 3 follows from sentence 1 and does not oppose it',
      'The word &ldquo;however&rdquo; can never begin an English sentence',
      'The word &ldquo;however&rdquo; must always join two clauses',
      'Sentence 3 gives an example rather than stating a result'
    ],
    answer: 'Sentence 3 follows from sentence 1 and does not oppose it',
    hint: 'The fault is in the meaning of the link, not in where the word is placed.',
    explanation: '&ldquo;However&rdquo; signals a contrast, and there is none: the extra sack is caused by the large number of bottles. The two options that invent grammar rules are the trap. &ldquo;However&rdquo; may open a sentence, and it may stand alone with a comma. A connective is wrong when it names the wrong relationship, not when it sits in an unfamiliar place.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-007-c',
    chapterId: 'g9eng-writing',
    subsection: 'cohesion',
    difficulty: 3,
    question: COH + 'One sentence leaves the reader unsure who or what a pronoun refers to. Write the number of that sentence.',
    answer: '5',
    alsoAccept: ['sentence 5', 'five', '(5)'],
    hint: 'Look for a pronoun whose nearest possible owner is not the one the writer means.',
    explanation: 'In sentence 5, &ldquo;They&rdquo; could be the bottles or the two pupils named in sentence 4, and the nearer noun is the pupils. Sentence 4 is clear because it names both the counters and the counted. A pronoun is only as clear as the noun closest in front of it, so check what a reader will reach for first.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-007-d',
    chapterId: 'g9eng-writing',
    subsection: 'cohesion',
    difficulty: 3,
    question: COH + 'Rewrite the opening of sentence 5 so that the reader knows exactly what was taken to the recycling point. Write only the FIRST TWO words of your new sentence.',
    answer: 'The bottles',
    alsoAccept: ['Those bottles', 'The 240'],
    hint: 'Replace the pronoun with the thing it stands for.',
    explanation: 'Writing &ldquo;The bottles were taken&hellip;&rdquo; removes the doubt in one word. Pupils avoid this because they have been taught not to repeat a noun, but that advice assumes the reader can already tell what the pronoun means. Clarity comes first; vary your wording only where nothing is at stake.'
  }));

  const ESSAY_PLAN = 'A pupil is planning an essay on the title: <strong>Should the school day start an hour later?</strong><br><br><em>Plan<br>1. More sleep would improve concentration in the morning.<br>2. Buses are less crowded after eight o&rsquo;clock.<br>3. My cousin&rsquo;s school in Curepipe starts at nine.<br>4. Parents who work early would have to leave children unsupervised.</em><br><br>';

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-008-a',
    chapterId: 'g9eng-writing',
    subsection: 'planning',
    difficulty: 2,
    question: ESSAY_PLAN + 'Point 4 is different in kind from the other three. In what way?',
    options: [
      'It is an argument against the change, not for it',
      'It is the only point that mentions parents at all',
      'It is about a school other than the writer&rsquo;s own',
      'It repeats a point that has already been made'
    ],
    answer: 'It is an argument against the change, not for it',
    hint: 'Ask of each point: does it help the case for a later start, or damage it?',
    explanation: 'Points 1 to 3 support a later start; point 4 gives a cost of it. That does not make point 4 useless &mdash; a balanced essay needs the other side &mdash; but the plan should label it as such so it is not written up as though it were support. The option about another school describes point 3, which is a different weakness.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-008-b',
    chapterId: 'g9eng-writing',
    subsection: 'planning',
    difficulty: 3,
    question: ESSAY_PLAN + 'One point is a single example rather than a reason. Write its number.',
    answer: '3',
    alsoAccept: ['point 3', 'three', '(3)'],
    hint: 'A reason explains why something should happen. An example only reports that somewhere it already does.',
    explanation: 'Point 3 reports what one school does; it gives no reason why a later start would be better. An example becomes useful once it is attached to a reason (&ldquo;pupils there arrive more alert, which shows&hellip;&rdquo;). Pupils treat examples as arguments because they feel concrete &mdash; but on its own, one school proves nothing.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-008-c',
    chapterId: 'g9eng-writing',
    subsection: 'essay',
    difficulty: 3,
    question: ESSAY_PLAN + 'Which topic sentence best opens the paragraph built on point 1?',
    options: [
      'A later start would give pupils the sleep that morning lessons need',
      'Sleep is something that every human being needs in order to live',
      'Most pupils in my class say they go to bed far too late at night',
      'In this paragraph I am going to write about sleep and concentration'
    ],
    answer: 'A later start would give pupils the sleep that morning lessons need',
    hint: 'A topic sentence should answer the essay title, not announce what is coming.',
    explanation: 'The first option makes a claim that answers the title and that the rest of the paragraph can support. Announcing the topic (&ldquo;In this paragraph I am going to&hellip;&rdquo;) wastes the sentence that carries the argument; a general truth about sleep says nothing about school start times; and a survey detail is evidence, which belongs after the claim rather than in place of it.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-008-d',
    chapterId: 'g9eng-writing',
    subsection: 'essay',
    difficulty: 4,
    question: 'A pupil has drafted this body paragraph for the essay <strong>Should the school day start an hour later?</strong><br><br><em>A later start would help everyone. In my class, six people out of thirty said they fall asleep during the first lesson. That proves the whole school is too tired to learn before nine o&rsquo;clock. Teachers would also prefer it, because nobody enjoys teaching a sleepy class.</em><br><br>Which is the most serious weakness in this paragraph?',
    options: [
      'It treats six pupils in one class as proof about the whole school',
      'It uses a number, when a written essay should avoid figures entirely',
      'It gives no example at all in support of the claim it is making',
      'It mentions teachers, who are not named in the essay title itself'
    ],
    answer: 'It treats six pupils in one class as proof about the whole school',
    hint: 'Compare the size of the evidence with the size of the claim it is used to support.',
    explanation: 'Six pupils in one class is a fifth of one class, and the paragraph turns that into &ldquo;the whole school&rdquo; and into &ldquo;proves&rdquo;. The fix is to match the claim to the evidence (&ldquo;a fifth of my class&hellip;, which suggests&hellip;&rdquo;) or to widen the evidence. Figures are welcome in an essay, and evidence is present, so those options misread the fault; the sentence about teachers is unsupported too, but it is a smaller problem than a claim that outruns its evidence by a whole school.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-008-e',
    chapterId: 'g9eng-writing',
    subsection: 'essay',
    difficulty: 4,
    question: 'Two pupils plan the same essay: <strong>Should the school day start an hour later?</strong><br><br><em>Plan A<br>1. More sleep improves concentration.<br>2. Buses are less crowded after eight.<br>3. Pupils would arrive in a better mood.<br>4. Lessons before nine are often wasted.</em><br><br><em>Plan B<br>1. More sleep improves concentration.<br>2. Buses are less crowded after eight.<br>3. Some parents leave for work at seven &mdash; but a supervised room would cover that hour.<br>4. Conclusion: the change is worth making if supervision is arranged.</em><br><br>Which plan will produce the stronger essay, and why?',
    options: [
      'B, because it meets an objection instead of leaving it for the reader',
      'A, because every one of its four points argues for the same side',
      'B, because its points are shorter and therefore easier to write up',
      'A, because it keeps to the question and never mentions the parents'
    ],
    answer: 'B, because it meets an objection instead of leaving it for the reader',
    hint: 'Ask what a reader who disagrees would say after reading each plan.',
    explanation: 'Plan B names the strongest objection and answers it, so a doubtful reader has nowhere left to stand; Plan A leaves that objection untouched, and four points on one side do not answer it. Pupils believe a one-sided plan looks more convinced, and length of point is not a measure of quality. Mentioning the other side is not a distraction from the question &mdash; it is how an argument is finished.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-009-a',
    chapterId: 'g9eng-writing',
    subsection: 'punctuation',
    difficulty: 2,
    question: 'You are checking a draft and find this sentence, which needs one apostrophe.<br><br><em>All the teachers cars were parked on the grass.</em><br><br>Write the ONE word that needs the apostrophe, with the apostrophe in the right place.',
    answer: "teachers'",
    alsoAccept: ["the teachers'"],
    hint: 'Decide how many owners there are before you decide where the apostrophe goes.',
    explanation: '&ldquo;All the teachers&rdquo; and &ldquo;cars&rdquo; both show that there is more than one owner, so the apostrophe follows the plural s: teachers&rsquo;. Writing &ldquo;teacher&rsquo;s&rdquo; means one teacher, which contradicts &ldquo;All&rdquo;. Find the owner, make it plural or singular first, and only then add the apostrophe.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-009-b',
    chapterId: 'g9eng-writing',
    subsection: 'punctuation',
    difficulty: 3,
    question: 'You are punctuating a line of dialogue in a story. Which version is correct?',
    options: [
      '“Are you coming with us?” asked Devi.',
      '“Are you coming with us”? asked Devi.',
      '“Are you coming with us?” Asked Devi.',
      '“Are you coming with us”, asked Devi?'
    ],
    answer: '“Are you coming with us?” asked Devi.',
    hint: 'The question mark belongs to the words that were spoken. Ask where those words end.',
    explanation: 'The question is what Devi said, so the question mark goes inside the closing quotation marks. &ldquo;asked&rdquo; then continues the same sentence, so it keeps a small letter. Pupils capitalise the reporting verb because a full stop or question mark usually ends a sentence &mdash; inside speech marks it ends the speech, not the sentence.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-009-c',
    chapterId: 'g9eng-writing',
    subsection: 'spelling',
    difficulty: 2,
    question: 'One word in this draft sentence is misspelled.<br><br><em>I would be grateful to recieve a reply before Friday.</em><br><br>Write that word correctly.',
    answer: 'receive',
    alsoAccept: ['to receive'],
    hint: 'Look at the vowels in the third word from the end.',
    explanation: 'It is <em>receive</em>: i before e except after c. &ldquo;Grateful&rdquo; is already correct, though pupils often change it to &ldquo;greatful&rdquo; on the assumption that it comes from &ldquo;great&rdquo; &mdash; when you check spelling, change only what is actually wrong.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-009-d',
    chapterId: 'g9eng-writing',
    subsection: 'spelling',
    difficulty: 3,
    question: 'You are checking a draft and need the adverb formed from the adjective <strong>necessary</strong>. Write it correctly.',
    answer: 'necessarily',
    hint: 'The adjective ends in a consonant followed by y. What happens to that y?',
    explanation: 'An adjective ending in a consonant plus y changes the y to i before -ly: necessary &rarr; necessarily, happy &rarr; happily. The usual errors, &ldquo;necessarly&rdquo; and &ldquo;necessarely&rdquo;, come from writing what the word sounds like when it is said quickly.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-009-e',
    chapterId: 'g9eng-writing',
    subsection: 'punctuation',
    difficulty: 1,
    question: 'You are checking a draft and find this sentence.<br><br><em>We will meet in the library on friday.</em><br><br>One word needs a capital letter. Write that word correctly.',
    answer: 'Friday',
    hint: 'Days, months and the names of people and places all behave the same way.',
    explanation: 'The names of the days take a capital letter wherever they appear, so it is <em>Friday</em>. Pupils capitalise only after a full stop, because that is the rule they meet first; a proper noun keeps its capital in the middle of a sentence too.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-010-a',
    chapterId: 'g9eng-writing',
    subsection: 'descriptive',
    difficulty: 2,
    question: 'In descriptive writing, showing is stronger than telling. Which sentence SHOWS the reader that the man is nervous?',
    options: [
      'He checked the door twice, then checked it again',
      'He was extremely nervous about the whole situation',
      'He felt nervous, as anybody would in his position',
      'He had a nervous character, even as a small child'
    ],
    answer: 'He checked the door twice, then checked it again',
    hint: 'Which sentence lets the reader work it out, instead of stating it?',
    explanation: 'Repeatedly checking a door is behaviour a reader can see and interpret. The other three name the feeling, and adding &ldquo;extremely&rdquo; only states it more loudly &mdash; pupils reach for intensifiers when the sentence needs a detail instead. Showing means giving the evidence and trusting the reader.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-010-b',
    chapterId: 'g9eng-writing',
    subsection: 'descriptive',
    difficulty: 3,
    question: 'In the sentence below, one word tells the reader what to feel instead of letting the details do it.<br><br><em>The sad old dog struggled up the steps, stopping at every landing.</em><br><br>Write that word.',
    answer: 'sad',
    hint: 'Which word states a feeling, rather than something you could watch happening?',
    explanation: '&ldquo;Struggled&rdquo; and &ldquo;stopping at every landing&rdquo; already show the effort, so &ldquo;sad&rdquo; instructs the reader to feel what the details have earned. Pupils often answer &ldquo;struggled&rdquo; because it is the strongest word in the sentence &mdash; but a precise verb is exactly what descriptive writing wants; it is the feeling word that can go.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-010-c',
    chapterId: 'g9eng-writing',
    subsection: 'narrative',
    difficulty: 3,
    question: 'This story is told in the first person. One word in the sentence below breaks that viewpoint.<br><br><em>I opened the gate slowly, and you could hear the hinge complaining.</em><br><br>Write that word.',
    answer: 'you',
    hint: 'Who is telling this story, and who has suddenly been handed the hearing?',
    explanation: 'The narrator is &ldquo;I&rdquo;, so the hearing must be theirs: &ldquo;I could hear the hinge complaining&rdquo;. Pupils use &ldquo;you&rdquo; as a general word meaning &ldquo;anyone&rdquo;, which is fine in speech, but inside a first-person narrative it turns to address the reader and the viewpoint slips.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-010-d',
    chapterId: 'g9eng-writing',
    subsection: 'narrative',
    difficulty: 2,
    question: 'A pupil&rsquo;s story opens with a narrator who has missed the last bus. Which sentence should be cut because it does not move the story?',
    options: [
      'The bus company was founded in 1963',
      'The last bus had gone; the stop was empty',
      'I counted the coins in my pocket: nine rupees',
      'Rain began, the kind that does not stop early'
    ],
    answer: 'The bus company was founded in 1963',
    hint: 'Ask of each sentence: does it change the narrator&rsquo;s situation or raise the pressure?',
    explanation: 'The founding date is true but idle: it changes nothing for the narrator. The other three each tighten the situation &mdash; no bus, little money, rain settling in. Pupils add background facts because they feel like research; in a narrative, a detail earns its place by affecting what happens next.'
  }));

  const NOTICE_MSG = 'A pupil sent this message to a class group chat.<br><br><em>hey guys the trip on fri is off coz the bus broke down we&rsquo;ll do it next week sometime</em><br><br>The information now has to go on a notice on the school board.<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-013-a',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 2,
    question: NOTICE_MSG + 'Write the ONE formal word that must replace &ldquo;coz&rdquo; in the notice.',
    answer: 'because',
    alsoAccept: ['as', 'since'],
    hint: 'The word joins the cancellation to its reason.',
    explanation: '&ldquo;Coz&rdquo; is a spoken shortening of &ldquo;because&rdquo;, and a notice uses the full word. Shortenings that everybody understands in a chat still look careless on a board a parent may read: the test is not whether it is clear, but whether it fits the place it is printed.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-013-b',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 3,
    question: NOTICE_MSG + 'Which opening line is right for the notice?',
    options: [
      'Notice: Friday&rsquo;s trip has been postponed.',
      'Hey everyone, the Friday trip is off now.',
      'Guys &mdash; some bad news about Friday&rsquo;s trip.',
      'Sorry, but Friday&rsquo;s trip has been cancelled.'
    ],
    answer: 'Notice: Friday&rsquo;s trip has been postponed.',
    hint: 'A notice addresses everybody who passes it, and it must be accurate about what has happened.',
    explanation: 'A notice names itself, addresses nobody in particular and states the fact. &ldquo;Hey everyone&rdquo; and &ldquo;Guys&rdquo; keep the register of the chat. The fourth option is the interesting trap: its register is nearly acceptable, but &ldquo;cancelled&rdquo; is untrue &mdash; the trip is being moved, and postponed is the word for that.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-013-c',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 2,
    question: NOTICE_MSG + 'Write &ldquo;fri&rdquo; as it must appear on the notice.',
    answer: 'Friday',
    alsoAccept: ['on Friday'],
    hint: 'A notice does not shorten a word, and it does not begin one with a small letter.',
    explanation: 'The day is written out in full and takes a capital letter: Friday. Pupils sometimes answer &ldquo;Fri&rdquo;, correcting only the capital &mdash; but the abbreviation itself belongs to a message, not to a notice on a board.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-013-d',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 3,
    question: NOTICE_MSG + 'Which part of the message must be made precise before it can go on the notice?',
    options: [
      '&ldquo;next week sometime&rdquo; &mdash; a notice must give a date',
      '&ldquo;the bus broke down&rdquo; &mdash; a notice must give a cause',
      '&ldquo;the trip on fri&rdquo; &mdash; a notice must give a place',
      '&ldquo;is off&rdquo; &mdash; a notice must say who decided it'
    ],
    answer: '&ldquo;next week sometime&rdquo; &mdash; a notice must give a date',
    hint: 'Ask what a reader has to know in order to act, and what they merely might like to know.',
    explanation: 'A reader of the notice needs to know when the trip will now happen, and &ldquo;next week sometime&rdquo; leaves them unable to plan. The reason, the destination and the decision-maker are all useful, but none of them stops the notice doing its job. Vagueness matters most where the reader has to act on it.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-013-e',
    chapterId: 'g9eng-writing',
    subsection: 'register',
    difficulty: 1,
    question: NOTICE_MSG + 'Write &ldquo;we&rsquo;ll&rdquo; in full, as it must appear on the notice.',
    answer: 'we will',
    alsoAccept: ['we shall'],
    hint: 'A notice writes both words out.',
    explanation: 'The contraction &ldquo;we&rsquo;ll&rdquo; stands for &ldquo;we will&rdquo; (or &ldquo;we shall&rdquo;), and formal writing uses the full form. Pupils leave contractions in place because they read naturally &mdash; but on a notice, a board or in a formal letter, the two words are written out.'
  }));

  const POEM = '<em>The sea has been at the wall all night,<br>patient as a creditor,<br>taking one stone, and then another,<br>never all of them, never in a hurry.<br>By morning the road is shorter<br>and nobody can say when it happened.</em>';
  const LIT = 'Read this short poem, then answer the question.<br><br>' + POEM + '<br><br>';

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-011-a',
    chapterId: 'g9eng-literature',
    subsection: 'figurative_devices',
    difficulty: 2,
    question: LIT + 'Name the device used in line 2, &ldquo;patient as a creditor&rdquo;. Give ONE word.',
    answer: 'simile',
    alsoAccept: ['a simile'],
    hint: 'Look at the small word joining the sea&rsquo;s patience to the creditor&rsquo;s.',
    explanation: 'The comparison is made with &ldquo;as&rdquo;, so it is a simile. Pupils answer &ldquo;personification&rdquo; because the sea is given a human quality &mdash; and the sea is indeed personified across the poem &mdash; but line 2 makes an open comparison with &ldquo;as&rdquo;, and that is what the question asks about.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-011-b',
    chapterId: 'g9eng-literature',
    subsection: 'effect_of_device',
    difficulty: 3,
    question: LIT + 'What does comparing the sea to a creditor suggest about the loss of the wall?',
    options: [
      'That it is owed, expected, and collected a little at a time',
      'That it can be repaid if the village pays for repairs quickly',
      'That it was caused by somebody&rsquo;s debt rather than by weather',
      'That it happens suddenly, on a date that was fixed in advance'
    ],
    answer: 'That it is owed, expected, and collected a little at a time',
    hint: 'A creditor is somebody collecting what is owed. Which qualities of a creditor does the poem actually use?',
    explanation: 'A creditor comes back, takes what is due and is in no hurry &mdash; which is how the poem describes the sea taking &ldquo;one stone, and then another&rdquo;. The trap is to push the comparison into a literal story about money or debts. A simile lends one or two qualities; it does not import the whole situation it comes from.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-011-c',
    chapterId: 'g9eng-literature',
    subsection: 'line_explication',
    difficulty: 3,
    question: LIT + 'What has happened in the line &ldquo;By morning the road is shorter&rdquo;?',
    options: [
      'The sea has taken away part of the road',
      'The walk to the village now feels shorter',
      'The road has been rebuilt on a straighter line',
      'Traffic has worn the surface of the road down'
    ],
    answer: 'The sea has taken away part of the road',
    hint: 'The poem has already told you what the sea does to the wall stone by stone. What happens next to what the wall protects?',
    explanation: 'The sea removes the wall a stone at a time, and by morning it has reached the road, so the road is physically shorter. Once a poem has used figurative language, pupils start reading everything as figurative and take &ldquo;shorter&rdquo; as a feeling &mdash; the opposite of the usual error, and just as costly. Decide line by line whether a statement is literal.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-011-d',
    chapterId: 'g9eng-literature',
    subsection: 'supported_response',
    difficulty: 3,
    question: LIT + 'Copy the THREE words from the last line that show the change happened without anyone noticing it.',
    answer: 'nobody can say',
    alsoAccept: ['and nobody can say', 'nobody can say when'],
    hint: 'You need the words about knowing, not the words about the morning.',
    explanation: '&ldquo;Nobody can say&rdquo; states that no one witnessed the moment of change, which is precisely the claim. A pupil who copies the whole line, or quotes &ldquo;by morning&rdquo;, has shown where to look but not which words carry the point. Quoting exactly is what turns an opinion into a supported response.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-011-e',
    chapterId: 'g9eng-literature',
    subsection: 'supported_response',
    difficulty: 4,
    question: LIT + 'Four pupils were asked what the poem says about the loss of the road, and each supported the answer with a quotation from it. Which response is best supported by the poem as a whole?',
    options: [
      'The loss is gradual and unnoticed: &ldquo;never in a hurry&rdquo; and &ldquo;nobody can say when&rdquo;',
      'The loss is violent and sudden: &ldquo;the sea has been at the wall all night&rdquo;',
      'The loss can still be prevented: &ldquo;never all of them&rdquo; shows the wall is holding',
      'The loss is the villagers&rsquo; own fault: &ldquo;nobody can say&rdquo; shows their neglect of it'
    ],
    answer: 'The loss is gradual and unnoticed: &ldquo;never in a hurry&rdquo; and &ldquo;nobody can say when&rdquo;',
    hint: 'Every quotation here is accurate. Test whether each one supports the claim attached to it.',
    explanation: 'All four quote the poem correctly, so accuracy cannot separate them; the test is whether the quotation carries the claim. &ldquo;All night&rdquo; describes how long the sea worked, not violence. &ldquo;Never all of them&rdquo; describes the sea&rsquo;s method of taking a little at a time, not the wall&rsquo;s strength. &ldquo;Nobody can say&rdquo; reports ignorance of the timing, not blame. Only the first joins two quotations that both describe slow, unobserved loss. A response is judged on the fit between claim and evidence, not on whether it sounds developed.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-012-a',
    chapterId: 'g9eng-gr-sentence',
    subsection: 'voice',
    difficulty: 2,
    question: 'Rewrite this sentence in the passive voice, keeping the same tense and still saying who acted.<br><br><em>The council closed the road.</em>',
    answer: 'The road was closed by the council',
    hint: 'Start with what the action was done to, then use the verb &ldquo;to be&rdquo; in the same tense.',
    explanation: 'Simple past active becomes simple past passive: object first (&ldquo;The road&rdquo;), then was + past participle (&ldquo;was closed&rdquo;), then the agent (&ldquo;by the council&rdquo;). Dropping &ldquo;by the council&rdquo; is allowed in real writing but changes the information the sentence gives, which is why this question asks you to keep it; writing &ldquo;has been closed&rdquo; changes the tense as well as the voice.'
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9eng-fam-012-b',
    chapterId: 'g9eng-gr-sentence',
    subsection: 'voice',
    difficulty: 3,
    question: 'Rewrite this sentence in the active voice, keeping the same tense.<br><br><em>The results were announced by the head teacher.</em>',
    answer: 'The head teacher announced the results',
    hint: 'The agent after &ldquo;by&rdquo; becomes the subject of your new sentence.',
    explanation: 'Going from passive to active reverses the order: the agent (&ldquo;the head teacher&rdquo;) becomes the subject and the verb loses &ldquo;to be&rdquo; &mdash; were announced becomes announced. Pupils keep &ldquo;was announced&rdquo; out of habit and produce a sentence that is neither voice; the tense is carried by the main verb once &ldquo;to be&rdquo; is gone.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-012-c',
    chapterId: 'g9eng-gr-sentence',
    subsection: 'voice',
    difficulty: 3,
    question: 'Which passive form keeps the tense of this sentence?<br><br><em>The inspectors have checked the buses.</em>',
    options: [
      'The buses have been checked by the inspectors',
      'The buses had been checked by the inspectors',
      'The buses were checked by the inspectors',
      'The buses are checked by the inspectors'
    ],
    answer: 'The buses have been checked by the inspectors',
    hint: 'Name the tense of the active sentence first, then build the same tense with &ldquo;to be&rdquo;.',
    explanation: 'The active sentence is present perfect (&ldquo;have checked&rdquo;), so the passive must be present perfect too: have been + past participle. Defaulting to the simple past (&ldquo;were checked&rdquo;) is the commonest error, because most passive practice sentences are in the past; the pluperfect (&ldquo;had been&rdquo;) moves the action further back still.'
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9eng-fam-012-d',
    chapterId: 'g9eng-gr-sentence',
    subsection: 'voice',
    difficulty: 3,
    question: 'A newspaper report contains this sentence: <em>A window was broken during the night.</em><br><br>Why has the writer chosen the passive voice here?',
    options: [
      'The person who broke it is not known',
      'The passive is always used in newspapers',
      'The window matters more than the night',
      'The sentence would be wrong in the active'
    ],
    answer: 'The person who broke it is not known',
    hint: 'Ask what the passive lets a writer leave out.',
    explanation: 'The passive lets a writer report the action without naming an agent, which is exactly what a reporter needs when nobody knows who did it. The active version (&ldquo;Someone broke a window&rdquo;) is perfectly grammatical, so the passive is a choice, not a repair; and no rule requires newspapers to use it. Choose the passive when the agent is unknown, obvious, or deliberately kept back.'
  }));

})();
