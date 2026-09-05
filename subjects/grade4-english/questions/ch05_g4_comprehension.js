'use strict';
// Grade 4 English - Chapter: Reading Comprehension
// IDs format: g4eng-comp-NNN
//
// Passage used in this chapter:
// ─────────────────────────────────────────────────────────────────────
// THE MORNING MARKET (MIE Grade 4 - Mauritius context)
//
// Every morning before sunrise, fishermen in Mauritius set out to sea
// in their colourful boats. They cast their nets and wait patiently for
// fish to swim inside. By seven o\'clock, they return to the beach with
// their catch.
//
// At the market, vendors arrange the fresh fish on long tables of ice.
// The smell of the sea fills the air. Housewives, cooks and shopkeepers
// come early to choose the best fish. The most popular fish are
// capitaine, cordonnier and red snapper.
//
// Rama is an eight-year-old boy who loves to visit the fish market with
// his grandmother. He helps her carry the heavy basket back home. His
// grandmother always tells him, "Fresh fish makes us strong and healthy."
// ─────────────────────────────────────────────────────────────────────

const _PASSAGE_G4 = '<b>THE MORNING MARKET</b><br><br>Every morning before sunrise, fishermen in Mauritius set out to sea in their colourful boats. They cast their nets and wait patiently for fish to swim inside. By seven o\'clock, they return to the beach with their catch.<br><br>At the market, vendors arrange the fresh fish on long tables of ice. The smell of the sea fills the air. Housewives, cooks and shopkeepers come early to choose the best fish. The most popular fish are capitaine, cordonnier and red snapper.<br><br>Rama is an eight-year-old boy who loves to visit the fish market with his grandmother. He helps her carry the heavy basket back home. His grandmother always tells him, "Fresh fish makes us strong and healthy."';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-comp-001', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:_PASSAGE_G4 + '<hr>When do the fishermen set out to sea?',
    options:['After sunrise','Before sunrise','At midday','At seven o\'clock'],
    answer:'Before sunrise',
    hint:'Read the first sentence of paragraph 1 carefully.',
    explanation:'The passage states: "Every morning <b>before sunrise</b>, fishermen in Mauritius set out to sea." This is a direct "find" question - the answer is in the text.' }),

  makeMCQ({ id:'g4eng-comp-002', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:_PASSAGE_G4 + '<hr>What do the fishermen use to catch fish?',
    options:['Fishing rods','Hooks','Nets','Baskets'],
    answer:'Nets',
    hint:'Read paragraph 1 - what do the fishermen cast into the sea?',
    explanation:'The passage states: "They cast their <b>nets</b> and wait patiently for fish to swim inside." The answer is directly in the text.' }),

  makeMCQ({ id:'g4eng-comp-003', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:1,
    question:_PASSAGE_G4 + '<hr>What time do the fishermen return to the beach?',
    options:['Before six o\'clock','At six o\'clock','By seven o\'clock','At eight o\'clock'],
    answer:'By seven o\'clock',
    hint:'The answer is in the last sentence of paragraph 1.',
    explanation:'"<b>By seven o\'clock</b>, they return to the beach with their catch." The word "by" means at or before that time.' }),

  makeMCQ({ id:'g4eng-comp-004', chapterId:'g4eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:_PASSAGE_G4 + '<hr>What does the word "vendors" mean as used in the passage?',
    options:['Fishermen at sea','People who sell things','Buyers at the market','Cooks who prepare fish'],
    answer:'People who sell things',
    hint:'Vendors arrange the fish on tables - what kind of person arranges goods for sale?',
    explanation:'"Vendors" are <b>people who sell things</b>. In the passage, vendors arrange the fish to sell to buyers. Context clue: they arrange goods on tables, which is what sellers do at a market.' }),

  makeMCQ({ id:'g4eng-comp-005', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_PASSAGE_G4 + '<hr>Why do people come EARLY to the fish market?',
    options:['To avoid the crowd','To choose the best fish','To help the fishermen','To watch the boats arrive'],
    answer:'To choose the best fish',
    hint:'Read paragraph 2 carefully - the passage gives a direct reason.',
    explanation:'The passage says: "Housewives, cooks and shopkeepers come early <b>to choose the best fish</b>." They arrive early because the best fish sells out quickly.' }),

  makeMCQ({ id:'g4eng-comp-006', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_PASSAGE_G4 + '<hr>Name ONE type of fish mentioned in the passage.',
    options:['Tuna','Capitaine','Sardine','Barracuda'],
    answer:'Capitaine',
    hint:'Paragraph 2 lists the most popular fish - look for the names.',
    explanation:'The passage names three popular fish: <b>capitaine</b>, cordonnier and red snapper. All three are popular fish in Mauritius. Capitaine (also called golden snapper) is a well-known Mauritian fish.' }),

  makeMCQ({ id:'g4eng-comp-007', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_PASSAGE_G4 + '<hr>How does Rama HELP his grandmother?',
    options:['He buys the fish','He carries the heavy basket home','He arranges the fish on ice','He casts the fishing nets'],
    answer:'He carries the heavy basket home',
    hint:'Paragraph 3 describes what Rama does at the market.',
    explanation:'The passage says: "He helps her <b>carry the heavy basket back home</b>." Rama does not buy the fish - his grandmother does. He helps by carrying the load.' }),

  makeMCQ({ id:'g4eng-comp-008', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_PASSAGE_G4 + '<hr>Why are the fish placed on TABLES OF ICE?',
    options:['To make them look nice','To count them easily','To keep them fresh and cold','Because it is easier to carry'],
    answer:'To keep them fresh and cold',
    hint:'Think about what ice does to food. Why do we put fish on ice?',
    explanation:'Fish are placed on ice <b>to keep them fresh and cold</b>. Ice slows down the growth of bacteria and prevents fish from going bad. This is a comprehension inference - the passage says "tables of ice" and you use your knowledge to understand why.' }),

  makeMCQ({ id:'g4eng-comp-009', chapterId:'g4eng-comprehension', subsection:'vocabulary', difficulty:3,
    question:_PASSAGE_G4 + '<hr>What does Rama\'s grandmother mean when she says "Fresh fish makes us strong and healthy"?',
    options:[
      'Fresh fish is expensive and valuable.',
      'Eating fresh fish is good for our bodies and gives us nutrients.',
      'Fresh fish is better than other types of food.',
      'Fish caught in the morning is the only healthy food.'
    ],
    answer:'Eating fresh fish is good for our bodies and gives us nutrients.',
    hint:'Think about what "strong and healthy" means in terms of the body.',
    explanation:'The grandmother means that <b>eating fresh fish provides nutrients that are good for our bodies</b> - it helps us grow and stay healthy. Fresh fish contains protein, vitamins and minerals. This is an inference question - you must go beyond the literal words.' }),

  makeMCQ({ id:'g4eng-comp-010', chapterId:'g4eng-comprehension', subsection:'inference', difficulty:4,
    question:_PASSAGE_G4 + '<hr>Based on the WHOLE PASSAGE, which statement BEST describes Rama\'s character?',
    options:[
      'Rama is lazy and does not help anyone.',
      'Rama is a helpful and caring grandson who appreciates Mauritius traditions.',
      'Rama is only interested in eating fish.',
      'Rama prefers staying at home rather than going to the market.'
    ],
    answer:'Rama is a helpful and caring grandson who appreciates Mauritius traditions.',
    hint:'Think about everything the passage tells us about Rama: what he does, how he feels, what he learns.',
    explanation:'The passage shows Rama is <b>helpful</b> (he carries the basket), <b>caring</b> (he loves visiting with his grandmother), and <b>connected to Mauritius traditions</b> (the fish market is a traditional part of Mauritian life). This is a character inference question - you must read the whole passage and draw a conclusion about the person.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-comp-011', chapterId:'g4eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:_PASSAGE_G4 + '<hr>What does the word "patiently" tell us about the fishermen?',
    options:[
      'They are in a hurry to get back to shore.',
      'They are willing to wait calmly without becoming frustrated.',
      'They are not very good at catching fish.',
      'They are waiting because their nets are broken.'
    ],
    answer:'They are willing to wait calmly without becoming frustrated.',
    hint:'Think about what "patient" means, and how the -ly ending changes it into an adverb.',
    explanation:'"Patiently" is an adverb describing HOW the fishermen wait. <b>Patient</b> means calm and willing to wait; -ly makes it an adverb. It tells us fishing requires calm, unhurried waiting.' }),

  makeMCQ({ id:'g4eng-comp-012', chapterId:'g4eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_PASSAGE_G4 + '<hr>Three types of fish are named in the passage. Which one is NOT mentioned?',
    options:['Capitaine','Cordonnier','Red snapper','Tuna'],
    answer:'Tuna',
    hint:'Paragraph 2 lists the most popular fish. Read it carefully.',
    explanation:'The passage names <b>capitaine, cordonnier and red snapper</b>. <b>Tuna</b> is not mentioned. This tests careful reading and recall of specific details from the text.' }),

  makeMCQ({ id:'g4eng-comp-013', chapterId:'g4eng-comprehension', subsection:'inference', difficulty:2,
    question:_PASSAGE_G4 + '<hr>The passage says the fishermen\'s boats are "colourful". What does this detail suggest?',
    options:[
      'The fishermen are very rich.',
      'Mauritian fishing boats have a bright, lively tradition of colour.',
      'The boats need colour so they are seen at night.',
      'The sea itself is colourful.'
    ],
    answer:'Mauritian fishing boats have a bright, lively tradition of colour.',
    hint:'The writer chose this detail deliberately. What impression does it create of the fishing community?',
    explanation:'The word "colourful" creates an impression of a <b>vibrant, lively fishing culture</b> in Mauritius. Good readers notice details writers choose and think about what image or feeling they create.' }),

  makeMCQ({ id:'g4eng-comp-014', chapterId:'g4eng-comprehension', subsection:'main_idea', difficulty:2,
    question:_PASSAGE_G4 + '<hr>What is the MAIN IDEA of paragraph 2?',
    options:[
      'Fishermen return to the beach at seven o\'clock.',
      'The fish market is a busy, lively place where fresh fish is sold.',
      'Rama loves visiting the fish market with his grandmother.',
      'Capitaine and cordonnier are the names of fish.'
    ],
    answer:'The fish market is a busy, lively place where fresh fish is sold.',
    hint:'The main idea covers what the WHOLE paragraph is about, not just one detail.',
    explanation:'Paragraph 2 describes the market scene: vendors arranging fish, the smell of the sea, buyers arriving early, and the names of popular fish. The main idea is that <b>the fish market is a busy, lively place</b>. The other options are specific details, not the overall idea.' }),

  makeMCQ({ id:'g4eng-comp-015', chapterId:'g4eng-comprehension', subsection:'inference', difficulty:3,
    question:_PASSAGE_G4 + '<hr>People "come early to choose the best fish." What does this suggest about the market?',
    options:[
      'The market opens very late in the day.',
      'The best fish sell out quickly, so early buyers get the freshest ones.',
      'People do not like going to the market.',
      'The fish at the market is usually not very fresh.'
    ],
    answer:'The best fish sell out quickly, so early buyers get the freshest ones.',
    hint:'Why would people NEED to arrive early? What might happen to the best fish if they arrive late?',
    explanation:'If people come early to choose the best fish, it implies that <b>the best fish sell out quickly</b>. The early buyer gets the freshest, highest quality fish. This is an inference question - you must read between the lines.' }),

  makeMCQ({ id:'g4eng-comp-016', chapterId:'g4eng-comprehension', subsection:'language', difficulty:3,
    question:_PASSAGE_G4 + '<hr>Which literary device is used in: "The smell of the sea fills the air"?',
    options:[
      'A simile - comparing two things using "like" or "as"',
      'Personification - giving the smell human qualities',
      'Sensory imagery - appealing to the sense of smell to create a vivid picture',
      'Rhyme - two words that sound the same'
    ],
    answer:'Sensory imagery - appealing to the sense of smell to create a vivid picture',
    hint:'The sentence appeals to one of our five senses. Which sense? What does that type of description create?',
    explanation:'"The smell of the sea fills the air" uses <b>sensory imagery</b> - it appeals to the sense of <b>smell</b> to help the reader imagine being at the market. Good writers use sensory details (sight, sound, smell, taste, touch) to make writing vivid.' }),

  makeMCQ({ id:'g4eng-comp-017', chapterId:'g4eng-comprehension', subsection:'language', difficulty:3,
    question:_PASSAGE_G4 + '<hr>Which sentence from the passage is an OPINION rather than a fact?',
    options:[
      '"By seven o\'clock, they return to the beach with their catch."',
      '"Vendors arrange the fresh fish on long tables of ice."',
      '"Fresh fish makes us strong and healthy."',
      '"The most popular fish are capitaine, cordonnier and red snapper."'
    ],
    answer:'"Fresh fish makes us strong and healthy."',
    hint:'A fact can be checked and proven true or false. An opinion is someone\'s belief or judgement.',
    explanation:'"<b>Fresh fish makes us strong and healthy</b>" is the grandmother\'s <b>opinion/belief</b> - it cannot be verified from the passage alone. The other three sentences are facts that can be observed. Distinguishing fact from opinion is an important comprehension skill.' }),

  makeMCQ({ id:'g4eng-comp-018', chapterId:'g4eng-comprehension', subsection:'main_idea', difficulty:3,
    question:_PASSAGE_G4 + '<hr>What is a suitable alternative TITLE for this passage?',
    options:[
      'Types of Fish in Mauritius',
      'A Morning at the Mauritian Fish Market',
      'How to Catch Fish',
      'Rama\'s Grandmother\'s Recipe'
    ],
    answer:'A Morning at the Mauritian Fish Market',
    hint:'A good title covers the WHOLE passage, not just one part. What are the main topics combined?',
    explanation:'"<b>A Morning at the Mauritian Fish Market</b>" covers the whole passage: the morning setting, the fishing, and the market. A good title reflects all major topics. The other options refer to only one specific detail and do not represent the whole passage.' }),

  makeMCQ({ id:'g4eng-comp-019', chapterId:'g4eng-comprehension', subsection:'authors_view', difficulty:4,
    question:_PASSAGE_G4 + '<hr>How does the writer create a sense of COMMUNITY in this passage?',
    options:[
      'By describing only the fishermen\'s work at sea.',
      'By showing many different people - fishermen, vendors, housewives, cooks, shopkeepers, Rama and his grandmother - all connected through the fish market.',
      'By listing the types of fish available.',
      'By writing about the smell of the sea in paragraph 2.'
    ],
    answer:'By showing many different people - fishermen, vendors, housewives, cooks, shopkeepers, Rama and his grandmother - all connected through the fish market.',
    hint:'Look at the range of people mentioned across the three paragraphs. What do they all have in common?',
    explanation:'The writer mentions <b>many different people from different roles</b> - all gathering at or connected to the fish market. This creates a sense of a <b>vibrant, interdependent community</b>. Noticing how a writer builds meaning across a whole passage is a higher-order comprehension skill.' })

);
